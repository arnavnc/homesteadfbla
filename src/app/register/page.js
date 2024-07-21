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
      <main className="lg:flex justify-evenly">
        <div className="flex flex-col text-center items-center lg:items-center lg:text-center justify-center pt-7 lg:pt-0 lg:h-[70vh] py-2 px-5 md:px-20 space-y-[-25px]">
          <h1 className="bg-dark-chocolate p-5 rounded-3xl text-2xl lg:text-2xl font-semibold lg:mt-10 lg:w-auto px-8 z-50">
            Sign Up to HHS FBLA!
          </h1>
          <div className="bg-red-violet p-5 rounded-3xl w-50 flex flex-col lg:flex-row justify-center bg-opacity-75 gap-10 w-96 h-dvh">
          <div>
            <Register />
          </div>
          </div>
        </div>
      </main>

      <Footer />
    </main>
  );
}