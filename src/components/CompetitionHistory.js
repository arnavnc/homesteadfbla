"use client";
import { useState, useEffect, useMemo } from "react";
import {
  getFirestore,
  collection,
  getDocs,
} from "firebase/firestore";
import firebase from "src/app/firebase.js";
import { getAnalytics } from "firebase/analytics";

const conferences = ["Bay", "State", "Nationals"];
const years = [
  "1994", "1995", "1996", "1997", "1998", "1999", "2000", "2001",
  "2002", "2003", "2004", "2005", "2006", "2007", "2008", "2009",
  "2010", "2011", "2012", "2013", "2014", "2015", "2016", "2017",
  "2018", "2019", "2020", "2021", "2022", "2023",
];

const app = firebase;
const analytics = getAnalytics(app);

const CompetitionsHistory = () => {
  const [allData, setAllData] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    year: "",
    conference: "",
    event: "",
    name: ""
  });
  const [triggerSearch, setTriggerSearch] = useState(false);

  // Fetch all data from Firestore once on component mount
  useEffect(() => {
    const fetchData = async () => {
      const db = getFirestore();
      let results = [];

      for (let conference of conferences) {
        for (let year of years) {
          const yearCollectionRef = collection(db, `confQuery/${conference}/${year}`);
          const eventDocs = await getDocs(yearCollectionRef);

          eventDocs.forEach((eventDoc) => {
            const data = eventDoc.data();
            results.push({
              ...data,
              year: year,
              conference: conference,
            });
          });
        }
      }

      setAllData(results);
    };

    fetchData();
  }, []);

  // Filter data based on search terms
  const filteredData = useMemo(() => {
    return Object.values(searchTerm).some((term) => term.trim() !== "")
      ? allData.filter((item) =>
          item.year.includes(searchTerm.year) &&
          item.conference.includes(searchTerm.conference) &&
          item.event.includes(searchTerm.event) &&
          item.name.includes(searchTerm.name)
        )
      : allData;
  }, [searchTerm, allData, triggerSearch]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };

  const handleSearch = () => {
    setTriggerSearch(!triggerSearch);
  };

  return (
    <div className="p-4">
      <div className="w-full space-x-3 mb-4">
        <button
          onClick={handleSearch}
          className="bg-blue-500 text-white p-2 rounded-md"
        >
          Search
        </button>
        <input
          className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 outline-none"
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
          className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 outline-none"
          type="text"
          name="event"
          placeholder="Search by Event"
          onChange={handleInputChange}
        />
        <input
          className="bg-transparent p-2 rounded-2x border-b placeholder:text-gray-300 outline-none"
          type="text"
          name="name"
          placeholder="Search by Name"
          onChange={handleInputChange}
        />
      </div>
      <div className="p-4 bg-white shadow-lg rounded-md">
        <div>
          <div className="flex flex-row space-x-[160px] mb-2">
            <div>Year</div>
            <div className="pl-14">Conference</div>
            <div className="ml-[-1rem]">Event</div>
            <div className="pl-12">Name</div>
            <div className="pl-10">Place</div>
          </div>
        </div>
        <div>
          {filteredData.length > 0 ? (
            <table className="w-full">
              <tbody>
                {filteredData.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.year}</td>
                    <td className="p-2">{item.conference}</td>
                    <td className="p-2">{item.event}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.place}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p>No results found</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default CompetitionsHistory;