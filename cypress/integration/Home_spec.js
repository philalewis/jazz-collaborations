describe('Home page and search results', () => {
  
  it('should render the navbar with a search bar that navigates to a results page', () => {
    cy.intercept('GET', 'http://localhost:3000/api/v1/musicians', {
      "names": [
        {
          "name": "Miles Davis",
          "id": "1"
        },
        {
          "name": "John Coltrane",
          "id": "2"
        }
      ]
    })
    cy.intercept('GET', 'http://localhost:3000/api/v1/appearances/John%20Coltrane', [
      {
        "id": 205,
        "albumArtist": "John Coltrane",
        "title": "A Love Supreme",
        "releaseYear": 1965,
        "cover": "https://upload.wikimedia.org/wikipedia/en/9/9a/John_Coltrane_-_A_Love_Supreme.jpg",
        "musicians": [
          {
            "name": "John Coltrane",
            "instrument": "soprano saxophone, tenor saxophone"
          },
          {
            "name": "Jimmy Garrison",
            "instrument": "double bass"
          },
          {
            "name": "Elvin Jones",
            "instrument": "drums, gong, timpani"
          },
          {
            "name": "McCoy Tyner",
            "instrument": "piano"
          }
        ]
      }
    ])
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
    cy.intercept('GET', 'http://localhost:3000/api/v1/musicians', {
      "names": [
        {
          "name": "Miles Davis",
          "id": "1"
        },
        {
          "name": "John Coltrane",
          "id": "2"
        }
      ]
    })
    cy.intercept('GET', 'http://localhost:3000/api/v1/musicians/2', {
      "names": {
        "name": "John Coltrane",
        "id": "2",
        "instrument": "Saxophone",
        "photo": "https://upload.wikimedia.org/wikipedia/commons/thumb/6/6e/John_Coltrane_in_1963.jpg/1920px-John_Coltrane_in_1963.jpg",
        "albums": [
          {
          "id": 201,
          "albumArtist": "John Coltrane",
          "title": "Blue Train",
          "releaseYear": 1958,
          "cover": "https://upload.wikimedia.org/wikipedia/en/6/68/John_Coltrane_-_Blue_Train.jpg",
          "musicians": [
            {
              "name": "John Coltrane",
              "instrument": "tenor saxophone"
            },
            {
              "name": "Lee Morgan",
              "instrument": "trumpet"
            },
            {
              "name": "Curtis Fuller",
              "instrument": "trombone"
            },
            {
              "name": "Kenny Drew",
              "instrument": "piano"
            },
            {
              "name": "Paul Chambers",
              "instrument": "bass"
            },
            {
              "name": "Philly Joe Jones",
              "instrument": "drums"
            }
          ]
        }
      ]
    }
    })
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