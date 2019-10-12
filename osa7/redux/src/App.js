import React, { useEffect, useState } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'
import { setNotification } from './reducers/notificationReducer'
import { setupUser, logoutUser } from './reducers/userReducer'
import { initializeBlogs, createNewBlog } from './reducers/blogReducer'
import './styles.css'
import { connect } from 'react-redux'

const App = props => {
  const { props: userName, reset: resetUsername } = useField('text')
  const { props: passWord, reset: resetPassword } = useField('text')
  const { props: author, reset: resetAuthor } = useField('text')
  const { props: title, reset: resetTitle } = useField('text')
  const { props: url, reset: resetUrl } = useField('text')

  const [blogs, setBlogs] = useState([])

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

  const handleLogOut = () => {
    props.setNotification('done succesfully logged out', 5)
    window.localStorage.clear()
    props.logoutUser()
  }

  const handleSubmit = async event => {
    event.preventDefault()
    const username = userName.value
    const password = passWord.value

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))
      props.setupUser(user)
      resetUsername()
      resetPassword()
      props.setNotification('done log in successful', 5)
    } catch (exception) {
      props.setNotification('errr wrong username or password', 5)
    }
  }

  const handleLikes = async id => {
    let blog = blogs.find(blog => blog.id === id)

    blog.likes++

    await blogService.update(id, blog)
    setBlogs(blogs.map(n => (n.id !== blog.id ? n : blog)))
  }

  const handleRemoval = async blog => {
    const confirm = window.confirm(`Delete ${blog.title} by ${blog.author}`)
    const id = blog.id

    if (confirm) {
      try {
        await blogService.remove(id)
        setBlogs(blogs.filter(blog => blog.id !== id))
        props.setNotification(`done Blog ${blog.title} removed`, 5)
      } catch (exception) {
        props.setNotification(
          `errr You're not authorized to remove ${blog.title}`,
          5
        )
      }
    }
  }

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="log in">
          <LoginForm
            username={userName}
            password={passWord}
            handleSubmit={handleSubmit}
          />
        </Togglable>
      </div>
    )
  }

  const loggedIn = () => {
    return (
      <div>
        <p>
          {props.user.name} logged in{' '}
          <button onClick={() => handleLogOut()}>log out</button>
        </p>
        {createNewBlogForm()}
        <Blog handleRemoval={handleRemoval} handleLikes={handleLikes} />
      </div>
    )
  }

  const createNewBlog = async event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title.value,
      author: author.value,
      url: url.value,
      likes: 0
    }

    props.createNewBlog(blogObject)
    props.setNotification(`done a new blog ${title.value} added`, 5)
    resetTitle()
    resetAuthor()
    resetUrl()
  }

  const blogFormRef = React.createRef()

  const createNewBlogForm = () => {
    return (
      <div>
        <Togglable buttonLabel="new blog" ref={blogFormRef}>
          <CreateNewBlog
            author={author}
            title={title}
            url={url}
            createNewBlog={createNewBlog}
          />
        </Togglable>
      </div>
    )
  }

  const notification = () => {
    if (props.notification === '') {
      return null
    }

    const message = props.notification.substring(5)
    const error = props.notification.substring(0, 4)

    return <div className={error}>{message}</div>
  }

  return (
    <div className="main">
      <div>
        <h1>Blogs</h1>
        {notification()}
      </div>
      {props.user.name === '' ? loginForm() : loggedIn()}
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
