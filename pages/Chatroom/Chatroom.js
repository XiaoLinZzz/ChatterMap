import { useNavigation, useFocusEffect } from '@react-navigation/native'
import React, { useEffect, useState } from 'react'
import { Button, FlatList, Text, TextInput, View, KeyboardAvoidingView, Platform, SafeAreaView, Keyboard } from 'react-native'
import { sendGroupMessage, getLastNMessageInformation } from '../../Services/GroupChatService'
import AsyncStorage from '@react-native-async-storage/async-storage'
import { useHideTab } from '../../HideTabContext'
import roomSocket from '../../socket'
import { Vibration } from 'react-native'
import { useVibration } from '../../VibrationContext'

export function ChatRoomScreen({ route }) {
  const navigation = useNavigation()
  const { chatRoomId } = route.params

  const [messages, setMessages] = useState([])
  const [newMessage, setNewMessage] = useState('')
  const [isRefreshing, setIsRefreshing] = useState(false)
  const [isLoadingHistory, setIsLoadingHistory] = useState(false)
  const [scrollY, setScrollY] = useState(0)
  const [top, setTop] = useState(true)
  const [bottom, setBottom] = useState(true)

  const { hideTab, setHideTab } = useHideTab()

  const flatListRef = React.useRef(null)

  const { vibrationEnabled } = useVibration();//vibrationEnabled从Setting传进来，vibrationEnabled == true 或 false，
                                              //如果Setting选择震动，就是vibrationEnabled == true，你改一下你下面的逻辑就行
                                              //你之前那个都不好判断是不是传进来了，我这个好判断，而且在所有页面中都生效



  console.log("c :" + vibrationEnabled)

  useEffect(async () => {
    const userId = await AsyncStorage.getItem('userId')

    const storedValue = await getVibrationSwitchGlobal();
    const flag = JSON.parse(storedValue);
    console.log("这个是看有没有开震动：" + flag);
    console.log(typeof flag)
    // console.log(parseInt(userId))
    const newMessageArrived = (data) => {
      // console.log("previous data: " + messages[0].text)
      console.log('data')
      // console.log(data)
      arrivedMessage = data.message
      // console.log(arrivedMessage)
      const othermessage = arrivedMessage.user.id === parseInt(userId)
      console.log("这个是判断是不是你发的：" + othermessage)
      console.log(typeof othermessage)
      if (othermessage === false) {
        if (flag === true && vibrationEnabled == true) {
          Vibration.vibrate()
        }
      }
      setMessages((prevMessages) => [...prevMessages, {
        id: arrivedMessage.id,
        text: arrivedMessage.content,
        sender: arrivedMessage.user.id === parseInt(userId) ? 'user' : 'other',
        sender_name: arrivedMessage.user.name
      }])
    }
    roomSocket.on('new_message', newMessageArrived)
    return () => {
      roomSocket.off('new_message')
    }
  }, [])

  useFocusEffect(
    React.useCallback(() => {
      return () => setHideTab('flex')
    }, [])
  )

  const addMessage = async (content) => {
    const user_id = await AsyncStorage.getItem('userId')
    console.log('chatroom id' + chatRoomId)
    sendGroupMessage(content, chatRoomId.id, user_id)

    async function getMessages() {
      const messagesInChat = await getLastNMessageInformation(chatRoomId.id)
      // console.log(messagesInChat)
      addMessages(messagesInChat)
    }
    getMessages()
    setMessages((prevMessages) => [...prevMessages, newMessage])
  }

  const handleScroll = (event) => {
    const currentY = event.nativeEvent.contentOffset.y

    // up or down
    if (currentY <= 0) {
      // up
      console.log('User is at the top')
      setTop(true)
    } else if (currentY + event.nativeEvent.layoutMeasurement.height >= event.nativeEvent.contentSize.height) {
      // down
      console.log('User is at the buttom')
    }

    setScrollY(currentY)
  }

  useEffect(() => {
    const scrollToBottom = () => {
      // Using a setTimeout to allow the FlatList to update before scrolling
      setTimeout(() => {
        flatListRef.current?.scrollToEnd({ animated: true });
      }, 10); // A slight delay to ensure the list is updated
    }

    // 加载消息后滚动到底部
    const unsubscribeFocus = navigation.addListener('focus', scrollToBottom)

    // 键盘显示时滚动到底部
    const keyboardDidShowListener = Keyboard.addListener('keyboardDidShow', scrollToBottom)

    // 返回时移除监听
    return () => {
      unsubscribeFocus(); keyboardDidShowListener.remove()
    }
  }, [navigation])

  // 发送消息时滚动到底部
  useEffect(() => {
    if (messages.length > 0) {

      const timer = setTimeout(() => {

        flatListRef.current?.scrollToEnd({ animated: true });
      }, 800);

      return () => clearTimeout(timer);
    }
  }, [messages]);


  // useEffect(() => {
  //   if (messages.length > 0) {
  //     flatListRef.current?.scrollToEnd({ animated: true })
  //   }
  // }, [messages])

  // change the title of the chat room
  useEffect(() => {
    navigation.setOptions({ title: `${chatRoomId.name}` })
    async function getMessages() {
      const messagesInChat = await getLastNMessageInformation(chatRoomId.id)
      // console.log(messagesInChat)
      addMessages(messagesInChat)
    }
    getMessages()
  }, [chatRoomId])


  // when user scroll from top to buttom refresh data
  const addMessages = async (newMessages) => {
    const userId = await AsyncStorage.getItem('userId')
    console.log(parseInt(userId))
    setMessages((prevMessages) => [
      ...newMessages.map((message) => ({
        id: message.id,
        text: message.content,
        sender: message.user.id === parseInt(userId) ? 'user' : 'other', // 判断是否是你发送的消息
        sender_name: message.user.name
      }))
    ])
  }

  const sendMessage = () => {
    if (newMessage) {
      addMessage(newMessage)
      setNewMessage('')
    }
  }

  // when user scroll from buttom to top load more history message
  const loadMoreHistoryMessages = async () => {
    console.log('top:' + top)
    if (top) {
      if (!isLoadingHistory) {
        setIsLoadingHistory(true)
        try {
          console.log(messages[0])
          // const data = await getMoreMessageInformation(chatRoomId.id, messages[0].id);
          // addMessages(data);
        } catch (error) {
          console.error('Failed to load more messages:', error)
        } finally {
          setIsLoadingHistory(false)
        }
      }
    }
  }

  const onRefresh = async () => {
    setIsRefreshing(true)
    try {
      if (messages.length > 0) {
        console.log('top message id:' + messages[0])
        // 这里要改
        console.log('这里有问题')
        const data = await getLastNMessageInformation(chatRoomId.id, messages[0].id)
        console.log(data)
        addMessages(data)
      }
    } catch (error) {
      console.error('Failed to fetch user data:', error)
    } finally {
      setIsRefreshing(false)
    }
  }

  return (
    <SafeAreaView style={{ flex: 1 }}>
      <KeyboardAvoidingView
        style={{ flex: 1 }}
        behavior={Platform.OS === 'ios' ? 'padding' : 'none'}
        keyboardVerticalOffset={Platform.OS === 'ios' ? 85 : 0}

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
            ListHeaderComponent={<View style={{ height: 20 }} />} // 用于放置发送者名字的空白视图
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
                    padding: 10
                  }}
                >
                  <Text style={{ color: item.sender === 'user' ? 'white' : 'black' }}>
                    {item.text}
                  </Text>
                </View>
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
            <Button title="Send" onPress={sendMessage} />
          </View>
        </View>
      </KeyboardAvoidingView>
    </SafeAreaView>
  )
}
