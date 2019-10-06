import React from 'react'
import { render, waitForElement, fireEvent } from '@testing-library/react'
import { prettyDOM } from '@testing-library/dom'
import App from './App'

describe('<App />', () => {
  test('if no user logged, notes are not rendered', async () => {
    const component = render(<App />)
    component.rerender(<App />)

    await waitForElement(() => component.getByText('log in'))

    const loginForm = component.getByText('log in to application')

    expect(loginForm).toHaveTextContent('log in to application')
  })

  test('when user is logged in, the blogs are rendered', async () => {
    const user = {
      username: 'testi',
      token:
        'bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ1c2VybmFtZSI6InRlc3RpIiwiaWQiOiI1ZDk3N2VkNGM1YzE4ZjE4Y2M1Njc3MDAiLCJpYXQiOjE1NzAyMTM4ODN9.I7CkX6xt0N48YVjUP0FDyXSV-1A7NZBaM_8f4cvJTho',
      name: 'testi testi'
    }

    localStorage.setItem('loggedBlogappUser', JSON.stringify(user))

    const component = render(<App />)

    await component.rerender(<App />)

    const blogs = component.container.querySelector('.header')

    expect(blogs).toHaveTextContent('Jåå Patrick Johansson')
  })
})
