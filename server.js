import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';
import items from './data/items.js';


dotenv.config();

connectDB();

const app = express();

app.get('/', (req, res) => {
    res.send('API is running')
});

// Gets All items 
app.get('/api/items', (req, res) => {
    res.send(items)
});

// Gets single item
app.get('/api/items/:id', (req, res) => {
    const item = items.find(item => item._id === req.params.id)
    res.send(item)
});

const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${3000}`));
