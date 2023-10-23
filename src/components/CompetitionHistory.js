"use client";
import { useState, useEffect, useMemo } from "react";
import { getFirestore, collection, query, getDocs } from "firebase/firestore";
import firebase from "src/app/firebase.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase
const app = firebase;
const analytics = getAnalytics(app);
const CompetitionsHistory = () => {
  const [allData, setAllData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    year: "",
    conference: "",
    event: "",
    name: "",
    place: "",
  });

  // Fetch all data from Firestore once on component mount
  // Fetch all data from Firestore once on component mount
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      const conferences = ["Bay", "State", "Nationals"];
      let results = [];

      for (let conference of conferences) {

        console.log(conference);

        // need to get the doc for the conference, then get the year from there
        // const conferenceCollection = collection(db, 'confQuery');
        // const conferenceDocs = getDocs(conferenceCollection);

        const yearsQuery = collection(db, `confQuery/${conference}/years`);
        const yearDocs = await getDocs(yearsQuery);

        console.log("got here1");
        console.log(yearsQuery);
        console.log(yearDocs);

        for (let yearDoc of yearDocs.docs) {
          console.log(yearDoc.name);

          console.log("got here");
          console.log(yearDoc);


          const eventsQuery = collection(
            db,
            `confQuery/${conference}/${yearDoc.id}`
          );
          const eventDocs = await getDocs(eventsQuery);

          for (let eventDoc of eventDocs.docs) {

            console.log(eventDoc);

            const data = eventDoc.data();
            results.push({
              ...data,
              year: yearDoc.id,
              conference,
            });
          }
        }
      }

      // console.log("results");
      // console.log(results);
      setAllData(results);
      setFilteredData(results);
    };

    fetchData();
  }, []);

  // Filter data based on search terms
  useEffect(() => {
    const filterData = () => {
      const newFilteredData = allData.filter(
        (item) =>
          (searchTerm.year ? item.year.includes(searchTerm.year) : true) &&
          (searchTerm.conference
            ? item.conference.includes(searchTerm.conference)
            : true) &&
          (searchTerm.event ? item.event.includes(searchTerm.event) : true) &&
          (searchTerm.name ? item.name.includes(searchTerm.name) : true) &&
          (searchTerm.place ? item.place.includes(searchTerm.place) : true)
      );
      setFilteredData(newFilteredData);
    };

    filterData();
  }, [searchTerm]);

  // const filteredData = useMemo(() => {
  //   return allData.filter(
  //     (item) =>
  //       (searchTerm.year ? item.year.includes(searchTerm.year) : true) &&
  //       (searchTerm.conference
  //         ? item.conference.includes(searchTerm.conference)
  //         : true) &&
  //       (searchTerm.event ? item.event.includes(searchTerm.event) : true) &&
  //       (searchTerm.name ? item.name.includes(searchTerm.name) : true) &&
  //       (searchTerm.place ? item.place.includes(searchTerm.place) : true)
  //   );
  // }, [allData, searchTerm]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };

  // console.log("hello1");
  // console.log(filteredData);
  // console.log("hello2");

  return (
    <div>
      <h1>Searchable Table</h1>
      <div>
        <input className = "text-black"
          type="text"
          name="year"
          placeholder="Search by Year"
          onChange={handleInputChange}
        />
        <input className = "text-black"
          type="text"
          name="conference"
          placeholder="Search by Conference"
          onChange={handleInputChange}
        />
        <input className = "text-black"
          type="text"
          name="event"
          placeholder="Search by Event"
          onChange={handleInputChange}
        />
        <input className = "text-black"
          type="text"
          name="name"
          placeholder="Search by Name"
          onChange={handleInputChange}
        />
        <input className = "text-black"
          type="text"
          name="place"
          placeholder="Search by Place"
          onChange={handleInputChange}
        />
      </div>
      <table>
        <thead>
          <tr>
            <th>Year</th>
            <th>Conference</th>
            <th>Event</th>
            <th>Name</th>
            <th>Place</th>
          </tr>
        </thead>
        <tbody>
          {filteredData.length > 0 && filteredData.map((item, index) => (
            <tr key={index}>
              <td>{item.year}</td>
              <td>{item.conference}</td>
              <td>{item.event}</td>
              <td>{item.name}</td>
              <td>{item.place}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CompetitionsHistory;
