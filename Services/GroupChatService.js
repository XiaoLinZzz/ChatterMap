import AsyncStorage from '@react-native-async-storage/async-storage'

let CHATROOMS_URL = "http://18.222.120.14:5000/users/update-chatrooms";
let BASIC_URL = "http://18.222.120.14:5000/groupchats";

export async function getGroupChatInformation(groupId) {
    const response = await fetch(`${CHATROOMS_URL}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(typeof data)
    // console.log(data);
    return data;
}

/**
 * 
 * @param {*} groupchatId the id of groupchat you want to get
 * @param {*} startIndex the start id you want to trace back
 * @param {*} n the number of history message you want to show
 * @returns a list of messages, message format :{"content": "?", "group_chat_id": ?, "id": ?, "timestamp": "?", "user_id": ?}
 */
export async function getLastNMessageInformation(groupchatId) {
    const response = await fetch(`${BASIC_URL + "/" + groupchatId + "/recent-messages"}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`
        },
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    // console.log(typeof data)
    // console.log(data);
    return data
}

export async function sendGroupMessage(content, group_id, user_id) {
    const message = {
        content,
        user_id
    }
    const response = await fetch(`${BASIC_URL + "/" + group_id + "/" + "messages"}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`,
        },
        body: JSON.stringify(message)
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data);
    return data;
}