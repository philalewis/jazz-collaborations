import React, { createContext, useState } from 'react'

export const Collaborations = createContext()

export const CollaborationsProvider = ({ children }) => {

    const [ collaborations, setCollaborations ] = useState('')

    return(
      <Collaborations.Provider value={{ collaborations, setCollaborations }}>
        {children}
      </Collaborations.Provider>
    )
}
