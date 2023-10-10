import React, { createContext, useState } from 'react'

export const UserContext = createContext()

export const UserProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)

  const loginUser = (email) => {
    setIsUserLoggedIn(true)
  }

  return (
        <UserContext.Provider value={{ isUserLoggedIn, loginUser }}>
            {children}
        </UserContext.Provider>
  )
}
