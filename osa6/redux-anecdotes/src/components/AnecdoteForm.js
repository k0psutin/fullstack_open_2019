import React from 'react'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { addAnectode } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'
import { connect } from 'react-redux'
import anecdoteService from '../services/anecdotes'

const AnecdoteForm = props => {
  const newAnecdote = async event => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''
    const anecdote = await anecdoteService.createNew(content)
    props.createAnecdote(anecdote)
    props.addAnectode(content)
    setTimeout(() => {
      props.hideNotification()
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

export default connect(
  null,
  { createAnecdote, addAnectode, hideNotification }
)(AnecdoteForm)
