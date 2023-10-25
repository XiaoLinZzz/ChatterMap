// App.js
import React from 'react'
import { UserProvider } from './pages/UserContext'
import AppNavigator from './pages/Navigators/AppNavigator'
import { HideTabProvider } from './HideTabContext'


const App = () => (
  <UserProvider>
    <HideTabProvider>
      <AppNavigator />
    </HideTabProvider>
  </UserProvider>
)

export default App
