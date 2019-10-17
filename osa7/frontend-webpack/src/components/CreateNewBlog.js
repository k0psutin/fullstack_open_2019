import React from 'react'
import { connect } from 'react-redux'
import blogService from '../services/blogs'
import { createNewBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Form, Button, Container } from 'semantic-ui-react'

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
    <Container>
      <h2>create new</h2>
      <Form name='blog' onSubmit={sendNewBlog}>
        <Form.Field>
          <label>title:</label>
          <input id='title' name='title' />
        </Form.Field>
        <Form.Field>
          <label>author:</label>
          <input id='author' name='author' />
        </Form.Field>
        <Form.Field>
          <label>url:</label>
          <input id='url' name='url' />
        </Form.Field>
        <Button id='submit_blog' type='submit'>
          create
        </Button>
      </Form>
    </Container>
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
