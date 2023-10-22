import React, { useState } from 'react'
import { View, Text, TextInput, TouchableOpacity, FlatList, StyleSheet } from 'react-native'

const Chatroom = ({ route }) => {
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState([])

  const groupChat = route.params.groupChat;

  const handleSend = () => {
    if (message.trim() === '') return

    setMessages([...messages, { text: message, user: 'me' }])
    setMessage('')
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={messages}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
            <View style={item.user === 'me' ? styles.myMessage : styles.otherMessage}>
                <Text>{item.text}</Text>
            </View>
        )}
      />
      <View style={styles.inputContainer}>
        <TextInput
            style={styles.input}
            placeholder="Type your message..."
            value={message}
            onChangeText={(text) => setMessage(text)}
        />
        <TouchableOpacity style={styles.sendButton} onPress={handleSend}>
            <Text>Send</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  myMessage: {
    alignSelf: 'flex-end',
    backgroundColor: 'lightblue',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8
  },
  otherMessage: {
    alignSelf: 'flex-start',
    backgroundColor: 'lightgray',
    padding: 8,
    marginVertical: 4,
    borderRadius: 8
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center'
  },
  input: {
    flex: 1,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 8,
    padding: 8,
    marginRight: 8
  },
  sendButton: {
    backgroundColor: 'tomato',
    padding: 8,
    borderRadius: 8
  }
})

export default Chatroom
