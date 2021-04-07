import asyncHandler from 'express-async-handler';
import User from '../models/User.js';
import jwt from 'jsonwebtoken';
import bcrypt from 'bcryptjs';


const getToken = (id) => {
    return jwt.sign({ id }, process.env.JWT_SECRET, {
      expiresIn: '30d',
    })
}

//description: Auth a user and get a token
//route request:  POST api/users/login
//route access: Public
const authenticateUser = asyncHandler(async (req, res) => {
  const { email, password } = req.body

  const user = await User.findOne({ email })

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user._id),
    })
  } else {
    res.status(401)
    throw new Error('Invalid email or password')
  }
})

// description:    Register a new user
// route request:   POST api/users
// route access:  Public
const registerUser = asyncHandler(async (req, res) => {
  const { name, email, password } = req.body

  const userExists = await User.findOne({ email })

  if (userExists) {
    res.status(400)
    throw new Error('User already exists')
  }

  const user = await User.create({
    name,
    email,
    password,
  })

  const salt = await bcrypt.genSalt(10);

  user.password = await bcrypt.hash(password, salt);

  await user.save();

  if (user) {
    res.status(201).json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
      token: getToken(user._id),
    })
  } else {
    res.status(400)
    throw new Error('Invalid user data')
  }
})



// description:    Get user profile
// route request:   GET api/users/profile
// route access:  Private + Token needed
const getProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    res.json({
      _id: user._id,
      name: user.name,
      email: user.email,
      isAdmin: user.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})


// description:    Edit user profile
// route request:   PUT api/users/profile
// route access:  Private + Token needed
const editProfile = asyncHandler(async (req, res) => {
  const user = await User.findById(req.user._id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    if (req.body.password) {
      user.password = req.body.password
    }

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
      token: getToken(updatedUser._id),
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// description:    Get all users
// route request:   GET api/users
// route access:  Private + Admin
const getUsers = asyncHandler(async (req, res) => {
  const users = await User.find({})
  res.json(users)
})

// description:    Delete user
// route request:   DELETE api/users/:id
// route access:  Private + Admin
const deleteUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    await user.remove()
    res.json({ message: 'User removed' })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// description:    Get user by ID
// route request:   GET api/users/:id
// route access:  Private + Admin
const getUserById = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id).select('-password')

  if (user) {
    res.json(user)
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

// description:    Edit user
// route request:   PUT api/users/:id
// route access:  Private + Admin
const editUser = asyncHandler(async (req, res) => {
  const user = await User.findById(req.params.id)

  if (user) {
    user.name = req.body.name || user.name
    user.email = req.body.email || user.email
    user.isAdmin = req.body.isAdmin

    const updatedUser = await user.save()

    res.json({
      _id: updatedUser._id,
      name: updatedUser.name,
      email: updatedUser.email,
      isAdmin: updatedUser.isAdmin,
    })
  } else {
    res.status(404)
    throw new Error('User not found')
  }
})

export {
  getToken,
  authenticateUser,
  registerUser,
  getProfile,
  editProfile,
  getUsers,
  deleteUser,
  getUserById,
  editUser
}