"use client";
import { useState, useEffect, useMemo } from "react";
import {
  getFirestore,
  collection,
  query,
  getDocs,
  path,
  doc,
} from "firebase/firestore";
import firebase from "src/app/firebase.js";
// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

// Initialize Firebase

const conferences = ["Bay", "State", "Nationals"];
const years = [
  "1994",
  "1995",
  "1996",
  "1997",
  "1998",
  "1999",
  "2000",
  "2001",
  "2002",
  "2003",
  "2004",
  "2005",
  "2006",
  "2007",
  "2008",
  "2009",
  "2010",
  "2011",
  "2012",
  "2013",
  "2014",
  "2015",
  "2016",
  "2017",
  "2018",
  "2019",
  "2020",
  "2021",
  "2022",
  "2023",
];

const app = firebase;
const analytics = getAnalytics(app);
const CompetitionsHistory = () => {
  const [allData, setAllData] = useState([]);
  // const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    year: "",
    conference: "",
    event: "",
    name: "",
//    place: "",
  });

  // Fetch all data from Firestore once on component mount
  // Fetch all data from Firestore once on component mount
  useEffect(() => {
      const fetchData = async () => {
        const db = getFirestore();
        let results = [];

        for (let conference of conferences) {
          // need to get the collection confQuery, need to get the doc for the conference, and then need to get the list of collections of the years

          const confQueryCollection = collection(db, `confQuery`);
          const conferenceDocument = doc(confQueryCollection, `${conference}`);
          // let yearCollections = [];

          for (let year in years) {
            let yearCollection = await collection(
              conferenceDocument,
              `${years[year]}`
            );

            const eventDocs = await getDocs(yearCollection);

            for (let eventDoc of eventDocs.docs) {
              const data = eventDoc.data();
              results.push({
                ...data,
                year: years[year],
                conference,
              });
            }
          }
        }

        setAllData(results);
        // setFilteredData(results);
      };

      fetchData();
  }, []);

  const filteredData = useMemo(() => {
    return Object.values(searchTerm).some((term) => term.trim() !== "")
      ? allData.filter((item) =>
          item.year.includes(searchTerm.year) &&
          item.conference.includes(searchTerm.conference) &&
          item.event.includes(searchTerm.event) &&
          item.name.includes(searchTerm.name) 
          //&&
         // item.place.toString().includes(searchTerm.place)
        )
      : [];
  }, [searchTerm]);

  // Filter data based on search terms
  // useEffect(() => {
  //   const filterData = () => {
  //     // console.log("is number or string?");
  //     const newFilteredData = allData.filter(
  //       (item) => 
  //         // (() => console.log(typeof item.place.toString()))
  //         (searchTerm.year ? item.year.includes(searchTerm.year) : true) &&
  //         (searchTerm.conference
  //           ? item.conference.includes(searchTerm.conference)
  //           : true) &&
  //         (searchTerm.event ? item.event.includes(searchTerm.event) : true) &&
  //         (searchTerm.name ? item.name.includes(searchTerm.name) : true) &&
  //         (searchTerm.place ? item.place.toString().includes(searchTerm.place) : true)
  //     );

  //     // console.log("place".includes("a"));
  //     // console.log(typeof item.place);

  //     // console.log(newFilteredData);
  //     setFilteredData(newFilteredData);
  //   };

  //   filterData();
  // }, [searchTerm]);


  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };

  console.log("Filtered Data");
  console.log(filteredData);

  console.log("All Data");
  console.log(allData);

  console.log("search term");
  console.log(searchTerm);

  return (
    <div>
      <div class = "w-full space-x-3">
        <input
          className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
          outline-none"
          type="text"
          name="year"
          placeholder="Search by Year"
          onChange={handleInputChange}
        />
        <input
          className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 outline-none"
          type="text"
          name="conference"
          placeholder="Search by Conference"
          onChange={handleInputChange}
        />
        <input
          className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
          outline-none"
          type="text"
          name="event"
          placeholder="Search by Event"
          onChange={handleInputChange}
        />
        <input
          className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
          outline-none"
          type="text"
          name="name"
          placeholder="Search by Name"
          onChange={handleInputChange}
        />
        {/* <input
          className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 
          outline-none"
          type="text"
          name="place"
          placeholder="Search by Place"
          onChange={handleInputChange}
        /> */}
      </div>
      <div className="">
        <div>
          <div className="flex flex-row space-x-[160px]">
            <div>Year</div>
            <div className="pl-14">Conference</div>
            <div className="ml-[-1rem]">Event</div>
            <div className="pl-12">Name</div>
            {/* <div className="pl-10">Place</div> */}
          </div>
        </div>
        <div>
          {filteredData.length > 0 &&
            filteredData.map((item, index) => (
              <tr key={index}>
                <td>{item.year}</td>
                <td>{item.conference}</td>
                <td>{item.event}</td>
                <td>{item.name}</td>
                {/* <td>{item.place}</td> */}
              </tr>
            ))}
        </div>
      </div>
    </div>
  );
};

export default CompetitionsHistory;
