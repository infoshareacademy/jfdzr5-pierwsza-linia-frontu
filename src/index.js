import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyA2a9vF2-RSVJU4CBsjm_1dYgAk4N3cPWI",
  authDomain: "jfdzr5-bf21f.firebaseapp.com",
  projectId: "jfdzr5-bf21f",
  storageBucket: "jfdzr5-bf21f.appspot.com",
  messagingSenderId: "853847413126",
  appId: "1:853847413126:web:a96507ca304cde83101c07"
};

const app = initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
