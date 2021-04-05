import Item from '../models/Item.js';
import asyncHandler from 'express-async-handler';

//description: Get all items
//route request:  GET /api/items
//route access: Public
const getAllItems = asyncHandler(async (req, res) => {
  const pageSize = 10
  const page = Number(req.query.pageNumber) || 1

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const count = await Item.countDocuments({ ...keyword })
  const items = await Item.find({ ...keyword })
    .limit(pageSize)
    .skip(pageSize * (page - 1))

  res.json({ items, page, pages: Math.ceil(count / pageSize) })
})

//description: Get single item
//route request:  GET /api/items/:id
//route access: Public
const getItemById = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (item) {
    res.json(item)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

//description: Delete a item
//route request:  DELETE /api/items/:id
//route access: Private/Admin
const deleteItem = asyncHandler(async (req, res) => {
  const item = await Item.findById(req.params.id)

  if (item) {
    await item.remove()
    res.json({ message: 'Item removed' })
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})


//description: Create a item
//route request:  POST /api/items
//route access: Private/Admin
const createItem = asyncHandler(async (req, res) => {
  const item = new Item({
    user: req.user._id,
    name: 'Sample name',
    image: '/images/sample.jpg',
    brand: 'Sample brand',
    description: 'Sample description',
    category: 'Sample category',
    price: 0,
    amountInStock: 0,
    numOfReviews: 0,
  })

  const createdItem = await item.save()
  res.status(201).json(createdItem)
})

//description: Edit a item
//route request:  PUT /api/items/:id
//route access: Private/Admin
const editItem = asyncHandler(async (req, res) => {
  const {
    name,
    price,
    description,
    image,
    brand,
    category,
    amountInStock
  } = req.body

  const item = await Item.findById(req.params.id)

  if (item) {
    item.name = name
    item.price = price
    item.description = description
    item.image = image
    item.brand = brand
    item.category = category
    item.amountInStock = amountInStock

    const updatedItem = await item.save()
    res.json(updatedItem)
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})

//description: Create a review
//route request:  PUT /api/items/:id/reviews
//route access: Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const item = await Item.findById(req.params.id)

  if (item) {
    const isReviewed = item.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (isReviewed) {
      res.status(400)
      throw new Error('Item already reviewed')
    }

    const review = {
      name: req.user.name,
      rating: Number(rating),
      comment,
      user: req.user._id,
    }

    item.reviews.push(review)

    item.numReviews = item.reviews.length

    item.rating =
      item.reviews.reduce((acc, item) => item.rating + acc, 0) /
      item.reviews.length

    await item.save()
    res.status(201).json({ message: 'Review added' })
  } else {
    res.status(404)
    throw new Error('Item not found')
  }
})


//description: Get top rated items
//route request:  Get /api/items/top
//route access: Public
const getTopItems = asyncHandler(async (req, res) => {
  const items = await Item.find({}).sort({ rating: -1 }).limit(3)

  res.json(items)
})

export {
  getAllItems,
  getItemById,
  deleteItem,
  createItem,
  editItem,
  createReview,
  getTopItems
}