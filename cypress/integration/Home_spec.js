describe('Home page', () => {
  it('should render the navbar', () => {
    cy.visit('http://localhost:3001/')
      .get('h1')
  })
})