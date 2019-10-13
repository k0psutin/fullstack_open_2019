import React from 'react'

import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'

const BlogList = props => {
  const blogList = () =>
    props.blogs.map(blog => (
      <p key={blog.id}>
        <Link to={`/blogs/${blog.id}`}>
          {blog.title} {blog.author}
        </Link>
      </p>
    ))

  return <div>{blogList()}</div>
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
