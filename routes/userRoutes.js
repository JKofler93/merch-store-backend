import express from 'express';
import User from '../models/User.js';
import { protect, adminUser } from '../middleware/auth.js'
import {
    authenticateUser,
    registerUser,
    getProfile,
    editProfile,
    getUsers,
    deleteUser,
    getUserById,
    editUser
}
from '../controllers/userController.js';

const router = express.Router();

//description: Auth a user and get a token
//route request:  POST api/users/login
//route type: Public
// userController authenticateUser function
router.route('/').post(registerUser).get(protect, adminUser, getUsers)
router.post('/login', authenticateUser)


//description: Get a users profile
//route request:  GET api/users/profile
//route type: Private
// userController getProfile & editProfile functions
router.route('/profile').get(protect, getProfile).put(protect, editProfile)


router.route('/:id').get(protect, adminUser, getUserById).delete(protect, adminUser, deleteUser).put(protect, adminUser, editUser);







export default router;