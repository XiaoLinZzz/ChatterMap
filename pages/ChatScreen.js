import React, { useState } from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { SafeAreaView,useSafeAreaInsets } from 'react-native-safe-area-context';
import Slider from '@react-native-community/slider';
import { useNavigation } from '@react-navigation/native'


export default function GroupChatListScreen() {

  const navigation = useNavigation();
  const [topPadding, setTopPadding] = useState(0);
  const [groupChats, setGroupChats] = useState([
    { id: '1', name: 'Family Chat', members: ['Alice', 'Bob', 'Charlie'] },
    { id: '2', name: 'Friends Chat', members: ['David', 'Eve', 'Frank'] },
    { id: '3', name: 'Work Chat', members: ['Grace', 'Hank', 'Ivy'] },
    // Add more group chats here
  ]);

  const renderGroupChatItem = ({ item }) => (
    <TouchableOpacity
      style={styles.groupChatItem}
      onPress={() => handleGroupChatPress(item)}
    >
      <Text style={styles.groupChatName}>{item.name}</Text>
      <Text style={styles.groupChatMembers}>
        {item.members.join(', ')}
      </Text>
    </TouchableOpacity>
  );

  const handleGroupChatPress = (groupChat) => {
    // Handle group chat item press, e.g., navigate to the chat screen
    console.log(`Pressed group chat: ${groupChat.name}`);
    // navigation.navigate('GroupChat', { groupChat });
  };


  return (
  <SafeAreaView style={{ flex: 1, paddingTop: topPadding }}>
    <View style={styles.header}>
      <Text style={styles.headerTitle}>Group Chats</Text>
    </View>
    <FlatList
      data={groupChats}
      keyExtractor={(item) => item.id}
      renderItem={renderGroupChatItem}
    />
  </SafeAreaView>
);

}

const styles = StyleSheet.create({
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
  header: {
    flexDirection: 'row',
    backgroundColor: 'tomato',
    padding: 5,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'white',
    flex: 1,
  },
});
