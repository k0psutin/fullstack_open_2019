require('dotenv').config()
const jwt = require('jsonwebtoken')
const {
  ApolloServer,
  gql,
  UserInputError,
  AuthenticationError,
  PubSub
} = require('apollo-server')
const mongoose = require('mongoose')
const Book = require('./models/book')
const Author = require('./models/author')
const User = require('./models/user')

const MONGODB_URI = process.env.MONGODB_URI
const JWT_SECRET = process.env.JWT_SECRET

console.log('connecting to', MONGODB_URI)

const pubsub = new PubSub()

const typeDefs = gql`
  type Author {
    name: String!
    books: [String!]!
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

  type User {
    username: String!
    favoriteGenre: String!
    id: ID!
  }

  type Token {
    value: String!
  }

  type Query {
    authorCount: Int!
    bookCount: Int!
    allBooks(author: String, genre: String): [Book!]!
    allAuthors: [Author!]!
    me: User
  }

  type Mutation {
    addBook(
      title: String!
      published: Int!
      author: ID!
      genres: [String!]!
    ): Book

    addAuthor(
      name: String!
      books: [String!]!
      bookCount: Int
      born: Int
    ): Author
    editAuthor(id: String!, setBornTo: Int!): Author

    createUser(username: String!, favoriteGenre: String!): User
    login(username: String!, password: String!): Token
  }

  type Subscription {
    bookAdded: Book!
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
        return Book.find({}).populate('author', { name: 1, born: 1, id: 1 })
      }
    },
    allAuthors: () => Author.find({}),
    me: (root, args, context) => {
      return context.currentUser
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        let author = await Author.findOne({ name: args.author })

        if (author === null) {
          author = await new Author({ name: args.author }).save()
          author = await Author.findOne({ name: args.author })
          author.books = []
        }
        const newBook = await new Book({ ...args, author: author._id }).save()

        const book = await Book.findById(newBook._id).populate('author', {
          name: 1,
          born: 1,
          id: 1
        })

        author.books = author.books.concat(newBook._id)

        await Author.findByIdAndUpdate(author._id, author)

        pubsub.publish('BOOK_ADDED', { bookAdded: book })

        return book
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },
    addAuthor: async (roots, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        const newAuthor = await new Author({ name: args.name }).save()
        return newAuthor
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },
    editAuthor: async (roots, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }
      try {
        return await Author.findByIdAndUpdate(args.id, {
          ...args,
          born: args.setBornTo
        })
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },
    createUser: async (root, args) => {
      const user = new User({
        username: args.username,
        favoriteGenre: args.favoriteGenre
      })
      try {
        return await user.save()
      } catch (error) {
        throw new UserInputError(error.message)
      }
    },
    login: async (root, args) => {
      try {
        const user = await User.findOne({ username: args.username })

        if (!user || args.password !== 'secret') {
          throw new UserInputError('wrong credentials')
        }

        const userForToken = {
          username: user.username,
          id: user._id
        }

        return { value: jwt.sign(userForToken, JWT_SECRET) }
      } catch (error) {
        throw new UserInputError(error.message)
      }
    }
  },
  Subscription: {
    bookAdded: {
      subscribe: () => pubsub.asyncIterator(['BOOK_ADDED'])
    }
  }
}

const server = new ApolloServer({
  typeDefs,
  resolvers,
  context: async ({ req }) => {
    const auth = req ? req.headers.authorization : null
    if (auth && auth.toLowerCase().startsWith('bearer ')) {
      const decodedToken = jwt.verify(auth.substring(7), JWT_SECRET)
      const currentUser = await User.findById(decodedToken.id)
      return { currentUser }
    }
  }
})

server.listen().then(({ url, subscriptionsUrl }) => {
  console.log(`Server ready at ${url}`)
  console.log(`Subscriptions ready at ${subscriptionsUrl}`)
})
