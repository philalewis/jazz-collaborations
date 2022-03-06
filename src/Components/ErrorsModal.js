import React, { useContext } from 'react'
import { Errors } from '../Contexts/ErrorContextProvider'
import '../Styles/ErrorsModal.scss'

const ErrorsModal = () => {
  const { errorMessage, setErrorMessage } = useContext(Errors)

  const exitErrorModal = () => {
    setErrorMessage(null)
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