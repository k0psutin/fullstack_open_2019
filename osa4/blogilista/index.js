const express = require('express')
const app = express()
const cors = require('cors')
const mongoose = require('mongoose')

require('dotenv').config()

const blogSchema = new mongoose.Schema({
    title: {
        type: String,
        minlength: 5,
        required: true,
    },
    author: {
        type: String,
        minlength: 5,
        required: true,
    },
    url: {
        type: String,
        minlength: 5,
        required: true,
    },
    likes: {
        type: Number,
    },
})

const Blog = mongoose.model('Blog', blogSchema)

const mongoUrl = process.env.MONGODB_URI
mongoose.connect(mongoUrl,
    {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useFindAndModify: false,
        useCreateIndex: true,
    }).then(() => {
    console.log('Connected to MongoDB')
}).catch((error) => {
    console.log('error connecting to MongoDB, error:', error.message)
})

app.use(cors())
app.use(express.json())

app.get('/api/blogs', (request, response) => {
    Blog
        .find({})
        .then((blogs) => {
            response.json(blogs)
        })
})

app.post('/api/blogs', (request, response) => {
    const blog = new Blog(request.body)

    blog
        .save()
        .then((result) => {
            response.status(201).json(result)
        })
})

const PORT = process.env.PORT
app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`)
})
