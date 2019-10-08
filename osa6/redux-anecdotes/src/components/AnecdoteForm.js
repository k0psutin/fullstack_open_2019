import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addAnectode } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'

const AnecdoteForm = ({ store }) => {
  const newAnecdote = event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    console.log(store)
    store.dispatch(createAnecdote(content))
    store.dispatch(addAnectode(content))
    setTimeout(() => {
      store.dispatch(hideNotification())
    }, 5000)
  }
  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={newAnecdote}>
        <div>
          <input name='anecdote' />
        </div>
        <button type='submit'>create</button>
      </form>
    </div>
  )
}

export default AnecdoteForm
