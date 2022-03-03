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
            className="see-collaborations-button middle-button"
          >SEE COLLABORATIONS
          </button>
        </Link>
      )
    } else return (
      <button
        className="disabled-collaborations-button middle-button"
        disabled
      >Select two musicians
      </button>
    )
  }

  const handleClick = event => {
    event.preventDefault()
    setCollaborations({...collaborations, [event.target.id]: {}})
  }

  return (
    <section className="collaborators-form">
      <div className="collaborator-left">
        <p className="collaborator-name">{collaborations.left.name}</p>
        <button
          id='left'
          onClick={event => handleClick(event)}
          className="remove-button"
        >remove</button>
      </div>
      { middleButton() }
      <div className="collaborator-right">
        <p className="collaborator-name">{collaborations.right.name}</p>
        <button
          id='right'
          onClick={event => handleClick(event)}
          className="remove-button"
        >remove</button>
      </div>
    </section>
  )
}

export default CollaborationsForm