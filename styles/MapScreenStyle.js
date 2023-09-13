import { StyleSheet } from 'react-native';

export default StyleSheet.create({
    screen: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    map: {
        ...StyleSheet.absoluteFillObject,
    },
    markerContainer: {
        flexDirection: 'column',
        alignSelf: 'flex-start',
    },
    markerBubble: {
        padding: 5,
        borderRadius: 10,
        borderWidth: 1,
        borderColor: '#FFFFFF',
        backgroundColor: 'red',
        justifyContent: 'center',
        alignItems: 'center',
    },
    markerTip: {
        width: 10,
        height: 10,
        borderTopLeftRadius: 10,
        borderTopRightRadius: 10,
        alignSelf: 'center',
        backgroundColor: 'red',
        transform: [{ rotate: '45deg' }],
        marginBottom: -5, // Adjust this value to control the position of the tip
    },
    text: {
        color: '#FFFFFF',
        fontSize: 10,
    },
});
