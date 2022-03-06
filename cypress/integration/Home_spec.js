describe('Home page', () => {
  it.only('should render the navbar with a search bar', () => {
    cy.visit('http://localhost:3001/')
      .get('nav')
      .get('h1')
      .contains('Jazz Collaborations')
      .get('input:text')
      .type('John Coltrane')
      .get('.search-button').click()
  })

  it('should render instructions and a list of musician links', () => {
    cy.visit('http://localhost:3001/')
      .get('.instructions')
      .get('.artist-link')
      .contains('John Coltrane').click()
  })
})