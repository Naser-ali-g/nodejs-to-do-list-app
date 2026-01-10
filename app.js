const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const redis = require('redis');

const app = express();
const PORT = process.env.PORT || 3000;
const REDIS_HOST = process.env.REDIS_HOST || 'localhost';
const REDIS_PORT = process.env.REDIS_PORT || 6379;
const REDIS_PASSWORD = process.env.REDIS_PASSWORD || '';

// Middleware
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use(express.json());

// Redis Client Configuration
const redisClient = redis.createClient({
    socket: {
        host: REDIS_HOST,
        port: REDIS_PORT
    },
    password: REDIS_PASSWORD || undefined
});

let redisReady = false;

// Redis Connection
redisClient.connect()
    .then(() => {
        console.log('✅ Redis Connected Successfully');
        console.log(`📍 Connected to: ${REDIS_HOST}:${REDIS_PORT}`);
        redisReady = true;
    })
    .catch(err => {
        console.error('❌ Redis Connection Error:', err);
        process.exit(1);
    });

redisClient.on('error', (err) => {
    console.error('Redis Client Error:', err);
    redisReady = false;
});

// Helper Functions
const TODO_KEY_PREFIX = 'todo:';
const TODO_LIST_KEY = 'todos:list';
const TODO_COUNTER_KEY = 'todos:counter';

async function getNextId() {
    const id = await redisClient.incr(TODO_COUNTER_KEY);
    return id;
}

async function getAllTodos() {
    try {
        const todoIds = await redisClient.lRange(TODO_LIST_KEY, 0, -1);
        const todos = [];
        
        for (const id of todoIds) {
            const todoData = await redisClient.hGetAll(`${TODO_KEY_PREFIX}${id}`);
            if (todoData && todoData.id) {
                todos.push({
                    id: parseInt(todoData.id),
                    task: todoData.task,
                    completed: todoData.completed === 'true',
                    createdAt: new Date(todoData.createdAt),
                    updatedAt: new Date(todoData.updatedAt)
                });
            }
        }
        return todos;
    } catch (err) {
        console.error('Error getting todos:', err);
        return [];
    }
}

async function createTodo(task) {
    try {
        const id = await getNextId();
        const now = new Date().toISOString();
        
        const todoData = {
            id: id.toString(),
            task: task,
            completed: 'false',
            createdAt: now,
            updatedAt: now
        };
        
        await redisClient.hSet(`${TODO_KEY_PREFIX}${id}`, todoData);
        await redisClient.rPush(TODO_LIST_KEY, id.toString());
        
        return { id, ...todoData };
    } catch (err) {
        console.error('Error creating todo:', err);
        throw err;
    }
}

async function getTodo(id) {
    try {
        const todoData = await redisClient.hGetAll(`${TODO_KEY_PREFIX}${id}`);
        if (!todoData || !todoData.id) {
            return null;
        }
        
        return {
            id: parseInt(todoData.id),
            task: todoData.task,
            completed: todoData.completed === 'true',
            createdAt: new Date(todoData.createdAt),
            updatedAt: new Date(todoData.updatedAt)
        };
    } catch (err) {
        console.error('Error getting todo:', err);
        return null;
    }
}

async function updateTodo(id, updates) {
    try {
        const todo = await getTodo(id);
        if (!todo) {
            return null;
        }
        
        const updatedData = {
            ...updates,
            updatedAt: new Date().toISOString()
        };
        
        await redisClient.hSet(`${TODO_KEY_PREFIX}${id}`, updatedData);
        return { ...todo, ...updatedData };
    } catch (err) {
        console.error('Error updating todo:', err);
        throw err;
    }
}

async function deleteTodo(id) {
    try {
        await redisClient.del(`${TODO_KEY_PREFIX}${id}`);
        await redisClient.lRem(TODO_LIST_KEY, 0, id.toString());
        return true;
    } catch (err) {
        console.error('Error deleting todo:', err);
        return false;
    }
}

// Routes
app.get('/', async (req, res) => {
    try {
        if (!redisReady) {
            return res.render('index', { 
                todos: [], 
                error: 'Redis connection not ready. Please wait...' 
            });
        }
        
        const todos = await getAllTodos();
        res.render('index', { todos, error: null });
    } catch (err) {
        console.error('Error fetching todos:', err);
        res.render('index', { todos: [], error: 'Failed to load tasks' });
    }
});

app.post('/add', async (req, res) => {
    try {
        const { task } = req.body;
        if (!task || task.trim() === '') {
            return res.redirect('/?error=empty');
        }
        
        await createTodo(task.trim());
        res.redirect('/');
    } catch (err) {
        console.error('Error adding todo:', err);
        res.redirect('/?error=add');
    }
});

app.post('/delete/:id', async (req, res) => {
    try {
        const { id } = req.params;
        await deleteTodo(id);
        res.redirect('/');
    } catch (err) {
        console.error('Error deleting todo:', err);
        res.redirect('/?error=delete');
    }
});

app.post('/toggle/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const todo = await getTodo(id);
        
        if (todo) {
            await updateTodo(id, { 
                completed: (!todo.completed).toString() 
            });
        }
        res.redirect('/');
    } catch (err) {
        console.error('Error toggling todo:', err);
        res.redirect('/?error=toggle');
    }
});

app.post('/edit/:id', async (req, res) => {
    try {
        const { id } = req.params;
        const { task } = req.body;
        
        if (!task || task.trim() === '') {
            return res.redirect('/?error=empty');
        }
        
        await updateTodo(id, { task: task.trim() });
        res.redirect('/');
    } catch (err) {
        console.error('Error updating todo:', err);
        res.redirect('/?error=update');
    }
});

// Health check endpoint
app.get('/health', async (req, res) => {
    try {
        await redisClient.ping();
        
        res.status(200).json({ 
            status: 'healthy',
            redis: 'connected',
            timestamp: new Date() 
        });
    } catch (err) {
        res.status(503).json({ 
            status: 'unhealthy', 
            redis: 'disconnected',
            error: err.message,
            timestamp: new Date() 
        });
    }
});

// Metrics endpoint
app.get('/metrics', async (req, res) => {
    try {
        const todos = await getAllTodos();
        const totalTodos = todos.length;
        const completedTodos = todos.filter(t => t.completed).length;
        const pendingTodos = totalTodos - completedTodos;
        
        const redisInfo = await redisClient.info('memory');
        const memoryMatch = redisInfo.match(/used_memory_human:([^\r\n]+)/);
        const memoryUsed = memoryMatch ? memoryMatch[1] : 'N/A';
        
        res.json({
            total_tasks: totalTodos,
            completed_tasks: completedTodos,
            pending_tasks: pendingTodos,
            completion_rate: totalTodos > 0 ? ((completedTodos / totalTodos) * 100).toFixed(2) : 0,
            redis_memory: memoryUsed,
            redis_status: 'connected'
        });
    } catch (err) {
        res.status(500).json({ 
            error: 'Failed to fetch metrics',
            redis_status: 'error'
        });
    }
});

// 404 handler
app.use((req, res) => {
    res.status(404).send('Page not found');
});

// Error handler
app.use((err, req, res, next) => {
    console.error(err.stack);
    res.status(500).send('Something went wrong!');
});

// Graceful shutdown
process.on('SIGTERM', async () => {
    console.log('SIGTERM received, closing Redis connection...');
    await redisClient.quit();
    process.exit(0);
});

process.on('SIGINT', async () => {
    console.log('SIGINT received, closing Redis connection...');
    await redisClient.quit();
    process.exit(0);
});

app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
    console.log(`📊 Environment: ${process.env.NODE_ENV || 'development'}`);
    console.log(`🔴 Redis: ${REDIS_HOST}:${REDIS_PORT}`);
});

