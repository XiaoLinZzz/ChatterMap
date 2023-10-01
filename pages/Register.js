import React, { useState } from 'react';
import { SafeAreaView, ScrollView, StyleSheet, Button } from 'react-native';
import { List, TextInput } from 'react-native-paper';

export default function SignupPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSignUp = async () => {
    const data = {
      username: username,
      email: email,
      password: password
    };
    const response = await postData('http://localhost:9999', data);
    console.log(response);  // Handle the response as required
  };

  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <List.Section>
          <TextInput
            label="Username"
            value={username}
            onChangeText={setUsername}
          />
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
          <Button title="Sign Up" onPress={handleSignUp} />
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
})
