const supertest = require('supertest')
const _ = require('lodash')
const mongoose = require('mongoose')
const helper = require('./test_helper')
const app = require('../app')
const api = supertest(app)
const Blog = require('../models/blog')

beforeEach(async () => {
  await Blog.deleteMany({})
  
  const blogObjects = helper.bigBlogList
    .map(blog => new Blog(blog))
  const promiseArray = blogObjects.map(blog => blog.save())
  await Promise.all(promiseArray)

})


describe('blog content testing', () => {
  test('can update blog likes', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const updatedBlog = blogsAtStart[0]
    updatedBlog.likes = 15

    await api
      .put(`/api/blogs/${updatedBlog.id}`)
      .send(updatedBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    const expectedBlog = blogsAtEnd[0]

    expect(expectedBlog.likes).toBe(15)
  })
  
  test('blog without content is not added', async () => {
    const newBlog = {
      author: 'Jesse Komulainen',
      likes: 0
    }

    const res = await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(400)

    expect(res.status).toBe(400)
  })

  test('a blog with undefined like should return 0', async () => {
    const newBlog = {
      title: 'Joosepin keittokirja',
      author: 'Jooseppi Vähäkummo',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html', 
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)
    
    const returnedBlogs = await helper.blogsInDb()
    const testBlog = returnedBlogs[returnedBlogs.length - 1]
    expect(testBlog.likes).toBe(0)
  })

  test('blog has a valid id', async () => {
    const blogsAtStart = await helper.blogsInDb()

    expect(blogsAtStart[0].id).toBeDefined()
  })

  test('a valid blog can be added', async () => {
    const newBlog = {
      title: 'Joosepin keittokirja',
      author: 'Jooseppi Vähäkummo',
      url: 'http://blog.cleancoder.com/uncle-bob/2016/05/01/TypeWars.html',
      likes: 0
    }

    await api
      .post('/api/blogs')
      .send(newBlog)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    const blogsAtEnd = await helper.blogsInDb()
    expect(blogsAtEnd.length).toBe(helper.bigBlogList.length + 1)

    const contents = blogsAtEnd.map(blog => blog.title)
    expect(contents).toContain('Joosepin keittokirja')
  })
})

describe('blog get/get id and remove testing', () => {

  test('blogs are returned as JSON', async () => {
    await api
      .get('/api/blogs')
  })

  test('blogs are returned', async () => {
    const response = await helper.blogsInDb()

    expect(response.length).toBe(helper.bigBlogList.length)
  })

  test('a specific blog is within the returned blogs', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    const contents = blogsAtEnd.map(blog => blog.title)

    expect(contents).toContain('Canonical string reduction')
  })

  test('the first blog is about React patterns', async () => {
    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd[0].title).toBe('React patterns')
  })

  test('a specific blog can be viewed', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToView = blogsAtStart[0]

    const resultBlog = await api
      .get(`/api/blogs/${blogToView.id}`)
      .expect(200)
      .expect('Content-Type', /application\/json/)

    expect(resultBlog.body).toEqual(blogToView)
  })

  test('a blog can be deleted', async () => {
    const blogsAtStart = await helper.blogsInDb()
    const blogToDelete = blogsAtStart[0]

    await api
      .delete(`/api/blogs/${blogToDelete.id}`)
      .expect(204)

    const blogsAtEnd = await helper.blogsInDb()

    expect(blogsAtEnd.length).toBe(helper.bigBlogList.length -1)
  })
})

afterAll(() => {
  mongoose.connection.close()
})