import blogService from '../services/blogs'

const byLikes = (b1, b2) => b2.likes - b1.likes

const blogReducer = (state = [], action) => {
  switch (action.type) {
    case 'NEW_BLOG':
      return state.concat(action.blog).sort(byLikes)
    case 'INIT_BLOG':
      return state.concat(action.blog).sort(byLikes)
    case 'LIKED_BLOG':
      return state
        .map(a => (a.id !== action.blog.id ? a : action.blog))
        .sort(byLikes)
    case 'REMOVE_BLOG':
      // [...state.slice(0, action.id), ...state.slice(action.id + 1)]
      return state.filter(blog => blog.id !== action.id)

    default:
      return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blog = await blogService.getAll()
    dispatch({
      blog,
      type: 'INIT_BLOG',
    })
  }
}

export const removeBlog = (id, token) => {
  return async dispatch => {
    blogService.setToken(token)
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      id,
    })
  }
}

export const likeBlog = likedBlog => {
  return async dispatch => {
    const blog = { ...likedBlog, likes: likedBlog.likes + 1 }
    await blogService.update(blog)
    console.log(blog)
    dispatch({
      type: 'LIKED_BLOG',
      blog,
    })
  }
}

export const createNewBlog = content => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      blog: newBlog,
      type: 'NEW_BLOG',
    })
  }
}

export default blogReducer
