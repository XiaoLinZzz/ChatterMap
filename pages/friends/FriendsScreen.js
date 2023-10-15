import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const FriendsScreen = () => {
  const [friends, setFriends] = useState([
    { id: '1', name: 'Alice' },
    { id: '2', name: 'Bob' },
    { id: '3', name: 'Charlie' }
  ])
  const [newFriend, setNewFriend] = useState('')

  const addFriend = () => {
    if (newFriend) {
      setFriends(prevFriends => [
        ...prevFriends,
        { id: (friends.length + 1).toString(), name: newFriend }
      ])
      setNewFriend('')
    }
  }

  const openChatWithFriend = (friendName) => {
    // Here, you can handle what should be done when a user clicks on the chat bubble.
    // For instance, navigate to a chat screen.
    console.log(`Start chat with ${friendName}`)
  }

  return (
    <View style={styles.container}>
        <View style={styles.inputContainer}>
            <TextInput
                style={styles.input}
                onChangeText={setNewFriend}
                value={newFriend}
                placeholder="Enter friend's name"
            />
            <TouchableOpacity style={styles.addButton} onPress={addFriend}>
                <FontAwesome name="plus" size={20} color="white" />
            </TouchableOpacity>
        </View>
        <FlatList
          data={friends}
          renderItem={({ item }) => (
            <View style={styles.friendContainer}>
              <Text style={styles.friendText}>{item.name}</Text>
              <TouchableOpacity onPress={() => openChatWithFriend(item.name)}>
                <FontAwesome name="comment" size={20} color="#4CAF50" />
              </TouchableOpacity>
            </View>
          )}
          keyExtractor={item => item.id}
        />
    </View>
  )
}

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16
  },
  input: {
    flex: 1,
    height: 45,
    borderColor: '#ddd',
    borderWidth: 1,
    borderRadius: 12,
    paddingLeft: 15,
    backgroundColor: 'white',
    marginRight: 10
  },
  addButton: {
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  },
  friendText: {
    fontSize: 16
  },
  title: {
    fontSize: 26,
    fontWeight: 'bold',
    color: '#4CAF50',
    textAlign: 'center',
    marginBottom: 20
  },
  friendContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    padding: 10,
    backgroundColor: 'white',
    marginBottom: 10,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1
  },
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#f5f5f5'
  },
  headerContainer: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 20,
    borderBottomWidth: 0.5,
    borderBottomColor: '#ddd'
  }
})

export default FriendsScreen
