import React from 'react'
import { createStackNavigator } from '@react-navigation/stack'
import InformationScreen from './InformationScreen'
import SettingScreen from './Setting'

const Stack = createStackNavigator()

export default function ProfileScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen
        name="User"
        component={InformationScreen}
        headerShown={false}
      />
      <Stack.Screen
        name="Setting"
        component={SettingScreen}
        options={{ tabBarStyle: { display: "none" }, }}
      />
    </Stack.Navigator>
  )
}
