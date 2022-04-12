import React from 'react';
import { View, Image, StyleSheet, Text, ScrollView } from 'react-native';
import { USERS } from '../../data/users';


function Stories(props) {
    return (
        <View style={styles.container}>
            <ScrollView horizontal
                showsVerticalScrollIndicator= {false}
            >
                {USERS.map((story, index) => (
                    <View key={index} style={{ alignItems: "center" }}>
                        <Image source={{  uri: story.image}} 
                            style={styles.story}
                        />
                        <Text style= {{color: "white"}}>{
                            story.user.length > 9 ? story.user.slice(0,8).toLowerCase() + "..." : story.user.toLowerCase()
                        }</Text>    
                    </View>
                ))}
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        marginBottom: 13,
    },
    story: {
        width: 70,
        height: 70,
        borderRadius: 50,
        marginLeft: 18,
        borderWidth: 3,
        borderColor: "#ff8501",
    }
})

export default Stories;