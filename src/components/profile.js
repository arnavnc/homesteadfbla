"use client";

import React, { useState, useEffect } from 'react';
import { onAuthStateChanged } from 'firebase/auth';
import { getFirestore, collection, query, limit, orderBy, getDocs, where, addDoc, updateDoc, doc, deleteDoc, setDoc } from 'firebase/firestore';
import { auth } from '@/app/firebase';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import TabPanel from '@mui/lab/TabPanel';
import TabContext from '@mui/lab/TabContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Modal from '@mui/material/Modal';
import { BiPencil, BiTrash } from "react-icons/bi";

const ProfileCard = () => {
  const [user, setUser] = useState(null);
  const [authType, setAuthType] = useState(null);
  const [value, setValue] = useState("1");
  const [leaderboardData, setLeaderboardData] = useState([]);
  const [userPlacement, setUserPlacement] = useState(null);
  const [eventsData, setEventsData] = useState([]);
  const [pastEventsData, setPastEventsData] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [newEvent, setNewEvent] = useState({ title: '', date: '', description: '' });
  const [editingEvent, setEditingEvent] = useState(null);
  const [showPastEvents, setShowPastEvents] = useState(false);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
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

  useEffect(() => {
    const fetchEvents = async () => {
      const db = getFirestore();

      // Fetch upcoming events
      const upcomingEventsRef = query(collection(db, 'upcomingEvents', 'upcoming', 'events'), orderBy('date', 'asc'));
      const upcomingQuerySnapshot = await getDocs(upcomingEventsRef);
      const upcomingEvents = upcomingQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

      setEventsData(upcomingEvents);
    };

    fetchEvents();
  }, []);

  const fetchPastEvents = async () => {
    const db = getFirestore();

    // Fetch past events
    const pastEventsRef = query(collection(db, 'upcomingEvents', 'past', 'events'), orderBy('date', 'asc'));
    const pastQuerySnapshot = await getDocs(pastEventsRef);
    const pastEvents = pastQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));

    setPastEventsData(pastEvents);
  };

  const handleTogglePastEvents = () => {
    if (!showPastEvents) {
      fetchPastEvents();
    }
    setShowPastEvents(!showPastEvents);
  };

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleOpenModal = (event = null) => {
    if (event) {
      setEditingEvent(event);
      setNewEvent({ title: event.title, date: event.date, description: event.description });
    } else {
      setEditingEvent(null);
      setNewEvent({ title: '', date: '', description: '' });
    }
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
    const db = getFirestore();

    if (editingEvent) {
      const eventRef = doc(db, 'upcomingEvents', 'upcoming', 'events', editingEvent.id);
      await updateDoc(eventRef, newEvent);

      setEventsData(prev => prev.map(e => (e.id === editingEvent.id ? { ...newEvent, id: editingEvent.id } : e)));
    } else {
      if (authType === "officer" || authType === "tech") {
        const newEventRef = await addDoc(collection(db, 'upcomingEvents', 'upcoming', 'events'), newEvent);
        setEventsData(prev => [{ ...newEvent, id: newEventRef.id }, ...prev]);
      }
    }

    handleCloseModal();
  };

  const handleDelete = async (eventId) => {
    const db = getFirestore();
    await deleteDoc(doc(db, 'upcomingEvents', 'upcoming', 'events', eventId));
    setEventsData(prev => prev.filter(e => e.id !== eventId));
  };

  const moveEventToPast = async (event) => {
    const db = getFirestore();
    const pastEventsRef = doc(db, 'upcomingEvents', 'past', 'events', event.id);

    // Add the event to the past document
    await setDoc(pastEventsRef, event);

    // Delete the event from the upcoming document
    await deleteDoc(doc(db, 'upcomingEvents', 'upcoming', 'events', event.id));

    setEventsData(prev => prev.filter(e => e.id !== event.id));
  };

  useEffect(() => {
    const checkAndMoveEvents = () => {
      const currentDate = new Date();

      eventsData.forEach(async (event) => {
        const eventDate = new Date(event.date);
        const eventDatePlusOne = new Date(eventDate);
        eventDatePlusOne.setDate(eventDate.getDate() + 1);

        if (eventDatePlusOne <= currentDate) {
          await moveEventToPast(event);
        }
      });
    };

    checkAndMoveEvents();
  }, [eventsData]);

  const EventCard = ({ event }) => (
    <div className="bg-melon p-4 rounded-lg hover:scale-[1.02] ease-linear duration-150 shadow-md mb-4 relative group">
      <h3 className="text-xl font-semibold text-dark-chocolate">{event.title}</h3>
      <p className="text-sm text-red-violet">{event.date}</p>
      <p className="text-gray-700">{event.description}</p>
      {(authType === "officer" || authType === "tech") && (
        <div className="absolute top-3 right-3 flex space-x-2 opacity-0 group-hover:opacity-100 transition-opacity duration-150">
          <BiPencil 
            className="text-dark-chocolate hover:text-red-violet cursor-pointer hover:scale-110 duration-200" 
            size={20} 
            onClick={() => handleOpenModal(event)} 
          />
          <BiTrash 
            className="text-dark-chocolate hover:text-red-violet cursor-pointer hover:scale-110 duration-200" 
            size={20} 
            onClick={() => handleDelete(event.id)} 
          />
        </div>
      )}
    </div>
  );

  return (
    <div className="flex flex-col items-center p-0 rounded-lg pb-0">
      {user ? (
        <div className="flex flex-col items-center w-11/12 md:w-8/12 lg:w-6/12 xl:w-4/12 h-5/6 
        rounded-lg pt-10 mt-5 shadow-2xl border-4 border-red-violet bg-watermelon-red bg-opacity-70">
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
                    '& .MuiTab-root': {
                      color: '#a0aec0', // Set the default color to gray
                    },
                    '& .Mui-selected': {
                      color: 'white !important', // Set the color of the selected tab to white
                    },
                  }}
                >
                  <Tab label="Activity Points" value="1" />
                  <Tab label="Upcoming Events" value="2" />
                  <Tab label="Contact" value="3" />
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
                      <Button 
                        variant="contained" 
                        sx={{
                          backgroundColor: '#B23A48', 
                          color: 'white',
                          '&:hover': {
                            backgroundColor: '#B23A48',
                          },
                        }}  
                        onClick={() => handleOpenModal()}
                      >
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
                          <h2>{editingEvent ? "Edit Event" : "Create New Event"}</h2>
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
                          <Button variant="contained" 
                          sx={{
                            backgroundColor: '#B23A48', 
                            color: 'white',
                            '&:hover': {
                              backgroundColor: '#B23A48',
                            },
                          }} 
                          color="primary" 
                          onClick={handleSubmit}>
                            {editingEvent ? "Update Event" : "Submit"}
                          </Button>
                        </Box>
                      </Modal>
                    </>
                  )}
                  
                  <div className="space-y-6 mt-4 mb-6">
                    {eventsData.length === 0 ? (
                      <p>No upcoming events.</p>
                    ) : (
                      eventsData.map((event, index) => (
                        <EventCard key={index} event={event} />
                      ))
                    )}
                  </div>
                  <div className="space-y-6 mt-4">
                  <Button 
                    variant="contained" 
                    sx={{
                      backgroundColor: '#B23A48', 
                      color: 'white',
                      '&:hover': {
                        backgroundColor: '#B23A48',
                      },
                    }} 
                    onClick={handleTogglePastEvents}
                  >
                    {showPastEvents ? "Hide Past Events" : "Show Past Events"}
                  </Button>
                    {showPastEvents && (
                      <>
                        {pastEventsData.length === 0 ? (
                          <p>No past events.</p>
                        ) : (
                          pastEventsData.map((event, index) => (
                            <EventCard key={index} event={event} />
                          ))
                        )}
                      </>
                    )}
                  </div>
                </TabPanel>
                <TabPanel value="3">
                <div className="space-y-3">
                  <div className="flex justify-between p-2 bg-red-violet text-white rounded-lg shadow-lg border border-dark-chocolate border-opacity-25">
                    <span><strong>President:</strong> <a href="mailto:sanghyuk.eric@gmail.com" target="_blank" rel="noopener noreferrer">sanghyuk.eric@gmail.com</a></span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-violet text-white rounded-lg shadow-lg border border-dark-chocolate border-opacity-25">
                    <span><strong>General Email:</strong> <a href="mailto:homesteadhighschool.fbla@gmail.com" target="_blank" rel="noopener noreferrer">homesteadhighschool.fbla@gmail.com</a></span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-violet text-white rounded-lg shadow-lg border border-dark-chocolate border-opacity-25">
                    <span><strong>Community Service:</strong> <a href="mailto:--" target="_blank" rel="noopener noreferrer">--</a></span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-violet text-white rounded-lg shadow-lg border border-dark-chocolate border-opacity-25">
                    <span><strong>American Enterprise:</strong> <a href="mailto:--" target="_blank" rel="noopener noreferrer">--</a></span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-violet text-white rounded-lg shadow-lg border border-dark-chocolate border-opacity-25">
                    <span><strong>Partnership with Business:</strong> <a href="mailto:--" target="_blank" rel="noopener noreferrer">--</a></span>
                  </div>
                  <div className="flex justify-between p-2 bg-red-violet text-white rounded-lg shadow-lg border border-dark-chocolate border-opacity-25">
                    <span><strong>Software Ventures:</strong> <a href="mailto:--" target="_blank" rel="noopener noreferrer">--</a></span>
                  </div>
                </div>
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