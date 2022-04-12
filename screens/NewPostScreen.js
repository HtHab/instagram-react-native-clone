import React from 'react';
import { View, StyleSheet} from 'react-native';
import AddNewPost from '../components/newPost/AddNewPost';
import { SafeAreaView } from 'react-native-safe-area-context';

function NewPostScreen({ navigation }) {
    return (
        <SafeAreaView style={{ backgroundColor: "black", flex: 1 }} >
            <AddNewPost navigation={navigation} />
        </SafeAreaView>
    );
}

export default NewPostScreen;