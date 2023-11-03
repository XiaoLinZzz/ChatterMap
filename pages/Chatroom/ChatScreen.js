import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React, { useState } from 'react';
import { FlatList, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { getGroupChatInformation } from '../../Services/GroupChatService';
import { ChatRoomScreen } from './Chatroom';
import { useHideTab } from '../../HideTabContext';

const Stack = createNativeStackNavigator();

const chatRooms = [
  { id: 3, name: "Chat Room 1", description: "sfsdf" },
  { id: 2, name: "Chat Room 2", description: "sfasdfasdfasdfsadfsadsdf" },
  // Add more chat rooms as needed
];

function MainChatScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [chatroomData, setData] = useState(chatRooms);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const { hideTab, setHideTab } = useHideTab();

  const joinChatRoom = (chatRoomId) => {
    navigation.navigate('ChatRoom', { chatRoomId });
    setHideTab('none');
  };
  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      const data = await getGroupChatInformation(1);
      setData(data);
      console.log("Data refresh")
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };
  const renderGroupChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.groupChatItem}
      onPress={() => joinChatRoom(item)}
    >
      <Text style={styles.groupChatName}>{item.name}</Text>
      <Text style={styles.groupChatMembers}>{item.description}</Text>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
      <FlatList
        data={chatroomData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGroupChatItem}
        refreshing={isRefreshing}
        onRefresh={onRefresh}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  groupChatItem: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
  groupChatName: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  groupChatMembers: {
    fontSize: 14,
    color: '#888',
  },
});

export default function ChatScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainChatScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}
