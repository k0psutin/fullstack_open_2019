const reducer = (state = '', action) => {
  switch (action.type) {
    case 'SET_STATUS':
      return (state = action.data)
    case 'GET_STATUS':
      return state
    case 'HIDE_STATUS':
      return (state = action.data)

    default:
      return state
  }
}

export const getStatus = () => {
  return {
    type: 'GET_STATUS'
  }
}

export const showNotification = notification => {
  return {
    type: 'SET_STATUS',
    data: `${notification}`
  }
}

export const hideNotification = () => {
  return {
    type: 'HIDE_STATUS',
    data: ''
  }
}

export const setNotification = (notification, time) => {
  return async dispatch => {
    dispatch(showNotification(notification))

    setTimeout(() => {
      dispatch(hideNotification())
    }, time)
  }
}

export const voteNotification = notification => {
  return {
    type: 'SET_STATUS',
    data: `Voted for ${notification}`
  }
}

export default reducer
