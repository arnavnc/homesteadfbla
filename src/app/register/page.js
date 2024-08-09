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
import { db } from "src/app/firebase.js"; // Make sure the path is correct
import Register from "@/components/Register";

export default function RegisterPage() {

  return (
    <main>
      <Image
        src={Arnav}
        className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
        draggable={false}
      />
      <Nav />
      {/* <main className="lg:flex justify-evenly"> */}
        {/* <div className="flex flex-col text-center items-center lg:items-center lg:text-center justify-center pt-7 lg:pt-0 lg:h-[70vh] py-2 px-5 md:px-20 space-y-[-25px]"> */}
          {/* <div className="bg-red-violet p-5 rounded-xl w-50 flex flex-col lg:flex-row justify-center bg-opacity-60 gap-10 w-96 h-dvh border-2 border-red-800"> */}
            <Register />
          {/* </div> */}
        {/* </div> */}
      {/* </main> */}

      <Footer />
    </main>
  );
}