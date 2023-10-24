import AsyncStorage from '@react-native-async-storage/async-storage'

export async function getVibrationSwitchGlobal() {
    return AsyncStorage.getItem('vibrationEnabled')
}
export async function setVibrationSwitchGlobal(vibrationEnabled) {
    AsyncStorage.setItem('vibrationEnabled', JSON.stringify(vibrationEnabled))
}

export async function getAutoJoinChatroomSwitchGlobal() {
    return AsyncStorage.getItem('autoJoinChatroomEnabled')
}

export async function setAutoJoinChatroomSwitchGlobal(autoJoinChatroomEnabled) {
    AsyncStorage.setItem('autoJoinChatroomEnabled', JSON.stringify(autoJoinChatroomEnabled))
}

export let hideTab = 'flex';

export const setHideTab = (value) => {
    hideTab = value;
};