import firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';

const firebaseConfig = {
    apiKey: "AIzaSyBTOqmo_JkArGz8PjF3QUFVjcs_xfocsgc",
    authDomain: "snapchat-clone-45f56.firebaseapp.com",
    projectId: "snapchat-clone-45f56",
    storageBucket: "snapchat-clone-45f56.appspot.com",
    messagingSenderId: "95309786608",
    appId: "1:95309786608:web:97bdb434e0300790110135"
  }; 

  const firebaseApp = firebase.initializeApp(firebaseConfig)
  const db = firebaseApp.firestore()
  const auth = firebase.auth()
  const storage = firebase.storage()
  const provider = new firebase.auth.GoogleAuthProvider();

  export { db, auth, storage, provider };