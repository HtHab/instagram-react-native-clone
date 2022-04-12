import React from 'react';
import { TouchableOpacity } from 'react-native';
import { View, Text, StyleSheet, Image } from 'react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import { auth, db, aU, aR } from '../../firebase';



const Post = ({post}) => {
    const handleLike = () => {
        const currentLikeStatus = !post.likes_by_users.includes(
            auth.currentUser.email
        )
        db.collection('users')
        .doc(post.owner_email)
        .collection('posts')
        .doc(post.id)
        .update({
            likes_by_users: currentLikeStatus ? 
                aU.auth.currentUser.email
                : aR.auth.currentUser.email
        }).then(()=>{
            try {
                console.log("Documnet Updated Successfully")
            } catch (error) {
                console.log("Error Updating Document: ", error)
            }
        })
    }
    return (
        <View style={styles.container}>
            <Divider width={1} orientation="vertical" />
            <PostHeader post={post} />
            <PostImage post={post} />
            <View style={{marginHorizontal: 15, marginTop: 10}}>
                <PostFooter handleLike={handleLike} post={post} />
                <Likes post={post}/>
                <Caption post={post} />
                {post.comment ? <CommentSection post={post}/> : null}
                {post.comment ? <Comment post={post} />: null}
            </View>
        </View>
    );
}

const PostHeader= ({post}) => {
    return(
        <View style={styles.PostHeader}>
            <View style={{ flexDirection: "row", alignItems: "center" }}>
                {post.profile_picture ? <Image source={{uri: post.profile_picture}} style={styles.headerImage} /> : 
                    <Image source={{uri: "https://i.imgur.com/dxjd7FB.jpg"}} style={styles.headerImage} />
                }  
                <Text style={styles.userName}>{post.user}</Text>       
            </View>
            <Text style={{ color: "white", fontWeight: "900" , fontSize: 28, }} >...</Text>
        </View>
    );
}

const PostImage = ({post}) => (
    <View style={{
        width: '100%',
        height: 450,
    }}>
        <Image 
            source={{ uri: post.imageUrl }}
            style={{ height: "100%", resizeMode: "cover" }}
        />
    </View>
)

const PostFooterIcons = [
    {
        name: "like",
        imageUrl: "https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png",
        likedImageUrl: "https://img.icons8.com/ios-glyphs/60/fa314a/like--v1.png"
    },
    {
        name: "comment",
        imageUrl: "https://img.icons8.com/material-outined/60/ffffff/like--v1.png",
    },
    {
        name: "share",
        imageUrl: "https://img.icons8.com/fluency-systems-regular/60/ffffff/share.png",
    },
    {
        name: "save",
        imageUrl: "https://img.icons8.com/fluency-systems-regular/60/fffff/bookmark.png",
    },
]

const Icon = ({imgStyle, imgUrl}) =>{
    return (
        <TouchableOpacity >
            <Image style={imgStyle} source={{ uri: imgUrl }} />
        </TouchableOpacity>
    )
}


const PostFooter = ({ handleLike, post }) =>{

    return(
        <View style={{ flexDirection: "row" }}>
            <View style={styles.leftFooterIcons}>
                <TouchableOpacity onPress={() => handleLike(post)} >
                    <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[0].imageUrl} />
                </TouchableOpacity>
                <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[0].imageUrl} />
                <Icon imgStyle={[styles.footerIcon, styles.shareIcon]} imgUrl={PostFooterIcons[0].imageUrl} />
            </View>
            <View style={{flex:1, alignItems: "flex-end"}}>
                <Icon imgStyle={styles.footerIcon} imgUrl={PostFooterIcons[0].imageUrl} />
            </View>
        </View>
    )
}

const Likes = ({post}) =>{
    return(
        <View style={{flexDirection: "row", marginTop: 4}}>
            <Text style={{color: "white", fontWeight: "bold"}}>{post.likes_by_users.length.toLocaleString("en")} likes</Text>
        </View>
    )
}
const Caption = ({post}) => (
    <View style={{marginTop: 4,}}>
        <Text style={{color: "white"}}>
            <Text style={{fontWeight: "bold"}}>{post.user}</Text>
            <Text> {post.caption}</Text>
        </Text>
    </View>
)
const CommentSection = ({post}) => {
    return(
        <View style={{marginTop: 5}}>
            {!!post.comment.length &&<Text style={{color: "gray"}}>
                View {post.comment.length > 1 ? 'all': ''} {post.comment.length}{' '}
                {post.comment.length > 1 ? 'comments' : 'comment'}
            </Text>}
        </View>
    )
}
const Comment = ({post}) => {
    return(
        <View>
            {post.comment.map((comment, index) => (
                <View key={index} style={{marginTop: 5,flexDirection: "row"}}>
                    <Text style={{color: "white"}}>
                        <Text style={{fontWeight: "bold"}}>{comment.user}</Text>
                        {" "}{comment.comment}
                    </Text>
                </View>
            ))}            
        </View>
    )
}


const styles = StyleSheet.create({
    container:{
        marginBottom: 30,
    },
    headerImage: {
        height: 35,
        width: 35,
        borderRadius: 50,
        marginLeft: 6,
        borderWidth: 1.6,
        borderColor: "#ff8501",
    },
    footerIcon: {
        width: 33,
        height: 33,
    },
    PostHeader: {
        flexDirection: "row",
        justifyContent: "space-between",
        margin: 5,
        alignItems: "center",
    },
    userName: {
        marginLeft: 5,
        color: "white",
        fontWeight: "700",
    },
    leftFooterIcons: {
        flexDirection: "row",
        width: "32%",
        justifyContent: "space-between",
    },
    shareIcon:{
        marginTop: -3,
        transform: [{rotate: "320deg"}]
    }
})

export default Post;