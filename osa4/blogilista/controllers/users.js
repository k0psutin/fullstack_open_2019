const bcrypt = require('bcryptjs')
const usersRouter = require('express').Router()
const User = require('../models/user')

usersRouter.post('/', async (request, response, next) => {
  try {
    const body = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)
    console.log(passwordHash)
    const user = new User({
      username: body.username,
      name: body.name,
      passwordHash
    })
    if (body.username.length > 2 && body.password.length > 2) {
      const savedUser = await user.save()
      response.json(savedUser)
    } else {
      return response.status(400).json({ error: 'username/password minimum length is 3' })
    }
  } catch (exception) {
    next(exception)
  }
})

usersRouter.get('/', async (request, response) => {
  const users = await User.find({}).populate('blogs', { url: 1, title: 1, author: 1, id: 1 })

  response.json(users.map(user => user.toJSON()))
})

module.exports = usersRouter
