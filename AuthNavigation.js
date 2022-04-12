import { useGestureHandlerRef } from '@react-navigation/stack';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet } from 'react-native';
import { auth } from './firebase';
import { SignedInStack, SignedOutStack } from './navigation';

function AuthNavigation(props) {
    const [currentUser, setCurrentUser] = useState(null);

    const userHandler= (user) => (
        user ? setCurrentUser(user) : setCurrentUser(null)
    )

    useEffect(() => 
        auth.onAuthStateChanged(user => userHandler(user))
    , [])

    return (
        <>
            {currentUser ? <SignedInStack /> : <SignedOutStack />}
        </>
    );
}

export default AuthNavigation;