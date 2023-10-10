import React, { useContext } from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { UserContext } from '../UserContext'
import HomePageNavigator from './HomePageNavigator'
import LoginNavigator from './LoginNavigator'

const AppNavigator = () => {
  const { isUserLoggedIn } = useContext(UserContext)

  return (
    <NavigationContainer>
      {isUserLoggedIn ? <HomePageNavigator /> : <LoginNavigator />}
    </NavigationContainer>
  )
}

export default AppNavigator
