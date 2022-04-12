import { Formik } from 'formik';
import React from 'react';
import { Text, View, StyleSheet, TextInput, Pressable, TouchableOpacity, Alert } from 'react-native';
import * as Yup from 'yup';
import Validator from 'email-validator';
import SignupScreen from '../../screens/SignupScreen';
import { auth } from '../../firebase';


const LoginForm = ({ navigation }) =>{

    const LoginFormSchema = Yup.object().shape({
        email: Yup.string().email().required('An email is required'),
        password: Yup.string().required().min(6, "Your password has to have at least 6 characters")
    })

    const onLogin = async(email, password) => {
        try{
            await auth.signInWithEmailAndPassword(email, password);
            console.log("Firebase login successful", email, password)
        }catch(error){
            Alert.alert('hello',
                error.message, [
                    {
                        text: "Ok",
                        onPress: console.log("OK"),
                        style: "cancel",
                    },
                    {
                        text: "Sign Up",
                        onPress: () => navigation.navigate(SignupScreen),
                    }
                ]
            );
        }
    }

    return(
        <View style={styles.wrapper}>
            <Formik
                initialValues={{ email: "", password: "" }}
                onSubmit={(values) => {
                    onLogin(values.email, values.password)
                }}      
                validationSchema={LoginFormSchema}
                validateOnMount={true}
            >
                {({handleSubmit, handleChange, handleBlur, values, isValid}) => (
                    <>
                        <View style={[styles.inputField,  {
                            borderColor: values.email.length < 1 || Validator.validate(values.email) ? '#ccc': 'red'
                        }]}>
                            <TextInput
                                placeholder='Phone Number, username or email'
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
                        <View style={{ alignItems:'flex-end', marginBottom: 30, }}>
                            <Text style={{color: "#6bb0f5"}}>Forget password?</Text>
                        </View>
                        <Pressable 
                        onPress={handleSubmit}
                        titleSize={20} style={styles.Button(isValid)} >
                            <Text style={styles.buttonText}>Log In</Text>
                        </Pressable>
                        <View style={styles.signUpContainer}>
                            <Text>Don't have an account? </Text>
                            <TouchableOpacity onPress={() => navigation.navigate('SignupScreen')}>
                                <Text style={styles.signUpText}>Sign Up</Text>
                            </TouchableOpacity>
                        </View>
                    </>
                )}
            </Formik>
        </View>
    )
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
        justifyContent: "center"
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

export default LoginForm;