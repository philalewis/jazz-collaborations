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
  }, [])

  const artistLinks = () => {
    return artists.map(artist => {
      return (
        <Link to=""></Link>
      )
    })
  }

  return (
    <section className="search-results-page">
      <div className="search-reults-container">
        <section className="artist-results-container">
          <h2 className="artist-results-header">Artists</h2>
          <div className="artists">

          </div>
        </section>
      </div>
    </section>
  )
}

export default SearchResults