"use client";

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, orderBy, limit, getDocs, where, addDoc, updateDoc, doc } from 'firebase/firestore';
import { auth } from '@/app/firebase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [authType, setAuthType] = useState(null);
  const [value, setValue] = useState("1");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userPlacement, setUserPlacement] = useState(null);
  const [eventsData, setEventsData] = useState([
    { title: 'Event 1', date: '2024-08-10', description: 'Description for event 1' },
    { title: 'Event 2', date: '2024-08-15', description: 'Description for event 2' },
    { title: 'Event 3', date: '2024-08-20', description: 'Description for event 3' },
    { title: 'Event 4', date: '2024-08-25', description: 'Description for event 4' },
  ]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
        // Assuming authType is stored in the user object, you may need to fetch it from Firestore if not.
        // setAuthType(user.authType);
        // Fetch authType from Firestore
        const fetchAuthType = async () => {
          const db = getFirestore();
          const userDoc = await getDocs(query(collection(db, 'users'), where('email', '==', user.email)));
          if (!userDoc.empty) {
            setAuthType(userDoc.docs[0].data().authType);
          }
        };
        fetchAuthType();
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

  const handleOpenModal = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleInputChange = (e) => {
    setNewEvent({
      ...newEvent,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async () => {
    if (authType === "officer" || authType === "tech") {
      const updatedEvents = [...eventsData];
      updatedEvents.pop(); // Remove the last event
      updatedEvents.unshift(newEvent); // Add the new event at the start
      setEventsData(updatedEvents);

      // Update Firestore or any other database accordingly
      const db = getFirestore();
      await addDoc(collection(db, 'events'), newEvent);

      handleCloseModal();
    }
  };

  const EventCard = ({ title, date, description }) => (
    <div className="bg-melon p-4 rounded-lg hover:animate-pulse ease-linear duration-150 shadow-md mb-4">
      <h3 className="text-xl font-semibold text-dark-chocolate">{title}</h3>
      <p className="text-sm text-red-violet">{date}</p>
      <p className="text-gray-700">{description}</p>
    </div>
  );

  return (
    <div className="flex flex-col items-center p-0 rounded-lg pb-0">
      {user ? (
        <div className="flex flex-col items-center bg-warm-beige 
        w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 h-5/6 rounded-lg pt-10 mt-5 shadow-2xl border-4 
        border-red-violet bg-watermelon-red bg-opacity-70">
          <div className="flex justify-center">
            <img src={user.photoURL} alt="Profile" className="w-24 h-24 rounded-full border-2 border-dark-chocolate border-opacity-30 shadow-md" />
          </div>
          <div className="text-center mt-4">
            <h2 className="text-2xl font-semibold text-gray-200">{user.displayName}</h2>
            <p className="text-gray-300">{user.email}</p>
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
                  sx={{
                    '& .MuiTabs-indicator': {
                      backgroundColor: 'white',
                    },
                    '& .Mui-selected': {
                      color: 'white !important',
                    },
                  }}
                >
                  <Tab label="Activity Points" value="1" />
                  <Tab label="Upcoming Events" value="2" />
                  <Tab label="Other" value="3" />
                </Tabs>
              </Box>
              <Box className="mt-4">
                <TabPanel value="1">
                  <div className="space-y-3">
                    {leaderboardData.map((item, index) => (
                      <div 
                        key={index} 
                        className={`flex justify-between p-2 ${item.email === user.email ? 'bg-red-400 bg-opacity-30' : 'bg-red-violet'} text-white rounded-lg 
                        shadow-lg border border-dark-chocolate border-opacity-25`}>
                        <span><strong>{index + 1}</strong> - {item.name}</span>
                        <span>{item.activityPoints} pts</span>
                      </div>
                    ))}

                    {userPlacement && !leaderboardData.some(u => u.email === user.email) && (
                      <>
                        <div className="flex justify-center">
                          <span>...</span>
                        </div>
                        <div className="flex justify-between p-2 bg-red-400 bg-opacity-30 text-white rounded-lg shadow-lg
                         border border-dark-chocolate border-opacity-25">
                          <span ><strong>{userPlacement.rank}</strong> - {userPlacement.name}</span>
                          <span>{userPlacement.activityPoints} pts</span>
                        </div>
                      </>
                    )}
                  </div>
                </TabPanel>
                <TabPanel value="2">
                  {(authType === "officer" || authType === "tech") && (
                    <>
                      <Button variant="contained" color="primary" onClick={handleOpenModal}>
                        Create New Event
                      </Button>
                      <Modal
                        open={isModalOpen}
                        onClose={handleCloseModal}
                        aria-labelledby="simple-modal-title"
                        aria-describedby="simple-modal-description"
                      >
                        <Box
                          sx={{
                            position: 'absolute',
                            top: '50%',
                            left: '50%',
                            transform: 'translate(-50%, -50%)',
                            width: 400,
                            bgcolor: 'background.paper',
                            border: '2px solid #000',
                            boxShadow: 24,
                            p: 4,
                          }}
                        >
                          <h2>Create New Event</h2>
                          <TextField
                            fullWidth
                            label="Title"
                            name="title"
                            value={newEvent.title}
                            onChange={handleInputChange}
                            margin="normal"
                          />
                          <TextField
                            fullWidth
                            label="Date"
                            name="date"
                            value={newEvent.date}
                            onChange={handleInputChange}
                            margin="normal"
                            type="date"
                            InputLabelProps={{
                              shrink: true,
                            }}
                          />
                          <TextField
                            fullWidth
                            label="Description"
                            name="description"
                            value={newEvent.description}
                            onChange={handleInputChange}
                            margin="normal"
                          />
                          <Button variant="contained" color="primary" onClick={handleSubmit}>
                            Submit
                          </Button>
                        </Box>
                      </Modal>
                    </>
                  )}
                  
                  <div className="space-y-6 mt-4">
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
        <p className="text-black text-opacity-5 text-lg">...</p>
      )}
    </div>
  );
};

export default ProfileCard;
