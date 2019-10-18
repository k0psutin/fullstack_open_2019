import React, { useState } from 'react'
import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import { gql } from 'apollo-boost'
import { useQuery, useMutation } from '@apollo/react-hooks'

const CREATE_BOOK = gql`
  mutation createBook(
    $title: String!
    $author: String!
    $published: Int!
    $genres: [String!]!
  ) {
    addBook(
      author: $author
      title: $title
      published: $published
      genres: $genres
    ) {
      author
      title
      published
      genres
      id
    }
  }
`

const EDIT_BIRTHYEAR = gql`
  mutation editAuthor($name: String!, $setBornTo: Int!) {
    editAuthor(name: $name, setBornTo: $setBornTo) {
      name
      born
      id
    }
  }
`

const ALL_BOOKS = gql`
  {
    allBooks {
      author
      title
      published
    }
  }
`

const ALL_AUTHORS = gql`
  {
    allAuthors {
      name
      born
      bookCount
      id
    }
  }
`

const App = () => {
  const handleError = error => {
    console.log(error)
  }

  const [page, setPage] = useState('authors')

  const authors = useQuery(ALL_AUTHORS)
  const books = useQuery(ALL_BOOKS)

  const [addBook] = useMutation(CREATE_BOOK, {
    onError: handleError,
    refetchQueries: [{ query: ALL_BOOKS }, { query: ALL_AUTHORS }]
  })
  const [editAuthor] = useMutation(EDIT_BIRTHYEAR, {
    onError: handleError,
    refetchQueries: [{ query: ALL_AUTHORS }]
  })

  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
      </div>

      <Authors
        editAuthor={editAuthor}
        authors={authors}
        show={page === 'authors'}
      />

      <Books books={books} show={page === 'books'} />
      <NewBook addBook={addBook} show={page === 'add'} />
    </div>
  )
}

export default App
