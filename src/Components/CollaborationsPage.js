import React, { useContext, useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'
import { Errors } from '../Contexts/ErrorContextProvider'
import { getAlbumsByName } from '../apiCalls'

const CollaborationsPage = () => {
  const { collaborations, setCollaborations } = useContext(Collaborations)
  const [ albums, setAlbums ] = useState({})
  const { setErrorMessage } = useContext(Errors)

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
      <section className="musician-names">
        <h2>{collaborations.left.name}</h2>
        <h2>{collaborations.right.name}</h2>
      </section>
        <ul>
          { buildAlbumList() }
        </ul>
    </section>
  )
}

export default CollaborationsPage