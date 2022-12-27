const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')


usersRouter.get('/', async (request, response) => {
    const users = await User.find({})
    response.json(users)
  })

usersRouter.post('/', async (request, response) => {
  const { username, name, password } = request.body

  const existingUser = await User.findOne({ username })
  if (existingUser) {
    return response.status(400).json({
      error: 'username already exists, create a unique one'
    })
  }
  
  if (!request.body.username || request.body.username.length < 3) {
    return response.status(400).json({
      error: 'username must exist or be at least three characters'
    })
  }

  if (!request.body.password || request.body.password.length < 3) {
    return response.status(400).json({
      error: 'password must exist or be at least three characters'
    })
  }

  // || (existingUser.password === null || existingUser.password === 0 || existingUser.password === undefined)

  const saltRounds = 10
  const passwordHash = await bcrypt.hash(password, saltRounds)

  const user = new User({
    username,
    name,
    passwordHash,
  })

  const savedUser = await user.save()

  response.status(201).json(savedUser)
})

module.exports = usersRouter