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
  const [activityName, setActivityName] = useState('');
  const [showFullText, setShowFullText] = useState(false); // New state for text visibility

  const fetchUsedCodes = async () => {
    if (user) {
      console.log(user)
      const userRef = doc(getFirestore(), 'activityPoints', user.uid);
      const userData = doc(getFirestore(), 'users', user.displayName);
      const userDataSnap = await getDoc(userData);
      const userSnap = await getDoc(userRef);
      if (userSnap.exists()) {
        const generalUserData = userDataSnap.data();
        console.log(generalUserData);
        setAuthType(generalUserData.authType);
        setUsedCodes(userSnap.data().usedCodes || []);
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
    window.location.href = '/profile';
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
      for (let i = 0; i < 4; i++) {
        result += characters.charAt(Math.floor(Math.random() * characters.length));
      }
    } while (pastCodes.includes(result));

    return result;
  };

  const addNewCodeToFirestore = async () => {
    if (!activityName.trim()) {
      setErrorMessage('Activity name is required');
      return;
    }

    const newCode = await generateRandomCode();
    const combinedCode = `${activityName.toUpperCase()}-${newCode}`;
    const db = getFirestore();
    const pointCodesRef = doc(db, 'pointCodes', 'Current Codes');
    const pastCodesRef = doc(db, 'pointCodes', 'Past Codes (Do not use again)');

    try {
      const pointCodesSnap = await getDoc(pointCodesRef);
      if (pointCodesSnap.exists()) {
        const currentCodes = pointCodesSnap.data().codes;
        let newCurrentCodes = [...currentCodes, combinedCode];
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

        setGeneratedCode(combinedCode);
        console.log("New code generated:", combinedCode);
      }
    } catch (e) {
      console.error("Error adding new code: ", e);
    }
    fetchPointCodes(); // Refresh the point codes
  };

  const toggleText = () => {
    setShowFullText(!showFullText);
  };

  return (
    <>
      <main className="flex flex-col min-h-screen">
        <Image 
          src={Arnav} 
          className="fixed bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
          draggable={false}
          alt="Background Image"
        />
        <Nav />
        <div className="flex flex-col text-center items-center justify-center flex-grow py-12 px-5 md:px-20 space-y-6 lg:space-y-12">
          <div className="container flex flex-col items-center mx-auto p-6 bg-red-violet/60 rounded-lg w-full sm:w-3/4 md:w-1/2 lg:w-1/3 border-2 border-watermelon-red/40 shadow-2xl">
            <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-white">Get Activity Points!</h1>
            {!codeVerified ? (
              <div className="flex flex-col items-center space-y-4 w-full">
                <input
                  type="text"
                  placeholder="Enter code"
                  value={secretCode}
                  onChange={(e) => setSecretCode(e.target.value)}
                  className="border p-2 rounded text-black placeholder:text-gray-700 focus:outline-none w-full bg-red-100/90"
                />
                <button 
                  onClick={verifyCode} 
                  className="p-2 bg-watermelon-red/75 text-white rounded-lg border border-red-900 
                  border-opacity-15 w-full hover:bg-watermelon-red/90 hover:brightness-110 duration-200">
                  Verify Code
                </button>
              </div>
            ) : (
              <button 
                onClick={addActivityPoint} 
                className="p-2 bg-watermelon-red text-white rounded-lg w-full hover:scale-105 duration-200">
                Click this to Receive Activity Point!
              </button>
            )}
            {errorMessage && <p className="text-red-500 mt-2">{errorMessage}</p>}
            {(authType === 'officer' || authType === 'tech') && (
              <div className="container flex flex-col bg-red-violet/40 border border-opacity-15 border-watermelon-red mt-8 px-5 py-6 rounded-lg shadow-xl">
                <h1 className="text-center mb-1 text-2xl sm:text-3xl font-bold text-white">For Officers</h1>
                <p className="text-white mt-2">
                  {showFullText 
                    ? `Use this to generate activity point codes.
                      Below you will need to first enter an activity name in an abbreviated form.
                      For example, Community Serivce Project Meeting 1 would be abbreviated as CSPM1. 
                      There is a limit of 4 active codes at one time. 
                      Please do not generate codes if you do not need them. 
                      Codes are case sensitive. 
                      Do not reuse codes for multiple events.` 
                    : ``}
                </p>
                {!showFullText && (
                  <button 
                    onClick={toggleText} 
                    className="text-red-200 hover:underline ease-linear duration-100 mt-2">
                    Click to Read Instructions
                  </button>
                )}
                {showFullText && (
                  <button 
                    onClick={toggleText} 
                    className="text-red-200 hover:underline ease-linear duration-100 mt-2">
                    Hide
                  </button>
                )}
                <div className="flex flex-col items-center space-y-4 w-full mt-4">
                  <input
                    type="text"
                    placeholder="ex. CSPM1 or GM1"
                    value={activityName}
                    onChange={(e) => setActivityName(e.target.value.replace(/\s/g, ''))}
                    className="border p-2 rounded text-black placeholder:text-gray-700 focus:outline-none w-full bg-red-100/90"
                  />
                  {/* <div className=""> */}
                    <button 
                      onClick={addNewCodeToFirestore} 
                      className="p-2 bg-red-violet text-white rounded w-full shadow-lg hover:scale-105 
                      hover:brightness-105 duration-150">
                      Generate new code
                    </button>
                    {generatedCode && (
                      <p className="text-white mt-2 flex flex-col">New code generated: <strong>{generatedCode}</strong></p>
                    )}
                  {/* </div> */}
                </div>
              </div>
            )}
          </div>
        </div>
        <Footer />
      </main>
    </>
  );
}