import React from 'react'
import PropTypes from 'prop-types'

const CreateNewBlog = ({
  createNewBlog,
  author,
  title,
  url,
  handleTitle,
  handleAuthor,
  handleUrl
}) => {
  return (
    <div>
      <h2>create new</h2>
      <form name="blog" onSubmit={createNewBlog}>
        <div>
          title:
          <input
            type="text"
            name="Title"
            value={title}
            onChange={handleTitle}
          />
        </div>
        <div>
          author:
          <input
            type="text"
            name="Author"
            value={author}
            onChange={handleAuthor}
          />
        </div>
        <div>
          url:
          <input type="text" name="Url" value={url} onChange={handleUrl} />
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
