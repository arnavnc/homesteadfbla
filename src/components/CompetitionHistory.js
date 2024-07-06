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
    const searchTermLower = {
      year: searchTerm.year.toLowerCase(),
      conference: searchTerm.conference.toLowerCase(),
      event: searchTerm.event.toLowerCase(),
      name: searchTerm.name.toLowerCase()
    };

    return Object.values(searchTermLower).some((term) => term.trim() !== "")
      ? allData.filter((item) =>
          item.year.toLowerCase().includes(searchTermLower.year) &&
          item.conference.toLowerCase().includes(searchTermLower.conference) &&
          item.event.toLowerCase().includes(searchTermLower.event) &&
          item.name.toLowerCase().includes(searchTermLower.name)
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
    <div className="pt-2">
      <div className="w-full space-x-3 mb-2">
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
      <div className="p-2 bg-white shadow-lg rounded-md">
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <table className="w-full">
            <thead>
              <tr className="border-b">
                <th className="p-2 text-left">Year</th>
                <th className="p-2 text-left">Conference</th>
                <th className="p-2 text-left">Event</th>
                <th className="p-2 text-left">Name</th>
                <th className="p-2 text-left">Place</th>
              </tr>
            </thead>
            <tbody>
              {filteredData.length > 0 ? (
                filteredData.map((item, index) => (
                  <tr key={index} className="border-t">
                    <td className="p-2">{item.year}</td>
                    <td className="p-2">{item.conference}</td>
                    <td className="p-2">{item.event}</td>
                    <td className="p-2">{item.name}</td>
                    <td className="p-2">{item.place}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="p-2 text-center">No results found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default CompetitionsHistory;