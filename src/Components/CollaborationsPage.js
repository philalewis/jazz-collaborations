import React, { useContext, useState, useEffect } from 'react'
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
      console.log(data[0], data[1])
      setAlbums(findCollaborations(data[0], data[1]))
    })
    .catch(error => setErrorMessage(error))
  }, [])

  const findCollaborations = (setOne, setTwo) => {
    const collabs = []
    setOne.forEach(album => {
      setTwo.includes(album) ? collabs.push(album) : null
    })
    return collabs
  }

  

  return (
    <section className="collaborations-page">
      <section className="left-musician">
        <h2>{collaborations.left.name}</h2>
        
      </section>
    </section>
  )
}

export default CollaborationsPage