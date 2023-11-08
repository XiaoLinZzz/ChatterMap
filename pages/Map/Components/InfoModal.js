// InfoModal.js
import React from 'react'
import { Modal, View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

const InfoModal = ({ isVisible, onClose }) => {
  if (!isVisible) return null

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Map Component Guide</Text>

          <View style={styles.infoSection}>
            <Image source={require('../../../resource/seach.png')} style={styles.image} resizeMode="contain" />
            {/* eslint-disable-next-line react/no-unescaped-entities */}
            <Text style={styles.infoDescription}>Tap this icon to check which group chat you're currently in.</Text>
          </View>

          <View style={styles.infoSection}>
            <Image source={require('../../../resource/globe.png')} style={styles.image} resizeMode="contain" />
            <Text style={styles.infoDescription}>This globe icon allows you to reset your location.</Text>
          </View>

          <View style={styles.infoSection}>
            <Image source={require('../../../resource/pin.png')} style={styles.image} resizeMode="contain" />
            <Text style={styles.infoDescription}>You can tap on map markers to view the active group chats.</Text>
          </View>

          <View style={styles.infoSection}>
            <Image source={require('../../../resource/doc.png')} style={styles.image} resizeMode="contain" />
            <Text style={styles.infoDescription}>Discover detailed guides, tips, and FAQs in our documentation.</Text>
          </View>

          <TouchableOpacity style={styles.button} onPress={onClose}>
            <Text>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 22
  },
  modalView: {
    margin: 20,
    backgroundColor: 'white',
    borderRadius: 20,
    padding: 35,
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5
  },
  modalText: {
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  infoSection: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  image: {
    width: 30, // You can adjust the size as needed
    height: 30, // You can adjust the size as needed
    marginRight: 10
  },
  infoDescription: {
    flex: 1, // Ensure the text takes the remaining space
    flexWrap: 'wrap' // If text is long it wraps within the flex container
  }
  // ... other styles ...
})

export default InfoModal
