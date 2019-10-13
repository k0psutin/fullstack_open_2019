import React, { useEffect } from 'react'
import blogService from './services/blogs'
import Notification from './components/Notification'
import Login from './components/Login'
import LoggedIn from './components/LoggedIn'

import { setNotification } from './reducers/notificationReducer'
import { setupUser, logoutUser } from './reducers/userReducer'
import { initializeBlogs, createNewBlog } from './reducers/blogReducer'
import { connect } from 'react-redux'

const App = props => {
  useEffect(() => {
    props.initializeBlogs()
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      props.setupUser(user)
      blogService.setToken(props.user.token)
    }
  }, [])

  return (
    <div className="main">
      <div>
        <h1>Blogs</h1>
        <Notification />
      </div>
      <div>{props.user.name === '' ? <Login /> : <LoggedIn />}</div>
    </div>
  )
}

const mapStateToProps = state => ({
  notification: state.notification,
  blogs: state.blog,
  user: state.user
})

export default connect(
  mapStateToProps,
  { setNotification, initializeBlogs, createNewBlog, setupUser, logoutUser }
)(App)
