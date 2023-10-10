import React, { useContext, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, Button, View, Alert } from 'react-native'
import { List, TextInput, Text } from 'react-native-paper'
import { UserContext } from './UserContext'

export default function LoginPage () {
  const { loginUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const handleLogin = async () => {
    const data = {
      email,
      password
    }
    try {
      const response = await fetch('http://3.138.178.239:5000/users/login', {
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
      if (responseData && responseData.email) {
        loginUser(responseData.email)
      } else {
        Alert.alert('Login Error', 'Invalid email or password. Please try again.')
      }
    } catch (error) {
      console.error(error)
      Alert.alert('Login Error', 'There was an error logging in. Please check your connection and try again.')
    }
  }

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <View style={styles.logoContainer}>
          {/* This is a placeholder for your logo */}
          <Text style={styles.logo}>Login Page</Text>
        </View>
        <List.Section style={styles.inputSection}>
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
          <Button title="Login" onPress={handleLogin} color="#4CAF50" />
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
