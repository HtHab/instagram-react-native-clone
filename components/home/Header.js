import React from 'react';
import { View, StyleSheet, Text, Image, TouchableOpacity } from 'react-native';
import { auth } from '../../firebase';

const handleSignOut = async() =>{
    
    try {
        await auth.signOut()
        console.log("Signed Out Successfully")
    } catch (error) {
        console.log(error)
    }
}


function Header({ navigation }) {
    return (
        <View style={styles.container} >
            <TouchableOpacity onPress={handleSignOut}>
                <Image style={styles.logo} source={require("../../assets/header-2.png")} />
            </TouchableOpacity>
            <View style={styles.iconContainer}>
                <TouchableOpacity onPress={() => navigation.navigate("NewPostScreen")} >
                    <Image 
                        source={{
                            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/plus-2-math.png",
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <Image 
                        source={{
                            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
                <TouchableOpacity>
                    <View style={styles.unreadBadge} >
                        <Text style={styles.unreadBadgeText}>11</Text>
                    </View>
                    <Image 
                        source={{
                            uri: "https://img.icons8.com/fluency-systems-regular/60/ffffff/facebook-messenger.png",
                        }}
                        style={styles.icon}
                    />
                </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        justifyContent: 'space-between',
        flexDirection: 'row',
        marginHorizontal: 20,
        alignItems: 'center',
    },
    iconContainer: {
        flexDirection: "row",
    },
    logo: {
        height: 50,
        width: 100,
        resizeMode: "contain",
    },
    icon: {
        width: 30,
        height: 30,
        marginRight: 10,
    },
    unreadBadge:{
        backgroundColor: "#ff3250",
        left: 15,
        position: "absolute",
        bottom: 15,
        width: 25,
        height: 18,
        borderRadius: 25,
        zIndex: 100,
        alignItems: "center",
        justifyContent: "center",
    },
    unreadBadgeText: {
        color: "white",
        fontWeight: "600",
    }
})

export default Header;