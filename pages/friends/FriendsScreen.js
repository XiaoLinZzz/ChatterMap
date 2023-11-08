import React, { useState } from 'react';
import { useNavigation, useFocusEffect } from '@react-navigation/native';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Alert } from 'react-native';
import FontAwesome from '@expo/vector-icons/FontAwesome';
import { getUserData } from '../../Services/UserService.js';
import { deleteFriend } from '../../Services/FriendService.js';
import { useHideTab } from '../../HideTabContext';
import { Swipeable } from 'react-native-gesture-handler';

const FriendsScreen = () => {
  const navigation = useNavigation();
  const [friends, setFriends] = useState([]);
  const [newFriend, setNewFriend] = useState('');
  const [swipeableResetKey, setSwipeableResetKey] = useState(0);
  const { hideTab, setHideTab } = useHideTab();

  const goToInvitations = () => {
    // Navigate to FriendInvitationsScreen when it's set up
    navigation.navigate('New Friends');
    setHideTab('none');
  }

  const fetchUserData = async () => {
    try {
      const data = await getUserData();
      const friendsData = data.friends.map(friend => ({
        id: friend.id.toString(),
        name: friend.name
      }));
      setFriends(friendsData);
    } catch (error) {
      console.error('Failed to fetch user data:', error);
    }
  };

  // Fetch friends every time the screen comes into focus
  useFocusEffect(
    React.useCallback(() => {
      fetchUserData();

      // Reset Swipeable by updating the key
      setSwipeableResetKey(prevKey => prevKey + 1);

      return () => { };
    }, [])
  );

  const addFriend = () => {
    if (newFriend) {
      setNewFriend('')
    }
  }

  const confirmDeleteFriend = (friendId) => {
    Alert.alert(
      "Delete",
      "Are you sure you want to delete this friend?",
      [
        {
          text: "Cancel",
          onPress: () => console.log("Cancel Pressed"),
          style: "cancel"
        },
        { text: "Yes", onPress: () => handleDeleteFriend(friendId) }
      ]
    );
  };

  // Renamed function to handleDeleteFriend
  const handleDeleteFriend = async (friendId) => {
    try {
      const data = await deleteFriend(friendId); // This calls the imported deleteFriend

      if (data) {
        Alert.alert("Success", "Friend deleted successfully!");
        // You probably want to update the friends list after a successful delete
        setFriends(prevFriends => prevFriends.filter(friend => friend.id !== friendId));
      }
    } catch (error) {
      console.error("Error deleting friend:", error.message);
      Alert.alert("Error", "Friend deletion unsuccessful!");
    }
  }

  const renderRightActions = (friendId) => {
    return (
      <TouchableOpacity onPress={() => confirmDeleteFriend(friendId)} style={styles.deleteButton}>
        <Text style={styles.deleteButtonText}>Delete</Text>
      </TouchableOpacity>
    );
  };

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
          <Swipeable
            renderRightActions={() => renderRightActions(item.id)}
            key={`swipeable_${swipeableResetKey}_${item.id}`} // Resetting Swipeable state by using a unique key
          >
            {/* Friend item content */}
            <View style={styles.friendContainer}>
              <Text style={styles.friendText}>{item.name}</Text>
              <Text style={styles.friendIdText}>{item.id}</Text>
            </View>
          </Swipeable>
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
  deleteButton: {
    width: 70, // Set a fixed width for the delete button
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center',
    padding: 10,
    borderRadius: 8,
    marginLeft: 5,
    height: 42
  },
  deleteButtonText: {
    color: 'white',
    fontWeight: 'bold',
    fontSize: 15,
    textAlign: 'center'
  },
  friendText: {
    fontSize: 15,
    flex: 1
  },
  friendIdText: {
    fontSize: 15,
    textAlign: 'right',
    flex: 1
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
    marginBottom: 15,
    borderRadius: 8,
    borderColor: '#ddd',
    borderWidth: 1,
    minHeight: 40,
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
