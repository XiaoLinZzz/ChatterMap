import React, { useContext, useState } from 'react'
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, ActivityIndicator, View, Text, TouchableWithoutFeedback, Keyboard } from 'react-native'
import { List, TextInput } from 'react-native-paper'
import { UserContext } from './UserContext'
import AsyncStorage from '@react-native-async-storage/async-storage'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function LoginPage() {
  const { loginUser } = useContext(UserContext)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  const handleLogin = async () => {
    setLoading(true)
    setError(null)
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
      if (responseData && responseData.token) {
        // await console.log(responseData.token);
        await AsyncStorage.setItem('userId', responseData.user_id.toString())
        await AsyncStorage.setItem('userToken', responseData.token)
        // await AsyncStorage.setItem('userId', responseData.user_id.toString());
        loginUser(responseData.email)
      } else {
        Alert.alert('Login Error', 'Invalid email or password. Please try again.')
      }
    } catch (error) {
      setError(error.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss}>
      <SafeAreaView style={styles.screen}>
        <ScrollView contentContainerStyle={styles.container}>
          <Text style={styles.pageTitle}>Log in to ChatterMap</Text>
          <List.Section style={styles.inputSection}>
            <TextInput
              label="Email"
              value={email}
              onChangeText={setEmail}
              left={<TextInput.Icon name="envelope" icon={() => <Icon name="envelope" size={18} />} />}
            />
            <TextInput
              label="Password"
              value={password}
              secureTextEntry={true}
              onChangeText={setPassword}
              left={<TextInput.Icon name="lock" icon={() => <Icon name="lock" size={20} />} />}
            />
            <TouchableOpacity onPress={() => { /* handle forgot password logic here */ }}>
              <Text style={styles.forgotPasswordText}>Forgot password?</Text>
            </TouchableOpacity>
            {error && <Text style={styles.errorText}>{error}</Text>}
            <TouchableOpacity style={styles.loginButton} onPress={handleLogin} disabled={loading}>
              {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.loginButtonText}>Login</Text>}
            </TouchableOpacity>
          </List.Section>
        </ScrollView>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20
  },
  container: {
    margin: 30
  },
  loginButton: {
    backgroundColor: '#6200ee',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20
  },
  loginButtonText: {
    color: '#fff',
    fontSize: 18
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center'
  },
  forgotPasswordText: {
    textAlign: 'right',
    marginTop: 10,
    color: '#006adc',
    textDecorationLine: 'underline'
  }
})
