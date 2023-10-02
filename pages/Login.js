import React, { useContext, useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Button } from 'react-native';
import { List, TextInput } from 'react-native-paper';
import { UserContext } from './UserContext';

export default function LoginPage() {
  const { loginUser } = useContext(UserContext);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = async () => {
    const data = {
      email: email,
      password: password
    };
    try {
      const response = await fetch('http://3.138.178.239:5000/users/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      });
      if (!response.ok) {
        throw new Error('Network response was not ok ' + response.statusText);
      }
      const responseData = await response.json();
      console.log(responseData);
      if (responseData && responseData.email) {
        loginUser(responseData.email);
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <List.Section>
          <TextInput
            label="Email"
            value={email}
            onChangeText={setEmail}
          />
          <TextInput
            label="Password"
            value={password}
            secureTextEntry={true}
            onChangeText={setPassword}
          />
          <Button title="Login" onPress={handleLogin} />
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    marginHorizontal: 20
  }
});
