import React from 'react'
import { Routes, Route } from 'react-router-dom'
import './Styles/App.scss'
import Navbar from './Components/Navbar'
import Home from './Components/Home'
import ErrorsModal from './Components/ErrorsModal'
import { ErrorsProvider } from './Contexts/ErrorContextProvider'

const App = () => {
  return (
    <main>
      <ErrorsProvider>
        <Navbar />
        <ErrorsModal />
        <Routes>
          <Route exact path="/" element={<Home />} />
        </Routes>
      </ErrorsProvider>
    </main>
  )
}

export default App;
