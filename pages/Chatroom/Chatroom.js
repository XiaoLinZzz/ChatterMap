import React, { useEffect, useState } from 'react';
import { Button, FlatList, Text, TextInput, View, KeyboardAvoidingView, Platform, SafeAreaView, Keyboard } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { sendGroupMessage, getLastNMessageInformation } from '../../Services/GroupChatService';
import { useHideTab } from '../../HideTabContext';
import { useFocusEffect } from '@react-navigation/native';




export function ChatRoomScreen({ route }) {
  const navigation = useNavigation();
  const { chatRoomId } = route.params;

  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState('');
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [isLoadingHistory, setIsLoadingHistory] = useState(false);
  const [scrollY, setScrollY] = useState(0);
  const [top, setTop] = useState(true)
  const [bottom, setBottom] = useState(true)
  const { hideTab, setHideTab } = useHideTab();

  const flatListRef = React.useRef(null);

  useFocusEffect(
    React.useCallback(() => {
      //setHideTab('none');
      //setNewMessage('');
      return () => setHideTab('flex');
    }, [setHideTab])
  );


  const addMessage = async (content) => {
    const user_id = await AsyncStorage.getItem('userId')
    console.log("chatroom id" + chatRoomId);
    sendGroupMessage(content, chatRoomId.id, user_id)

    async function getMessages() {
      const messagesInChat = await getLastNMessageInformation(chatRoomId.id)
      // console.log(messagesInChat)
      addMessages(messagesInChat)
    }
    getMessages()
    setMessages((prevMessages) => [...prevMessages, newMessage]);
  };

  const handleScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y;

    // const threshold = 50;
    // if(currentY < threshold){
    //   loadMoreHistoryMessages();
    // }
    // up or down
    if (currentY <= 0) {
      // up
      console.log("User is at the top");
      setTop(true)
    } else if (currentY + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height) {
      // down
      console.log("User is at the buttom");
    }

    setScrollY(currentY);
  };

  useEffect(() => {
    const scrollToBottom = () => {
      flatListRef.current?.scrollToEnd({ animated: false });
    };

    // 加载消息后滚动到底部 
    const unsubscribeFocus = navigation.addListener('focus', scrollToBottom);

    // 键盘显示时滚动到底部 
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', scrollToBottom);

    // 返回时移除监听 
    return () => {
      unsubscribeFocus(); keyboardDidShowListener.remove();
    };
  }, [navigation]);

  // 发送消息时滚动到底部 
  useEffect(() => {
    if (messages.length > 0) {
      flatListRef.current?.scrollToEnd({ animated: true });
    }
  }, [messages]);


  // change the title of the chat room
  useEffect(() => {

    navigation.setOptions({ title: `${chatRoomId.name}` });

    async function getMessages() {
      const messagesInChat = await getLastNMessageInformation(chatRoomId.id)
      // console.log(messagesInChat)
      addMessages(messagesInChat);
    }
    getMessages()
  }, [chatRoomId]);

  // when user scroll from top to buttom refresh data
  const addMessages = (newMessages) => {
    setMessages((prevMessages) => [
      ...newMessages.map((message) => ({
        id: message.id,
        text: message.content,
        sender: message.user_id === 1 ? 'user' : 'other', // 判断是否是你发送的消息
      }))
    ]);
  };

  const sendMessage = () => {
    if (newMessage) {
      addMessage(newMessage);
      setNewMessage('');
    }
  };

  // when user scroll from buttom to top load more history message
  const loadMoreHistoryMessages = async () => {
    console.log("top:" + top)
    if (top) {
      if (!isLoadingHistory) {
        setIsLoadingHistory(true);
        try {
          console.log(messages[0].id)
          // const data = await getMoreMessageInformation(chatRoomId.id, messages[0].id);
          // addMessages(data);
        } catch (error) {
          console.error("Failed to load more messages:", error);
        } finally {
          setIsLoadingHistory(false);
        }
      }
    }

  };

  const onRefresh = async () => {
    setIsRefreshing(true);
    try {
      if (messages.length > 0) {
        console.log("top message id:" + messages[0].id)
        const data = await getLastNMessageInformation(chatRoomId.id, messages[0].id);
        console.log(data)
        addMessages(data);
      }
    } catch (error) {
      console.error("Failed to fetch user data:", error);
    } finally {
      setIsRefreshing(false);
    }
  };

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        keyboardVerticalOffset={Platform.OS === "ios" ? 85 : 0}
      >
        <View style={{ flex: 1, padding: 10 }}>
          <FlatList
            ref={flatListRef}
            data={messages}
            keyExtractor={(item) => item.id ? item.id.toString() : Math.random().toString()}
            refreshing={isRefreshing}
            onRefresh={onRefresh}
            onScroll={handleScroll}
            onEndReached={loadMoreHistoryMessages}
            onEndReachedThreshold={0.01}
            ListHeaderComponent={<View style={{ height: 20 }} />}
            renderItem={({ item }) => (
              <View>
                {item.sender !== 'user' && (
                  <Text style={{ fontSize: 12, color: 'gray' }}>
                    {item.sender_name}
                  </Text>
                )}
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
              </View>
            )}
          />
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            paddingBottom: 0
          }}>
            <TextInput
              style={{ flex: 1, borderWidth: 1, marginRight: 5, padding: 10, borderRadius: 10 }}
              value={newMessage}
              onChangeText={setNewMessage}
              multiline={true}
            />
            <Button title="Send" onPress={sendMessage} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  );
}
