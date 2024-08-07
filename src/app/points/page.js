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
  const [authType, setAuthType] = useState('');


  useEffect(() => {
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
        // console.log(codesData.codes);
      }else{
        console.log("No document found");
      }
      // const codes = pointCodesSnapshot.docs.map(doc => doc.data().codes);
      // setPointCodes(codes);
    };

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
      // const activityPointsRef = doc(db, 'activityPoints', user.uid);

      try {
        // Check if the user document exists
        const userSnap = await getDoc(userRef);
        if (!userSnap.exists()) {
          // Create the document if it doesn't exist
          await setDoc(userRef, {
            name: user.displayName,
            activityPoints: 0,
            email: user.email,
            usedCodes: [],
            // Add any other initial fields you might need
          });
        }

        // Update user's activity points
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
    window.location.reload(); // Reload the page
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
      <div className="flex flex-col text-center items-center lg:items-center lg:text-center justify-center pt-7 lg:pt-0 lg:h-[45vh] py-2 px-5 md:px-20 space-y-[-25px]">
        <div className="container flex flex-col items-center mx-auto p-4 lg:m-24 bg-red-violet/50 rounded-lg w-3/12 h-36 border-2 border-red-700">
          <h1 className="text-2xl font-bold mb-4">Get Activity Points!</h1>
          {!codeVerified ? (
            <div>
              <input
                type="text"
                placeholder="Enter code"
                value={secretCode}
                onChange={(e) => setSecretCode(e.target.value)}
                className="border p-2 rounded text-black focus:outline-none"
              />
              <button onClick={verifyCode} className="ml-2 p-2 bg-dark-chocolate text-white rounded-lg border-2 border-red-900">
                Verify Code
              </button>
              {errorMessage && <p className=" text-red-500">{errorMessage}</p>}
            </div>
          ) : (
            <button onClick={addActivityPoint} className="p-2 bg-watermelon-red text-white rounded-lg border-2 border-red-200">
              Receive Activity Point
            </button>
          )}
        </div>
        <div className="">
          {(authType === 'officer' || authType === 'tech')  && (
              <div className="">
                <button className="p-2 bg-green-500 text-white rounded">
                  Officer Only Button
                </button>
              </div>
          )}
        </div>
      </div>
      <Footer />
    </main>
    </>
  );
}
