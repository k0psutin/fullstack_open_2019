import React, { useState, useImperativeHandle } from 'react'
import '../styles.css'

const Delete = ({ handleRemoval, blog }) => (
  <button onClick={() => handleRemoval(blog)}>delete</button>
)

const Blog = ({ blog, handleLikes, handleRemoval, ref, user }) => {
  const [visible, setVisible] = useState(false)

  const showBlog = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const id = blog.id

  useImperativeHandle(ref, () => {
    return {
      toggleVisibility
    }
  })

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

export default Blog
