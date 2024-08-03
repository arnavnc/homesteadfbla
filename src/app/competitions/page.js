// "use client";
// import { useState, useEffect } from "react";
// import Image from "next/image";
// import Nav from "@/components/nav";
// import Footer from "@/components/footer";
// import Arnav from "../../../public/static/officers.jpg";
// import firebase from "src/app/firebase.js";
// import {
//   collection,
//   query,
//   where,
//   getDocs,
//   getFirestore,
// } from "firebase/firestore";
// import Link from "next/link";
// import CompetitionsHistory from "@/components/CompetitionHistory";

// const names = {};

// export default function Home() {
//   // const firestore = getFirestore(firebase); // get firestore
//   // const conferenceCollection = collection(firestore, "confQuery"); // get the confQuery collection

//   // useEffect(() => {
//   //   const setSearchTerm = () => {

//   //   };
//   // }, []);

//   return (
//     <main>
//       <Image
//         src={Arnav}
//         className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
//         draggable={false}
//       />
//       <Nav />
//       <main className="lg:flex justify-evenly">
//         <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center pt-7 lg:pt-0 lg:h-[70vh] py-2 px-5 md:px-20 space-y-5">
//           <h1 className="text-4xl lg:text-6xl font-bold lg:mt-10">
//             Competitions History
//           </h1>
//           <p className="text-xl lg:text-3xl font-medium text-gray-300 pb-20">
//             View Homestead FBLA&apos;s Competitive History Through the Years
//           </p>
//           <div className="bg-watermelon-red w-full p-10 rounded-2xl 
//                   flex flex-col lg:flex-row justify-center lg:justify-center bg-opacity-75 gap-10">
//             <CompetitionsHistory />
//           </div>
//         </div>
//       </main>

//       <Footer />
//     </main>
//   );
// }

"use client"
import React from "react";
import firebase from "src/app/firebase.js";
import db from "src/app/firebase.js";
import CompetitionsHistoryComponent from "@/components/CompetitionHistory";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Arnav from "../../../public/static/officers.jpg";
import Image from "next/image";
import { getFirestore, doc, getDocs, collection, where, query, getDoc } from "firebase/firestore";

export default class CompetitionsHistory extends React.Component {


  constructor(props) {
    super(props);
    this.compsHistoryQuery = this.compsHistoryQuery.bind(this);
    this.state = {
      compsHistory: [],
      events: [],
      years: [],
      conferences: [],
      loading: false,
      nothingEntered: false,
    };
  }

  componentDidMount() {
    window.scrollTo(0, 0);
    const db = getFirestore();
    let tEvents = [];

    Promise.all([
      getDocs(collection(db, "events"))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            tEvents = doc.data();
          });
        })
    ]).then(() => {
      this.setState({ events: Object.values(tEvents)[0] });
    });

    let tYears = [];
    Promise.all([
      getDocs(collection(db, "years"))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            tYears = doc.data();
          });
        })
    ]).then(() => {
      this.setState({ years: Object.values(tYears)[0] });
    });

    let tConf = [];
    Promise.all([
      getDocs(collection(db, "conferences"))
        .then((querySnapshot) => {
          querySnapshot.forEach((doc) => {
            tConf = doc.data();
          });
        })
    ]).then(() => {
      this.setState({ conferences: Object.values(tConf) });
    });
  }

  compsHistoryQuery(name, year, conf, event, place) {
    if (!name && !year && !conf && !event && !place) {
      this.setState({ nothingEntered: true });
    } else {
      this.setState({ loading: true, nothingEntered: false, compsHistory: [] });
      let myEvents = event ? [event] : this.state.events;
      let myYears = year ? [year] : this.state.years;
      let myConf = conf ? [conf] : this.state.conferences;

      console.log(myEvents);
      console.log(myYears);
      console.log(myConf);

      const db = getFirestore();
      let results = [];
      let promises = [];

      if (event) {
        for (let i = 0; i < myEvents.length; i++) {
          for (let k = 0; k < myYears.length; k++) {
            for (let q = 0; q < myConf.length; q++) {
              console.log(`myEvents[i]: ${myEvents[i]}, myYears[k]: ${myYears[k]}, myConf[q]: ${myConf[q]}`);
              let tRef = db.doc("eventQuery", myEvents[i], myYears[k], myConf[q]);
              promises.push(
                getDoc(tRef).then((doc) => {
                  if (doc.exists()) {
                    var names = Object.keys(doc.data());
                    var places = Object.values(doc.data());
                    for (let d = 0; d < names.length; d++) {
                      if (name) {
                        if (place) {
                          if (name === names[d] && place === places[d]) {
                            results.push({
                              name: names[d],
                              place: places[d],
                              conference: myConf[q],
                              year: myYears[k],
                              event: myEvents[i],
                            });
                          }
                        } else {
                          if (name === names[d]) {
                            results.push({
                              name: names[d],
                              place: places[d],
                              conference: myConf[q],
                              year: myYears[k],
                              event: myEvents[i],
                            });
                          }
                        }
                      } else if (place) {
                        if (place === places[d]) {
                          results.push({
                            name: names[d],
                            place: places[d],
                            conference: myConf[q],
                            year: myYears[k],
                            event: myEvents[i],
                          });
                        }
                      } else {
                        results.push({
                          name: names[d],
                          place: places[d],
                          conference: myConf[q],
                          year: myYears[k],
                          event: myEvents[i],
                        });
                      }
                    }
                  }
                }).catch((error) => {})
              );
            }
          }
        }
        Promise.all(promises).then(() => {
          this.setState({ compsHistory: results, loading: false });
        });
      } else {
        for (let k = 0; k < myYears.length; k++) {
          for (let q = 0; q < myConf.length; q++) {
            let tRef;
            if (name && place) {
              tRef = query(
                collection(db, "confQuery", myConf[q], String(myYears[k])),
                where("name", "==", name),
                where("place", "==", parseInt(place))
              );
            } else if (!name && place) {
              console.log("querying with place", place);
              tRef = query(
                collection(db, "confQuery", myConf[q], String(myYears[k])),
                where("place", "==", parseInt(place))
              );
            } else if (!place && name) {
              console.log("TRIGGERED QUERY", name, myConf[q], myYears[k]);
              tRef = query(
                collection(db, "confQuery", myConf[q], String(myYears[k])),
                where("name", "==", name)
              );
            } else {
              console.log("reg query");
              tRef = collection(db, "confQuery", myConf[q], String(myYears[k]));
            }
            promises.push(
              getDocs(tRef).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var event = doc.data()["event"];
                  var name = doc.data()["name"];
                  var place = doc.data()["place"];

                  results.push({
                    name: name,
                    place: place,
                    conference: myConf[q],
                    year: myYears[k],
                    event: event,
                  });
                });
              }).catch((error) => {})
            );
          }
        }
        Promise.all(promises).then(() => {
          console.log("RESULTS", results)
          this.setState({ compsHistory: results, loading: false });
        });
      }
    }
  }
 
  render() {
    return (
      <main>
        <Image
          src={Arnav}
          className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
          draggable={false}
        />
        <Nav />
        <main className="lg:flex justify-evenly">
          <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center pt-7 lg:pt-0 lg:h-[70vh] py-2 px-5 md:px-20 space-y-5">
            <h1 className="text-4xl lg:text-6xl font-bold lg:mt-10">
              Competitions History
            </h1>
            <p className="text-xl lg:text-3xl font-medium text-gray-300 pb-20">
              View Homestead FBLA&apos;s Competitive History Through the Years
            </p>
            <div className="bg-watermelon-red w-full p-10 rounded-2xl flex flex-col lg:flex-row justify-center lg:justify-center bg-opacity-75 gap-10">
              {/* <CompetitionsHistory /> */}
              <CompetitionsHistoryComponent
                compsHistory={this.state.compsHistory}
                compsHistoryQuery={this.compsHistoryQuery}
                events={this.state.events}
                conferences={this.state.conferences}
                loading={this.state.loading}
                nothingEntered={this.state.nothingEntered}
              />
            </div>
          </div>
        </main>
      <Footer />
      </main>
    );
  }
}
