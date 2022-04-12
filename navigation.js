import { NavigationContainer, StackActions } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import React from 'react';
import { View, StyleSheet } from 'react-native';
import HomeScreen from './screens/HomeScreen';
import LoginScreen from './screens/LoginScreen';
import NewPostScreen from './screens/NewPostScreen';
import SignupScreen from './screens/SignupScreen';

const Stack = createStackNavigator();

export const SignedInStack =()=> (
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="HomeScreen" 
            screenOptions={{ headerShown: false }} >
            <Stack.Screen name="HomeScreen" component={HomeScreen}/>
            <Stack.Screen name="NewPostScreen" component={NewPostScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)

export const SignedOutStack = () => ( 
    <NavigationContainer>
        <Stack.Navigator
            initialRouteName="LoginScreen" 
            screenOptions={{ headerShown: false }} >
            <Stack.Screen name="LoginScreen" component={LoginScreen}/>
            <Stack.Screen name="SignupScreen" component={SignupScreen}/>
        </Stack.Navigator>
    </NavigationContainer>
)
