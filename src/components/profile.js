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

  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue)
  }

  return (
    <div className="flex flex-col items-center p-0 rounded-lg h-screen pb-0">
      {user ? (
        <>
        <div className="flex flex-col items-center bg-white bg-opacity-50 w-9/12 h-5/6 rounded-lg pt-10 mt-14 drop-shadow-xl border-4">
          <div className="flex justify-center">
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full"/>
          </div>
          <div>
            <h2 className="mt-4 text-2xl font-semibold text-center">{user.displayName}</h2>
            <p className="text-gray-500 text-center">{user.email}</p>
            {/* <p className="text-gray-500 text-center">Member</p> */}
          </div>
          <div> 
            <TabContext 
              value={value} 
              // sx = {{
              //   "& button:hover": {backgroundColor: 'white'}
              // }}
            >
              <Box alignItems="center">
                <Tabs value = {value} onChange={handleChange} variant="scrollable" scrollButtons={true} allowScrollButtonsMobile>
                  <Tab label= "Activity Points" value="1"/>
                  <Tab label= "Upcoming Events" value="2"/>
                  <Tab label= "Other" value="3"/>
                </Tabs>
              </Box>
              <Box>
                <TabPanel value="1">Item One</TabPanel>
                <TabPanel value="2">Item Two</TabPanel>
                <TabPanel value="3">Item Three</TabPanel>
              </Box>
            </TabContext>
          </div>
        </div>
        </>
      ) : (
        <p className="text-gray-500">No user is logged in</p>
      )}
    </div>
  );
};

export default ProfileCard;
