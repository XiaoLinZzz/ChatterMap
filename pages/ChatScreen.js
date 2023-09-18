import React from 'react'
import { ScrollView, StyleSheet, SafeAreaView } from 'react-native'
import { List, Text } from 'react-native-paper'

const groupChats = [
  {
    id: 1,
    name: 'Mobile App Development',
    lastMessage: 'See you!',
    lastMessageTime: '10:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 2,
    name: 'Data Structure',
    lastMessage: 'I am going to be late.',
    lastMessageTime: '9:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 3,
    name: 'Algorithm',
    lastMessage: 'Ok',
    lastMessageTime: '9:23',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 4,
    name: 'Computer Network',
    lastMessage: 'See you!',
    lastMessageTime: '10:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 5,
    name: 'Operating System',
    lastMessage: 'I am going to be late.',
    lastMessageTime: '9:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 6,
    name: 'Database',
    lastMessage: 'Ok',
    lastMessageTime: '9:23',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 7,
    name: 'Software Engineering',
    lastMessage: 'See you!',
    lastMessageTime: '10:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 8,
    name: 'Computer Graphics',
    lastMessage: 'I am going to be late.',
    lastMessageTime: '9:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 9,
    name: 'Artificial Intelligence',
    lastMessage: 'Ok',
    lastMessageTime: '9:23',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 10,
    name: 'Computer Architecture',
    lastMessage: 'See you!',
    lastMessageTime: '10:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 11,
    name: 'Computer Organization',
    lastMessage: 'I am going to be late.',
    lastMessageTime: '9:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 12,
    name: 'Computer Security',
    lastMessage: 'Ok',
    lastMessageTime: '9:23',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 13,
    name: 'Computer Vision',
    lastMessage: 'See you!',
    lastMessageTime: '10:30',
    avatar: require('../resource/group-chat.png')
  },
  {
    id: 14,
    name: 'Computer Animation',
    lastMessage: 'I am going to be late.',
    lastMessageTime: '9:30',
    avatar: require('../resource/group-chat.png')
  }
]

export default function ChatScreen () {
  return (
    <SafeAreaView style={styles.screen}>
      <ScrollView>
        <Text variant="displayMedium">Chats</Text>
        <List.Section>
          {groupChats.map((groupChat) => (
            <List.Item
              key={groupChat.id}
              title={groupChat.name}
              description={groupChat.lastMessage}
              left={() => <List.Icon icon={groupChat.avatar} />}
              right={() => <Text>{groupChat.lastMessageTime}</Text>}
            />
          ))}
        </List.Section>
      </ScrollView>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    // justifyContent: 'center',
    // alignItems: 'center'
    marginHorizontal: 20
  }
})
