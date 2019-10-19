require('dotenv').config()
const { ApolloServer, gql, UserInputError } = require('apollo-server')
const uuid = require('uuid/v1')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')

const MONGODB_URI = process.env.MONGODB_URI

console.log('connecting to', MONGODB_URI)

const typeDefs = gql`
  type Author {
    name: String!
    bookCount: Int
    born: Int
    id: ID!
  }

  type Book {
    title: String!
    published: Int!
    author: Author!
    genres: [String!]!
    id: ID!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: ID!
      genres: [String!]!
    ): Book

    addAuthor(name: String!, bookCount: Int, born: Int): Author
    editAuthor(id: String!, setBornTo: Int!): Author
  }
`

mongoose
  .connect(MONGODB_URI, {
    useFindAndModify: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useNewUrlParser: true
  })
  .then(() => {
    console.log(`connected to MongoDB`)
  })
  .catch(error => {
    console.log(`error connection to MONGODB:`, error.message)
  })

const resolvers = {
  Query: {
    authorCount: () => Author.collection.countDocuments(),
    bookCount: () => Book.collection.countDocuments(),
    allBooks: (roots, args) => {
      if (args.author) {
        console.log('Finding by author', args.author)
        return Book.find({ author: { $in: args.author } }).populate('author', {
          name: 1,
          born: 1
        })
      } else if (args.genre) {
        console.log('Finding by genres', args.genre)
        return Book.find({ genres: { $in: [args.genre] } }).populate('author', {
          name: 1,
          born: 1
        })
      } else {
        return Book.find({}).populate('author', { name: 1, born: 1 })
      }
    },
    allAuthors: () => Author.find({})
  },
  Author: {
    bookCount: root => Book.find({ author: { $eq: root.id } }).countDocuments()
  },
  Mutation: {
    addBook: async (root, args) => {
      const author = Author.findOne({ name: args.author })
      try {
        if (!author.name) {
          const newAuthor = await new Author({ name: args.author }).save()

          const newBook = await new Book({
            ...args,
            author: newAuthor._id
          }).save()
          const book = await Book.findById(newBook._id).populate('author', {
            name: 1,
            born: 1
          })
          return book
        }
        const newBook = new Book({ ...args, author: author._id })
        const book = await Book.findById(newBook._id).populate('author', {
          name: 1,
          born: 1
        })
        await book.save()
        return book
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },
    addAuthor: async (roots, args) => {
      try {
        const newAuthor = await new Author({ name: args.name }).save()
        return newAuthor
      } catch (error) {
        console.log(error.errors.name.kind)
        throw new UserInputError(error.message)
      }
    },
    editAuthor: async (roots, args) => {
      try {
        const updatedAuthor = await Author.findByIdAndUpdate(args.id, {
          ...args,
          born: args.setBornTo
        })
        if (!updatedAuthor) {
          return null
        }
        return updatedAuthor
      } catch (error) {
        console.log(error.message)
      }
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers
})

server.listen().then(({ url }) => {
  console.log(`Server ready at ${url}`)
})
