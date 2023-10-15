import AsyncStorage from '@react-native-async-storage/async-storage'

// src/services/LocationService.js
const API_URL = 'http://3.138.178.239:5000/users/'
const ALL_USERS_API_URL = 'http://3.138.178.239:5000/all-users/'

export async function updateLocation (latitude, longitude) {
  try {
    const response = await fetch(`${API_URL}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${await AsyncStorage.getItem('userToken')}`
      },
      body: JSON.stringify({
        last_latitude: latitude,
        last_longitude: longitude
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
