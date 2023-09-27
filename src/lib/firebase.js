import Firebase from 'firebase/compat/app';
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import 'firebase/compat/storage';
import 'firebase/compat/functions';
import { getAnalytics } from 'firebase/analytics';
import { getAuth } from 'firebase/auth';

/* eslint-disable*/
const config = {
    apiKey: process.env.REACT_APP_API_KEY,
    authDomain: process.env.REACT_APP_AUTH_DOMAIN,
    projectId: process.env.REACT_APP_PROJECT_ID,
    storageBucket: process.env.REACT_APP_STORAGE_BUCKET,
    messagingSenderId: process.env.REACT_APP_MESSAGING_SENDER_ID,
    appId: process.env.REACT_APP_APP_ID,
    measurementId: process.env.REACT_APP_MEASUREMENT_ID,
}
const firebase = Firebase.initializeApp(config);
const analytics = getAnalytics(firebase);
const { FieldValue } = Firebase.firestore;
const authentication = getAuth(firebase);
const firestore = firebase.firestore();
const functions = firebase.functions();

export { firebase, FieldValue, analytics, authentication, firestore,functions };