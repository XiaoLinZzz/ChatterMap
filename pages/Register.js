import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, TouchableOpacity, View, Text, ActivityIndicator } from 'react-native';
import { List, TextInput } from 'react-native-paper';
import Icon from 'react-native-vector-icons/FontAwesome';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleSignUp = async () => {
    setLoading(true);
    setError(null);
    const data = {
      username: username,
      email: email,
      password: password
    };
    try {
      const response = await postData('http://localhost:9999', data);
      console.log(response);  // Handle the response as required
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <List.Section>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
            left={<TextInput.Icon name={() => <Icon name="user" />} />}
          />
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
            left={<TextInput.Icon name={() => <Icon name="envelope" />} />}
          />
          <TextInput
            label="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
            left={<TextInput.Icon name={() => <Icon name="lock" />} />}
          />
          {error && <Text style={styles.errorText}>{error}</Text>}
          <TouchableOpacity style={styles.signupButton} onPress={handleSignUp} disabled={loading}>
            {loading ? <ActivityIndicator color="#fff" /> : <Text style={styles.signupButtonText}>Sign Up</Text>}
          </TouchableOpacity>
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20,
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
  }
});
