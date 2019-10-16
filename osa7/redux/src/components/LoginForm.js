import React from 'react'
import { connect } from 'react-redux'
import { setupUser } from '../reducers/userReducer'
import { setNotification } from '../reducers/notificationReducer'
import loginService from '../services/login'
import { Form, Button } from 'semantic-ui-react'

// import PropTypes from 'prop-types'

const LoginForm = props => {
  const handleSubmit = async event => {
    event.preventDefault()
    const username = event.target.username.value
    const password = event.target.password.value

    try {
      const user = await loginService.login({
        username,
        password,
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      props.setupUser(user)
      props.setNotification({ message: 'log in successful', code: 'done' }, 5)
    } catch (exception) {
      props.setNotification(
        { message: 'wrong username or password', code: 'errr' },
        5,
      )
    }
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Field>
          <label>username</label>
          <input name="username" />
        </Form.Field>
        <Form.Field>
          <label>password</label>
          <input name="password" type="password" />
        </Form.Field>
        <Button type="submit">login</Button>
      </Form>
    </div>
  )
}

/*loginForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleUsername: PropTypes.func.isRequired,
  handlePassword: PropTypes.func.isRequired,
  username: PropTypes.string.isRequired,
  password: PropTypes.string.isRequired
} */

export default connect(
  null,
  { setupUser, setNotification },
)(LoginForm)
