import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, Image } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import * as Location from 'expo-location';
import MapScreenStyles from '../styles/MapScreenStyle.js'; // 导入样式文件

export default function MapScreen() {
  const [location, setLocation] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [showImage, setShowImage] = useState(false);

  useEffect(() => {
    (async () => {
      setIsLoading(true);

      const { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== 'granted') {
        console.error('Permission to access location was denied');
      } else {
        const currentLocation = await Location.getCurrentPositionAsync({});
        setLocation(currentLocation.coords);
      }

      setIsLoading(false);
    })();
  }, []);

  return (
    <View style={MapScreenStyles.screen}>
      {isLoading ? (
        <ActivityIndicator size="large" color="#0000ff" />
      ) : (
        <MapView
          style={MapScreenStyles.map}
          initialRegion={
            location
              ? {
                latitude: location.latitude,
                longitude: location.longitude,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
              : {
                latitude: -37.804467,
                longitude: 144.972284,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
              }
          } onPress={() => setShowImage(false)}
        >
          {location && (
            <Marker
              coordinate={{
                latitude: location.latitude,
                longitude: location.longitude,
              }}
              anchor={{ x: 0.5, y: 1 }}
              title="Here you are"
              onPress={() => setShowImage(true)}
            >
              {showImage && (
                <Image
                  source={require('../resource/profile1.png')}
                  style={{ width: 40, height: 40 }}
                />
              )}
            </Marker>
          )}
        </MapView>
      )}
    </View>
  );
}
