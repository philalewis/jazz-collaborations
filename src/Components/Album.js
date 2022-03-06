import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Errors } from '../Contexts/ErrorContextProvider'
import { getAlbum } from '../apiCalls'
import '../Styles/Album.scss'
import CollaborationsForm from './CollaboratorsForm'
import Personnel from './Personnel'

const Album = () => {
  const [ album, setAlbum ] = useState(null)
  const location = useLocation()
  const { setErrorMessage } = useContext(Errors)

  useEffect(() => {
    const id = location.pathname.split('/')[2]
    getAlbum(id)
    .then(data => {
      setAlbum(data)
    })
    .catch(error => setErrorMessage(error))
  }, [])

  const showAlbumDetails = () => {
    return album !== null ?
      <>
        <div className="collaborator-form-container">
          <CollaborationsForm />
        </div>
        <div className="album-info-container">
          <div className="album-cover-container">
            <img className="album-cover-image" src={album.cover} alt="album cover"/>
          </div>
          <div className="album-details-container">
            <h2 className="album-title">{album.title}</h2>
            <h3 className="album-artist">{album.albumArtist}</h3>
            <p className="release-year">Released: {album.releaseYear}</p>
          </div>
        </div>
          {album.musicians && 
          <section className="musicians-container">
            {musicians()}
          </section>}
      </> :
      <section>
        <p>Sorry, we could not find the album you are looking for.</p>
      </section>
  }

  const musicians = () => album.musicians.map(musician => {
    return (
      <Personnel 
        name={musician.name}
        instruments={musician.instrument}
        key={musician.name}
      />
    )
  })

  return (
    <section className="album-page">
      <section className="album-container">
        {showAlbumDetails()}
      </section>
    </section>
  )
}

export default Album