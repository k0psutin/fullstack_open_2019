import React from 'react'
import PropTypes from 'prop-types'

const CreateNewBlog = ({ createNewBlog, author, title, url }) => {
  return (
    <div>
      <h2>create new</h2>
      <form name="blog" onSubmit={createNewBlog}>
        <div>
          title:
          <input {...title} />
        </div>
        <div>
          author:
          <input {...author} />
        </div>
        <div>
          url:
          <input {...url} />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

CreateNewBlog.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired
}

export default CreateNewBlog
