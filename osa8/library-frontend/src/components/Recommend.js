import React from 'react'

const Recommend = props => {
  if (!props.show) {
    return null
  }

  const favoriteGenre = props.me.data.me.favoriteGenre

  if (props.books.loading) {
    return <div>loading...</div>
  } else {
    console.log(
      props.books.data.allBooks.filter(data =>
        data.genres.includes('foliohattuilua')
      )
    )

    return (
      <div>
        <h2>recommendations</h2>
        <p>
          books in your favorite genre <b>{favoriteGenre}</b>
        </p>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>author</th>
              <th>published</th>
            </tr>
            {props.books.data.allBooks
              .filter(data => data.genres.includes(favoriteGenre.toString()))
              .map(a => (
                <tr key={a.title}>
                  <td>{a.title}</td>
                  <td>{a.author.name}</td>
                  <td>{a.published}</td>
                </tr>
              ))}
          </tbody>
        </table>
      </div>
    )
  }
}

export default Recommend
