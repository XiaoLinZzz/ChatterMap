import React, { useState, useEffect, useRef, useCallback } from 'react'
import { View, Animated, Easing, Image, Alert } from 'react-native'
import MapView, { Marker, Circle } from 'react-native-maps'
import * as Location from 'expo-location'
import * as Battery from 'expo-battery'
import MapScreenStyles from '../../styles/MapScreenStyle.js'
import BatteryIcon from './Components/BatteryIcon.js'
import ResetLocationButton from './Components/ResetLocationButton.js'
import { updateLocation, getFriendsLocation, checkUserChatroomStatus } from '../../Services/LocationService.js'
import AsyncStorage from '@react-native-async-storage/async-storage'
import * as Progress from 'react-native-progress'
import ChatRoom from './Components/ChatRoomLocation.js'
import CheckChatroomButton from './Components/CheckChatroomButton.js'
import InfoButton from './Components/InfoButton.js'
import InfoModal from './Components/InfoModal.js'

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
  const [progressValue, setProgressValue] = useState(0)
  const animatedProgress = useRef(new Animated.Value(0)).current
  const intervalRef = useRef(null)
  // const [chatRooms, setChatRooms] = useState([]) // This would be loaded similarly to friends locations
  const [selectedRoom, setSelectedRoom] = useState(null)
  const [currentChatroom, setCurrentChatroom] = useState(null)
  const [infoModalVisible, setInfoModalVisible] = useState(false)

  const chatRooms = [
    {
      id: 'room1',
      name: 'Eastern Resource Centre',
      latitude: -37.79935252464269,
      longitude: 144.96290471436666,
      description: '9 am - 5 pm',
      url: 'https://library.unimelb.edu.au/erc'
    },
    {
      id: 'room2',
      name: 'Baillieu Library',
      latitude: -37.79847444052613,
      longitude: 144.95943074538698,
      description: '9 am - 5 pm',
      url: 'https://library.unimelb.edu.au/baillieu'
    },
    {
      id: 'room3',
      name: 'Law Building',
      latitude: -37.80227690068929,
      longitude: 144.96012347411093,
      description: '9 am - 5 pm',
      url: 'https://law.unimelb.edu.au/law-library'
    }
  ]

  const AnimatedProgressBar = Animated.createAnimatedComponent(Progress.Bar)

  // const userId = 2
  const [allUsersLocations, setAllUsersLocations] = useState([])

  const onRoomMarkerPress = (roomData) => {
    setSelectedRoom(roomData)
  }

  const fetchAndSetUsersLocations = useCallback(async () => {
    try {
      const usersLocations = await getFriendsLocation()
      setAllUsersLocations(usersLocations)
      // console.log('All users locations:', usersLocations)
    } catch (error) {
      console.error('Error getting all users locations:', error)
    }
  }, [])

  const checkChatroom = async () => {
    try {
      const chatroomName = await checkUserChatroomStatus()

      if (chatroomName) {
        setCurrentChatroom(chatroomName)
        Alert.alert('Your Status', `You are currently in ${chatroomName}`)
      } else {
        Alert.alert('Your Status', 'You are not in any chatroom')
      }
    } catch (error) {
      console.error('Error checking chatroom status:', error)
    }
  }

  useEffect(() => {
    (async () => {
      setIsLoading(true)

      const level = await Battery.getBatteryLevelAsync()
      const convertedLevel = level * 100
      setBatteryLevel(convertedLevel)

      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permission to access location was denied')
        setIsLoading(false)
        return
      }

      const currentLocation = await Location.getCurrentPositionAsync({})
      setLocation(currentLocation.coords)
      setInitialCoords(currentLocation.coords)

      try {
        // console.log('batteryLevel', convertedLevel)
        await updateLocation(currentLocation.coords.latitude, currentLocation.coords.longitude, convertedLevel)
      } catch (error) {
        console.error('Error updating location:', error)
      }

      const storedUserId = await AsyncStorage.getItem('userId')
      // console.log('Stored User ID:', storedUserId)
      setUserId(Number(storedUserId))

      await fetchAndSetUsersLocations()

      setIsLoading(false)
    })()
  }, [fetchAndSetUsersLocations])

  useEffect(() => {
    const updateUserLocations = async () => {
      try {
        const usersLocations = await getFriendsLocation()
        setAllUsersLocations(usersLocations)
      } catch (error) {
        console.error('Error getting all users locations:', error)
      }
    }

    // Call once when the component mounts
    updateUserLocations()
    console.log('Updating user locations')

    // Set up the interval
    const locationUpdateInterval = setInterval(updateUserLocations, 10000)

    return () => clearInterval(locationUpdateInterval)
  }, [])

  useEffect(() => {
    Animated.timing(animatedProgress, {
      toValue: progressValue,
      duration: 1000,
      easing: Easing.inOut(Easing.quad),
      useNativeDriver: false
    }).start()
  }, [progressValue])

  useEffect(() => {
    intervalRef.current = setInterval(() => {
      setProgressValue((prevProgress) => {
        if (prevProgress < 1) {
          return prevProgress + 0.1
        }
        clearInterval(intervalRef.current)
        return 1
      })
    }, 1000)

    return () => clearInterval(intervalRef.current)
  }, [])

  return (
    <View style={MapScreenStyles.screen}>
      {isLoading
        ? (
          <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
            <AnimatedProgressBar
              progress={animatedProgress}
              width={200}
              color="#0000ff"
            />
          </View>
          )
        : (
          <>
            <MapView
              ref={mapViewRef}
              style={MapScreenStyles.map}
              onMapReady={() => {
                setProgressValue(1)
                clearInterval(intervalRef.current)
              }}
              initialRegion={
                location
                  ? {
                      latitude: location.latitude,
                      longitude: location.longitude,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.005
                    }
                  : {
                      latitude: -37.804467,
                      longitude: 144.972284,
                      latitudeDelta: 0.01,
                      longitudeDelta: 0.005
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
                // console.log('Current user location:', location),
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
                      source={require('../../resource/profile1.png')}
                      style={{ width: 20, height: 20, marginTop: 10 }}
                    />
                  </View>
                  <BatteryIcon level={batteryLevel} />
                </Marker>
              )}

              {allUsersLocations.map(user => {
                return (user.id !== userId && user.last_latitude && user.last_longitude)
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
                          source={require('../../resource/profile1.png')}
                          style={{
                            width: 20,
                            height: 20,
                            marginTop: 10
                          }}
                        />
                      </View>
                      <BatteryIcon level={user.battery_level} />
                    </Marker>
                    )
                  : null
              })}

              {chatRooms.map(room => (
                <Marker
                  key={room.id}
                  coordinate={{
                    latitude: room.latitude,
                    longitude: room.longitude
                  }}
                  title={room.name}
                  // Change this from onCalloutPress to onPress
                  onPress={() => onRoomMarkerPress(room)}
                />
              ))}

              {selectedRoom && (
                <Circle
                  center={{
                    latitude: selectedRoom.latitude,
                    longitude: selectedRoom.longitude
                  }}
                  radius={150} // Adjust the radius as needed
                  fillColor="rgba(100, 100, 200, 0.3)" // Adjust the color and opacity as needed
                  strokeColor="rgba(100, 100, 200, 0.5)" // Adjust the border color and opacity as needed
                />
              )}

            </MapView>
            {showButton && (
              <ResetLocationButton
                onPress={() => {
                  setResetting(true)
                  mapViewRef.current.animateToRegion({
                    latitude: initialCoords.latitude,
                    longitude: initialCoords.longitude,
                    latitudeDelta: 0.01,
                    longitudeDelta: 0.005
                  })
                  setShowButton(false)
                }}
              />
            )}

            {!isLoading && (
              <CheckChatroomButton onPress={checkChatroom} />
            )}

            <InfoButton onPress={() => setInfoModalVisible(true)} />
            <InfoModal
              isVisible={infoModalVisible}
              onClose={() => setInfoModalVisible(false)}
            />

            <ChatRoom
              isVisible={!!selectedRoom}
              onClose={() => setSelectedRoom(null)}
              roomData={selectedRoom}
            />
          </>
          )}
    </View>
  )
}
