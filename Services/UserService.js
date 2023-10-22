import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_INFO = "http://3.138.178.239:5000/users/";

export async function getUserData() {
    const response = await fetch(`${USER_INFO}`, {
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
    console.log(data);
    return data;
}

export async function updatePassword(password) {
    const response = await fetch(`${USER_INFO}`, {
        method: 'PATCH',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`
        },
        body: JSON.stringify({
            password: password
        })
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    const data = await response.json();

    return data.id !== '0';
}
