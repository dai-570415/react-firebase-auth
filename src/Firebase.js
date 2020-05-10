import firebase from 'firebase/app';
import 'firebase/firestore';
import 'firebase/auth';

const firebaseConfig = {
    apiKey: "YOUR_KEY",
    authDomain: "YOUR_KEY",
    databaseURL: "YOUR_KEY",
    projectId: "YOUR_KEY",
    storageBucket: "YOUR_KEY",
    messagingSenderId: "YOUR_KEY",
    appId: "YOUR_KEY",
    measurementId: "YOUR_KEY"
};

firebase.initializeApp(firebaseConfig);

export const db = firebase.firestore();
export default firebase;