import React, { useState, useContext, useEffect } from 'react'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'

const Personnel = (props) => {
  const [ disabled, setDisabled ] = useState(false)
  const { collaborations, setCollaborations } = useContext(Collaborations)

  useEffect(() => {
    checkDisabled()
  })

  const addCollaborator = (event) => {
    event.preventDefault()
    if (!collaborations.left.name) {
      setCollaborations({...collaborations, left: {name: props.name}})
    } else if (!collaborations.right.name) {
      setCollaborations({...collaborations, right: {name: props.name}})
    }
  }

  const formatInstruments = () => {
    const instruments = props.instruments.split(', ')
    return instruments.map(instrument => {
      <li>{instrument}</li>
    })
  }
  
  const checkDisabled = () => {
    if (collaborations.left.name === props.name ||
      collaborations.right.name === props.name) {
        setDisabled(true)
      }
  }

  return (
    <div className="personnel-container">
      <p>{props.name}</p>
      <ul>{formatInstruments()}</ul>
      <button
        disabled={disabled}
        className="add-collaborator-button"
        onClick={event => addCollaborator(event)}
      >choose</button>
    </div>
  )
}

export default Personnel