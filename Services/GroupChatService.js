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