import React from 'react'
import { addNewAnecdote } from '../reducers/anecdoteReducer'
import { setNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'

const AnecdoteForm = props => {
  const newAnecdote = async event => {
    event.preventDefault()
    const anecdote = event.target.anecdote.value
    event.target.anecdote.value = ''
    props.addNewAnecdote(anecdote)

    props.setNotification(`Added ${anecdote}`, 5000)
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

export default connect(
  null,
  { setNotification, addNewAnecdote }
)(AnecdoteForm)
