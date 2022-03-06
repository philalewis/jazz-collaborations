describe('Home page and search results', () => {
  it('should render the navbar with a search bar that navigates to a results page', () => {
    cy.visit('http://localhost:3001/')
      .get('nav')
      .get('h1')
      .contains('Jazz Collaborations')
      .get('input:text')
      .type('John Coltrane')
      .get('.search-button').click()
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

  it('should render instructions and a list of musician links that navigate to artist pages', () => {
    cy.visit('http://localhost:3001/')
      .get('.instructions')
      .get('.artist-link')
      .contains('John Coltrane').click()
      
  })

  it('should ')
})