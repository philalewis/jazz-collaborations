import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './Styles/App.scss'
import { ErrorsProvider } from './Contexts/ErrorContextProvider'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import ErrorsModal from './Components/ErrorsModal'
import Artist from './Components/Artist'

const App = () => {
  return (
    <main>
      <ErrorsProvider>
        <Navbar />
        <ErrorsModal />
        <Routes>
          <Route exact path="/" element={<Home />} />
          <Route path="/artist/:id" element={<Artist />}/>
        </Routes>
      </ErrorsProvider>
    </main>
  )
}

export default App;
