"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import Arnav from "../../../public/static/officers.jpg";
import firebase from "src/app/firebase.js";
import {
  collection,
  query,
  where,
  getDocs,
  getFirestore,
} from "firebase/firestore";
import Link from "next/link";
import CompetitionsHistory from "@/components/CompetitionHistory";

const names = {};

export default function Home() {
  // const firestore = getFirestore(firebase); // get firestore
  // const conferenceCollection = collection(firestore, "confQuery"); // get the confQuery collection

  // useEffect(() => {
  //   const setSearchTerm = () => {

  //   };
  // }, []);

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
          <div className="bg-watermelon-red w-full p-10 rounded-2xl 
                  flex flex-col lg:flex-row justify-center lg:justify-center bg-opacity-75 gap-10">
            <CompetitionsHistory />
          </div>
        </div>
      </main>

      <Footer />
    </main>
  );
}
