"use client";
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
    fetchUsedCodes();
  }, [user]);

  const verifyCode = () => {
    if (usedCodes.includes(secretCode)) {
      setErrorMessage('This code has been exhausted.');
    } else if (secretCode === 'Arhan') {
      setCodeVerified(true);
      setErrorMessage('');
    } else {
      setErrorMessage('Invalid secret code.');
    }
  };

  const addActivityPoint = async () => {
    if (user) {
      const userRef = doc(getFirestore(), 'Users', user.uid);
      const activityPointsRef = doc(getFirestore(), 'activityPoints', user.uid);
      
      // Update user's activity points
      await updateDoc(userRef, {
        activityPoints: increment(1),
        usedCodes: [...usedCodes, secretCode],
      });

      // Add activity point to activityPoints collection
      await setDoc(activityPointsRef, {
        name: user.displayName,
        email: user.email,
        points: increment(1),
      }, { merge: true });
      
      setCodeVerified(false);
      setSecretCode('');
    }
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error.message}</div>;

  return (
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
              className="border p-2 rounded"
            />
            <button onClick={verifyCode} className="ml-2 p-2 bg-blue-500 text-white rounded">
              Verify Code
            </button>
            {errorMessage && <p className="text-red-500">{errorMessage}</p>}
          </div>
        ) : (
          <button onClick={addActivityPoint} className="p-2 bg-green-500 text-white rounded">
            +1 Activity Point
          </button>
        )}
      </div>
      <Footer />
    </div>
  );
}
