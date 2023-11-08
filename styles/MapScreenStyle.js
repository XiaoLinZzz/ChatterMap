import { StyleSheet } from 'react-native'

const styles = StyleSheet.create({
  screen: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  map: {
    ...StyleSheet.absoluteFillObject
  },
  markerContainer: {
    flexDirection: 'column',
    alignSelf: 'flex-start',
    alignItems: 'center' // This line ensures everything in markerContainer is centered
  },
  markerBubble: {
    padding: 5,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: '#FFFFFF',
    backgroundColor: 'red',
    justifyContent: 'center',
    alignItems: 'center'
  },
  markerTip: {
    width: 10,
    height: 10,
    borderTopLeftRadius: 10,
    borderTopRightRadius: 10,
    alignSelf: 'center',
    backgroundColor: 'red',
    transform: [{ rotate: '45deg' }],
    marginBottom: -5 // Adjust this value to control the position of the tip
  },
  text: {
    color: '#FFFFFF',
    fontSize: 10
  },
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
  },
  profileImage: {
    width: 20,
    height: 20,
    marginBottom: 5
  },
  refreshButton: {
    position: 'absolute',
    top: 50,
    right: 7,
    backgroundColor: 'white', // Choose a color that fits your app theme
    padding: 10,
    borderRadius: 15,
    elevation: 3, // This adds a drop shadow on Android
    shadowOffset: { width: 1, height: 1 }, // This adds a shadow on iOS
    shadowColor: '#333',
    shadowOpacity: 0.3,
    shadowRadius: 2
  }
})

export default styles
