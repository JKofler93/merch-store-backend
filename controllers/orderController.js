import Order from '../models/Order.js';
import asyncHandler from 'express-async-handler';


//description: Create a new order
//route request: POST /api/orders
//route access: Private
const addItemToOrder = asyncHandler(async (req, res) => {
  const {
    orderItems,
    shippingAddress,
    paymentMethod,
    itemsPrice,
    taxPrice,
    shippingPrice,
    totalPrice,
  } = req.body

  if (orderItems && orderItems.length === 0) {
    res.status(400)
    throw new Error('No order items')
  } else {
    const order = new Order({
      orderItems,
      user: req.user._id,
      shippingAddress,
      paymentMethod,
      itemsPrice,
      taxPrice,
      shippingPrice,
      totalPrice
    })

    const createdOrder = await order.save()

    res.status(201).json(createdOrder)
  }
})


//description: Get order by Id
//route request: GET /api/orders/:id
//route access: Private + Token needed
const getOrderById = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id).populate(
    'user',
    'name email'
  )

  if (order) {
    res.json(order)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})

//description: Update order to paid
//route request: GET /api/orders/:id/pay
//route access: Private + Token needed
const updateOrderToCompleted = asyncHandler(async (req, res) => {
  const order = await Order.findById(req.params.id)

  if (order) {
    order.isPaid = true
    order.paidAt = Date.now()
    order.paymentResult = {
      id: req.body.id,
      status: req.body.status,
      update_time: req.body.update_time,
      email_address: req.body.payer.email_address,
    }

    const updatedOrder = await order.save()

    res.json(updatedOrder)
  } else {
    res.status(404)
    throw new Error('Order not found')
  }
})


//description: Get logged in user orders
//route request: Get logged in user orders
//route access: Private
const getUserOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({ user: req.user._id })
  res.json(orders)
})

//description: Get all orders
//route request: GET /api/orders
//route access: Private + Admin
const getOrders = asyncHandler(async (req, res) => {
  const orders = await Order.find({}).populate('user', 'id name')
  res.json(orders)
})

export {
  addItemToOrder,
  getOrderById,
  updateOrderToCompleted,
  getUserOrders,
  getOrders
}