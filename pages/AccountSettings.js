import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TextInput } from 'react-native'
import { List } from 'react-native-paper'

export default function AccountSettings () {
  const [username, setUsername] = useState('Nacho')
  const [email, setEmail] = useState('nacho@example.com')
  const [password, setPassword] = useState('********')

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <List.Section>
          <List.Item
            title="Username"
            description={
              <TextInput
                value={username}
                onChangeText={(text) => setUsername(text)}
                style={styles.input}
              />
            }
          />
          <List.Item
            title="Email"
            description={
              <TextInput
                value={email}
                onChangeText={(text) => setEmail(text)}
                style={styles.input}
              />
            }
          />
          <List.Item
            title="Password"
            description={
              <TextInput
                value={password}
                onChangeText={(text) => setPassword(text)}
                secureTextEntry={true}
                style={styles.input}
              />
            }
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
  },
  input: {
    padding: 100,
    borderBottomWidth: 1,
    borderBottomColor: '#111'
  }
})
