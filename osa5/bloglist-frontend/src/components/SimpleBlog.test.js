import React from 'react'
import '@testing-library/jest-dom/extend-expect'
import { render, cleanup } from '@testing-library/react'
import SimpleBlog from './SimpleBlog'

afterEach(cleanup)

test('renders blog title, author and likes', () => {
  const simpleBlog = {
    author: 'Jepujeen',
    title: 'keittokirja',
    url: 'googleta',
    likes: 5
  }

  const component = render(<SimpleBlog blog={simpleBlog} />)

  const divAuthorTitle = component.container.querySelector('.titleAndAuthor')
  const divLikes = component.container.querySelector('.likes')

  expect(divAuthorTitle).toHaveTextContent('keittokirja Jepujeen')
  expect(divLikes).toHaveTextContent('blog has 5 likes')
})
