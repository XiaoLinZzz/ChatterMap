import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { List, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignupPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    setIsSuccess(false);
    const data = {
      name: name,
      email: email,
      password: password
    };
    try {
      const response = await fetch('http://3.138.178.239:5000/signup', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(data)
      });

      const responseData = await response.json();

      if (!response.ok) {
        throw new Error(responseData.message || 'Sign Up Failed.');
      }

      if (responseData.id && responseData.name && responseData.email) {
        setIsSuccess(true);
      } else {
        throw new Error('Unexpected response from the server.');
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView contentContainerStyle={styles.container}>
        <Text style={styles.pageTitle}>Create your account</Text>
        {isSuccess && <Text style={styles.successText}>Account created successfully!</Text>}
        <List.Section style={styles.inputSection}>
          <TextInput
            label="Name"
            value={name}
            onChangeText={setName}
            left={<TextInput.Icon name="user" icon={() => <Icon name="user" size={20} />} />}
          />
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
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
          </TouchableOpacity>
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
  },
  pageTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign: 'center',
    marginTop: 20,
  },
  container: {
    margin: 30,
  },
  signupButton: {
    backgroundColor: '#6200ee',
    borderRadius: 25,
    paddingVertical: 10,
    paddingHorizontal: 15,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 20,
  },
  signupButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  errorText: {
    color: 'red',
    marginTop: 10,
    textAlign: 'center',
  },
  successText: {
    color: 'green',
    fontSize: 18,
    textAlign: 'center',
    marginVertical: 15,
  }
});
