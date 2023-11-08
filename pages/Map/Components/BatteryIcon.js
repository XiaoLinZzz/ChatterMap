// BatteryIcon.js
import PropTypes from 'prop-types'
import React from 'react'
import { Text, View, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome'

const getBatteryColor = (level) => {
  if (level > 80) return '#4CAF50' // Green
  if (level > 50) return '#FFEB3B' // Yellow
  if (level > 20) return '#FF9800' // Orange
  return '#F44336' // Red
}

export default function BatteryIcon ({ level }) {
  if (level == null) {
    return null;
  }

  return (
        <View style={styles.batteryIconContainer}>
            <Icon name="battery" size={15} color={getBatteryColor(level)} />
            <Text style={styles.batteryText}>
                {Math.round(level)}%
            </Text>
        </View>
  )
}

BatteryIcon.propTypes = {
  level: PropTypes.number
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
