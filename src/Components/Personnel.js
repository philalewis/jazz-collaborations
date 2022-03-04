import React, { useState, useContext, useEffect } from 'react'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'
import '../Styles/Personnel.scss'

const Personnel = (props) => {
  const [ disabled, setDisabled ] = useState(false)
  const { collaborations, setCollaborations } = useContext(Collaborations)

  useEffect(() => {
    checkDisabled()
  }, [collaborations])

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
      return <li>{instrument}</li>
    })
  }
  
  const checkDisabled = () => {
    if (collaborations.left.name === props.name ||
      collaborations.right.name === props.name) {
        setDisabled(true)
      } else {
        setDisabled(false)
      }
  }

  return (
    <div className="personnel-container">
      <div className="name-and-button-section">
        <p className="name">{props.name}</p>
        <button
          disabled={disabled}
          className="add-collaborator-button"
          onClick={event => addCollaborator(event)}
        >choose</button>
      </div>
      <div className="instruments-container">
        <ul className="instruments-list">{formatInstruments()}</ul>
      </div>
    </div>
  )
}

export default Personnel