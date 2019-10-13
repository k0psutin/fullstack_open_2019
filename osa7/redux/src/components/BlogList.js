import React from 'react'
import Blog from './Blog'
import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const BlogList = props => {
  const handleRemoval = async blog => {
    const confirm = window.confirm(`Delete ${blog.title} by ${blog.author}`)
    const id = blog.id

    if (confirm) {
      try {
        props.removeBlog(id, props.user.token)
        props.setNotification(
          { code: 'done', message: ` Blog ${blog.title} removed` },
          5
        )
      } catch (exception) {
        props.setNotification(
          {
            code: 'errr',
            message: `You're not authorized to remove ${blog.title}`
          },
          5
        )
      }
    }
  }

  const handleLikes = id => {
    const liked = props.blogs.find(blog => blog.id === id)
    props.likeBlog(liked)
    props.setNotification({ message: `Liked ${liked.title}!`, code: 'done' }, 5)
  }

  return props.blogs.map(blog => (
    <Blog
      key={blog.id}
      blog={blog}
      user={props.user}
      handleRemoval={handleRemoval}
      handleLikes={handleLikes}
    />
  ))
}

const mapStateToProps = state => ({
  notification: state.notification,
  blogs: state.blog,
  user: state.user
})

export default connect(
  mapStateToProps,
  { likeBlog, removeBlog, setNotification }
)(BlogList)
