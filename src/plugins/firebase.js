import firebase from "firebase";

// Import needed firebase modules
import "firebase/auth";

// Firebase app config
const config = {
    // apiKey: 'AIzaSyDTaF0j8Ipz1mhI7QEfoUnvHzHK4Ai22js',
    // authDomain: 'deonde-225311.firebaseapp.com',
    // databaseURL: 'https://deonde-225311.firebaseio.com',
    // projectId: 'deonde-225311',
    // storageBucket: 'deonde-225311.appspot.com',
    // messagingSenderId: '217696033954',
    // appId: '1:217696033954:web:1620d87067a42e260b4bfb'
    apiKey: '',
    authDomain: '',
    databaseURL: '',
    projectId: '',
    storageBucket: '',
    messagingSenderId: '',
    appId: ''
};

// Init our firebase app
firebase.initializeApp(config);

export default firebase;