import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import Blog from './Blog'

describe('<Blog />', () => {
  const blog = {
    title: 'React haltuun',
    author: 'Matti Luukkainen',
    url: 'googleta',
    likes: 3,
    user: {
      username: 'testi',
      name: 'testi testi',
      id: '5d977ed4c5c18f18cc567700'
    },
    id: '5d99bf56358e62065077fc2d'
  }

  const loggedUser = {
    username: 'testi testi',
    user: 'testi',
    id: '5d977ed4c5c18f18cc567700'
  }

  const handleRemoval = jest.fn()
  const handleLikes = jest.fn()

  let component

  beforeEach(() => {
    component = render(
      <Blog
        key={blog.id}
        blog={blog}
        handleRemoval={handleRemoval}
        handleLikes={handleLikes}
        user={loggedUser}
      />
    )
  })

  test('Only title and author is showing', () => {
    expect(component.container).toHaveTextContent(
      'React haltuun Matti Luukkainen'
    )
  })

  test('Clicking title expands the blog correctly', () => {
    const clickTitle = component.getByText('React haltuun Matti Luukkainen')

    fireEvent.click(clickTitle)

    const openedBlog = component.container.querySelector('.blogOpen')

    expect(openedBlog).toHaveTextContent(
      'googleta3 likes.likeadded by: testi testi'
    )
  })
})
