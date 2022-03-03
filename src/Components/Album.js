import React, { useState, useEffect, useContext } from 'react'
import { useLocation, useParams } from 'react-router-dom'
import { Errors } from '../Contexts/ErrorContextProvider'
import { getAlbum } from '../apiCalls'
import '../Styles/Album.scss'

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
        <img className="album-cover" src={album.cover} alt="album cover"/>
        <h2 className="album-title">{album.title}</h2>
        <h3 className="album-artist">{album.albumArtist}</h3>
        <p className="release-year">Released: {album.releaseYear}</p>
        { album.musicians && <section className="musicians-container">
          {musicians()}
        </section> }
      </> :
      <section>
        <p>Sorry, we could not find the album you are looking for.</p>
      </section>
  }

  const musicians = () => album.musicians.map(musician => {
    return (
      <article key={musician.name} className="musician-info">
        <p>{musician.name} ({musician.instrument})</p>
      </article>
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