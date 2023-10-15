import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, ActivityIndicator, Image } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Battery from 'expo-battery'
import MapScreenStyles from '../styles/MapScreenStyle.js'
import BatteryIcon from './Components/BatteryIcon.js'
import ResetLocationButton from './Components/ResetLocationButton.js'
import AddFriendButton from './Components/AddFriendButton.js'
import AddFriendModal from './Components/AddFriendModal.js'
import { updateLocation, getAllUsersLocations } from '../Services/LocationService.js'
import AsyncStorage from '@react-native-async-storage/async-storage'

export default function MapScreen () {
  const [location, setLocation] = useState(null)
  const [initialCoords, setInitialCoords] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [batteryLevel, setBatteryLevel] = useState(null)
  const [showButton, setShowButton] = useState(false)
  const mapViewRef = useRef(null)
  const [resetting, setResetting] = useState(false)
  const [firstLoad, setFirstLoad] = useState(true)
  const [modalVisible, setModalVisible] = useState(false)
  const [userId, setUserId] = useState(null)

  // const userId = 2 // Assume this is the logged-in user's ID
  const [allUsersLocations, setAllUsersLocations] = useState([])

  const fetchAndSetUsersLocations = useCallback(async () => {
    try {
      const usersLocations = await getAllUsersLocations()
      setAllUsersLocations(usersLocations)
      // console.log('All users locations:', usersLocations)
    } catch (error) {
      console.error('Error getting all users locations:', error)
    }
  }, [])

  useEffect(() => {
    (async () => {
      setIsLoading(true)

      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permission to access location was denied')
      } else {
        const currentLocation = await Location.getCurrentPositionAsync({})
        setLocation(currentLocation.coords)
        setInitialCoords(currentLocation.coords)
        // Update location once on component mount
        try {
          await updateLocation(currentLocation.coords.latitude, currentLocation.coords.longitude)
        } catch (error) {
          console.error('Error updating location:', error)
        }
      }

      const storedUserId = await AsyncStorage.getItem('userId')
      setUserId(storedUserId)

      const level = await Battery.getBatteryLevelAsync()
      setBatteryLevel(level)

      await fetchAndSetUsersLocations()

      setIsLoading(false)

      // Periodically fetch all users' locations
      const intervalId = setInterval(fetchAndSetUsersLocations, 10000) // Fetch every 10 seconds

      return () => clearInterval(intervalId) // Cleanup interval on component unmount
    })()
  }, [fetchAndSetUsersLocations])

  return (
    <View style={MapScreenStyles.screen}>
      {isLoading
        ? (
          <ActivityIndicator size="large" color="#0000ff" />
          )
        : (
          <>
            <MapView
              ref={mapViewRef}
              style={MapScreenStyles.map}
              initialRegion={
                location
                  ? {
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.025
                    }
                  : {
                      latitude: -37.804467,
                      longitude: 144.972284,
                      latitudeDelta: 0.05,
                      longitudeDelta: 0.025
                    }
              }
              onRegionChange={() => {
                if (firstLoad) {
                  setFirstLoad(false)
                  return
                }
                if (!resetting) {
                  setShowButton(true)
                }
              }}

              onRegionChangeComplete={() => {
                if (resetting) {
                  setResetting(false)
                }
              }}
            >
              {location && (
                <Marker
                  coordinate={{
                    latitude: location.latitude,
                    longitude: location.longitude
                  }}
                  anchor={{ x: 0.5, y: 0.5 }}
                  title="Here you are"
                >
                  <View style={{ alignItems: 'center' }}>
                    <Image
                      source={require('../resource/profile1.png')}
                      style={{ width: 20, height: 20, marginTop: 10 }}
                    />
                  </View>
                  <BatteryIcon level={batteryLevel} />
                </Marker>
              )}

              {allUsersLocations.map(user => (
                (user.id !== userId && user.last_latitude && user.last_longitude)
                  ? (
                  <Marker
                    key={user.id}
                    coordinate={{
                      latitude: user.last_latitude,
                      longitude: user.last_longitude
                    }}
                    title={user.name || 'No name provided'}
                  >
                    <View style={{ alignItems: 'center' }}>
                      <Image
                        source={require('../resource/profile1.png')}
                        style={{ width: 20, height: 20, marginTop: 10 }}
                      />
                    </View>
                  </Marker>
                    )
                  : null
              ))}
            </MapView>
            {showButton && (
              <ResetLocationButton
                onPress={() => {
                  setResetting(true)
                  mapViewRef.current.animateToRegion({
                    latitude: initialCoords.latitude,
                    longitude: initialCoords.longitude,
                    latitudeDelta: 0.05,
                    longitudeDelta: 0.025
                  })
                  setShowButton(false)
                }}
              />
            )}

            {/* AddFriendButton Component */}
            <AddFriendButton onPress={() => setModalVisible(true)} />

            {/* AddFriendModal Component */}
            <AddFriendModal
              isVisible={modalVisible}
              onClose={() => setModalVisible(false)}
            />
          </>
          )}
    </View>
  )
}
