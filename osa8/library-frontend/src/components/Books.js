import React, { useState } from 'react'
import { gql } from 'apollo-boost'

const FIND_BOOK_BY_GENRE = gql`
  query findBookByGenre($genre: String!) {
    allBooks(genre: $genre) {
      author {
        name
        born
      }
      title
      published
      genres
    }
  }
`

const Books = ({ client, show }) => {
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState('')
  const [filteredBooks, setFilteredBooks] = useState([])

  const mapGenres = data =>
    data.map(data =>
      data.genres.map(genre => {
        if (!genres.includes(genre)) {
          setGenres(genres.concat(genre))
        }
        return genres
      })
    )

  if (!show) {
    return null
  }
  if (!mapGenres) {
    return <div>loading...</div>
  } else {
    const showBooks = async filter => {
      const { data } = await client.query({
        query: FIND_BOOK_BY_GENRE,
        variables: { genre: filter }
      })
      setFilteredBooks(data.allBooks)
    }

    showBooks(filter)
    mapGenres(filteredBooks)

    if (!showBooks) {
      return <div>not found</div>
    }
    return (
      <div>
        <h2>books</h2>

        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {filteredBooks.map(a => (
              <tr key={a.title}>
                <td>{a.title}</td>
                <td>{a.author.name}</td>
                <td>{a.published}</td>
              </tr>
            ))}
          </tbody>
        </table>
        {genres.map(genre => (
          <button onClick={() => setFilter(genre)} key={genre}>
            {genre}
          </button>
        ))}
        <button onClick={() => setFilter('')}>show all</button>
      </div>
    )
  }
}

export default Books
