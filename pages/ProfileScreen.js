import React, { useState } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TextInput, TouchableWithoutFeedback, Clipboard, SafeAreaView, ScrollView } from 'react-native'
import { createStackNavigator } from '@react-navigation/stack'
import PropTypes from 'prop-types'
import { NavigationContainer, StackActions, NavigationActions } from '@react-navigation/native'
import * as ImagePicker from 'expo-image-picker'
import SettingScreen from './Setting'

// InformationScreen.propTypes = {
//   navigation: PropTypes.shape({
//     navigate: PropTypes.func
//   })
// }

const Stack = createStackNavigator()

export default function ProfileScreen () {
  return (

    <Stack.Navigator initialRouteName="ProfileScreen">
      <Stack.Screen
        name="Profile"
        component={InformationScreen}
        headerShown={false}
        />
      <Stack.Screen name="Setting" component={SettingScreen} />
    </Stack.Navigator>
  )
}
export function InformationScreen ({ navigation }) {
  const [showPassword, setShowPassword] = useState(false)
  const [avatarSource, setAvatarSource] = useState(null)
  const [editingName, setEditingName] = useState(false)
  const [name, setName] = useState('Example') // 初始昵称

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword)
  }

  const selectImage = async () => {
    // eslint-disable-next-line no-undef
    if (Platform.OS === 'ios' || Platform.OS === 'android') {
      const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
      if (status !== 'granted') {
        alert('Sorry, we need camera roll permissions to make this work!')
        return
      }
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.canceled) {
      setAvatarSource({ uri: result.assets[0].uri })
    }
  }
  const saveName = () => {
    setEditingName(false)
  }

  const cancelEditName = () => {
    setEditingName(false)
  }

  const handleContainerPress = () => {
    if (editingName) {
      cancelEditName()
    }
  }

  const copyEmailToClipboard = () => {
    Clipboard.setString('user@example.com') // remember to change
    alert('Copyed')
  }
  return (
    <TouchableWithoutFeedback onPress={handleContainerPress}>
        <View style={styles.container}>
          <TouchableOpacity onPress={selectImage}>
            {avatarSource
              ? (
                <Image source={avatarSource} style={styles.avatar} />
                )
              : (
                <Image source={require('../resource/profile1.png')} style={styles.avatar} />
                )}
          </TouchableOpacity>
          <Text style={styles.label}>Email:</Text>
          <View style={styles.emailContainer}>
            <Text style={styles.text}>user@example.com</Text>
            <TouchableOpacity onPress={copyEmailToClipboard} style={styles.copyButton}>
              <Image source={require('../resource/copy.png')} style={styles.copyButtonImage} />
            </TouchableOpacity>
          </View>
          <Text style={styles.label}>Name:</Text>
          {editingName
            ? (
              <View style={styles.editNameContainer}>
                <TextInput
                  style={styles.editNameInput}
                  onChangeText={(text) => setName(text)}
                  value={name} />
                <View style={styles.editNameButtons}>
                  <TouchableOpacity onPress={saveName} style={styles.editNameButton}>
                    <Text style={styles.editNameButtonText}>Save</Text>
                  </TouchableOpacity>
                  <TouchableOpacity onPress={cancelEditName} style={styles.editNameButton}>
                    <Text style={styles.editNameButtonText}>Cancel</Text>
                  </TouchableOpacity>
                </View>
              </View>
              )
            : (
              <TouchableOpacity onPress={() => setEditingName(true)}>
                <Text style={styles.text}>{name}</Text>
              </TouchableOpacity>
              )}

          <Text style={styles.label}>Password:</Text>
          <Text style={styles.password}>{showPassword ? 'user_password' : '********'}</Text>

          <TouchableOpacity onPress={togglePasswordVisibility} style={styles.passwordVisibilityButton}>
            <Text style={styles.passwordVisibilityButtonText}>
              {showPassword ? 'Hide Password' : 'Show Password'}
            </Text>
          </TouchableOpacity>

          <TouchableOpacity style={styles.settingsButton} onPress={() => { console.log('go to setting'); navigation.navigate('Setting') }}>
            <Text style={styles.settingsButtonText}>Settings</Text>
          </TouchableOpacity>

        </View>
      </TouchableWithoutFeedback>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    padding: Dimensions.get('window').height / 10
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    marginBottom: 20
  },
  label: {
    fontSize: 16,
    fontWeight: 'bold',
    marginTop: 10
  },
  text: {
    fontSize: 16,
    marginRight: 10,
    height: 40, // 设置一个固定的高度
    lineHeight: 40, // 使文本垂直居中
    padding: 0, // 确保没有额外的内边距
    margin: 0 // 确保没有额外的外边距
  },
  password: {
    fontSize: 16,
    marginBottom: 5,
    color: 'gray'
  },
  passwordVisibilityButtonText: {
    color: 'blue'
  },
  settingsButton: {
    backgroundColor: 'tomato',
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 10,
    marginTop: 20
  },
  settingsButtonText: {
    color: 'white',
    fontSize: 16,
    fontWeight: 'bold'
  },
  editNameButtons: {
    flexDirection: 'row',
    marginLeft: 10
  },
  editNameInput: {
    borderBottomWidth: 1,
    borderColor: 'gray',
    marginRight: 10,
    height: 40,
    padding: 0,
    margin: 0,
    textAlign: 'center',
    fontSize: 20
  },
  editNameButton: {
    paddingHorizontal: 20,
    paddingVertical: 5,
    borderRadius: 5,
    marginTop: 5,
    alignItems: 'center'
  },
  editNameButtonText: {
    color: 'black',
    fontWeight: 'bold'
  },
  emailContainer: {
    flexDirection: 'row',
    marginHorizontal: 10,
    alignItems: 'center'
  },
  copyButton: {
    backgroundColor: 'transparent',
    marginTop: 10,
    width: 20,
    height: 20
  },
  copyButtonImage: {
    width: 10,
    height: 10
  }
})
