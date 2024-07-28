// firebaseConfig.js
import { initializeApp } from 'firebase/app';
import { getDatabase } from 'firebase/database';

const firebaseConfig = {
  apiKey: "AIzaSyAy3Hn5i5e9w4MpVr__R8G1UGcAWwZWwpo",
  authDomain: "worldwise-6e045.firebaseapp.com",
  databaseURL: "https://worldwise-6e045-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "worldwise-6e045",
  storageBucket: "worldwise-6e045.appspot.com",
  messagingSenderId: "869575787510",
  appId: "1:869575787510:web:a3e5f583232ce8cd09bdd7",
  measurementId: "G-6QXX2Q1MXK"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

export { database };
