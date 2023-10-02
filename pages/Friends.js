import React, { useState } from 'react'
import { View, Text, Button, TextInput, FlatList } from 'react-native'

const Friends = () => {
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

  return (
        <View style={{ flex: 1, padding: 16 }}>
            <TextInput
                style={{ height: 40, borderColor: 'gray', borderWidth: 1, marginBottom: 8 }}
                onChangeText={setNewFriend}
                value={newFriend}
                placeholder="Enter friend's name"
            />
            <Button title="Add Friend" onPress={addFriend} />
            <FlatList
                data={friends}
                renderItem={({ item }) => <Text>{item.name}</Text>}
                keyExtractor={item => item.id}
            />
        </View>
  )
}

export default Friends
