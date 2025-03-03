import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBRW6JgoY51ulhNQK6XYZANLc_Y_Lz4izY",
  authDomain: "nxtjspgroute.firebaseapp.com",
  databaseURL: "https://nxtjspgroute-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "nxtjspgroute",
  storageBucket: "nxtjspgroute.firebasestorage.app",
  messagingSenderId: "1090191114556",
  appId: "1:1090191114556:web:c212d081d5ffdad1045e39",
  measurementId: "G-9FZBPH1RQH"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db };
