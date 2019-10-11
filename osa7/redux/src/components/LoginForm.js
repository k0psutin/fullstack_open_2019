import React from 'react'
import PropTypes from 'prop-types'

const loginForm = ({ handleSubmit, username, password }) => {
  return (
    <div>
      <h2>log in to application</h2>
      <form onSubmit={handleSubmit}>
        <div>
          username
          <input {...username} />
        </div>
        <div>
          password
          <input {...password} type="password" />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
}

export default loginForm
