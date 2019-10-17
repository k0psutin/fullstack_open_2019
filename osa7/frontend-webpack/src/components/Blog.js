import React, { useEffect, useState } from 'react'
import '../styles.css'
import { connect } from 'react-redux'
import { setNotification } from '../reducers/notificationReducer'
import { removeBlog, likeBlog } from '../reducers/blogReducer'
import commentService from '../services/comments'
import { bindActionCreators } from 'redux'
// import PropTypes from 'prop-types'

const Blog = ({ id, blogs, user }) => {
  const [comments, setComments] = useState([])
  const [comment, setComment] = useState('')

  useEffect(() => {
    commentService.getAll(id).then(response => {
      setComments(response.filter(data => data.blog_id === id))
    })
  }, [])

  if (!blogs) {
    return null
  } else {
    const handleRemoval = async blog => {
      const confirm = window.confirm(`Delete ${blog.title} by ${blog.author}`)
      const id = blog.id

      if (confirm) {
        try {
          removeBlog(id, user.token)
          setNotification(
            { code: 'done', message: ` Blog ${blog.title} removed` },
            5,
          )
        } catch (exception) {
          setNotification(
            {
              code: 'errr',
              message: `You're not authorized to remove ${blog.title}`,
            },
            5,
          )
        }
      }
    }

    const Delete = ({ handleRemoval, blog }) => (
      <button onClick={() => handleRemoval(blog)}>delete</button>
    )

    const handleLikes = id => {
      const liked = blogs.find(blog => blog.id === id)
      likeBlog(liked)
      setNotification({ message: `Liked ${liked.title}!`, code: 'done' }, 5)
    }

    const blog = blogs.find(blog => blog.id === id)

    const createComment = async (event, id) => {
      event.preventDefault()
      const newComment = {
        comment: comment,
        blog_id: blog.id,
      }

      const returned = await commentService.create(id, newComment)
      setComments(comments.concat(returned))
      setComment('')
    }

    return (
      <div>
        {blog.title} {blog.author}
        <p>{blog.url}</p>
        <p>
          {blog.likes} likes.
          <button onClick={() => handleLikes(blog.id)}>like</button>
        </p>
        <p>added by: {blog.user.name}</p>
        {user.username === blog.user.username ? (
          <Delete blog={blog} handleRemoval={handleRemoval} />
        ) : (
          ''
        )}
        <div>
          <h2>comments</h2>
          <form name="newComment" onSubmit={createComment}>
            <input
              type="text"
              value={comment}
              onChange={({ target }) => setComment(target.value)}
            />
            <button type="submit">add comment</button>
          </form>
          {comments.map(data => (
            <li key={data.id}>{data.comment}</li>
          ))}
        </div>
      </div>
    )
  }
}

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ setNotification, removeBlog, likeBlog }, dispatch)
}

const mapStateToProps = state => ({
  blogs: state.blog,
  user: state.user,
  props: state.dispatch,
})

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Blog)
