import React, { useState, useEffect, useContext } from 'react'
import { getSingleArtist } from '../apiCalls'
import { useLocation, useParams } from 'react-router-dom'
import { Errors } from '../Contexts/ErrorContextProvider'
import ArtistAlbums from './ArtistAlbums'

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
    <section>
      <img src={artist.photo} alt={`Picture of ${artist.name}`}/>
      <h2>{artist.name}</h2>
      <p>{artist.instrument}</p>
      {artist.albums && <ArtistAlbums albums={artist.albums}/>}
    </section>
  )
}

export default Artist