import React from 'react'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatScreen from './pages/ChatScreen'
import MapScreen from './pages/MapScreen'
import UserInformationScreen from './pages/UserInformationScreen'

const BottomTab = createBottomTabNavigator()

export default function App () {
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: [{ display: 'flex' }, null]
        }}
      >
        <BottomTab.Screen name="Chat" component={ChatScreen} />
        <BottomTab.Screen name="Map" component={MapScreen} />
        <BottomTab.Screen name="User Information" component={UserInformationScreen} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}
