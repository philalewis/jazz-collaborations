import React from 'react'
import { Link } from 'react-router-dom'

const ArtistAlbums = (props) => {

  const albumList = () => {
    const albums = props.albums.sort((a, b) => a.releaseYear - b.releaseYear)
    return albums.map(album => {
      return (
        <Link to={`/album/${album.id}`} key={album.id}>
          <p>{album.title}({album.releaseYear})</p>
        </Link>
      )
    })
  }
  
  return (
    <section>
      { albumList() }
    </section>
  )
}

export default ArtistAlbums