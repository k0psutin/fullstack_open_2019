import React from 'react'
import CreateNewBlogForm from './CreateNewBlogForm'
import BlogList from '../components/BlogList'
import UserList from '../components/Users'
import Blog from './Blog'

import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { logoutUser } from '../reducers/userReducer'
import { BrowserRouter as Router, Route, Link } from 'react-router-dom'
import { Container, Button, Menu } from 'semantic-ui-react'

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
    <Container>
      <Router>
        <div>
          <Menu inverted>
            <Menu.Item link>
              <Link className="link" to={'/'}>
                blogs
              </Link>
            </Menu.Item>
            <Menu.Item link>
              <Link className="link" to={'/users/'}>
                users
              </Link>
            </Menu.Item>
            <Menu.Item>{props.user.name} logged in</Menu.Item>
            <Menu.Item onClick={() => handleLogOut()}>log out</Menu.Item>
          </Menu>
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
    </Container>
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
