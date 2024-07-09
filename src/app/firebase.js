// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore} from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAnEdac3nzGAvOk8f02OiU0Z2ksT0EDk54",
  authDomain: "homesteadfbla-31a97.firebaseapp.com",
  databaseURL: "https://homesteadfbla-31a97.firebaseio.com",
  projectId: "homesteadfbla-31a97",
  storageBucket: "homesteadfbla-31a97.appspot.com",
  messagingSenderId: "385805863705",
  appId: "1:385805863705:web:8278e9754c52f5304a9388",
  measurementId: "G-4T4K9853Z6",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { auth };



