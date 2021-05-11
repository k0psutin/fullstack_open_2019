const mongoose = require('mongoose')

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

blogSchema.set('toJSON', {
    transform: (document, returnedObj) => {
        returnedObj.id = returnedObj._id.toString()
        delete returnedObj._id
        delete returnedObj.__v
    },
})

module.exports = mongoose.model('Blog', blogSchema)

