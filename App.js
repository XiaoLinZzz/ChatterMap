import React, { useState } from 'react'
import { StatusBar } from 'expo-status-bar'
import { StyleSheet, Text, View, Button } from 'react-native'

// eslint-disable-next-line require-jsdoc
export default function App () {
  const [count, setCount] = useState(0)

  return (
    <View style={styles.container}>
      <Text style={styles.text}>Open up App.js to start working on your app!</Text>
      <Text style={styles.text}>Button pressed {count} times.</Text>
      <Button
        title="Press me"
        onPress={() => setCount(count + 1)} />
      <StatusBar style="auto" />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 12,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center'
  },
  text: {
    marginBottom: 10,
    fontSize: 18
  }
})
