import React from 'react'
import Togglable from './Togglable'
import LoginForm from './LoginForm'

const Login = () => {
  return (
    <div>
      <Togglable buttonLabel="log in">
        <LoginForm />
      </Togglable>
    </div>
  )
}

export default Login
