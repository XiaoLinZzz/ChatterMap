import AsyncStorage from '@react-native-async-storage/async-storage'

// src/services/LocationService.js
const API_URL = 'http://3.138.178.239:5000/users'

export async function updateLocation (userId, latitude, longitude) {
  try {
    const response = await fetch(`${API_URL}/${userId}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${AsyncStorage.getItem('userToken')}`
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

// export async function getFriendsLocations (userId) {
//   try {
//     const response = await fetch(`${API_URL}/${userId}/friends`)
//     if (!response.ok) {
//       throw new Error(`HTTP error! status: ${response.status}`)
//     }
//     return await response.json()
//   } catch (error) {
//     console.error('Error getting friends locations:', error)
//     throw error
//   }
// }

export async function getAllUsersLocations () {
  try {
    const response = await fetch(`${API_URL}`)
    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`)
    }
    return await response.json()
  } catch (error) {
    console.error('Error getting all users locations:', error)
    throw error
  }
}
