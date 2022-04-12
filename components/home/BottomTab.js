import React, { useState } from 'react';
import { View, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { Icon } from 'react-native-elements';
import { Divider } from 'react-native-elements/dist/divider/Divider';


export const bottomTabIcons = [
    {
        name: "Home",
        active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/home.png",
        inactive: "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png",
    },
    {
        name: "Search",
        active: "https://img.icons8.com/ios-filled/500/ffffff/search--v1.png",
        inactive: "https://img.icons8.com/ios/500/ffffff/search--v1.png",
    },
    {
        name: "Reels",
        active: "https://img.icons8.com/ios-filled/50/ffffff/instagram-reel.png",
        inactive: "https://img.icons8.com/ios/50/ffffff/instagram-reel.png",
    },
    {
        name: "Shop",
        active: "https://img.icons8.com/fluency-systems-filled/144/ffffff/shopping-bag-full.png",
        inactive: "https://img.icons8.com/fluency-systems-regular/144/ffffff/shopping-bag-full.png",
    },
    {
        name: "Profile",
        active: "https://i.imgur.com/dxjd7FB.jpg",
        inactive: "https://i.imgur.com/dxjd7FB.jpg"
    }
]


function BottomTab({icons}) {

    const [activeTab, setActiveTab] = useState('Home');
    const Icon = ({icon}) => {
        return(<TouchableOpacity onPress={() => setActiveTab(icon.name)} >
            <Image source={{uri: activeTab === icon.name ? icon.active : icon.inactive}} 
            style={[styles.icon, icon.name ==="Profile" ? styles.profilePic() : null,
                activeTab==='Profile' && icon.name===activeTab ? styles.profilePic(activeTab) : null
            ]} />
        </TouchableOpacity>)
    }

    return (
        <View style={styles.wrapper} >
            <Divider width={1} orientation='vertical'/>
            <View style={styles.container} >
                {icons.map((icon, index) => (
                <Icon key={index} icon={icon} />
                ))}
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container:{
        flexDirection: "row",
        justifyContent: "space-around",
        height: 50,
        paddingTop: 10,
    },
    icon: {
        width: 30,
        height: 30,
    },
    wrapper: {
        position: "absolute",
        width: "100%",
        bottom: "0%",
        zIndex: 999,
        backgroundColor: "#000"
    },
    profilePic: (activeTab = "") => ({
        borderRadius: 50,
        borderColor: "#fff",
        borderWidth: activeTab === "Profile" ? 2: 0 ,
    })
})

export default BottomTab;