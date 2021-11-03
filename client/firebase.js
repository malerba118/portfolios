import firebaseClient from "firebase/app";
import "firebase/storage";
import "firebase/auth";
import "firebase/analytics";
/*
Copy/paste your *client-side* Firebase credentials below.
To get these, go to the Firebase Console > open your project > Gear Icon >
Project Settings > General > Your apps. If you haven't created a web app
already, click the "</>" icon, name your app, and copy/paste the snippet.
Otherwise, go to Firebase SDK Snippet > click the "Config" radio button >
copy/paste.
*/
let CLIENT_CONFIG;
if (process.env.NODE_ENV === "development") {
  CLIENT_CONFIG = {
    apiKey: "AIzaSyAPs0ZfnjiTHbwSnRL8uAKg_YreE-UO9hw",
    authDomain: "portfolios-8be96.firebaseapp.com",
    projectId: "portfolios-8be96",
    storageBucket: "portfolios-8be96.appspot.com",
    messagingSenderId: "16573252337",
    appId: "1:16573252337:web:0ac27c09605e22a3ac1f50",
    measurementId: "G-VRDYJBBLMD",
  };
} else {
  CLIENT_CONFIG = {
    apiKey: "AIzaSyCYQF0Rbk9VWrpNHsXueq2zBzWEIZ95y5A",
    authDomain: "vernos-prod.firebaseapp.com",
    projectId: "vernos-prod",
    storageBucket: "vernos-prod.appspot.com",
    messagingSenderId: "450737488371",
    appId: "1:450737488371:web:bd5908be5d60c22747d286",
    measurementId: "G-Y5PTCYGQWC",
  };
}

if (typeof window !== "undefined" && !firebaseClient.apps.length) {
  firebaseClient.initializeApp(CLIENT_CONFIG);
  firebaseClient.analytics();
  firebaseClient
    .auth()
    .setPersistence(firebaseClient.auth.Auth.Persistence.LOCAL);
  window.firebase = firebaseClient;
}

export default firebaseClient;
