// "use client";
// import { useState, useEffect } from 'react';
// import { getFirestore, collection, query, getDocs } from 'firebase/firestore';

// // Import the functions you need from the SDKs you need
// import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
// // TODO: Add SDKs for Firebase products that you want to use
// // https://firebase.google.com/docs/web/setup#available-libraries

// // Your web app's Firebase configuration
// // For Firebase JS SDK v7.20.0 and later, measurementId is optional
// const firebaseConfig = {
//   apiKey: "AIzaSyAnEdac3nzGAvOk8f02OiU0Z2ksT0EDk54",
//   authDomain: "homesteadfbla-31a97.firebaseapp.com",
//   databaseURL: "https://homesteadfbla-31a97.firebaseio.com",
//   projectId: "homesteadfbla-31a97",
//   storageBucket: "homesteadfbla-31a97.appspot.com",
//   messagingSenderId: "385805863705",
//   appId: "1:385805863705:web:8278e9754c52f5304a9388",
//   measurementId: "G-4T4K9853Z6"
// };

// // Initialize Firebase
// const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
// const CompetitionsHistory = () => {
//   const [allData, setAllData] = useState([]);
//   const [filteredData, setFilteredData] = useState([]);
//   const [searchTerm, setSearchTerm] = useState({
//     year: "",
//     conference: "",
//     event: "",
//     name: "",
//     place: ""
//   });

//   // Fetch all data from Firestore once on component mount
//     // Fetch all data from Firestore once on component mount
//     useEffect(() => {
//         const fetchData = async () => {
//           const db = getFirestore();
//           const conferences = ['Bay', 'State', 'Nationals'];
//           let results = [];
    
//           for (let conference of conferences) {
//             const yearsQuery = collection(db, `confQuery/${conference}/years`);
//             const yearDocs = await getDocs(yearsQuery);
    
//             for (const yearDoc of yearDocs.docs) {
//               const eventsQuery = collection(db, `confQuery/${conference}/${yearDoc.id}`);
//               const eventDocs = await getDocs(eventsQuery);
    
//               for (const eventDoc of eventDocs.docs) {
//                 const data = eventDoc.data();
//                 results.push({
//                   ...data,
//                   year: yearDoc.id,
//                   conference
//                 });
//               }
//             }
//           }
    
//           setAllData(results);
//           setFilteredData(results);
//         };
    
//         fetchData();
//       }, []);
    

//   // Filter data based on search terms
//   useEffect(() => {
//     const filterData = () => {
//       const newFilteredData = allData.filter(item =>
//         (searchTerm.year ? item.year.includes(searchTerm.year) : true) &&
//         (searchTerm.conference ? item.conference.includes(searchTerm.conference) : true) &&
//         (searchTerm.event ? item.event.includes(searchTerm.event) : true) &&
//         (searchTerm.name ? item.name.includes(searchTerm.name) : true) &&
//         (searchTerm.place ? item.place.includes(searchTerm.place) : true)
//       );
//       setFilteredData(newFilteredData);
//     };

//     filterData();
//   }, [searchTerm]);

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSearchTerm({
//       ...searchTerm,
//       [name]: value
//     });
//   };

//   return (
//     <div>
//       <h1>Searchable Table</h1>
//       <div>
//         <input
//           type="text"
//           name="year"
//           placeholder="Search by Year"
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="conference"
//           placeholder="Search by Conference"
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="event"
//           placeholder="Search by Event"
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="name"
//           placeholder="Search by Name"
//           onChange={handleInputChange}
//         />
//         <input
//           type="text"
//           name="place"
//           placeholder="Search by Place"
//           onChange={handleInputChange}
//         />
//       </div>
//       <table>
//         <thead>
//           <tr>
//             <th>Year</th>
//             <th>Conference</th>
//             <th>Event</th>
//             <th>Name</th>
//             <th>Place</th>
//           </tr>
//         </thead>
//         <tbody>
//           {filteredData.map((item, index) => (
//             <tr key={index}>
//               <td>{item.year}</td>
//               <td>{item.conference}</td>
//               <td>{item.event}</td>
//               <td>{item.name}</td>
//               <td>{item.place}</td>
//             </tr>
//           ))}
//         </tbody>
//       </table>
//     </div>
//   );
// };

// export default CompetitionsHistory;
