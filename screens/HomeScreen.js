import React, { useEffect, useState } from 'react';
import {Viewn, Text, StyleSheet, ScrollView } from 'react-native';
import Header from '../components/home/Header';
import { SafeAreaView } from 'react-native-safe-area-context';
import Stories from '../components/home/Stories';
import Post from '../components/home/Post';
import { POSTS } from '../data/Posts';
import BottomTab, { bottomTabIcons } from '../components/home/BottomTab';
import { db } from '../firebase';
 
function HomeScreen({ navigation }) {

    const [posts, setPosts] = useState([])

    useEffect(() => {
        db.collectionGroup('posts').onSnapshot(snapShot => {
            setPosts(snapShot.docs.map(post => ({
                id: post.id , ...post.data()
            })))
        })
    }, [])

    return (
        <SafeAreaView style={styles.container}>
            <Header navigation={navigation} />
            <Stories />
            <ScrollView>
                {posts.map((post, index) => (
                    <Post post={post} key={index} />
                ))}
            </ScrollView>
            <BottomTab icons={bottomTabIcons} />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        backgroundColor: 'black',
        flex: 1,
    }
});

export default HomeScreen;