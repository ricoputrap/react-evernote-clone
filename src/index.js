import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import firebase from 'firebase';
import 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCx8vQG-BgphSkFtkqF69svpUTTEF4-RFU",
  authDomain: "rico-firegram.firebaseapp.com",
  databaseURL: "https://rico-firegram.firebaseio.com",
  projectId: "rico-firegram",
  storageBucket: "rico-firegram.appspot.com",
  messagingSenderId: "833124599411",
  appId: "1:833124599411:web:480448ea24c5f199428c06"
};
firebase.initializeApp(firebaseConfig);

ReactDOM.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
