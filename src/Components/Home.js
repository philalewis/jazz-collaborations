import React, { useEffect, useState, useContext } from 'react'
import { getArtistNames } from '../apiCalls'
import Name from './Name'
import { Errors } from '../Contexts/ErrorContextProvider'

const Home = () => {
  const [ names, setNames ] = useState([])
  const { setErrorMessage } = useContext(Errors)

  useEffect(() => {
    getArtistNames()
    .then(data => {
      setNames(data.names)
    })
    // .catch(error => setErrorMessage(error))
  }, [])

  const musicians = names.map(name => {
    return (
      <Name
        key={name.id}
        id={name.id}
        name={name.name}
      />
    )
  })

  return (
    <section>
      { musicians }
    </section>
  )
}

export default Home