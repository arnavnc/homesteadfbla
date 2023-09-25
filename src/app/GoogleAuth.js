// GoogleAuth.js

import React, { useEffect } from 'react';
import firebase from 'src/app/firebase.js';
import { useRouter } from 'next/router';


const GoogleAuth = () => {
  const router = useRouter();
  useEffect(() => {
    // Use Firebase to initiate the Google authentication process
    const provider = new firebase.auth.GoogleAuthProvider();

    firebase.auth()
      .signInWithPopup(provider)
      .then((result) => {
        // Redirect to the dashboard or another page upon successful login
        router.push('src/app/competitions/page.js'); // Change to your desired destination
      })
      .catch((error) => {
        // Handle authentication error
        console.error('Google authentication failed:', error);
      });
  }, []);

  return (
    <div>
      <p>Redirecting to Google Sign-In...</p>
    </div>
  );
};

export default GoogleAuth;
