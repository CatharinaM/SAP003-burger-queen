import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyA6Ms267dkFVTD1V7ZibeK5VKKU-0r8wIg",
    authDomain: "burgerqueen-fd397.firebaseapp.com",
    databaseURL: "https://burgerqueen-fd397.firebaseio.com",
    projectId: "burgerqueen-fd397",
    storageBucket: "burgerqueen-fd397.appspot.com",
    messagingSenderId: "504408834018",
    appId: "1:504408834018:web:8dc9fac8174cb616bbc3bb",
    measurementId: "G-6SZN3M8P8E"
  };

  firebase.initializeApp(firebaseConfig);
  const db =  firebase.firestore(); 

  export default db;

  