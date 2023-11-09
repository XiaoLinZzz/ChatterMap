import React, { useContext, useEffect, useState } from 'react';
import { Alert, Button, Image, Modal, StyleSheet, Switch, Text, TextInput, TouchableOpacity, Vibration, View } from 'react-native';
import { getAutoJoinChatroomSwitchGlobal, getVibrationSwitchGlobal, setAutoJoinChatroomSwitchGlobal, setVibrationSwitchGlobal } from '../../GlobalVar';
import { updatePassword } from '../../Services/UserService.js';
import { UserContext } from '../UserContext';
import { useHideTab } from '../../HideTabContext';
import { useFocusEffect } from '@react-navigation/native';
import { useVibration } from '../../VibrationContext';




export default function SettingScreen() {
  const [notificationEnabled, setNotificationEnabled] = useState(false)
  const [autoJoinEnabled, setAutoJoinEnabled] = useState(false)
  //const [vibrationEnabled, setVibrationEnabled] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');
  const { logoutUser } = useContext(UserContext);
  const { hideTab, setHideTab } = useHideTab();
  const { vibrationEnabled, switchVibration } = useVibration();
  

  useFocusEffect(
    React.useCallback(() => {
      return () => setHideTab('flex');
    }, [])
  );

  useEffect(() => {
    const fetchAndSetVibrationState = async () => {
      const storedValue = await getVibrationSwitchGlobal();
      const flag = JSON.parse(storedValue);
      setVibrationEnabled(flag);
    };
    const fetchAndSetAutoJoinState = async () => {
      const storedValue = await getAutoJoinChatroomSwitchGlobal();
      const flag = JSON.parse(storedValue);
      setAutoJoinEnabled(flag);
    };

    fetchAndSetVibrationState();
    fetchAndSetAutoJoinState();
  }, []);

  const switchNotification = () => {
    setNotificationEnabled((previousState) => !previousState)
  }

  const switchAutoJoin = async () => {
    setAutoJoinEnabled(prevState => {
      const newState = !prevState;
      setAutoJoinChatroomSwitchGlobal(newState);
      // console.log(newState)
      return newState;
    });
  }

  // const switchVibration = async () => {
  //   setVibrationEnabled(prevState => {
  //     const newState = !prevState;
  //     if (newState) {
  //       Vibration.vibrate();
  //     } else {
  //       Vibration.cancel();
  //     }
  //     setVibrationSwitchGlobal(newState);
  //     console.log("s  " + newState)
  //     return newState;
  //   });
  // }

  const handleChangePassword = async () => {
    if (newPassword === '') {
      alert("Password hasn't changed.")

    }

    const isValidPassword = (newPassword) => {
      const hasNumber = /\d/.test(newPassword)
      const hasLetter = /[a-zA-Z]/.test(newPassword)
      return newPassword.length >= 6 && hasNumber && hasLetter
    }
    // send request
    //const data = await updatePassword(newPassword);

    if (isValidPassword(newPassword)) {

      alert('Password changed.')
      console.log('Password changed.')
      await updatePassword(newPassword);
      hideModal();
    } else {
      alert('Password hasn\'t changed. It has some errors.')
      console.log('Password hasn\'t changed. It has some errors.')


    }

  }

  const toggleModal = () => {
    setIsModalVisible(!isModalVisible)
  }

  const hideModal = () => {
    setIsModalVisible(false)
  }

  const logout = () => {
    Alert.alert(
      'Logout',
      'Are you sure you want to log out now?',
      [
        {
          text: 'Not now',
          style: 'cancel',
        },
        {
          text: 'OK',
          onPress: () => {
            console.log('go to login');
            logoutUser();
          }
        }
      ],
      { cancelable: false }
    );
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
      <View style={styles.separator} />
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
      <View style={styles.settingContainer}>
        <Text style={styles.label}>Change Password</Text>
        <Button
          title="Edit"
          onPress={toggleModal}
          color="#FA8072"
        />
      </View>
      <View style={styles.imagecontainer}>
        <TouchableOpacity onPress={logout}>
          <Image source={require('../../resource/logout.png')} style={styles.avatar} />
          <Text style={styles.logoutLabel}>    Logout</Text>
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="fade"
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Enter New Password</Text>
            <TextInput
              style={[styles.input, {
                backgroundColor: 'rgba(211, 211, 211, 0.5)',
                color: 'black',
                padding: 3,
                borderRadius: 5
              }]
              }
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />
            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button title="Save" onPress={handleChangePassword} />
              </View>
              <View style={styles.buttonWrapper}>
                <Button title="Cancel" onPress={hideModal} />
              </View>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16
  },
  settingContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 20
  },
  label: {
    flex: 1,
    fontSize: 16
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.35)',
  },
  modalContent: {
    height: 130,
    width: 300, // 设置Modal的宽度
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between'
  },
  buttonWrapper: {
    flex: 1,
    margin: 4
  },
  imagecontainer: {
    flex: 1,
    alignItems: 'center',
    padding: 200
  },
  avatar: {
    width: 102,
    height: 78,
    borderRadius: 50,
    marginBottom: 10
  },
  logoutLabel: {
    color: 'black',
    fontSize: 20
  }
});
