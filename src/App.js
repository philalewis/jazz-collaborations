import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './Styles/App.scss'
import Navbar from './Components/Navbar'
import Home from './Components/Home'

const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route exact path="/" element={<Home />} />
      </Routes>
    </main>
  )
}

export default App;
