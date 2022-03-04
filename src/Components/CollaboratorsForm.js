import React, { useContext } from 'react'
import { Link } from 'react-router-dom'
import '../Styles/CollaboratorsForm.scss'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'

const CollaborationsForm = () => {
  const { collaborations, setCollaborations } = useContext(Collaborations)

  const middleButton = () => {
    if (collaborations.left.name && collaborations.right.name) {
      return (
        <Link to='/collaborations'>
          <button
            className="middle-button"
          >See Collaborations
          </button>
        </Link>
      )
    } else {
      return (
        <button
          className="middle-button"
          disabled
        >Select two musicians</button>
      )
    }
  }

  const handleClick = event => {
    event.preventDefault()
    setCollaborations({...collaborations, [event.target.id]: {}})
  }

  return (
    <section className="collaborators-form">
      <div className="collaborator-left">
        <div className="collaborator-name-box">
          {collaborations.left.name &&
          <p className="collaborator-name">{collaborations.left.name}</p>}
        </div>
        <div className="remove-button-box">
          <button
            id='left'
            onClick={event => handleClick(event)}
            className="remove-button"
          >remove</button>
        </div>
      </div>
      <div className="middle-button-container">
        { middleButton() }
      </div>
      <div className="collaborator-right">
        <div className="collaborator-name-box">
          {collaborations.right.name &&
          <p className="collaborator-name">{collaborations.right.name}</p>}
        </div>
        <div className="remove-button-box">
          <button
            id='right'
            onClick={event => handleClick(event)}
            className="remove-button"
          >remove</button>
        </div>
      </div>
    </section>
  )
}

export default CollaborationsForm