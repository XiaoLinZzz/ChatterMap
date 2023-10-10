import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ImageBackground } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';

const AuthLandingPage = ({ navigation }) => {
    return (
        <ImageBackground
            source={require('../resource/login.jpeg')}
            style={styles.container}
            resizeMode="cover"
        >
            <Text style={styles.title}>Welcome to ChatterMap</Text>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('Login')}>
                <Icon name="sign-in" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Log In</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('SignUp')}>
                <Icon name="user-plus" size={20} color="#fff" style={styles.icon} />
                <Text style={styles.buttonText}>Sign Up</Text>
            </TouchableOpacity>
        </ImageBackground>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#fff',
        marginBottom: 200,
    },
    button: {
        flexDirection: 'row',
        alignItems: 'center',
        backgroundColor: '#6200ee',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 25,
        marginVertical: 10,
        width: 160,
        justifyContent: 'center',
    },
    buttonText: {
        color: '#fff',
        fontSize: 17,
    },
    icon: {
        marginRight: 10,
    },
});


export default AuthLandingPage
