import mongoose from 'mongoose';

const reviewSchema = mongoose.Schema({
    name: { type: String, required: true},
    rating: { type: Number, required: true},
    comment: { type: String, required: true},
}, {
    // createdAt updatedAt is made auto with this
    timestamps: true
})

const itemSchema = mongoose.Schema({

    // Adds relationship between item and a user
    user: {
        type: mongoose.Schema.Types.ObjectId,
        required: true,
        ref: 'User'
    },
    name: {
        type: String,
        required: true
    },
    image: {
        type: String,
        required: true
    },
    brand: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    }, 
    category: {
        type: String,
        required: true
    },
    price: {
        type: Number,
        required: true,
        default: 0
    },
    rating: {
        type: Number,
        required: true,
        default: 0
    },
    amountInStock: {
        type: Number,
        required: true,
        default: 0
    },

    reviews: [reviewSchema],
    numOfReviews: {
        type: Number,
        required: true,
        default: 0
    }
}, {
    // createdAt updatedAt is made auto with this
    timestamps: true
})

const Item = mongoose.model('Item', itemSchema);

export default Item;