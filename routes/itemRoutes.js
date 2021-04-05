import express from 'express';
const router = express.Router();
import {
    getAllItems,
    getItemById,
    deleteItem,
    createItem,
    editItem,
    createReview,
    getTopItems
} from '../controllers/ItemController.js';
import { protect, adminUser } from '../middleware/auth.js';

router.route('/').get(getAllItems).post(protect, adminUser, createItem)
router.route('/:id/reviews').post(protect, createReview)
router.get('/top', getTopItems)
router
  .route('/:id')
  .get(getItemById)
  .delete(protect, adminUser, deleteItem)
  .put(protect, adminUser, editItem)

export default router