"use client"; // This must be at the very top of the file

import React, { useEffect } from 'react';
import { getAuth, signInWithPopup, GoogleAuthProvider } from 'firebase/auth';
import { getFirestore, collection, query, where, getDocs } from 'firebase/firestore';
import firebase from 'src/app/firebase'; // Adjust the path as per your project structure
import Image from 'next/image';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import Arnav from '../../../public/static/officers.jpg';

const auth = getAuth();
const provider = new GoogleAuthProvider();
const db = getFirestore();

const LoginPage = () => {
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(async (user) => {
      if (user) {
        const userDoc = await checkIfUser(user);
        if (userDoc) {
          console.log('User authenticated and found:', userDoc);
          // Redirect to home screen
          window.location.href = '/';
        } else {
          console.log('User not found in database.');
          // Optionally sign out user if not found in the database
          await auth.signOut();
        }
      }
    });

    return () => unsubscribe();
  }, []);

  const handleGoogleSignIn = async () => {
    try {
      const result = await signInWithPopup(auth, provider);
      const user = result.user;
      // Optionally, you can perform further checks or actions after login
      console.log('Signed in user:', user);
    } catch (error) {
      console.error('Error signing in with Google:', error);
    }
  };

  const checkIfUser = async (user) => {
    try {
      const q = query(collection(db, 'users'), where('email', '==', user.email));
      const querySnapshot = await getDocs(q);
      let userData = null;
      querySnapshot.forEach((doc) => {
        userData = doc.data();
      });
      return userData;
    } catch (error) {
      console.error('Error checking user in database:', error);
      return null;
    }
  };

  return (
    <main>
      <Image
        src={Arnav}
        className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
        draggable={false}
      />
      <Nav />
      <main className="lg:flex justify-evenly">
        <div className="flex flex-col text-center items-center lg:items-center lg:text-center justify-center pt-7 lg:pt-0 lg:h-[45vh] py-2 px-5 md:px-20 space-y-[-25px]">
          <div className="bg-watermelon-red p-5 rounded-2xl text-2xl lg:text-2xl font-semibold lg:mt-10 lg:w-full px-8 z-10">
          <h1 className="mb-2" >
            Login to HHS FBLA!
          </h1>
          <p className="text-base text-gray-300 mb-0">*Use you school email</p>
          </div>
          <div className="bg-watermelon-red p-10 rounded-2xl w-50 justify-center bg-opacity-75">
            <button
              onClick={handleGoogleSignIn}
              className="border-2 mt-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 rounded-xl w-full text-white px-10 shadow-xl transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.02 0 5.64 1.04 7.75 2.73l5.75-5.75C33.96 3.27 29.24 1 24 1 14.55 1 6.81 6.73 3.5 15h7.18c2.11-4.93 7-8.5 13.32-8.5z"
                />
                <path
                  fill="#34A853"
                  d="M9.92 24c0-1.61.3-3.17.84-4.59H3.5C2.53 20.58 2 22.23 2 24c0 1.77.53 3.42 1.5 4.59l7.27-7.27C10.22 21.17 9.92 22.39 9.92 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 38.5c-3.03 0-5.8-1.05-7.96-2.78L9.3 41.96C13.02 45.45 18.28 47.5 24 47.5c5.23 0 9.96-2.27 13.3-5.77l-5.75-5.75c-2.11 1.69-4.73 2.73-7.75 2.73z"
                />
                <path
                  fill="#EA4335"
                  d="M41.99 20.27H24v7.46h10.33c-1.02 2.58-2.84 4.56-5.12 5.75l5.75 5.75c3.37-3.17 5.54-7.74 5.54-13.21 0-1.78-.27-3.47-.73-5z"
                />
              </svg>
               Login with Google
            </button>
            {/* <button
              onClick={handleGoogleSignIn}
              className="border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 rounded-xl w-full text-white 
              py-2 px-10 shadow-md transition-colors"
            >
              <svg className="w-5 h-5 mr-2" viewBox="0 0 48 48">
                <path
                  fill="#4285F4"
                  d="M24 9.5c3.02 0 5.64 1.04 7.75 2.73l5.75-5.75C33.96 3.27 29.24 1 24 1 14.55 1 6.81 6.73 3.5 15h7.18c2.11-4.93 7-8.5 13.32-8.5z"
                />
                <path
                  fill="#34A853"
                  d="M9.92 24c0-1.61.3-3.17.84-4.59H3.5C2.53 20.58 2 22.23 2 24c0 1.77.53 3.42 1.5 4.59l7.27-7.27C10.22 21.17 9.92 22.39 9.92 24z"
                />
                <path
                  fill="#FBBC05"
                  d="M24 38.5c-3.03 0-5.8-1.05-7.96-2.78L9.3 41.96C13.02 45.45 18.28 47.5 24 47.5c5.23 0 9.96-2.27 13.3-5.77l-5.75-5.75c-2.11 1.69-4.73 2.73-7.75 2.73z"
                />
                <path
                  fill="#EA4335"
                  d="M41.99 20.27H24v7.46h10.33c-1.02 2.58-2.84 4.56-5.12 5.75l5.75 5.75c3.37-3.17 5.54-7.74 5.54-13.21 0-1.78-.27-3.47-.73-5z"
                />
              </svg>
              Admin Login
            </button> */}
          </div>
        </div>
      </main>
      <Footer />
    </main>
  );
};

export default LoginPage;