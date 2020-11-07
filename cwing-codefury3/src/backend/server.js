import firebase from 'firebase/app';
import 'firebase/auth';
import 'firebase/firestore';
import 'firebase/storage';
require('firebase/database');
var firebaseConfig = {
apiKey: "AIzaSyA2miRRCzvAkvwtE6d68DENPdfl7T-kcA0",
authDomain: "cwing-9dde4.firebaseapp.com",
databaseURL: "https://cwing-9dde4.firebaseio.com",
projectId: "cwing-9dde4",
storageBucket: "cwing-9dde4.appspot.com",
messagingSenderId: "1070429101205",
appId: "1:1070429101205:web:ed77a5c232a203d054cf9c",
measurementId: "G-QZKPGG7RSV"
};
  // Initialize Firebase
  
firebase.initializeApp(firebaseConfig);
export const auth = firebase.auth();
export const firestore = firebase.firestore();

export default firebase;