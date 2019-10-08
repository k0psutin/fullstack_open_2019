import React from 'react'
import { voteAnecdote } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
  const anecdotes = props.store.getState()
  const vote = id => {
    props.store.dispatch(voteAnecdote(id))
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {anecdotes
        .slice()
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote => (
          <div key={anecdote.id}>
            <div>{anecdote.content}</div>
            <div>
              has {anecdote.votes}
              <button onClick={() => vote(anecdote.id)}>vote</button>
            </div>
          </div>
        ))}
    </div>
  )
}

export default AnecdoteList
