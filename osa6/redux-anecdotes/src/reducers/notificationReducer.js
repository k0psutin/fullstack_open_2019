const reducer = (state = '', action) => {
  console.log('notification state', state)
  console.log('action', action)
  console.log('action', action.data)

  switch (action.type) {
    case 'SET_STATUS':
      return (state = action.data)
    case 'HIDE_STATUS':
      return (state = action.data)

    default:
      return state
  }
}

export const addAnectode = notification => {
  return {
    type: 'SET_STATUS',
    data: `Added ${notification}`
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_STATUS',
    data: ''
  }
}

export const voteNotification = notification => {
  console.log(notification)
  return {
    type: 'SET_STATUS',
    data: `Voted for ${notification}`
  }
}

export default reducer
