import React from 'react'
import { SafeAreaView, ScrollView, StyleSheet } from 'react-native'
import { List } from 'react-native-paper'

const settings = {
  username: 'Nacho',
  email: 'nacho@example.com',
  password: '********'
}

export default function AccountSettings () {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <List.Section>
          <List.Item
            title="Username"
            description={settings.username}
          />
          <List.Item
            title="Email"
            description={settings.email}
          />
          <List.Item
            title="Password"
            description={settings.password}
          />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20
  }
})
