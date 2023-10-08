'use client'

import firebase from 'src/app/firebase.js';
import { collection, query, where, getDocs, getFirestore } from "firebase/firestore";
import { getAuth, signInWithPopup, GoogleAuthProvider } from "firebase/auth";
// import Button from "@/components/Button.js";


const auth = getAuth(firebase);
const provider = new GoogleAuthProvider();
const firestore = getFirestore(firebase);
// const useStyles = makeStyles(styles);

export const checkUserAuthLevel = async (userId) => {
    try {
      const userDoc = await firestore.collection("users").doc(userId).get();
      if (userDoc.exists) {
        const authLevel = userDoc.data().authLevel;
        if (authLevel === "member") {
          // User is a member
          return "member";
        } else if (authLevel === "admin") {
          // User is an admin
          return "ERROR";
        }
      }
      // Handle case where user document doesn't exist or authLevel is not recognized
      return "UNKNOWN";
    } catch (error) {
      console.error("Error checking auth level:", error);
      return "ERROR";
    }
};