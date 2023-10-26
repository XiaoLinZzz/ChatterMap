import React, { useState } from 'react'
import { useNavigation } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const FriendsScreen = () => {
  const navigation = useNavigation();

  const goToInvitations = () => {
    // Navigate to FriendInvitationsScreen when it's set up
    navigation.navigate('New Friends');
  }

  const [friends, setFriends] = useState([
    { id: '3', name: 'Charlie' }
  ])
  const [newFriend, setNewFriend] = useState('')

  const addFriend = () => {
    if (newFriend) {
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
        <TouchableOpacity style={styles.invitationButton} onPress={goToInvitations}>
          <FontAwesome name="users" size={20} color="white" />
        </TouchableOpacity>
        <TextInput
          style={styles.input}
          onChangeText={setNewFriend}
          value={newFriend}
          placeholder="Enter friend's name"
        />
        <TouchableOpacity style={styles.addButton} onPress={addFriend}>
          <FontAwesome name="search" size={20} color="white" />
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
    marginLeft: 10,
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
  },
  invitationButton: {
    padding: 12,
    backgroundColor: '#4CAF50',
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center'
  }
})

export default FriendsScreen
