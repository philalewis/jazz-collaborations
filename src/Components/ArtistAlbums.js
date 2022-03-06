import React from 'react'
import { Link } from 'react-router-dom'
import '../Styles/ArtistAlbums.scss'
import PropTypes from 'prop-types'
import { sortAlbums } from '../utilities'

const ArtistAlbums = (props) => {
  const albumList = () => {
    const albums = sortAlbums(props.albums)
    
    return albums.map(album => {
      return (
        <Link
          className="album-link"
          to={`/album/${album.id}`}
          key={album.id}
        ><p>{album.title}({album.releaseYear})</p>
        </Link>
      )
    })
  }
  
  return (
    <section className="albums-container">
      <h3 className="albums-header">Albums:</h3>
      { albumList() }
    </section>
  )
}

export default ArtistAlbums

ArtistAlbums.propTypes = {
  name: PropTypes.arrayOf(PropTypes.objects).isRequired,
}