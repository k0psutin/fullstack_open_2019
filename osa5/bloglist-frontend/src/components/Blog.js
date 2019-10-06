import React, { useState } from 'react'
import '../styles.css'
import PropTypes from 'prop-types'

const Delete = ({ handleRemoval, blog }) => (
  <button onClick={() => handleRemoval(blog)}>delete</button>
)

const Blog = ({ blog, handleLikes, handleRemoval, user }) => {
  const [visible, setVisible] = useState(false)

  const showBlog = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const id = blog.id

  return (
    <div>
      <div className="blogHeader" onClick={toggleVisibility}>
        <div>
          {blog.title} {blog.author}
        </div>
      </div>
      <div style={showBlog} className="blogOpen">
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes.
          <button onClick={() => handleLikes(id)}>like</button>
        </p>
        <p>added by: {blog.user.name}</p>
        {user.username === blog.user.username ? (
          <Delete blog={blog} handleRemoval={handleRemoval} />
        ) : (
          ''
        )}
      </div>
    </div>
  )
}

Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemoval: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}

export default Blog
