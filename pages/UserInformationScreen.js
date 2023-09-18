import React from 'react'
import PropTypes from 'prop-types'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { List } from 'react-native-paper'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import AccountSettings from './AccountSettings'
// import PrivacySettings from './PrivacySettings'
// import NotificationSettings from './NotificationSettings'
// import AboutSettings from './AboutSettings'

const settings = [
  {
    id: 1,
    title: 'Account',
    icon: 'account',
    navigation: 'Account'
  },
  {
    id: 2,
    title: 'Privacy',
    icon: 'lock',
    navigation: 'Privacy'
  },
  {
    id: 3,
    title: 'Notification',
    icon: 'bell',
    navigation: 'Notification'
  },
  {
    id: 4,
    title: 'About',
    icon: 'information',
    navigation: 'About'
  }
]

export function SettingsScreen ({ navigation }) {
  return (

    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <List.Section>
          {settings.map((setting) => (
            <List.Item
              key={setting.id}
              title={setting.title}
              left={() => <List.Icon icon={setting.icon} />}
              onPress={() => navigation.navigate(setting.navigation)}
            />
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  )
}

const Stack = createNativeStackNavigator()

export default function UserInformationScreen () {
  return (
    <Stack.Navigator initialRouteName="Settings">
      <Stack.Screen
        name="Settings"
        component={SettingsScreen}
        headerShown={false}
        />
      <Stack.Screen name="Account" component={AccountSettings} />
      <Stack.Screen name="Privacy" component={AccountSettings} />
      <Stack.Screen name="Notification" component={AccountSettings} />
      <Stack.Screen name="About" component={AccountSettings} />
    </Stack.Navigator>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20
  }
})

SettingsScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func
  })
}
