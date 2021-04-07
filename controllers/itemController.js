import Item from '../models/Item.js';
import asyncHandler from 'express-async-handler';

//description: Get all items
//route request:  GET /api/items
//route access: Public
const getAllItems = asyncHandler(async (req, res) => {

  const keyword = req.query.keyword
    ? {
        name: {
          $regex: req.query.keyword,
          $options: 'i',
        },
      }
    : {}

  const items = await Item.find({ ...keyword })

    res.json({ items })
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

//description: Create a review
//route request:  PUT /api/items/:id/reviews
//route access: Private
const createReview = asyncHandler(async (req, res) => {
  const { rating, comment } = req.body

  const item = await Item.findById(req.params.id)

  if (item) {
    const itemReviewed = item.reviews.find(
      (review) => review.user.toString() === req.user._id.toString()
    )

    if (itemReviewed) {
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
//route request:  Get /api/items/topItems
//route access: Public
const getTopItems = asyncHandler(async (req, res) => {
  const items = await Item.find({}).sort({ rating: -1 }).limit(3)

  res.json(items)
})

export {
  getAllItems,
  getItemById,
  createReview,
  getTopItems
}
