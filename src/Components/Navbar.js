import React, { useState } from 'react'
import { useNavigate, Link } from 'react-router-dom'
import '../Styles/Navbar.scss'

const Navbar = () => {
  const [ input, setInput ] = useState('')
  const navigate = useNavigate()

  const handleChange = event => {
    setInput(event.target.value)
  }
  
  const handleKeyUp = event => {
    event.preventDefault()
    const path = (`/search?${event.target.value}`)
    return event.code === 'Enter' ? navigate(path) : null
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
      </section>
    </nav>
  )
}

export default Navbar