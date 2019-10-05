import React from 'react'

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

export default CreateNewBlog
