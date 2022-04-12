import { Formik } from 'formik';
import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import * as Yup from 'yup';
import Validator from 'email-validator';
import { auth, db } from '../../firebase';

const SignupForm = ({ navigation }) =>{
    
    const getRandomProfilePicture = async() => {
        const response = await fetch("https://randomuser.me/api")
        const data = await response.json()
        return data.results[0].picture.large
    }

    const onSignup = async(email, password, username) => {
        try {
            const authUser = await auth.createUserWithEmailAndPassword(email, password)
            console.log("Firebase account created successfully", email, password)

            db.collection('users').doc(authUser.user.email).set({
                owner_uid: authUser.user.uid,
                username: username,
                email: authUser.user.email,
                profile_picture: await getRandomProfilePicture(),
            })
        } catch (error) {
            Alert.alert("hello ", error.message);
        }
    }


    const SignupFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        username: Yup.string().required().min(2, "A username is required to be at least 2 characters"),
        password: Yup.string().required().min(6, "Your password has to have at least 6 characters")
    })

    return (
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: "", username: "", password: "" }}
                onSubmit={(values) => {
                    onSignup(values.email, values.password, values.username);
                }}      
                validationSchema={SignupFormSchema}
                validateOnMount={true}
            >
                {({handleSubmit, handleChange, handleBlur, values, isValid}) => (
                    <>
                        <View style={[styles.inputField,  {
                            borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc': 'red'
                        }]}>
                            <TextInput
                                placeholder='Email'
                                autoCapitalize='none'
                                placeholderTextColor='#444'
                                keyboardType='email-address'
                                textContentType='emailAddress'
                                autoFocus={true}
                                onChangeText={handleChange('email')}
                                onBlur={handleBlur('email')}
                                value={values.email}
                            />
                        </View>
                        <View style={[styles.inputField, {
                            borderColor: 1> values.username.length || values.username.length>= 2 ? '#ccc': "red"
                        }]}>
                            <TextInput
                                placeholder='Username'
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholderTextColor='#444'
                                onChangeText={handleChange('username')}
                                onBlur={handleBlur('username')}
                                value={values.username}
                            />
                        </View>
                        <View style={[styles.inputField, {
                            borderColor: 1> values.password.length || values.password.length >= 6 ? '#ccc': "red"
                        }]}>
                            <TextInput
                                placeholder='Password'
                                autoCapitalize='none'
                                autoCorrect={false}
                                placeholderTextColor='#444'
                                secureTextEntry={true}
                                textContentType='password'
                                onChangeText={handleChange('password')}
                                onBlur={handleBlur('password')}
                                value={values.password}
                            />
                        </View>
                        <Pressable 
                        onPress={handleSubmit}
                        titleSize={20} style={styles.Button(isValid)} >
                            <Text style={styles.buttonText}>Sign up</Text>
                        </Pressable>
                        <View style={styles.signUpContainer}>
                            <Text>Already have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.goBack()} >
                                <Text style={styles.signUpText}>Log In</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    );
}

const styles = StyleSheet.create({
    inputField:{
        borderRadius: 4,
        padding: 12,
        backgroundColor: "#FAFAFA",
        marginBottom: 10,
        borderWidth: 1,
    },
    wrapper: {
        marginTop: 80,
        marginRight: 10,
    },
    Button: isValid => ({
        minHeight: 42,
        borderRadius: 4,
        backgroundColor: isValid ?  "#0096f6": "#9acafa",
        alignItems: "center",
        justifyContent: "center",
        marginTop: 50,
    }),
    buttonText: {
        fontWeight: "600",
        color: "#fff",
        fontSize: 20,
    },
    signUpContainer: {
        flexDirection: "row",
        width: '100%',
        marginTop: 50,
        justifyContent: "center"
    },
    signUpText: {
        color: "#6bb0f5",
    }
})


export default SignupForm;