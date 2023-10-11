import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, FlatList } from 'react-native';

export default function GroupChatScreen({ route }) {
    const { groupChat } = route.params; // 获取传递的群聊信息
    const [message, setMessage] = useState(''); // 用于存储用户输入的消息
    const [chatHistory, setChatHistory] = useState([]); // 用于存储聊天消息历史

    // 处理用户发送消息
    const sendMessage = () => {
        if (message) {
            const newMessage = {
                text: message,
                sender: 'User', // 可以改为实际用户名或头像
            };

            // 更新聊天历史
            setChatHistory((prevChatHistory) => [...prevChatHistory, newMessage]);

            // 清空输入框
            setMessage('');
        }
    };

    return (
        <View style={styles.container}>
            <Text style={styles.groupChatName}>{groupChat.name}</Text>
            <FlatList
                data={chatHistory}
                keyExtractor={(item, index) => index.toString()}
                renderItem={({ item }) => (
                    <View style={styles.messageContainer}>
                        <Text style={styles.messageSender}>{item.sender}:</Text>
                        <Text style={styles.messageText}>{item.text}</Text>
                    </View>
                )}
            />
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    value={message}
                    onChangeText={(text) => setMessage(text)}
                    placeholder="Type your message..."
                />
                <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
                    <Text style={styles.sendButtonText}>Send</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
    groupChatName: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    messageContainer: {
        flexDirection: 'row',
        marginBottom: 10,
    },
    messageSender: {
        fontSize: 16,
        fontWeight: 'bold',
    },
    messageText: {
        fontSize: 16,
        marginLeft: 5,
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        fontSize: 16,
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 8,
    },
    sendButton: {
        marginLeft: 10,
        padding: 10,
        backgroundColor: 'blue',
        borderRadius: 5,
        alignItems: 'center',
        justifyContent: 'center',
    },
    sendButtonText: {
        color: 'white',
        fontWeight: 'bold',
    },
});
