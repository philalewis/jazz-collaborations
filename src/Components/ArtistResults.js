import React, { useContext } from 'react'
import PropTypes from 'prop-types'
import { Link } from 'react-router-dom'
// import { Collaborations } from '../Contexts/CollaborationsContextProvider'


const ArtistResults = ({ artists, addCollaborator }) => {
  // const { collaborations, setCollaborations } = useContext(Collaborations)
  
  const handleClick = name => {
    addCollaborator(name)
  }

  const artistCards = () => {
    return artists.map(artist => {
      const path = `/artist/${artist.id}`
      return (
        <div className="artist-name-container" key={artist.id}>
          <Link to={path}>
            <h3 className="artist-name">{artist.name}</h3>
          </Link>
          <button
            className="add-collaborator-btn"
            onClick={() => handleClick(artist.name)}
          >choose</button>
        </div>
      )
    })
  }

  return (
    <>
      <h2 className="artist-results-header">Artists</h2>
      <div className="artist-results">
        { artistCards() }
      </div>
    </>
  )
}

export default ArtistResults

ArtistResults.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.objects),
}