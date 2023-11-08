import React, { useState, useEffect } from 'react'
import { View, Text, StyleSheet, Image, TouchableOpacity, Dimensions, TouchableWithoutFeedback } from 'react-native'
import PropTypes from 'prop-types'
import * as ImagePicker from 'expo-image-picker'
import { getUserData, getAvatar, updateAvatar } from '../../Services/UserService.js'
import { useHideTab } from '../../HideTabContext.js'

function InformationScreen({ navigation }) {
  const [avatarSource, setAvatarSource] = useState(null)
  const [id, setId] = useState(null)
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const { hideTab, setHideTab } = useHideTab()

  useEffect(() => {
    async function fetchData() {
      try {
        const userData = await getUserData()
        setId(userData.id)
        setName(userData.name)
        setEmail(userData.email)

        const avatarData = await getAvatar(userData.id)

        if (avatarData && avatarData.avatarUrl) {
          setAvatarSource({ uri: avatarData.url })
        }
      } catch (error) {
        console.error('Failed to fetch user data:', error)
      }
    }

    fetchData()
  }, [])

  const selectImage = async () => {
    const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync()
    if (status !== 'granted') {
      alert('Sorry, we need camera roll permissions to make this work!')
      return
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      allowsEditing: true,
      aspect: [4, 3],
      quality: 1
    })

    if (!result.cancelled && result.assets) {
      const fileUri = result.assets[0].uri // Make sure this is correct
      setAvatarSource({ uri: fileUri })
      try {
        const data = await updateAvatar(fileUri)
        // setAvatarSource({ uri: data.newAvatarUrl }); // Uncomment if the backend responds with the new URL
      } catch (error) {
        console.error('Error updating avatar:', error)
        alert('Failed to update avatar')
      }
    }
  }

  return (
    <TouchableWithoutFeedback>
      <View style={styles.container}>
        <TouchableOpacity onPress={selectImage}>
          {avatarSource
            ? (
              <Image source={avatarSource} style={styles.avatar} />
            )
            : (
              <Image source={require('../../resource/profile1.png')} style={styles.avatar} />
            )}
        </TouchableOpacity>
        <Text style={styles.label}>Name:</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.text}>{name + '#' + id}</Text>
        </View>
        <Text style={styles.label}>Email:</Text>
        <View style={styles.emailContainer}>
          <Text style={styles.text}>{email}</Text>
        </View>

        <TouchableOpacity
          style={styles.settingsButton}
          onPress={() => {
            setHideTab('none')
            console.log('go to setting')
            console.log('hideTab value:', hideTab)
            navigation.navigate('Setting')
          }}>
          <Text style={styles.settingsButtonText}>Settings</Text>
        </TouchableOpacity>

      </View>
    </TouchableWithoutFeedback>
  )
}

InformationScreen.propTypes = {
  navigation: PropTypes.shape({
    navigate: PropTypes.func.isRequired
  }).isRequired
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
    height: 40,
    lineHeight: 40,
    padding: 0,
    margin: 0
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

export default InformationScreen
