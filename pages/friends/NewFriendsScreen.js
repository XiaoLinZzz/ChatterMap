import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, TextInput, FlatList, StyleSheet, Alert } from 'react-native'
import FontAwesome from '@expo/vector-icons/FontAwesome'
import { getNewFriendsList, updateNewFriend, addNewFriend } from '../../Services/FriendService.js'
import { useHideTab } from '../../HideTabContext';
import { useFocusEffect } from '@react-navigation/native';


const NewFriendsScreen = () => {
    const [newFriend, setNewFriend] = useState('');
    const [invitations, setInvitations] = useState([]);
    const { hideTab, setHideTab } = useHideTab();
  
    useFocusEffect( 
      React.useCallback(() => { 
        return () => setHideTab('flex'); 
      }, []) 
    );
    
    useEffect(() => {
        const fetchInvitations = async () => {
            try {
                const data = await getNewFriendsList();
                const invitationData = data.pending_requests.map(request => ({
                    id: request.sender.id.toString(),
                    name: request.sender.name,
                    status: request.status,
                    request_id: request.id
                }));
                setInvitations(invitationData);
            } catch (error) {
                console.error("Error fetching invitation list:", error.message);
                Alert.alert("Error", "Unable to fetch invitations.");
            }
        }

        fetchInvitations();
    }, []);

    const addFriend = async () => {
        if (newFriend) {
            try {
                const data = await addNewFriend(newFriend);

                if (data) {
                    Alert.alert("Success", "Friend added successfully!");
                }
                setNewFriend('');
            } catch (error) {
                console.error("Error adding new friend:", error.message);
                Alert.alert("Error", "Friend's ID does not exist.");
            }
        }
    }

    const acceptInvitation = async (request_id) => {
        try {
            const response = await updateNewFriend(request_id, 'accepted');
            if (response) {
                setInvitations(invitations.map(invite => {
                    if (invite.request_id === request_id) {
                        return { ...invite, status: 'accepted' }
                    }
                    return invite;
                }));
            }
        } catch (error) {
            console.error("Error accepting invitation:", error.message);
            Alert.alert("Error", "Unable to accept the invitation.");
        }
    }

    const declineInvitation = async (request_id) => {
        try {
            const response = await updateNewFriend(request_id, 'declined');
            if (response) {
                setInvitations(invitations.map(invite => {
                    if (invite.request_id === request_id) {
                        return { ...invite, status: 'declined' }
                    }
                    return invite;
                }));
            }
        } catch (error) {
            console.error("Error declining invitation:", error.message);
            Alert.alert("Error", "Unable to decline the invitation.");
        }
    }

    return (
        <View style={styles.container}>
            <View style={styles.inputContainer}>
                <TextInput
                    style={styles.input}
                    onChangeText={setNewFriend}
                    value={newFriend}
                    placeholder="Enter friend's id"
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
                            {item.status === 'pending' && (
                                <>
                                    <TouchableOpacity style={styles.acceptButton} onPress={() => acceptInvitation(item.request_id)}>
                                        <Text style={styles.buttonText}>Accept</Text>
                                    </TouchableOpacity>
                                    <TouchableOpacity style={styles.declineButton} onPress={() => declineInvitation(item.request_id)}>
                                        <Text style={styles.buttonText}>Decline</Text>
                                    </TouchableOpacity>
                                </>
                            )}
                            {item.status === 'accepted' &&
                                <TouchableOpacity style={styles.acceptedButton}>
                                    <Text style={styles.buttonText}>Accepted</Text>
                                </TouchableOpacity>
                            }
                            {item.status === 'declined' &&
                                <TouchableOpacity style={styles.declinedButton}>
                                    <Text style={styles.buttonText}>Declined</Text>
                                </TouchableOpacity>
                            }
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
    acceptedButton: {
        padding: 5,
        backgroundColor: '#4CAF50',
        borderRadius: 5,
    },
    declinedButton: {
        padding: 5,
        backgroundColor: '#f44336',
        borderRadius: 5
    },
    buttonText: {
        color: 'white'
    }
})

export default NewFriendsScreen
