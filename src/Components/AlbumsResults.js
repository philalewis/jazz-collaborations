import React from 'react'
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types'


const AlbumsResults = ({ albums }) => {

  const albumCards = () => {
    return albums.map(album => {
      return (
        <div className="album-details" key={album.id}>
          <div className="album-details-cover">
            <img
              src={album.cover}
              alt={`Cover art for ${album.title}`}
              className="album-cover"
            />
          </div>
          <div className="album-details-container">
            <Link to={`/album/${album.id}`}>
              <h3 className="album-title">{album.title}</h3>
            </Link>
            <p className="album-artist">by {album.albumArtist}</p>
          </div>
        </div>
      )
    })
  }

  return (
    <>
      <h2 className="albums-results-header">Appears On: </h2>
      <div className="albums-results">
        { albumCards() }
      </div>
    </>
  )
}

export default AlbumsResults

AlbumsResults.propTypes = {
  albums: PropTypes.arrayOf(PropTypes.object),
}