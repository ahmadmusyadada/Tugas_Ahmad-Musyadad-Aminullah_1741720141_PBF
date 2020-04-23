import firebase from "firebase/app";
import "firebase/auth";
import "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAQvGbxrln1BuJiRqK-Me16sPQ_HwrXKwE",
    authDomain: "fir-login-dc5ad.firebaseapp.com",
    databaseURL: "https://fir-login-dc5ad.firebaseio.com",
    projectId: "fir-login-dc5ad",
    storageBucket: "fir-login-dc5ad.appspot.com",
    messagingSenderId: "622236040594",
    appId: "1:622236040594:web:84207fbf99e8fd204ad54b",
    measurementId: "G-NY3B81B1GR"
}

export const myFirebase = firebase.initializeApp(firebaseConfig);
const baseDb = myFirebase.firestore();
export const db = baseDb;