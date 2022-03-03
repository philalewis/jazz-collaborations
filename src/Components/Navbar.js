import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../Styles/Navbar.scss'

const Navbar = () => {
  const [ input, setInput ] = useState('')
  const navigate = useNavigate()

  const handleChange = event => {
    setInput(event.target.value)
  }
  
  const search = (event) => {
    const path = (`/search?${event.target.value}`)
    return event.code === 'Enter' ? navigate(path) : null
  }

  const handleKeyUp = event => {
    event.preventDefault()
    search(event)
  }

  const handleClick = event => {
    event.preventDefault()
    search(event)
  }

  return (
    <nav className="navbar">
      <section className="header-section">
        <h1>Jazz Collaborations</h1>
      </section>
      <section className="searchbar-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search by artist name or album title"
          value={input}
          onChange={event => handleChange(event)}
          onKeyUp={event => handleKeyUp(event)}
        >
        </input>
        <button className="search-button" onClick={event => handleClick(event)}>SEARCH</button>
      </section>
    </nav>
  )
}

export default Navbar