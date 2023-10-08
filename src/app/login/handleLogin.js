'use client'

import { checkUserAuthLevel } from './checkUserAuthLevel';
import React, {useEffect} from 'react';
import firebase from 'src/app/firebase.js';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import Button from "@/components/Button.js";

const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();
// const useStyles = makeStyles(styles);

export const handleLogin = async () => {
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