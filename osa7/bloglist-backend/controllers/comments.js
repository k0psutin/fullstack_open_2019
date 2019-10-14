const commentsRouter = require('express').Router()
const Comment = require('../models/comment')

commentsRouter.get('/', async (request, response) => {
  const comments = await Comment.find({})
  response.json(comments.map(comment => comment.toJSON()))
})

commentsRouter.delete('/:id', async (request, reponse, next) => {
  try {
    await Comment.findByIdAndRemove(request.params.id)
    reponse.status(204).end()
  } catch (expection) {
    next(expection)
  }
})

commentsRouter.post('/', async (request, response, next) => {
  const comment = new Comment(request.body)
  try {
    const savedComment = await comment.save()
    response.status(201).json(savedComment)
  } catch (exception) {
    next(exception)
  }
})

module.exports = commentsRouter
