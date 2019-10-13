import React from 'react'
import CreateNewBlogForm from './CreateNewBlogForm'
import BlogList from '../components/BlogList'
import UserList from '../components/Users'
import Blog from './Blog'

import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'

import '../styles.css'

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
          <p className="linkSection">
            <Link className="link" to={'/'}>
              blogs
            </Link>
            <Link className="link" to={'/users/'}>
              users
            </Link>
            {props.user.name} logged in
            <button onClick={() => handleLogOut()}>log out</button>
          </p>
          <CreateNewBlogForm />
        </div>
        <Route exact path="/" render={() => <BlogList />} />
        <Route
          exact
          path="/blogs/:id"
          render={({ match }) => <Blog id={match.params.id} />}
        />
        <Route exact path="/users/" render={() => <UserList />} />
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
