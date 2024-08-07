"use client";
import Arnav from "../../../public/static/officers.jpg";
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, getDoc, setDoc, collection, getDocs, increment } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Nav from '@/components/nav';
import Footer from '@/components/footer';
import { reload } from 'firebase/auth';

export default function PointsPage() {
  const [user, loading, error] = useAuthState(auth);
  const [secretCode, setSecretCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [usedCodes, setUsedCodes] = useState([]);
  const [pointCodes, setPointCodes] = useState([]);

  useEffect(() => {
    const fetchUsedCodes = async () => {
      if (user) {
        const userRef = doc(getFirestore(), 'Users', user.uid);
        const userSnap = await getDoc(userRef);
        if (userSnap.exists()) {
          setUsedCodes(userSnap.data().usedCodes || []);
        }
      }
    };

    const fetchPointCodes = async () => {
      const db = getFirestore();
      const pointCodesCollection = collection(db, 'pointCodes');
      const pointCodesSnapshot = await getDocs(pointCodesCollection);
      const codes = pointCodesSnapshot.docs.map(doc => doc.data().code);
      setPointCodes(codes);
    };

    fetchUsedCodes();
    fetchPointCodes();
  }, [user]);

  const verifyCode = () => {
    if (usedCodes.includes(secretCode)) {
      setErrorMessage('This code has been exhausted.');
    } else if (pointCodes.includes(secretCode)) {
      setCodeVerified(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid secret code.');
    }
  };

  const addActivityPoint = async () => {
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'Users', user.uid);
      const activityPointsRef = doc(db, 'activityPoints', user.uid);

      try {
        // Check if the user document exists
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          // Create the document if it doesn't exist
          await setDoc(userRef, {
            activityPoints: 0,
            usedCodes: [],
            // Add any other initial fields you might need
          });
        }

        // Update user's activity points
        await updateDoc(userRef, {
          activityPoints: increment(1),
          usedCodes: [...usedCodes, secretCode],
        });

        // Check if the activityPoints document exists
        const activityPointsSnap = await getDoc(activityPointsRef);
        if (!activityPointsSnap.exists()) {
          // Create the document if it doesn't exist
          await setDoc(activityPointsRef, {
            name: user.displayName,
            email: user.email,
            points: 0,
          });
        }

        // Add activity point to activityPoints collection
        await updateDoc(activityPointsRef, {
          points: increment(1),
        });

        console.log("Activity point added successfully.");
        setCodeVerified(false);
        setSecretCode('');
      } catch (e) {
        console.error("Error adding activity point: ", e);
      }
    }
    window.location.reload(); // Reload the page
  };

  return (
    <>
    <Image 
    src={Arnav} 
    className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
    draggable={false}
  />
    <div>
      <Nav />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Add Activity Point</h1>
        {!codeVerified ? (
          <div>
            <input
              type="text"
              placeholder="Enter secret code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              className="border p-2 rounded text-black focus:outline-none"
            />
            <button onClick={verifyCode} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Verify Code
            </button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        ) : (
          <button onClick={addActivityPoint} className="p-2 bg-indigo-500 text-white rounded">
            Add Activity Point
          </button>
        )}
      </div>
      <Footer />
    </div>
    </>
  );
}
