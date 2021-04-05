import express from 'express';
import dotenv from 'dotenv';
import connectDB from './config/db.js';

// importing item routes
import itemRoutes from './routes/itemRoutes.js';
import userRoutes from './routes/userRoutes.js';
import orderRoutes from './routes/orderRoutes.js';
// import uploadRoutes from './routes/uploadRoutes.js';


const app = express();
// allows us to accept json data in the body
app.use(express.json())

dotenv.config();

connectDB();


// routes for server to use
app.use('/api/items', itemRoutes);
app.use('/api/users', userRoutes);
app.use('/api/orders', orderRoutes);
// app.use('/api/upload', uploadRoutes);

app.get('/', (req, res) => {
    res.send('API is running')
});


const PORT = process.env.PORT || 3000

app.listen(PORT, console.log(`Server running in ${process.env.NODE_ENV} mode, on port ${3000}`));
