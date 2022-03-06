describe('Search Results user flow', () => {
  it('should navigate to a search results page when searched from anywhere in the app', () => {
    cy.fixture('musiciansData.json').as('musiciansData')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/musicians', json)
      })
    cy.fixture('milesDavisSearchData.json').as('milesDavisSearchData')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/appearances/miles%20davis', json)
      })
    cy.fixture('coltraneSearchData.json').as('coltraneSearchData')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/appearances/John%20Coltrane', json)
      })
    cy.fixture('aLoveSupreme.json').as('aLoveSupremeData')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/album/205', json)
      })
    cy.fixture('coltraneArtistPage.json').as('coltraneArtistPage')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/musicians/2', json)
      })
    cy.visit('http://localhost:3001/')
      .get('.search-bar')
      .type('miles davis{enter}')
      .url().should('eq', 'http://localhost:3001/search?miles%20davis')
      .visit('http://localhost:3001/artist/2')
      .get('.search-bar')
      .type('miles davis{enter}')
      .url().should('eq', 'http://localhost:3001/search?miles%20davis')
      .visit('http://localhost:3001/album/205')
      .get('.search-bar')
      .type('miles davis{enter}')
      .url().should('eq', 'http://localhost:3001/search?miles%20davis')
      .get('.search-bar')
      .type('john coltrane{enter}')
      .url().should('eq', 'http://localhost:3001/search?john%20coltrane')
      .visit('http://localhost:3001/album/205')
      .get('.add-collaborator-button').eq(0).click()
      .get('.add-collaborator-button').eq(1).click()
      .get('.middle-button').click()
      .get('.search-bar')
      .type('miles davis{enter}')
      .url().should('eq', 'http://localhost:3001/search?miles%20davis')
  })

  it('should be able to add the search parameters to the collaborators form unless two musicians are already selected', () => {
    cy.fixture('musiciansData.json').as('musiciansData')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/musicians', json)
      })
    cy.visit('http://localhost:3001/')
      .get('.search-bar')
      .type('miles davis{enter}')
      .get('.ask-to-add-string')
      .contains('Add "miles davis" to collaborators?')
      .get('.add-results-button')
      .should('not.be.disabled')
      .visit('http://localhost:3001/artist/1')
      .get('.add-collaborator-button').click()
      .get('.album-link')
      .contains('Kind of Blue').click()
      .get('.add-collaborator-button').eq(2).click()
      .get('.search-bar')
      .type('john coltrane{enter}')
      .get('.ask-to-add-string')
      .contains('You must remove a collaborator before adding this selection.')
      .get('.add-results-button')
      .should('be.disabled')
  })

  it('should display search results with navigable links to album and artist pages', () => {
    cy.fixture('musiciansData.json').as('musiciansData')
      .then((json) => {
        cy.intercept('GET', 'http://localhost:3000/api/v1/musicians', json)
      })
    cy.visit('http://localhost:3001/')
      .get('.search-bar')
      .type('miles davis{enter}')
      .get('.artist-name-container')
      .contains('Miles Davis').click()
      .url().should('eq', 'http://localhost:3001/artist/1')
      .get('.search-bar')
      .type('miles davis{enter}')
      .get('.album-title').eq(0).click()
      .url().should('eq', 'http://localhost:3001/album/101')
  })
})