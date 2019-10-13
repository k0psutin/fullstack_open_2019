import React from 'react'
import '../styles.css'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
// import PropTypes from 'prop-types'

const Blog = ({ id, blogs, user }) => {
  console.log('Blogs:', blogs)
  console.log('Id', id)

  if (!blogs) {
    return null
  } else {
    const handleRemoval = async blog => {
      const confirm = window.confirm(`Delete ${blog.title} by ${blog.author}`)
      const id = blog.id

      if (confirm) {
        try {
          removeBlog(id, user.token)
          setNotification(
            { code: 'done', message: ` Blog ${blog.title} removed` },
            5
          )
        } catch (exception) {
          setNotification(
            {
              code: 'errr',
              message: `You're not authorized to remove ${blog.title}`
            },
            5
          )
        }
      }
    }

    const Delete = ({ handleRemoval, blog }) => (
      <button onClick={() => handleRemoval(blog)}>delete</button>
    )

    const handleLikes = id => {
      const liked = blogs.find(blog => blog.id === id)
      likeBlog(liked)
      setNotification({ message: `Liked ${liked.title}!`, code: 'done' }, 5)
    }

    const blog = blogs.find(blog => blog.id === id)

    console.log(blogs)

    return (
      <div>
        {blog.title} {blog.author}
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
    )
  }
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
  blogs: state.blog,
  user: state.user
})

export default connect(
  mapStateToProps,
  { setNotification, removeBlog, likeBlog }
)(Blog)
