import AsyncStorage from '@react-native-async-storage/async-storage'

const USER_INFO = "http://18.222.120.14:5000/users/";
const USER_GET_AVATAR = "http://18.222.120.14:5000/profile-picture/"
const USER_UPDATE_AVATAR = "http://18.222.120.14:5000/update-profile-picture";

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

export async function getAvatar(id) {
    const response = await fetch(`${USER_GET_AVATAR + "/" + id}`, {
        method: 'GET',
        headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`
        },
    });

    if (!response.ok) {
        return response;
    }

    const data = await response.json();

    return data;
}

export async function updateAvatar(fileUri) {
    let formData = new FormData();
    let uriParts = fileUri.split('.');
    let fileType = uriParts[uriParts.length - 1];

    formData.append('file', {
        uri: fileUri,
        name: `avatar.${fileType}`, // "avatar" is an example, name it according to your needs
        type: `image/${fileType}`,
    });

    const response = await fetch(`${USER_UPDATE_AVATAR}`, {
        method: 'POST',
        headers: {
            Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`,
            // 'Content-Type': 'multipart/form-data' should be set automatically
        },
        body: formData
    });

    if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
    }

    return await response.json();
}
