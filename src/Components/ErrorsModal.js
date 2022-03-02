import React, { useContext } from 'react'
import { useNavigate } from 'react-router-dom'
import { Errors } from '../Contexts/ErrorContextProvider'

const ErrorsModal = () => {
  const { errorMessage, setErrorMessage } = useContext(Errors)
  const navigate = useNavigate()

  const exitErrorModal = () => {
    setErrorMessage(null)
    navigate('/')
  }

  return (
    <>
      {
        errorMessage &&
        <section className="modal">
          <section className="error-box">
            <p>{errorMessage}</p>
            <button
              className="exit-error-modal-button"
              onClick={exitErrorModal}
            >OK</button>
          </section>
        </section>
      }
    </>
  )
}

export default ErrorsModal