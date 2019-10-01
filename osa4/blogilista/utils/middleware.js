const morgan = require('morgan')

const stringFormat = ':method :url :status :req[content-length] :response-time ms - :post'

const requestLogger = morgan(stringFormat)

morgan.token('post', function (req, res) {
  //console.log(`morgan.token('post'):`, req.body)
  if(req.body.author != undefined | req.body.url != undefined | req.body.likes != undefined) {
    return JSON.stringify({ author: req.body.author, url: req.body.url, likes: req.body.likes })
  }
})

const unknownEndpoint = (request, response) => {
  response.status(404).send({
    error: 'unknown endpoint'
  })
}

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({
      error: 'malformatted id'
    })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({
      error: error.message
    })
  }

  next(error)
}


module.exports = {
  requestLogger,
  unknownEndpoint,
  errorHandler,
}