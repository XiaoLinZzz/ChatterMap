// App.js
import React from 'react'
import { UserProvider } from './pages/UserContext'
import AppNavigator from './pages/Navigators/AppNavigator'

const App = () => (
  <UserProvider>
    <AppNavigator />
  </UserProvider>
)

export default App
