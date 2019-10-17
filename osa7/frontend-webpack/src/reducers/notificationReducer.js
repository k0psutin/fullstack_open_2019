const initialState = {
  message: '',
  code: 'errr'
}

const notificationReducer = (state = initialState, action) => {
  if (action.type === 'SET_NOTIFICATION') {
    return action.notification
  } else if (action.type === 'CLEAR_NOTIFICATION') {
    return ''
  }
  return state
}

export const setNotification = (notification, seconds) => {
  return dispatch => {
    dispatch({
      type: 'SET_NOTIFICATION',
      notification
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
