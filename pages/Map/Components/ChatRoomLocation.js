// ChatRoom.js
import React from 'react'
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native'
import PropTypes from 'prop-types'

const ChatRoomLocation = ({ isVisible, onClose, roomData }) => {
  if (!isVisible) return null

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{roomData.name}</Text>
      <Text>{roomData.description}</Text>
      {/* Add more room details here */}
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
  }
})

ChatRoomLocation.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  roomData: PropTypes.shape({
    name: PropTypes.string,
    description: PropTypes.string
    // Define other properties of roomData that you use
  })
}

export default ChatRoomLocation
