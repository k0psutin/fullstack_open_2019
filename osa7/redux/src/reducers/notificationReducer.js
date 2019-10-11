const notificationReducer = (state = '', action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.data
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return ''
  }
  return state
}

export const setNotification = (data, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      data
    })
    setTimeout(() => {
      dispatch({
        type: 'CLEAR_NOTIFICATION'
      })
    }, seconds * 1000)
  }
}

export const clearNotification = () => ({
  type: 'CLEAR_NOTIFICATION'
})

export default notificationReducer
