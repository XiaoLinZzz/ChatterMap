import React from 'react'
import { TouchableOpacity, Image, StyleSheet } from 'react-native'

const CheckChatroomButton = ({ onPress }) => {
  return (
    <TouchableOpacity onPress={onPress} style={styles.button}>
      {/* Replace 'your-image.png' with the actual image file you want to use */}
      <Image source={require('../../../resource/seach.png')} style={styles.image} />
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  button: {
    padding: 10,
    borderRadius: 5,
    position: 'absolute',
    top: 50,
    right: 50
  },
  image: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  }
})

export default CheckChatroomButton
