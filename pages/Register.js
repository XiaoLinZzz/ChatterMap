import React, { useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Button, View, Alert, Text } from 'react-native'
import { List, TextInput } from 'react-native-paper'

export default function SignupPage () {
  const [username, setUsername] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleSignUp = async () => {
    const data = {
      username,
      email,
      password
    }
    try {
      const response = await fetch('http://localhost:9999', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      })
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText)
      }
      const responseData = await response.json()
      console.log(responseData)
      if (responseData && responseData.success) {
        // Successfully signed up!
      } else {
        Alert.alert('Sign Up Error', 'There was an issue with the sign-up. Please try again.')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Sign Up Error', 'There was an error during sign up. Please check your connection and try again.')
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          {/* This is a placeholder for your logo */}
          <Text style={styles.logo}>Sign-up Page</Text>
        </View>
        <List.Section style={styles.inputSection}>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            style={styles.input}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            style={styles.input}
          />
          <TextInput
            label="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            style={styles.input}
          />
          <Button title="Sign Up" onPress={handleSignUp} color="#4CAF50" />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    backgroundColor: '#f5f5f5'
  },
  container: {
    flexGrow: 1,
    justifyContent: 'center',
    padding: 20
  },
  logoContainer: {
    alignItems: 'center',
    marginBottom: 40
  },
  logo: {
    fontSize: 32,
    fontWeight: 'bold',
    color: '#4CAF50'
  },
  inputSection: {
    marginBottom: 15
  },
  input: {
    marginBottom: 15,
    backgroundColor: 'white'
  }
})
