// Friends.js

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FriendsScreen from './FriendsScreen'

const Stack = createStackNavigator()

const Friends = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FriendsList"
        component={FriendsScreen}
        options={{
          title: 'Friends',
          headerTitleAlign: 'center' // corrected from "Align" to "headerTitleAlign"
        }}
      />
    </Stack.Navigator>
  )
}

export default Friends
