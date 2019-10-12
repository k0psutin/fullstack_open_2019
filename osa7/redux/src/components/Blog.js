import React, { useState } from 'react'
import '../styles.css'
//import PropTypes from 'prop-types'
import { connect } from 'react-redux'

const Delete = ({ handleRemoval, blog }) => (
  <button onClick={() => handleRemoval(blog)}>delete</button>
)

const Blog = ({ blogs, handleLikes, handleRemoval, user }) => {
  const [visible, setVisible] = useState(false)

  const showBlog = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  return (
    <div>
      {blogs.map(blog => (
        <div key={blog.id}>
          <div className="blogHeader" onClick={toggleVisibility}>
            <div className="header">
              {blog.title} {blog.author}
            </div>
          </div>
          <div style={showBlog} className="blogOpen">
            <p>{blog.url}</p>
            <p>
              {blog.likes} likes.
              <button onClick={() => handleLikes(blog.id)}>like</button>
            </p>
            <p>added by: {blog.user.name}</p>
            {user.username === blog.user.username ? (
              <Delete blog={blog} handleRemoval={handleRemoval} />
            ) : (
              ''
            )}
          </div>
        </div>
      ))}
    </div>
  )
}

/* 
Blog.propTypes = {
  blog: PropTypes.object.isRequired,
  handleLikes: PropTypes.func.isRequired,
  handleRemoval: PropTypes.func.isRequired,
  user: PropTypes.object.isRequired
}
*/

const mapStateToProps = state => ({
  user: state.user,
  blogs: state.blog
})

export default connect(mapStateToProps)(Blog)
