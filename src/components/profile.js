"use client";

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/app/firebase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [value, setValue] = useState("1");

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

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const leaderboardData = [
    { name: 'John Doe', points: 150 },
    { name: 'Jane Smith', points: 140 },
    { name: 'Bob Johnson', points: 130 },
    { name: 'Alice Davis', points: 120 },
    { name: 'Chris Brown', points: 110 },
  ];

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
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full border-4 border-gray-300 shadow-md" />
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
                      <div key={index} className="flex justify-between p-2 bg-red-violet text-warm-beige rounded-lg shadow-md">
                        <span>{item.name}</span>
                        <span>{item.points} pts</span>
                      </div>
                    ))}
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