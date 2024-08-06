"use client"
import React from "react";
import firebase from "src/app/firebase.js";
import db from "src/app/firebase.js";
import CompetitionsHistoryComponent from "@/components/CompetitionHistory";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Arnav from "../../../public/static/officers.jpg";
import Image from "next/image";
import { getFirestore, doc, getDocs, collection, where, query, getDoc, collectionGroup } from "firebase/firestore";

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

      const ensureString = (value) => value.toString();

      console.log(myEvents);
      console.log(myYears);
      console.log(myConf);

      const db = getFirestore();
      let results = [];
      let promises = [];

      if (event) {
        let tRef;
        if(year){
          if(name && !conf){
            for (let q = 0; q < myConf.length; q++) {
              tRef = query(
                collection(db, "confQuery", myConf[q], String(year)),
                where("event", "==", event),
                where("name", "==", name)
              );
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
                      year: year,
                      event: event,
                    });
                  });
                }).catch((error) => {})
              );
            }
          }else if(name && conf){
            tRef = query(
              collection(db, "confQuery", conf, String(year)),
              where("event", "==", event),
              where("name", "==", name)
            );
            promises.push(
              getDocs(tRef).then((querySnapshot) => {
                querySnapshot.forEach((doc) => {
                  var event = doc.data()["event"];
                  var name = doc.data()["name"];
                  var place = doc.data()["place"];
      
                  results.push({
                    name: name,
                    place: place,
                    conference: conf,
                    year: year,
                    event: event,
                  });
                });
              }).catch((error) => {})
            );
          }else{
            for (let q = 0; q < myConf.length; q++) {
              console.log("Querying!!!!!");
              console.log(year);
              console.log(myConf[q]);
              tRef = query(
                collection(db, "confQuery", myConf[q], String(year)),
                where("event", "==", event),
              );
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
                      year: year,
                      event: event,
                    });
                  });
                }).catch((error) => {})
              );
            }
          }
        }else if(conf){
          if(conf && !name){
            for (let k = 0; k < myYears.length; k++) {
              tRef = query(
                collection(db, "confQuery", conf, String(myYears[k])),
                where("event", "==", event)
              );
              promises.push(
                getDocs(tRef).then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var event = doc.data()["event"];
                    var name = doc.data()["name"];
                    var place = doc.data()["place"];
        
                    results.push({
                      name: name,
                      place: place,
                      conference: conf,
                      year: myYears[k],
                      event: event,
                    });
                  });
                }).catch((error) => {})
              );
            }
          }else if(conf && name){
            for (let k = 0; k < myYears.length; k++) {
              tRef = query(
                collection(db, "confQuery", conf, String(myYears[k])),
                where("event", "==", event),
                where("name", "==", name)
              );
              promises.push(
                getDocs(tRef).then((querySnapshot) => {
                  querySnapshot.forEach((doc) => {
                    var event = doc.data()["event"];
                    var name = doc.data()["name"];
                    var place = doc.data()["place"];
        
                    results.push({
                      name: name,
                      place: place,
                      conference: conf,
                      year: myYears[k],
                      event: event,
                    });
                  });
                }).catch((error) => {})
              );
            }
          }else{
            for (let k = 0; k < myYears.length; k++) {
              for (let q = 0; q < myConf.length; q++) {
                tRef = query(
                  collection(db, "confQuery", myConf[q], String(myYears[k])),
                  where("event", "==", event),
                );
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
          }
        }else if(name && !conf && !year){
          for (let k = 0; k < myYears.length; k++) {
            for (let q = 0; q < myConf.length; q++) {
              tRef = query(
                collection(db, "confQuery", myConf[q], String(myYears[k])),
                where("name", "==", name),
                where("event", "==", event)
              );
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
        }
 

        Promise.all(promises).then(() => {
          console.log("RESULTS", results)
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
        <main className="lg:flex justify-evenly h-auto pb-40">
          <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center pt-7 lg:pt-0 lg:h-[70vh] py-2 px-5 md:px-20 space-y-5 static">
            <h1 className="text-4xl lg:text-6xl font-bold lg:mt-10">
              Competitions History
            </h1>
            <p className="text-xl lg:text-3xl font-medium text-gray-300 pb-20">
              View Homestead FBLA&apos;s Competitive History Through the Years
            </p>
            <div className="bg-watermelon-red w-full p-10 rounded-2xl flex flex-col lg:flex-row justify-center 
            lg:justify-center bg-opacity-75 gap-10">
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
        <div className="mt-10">
          <Footer />
        </div>
      </main>
    );
  }
}
