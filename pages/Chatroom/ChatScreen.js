import { useNavigation } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import React, { useEffect, useState } from 'react'
import { FlatList, StyleSheet, Text, TouchableOpacity, View, Linking } from 'react-native'
import { getGroupChatInformation } from '../../Services/GroupChatService'
import { ChatRoomScreen } from './Chatroom'
import { useHideTab } from '../../HideTabContext'
import roomSocket from '../../socket'

const Stack = createNativeStackNavigator()

function MainChatScreen () {
  const navigation = useNavigation()
  const [name, setName] = useState('')
  const [chatroomData, setData] = useState([])
  const [isRefreshing, setIsRefreshing] = useState(false)
  useEffect(() => {
    onRefresh()
  }, [])
  const { hideTab, setHideTab } = useHideTab()

  const joinChatRoom = (chatRoomId) => {
    setHideTab('none')
    const timeoutId = setTimeout(() => {
      navigation.navigate('ChatRoom', { chatRoomId })
      // setHideTab('none');
    }, 10)

    return () => clearTimeout(timeoutId)
  }

  const renderEmptyListComponent = () => (
    <View style={styles.emptyContainer}>
      <Text style={styles.emptyText}>No active chat rooms.</Text>
      <TouchableOpacity onPress={() => Linking.openURL('https://xiaolinzzz.notion.site/xiaolinzzz/Guide-3ee45b4f037b4c3f8cfd62a6fe875303')}>
        <Text style={styles.linkText}>Tap here for help.</Text>
      </TouchableOpacity>
    </View>
  )

  const onRefresh = async () => {
    setIsRefreshing(true)
    try {
      const data = await getGroupChatInformation(1)
      // console.log(data)
      data.forEach(room => {
        console.log(room)
        roomSocket.emit('join', { group_chat_id: room.id })
        console.log('socket is connented? ' + roomSocket.connected)
      })
      setData(data)
      console.log('Data refresh')
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }
  const renderGroupChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.groupChatItem}
      onPress={() => joinChatRoom(item)}
    >
      <Text style={styles.groupChatName}>{item.name}</Text>
      <Text style={styles.groupChatMembers}>{item.description}</Text>
    </TouchableOpacity>
  )

  return (
    <View style={styles.container}>
      <FlatList
        data={chatroomData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGroupChatItem}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
        ListEmptyComponent={renderEmptyListComponent} // This prop renders a component when the list is empty
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  groupChatItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd'
  },
  groupChatName: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  groupChatMembers: {
    fontSize: 14,
    color: '#888'
  },
  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20
  },
  emptyText: {
    fontSize: 16,
    color: '#888',
    textAlign: 'center'
  },
  linkText: {
    fontSize: 16,
    color: '#1B95E0', // Typically, links are styled with a color that stands out, like blue.
    marginTop: 10, // Optional: add some margin if you want to separate it from the empty text
    textDecorationLine: 'underline' // Underline the text to make it clear that it is a link
  }
})

export default function ChatScreen () {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainChatScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  )
}
