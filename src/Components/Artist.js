import React, { useState, useEffect } from 'react'
import { getSingleArtist } from '../apiCalls'
import { useLocation, useParams } from 'react-router-dom'

const Artist = () => {
  const [ artist, setArtist ] = useState({})
  const location = useLocation()
  const params = useParams()

  useEffect(() => {
    const id = location.pathname.split('/')[2]
    console.log(id)
    getSingleArtist(id)
    .then(data => setArtist(data))
  }, [])

  return (
    <section>
      <img src={artist.photo} alt={`Picture of ${artist.name}`}/>
      <h2>{artist.name}</h2>
      <p>{artist.instrument}</p>
    </section>
  )
}

export default Artist