import React, { useEffect, useState } from 'react'
import { useField } from './hooks'
import Blog from './components/Blog'
import blogService from './services/blogs'
import loginService from './services/login'
import LoginForm from './components/LoginForm'
import Togglable from './components/Togglable'
import CreateNewBlog from './components/CreateNewBlog'
import './styles.css'

const App = () => {
  const { props: userName, reset: resetUsername } = useField('text')
  const { props: passWord, reset: resetPassword } = useField('text')
  const { props: author, reset: resetAuthor } = useField('text')
  const { props: title, reset: resetTitle } = useField('text')
  const { props: url, reset: resetUrl } = useField('text')

  const [blogs, setBlogs] = useState([])
  const [errorMessage, setErrorMessage] = useState(null)
  const [error, setError] = useState('done')
  const [user, setUser] = useState(null)

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
    createNotification('succesfully logged out', 'done')
    window.localStorage.clear()
    setUser(null)
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

      setUser(user)
      resetUsername()
      resetPassword()
      createNotification('log in successful', 'done')
    } catch (exception) {
      createNotification('wrong username or password', 'error')
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
        createNotification(`Blog ${blog.title} removed`, 'done')
      } catch (exception) {
        createNotification(
          `You're not authorized to remove ${blog.title}`,
          'error'
        )
      }
    }
  }

  const rows = () => {
    blogs.sort(function(a, b) {
      if (a.likes > b.likes) return -1
      if (a.likes < b.likes) return 1

      return 0
    })
    return blogs.map(blog => (
      <Blog
        key={blog.id}
        blog={blog}
        handleRemoval={handleRemoval}
        handleLikes={handleLikes}
        user={user}
      />
    ))
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
          {user.name} logged in{' '}
          <button onClick={() => handleLogOut()}>log out</button>
        </p>
        {createNewBlogForm()}
        {rows()}
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

    const newBlog = await blogService.create(blogObject)
    setBlogs(blogs.concat(newBlog))
    createNotification(`a new blog ${title.value}`, 'done')
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
    <div className="main">
      <div>
        <h1>Blogs</h1>
        {notification()}
      </div>
      {user === null ? loginForm() : loggedIn()}
    </div>
  )
}

export default App
