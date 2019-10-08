import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'

const AnecdoteList = ({ store }) => {
  console.log('stores:', store.getState())
  const { anecdote, notification, filter } = store.getState()

  const vote = content => {
    store.dispatch(voteAnecdote(content.id, content.content))
    store.dispatch(voteNotification(content.content))
    setTimeout(() => {
      store.dispatch(hideNotification(''))
    }, 5000)
  }

  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdote
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
