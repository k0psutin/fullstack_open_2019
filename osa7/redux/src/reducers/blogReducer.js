import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.data).sort(byLikes)
    case 'INIT_BLOG':
      return state.concat(action.data).sort(byLikes)
    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const data = await blogService.getAll()
    dispatch({
      data,
      type: 'INIT_BLOG'
    })
  }
}

export const createNewBlog = data => {
  return async dispatch => {
    const newBlog = await blogService.create(data)
    dispatch({
      data: newBlog,
      type: 'NEW_BLOG'
    })
  }
}

export default blogReducer
