import React, { useState, useEffect, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { getArtistNames, getAlbumsByName } from '../apiCalls'
import { Errors } from '../Contexts/ErrorContextProvider'

const SearchResults = () => {
  const [ artists, setArtists ] = useState([])
  const [ albums, setAlbums ] = useState([])
  const location = useLocation()
  const { setErrorMessage } = useContext(Errors)

  const name = location.search.slice(1)

  useEffect(() => {
    Promise.all([
      getArtistNames(),
      getAlbumsByName(name)
    ]).then(data => {
      setArtists(data[0].names.filter(artist => {
        return name.split('%20').join(' ').toLowerCase().includes(artist.name.toLowerCase())
      }))
      setAlbums(data[1])
    }).catch(error => setErrorMessage(error))
  }, [location])

  const artistCards = () => {
    const path = `/artist/${name.id}`
    return artists.map(artist => {
      return (
        <div className="artist-name-container" key={artist.id}>
          <Link to={path}>
            <h3 className="artist-name">{artist.name}</h3>
          </Link>
          <button className="add-collaborator-button">choose</button>
        </div>
      )
    })
  }

  const albumCards = () => {
    return albums.map(album => {
      return (
        <div className="album-details" key={album.id}>
          <img
            src={album.cover}
            alt={`Cover art for ${album.title}`}
            className="album-cover"
          />
          <Link to={`/album/${album.id}`}>
            <h3 className="album-title">{album.title}</h3>
          </Link>
          <p className="album-artist">{album.albumArtist}</p>
        </div>
      )
    })
  }

  return (
    <section className="search-results-page">
      <div className="search-reults-container">
        <section className="artist-results-container">
          <h2 className="artist-results-header">Artists</h2>
          <div className="artist-results">
            { artistCards() }
          </div>
        </section>
        <section className="albums-results-container">
          <h2 className="albums-results-header">Albums</h2>
          <div className="ablums-results">
            { albumCards() }
          </div>
        </section>
      </div>
    </section>
  )
}

export default SearchResults