import React, { useState, useEffect, useContext } from 'react'
import { useLocation } from 'react-router-dom'
import { getArtistNames, getAlbumsByName } from '../apiCalls'
import { Errors } from '../Contexts/ErrorContextProvider'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'
import '../Styles/SearchResults.scss'
import { filterArtists, getNameFromURL } from '../utilities'
import AddResults from './AddResults'
import AlbumsResults from './AlbumsResults'
import ArtistResults from './ArtistResults'
import CollaboratorsForm from './CollaboratorsForm'

const SearchResults = () => {
  const [ artists, setArtists ] = useState([])
  const [ albums, setAlbums ] = useState([])
  const location = useLocation()
  const { setErrorMessage } = useContext(Errors)
  const { collaborations, setCollaborations } = useContext(Collaborations)

  const name = getNameFromURL(location)

  useEffect(() => {
    Promise.all([
      getArtistNames(),
      getAlbumsByName(name)
    ]).then(data => {
      setArtists(filterArtists(data[0].names, name))
      setAlbums(data[1])
    }).catch(error => setErrorMessage(error))
  }, [location])

  const addCollaborator = name => {
    if (!collaborations.left.name) {
      setCollaborations({...collaborations, left: {name: name}})
    } else if (!collaborations.right.name) {
      setCollaborations({...collaborations, right: {name: name}})
    } else {
      setErrorMessage('There are already two musicians selected. Please remove one of the choices first.')
    }
  }

  return (
    <section className="search-results-page">
      <div className="search-reults-container">
        <div className="collaborators-form-container">
          <CollaboratorsForm />
        </div>
        <section className="add-search-results">
          <AddResults addCollaborator={addCollaborator} />
        </section>
        <section className="artist-results-container">
          <ArtistResults artists={artists} addCollaborator={addCollaborator} />
        </section>
        <section className="albums-results-container">
          <AlbumsResults albums={albums}/>
        </section>
      </div>
    </section>
  )
}

export default SearchResults