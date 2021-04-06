import express from 'express'
const router = express.Router()
import {
  addItemToOrder,
  getOrderById,
  updateOrderToCompleted,
  updateOrderToDelivered,
  getUserOrders,
  getOrders,
} from '../controllers/orderController.js'
import { protect, adminUser } from '../middleware/auth.js'

router.route('/').post(protect, addItemToOrder).get(protect, adminUser, getOrders)
router.route('/myorders').get(protect, getUserOrders)
router.route('/:id').get(protect, getOrderById)
router.route('/:id/pay').put(protect, updateOrderToCompleted)
router.route('/:id/deliver').put(protect, adminUser, updateOrderToDelivered)

export default router