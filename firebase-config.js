// Talk MY Friends - Firebase Configuration

import { initializeApp } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-app.js";
import { getAuth } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-auth.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/12.1.0/firebase-firestore.js";

const firebaseConfig = {
  apiKey: "AIzaSyBLCeF6Woj2Ob1-guhJGRnQMDMsn4osZAE",
  authDomain: "talk-my-friends.firebaseapp.com",
  projectId: "talk-my-friends",
  storageBucket: "talk-my-friends.firebasestorage.app",
  messagingSenderId: "1065899279850",
  appId: "1:1065899279850:web:a701b3b6a5783f61a25e93",
  measurementId: "G-JTRC82FC5V"
};

const app = initializeApp(firebaseConfig);

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, db };