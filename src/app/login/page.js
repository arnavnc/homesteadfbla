'use client'

import React, { useEffect } from 'react';
import firebase from 'src/app/firebase.js';
import { useRouter } from 'next/navigation';

import Nav from "@/components/nav";
import Footer from "@/components/footer.js";


export default function Login() {
  const router = useRouter();

  // Define the signInWithGoogle function
  const signInWithGoogle = async () => {
    const provider = new firebase.auth.GoogleAuthProvider();

    try {
      const result = await firebase.auth().signInWithPopup(provider);
      // Redirect to the desired page after successful login
      router.push('/dashboard'); // Change to your desired destination
    } catch (error) {
      console.error('Google authentication failed:', error);
    }
  };

  useEffect(() => {
    
  }, []);

  return (
    <div>
      <Nav />
      <div className="border-2  rounded-md border-purple-600 bg-purple-600 bg-opacity-10 px-4 py-3">
        <h1 className="text-lg font-bold text-purple-600">Login</h1>
        <p>Please click the button below to sign in with Google:</p>
        <button type="button" onClick={signInWithGoogle}>
          Sign in with Google
        </button>
      </div>
      <Footer />
    </div>
  );
}
