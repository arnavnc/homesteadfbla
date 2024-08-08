"use client";
import Arnav from "../../../public/static/officers.jpg";
import Image from 'next/image';
import { useState, useEffect } from 'react';
import { getFirestore, doc, updateDoc, getDoc, setDoc, increment } from 'firebase/firestore';
import { useAuthState } from 'react-firebase-hooks/auth';
import { auth } from '../firebase';
import Nav from '@/components/nav';
import Footer from '@/components/footer';

export default function PointsPage() {
  const [user, loading, error] = useAuthState(auth);
  const [secretCode, setSecretCode] = useState('');
  const [codeVerified, setCodeVerified] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const [usedCodes, setUsedCodes] = useState([]);
  const [pointCodes, setPointCodes] = useState([]);
  const [authType, setAuthType] = useState('');
  const [generatedCode, setGeneratedCode] = useState('');
  const [showCurrentCodes, setShowCurrentCodes] = useState(false);
  const [showFullText, setShowFullText] = useState(false); // New state for text visibility

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
    if (pointCodesSnapshot.exists()) {
      const codesData = pointCodesSnapshot.data();
      setPointCodes(codesData.codes);
    } else {
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

  const generateRandomCode = async () => {
    const db = getFirestore();
    const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    let result = '';
    const pastCodesRef = doc(db, 'pointCodes', 'Past Codes (Do not use again)');
    let pastCodesSnap = await getDoc(pastCodesRef);
    const pastCodes = pastCodesSnap.exists() ? pastCodesSnap.data()["past codes"] : [];

    do {
      result = '';
      for (let i = 0; i < 5; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    } while (pastCodes.includes(result));

    return result;
  };

  const addNewCodeToFirestore = async () => {
    const newCode = await generateRandomCode();
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

  const toggleCurrentCodes = () => {
    setShowCurrentCodes(!showCurrentCodes);
  };

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <Image 
          src={Arnav} 
          className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
          draggable={false}
          alt="Background Image"
        />
        <Nav />
        <div className="flex flex-col text-center items-center justify-center flex-grow pt-7 lg:pt-0 py-2 px-5 md:px-20 space-y-4 lg:space-y-[-25px]">
          <div className="container flex flex-col items-center mx-auto p-4 lg:m-24 bg-red-violet/50 rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-3/12 h-auto lg:h-36 border-2 border-red-700 mb-14">
            <h1 className="text-xl sm:text-2xl font-bold mb-4">Get Activity Points!</h1>
            {!codeVerified ? (
              <div className="flex-row items-center">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="border p-2 rounded text-black focus:outline-none mb-2 sm:mb-0 sm:mr-2 w-full sm:w-auto"
                />
                <button 
                  onClick={verifyCode} 
                  className="p-2 bg-dark-chocolate text-white rounded-lg border-2 border-red-900 lg:mt-2 w-full sm:w-auto">
                  Verify Code
                </button>
              </div>
            ) : (
              <button 
                onClick={addActivityPoint} 
                className="p-2 bg-watermelon-red text-white rounded-lg w-full sm:w-auto">
                Click this to Receive Activity Point!
              </button>
            )}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
          </div>
          {(authType === 'officer' || authType === 'tech') && (
            <div className="container flex flex-col bg-melon/50 lg:w-3/12 h-auto px-5 py-8 rounded-lg border-2 border-red-300 my-20 pt-4">
              <h1 className="text-center mb-1 text-xl sm:text-2xl font-bold">For Officers</h1>
              <p>
                {showFullText 
                  ? `Use this to generate activity point codes. There is a limit of 4 active codes at one time. Please do not generate codes if you do not need them. Codes are case sensitive. Codes are shared among all officers, so only use codes you generated. Do not reuse codes for multiple events.` 
                  : ``}
              </p>
              {!showFullText && (
                <button 
                  onClick={toggleText} 
                  className="text-red-500">
                  Click to Expand
                </button>
              )}
              {showFullText && (
                <button 
                  onClick={toggleText} 
                  className="text-red-500">
                  Hide
                </button>
              )}
              <div className="flex justify-center space-x-6 w-full mt-4">
                <div className="text-center">
                  <button 
                    onClick={addNewCodeToFirestore} 
                    className="p-2 bg-red-violet text-white rounded w-full sm:w-auto shadow-xl">
                    Generate new code
                  </button>
                  {generatedCode && (
                    <p className="text-white mt-2">New code generated: <strong>{generatedCode}</strong></p>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>
        <Footer />
      </main>
    </>
  );
}