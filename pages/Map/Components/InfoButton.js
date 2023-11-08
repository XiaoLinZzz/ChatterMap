// InfoButton.js
import React from 'react'
import { TouchableOpacity, StyleSheet, Text } from 'react-native'

// eslint-disable-next-line react/prop-types
const InfoButton = ({ onPress }) => {
  return (
    <TouchableOpacity style={styles.infoButton} onPress={onPress}>
      <Text style={styles.infoText}>i</Text>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  infoButton: {
    position: 'absolute',
    top: 50,
    left: 20,
    backgroundColor: 'white',
    padding: 10,
    borderRadius: 50, // This ensures the touchable area is circular
    alignItems: 'center', // Center the 'i' text horizontally
    justifyContent: 'center', // Center the 'i' text vertically
    height: 35, // Set a fixed height
    width: 35, // Set a fixed width to make the button a perfect circle
    elevation: 3, // Add elevation to create a shadow effect (Android)
    shadowOpacity: 0.1, // iOS shadow settings
    shadowRadius: 3,
    shadowColor: 'black',
    shadowOffset: { height: 1, width: 0 }
  },
  infoText: {
    fontSize: 18,
    fontWeight: 'bold',
    color: 'black'
  }
})

export default InfoButton
