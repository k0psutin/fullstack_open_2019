import React from 'react'
import { connect } from 'react-redux'
import CreateNewBlog from './CreateNewBlog'
import Togglable from './Togglable'

const CreateNewBlogForm = () => {
  return (
    <div>
      <Togglable id='new_blog' buttonLabel='new blog'>
        <CreateNewBlog />
      </Togglable>
    </div>
  )
}

export default connect(null)(CreateNewBlogForm)
