import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/database';

const prodConfig = {
    apiKey: "AIzaSyB-Ks5FwZ6-fXW2fhyAobnnbLW8YX6mrPo",
    authDomain: "calendar-5aeb0.firebaseapp.com",
    databaseURL: "https://calendar-5aeb0.firebaseio.com",
    projectId: "calendar-5aeb0",
    storageBucket: "",
    messagingSenderId: "553236294709"
};

const devConfig = {
    apiKey: "AIzaSyB-Ks5FwZ6-fXW2fhyAobnnbLW8YX6mrPo",
    authDomain: "calendar-5aeb0.firebaseapp.com",
    databaseURL: "https://calendar-5aeb0.firebaseio.com",
    projectId: "calendar-5aeb0",
    storageBucket: "",
    messagingSenderId: "553236294709"
};

const config = process.env.NODE_ENV === 'production'
                ? prodConfig
                : devConfig;

if(!firebase.apps.length){
    firebase.initializeApp(config)
}

const db = firebase.database();
const auth = firebase.auth();

export {
    db,
    auth
}