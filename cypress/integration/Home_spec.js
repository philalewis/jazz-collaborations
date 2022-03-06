describe('Home page and search results', () => {
  it('should render the navbar with a search bar that navigates to a results page', () => {
    cy.visit('http://localhost:3001/')
      .get('nav')
      .get('h1')
      .contains('Jazz Collaborations')
      .get('input:text')
      .type('John Coltrane')
      .get('.search-button').click()
      .url().should('eq', 'http://localhost:3001/search?John%20Coltrane')
      .get('.add-search-results')
      .get('.add-results-button')
      .should('not.be.disabled')
      .get('.artist-results-container')
      .get('.add-results-button')
      .should('not.be.disabled')
      .get('.albums-results-container')
      .get('.album-details')
      .get('.album-artist')
      .contains('John Coltrane')
  })

  it('should render instructions, a list of musician links that navigate to artist pages, and a navigable header that navigates back home', () => {
    cy.visit('http://localhost:3001/')
      .get('.instructions')
      .get('.artist-link')
      .contains('John Coltrane').click()
      .url().should('eq', 'http://localhost:3001/artist/2')
      .get('h1').click()
      .url().should('eq', 'http://localhost:3001/')
  })

  it('should display an error modal if there is a problem with a network request', () => {
    cy.intercept('Get', 'http://localhost:3000/api/v1/musicians', {
      statusCode: 500
    })

    cy.visit('http://localhost:3001/')
      .get('.error-box')
      .contains('Sorry, something went wrong. Please try again later.')
      .get('.exit-error-modal-button').click()
      .get('.error-box')
      .should('not.exist')
  })
})