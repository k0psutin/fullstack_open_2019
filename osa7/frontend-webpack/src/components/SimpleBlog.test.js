import React from 'react'
import { render, fireEvent } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

describe('<SimpleBlog />', () => {
  test('renders blog title, author', () => {
    const simpleBlog = {
      author: 'Jepujeen',
      title: 'keittokirja',
      url: 'googleta',
      likes: 5
    }

    const component = render(<SimpleBlog blog={simpleBlog} />)

    const divAuthorTitle = component.container.querySelector('.titleAndAuthor')
    expect(divAuthorTitle).toHaveTextContent('keittokirja Jepujeen')
  })

  test('renders blogs likes', () => {
    const simpleBlog = {
      author: 'Jepujeen',
      title: 'keittokirja',
      url: 'googleta',
      likes: 5
    }

    const component = render(<SimpleBlog blog={simpleBlog} />)
    const divLikes = component.container.querySelector('.likes')
    expect(divLikes).toHaveTextContent('blog has 5 likes')
  })

  test('like button eventhandler responds twice', () => {
    const simpleBlog = {
      author: 'Jepujeen',
      title: 'keittokirja',
      url: 'googleta',
      likes: 5
    }

    const mockHandler = jest.fn()

    const { getByText } = render(
      <SimpleBlog blog={simpleBlog} onClick={mockHandler} />
    )

    const button = getByText('like')
    fireEvent.click(button)
    fireEvent.click(button)
    expect(mockHandler.mock.calls.length).toBe(2)
  })
})
