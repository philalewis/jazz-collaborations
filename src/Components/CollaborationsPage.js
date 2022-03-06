import React, { useContext, useState, useEffect } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'
import { Errors } from '../Contexts/ErrorContextProvider'
import { getAlbumsByName } from '../apiCalls'
import '../Styles/CollaborationsPage.scss'
import { sortAlbums, findCollaborations } from '../utilities'

const CollaborationsPage = () => {
  const { collaborations, setCollaborations } = useContext(Collaborations)
  const { setErrorMessage } = useContext(Errors)
  const [ albums, setAlbums ] = useState([])
  const navigate = useNavigate()

  useEffect(() => {
    Promise.all([
      getAlbumsByName(collaborations.left.name),
      getAlbumsByName(collaborations.right.name)
    ])
    .then(data => {
      setAlbums(sortAlbums(findCollaborations(data[0], data[1])))
    })
    .catch(error => setErrorMessage(error))
  }, [])

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

  const clearSelections = () => {
    setCollaborations({left: {}, right: {}})
    navigate('/')
  }

  return (
    <section className="collaborations-page">
      <div className="collaborations-container">
        <div className="top-section">
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
        <button
          onClick={clearSelections}
          className="clear-selections-button"
          >CLEAR SELECTIONS AND RETURN HOME
        </button>
      </div>
    </section>
  )
}

export default CollaborationsPage