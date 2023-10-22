import React, { createContext, useState } from 'react'
import PropTypes from 'prop-types'


//let hideTab = 'flex';

// Create a user context with default values
export const UserContext = createContext({
  isUserLoggedIn: false,
  token: null,
  loginUser: () => {},
  logoutUser: () => {}
})

export const UserProvider = ({ children }) => {
  const [isUserLoggedIn, setIsUserLoggedIn] = useState(false)
  const [token, setToken] = useState(null)

  // Log the user in and store their token
  const loginUser = (userToken) => {
    setIsUserLoggedIn(true)
    setToken(userToken)
  }

  // Log the user out and clear the token
  const logoutUser = () => {
    setIsUserLoggedIn(false)
    setToken(null)
  }

  return (
    <UserContext.Provider value={{ isUserLoggedIn, token, loginUser, logoutUser }}>
      {children}
    </UserContext.Provider>
  )
}

UserProvider.propTypes = {
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node
  ]).isRequired
}
