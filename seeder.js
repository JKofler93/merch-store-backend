import mongoose from 'mongoose';
import dotenv from 'dotenv';
import users from './data/users.js';
import items from './data/items.js';
import User from './models/User.js';
import Item from './models//item.js';
import Order from './models/Order.js';
import connectDB from './config/db.js';

dotenv.config();

connectDB();

const inputData = async () => {
    try {
        await Item.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        const createdUsers = await User.insertMany(users);

        const userAdmin = createdUsers[0]._id;

        const sampleItems = items.map(item => {
            return { ...item, user: userAdmin }
        })

        await Item.insertMany(sampleItems);

        console.log('Data input to DB');
        process.exit();
        
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}

const deleteData = async () => {
    try {
        await Item.deleteMany()
        await User.deleteMany()
        await Order.deleteMany()

        console.log('Data is deleted from DB');
        process.exit();
        
    } catch (error) {
        console.error(error);
        process.exit(1);
        
    }
}

if (process.argv[2] === 'destroy') {
    deleteData();
}
else {
    inputData();
}