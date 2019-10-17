import React from 'react'

import { connect } from 'react-redux'
import { likeBlog, removeBlog } from '../reducers/blogReducer'
import { setNotification } from '../reducers/notificationReducer'
import { Link } from 'react-router-dom'
import { Container, Table } from 'semantic-ui-react'

const BlogList = props => {
  const blogList = () =>
    props.blogs.map(blog => (
      <Table.Row key={blog.id}>
        <Table.Cell>
          <Link to={`/blogs/${blog.id}`}>
            {blog.title} {blog.author}
          </Link>
        </Table.Cell>
      </Table.Row>
    ))

  return (
    <Container>
      <Table striped celled>
        <Table.Body>{blogList()}</Table.Body>
      </Table>
    </Container>
  )
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
