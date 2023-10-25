// Friends.js

import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import FriendsScreen from './FriendsScreen'
import NewFriendsScreen from './NewFriendsScreen'

const Stack = createStackNavigator()

const Friends = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="FriendsList"
        component={FriendsScreen}
        options={{
          title: 'Friends',
          headerTitleAlign: 'center'
        }}
      />
      <Stack.Screen
        name="New Friends"
        component={NewFriendsScreen}
        options={{
          title: 'New Friends',
          headerTitleAlign: 'center'
        }}
      />
    </Stack.Navigator>
  )
}

export default Friends
