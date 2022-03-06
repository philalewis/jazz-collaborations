import React, { useState, useEffect, useContext } from 'react'
import { useLocation, Link } from 'react-router-dom'
import { getArtistNames, getAlbumsByName } from '../apiCalls'
import { Errors } from '../Contexts/ErrorContextProvider'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'
import '../Styles/SearchResults.scss'

const SearchResults = () => {
  const [ artists, setArtists ] = useState([])
  const [ albums, setAlbums ] = useState([])
  const location = useLocation()
  const { setErrorMessage } = useContext(Errors)
  const { collaborations, setCollaborations } = useContext(Collaborations)

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

  const handleClick = name => {
    addCollaborator(name)
  }

  const addCollaborator = name => {
    if (!collaborations.left.name) {
      setCollaborations({...collaborations, left: {name: name}})
    } else if (!collaborations.right.name) {
      setCollaborations({...collaborations, right: {name: name}})
    }
  }
  
  const addSearchResultsToCollaborators = () => {
    addCollaborator(name.split('%20').join(' '))
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
            <p className="album-artist">{album.albumArtist}</p>
          </div>
        </div>
      )
    })
  }

  const addToCollaborators = () => {
    console.log(collaboratorsFull())
    return !collaboratorsFull() ?
      <p className="ask-to-add-string">
        Add "{name.split('%20').join(' ')}" to collaborators?</p> :
      <p className="ask-to-add-string">
        You must remove a collaborator before adding this selection.</p>
  }

  let collaboratorsFull = () => {
    return collaborations.left.name && collaborations.right.name ? true : false
  }

  return (
    <section className="search-results-page">
      <div className="search-reults-container">
        <section className="add-search-results">
          <div className="ask-to-add-container">
            { addToCollaborators() }
          </div>
          <button
            disabled={collaboratorsFull()}
            className="add-results-button"
            onClick={addSearchResultsToCollaborators}
          >choose</button>
        </section>
        <section className="artist-results-container">
          <h2 className="artist-results-header">Artists</h2>
          <div className="artist-results">
            { artistCards() }
          </div>
        </section>
        <section className="albums-results-container">
          <h2 className="albums-results-header">Albums</h2>
          <div className="albums-results">
            { albumCards() }
          </div>
        </section>
      </div>
    </section>
  )
}

export default SearchResults