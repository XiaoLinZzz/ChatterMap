import AsyncStorage from '@react-native-async-storage/async-storage'

const BASIC_URL = "http://18.222.120.14:5000/friend_requests";

export async function addNewFriend(receiver) {
    const response = await fetch(`${BASIC_URL}`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`
        },
        body: JSON.stringify({
            receiver_id: receiver
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();
    console.log(data)
    return data;
}


export async function updateNewFriend(receiver, status) {
    const response = await fetch(`${BASIC_URL}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`
        },
        body: JSON.stringify({
            request_id: receiver,
            status: status
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data;
}

export async function getNewFriendsList() {
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

    return data;
}