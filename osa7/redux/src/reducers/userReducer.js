import loginService from '../services/login'

const initialState = {
  name: '',
  username: '',
  token: ''
}

const userReducer = (state = initialState, action) => {
  switch (action.type) {
    case 'LOGGED_IN_USER':
      return action.user

    case 'USER_LOGGED_OUT':
      return initialState
    default:
      return state
  }
}

export const setupUser = user => {
  return dispatch => {
    dispatch({
      type: 'LOGGED_IN_USER',
      user
    })
  }
}

export const logoutUser = () => {
  return dispatch => {
    dispatch({
      type: 'USER_LOGGED_OUT'
    })
  }
}
export default userReducer
