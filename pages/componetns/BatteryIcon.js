// BatteryIcon.js
import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const getBatteryColor = (level) => {
  if (level > 0.8) return '#4CAF50' // Green
  if (level > 0.5) return '#FFEB3B' // Yellow
  if (level > 0.2) return '#FF9800' // Orange
  return '#F44336' // Red
}

export default function BatteryIcon ({ level }) {
  return (
        <View style={styles.batteryIconContainer}>
            <Icon name="battery" size={15} color={getBatteryColor(level)} />
            <Text style={styles.batteryText}>
                {Math.round(level * 100)}%
            </Text>
        </View>
  )
}

BatteryIcon.propTypes = {
  level: PropTypes.number.isRequired
}

const styles = StyleSheet.create({
  batteryIconContainer: {
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center'
  },
  batteryText: {
    fontSize: 5,
    position: 'absolute',
    color: 'black',
    fontWeight: 'bold'
  }
})
