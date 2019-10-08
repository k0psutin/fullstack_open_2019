import React from 'react'
import { connect } from 'react-redux'
import { voteAnecdote } from '../reducers/anecdoteReducer'
import { voteNotification } from '../reducers/notificationReducer'
import { hideNotification } from '../reducers/notificationReducer'
import { anecdotesToShow } from '../reducers/anecdoteReducer'

const AnecdoteList = props => {
  const vote = content => {
    props.voteAnecdote(content.id, content.content)
    props.voteNotification(content.content)
    setTimeout(() => {
      props.hideNotification('')
    }, 5000)
  }
  return (
    <div>
      <h2>Anecdotes</h2>
      {props.anecdotesToShow.map(anecdote => (
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

const mapDispatchToProps = {
  voteAnecdote,
  voteNotification,
  hideNotification,
  anecdotesToShow
}

const mapStateToProps = state => {
  return {
    anecdote: state.anecdote,
    filter: state.filter,
    anecdotesToShow: state.anecdote
      .sort((a, b) => b.votes - a.votes)
      .filter(anecdote => anecdote.content.includes(state.filter))
  }
}

const ConnectedAnecdoteList = connect(mapStateToProps)(AnecdoteList)

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(ConnectedAnecdoteList)
