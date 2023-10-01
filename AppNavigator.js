import React, { useContext } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createStackNavigator } from '@react-navigation/stack';
import ChatScreen from './pages/ChatScreen';
import MapScreen from './pages/MapScreen';
import Profile from './pages/ProfileScreen';
import LoginScreen from './pages/Login';
import SignUpScreen from './pages/Register';
import AuthLandingPage from './pages/AuthLandingPage';
import { UserContext } from './pages/UserContext';

const BottomTab = createBottomTabNavigator();

const AppNavigator = () => {
    const { isUserLoggedIn } = useContext(UserContext);

    return (
        <NavigationContainer>
            {isUserLoggedIn ? (
                <HomePage />
            ) : (
                <LoginNavigator />
            )}
        </NavigationContainer>
    );
};

const HomePage = () => {
    return (
        <BottomTab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'tomato',
                tabBarInactiveTintColor: 'gray',
                tabBarStyle: [{ display: 'flex' }, null]
            }}
        >
            <BottomTab.Screen name="Chat" component={ChatScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={focused ? require('./resource/message.png') : require('./resource/messageSelected.png')}
                        style={{ width: focused ? iconSize : screenWidth * 0.064, height: focused ? iconSize : screenWidth * 0.064 }}
                    />
                ),
                headerShown: false
            }} />
            <BottomTab.Screen name="Map" component={MapScreen} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={focused ? require('./resource/mapSelected.png') : require('./resource/map.png')}
                        style={{ width: focused ? iconSize : screenWidth * 0.064, height: focused ? iconSize : screenWidth * 0.064 }}
                    />
                ),
                headerShown: false
            }
            } />
            <BottomTab.Screen name="Profile" component={Profile} options={{
                tabBarIcon: ({ focused }) => (
                    <Image
                        source={focused ? require('./resource/profileSelected.png') : require('./resource/profile.png')}
                        style={{ width: focused ? iconSize : screenWidth * 0.064, height: focused ? iconSize : screenWidth * 0.064 }}
                    />
                ),
                headerShown: false
            }} />
        </BottomTab.Navigator>
    );
};

const Stack = createStackNavigator();

const LoginNavigator = () => {
    return (
        <Stack.Navigator
            initialRouteName="AuthLanding"
            screenOptions={{
                headerShown: false,
            }}
        >
            <Stack.Screen name="AuthLanding" component={AuthLandingPage} />
            <Stack.Screen name="Login" component={LoginScreen} />
            <Stack.Screen name="SignUp" component={SignUpScreen} />
        </Stack.Navigator>
    );
};

export default AppNavigator;
