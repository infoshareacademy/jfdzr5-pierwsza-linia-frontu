import React from 'react';
import ReactDOM from 'react-dom';
import {BrowserRouter} from "react-router-dom";
import './index.css';
import App from './App';

import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

const firebaseConfig = {
  apiKey: "AIzaSyA2a9vF2-RSVJU4CBsjm_1dYgAk4N3cPWI",
  authDomain: "jfdzr5-bf21f.firebaseapp.com",
  projectId: "jfdzr5-bf21f",
  storageBucket: "jfdzr5-bf21f.appspot.com",
  messagingSenderId: "853847413126",
  appId: "1:853847413126:web:a96507ca304cde83101c07"
};

const app = initializeApp(firebaseConfig);
const database = getDatabase(app);

ReactDOM.render(
  <React.StrictMode>
      <BrowserRouter>
          <App />
      </BrowserRouter>
  </React.StrictMode>,
  document.getElementById('root')
);