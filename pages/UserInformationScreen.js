import React from 'react'
import { View, Text, StyleSheet } from 'react-native'

export default function UserInformationScreen () {
  return (
    <View style={styles.screen}>
      <Text>User Information Screen</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  }
})