'use client'

import React from 'react';
import firebase from 'src/app/firebase.js';
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";

import Nav from "@/components/nav";
import Footer from "@/components/footer.js";

const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();

export default function Login() {
  // Define a function to handle signing in with Google
  const handleSignInWithGoogle = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // This gives you a Google Access Token. You can use it to access the Google API.
        const credential = GoogleAuthProvider.credentialFromResult(result);
        const token = credential.accessToken;
        // The signed-in user info.
        const user = result.user;
        // IdP data available using getAdditionalUserInfo(result)
        // ...
      })
      .catch((error) => {
        // Handle Errors here.
        const errorCode = error.code;
        const errorMessage = error.message;
        // The email of the user's account used.
        const email = error.customData.email;
        // The AuthCredential type that was used.
        const credential = GoogleAuthProvider.credentialFromError(error);
        // ...
      });
  };

  return (
    <div>
      <Nav />
      <div className="border-2  rounded-md border-purple-600 bg-purple-600 bg-opacity-10 px-4 py-3">
        <h1 className="text-lg font-bold text-purple-600">Login</h1>
        <p>Please click the button below to sign in with Google:</p>
        <button type="button" onClick={handleSignInWithGoogle}>
          Sign in with Google
        </button>
      </div>
      <Footer />
    </div>
  );
}
