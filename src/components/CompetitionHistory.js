import { useState, useEffect } from "react";
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
  const [filteredData, setFilteredData] = useState([]);
  const [searchTerm, setSearchTerm] = useState({
    year: "",
    conference: "",
    event: "",
    name: ""
  });
  const [loading, setLoading] = useState(true);

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
      setLoading(false); // Set loading to false once data is fetched
    };

    fetchData();
  }, []);

  // Handle input change
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSearchTerm({
      ...searchTerm,
      [name]: value,
    });
  };

  // Handle search action
  const handleSearch = () => {
    const searchTermLower = {
      year: searchTerm.year.toLowerCase(),
      conference: searchTerm.conference.toLowerCase(),
      event: searchTerm.event.toLowerCase(),
      name: searchTerm.name.toLowerCase()
    };

    const filtered = allData.filter((item) =>
      (!searchTermLower.year || item.year.toLowerCase().includes(searchTermLower.year)) &&
      (!searchTermLower.conference || item.conference.toLowerCase().includes(searchTermLower.conference)) &&
      (!searchTermLower.event || item.event.toLowerCase().includes(searchTermLower.event)) &&
      (!searchTermLower.name || item.name.toLowerCase().includes(searchTermLower.name))
    );

    // Sort the filtered data
    filtered.sort((a, b) => {
      if (a.year !== b.year) return a.year.localeCompare(b.year);

      const conferenceOrder = ["Bay", "State", "Nationals"];
      if (a.conference !== b.conference) return conferenceOrder.indexOf(a.conference) - conferenceOrder.indexOf(b.conference);
      
      if (a.event !== b.event) return a.event.localeCompare(b.event);
      return a.place - b.place;
    });

    setFilteredData(filtered);
  };

  return (
    <div className="pt-2 text-black">
      <div className="w-full space-x-3 mb-2 flex">
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
        <button
          onClick={handleSearch}
          className={`p-2 rounded-md flex items-center justify-center ${loading ? 'bg-gray-400 cursor-not-allowed' : 'bg-red-900 text-white opacity-80'}`}
          disabled={loading}
        >
          {loading ? (
            <svg
              className="animate-spin h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8V0C6.477 0 2 4.477 2 10h2zm2 5.291l-1.35-1.351A8.01 8.01 0 014 12H2c0 2.21.896 4.21 2.34 5.66L6 17.291z"
              ></path>
            </svg>
          ) : (
            'Search'
          )}
        </button>
      </div>
      <div className="p-2 border border-red-950 border-opacity-30 shadow-lg rounded-md mt-4">
        <div style={{ maxHeight: "300px", overflowY: "auto" }}>
          <table className="w-full">
            <thead>
              <tr className="border-b border-red-950 border-opacity-30">
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
                  <tr key={index} className="border-b border-red-950 border-opacity-30">
                    <td className="p-3">{item.year}</td>
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