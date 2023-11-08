import AsyncStorage from '@react-native-async-storage/async-storage'

// src/services/LocationService.js
const API_URL = 'http://18.222.120.14:5000/users/'
const ALL_USERS_API_URL = 'http://18.222.120.14:5000/all-users/'
const FRIENDS_API = 'http://18.222.120.14:5000/friends'
const CHATROOM_API = 'http://18.222.120.14:5000/users/update-chatrooms'

export async function updateLocation (latitude, longitude, batteryLevel) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`
      },
      body: JSON.stringify({
        last_latitude: latitude,
        last_longitude: longitude,
        battery_level: batteryLevel
      })
    })
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response
  } catch (error) {
    console.error('Error updating location:', error)
    throw error
  }
}

export async function getAllUsersLocations () {
  try {
    const response = await fetch(`${ALL_USERS_API_URL}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error getting all users locations:', error)
    throw error
  }
}

export async function getFriendsLocation () {
  try {
    const token = await AsyncStorage.getItem('userToken')
    const userId = await AsyncStorage.getItem('userId') // Assuming you store the userId in AsyncStorage

    if (!token) {
      throw new Error('No token found')
    }

    if (!userId) {
      throw new Error('User ID not found')
    }

    const response = await fetch(`${FRIENDS_API}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    if (data && data.friends) {
      // Use data.friends which is the array you need to filter and map
      return data.friends
        .filter(friend => friend.last_latitude != null && friend.last_longitude != null)
        .map(friend => ({
          id: friend.id,
          name: friend.name,
          last_latitude: friend.last_latitude,
          last_longitude: friend.last_longitude,
          battery_level: friend.battery_level
        }))
    }

    return [] // Return an empty array if no friends or invalid data
  } catch (error) {
    console.error('Error getting friends locations:', error)
    throw error
  }
}

export async function checkInChatroom () {
  try {
    const userToken = await AsyncStorage.getItem('userToken')
    const response = await fetch(`${CHATROOM_API}`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${userToken}`
      }
    })

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }

    const data = await response.json()
    return getChatroomNameFromResponse(data)
  } catch (error) {
    console.error('Error checking chatroom:', error)
    throw error
  }
}

function getChatroomNameFromResponse (response) {
  if (Array.isArray(response) && response.length > 0) {
    const name = response[0].name
    if (name) {
      return name
    }
  }
  return null
}

export async function checkUserChatroomStatus () {
  try {
    const chatroomName = await checkInChatroom()
    return chatroomName
  } catch (error) {
    console.error('An error occurred:', error)
  }
}
