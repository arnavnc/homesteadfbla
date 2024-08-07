"use client";
import Arnav from "../../../public/static/officers.jpg";
import Image from 'next/image'
import { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, getDoc, setDoc, increment } from 'firebase/firestore';
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
  const [authType, setAuthType] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');

  const fetchUsedCodes = async () => {
    if (user) {
      const userRef = doc(getFirestore(), 'activityPoints', user.uid);

      const userData = doc(getFirestore(), 'users', user.displayName);

      const userDataSnap = await getDoc(userData);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const generalUserData = userDataSnap.data();
        setAuthType(generalUserData.authType);
        setUsedCodes(userSnap.data().usedCodes || []);
        console.log(generalUserData.authType);
      }
    }
  };

  const fetchPointCodes = async () => {
    const db = getFirestore();
    const pointCodesCollection = doc(db, 'pointCodes', 'Current Codes');
    const pointCodesSnapshot = await getDoc(pointCodesCollection);
    if(pointCodesSnapshot.exists()){
      const codesData = pointCodesSnapshot.data();
      setPointCodes(codesData.codes);
    }else{
      console.log("No document found");
    }
  };

  useEffect(() => {
    fetchUsedCodes();
    fetchPointCodes();
  }, [user]);

  const verifyCode = () => {
    if (usedCodes.includes(secretCode)) {
      setErrorMessage('This code has been used already');
    } else if (pointCodes.includes(secretCode)) {
      setCodeVerified(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid code');
    }
  };

  const addActivityPoint = async () => {
    if (user) {
      const db = getFirestore();
      const userRef = doc(db, 'activityPoints', user.uid);

      try {
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          await setDoc(userRef, {
            name: user.displayName,
            activityPoints: 0,
            email: user.email,
            usedCodes: [],
          });
        }

        await updateDoc(userRef, {
          activityPoints: increment(1),
          usedCodes: [...usedCodes, secretCode],
        });

        console.log("Activity point added successfully.");
        setCodeVerified(false);
        setSecretCode('');
      } catch (e) {
        console.error("Error adding activity point: ", e);
      }
    }
    window.location.reload();
  };

  const generateRandomCode = () => {
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    for (let i = 0; i < 5; i++) {
      result += characters.charAt(Math.floor(Math.random() * characters.length));
      if(!pastCodesSnap.includes(result)){
        return result;
      }else{
        generateRandomCode();
      }
    }

  };

  const addNewCodeToFirestore = async () => {
    const newCode = generateRandomCode();
    const db = getFirestore();
    const pointCodesRef = doc(db, 'pointCodes', 'Current Codes');
    const pastCodesRef = doc(db, 'pointCodes', 'Past Codes (Do not use again)');

    try {
      const pointCodesSnap = await getDoc(pointCodesRef);
      if (pointCodesSnap.exists()) {
        const currentCodes = pointCodesSnap.data().codes;
        let newCurrentCodes = [...currentCodes, newCode];
        let newPastCodes = [];

        if (newCurrentCodes.length > 4) {
          const removedCode = newCurrentCodes.shift();
          console.log("Removed code:", removedCode);
          const pastCodesSnap = await getDoc(pastCodesRef);
          if (pastCodesSnap.exists()) {
            newPastCodes = pastCodesSnap.data()["past codes"] || [];
            newPastCodes.push(removedCode);
          } else {
            newPastCodes = [removedCode];
          }
          await setDoc(pastCodesRef, {
            "past codes": newPastCodes
          }, { merge: true });
          console.log("Updated past codes:", newPastCodes);
        }

        await updateDoc(pointCodesRef, {
          codes: newCurrentCodes
        });
        console.log("Updated current codes:", newCurrentCodes);

        setGeneratedCode(newCode);
        console.log("New code generated:", newCode);
      }
    } catch (e) {
      console.error("Error adding new code: ", e);
    }
    fetchPointCodes(); // Refresh the point codes
  };

  return (
    <>
  <main>
    <Image 
      src={Arnav} 
      className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
      draggable={false}
    />
    <Nav />
    <div className="flex flex-col text-center items-center justify-center pt-7 lg:pt-0 lg:h-[45vh] py-2 px-5 md:px-20 space-y-4 lg:space-y-[-25px]">
      <div className="container flex flex-col items-center mx-auto p-4 lg:m-24 bg-red-violet/50 rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-3/12 h-auto lg:h-36 border-2 border-red-700">
        <h1 className="text-xl sm:text-2xl font-bold mb-4">Get Activity Points!</h1>
        {!codeVerified ? (
          <div className="flex flex-col sm:flex-row items-center">
            <input
              type="text"
              placeholder="Enter code"
              value={secretCode}
              onChange={(e) => setSecretCode(e.target.value)}
              className="border p-2 rounded text-black focus:outline-none mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
            />
            <button 
              onClick={verifyCode} 
              className="p-2 bg-dark-chocolate text-white rounded-lg border-2 border-red-900 lg:mt-0 w-full sm:w-auto">
              Verify Code
            </button>
          </div>
        ) : (
          <button 
            onClick={addActivityPoint} 
            className="p-2 bg-watermelon-red text-white rounded-lg border-2 border-red-200 w-full sm:w-auto">
            Click this to Receive Activity Point!
          </button>
        )}
        {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
      </div>
      {(authType === 'officer' || authType === 'tech')  && (
        <div className="mt-4">
          <button 
            onClick={addNewCodeToFirestore} 
            className="p-2 bg-green-500 text-white rounded w-full sm:w-auto">
            Generate new code
          </button>
          {generatedCode && (
            <p className="text-green-500 mt-2">New code generated: {generatedCode}</p>
          )}
        </div>
      )}
    </div>
    <Footer />
  </main>
</>

  );
}