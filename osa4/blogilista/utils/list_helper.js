const _ = require('lodash')

const dummy = (blogs) => {
  return 1
}


const mostFavoriteBlog = (blogs) => {
  const favoriteBlog = _.maxBy(blogs, 'likes')
  //const mostLikes = blogs.reduce((sum, blog) => sum + blog.likes, 0)
  const foundBlog = [
    {
      title: favoriteBlog.title,
      author: favoriteBlog.author,
      likes: favoriteBlog.likes
    }
  ]

  return foundBlog
} 

const totalLikes = (blogs) => blogs.reduce((sum, blog) => sum + blog.likes, 0)

const mostLikes = (blogs) => _(blogs)
  .groupBy('author')
  .map((obj, key) => {
    return {
      'author': key,
      'likes': _.sumBy(obj, 'likes')
    }
  })
  .maxBy('likes')



const mostBlogs = (blogs) => {
  
  const mostDone = _.maxBy(blogs, 'author').author
  const writtenBlogs = _.countBy(blogs, 'author')

  const mostActive = [
    {
      author: mostDone,
      blogs: writtenBlogs[mostDone]
    }
  ]

  return mostActive
}
  

module.exports = {
  dummy,
  totalLikes,
  mostLikes,
  mostBlogs,
  mostFavoriteBlog
}


