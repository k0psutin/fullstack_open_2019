import React, { useState } from 'react'

const Authors = props => {
  const [id, setId] = useState('')
  const [born, setBorn] = useState('')

  if (!props.show) {
    return null
  }

  const handleSubmit = async event => {
    event.preventDefault()
    await props.editAuthor({
      variables: { id: id, setBornTo: parseInt(born) }
    })
    setId('')
    setBorn('')
  }

  if (props.authors.loading) {
    return <div>loading..</div>
  } else {
    return (
      <div>
        <h2>authors</h2>
        <table>
          <tbody>
            <tr>
              <th></th>
              <th>born</th>
              <th>books</th>
            </tr>
            {props.authors.data.allAuthors.map(a => (
              <tr key={a.name}>
                <td>{a.name}</td>
                <td>{a.born}</td>
                <td>{a.bookCount}</td>
              </tr>
            ))}
          </tbody>
        </table>
        <h2>set birthyear</h2>
        <form onSubmit={handleSubmit}>
          <div>
            <select onChange={({ target }) => setId(target.value)}>
              {props.authors.data.allAuthors.map(a => (
                <option key={a.id} value={a.id}>
                  {a.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            birthyear
            <input
              type='number'
              value={born}
              onChange={({ target }) => setBorn(target.value)}
            ></input>
          </div>
          <button type='submit'>update author</button>
        </form>
      </div>
    )
  }
}

export default Authors
