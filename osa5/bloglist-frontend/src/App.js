import React, { useEffect, useState } from 'react'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
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

  const handleLogin = async event => {
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
      console.log('loggin in with', user)
    } catch (exception) {
      createNotification(`wrong username or password`, 'error')
      console.log(`wrong credentials`)
    }
  }

  const rows = () => blogs.map(blog => <Blog key={blog.id} blog={blog} />)

  const logInForm = () => {
    return (
      <div>
        <h1>Blogs</h1>
        {notification()}
        <h2>log in to application</h2>
        <form onSubmit={handleLogin}>
          <div>
            username
            <input
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
            <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
    )
  }

  const loggedIn = () => {
    return (
      <div>
        <h1>blogs</h1>
        {notification()}
        <p>
          {user.name} logged in{' '}
          <button onClick={() => handleLogOut()}>log out</button>
        </p>
        {createNewBlogForm()}
        {rows()}
      </div>
    )
  }

  const titleHandler = event => {
    setTitle(event.target.value)
  }

  const urlHandler = event => {
    setUrl(event.target.value)
  }

  const authorHandler = event => {
    setAuthor(event.target.value)
  }

  const createNewBlog = event => {
    event.preventDefault()
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

  const createNewBlogForm = () => {
    return (
      <div>
        <h2>create new</h2>
        <form name="blog" onSubmit={createNewBlog}>
          <div>
            title:
            <input
              type="text"
              name="Title"
              value={title}
              onChange={titleHandler}
            />
          </div>
          <div>
            author:
            <input
              type="text"
              name="Author"
              value={author}
              onChange={authorHandler}
            />
          </div>
          <div>
            url:
            <input type="text" name="Url" value={url} onChange={urlHandler} />
          </div>
          <button type="submit">create</button>
        </form>
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

  return <div>{user === null ? logInForm() : loggedIn()}</div>
}

export default App
