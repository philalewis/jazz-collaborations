import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'
import { Errors } from '../Contexts/ErrorContextProvider'
import { getAlbumsByName } from '../apiCalls'
import '../Styles/CollaborationsPage.scss'

const CollaborationsPage = () => {
  const { collaborations, setCollaborations } = useContext(Collaborations)
  const { setErrorMessage } = useContext(Errors)
  const [ albums, setAlbums ] = useState({})

  useEffect(() => {
    Promise.all([
      getAlbumsByName(collaborations.left.name),
      getAlbumsByName(collaborations.right.name)
    ])
    .then(data => {
      setAlbums(findCollaborations(data[0], data[1]))
    })
    .catch(error => setErrorMessage(error))
  }, [])

  const findCollaborations = (setOne, setTwo) => {
    const collabs = []
    const setTwoIds = setTwo.map(album => album.id)
    setOne.forEach(album => {
      return setTwoIds.includes(album.id) ? collabs.push(album) : null
    })

    return collabs
  }

  const buildAlbumList = () => {
    return albums.length ?
      albums.map(album => {
        return (
          <li key={album.id}>
            <Link to={`/album/${album.id}`}>{album.title}</Link>
          </li>
        )
      }) : <h2>There are no albums in the database with both of these musicians.</h2>
  }

  return (
    <section className="collaborations-page">
      <div className="collaborations-container">
        <h2 className="collaborations-header">Collaborations</h2>
        <section className="musician-headers">
          <h3>Musician: </h3>
          <h3>Musician: </h3>
        </section>
        <section className="musician-names">
          <h3 className="musician-name">{collaborations.left.name}</h3>
          <h3 className="musician-name">{collaborations.right.name}</h3>
        </section>
        <h2 className="shared-albums-header">Albums</h2>
        <ul className="album-list">
          { buildAlbumList() }
        </ul>
      </div>
    </section>
  )
}

export default CollaborationsPage