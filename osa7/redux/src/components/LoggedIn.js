import React from 'react'
import CreateNewBlogForm from './CreateNewBlogForm'
import BlogList from '../components/BlogList'
import UserList from '../components/Users'

import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'
import { BrowserRouter as Router, Route } from 'react-router-dom'

const LoggedIn = props => {
  const handleLogOut = () => {
    props.setNotification(
      { message: 'succesfully logged out', code: 'done' },
      5
    )
    window.localStorage.clear()
    props.logoutUser()
  }

  return (
    <div>
      <Router>
        <div>
          <p>
            {props.user.name} logged in{' '}
            <button onClick={() => handleLogOut()}>log out</button>
          </p>
          <CreateNewBlogForm />
        </div>
        <Route exact path="/" render={() => <BlogList />} />
        <Route path="/users" render={() => <UserList />} />
      </Router>
    </div>
  )
}

const mapStateToProps = state => ({
  user: state.user,
  blogs: state.blog
})

export default connect(
  mapStateToProps,
  { logoutUser, setNotification }
)(LoggedIn)
