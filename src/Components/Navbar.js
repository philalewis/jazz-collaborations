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
    const path = (`/search?${input}`)
    setInput('')
    navigate(path)
  }

  const handleKeyUp = event => {
    return event.code === 'Enter' ? search(event) : null
  }

  const handleClick = event => {
    search(event)
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
          placeholder="Search by artist name or album title"
          value={input}
          onChange={event => handleChange(event)}
          onKeyUp={event => handleKeyUp(event)}
        />
        <button
          className="search-button"
          onClick={event => handleClick(event)}>
        SEARCH</button>
      </section>
    </nav>
  )
}

export default Navbar