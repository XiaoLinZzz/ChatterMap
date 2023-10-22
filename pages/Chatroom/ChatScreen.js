import React, { useState, useEffect } from 'react';
import { View, Text, Button, FlatList, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { getGroupChatInformation } from '../../Services/GroupChatService';

const Stack = createNativeStackNavigator();


const chatRooms = [
  { id: 3, name: "Chat Room 1", description: "sfsdf" },
  { id: 2, name: "Chat Room 2", description: "sfasdfasdfasdfsadfsadsdf" },
  // Add more chat rooms as needed
];

function MainChatScreen() {
  const navigation = useNavigation();
  const [name, setName] = useState("");
  const [chatroomData, setData] = useState(chatRooms)
  useEffect(() => {
    async function test() {
      try {
        const data = await getGroupChatInformation(1);
        // setName(data.name);
        // console.log(data)
        setData((prevData) => prevData.concat(data));
        console.log("need to change here, have to get the data rather than append the data")
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    }

    test();
  }, []);

  const joinChatRoom = (chatRoomId) => {
    navigation.navigate('ChatRoom', { chatRoomId });
  };
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
    <View>
      <FlatList
        data={chatroomData}
        keyExtractor={(item) => item.id.toString()}
        renderItem={renderGroupChatItem}
      />
    </View>
  );
}

function ChatRoomScreen({ route }) {
  const navigation = useNavigation();
  const { chatRoomId } = route.params;

  const [messages, setMessages] = React.useState([]);
  const [newMessage, setNewMessage] = React.useState('');
  const addMessage = (text, sender) => {
    setMessages((prevMessages) => [
      ...prevMessages,
      { id: prevMessages.length, text, sender },
    ]);
  };

  // change the title of the chat room
  React.useEffect(() => {
    navigation.setOptions({ title: `${chatRoomId.name}` });
  }, [chatRoomId]);


  const sendMessage = () => {
    if (newMessage) {
      addMessage(newMessage, 'user');
      setNewMessage('');
    }
  };

  return (
    <View style={{ flex: 1, padding: 10 }}>
      <FlatList
        data={messages}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <View
            style={{
              alignSelf: item.sender === 'user' ? 'flex-end' : 'flex-start',
              backgroundColor: item.sender === 'user' ? '#007AFF' : '#E5E5EA',
              borderRadius: 10,
              margin: 5,
              maxWidth: '70%',
              padding: 10,
            }}
          >
            <Text style={{ color: item.sender === 'user' ? 'white' : 'black' }}>
              {item.text}
            </Text>
          </View>
        )}
      />
      <View style={{ flexDirection: 'row', alignItems: 'center' }}>
        <TextInput
          style={{ flex: 1, borderWidth: 1, marginRight: 5, padding: 10, borderRadius: 10 }}
          value={newMessage}
          onChangeText={setNewMessage}
          multiline={true}
        />
        <Button title="send" onPress={sendMessage} />
      </View>
    </View>
  );
}

function ChatScreen() {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Home" component={MainChatScreen} />
      <Stack.Screen name="ChatRoom" component={ChatRoomScreen} />
    </Stack.Navigator>
  );
}

export default ChatScreen;
const styles = StyleSheet.create({
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
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1
  }
})