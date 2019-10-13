import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { createNewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'

const CreateNewBlog = props => {
  const sendNewBlog = async event => {
    event.preventDefault()
    const newBlog = {
      title: event.target.title.value,
      author: event.target.author.value,
      url: event.target.url.value
    }

    blogService.setToken(props.user.token)
    props.createNewBlog(newBlog)
    props.setNotification(
      `done a new blog ${event.target.title.value} added`,
      5
    )
  }

  return (
    <div>
      <h2>create new</h2>
      <form name="blog" onSubmit={sendNewBlog}>
        <div>
          title:
          <input name="title" />
        </div>
        <div>
          author:
          <input name="author" />
        </div>
        <div>
          url:
          <input name="url" />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}
/* 
CreateNewBlog.propTypes = {
  createNewBlog: PropTypes.func.isRequired,
  author: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  url: PropTypes.string.isRequired,
  handleTitle: PropTypes.func.isRequired,
  handleAuthor: PropTypes.func.isRequired,
  handleUrl: PropTypes.func.isRequired
} */

const mapStateToProps = state => ({
  blogForm: state.blogForm,
  user: state.user
})

export default connect(
  mapStateToProps,
  { createNewBlog, setNotification }
)(CreateNewBlog)
