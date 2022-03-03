import React, { useEffect, useState, useContext } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import { getArtistNames } from '../apiCalls'
import { Errors } from '../Contexts/ErrorContextProvider'
import '../Styles/Home.scss'

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
    <section className="home-page">
      <section className="artist-names-container">
        <section className="instructions-container">
          <p className="instructions">Welcome to the Jazz Collaboration App! Choose two artists and see if they collaborated on any albums together! To begin, just click on an artist below or type a name into the search bar at the top of the page.</p>
        </section>
        <h3 className="artists-header">Artists:</h3>
        { musicians }
      </section>
    </section>
  )
}

export default Home