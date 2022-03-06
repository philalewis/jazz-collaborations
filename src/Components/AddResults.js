import React, { useContext } from 'react'
import { Collaborations } from '../Contexts/CollaborationsContextProvider'
import { getNameFromURL } from '../utilities'
import { useLocation } from 'react-router-dom'
import { Errors } from '../Contexts/ErrorContextProvider'

const AddResults = ({ addCollaborator }) => {
  const { collaborations, setCollaborations } = useContext(Collaborations)
  const location = useLocation()
  const name = getNameFromURL(location)
  const { setErrorMessage } = useContext(Errors)

  let collaboratorsFull = () => {
    return collaborations.left.name && collaborations.right.name ? true : false
  }

  const addToCollaborators = () => {
    return !collaboratorsFull() ?
      <p className="ask-to-add-string">
        Add "{name.split('%20').join(' ')}" to collaborators?</p> :
      <p className="ask-to-add-string">
        You must remove a collaborator before adding this selection.</p>
  }

  const addSearchResultsToCollaborators = () => {
    addCollaborator(name.split('%20').join(' '))
  }

  return (
    <>
      <div className="ask-to-add-container">
        { addToCollaborators() }
      </div>
      <button
        disabled={collaboratorsFull()}
        className="add-results-button"
        onClick={addSearchResultsToCollaborators}
      >choose</button>
    </>
  )
}

export default AddResults