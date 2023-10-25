import React, { useState } from 'react'
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'

const NewFriendsScreen = () => {
    const [newFriend, setNewFriend] = useState('')

    // Sample data for invitations
    const invitations = [
        { id: '4', name: 'David', status: 'Pending' },
        { id: '5', name: 'Eva', status: 'Pending' }
        // ... more invitations
    ];

    const addFriend = () => {
        if (newFriend) {
            // setFriends(prevFriends => [
            //   ...prevFriends,
            //   { id: (friends.length + 1).toString(), name: newFriend }
            // ])
            setNewFriend('')
        }
    }

    const acceptInvitation = (name) => {
        console.log(`Accepted invitation from ${name}`)
        // Handle the accept logic here
    }

    const declineInvitation = (name) => {
        console.log(`Declined invitation from ${name}`)
        // Handle the decline logic here
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNewFriend}
                    value={newFriend}
                    placeholder="Enter friend's name"
                />
                <TouchableOpacity style={styles.addButton} onPress={addFriend}>
                    <FontAwesome name="plus" size={20} color="white" />
                </TouchableOpacity>
            </View>
            <FlatList
                data={invitations}
                renderItem={({ item }) => (
                    <View style={styles.invitationContainer}>
                        <Text style={styles.invitationText}>{item.name}</Text>
                        <View style={styles.buttonsContainer}>
                            <TouchableOpacity style={styles.acceptButton} onPress={() => acceptInvitation(item.name)}>
                                <Text style={styles.buttonText}>Accept</Text>
                            </TouchableOpacity>
                            <TouchableOpacity style={styles.declineButton} onPress={() => declineInvitation(item.name)}>
                                <Text style={styles.buttonText}>Decline</Text>
                            </TouchableOpacity>
                        </View>
                    </View>
                )}
                keyExtractor={item => item.id}
            />
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        backgroundColor: '#f5f5f5'
    },
    inputContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 16
    },
    input: {
        flex: 1,
        height: 45,
        borderColor: '#ddd',
        borderWidth: 1,
        borderRadius: 12,
        paddingLeft: 15,
        backgroundColor: 'white',
        marginRight: 10
    },
    addButton: {
        padding: 12,
        backgroundColor: '#4CAF50',
        borderRadius: 8,
        alignItems: 'center',
        justifyContent: 'center'
    },
    invitationContainer: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
        padding: 10,
        backgroundColor: 'white',
        marginBottom: 10,
        borderRadius: 8,
        borderColor: '#ddd',
        borderWidth: 1
    },
    invitationText: {
        fontSize: 16
    },
    buttonsContainer: {
        flexDirection: 'row',
    },
    acceptButton: {
        padding: 5,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
        marginRight: 10
    },
    declineButton: {
        padding: 5,
        backgroundColor: '#f44336',
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
})

export default NewFriendsScreen
