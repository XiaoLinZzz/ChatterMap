import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import AuthLandingPage from '../AuthLandingPage'
import LoginScreen from '../Login'
import SignUpScreen from '../Register'

const Stack = createStackNavigator()

const LoginNavigator = () => {
  return (
    <Stack.Navigator
        initialRouteName="AuthLanding"
        screenOptions={{
          headerShown: false
        }}
    >
        <Stack.Screen name="AuthLanding" component={AuthLandingPage} />
        <Stack.Screen name="Login" component={LoginScreen} />
        <Stack.Screen name="SignUp" component={SignUpScreen} />
    </Stack.Navigator>
  )
}

export default LoginNavigator
