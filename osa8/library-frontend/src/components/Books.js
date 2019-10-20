import React, { useState } from 'react'

const Books = props => {
  const [genres, setGenres] = useState([])
  const [filter, setFilter] = useState('')

  const mapGenres = data =>
    data.map(data =>
      data.genres.map(genre => {
        if (!genres.includes(genre)) {
          setGenres(genres.concat(genre))
        }
        return genres
      })
    )

  const listBooks = (filter, list) => {
    if (filter === '') {
      return list
    } else {
      return list.filter(a => a.genres.includes(filter))
    }
  }

  if (!props.show) {
    return null
  }
  if (props.books.loading) {
    return <div>loading...</div>
  } else {
    mapGenres(props.books.data.allBooks)

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
            {listBooks(filter, props.books.data.allBooks).map(a => (
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
