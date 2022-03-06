describe('Album page', () => {
  it('should have album details and a list of musicians that can be added to and removed from the collaboration form', () => {
    cy.visit('http://localhost:3001/album/205')
      .get('.collaborators-form')
      .get('.album-info-container')
      .get('.album-details-container')
      .contains('A Love Supreme')
      .get('.album-artist')
      .contains('John Coltrane')
      .get('.release-year')
      .contains('Released: 1965')
      .get('.name-and-button-section')
      .find('.add-collaborator-button').eq(1).click()
      .get('.collaborators-form')
      .get('.collaborator-left')
      .contains('Jimmy Garrison')
      .get('.remove-button').eq(0).click()
      .get('.collaborator-left')
      .contains('Jimmy Garrison')
      .should('not.exist')
  })

  it('should not be able to add players that are already included in the form', () => {
    cy.visit('http://localhost:3001/album/205')
      .get('.name-and-button-section')
      .find('.add-collaborator-button').eq(1).click()
      .get('.collaborator-left')
      .contains('Jimmy Garrison')
      .get('.name-and-button-section')
      .find('.add-collaborator-button').eq(1)
      .should('be.disabled')
  })

  it('should be able to click a button to navigate to the collaborations page once two musicians are selected', () => {
    cy.visit('http://localhost:3001/album/205')
      .get('.name-and-button-section')
      .find('.add-collaborator-button').eq(0).click()
      .get('.middle-button')
      .should('be.disabled')
      .get('.name-and-button-section')
      .find('.add-collaborator-button').eq(1).click()
      .get('.middle-button').click()
      .url().should('eq', 'http://localhost:3001/collaborations')
  })
})