import PropTypes from 'prop-types'
import React, { useState } from 'react'
import { Modal, View, Text, Button, StyleSheet, TextInput, FlatList, TouchableOpacity } from 'react-native'

export default function AddFriendModal ({ isVisible, onClose }) {
  const [searchTerm, setSearchTerm] = useState('')
  const [friendsList, setFriendsList] = useState(['John Doe', 'Jane Smith', 'Alice', 'Bob'])
  const [searchResults, setSearchResults] = useState(friendsList)

  const handleSearch = () => {
    const filteredResults = friendsList.filter(name => name.toLowerCase().includes(searchTerm.toLowerCase()))
    setSearchResults(filteredResults)
  }

  return (
    <Modal
      animationType="slide"
      transparent={true}
      visible={isVisible}
      onRequestClose={onClose}
    >
      <View style={styles.modalBackground}>
        <View style={styles.modalView}>
          <Text>Add a friend!</Text>

          <TextInput
            style={styles.searchBar}
            placeholder="Search for friends..."
            value={searchTerm}
            onChangeText={setSearchTerm}
            onSubmitEditing={handleSearch}
          />

          <FlatList
            data={searchResults}
            keyExtractor={(item) => item}
            renderItem={({ item }) => (
              <View style={styles.listItem}>
                <Text>{item}</Text>
                <TouchableOpacity style={styles.addButton}>
                  <Text>add</Text>
                </TouchableOpacity>
              </View>
            )}
          />

          <Button title="Close" onPress={onClose} />
        </View>
      </View>
    </Modal>
  )
}

const styles = StyleSheet.create({
  modalBackground: {
    flex: 1,
    justifyContent: 'flex-end'
  },
  modalView: {
    flex: 0.7,
    backgroundColor: 'white',
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    padding: 15,
    alignItems: 'center'
  },
  searchBar: {
    width: '80%',
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 10,
    marginBottom: 10,
    paddingLeft: 10
  },
  listItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    width: '80%',
    padding: 10,
    borderBottomWidth: 0.5,
    borderColor: 'gray'
  },
  addButton: {
    padding: 5,
    backgroundColor: '#4CAF50',
    borderRadius: 5
  }
})

AddFriendModal.propTypes = {
  isVisible: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired
}
