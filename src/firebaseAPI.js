import firebase from "firebase";

const firebaseConfig = {
    apiKey: "AIzaSyBAhjWOd1ZTig2nbsXNgPuFhhtECz3fAYg",
    authDomain: "letsdive-messenger.firebaseapp.com",
    projectId: "letsdive-messenger",
    storageBucket: "letsdive-messenger.appspot.com",
    messagingSenderId: "1085823874711",
    appId: "1:1085823874711:web:384fe5ee20325197375bd2"
  };

export const firebaseApp= firebase.initializeApp(firebaseConfig);
export const auth=firebase.auth();
export const db = firebase.firestore();