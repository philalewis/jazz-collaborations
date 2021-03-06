import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../Styles/Navbar.scss'

const Navbar = () => {
  const [ input, setInput ] = useState('')
  const navigate = useNavigate()

  const handleChange = event => {
    setInput(event.target.value)
  }
  
  const search = () => {
    const path = (`/search?${input}`)
    setInput('')
    navigate(path)
  }

  const handleKeyUp = event => {
    return event.code === 'Enter' ? search() : null
  }

  return (
    <nav className="navbar">
      <section className="header-section">
        <Link to='/' className="home-button">
          <h1>Jazz Collaborations</h1>
        </Link>
      </section>
      <section className="searchbar-section">
        <input
          className="search-bar"
          type="text"
          placeholder="Search for a musician"
          value={input}
          onChange={event => handleChange(event)}
          onKeyUp={event => handleKeyUp(event)}
        />
        <button
          className="search-button"
          onClick={search}>
        SEARCH</button>
      </section>
    </nav>
  )
}

export default Navbar