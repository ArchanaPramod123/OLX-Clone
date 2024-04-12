import firebase from 'firebase/compat/app' 
import 'firebase/compat/auth'
import { signOut , createUserWithEmailAndPassword,signInWithEmailAndPassword } from "firebase/auth";
import 'firebase/compat/firestore'
import 'firebase/compat/storage'
import {collection , getDocs} from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyB-Oe-wBoaIUR6YFNGzl2qry02dg1O8Y20",
    authDomain: "olx-clone-d8160.firebaseapp.com",
    projectId: "olx-clone-d8160",
    storageBucket: "olx-clone-d8160.appspot.com",
    messagingSenderId: "591123113265",
    appId: "1:591123113265:web:9c9bb13a2cadefdab47c10",
    measurementId: "G-62RF7QD53S"
  };

// export default firebase.initializeApp(firebaseConfig)
const firebaseApp = firebase.initializeApp(firebaseConfig);
const auth = firebaseApp.auth();
const firestore = firebaseApp.firestore();
const storage = firebase.storage()

export { auth,createUserWithEmailAndPassword,signInWithEmailAndPassword,firestore ,storage,signOut,collection , getDocs };
export default firebaseApp

// export {firebaseApp}