import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getVibrationSwitch() {
    return AsyncStorage.getItem('vibrationEnabled')
}

export async function setVibrationSwitch(vibrationEnabled) {
    AsyncStorage.setItem('vibrationEnabled', JSON.stringify(vibrationEnabled))
}