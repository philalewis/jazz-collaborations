import React, { createContext, useState } from 'react'

export const Collaborations = createContext()

export const CollaborationsProvider = ({ children }) => {

    const [ collaborations, setCollaborations ] = useState({
      left: {name: 'Miles Davis'},
      // right: {name: 'john Coltrane'}
      right: {}
    })

    return(
      <Collaborations.Provider 
        value={{ collaborations, setCollaborations }}
      >
        {children}
      </Collaborations.Provider>
    )
}
