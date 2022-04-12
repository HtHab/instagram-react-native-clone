import { Formik } from 'formik';
import React, { useEffect, useState } from 'react';
import { View, StyleSheet, Text, Image, TextInput, TouchableOpacity, Button } from 'react-native';
import { Divider } from 'react-native-elements/dist/divider/Divider';
import * as Yup from 'yup';
import { auth, db } from '../../firebase';

const PLACEHOLDER_IMAGE = "https://img.icons8.com/fluency-systems-regular/48/ffffff/home.png";

const uploadPostSchema = Yup.object().shape({
    imageUrl: Yup.string().url().required("A Url is Required"),
    caption: Yup.string().max(2200, "Caprion has reached the character limit")
})

function FormikPostUploader({ navigation }) {

    const [thumbnailUrl, setThumbnailUrl] = useState(PLACEHOLDER_IMAGE)
    const [currentLoggedInUser, setCurrentLoggedInUser] = useState(null);

    const getUsername = () => {
        const user = auth.currentUser
        const unsubscribe = db.collection('users')
            .where('owner_uid', '==', user.uid)
            .limit(1)
            .onSnapshot(snapShot => 
                    snapShot.docs.map(doc => {
                        setCurrentLoggedInUser({
                            username: doc.data().username,
                            profile_picture: doc.data().profile_picture
                        })
                    })
                )
        return unsubscribe;
    }

    useEffect(() => {
        getUsername();
    }, [])

    const uploadPostToFirebase = (imageUrl, caption) => {
        const unsubscribe = db.collection('users')
            .doc(auth.currentUser.email)
            .collection('posts')
            .add({
                imageUrl: imageUrl,
                user: currentLoggedInUser.username,
                //profile_picture: currentLoggedInUser.profilePicture,
                owner_uid: auth.currentUser.uid,
                owner_email: auth.currentUser.email,
                caption: caption,
                //createdAt: db.FieldValue.serverTimeStamp(),
                likes_by_users: [],
                comments: []
            })
            .then(() => navigation.goBack())

        return unsubscribe;
    }

    return (
        <Formik
            initialValues={{ caption: "" ,imageUrl: "" }}
            onSubmit={values=> {
                uploadPostToFirebase(values.imageUrl, values.caption)
            }
            }
            validationSchema={uploadPostSchema}
            validateOnMount
        >

            {({handleBlur, handleChange, handleSubmit, values, errors, isValid}) => (
                <>
                    <View style={{ margin: 20, flexDirection: "row", justifyContent: "space-between" }}>
                        <Image source={{ uri: thumbnailUrl ? thumbnailUrl: PLACEHOLDER_IMAGE }}
                            style={{width: 100, height: 100}}
                        />
                        <View style={{ flex: 1, marginLeft: 20 }}>
                            <TextInput style={{ color: "white", fontSize: 20, }}
                            onChangeText={handleChange("caption")}
                            onBlur={handleBlur("caption")}
                            value={values.caption}
                            placeholder='Write a caption ...' placeholderTextColor='gray' multiline />
                        </View>
                    </View>
                    <Divider width={0.2} orientation='vertical' />
                    <TextInput style={{ color: "white", fontSize: 18, }}
                    onChange={(e) => setThumbnailUrl(e.nativeEvent.text)}
                    onChangeText={handleChange("imageUrl")}
                    onBlur={handleChange("imageUrl")}
                    value={values.imageUrl}
                    placeholder='Enter image url' placeholderTextColor='gray' />
                    {errors.imageUrl && (
                        <Text style={{ color: "red" , fontSize: 10, }}>
                            {errors.imageUrl}
                        </Text>
                    )}
                    <Button onPress={handleSubmit} title="Share" disabled={!isValid} color="black" />
                </>
            )}

        </Formik>
    );
}

const styles = StyleSheet.create({
    container:{

    }
})

export default FormikPostUploader;