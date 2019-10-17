import React from 'react'
import _ from 'lodash'
import { connect } from 'react-redux'

const User = ({ blogs, id }) => {
  if (!blogs) {
    return null
  } else {
    const userBlogs = blogs.filter(blog => blog.user.id === id)
    const user = _.uniqBy(_.map(userBlogs, (val, key) => val.user.name), 'name')

    return (
      <div>
        <h1>{user}</h1>
        <h2>added blogs</h2>
        {userBlogs.map(blog => (
          <li key={blog.id}>{blog.title}</li>
        ))}
      </div>
    )
  }
}

const mapStateToProps = state => ({
  blogs: state.blog
})

export default connect(mapStateToProps)(User)
