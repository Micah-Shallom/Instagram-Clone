import firebase from 'firebase'
import 'firebase/auth'
import 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyBwlHi5XGSA6krFosPmd9Ob9Krocw1ciyE",
    authDomain: "instagram-clone-40963.firebaseapp.com",
    databaseURL: "https://instagram-clone-40963.firebaseio.com",
    projectId: "instagram-clone-40963",
    storageBucket: "instagram-clone-40963.appspot.com",
    messagingSenderId: "234487770886",
    appId: "1:234487770886:web:404209194a1f1848d8f887",
    measurementId: "G-1EEVGFJHJV"
  };

  const firebaseApp = firebase.initializeApp(firebaseConfig);

  const auth = firebase.auth()
  const firestore = firebaseApp.firestore();
  const storage = firebase.storage()

  export {auth,firestore,storage, firebase}

  