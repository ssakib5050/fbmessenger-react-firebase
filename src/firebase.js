import firebase from "firebase";

const firebaseConfig = firebase.initializeApp({
  apiKey: "AIzaSyCK3u0lTFU5D-iYqfbVcQuHPopPQkHHBQs",
  authDomain: "fbmessenger-react-firebase.firebaseapp.com",
  databaseURL: "https://fbmessenger-react-firebase.firebaseio.com",
  projectId: "fbmessenger-react-firebase",
  storageBucket: "fbmessenger-react-firebase.appspot.com",
  messagingSenderId: "179646877173",
  appId: "1:179646877173:web:d8c71f9bdc2ad957d2e4bc",
  measurementId: "G-HYQBBK240T",
});

const db = firebaseConfig.firestore();
const auth = firebase.auth();
const storage = firebase.storage();

export { firebase, db, auth, storage };
