// components/ResetLocationButton.js

import PropTypes from 'prop-types'
import React from 'react'
import { View, TouchableOpacity, StyleSheet, Image } from 'react-native'

export default function ResetLocationButton ({ onPress }) {
  return (
    <View style={styles.resetButtonContainer}>
      <TouchableOpacity style={styles.button} onPress={onPress}>
        <Image
            source={require('../../../resource/globe.png')} // Replace with your image path
            style={styles.iconStyle} // You can define a style for the image if you want
        />
      </TouchableOpacity>
    </View>
  )
}

ResetLocationButton.propTypes = {
  onPress: PropTypes.func.isRequired
}

const styles = StyleSheet.create({
  resetButtonContainer: {
    position: 'absolute',
    bottom: 15,
    left: 0,
    right: 0,
    alignItems: 'center',
    justifyContent: 'center'
  },
  button: {
    backgroundColor: 'white',
    width: 40, // Set a fixed width
    height: 40, // Set a fixed height
    borderRadius: 20, // Make it circular
    alignItems: 'center', // Center the image/icon
    justifyContent: 'center', // Center the image/icon
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  iconStyle: {
    width: 20,
    height: 20
  }
})
