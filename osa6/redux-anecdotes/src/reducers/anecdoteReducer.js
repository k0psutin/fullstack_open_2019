import anecdoteService from '../services/anecdotes'

const reducer = (state = [], action) => {
  switch (action.type) {
    case 'VOTE':
      const id = action.data.id
      const anecdoteToFind = state.find(n => n.id === id)
      const changedAnecdote = {
        ...anecdoteToFind,
        votes: anecdoteToFind.votes + 1
      }
      return state.map(anecdote =>
        anecdote.id !== id ? anecdote : changedAnecdote
      )
    case 'NEW_ANECDOTE':
      return [...state, action.data]

    case 'LIST':
      return state

    case 'INIT_ANECDOTES':
      return action.data

    default:
      return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const anecdotesToShow = () => {
  return {
    type: 'LIST'
  }
}

export const createAnecdote = data => {
  return {
    type: 'NEW_ANECDOTE',
    data
  }
}

export const addNewAnecdote = content => {
  return async dispatch => {
    const object = await anecdoteService.createNew(content)
    dispatch(createAnecdote(object))
  }
}

export const voteAnecdote = object => {
  return {
    type: 'VOTE',
    data: object
  }
}

export const addVote = object => {
  return async dispatch => {
    dispatch(voteAnecdote(object.id))
    object.votes++
    anecdoteService.update(object)
  }
}

export default reducer
