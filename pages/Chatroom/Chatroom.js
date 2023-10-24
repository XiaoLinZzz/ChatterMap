import { useNavigation } from '@react-navigation/native';
import React, { useState } from 'react';
import { Button, FlatList, Text, TextInput, View } from 'react-native';

export function ChatRoomScreen({ route }) {
  const navigation = useNavigation();
  const { chatRoomId } = route.params;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
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
