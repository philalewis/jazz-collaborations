import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getArtistNames } from '../apiCalls'
import { Errors } from '../Contexts/ErrorContextProvider'

const Home = () => {
  const [ names, setNames ] = useState([])
  const { setErrorMessage } = useContext(Errors)
  const navigate = useNavigate()

  useEffect(() => {
    getArtistNames()
    .then(data => {
      setNames(data.names)
    })
    .catch(error => setErrorMessage(error))
  }, [])

  const musicians = names.map(name => {
    const path = `/artist/${name.id}`
    return (
      <Link to={path} key={name.id}>
        <h3 className="artist-link">{name.name}</h3>
      </Link>
    )
  })

  return (
    <section>
      { musicians }
    </section>
  )
}

export default Home