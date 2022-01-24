import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyA2a9vF2-RSVJU4CBsjm_1dYgAk4N3cPWI",
    authDomain: "jfdzr5-bf21f.firebaseapp.com",
    projectId: "jfdzr5-bf21f",
    storageBucket: "jfdzr5-bf21f.appspot.com",
    messagingSenderId: "853847413126",
    appId: "1:853847413126:web:a96507ca304cde83101c07"
  };

export const firebase = initializeApp(firebaseConfig);

export const firestore = getFirestore();