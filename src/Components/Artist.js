import React, { useState, useEffect, useContext } from 'react'
import { getSingleArtist } from '../apiCalls'
import { useLocation } from 'react-router-dom'
import { Errors } from '../Contexts/ErrorContextProvider'
import ArtistAlbums from './ArtistAlbums'
import '../Styles/Artist.scss'
import CollaborationsForm from './CollaboratorsForm'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'
import { getAlbumIdFromURL } from '../utilities'

const Artist = () => {
  const [ artist, setArtist ] = useState({})
  const location = useLocation()
  const { setErrorMessage } = useContext(Errors)
  const { collaborations, setCollaborations } = useContext(Collaborations)

  useEffect(() => {
    const id = getAlbumIdFromURL(location)
    getSingleArtist(id)
    .then(data => setArtist(data))
    .catch(error => setErrorMessage(error))
  }, [])

  const addCollaborator = (event) => {
    event.preventDefault()
    if (!collaborations.left.name) {
      setCollaborations({...collaborations, left: {name: artist.name}})
    } else if (!collaborations.right.name) {
      setCollaborations({...collaborations, right: {name: artist.name}})
    } else {
      setErrorMessage('There are already two musicians selected. Please remove one of the choices first.')
    }
  }

  const disabled = (collaborations.left.name === artist.name ||
    collaborations.right.name === artist.name)

  return (
    <section className="artist-page">
      <div className="artist-container">
        <div className="collaborator-form-container">
          <CollaborationsForm />
        </div>
        <div className="artist-info-container">
          <div className="artist-image-container">
            <img className="artist-image"
              src={artist.photo}
              alt={`Picture of ${artist.name}`}
            />
          </div>
          <div className="artist-details-container">
            <h2 className="artist-name">{artist.name}</h2>
            <p className="instrument">Instrument: {artist.instrument}</p>
            <button
              disabled={disabled}
              className="add-collaborator-button"
              onClick={event => addCollaborator(event)}
            >choose</button>
            {artist.albums && <ArtistAlbums albums={artist.albums}/>}
          </div>
        </div>
      </div>
    </section>
  )
}

export default Artist