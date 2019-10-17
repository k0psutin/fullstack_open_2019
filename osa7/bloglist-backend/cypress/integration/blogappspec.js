describe('Blog app ', function() {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3001/api/testing/reset')
    const user = {
      name: 'Jarkko Manninen',
      username: 'jake',
      password: 'hilitipititappi'
    }
    cy.request('POST', 'http://localhost:3001/api/users/', user)
    cy.visit('http://localhost:3000')
  })

  describe('when logged in', () => {
    beforeEach(() => {
      cy.contains('log in').click()
      cy.get('#username').type('jake')
      cy.get('#password').type('hilitipititappi')
      cy.contains('login').click()
    })

    it('name of the user is shown', () => {
      cy.contains('Jarkko Manninen logged in')
    })

    describe('can comment blogs and remove blogs', () => {
      beforeEach(() => {
        cy.get('#new_blog').click()
        cy.get('#author').type('Matti Luukkainen')
        cy.get('#title').type('Full stack open 2019')
        cy.get('#url').type('http://fullstackopen.com')
        cy.get('#submit_blog').click()
        cy.get('#cancel').click()
      })

      it('can make a comment', () => {
        cy.wait(2000)
        cy.contains('#blog', 'Matti Luukkainen').click()
        cy.get('#comment').type('Such an awesome course, recommend to read.')
        cy.contains('add comment').click()
        cy.contains('Such an awesome course, recommend to read.')
      })
    })
  })
})
