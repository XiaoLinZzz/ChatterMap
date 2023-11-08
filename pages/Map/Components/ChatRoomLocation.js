// ChatRoom.js
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet, Linking } from 'react-native'
import PropTypes from 'prop-types'

const ChatRoomLocation = ({ isVisible, onClose, roomData }) => {
  if (!isVisible) return null

  const handlePressURL = async () => {
    const supported = await Linking.canOpenURL(roomData.url)

    if (supported) {
      await Linking.openURL(roomData.url)
    } else {
      console.log(`Don't know how to open this URL: ${roomData.url}`)
    }
  }

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roomData.name}</Text>
      <Text>Opening Hours: {roomData.description}</Text>
      <Text>
        <Text>Website: </Text>
        <Text onPress={handlePressURL} style={styles.url}>
          {roomData.url}
        </Text>
      </Text>
      <TouchableOpacity onPress={onClose} style={styles.closeButton}>
        <Text>Close</Text>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: 'white',
    padding: 20
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  closeButton: {
    marginTop: 10,
    backgroundColor: '#ddd',
    padding: 10,
    borderRadius: 5
  },
  url: {
    color: 'blue',
    textDecorationLine: 'underline'
  }
})

ChatRoomLocation.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  roomData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string,
    url: PropTypes.string
    // Define other properties of roomData that you use
  })
}

export default ChatRoomLocation
