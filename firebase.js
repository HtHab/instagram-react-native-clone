import firebase from "firebase/compat/app"
import 'firebase/compat/auth'
import 'firebase/compat/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyBmCMgEFMg-bmswMGHxjH8kWzrHpgdOyAs",
  authDomain: "instagram-clone-a2de9.firebaseapp.com",
  projectId: "instagram-clone-a2de9",
  storageBucket: "instagram-clone-a2de9.appspot.com",
  messagingSenderId: "748221941236",
  appId: "1:748221941236:web:64de41c353d8a8ce8a65a1"
};

!firebase.apps.length ? firebase.initializeApp(firebaseConfig) : firebase.app()

const auth = firebase.auth();
const db = firebase.firestore();
const aU = firebase.firestore.FieldValue.arrayUnion();
const aR = firebase.firestore.FieldValue.arrayRemove();

export { auth, db, aR, aU };