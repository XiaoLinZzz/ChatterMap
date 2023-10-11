import React, { useState } from 'react';
import { View, Text, StyleSheet, Switch } from 'react-native';
import { Vibration } from 'react-native';


export default function SettingScreen() {
  const [notificationEnabled, setNotificationEnabled] = useState(false);
  const [autoJoinEnabled, setAutoJoinEnabled] = useState(false);
  const [vibrationEnabled, setVibrationEnabled] = useState(false);


  const switchNotification = () => {
    setNotificationEnabled((previousState) => !previousState);
  };

  const switchAutoJoin = () => {
    setAutoJoinEnabled((previousState) => !previousState);
  };

  const switchVibration = () => {
    setVibrationEnabled((previousState) => !previousState);
    if (!vibrationEnabled) {
      Vibration.vibrate();
    } else {
      Vibration.cancel();
    }
  };


  return (
    <View style={styles.container}>
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Notifications</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FA8072' }}
          thumbColor={notificationEnabled ? '#FAFAFA' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switchNotification}
          value={notificationEnabled}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Auto Join Chatroom</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FA8072' }}
          thumbColor={autoJoinEnabled ? '#FAFAFA' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switchAutoJoin}
          value={autoJoinEnabled}
        />
      </View>
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Vibration</Text>
        <Switch
          trackColor={{ false: '#767577', true: '#FA8072' }}
          thumbColor={vibrationEnabled ? '#FAFAFA' : '#f4f3f4'}
          ios_backgroundColor="#3e3e3e"
          onValueChange={switchVibration}
          value={vibrationEnabled}
        />
      </View>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20,
  },
  label: {
    flex: 1,
    fontSize: 16,
  },
});
