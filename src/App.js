import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './Styles/App.scss'
import { ErrorsProvider } from './Contexts/ErrorContextProvider'
import { CollaborationsProvider } from './Contexts/CollaborationsContextProvider'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import ErrorsModal from './Components/ErrorsModal'
import Artist from './Components/Artist'
import Album from './Components/Album'
import CollaborationsPage from './Components/CollaborationsPage'

const App = () => {
  return (
    <main>
      <ErrorsProvider>
        <CollaborationsProvider>
          <Navbar />
          <ErrorsModal />
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route path="/artist/:id" element={<Artist />} />
            <Route path="/album/:id" element={<Album />} />
            <Route exact path="/collaborations" element={<CollaborationsPage />} />
          </Routes>
        </CollaborationsProvider>
      </ErrorsProvider>
    </main>
  )
}

export default App;
