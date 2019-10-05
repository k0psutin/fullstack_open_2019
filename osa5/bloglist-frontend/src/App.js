import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'
import './app.css'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState('done')
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)

  const [author, setAuthor] = useState('')
  const [title, setTitle] = useState('')
  const [url, setUrl] = useState('')

  useEffect(() => {
    blogService.getAll().then(initialBlogs => {
      setBlogs(initialBlogs)
    })
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogOut = () => {
    createNotification(`succesfully logged out`, 'done')
    window.localStorage.clear()
    setUser(null)
  }

  const handleSubmit = async event => {
    event.preventDefault()

    try {
      const user = await loginService.login({
        username,
        password
      })
      window.localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

      setUser(user)
      setUsername('')
      setPassword('')
      createNotification('log in successful', 'done')
    } catch (exception) {
      createNotification(`wrong username or password`, 'error')
    }
  }

  const rows = () => blogs.map(blog => <Blog key={blog.id} blog={blog} />)

  const loginForm = () => {
    return (
      <div>
        <Togglable buttonLabel="log in">
          <LoginForm
            username={username}
            password={password}
            handleUsername={({ target }) => setUsername(target.value)}
            handlePassword={({ target }) => setPassword(target.value)}
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
          {user.name} logged in{' '}
          <button onClick={() => handleLogOut()}>log out</button>
        </p>
        {createNewBlogForm()}
        {rows()}
      </div>
    )
  }

  const createNewBlog = event => {
    event.preventDefault()
    blogFormRef.current.toggleVisibility()
    const blogObject = {
      title: title,
      author: author,
      url: url,
      likes: 0
    }

    blogService.create(blogObject).then(data => {
      setBlogs(blogs.concat(data))
      createNotification(`a new blog ${title}`, 'done')
      setTitle('')
      setAuthor('')
      setUrl('')
    })
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
            handleAuthor={({ target }) => setAuthor(target.value)}
            handleUrl={({ target }) => setUrl(target.value)}
            handleTitle={({ target }) => setTitle(target.value)}
          />
        </Togglable>
      </div>
    )
  }

  const createNotification = (message, error) => {
    setErrorMessage(message)
    setError(error)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  const notification = () => {
    if (errorMessage === null) {
      return null
    }

    return <div className={error}>{errorMessage}</div>
  }

  return (
    <div>
      <div>
        <h1>Blogs</h1>
        {notification()}
      </div>
      {user === null ? loginForm() : loggedIn()}
    </div>
  )
}

export default App
