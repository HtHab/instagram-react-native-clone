import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import FormikPostUploader from './FormikPostUploader';

const Header = ({navigation}) => {
    return(<View style={styles.headerContainer}>
            <TouchableOpacity onPress={()=> navigation.goBack()}>
                <Image source={{ uri: "https://img.icons8.com/ios-glyphs/90/ffffff/back.png" }}
                    style={{ width: 30, height: 30, }}
                />
            </TouchableOpacity>
            <Text style={styles.headertext} >New Post</Text>
            <Text></Text>
        </View>)
}

function AddNewPost({ navigation }) {
    return (
        <View style={styles.container} > 
            <Header navigation={navigation} />
            <FormikPostUploader navigation={navigation} />
        </View>
    );
}

const styles=StyleSheet.create({
    container: {
        marginHorizontal:10,
    },
    headerContainer: {
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    headertext:{
        fontSize: 20,
        marginRight: 25,
        fontWeight: "700",
        color: "#fff",
    }
})

export default AddNewPost;