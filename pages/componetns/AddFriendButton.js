// components/AddFriendButton.js

import PropTypes from 'prop-types'
import React from 'react'
import { TouchableOpacity } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

export default function AddFriendButton ({ onPress }) {
  return (
    <TouchableOpacity
      style={{
        position: 'absolute',
        top: 50,
        right: 10,
        padding: 10
      }}
      onPress={onPress}
    >
      <Icon name="user-plus" size={25} color="black" />
    </TouchableOpacity>
  )
}

AddFriendButton.propTypes = {
  onPress: PropTypes.func.isRequired
}
