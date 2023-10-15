import React, { useState } from 'react';
import { Button, View, Text, StyleSheet, Switch, TextInput, Modal, TouchableOpacity, Image, Dimensions, Vibration } from 'react-native';



export default function SettingScreen() {
  const [notificationEnabled, setNotificationEnabled] = useState(false)
  const [autoJoinEnabled, setAutoJoinEnabled] = useState(false)
  const [vibrationEnabled, setVibrationEnabled] = useState(false)
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [newPassword, setNewPassword] = useState('');



  const switchNotification = () => {
    setNotificationEnabled((previousState) => !previousState)
  }

  const switchAutoJoin = () => {
    setAutoJoinEnabled((previousState) => !previousState)
  }

  const switchVibration = () => {
    setVibrationEnabled((previousState) => !previousState)
    if (!vibrationEnabled) {
      Vibration.vibrate()
    } else {
      Vibration.cancel()
    }
  }

  const handleChangePassword = () => {

    if (newPassword === '') {
      alert('Password hasn\'t changed.');
      hideModal()
      return;
    }

    // send request

    setNewPassword('');
    hideModal()
    alert('Password changed.');
  }
  const toggleModal = () => {
    setIsModalVisible(!isModalVisible);
  };

  const hideModal = () => {
    setIsModalVisible(false);
  };

  const logout = () => {
    alert('log out now')
  }

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
      <View style={styles.settingContainer}>
        <TouchableOpacity style={styles.changePasswordButton} onPress={toggleModal}>
          <Text style={styles.changePasswordButtonText}>Change Password</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.imagecontainer}>
        <TouchableOpacity style={styles.label} onPress={() => { logout() }}>
          <Image source={require('../../resource/logout.png')} style={styles.avatar} />
        </TouchableOpacity>
      </View>

      <Modal
        transparent={true}
        animationType="slide"
        visible={isModalVisible}
        onRequestClose={hideModal}
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.label}>Enter New Password</Text>
            <TextInput
              style={[styles.input, { backgroundColor: 'tomato', color: 'white' }]}
              secureTextEntry={true}
              value={newPassword}
              onChangeText={(text) => setNewPassword(text)}
            />

            <View style={styles.buttonContainer}>
              <View style={styles.buttonWrapper}>
                <Button title="Save" onPress={() => { handleChangePassword() }} />
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
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    width: 300, // 设置Modal的宽度
    backgroundColor: 'white',
    padding: 16,
    borderRadius: 8,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  buttonWrapper: {
    flex: 1,
    margin: 4,
  },
  imagecontainer: {
    flex: 1,
    alignItems: 'center',
    padding: Dimensions.get('window').height / 10
  },
  avatar: {
    width: 102,
    height: 78,
    borderRadius: 50,
    marginBottom: 20
  },
})
