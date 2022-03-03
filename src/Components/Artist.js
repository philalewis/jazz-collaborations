import React, { useState, useEffect, useContext } from 'react'
import { getSingleArtist } from '../apiCalls'
import { useLocation, useParams } from 'react-router-dom'
import { Errors } from '../Contexts/ErrorContextProvider'
import ArtistAlbums from './ArtistAlbums'
import '../Styles/Artist.scss'

const Artist = () => {
  const [ artist, setArtist ] = useState({})
  const location = useLocation()
  const params = useParams()
  const { setErrorMessage } = useContext(Errors)

  useEffect(() => {
    const id = location.pathname.split('/')[2]
    getSingleArtist(id)
    .then(data => setArtist(data))
    .catch(error => setErrorMessage(error))
  }, [])

  return (
    <section className="artist-page">
      <div className="artist-container">
        <img className="artist-image" src={artist.photo} alt={`Picture of ${artist.name}`}/>
        <h2 className="artist-name">{artist.name}</h2>
        <p className="instrument">Instrument: {artist.instrument}</p>
        {artist.albums && <ArtistAlbums albums={artist.albums}/>}
      </div>
    </section>
  )
}

export default Artist