import AsyncStorage from '@react-native-async-storage/async-storage'

let BASIC_URL = "http://3.138.178.239:5000/groupchats";

export async function getGroupChatInformation(groupId) {
    const response = await fetch(`${BASIC_URL}`, {
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
export async function getLastNMessageInformation(groupchatId, startIndex = null, n = 30) {
    const response = await fetch(`${BASIC_URL + "/" + groupchatId}`, {
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
    // console.log(data.messages);
    if (startIndex === null) {
        if (n >= data.messages.length) {
            return data.messages;
        }
        return data.messages.slice(-n);
    }
    else {
        if (startIndex - n <= 0) {
            // console.log("return :" + data.messages.slice(0, startIndex))
            return data.messages.slice(0, startIndex);
        } else {
            return data.messages.slice(startIndex - n, startIndex)
        }
    }

}