"use client";

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, getDocs, where } from 'firebase/firestore';
import { auth } from '@/app/firebase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("1");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userPlacement, setUserPlacement] = useState(null);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  useEffect(() => {
    const fetchLeaderboardData = async () => {
      const db = getFirestore();
      const topUsersQuery = query(collection(db, 'activityPoints'), orderBy('activityPoints', 'desc'), limit(5));
      const topUsersSnapshot = await getDocs(topUsersQuery);
      
      const topUsers = topUsersSnapshot.docs.map(doc => ({
        name: doc.data().name,
        activityPoints: doc.data().activityPoints,
        email: doc.data().email
      }));
      
      setLeaderboardData(topUsers);

      if (user && !topUsers.some(u => u.email === user.email)) {
        const userQuery = query(collection(db, 'activityPoints'), where('email', '==', user.email));
        const userSnapshot = await getDocs(userQuery);
        
        if (!userSnapshot.empty) {
          const userDoc = userSnapshot.docs[0];
          const userData = {
            name: userDoc.data().name,
            activityPoints: userDoc.data().activityPoints,
            email: userDoc.data().email
          };

          const allUsersQuery = query(collection(db, 'activityPoints'), orderBy('activityPoints', 'desc'));
          const allUsersSnapshot = await getDocs(allUsersQuery);
          const allUsers = allUsersSnapshot.docs.map(doc => doc.data().email);
          const userRank = allUsers.indexOf(userData.email) + 1;

          setUserPlacement({ ...userData, rank: userRank });
        }
      }
    };

    fetchLeaderboardData();
  }, [user]);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const eventsData = [
    { title: 'Event 1', date: '2024-08-10', description: 'Description for event 1' },
    { title: 'Event 2', date: '2024-08-15', description: 'Description for event 2' },
    { title: 'Event 3', date: '2024-08-20', description: 'Description for event 3' },
    { title: 'Event 4', date: '2024-08-25', description: 'Description for event 4' },
  ];

  const EventCard = ({ title, date, description }) => (
    <div className="bg-melon p-4 rounded-lg shadow-md mb-4">
      <h3 className="text-xl font-semibold text-dark-chocolate">{title}</h3>
      <p className="text-sm text-red-violet">{date}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center p-0 rounded-lg pb-0">
      {user ? (
        <div className="flex flex-col items-center bg-warm-beige 
        w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 h-5/6 rounded-lg pt-10 mt-14 shadow-2xl border-4 
        border-red-violet bg-watermelon-red bg-opacity-75">
          <div className="flex justify-center">
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full border-2 border-dark-chocolate shadow-md" />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-dark-chocolate">{user.displayName}</h2>
            <p className="text-dark-chocolate">{user.email}</p>
          </div>
          <div className="w-full mt-6">
            <TabContext value={value}>
              <Box>
                <Tabs 
                  value={value} 
                  onChange={handleChange} 
                  variant="fullWidth" 
                  textColor="primary" 
                  indicatorColor="primary"
                >
                  <Tab label="Activity Points" value="1" />
                  <Tab label="Upcoming Events" value="2" />
                  <Tab label="Other" value="3" />
                </Tabs>
              </Box>
              <Box className="mt-4">

                <TabPanel value="1">
                  <div className="space-y-2">
                    {leaderboardData.map((item, index) => (
                      <>
                      <div key={index} className="flex justify-between p-2 bg-red-violet text-warm-beige rounded-lg shadow-md">
                        <span><strong>{index +1}</strong> - {item.name}</span>
                        <span>{item.activityPoints} pts</span>
                      </div>
                      </>
                    ))}

                    {userPlacement && (
                      <>
                      <div className="flex justify-center">
                        <span>...</span>
                      </div>
                      <div className="flex justify-between p-2 bg-red-violet text-warm-beige rounded-lg shadow-md">
                        <span ><strong>{userPlacement.rank}</strong> - {userPlacement.name}</span>
                        <span>{userPlacement.activityPoints} pts</span>
                      </div>
                      </>
                    )}
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  <div className="space-y-4">
                    {eventsData.map((event, index) => (
                      <EventCard 
                        key={index}
                        title={event.title}
                        date={event.date}
                        description={event.description}
                      />
                    ))}
                  </div>
                </TabPanel>
                <TabPanel value="3">
                  <p>Other user information here.</p>
                </TabPanel>
              </Box>
            </TabContext>
          </div>
        </div>
      ) : (
        <p className="text-warm-beige text-lg">No user is logged in</p>
      )}
    </div>
  );
};

export default ProfileCard;
