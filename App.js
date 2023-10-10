// App.js
import React from 'react'
import { UserProvider } from './pages/UserContext'
import AppNavigator from './AppNavigator'

const App = () => (
  <UserProvider>
    <AppNavigator />
  </UserProvider>
)

export default App
