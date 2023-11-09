// App.js
import React from 'react'
import { UserProvider } from './pages/UserContext'
import AppNavigator from './pages/Navigators/AppNavigator'
import { HideTabProvider } from './HideTabContext'
import { VibrationProvider } from './VibrationContext';


const App = () => (
  <UserProvider>
    <VibrationProvider>
      <HideTabProvider>
        <AppNavigator />
      </HideTabProvider>
    </VibrationProvider>
  </UserProvider>
)

export default App
