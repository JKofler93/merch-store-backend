import express from 'express';
const router = express.Router();
import { getAllItems, getItemById, createReview, getTopItems } from '../controllers/ItemController.js';
import { protectedRoute } from '../middleware/auth.js';

// GET '/api/items';
router.route('/').get(getAllItems)

// POST 'api/items/itemId/reviews'
router.route('/:id/reviews').post(protectedRoute, createReview);

// GET 'api/items/topItems'
router.get('/topItems', getTopItems);

// GET 'api/items/itemId'
router.route('/:id').get(getItemById);

export default router;