import React from 'react'
import { Image, Dimensions } from 'react-native'
import { NavigationContainer } from '@react-navigation/native'
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs'
import ChatScreen from './pages/ChatScreen'
import MapScreen from './pages/MapScreen'
import UserInformationScreen from './pages/UserInformationScreen'

const BottomTab = createBottomTabNavigator()

export default function App () {
  const screenWidth = Dimensions.get('window').width
  const iconSize = screenWidth * 0.075
  return (
    <NavigationContainer>
      <BottomTab.Navigator
        screenOptions={{
          tabBarActiveTintColor: 'tomato',
          tabBarInactiveTintColor: 'gray',
          tabBarStyle: [{ display: 'flex' }, null]
        }}
      >
        <BottomTab.Screen name="Chat" component={ChatScreen} options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require('./resource/message.png') : require('./resource/messageSelected.png')}
              style={{ width: focused ? iconSize : screenWidth * 0.064, height: focused ? iconSize : screenWidth * 0.064 }}
            />
          ),
          headerShown: false
        }} />
        <BottomTab.Screen name="Map" component={MapScreen} options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require("./resource/mapSelected.png") : require('./resource/map.png')}
              style={{ width: focused ? iconSize : screenWidth * 0.064, height: focused ? iconSize : screenWidth * 0.064 }}
            />
          ),
          headerShown: false
        }
        } />
        <BottomTab.Screen name="User Information" component={UserInformationScreen} options={{
          tabBarIcon: ({ focused }) => (
            <Image
              source={focused ? require("./resource/profileSelected.png") : require('./resource/profile.png')}
              style={{ width: focused ? iconSize : screenWidth * 0.064, height: focused ? iconSize : screenWidth * 0.064 }}
            />
          ),
          headerShown: false
        }} />
      </BottomTab.Navigator>
    </NavigationContainer>
  )
}
