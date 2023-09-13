import React, { useState, useEffect } from 'react'
import { View, StyleSheet, ActivityIndicator } from 'react-native'
import MapView, { Marker } from 'react-native-maps'
import * as Location from 'expo-location'

export default function MapScreen () {
  const [location, setLocation] = useState(null)
  const [isLoading, setIsLoading] = useState(true)

  useEffect(() => {
    (async () => {
      setIsLoading(true)

      const { status } = await Location.requestForegroundPermissionsAsync()
      if (status !== 'granted') {
        console.error('Permission to access location was denied')
      } else {
        const currentLocation = await Location.getCurrentPositionAsync({})
        setLocation(currentLocation.coords)
      }

      setIsLoading(false)
    })()
  }, [])

  return (
    <View style={styles.screen}>
      {isLoading
        ? (
        <ActivityIndicator size="large" color="#0000ff" />
          )
        : (
        <MapView
          style={styles.map}
          initialRegion={
            location
              ? {
                  latitude: location.latitude,
                  longitude: location.longitude,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }
              : {
                  latitude: -37.804467,
                  longitude: 144.972284,
                  latitudeDelta: 0.0922,
                  longitudeDelta: 0.0421
                }
          }
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude
              }}
              anchor={{ x: 0.5, y: 1 }}
              title="Your Location"
            >
              <View style={styles.markerContainer}>
                <View style={styles.markerBubble}></View>
              </View>
            </Marker>
          )}
        </MapView>
          )}
    </View>
  )
}

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  markerContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start'
  },
  markerBubble: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  markerTip: {
    width: 10,
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'red',
    transform: [{ rotate: '45deg' }],
    marginBottom: -5 // Adjust this value to control the position of the tip
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10
  }
})
