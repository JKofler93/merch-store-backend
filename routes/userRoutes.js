import express from 'express';
const router = express.Router();
import { protectedRoute } from '../middleware/auth.js';
import { authenticateUser, registerUser, getProfile, editProfile } from '../controllers/userController.js';


// POST '/api/users' 
router.route('/').post(registerUser);

// POST '/api/users/login
router.post('/login', authenticateUser);

// GET '/api/users/profile'
// PUT '/api/users/profile'
router.route('/profile').get(protectedRoute, getProfile).put(protectedRoute, editProfile);

export default router;