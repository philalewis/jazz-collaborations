import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Errors } from '../Contexts/ErrorContextProvider'
import { getAlbum } from '../apiCalls'

const Album = () => {
  const [ album, setAlbum ] = useState(null)
  const location = useLocation()
  const { setErrorMessage } = useContext(Errors)

  useEffect(() => {
    const id = location.pathname.split('/')[2]
    console.log(id)
    getAlbum(id)
    .then(data => {
      console.log(data)
      setAlbum(data)
    })
    .catch(error => setErrorMessage(error))
  }, [])

  const showAlbumDetails = () => {
    return album !== null ?
      <>
        <img className="album-cover" src={album.cover} alt="album cover"/>
        <h2 className="album-title">{}</h2>
        <p className="release-year">Released: {}</p>
      </> :
      <section>
        <p>Sorry, we could not find the album you are looking for.</p>
      </section>
  }

  return (
    <section className="album-page">
      <section className="album-container">
        {showAlbumDetails()}
      </section>
    </section>
  )
}

export default Album