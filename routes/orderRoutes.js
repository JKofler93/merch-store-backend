import express from 'express';
const router = express.Router();
import { addItemToOrder, getOrderById, updateOrderToCompleted, getUserOrders } from '../controllers/orderController.js';
import { protectedRoute } from '../middleware/auth.js';

// POST '/api/orders'
router.route('/').post(protectedRoute, addItemToOrder);

// GET '/api/orders/myorders'
router.route('/myorders').get(protectedRoute, getUserOrders);

// GET '/api/orders/orderId'
router.route('/:id').get(protectedRoute, getOrderById);

// PUT '/api/orders/orderId/pay'
router.route('/:id/pay').put(protectedRoute, updateOrderToCompleted);

export default router;