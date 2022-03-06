describe('artist page', () => {
  it('should display a collaborators form', () => {
    cy.visit('http://localhost:3001/artist/2')
      .get('.collaborators-form')
      .get('.middle-button')
      .should('be.disabled')
      .get('#left')
      .should('be.disabled')
      .get('.albums-container')
      .get('.album-link')
      .contains('Expression').click()
      .url().should('eq', 'http://localhost:3001/album/206')
  })

  // it('should ')
})