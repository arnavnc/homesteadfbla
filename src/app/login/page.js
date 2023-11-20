'use client'

import React, {useContext, useEffect, useState} from 'react';
import firebase from 'src/app/firebase.js';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider, onAuthStateChanged } from "firebase/auth";
import { useRouter } from 'next/router';
import Image from 'next/image';
import Arnav from '../../../public/static/officers.jpg'
import {UserAuth} from "src/app/context/AuthContext.js"
// import { makeStyles } from "@material-ui/core/styles";

import Nav from "@/components/nav";
import Footer from "@/components/footer.js";
import { SYSTEM_ENTRYPOINTS } from 'next/dist/shared/lib/constants';
import { setUserId } from 'firebase/analytics';
// import Button from "@/components/Button.js";

// const auth = getAuth(firebase);
// const provider = new GoogleAuthProvider();


// const useStyles = makeStyles(styles);

export default function LoginPageComponent(props) {

//     const {user, googleSignIn, logOut } = UserAuth();
//     const [loading, setLoading] = useState(true);  

//   const handleSignIn = async () => {
//     try {
//       await googleSignIn()
//     } catch(error) {
//       console.log(error);
//     }
//   }

//   const handleSignOut = async () => {
//     try {
//       await logOut();
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   useEffect(() => {
//     const checkAuthentication = async () => {
//       await new Promise((resolve) => setTimeout(resolve, 50));
//       setLoading(false);
//     };
//     checkAuthentication();
//   }, [user]);

  return (
      <div>
      <Image src={Arnav} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]" draggable={false}/>
      <Nav />
      <div className='flex justify-center mt-10'>
          <div className="border-2 rounded-md border-red-600 bg-red-600 bg-opacity-10 px-4 py-3
          flex flex-col w-fit">
          <h1 className="text-lg font-bold text-red-600 flex justify-center">Login</h1>
          { <p className='flex justify-center'>Please click the button below to sign in with Google:</p> }

          <div className='flex flex-row justify-between mx-4 gap-x-5'>

              <div className='bg-red-900 h-fit mt-4 rounded-2xl'>
              <div className=' backdrop-blur-xl rounded-2xl'>
                  <button 
                //   onClick={handleSignIn}
                  className='bg-red-900 p-4 rounded-2xl 
                  lg:hover:translate-x-[-10px] lg:hover:translate-y-4 ease-linear duration-200'
                  >
                  Member Login
                  </button>
              </div>
              </div>

              {/* <div className='bg-watermelon-red h-fit mt-4 rounded-2xl'>
              <div className=' backdrop-blur-md rounded-2xl'>
                  <button 
                  onClick={handleSignIn}
                  className='bg-watermelon-red py-4 px-5 rounded-2xl 
                  lg:hover:translate-x-[10px] lg:hover:translate-y-4 ease-linear duration-200'
                  >
                  Admin Login
                  </button>
              </div>
              </div> */}
                
          </div>

          </div>
      </div>
      <Footer />
      </div>
  );
}

/*
const handleLogin = async () => {
    console.log("Member Login button clicked");
      try {
        await signInWithGoogle();
        // User is now logged in
        // Check user's authLevel
        const user = auth.currentUser;
        if (user) {
          const authLevel = await checkUserAuthLevel(user.uid);
          if (authLevel === "member") {
              console.log("MEMBER");
            // User is a member, you can proceed
  
          } else if (authLevel === "ERROR") {
            console.error("ERROR: User is an admin.");
          } else {
            console.error("UNKNOWN: Auth level not recognized.");
          }
        }
      } catch (error) {
        console.error("Error signing in:", error);
      }
};
*/

