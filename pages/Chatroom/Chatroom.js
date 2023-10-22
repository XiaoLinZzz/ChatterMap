import React from 'react';
import { View, Text } from 'react-native';
import { useRoute } from '@react-navigation/native';

export default function Chatroom() {
  const route = useRoute();
  const groupChat = route.params.groupChat;

  return (
    <View>
      <Text>Chat Room: {groupChat.name}</Text>
      {/* 在这里显示聊天室的内容 */}
    </View>
  );
}
