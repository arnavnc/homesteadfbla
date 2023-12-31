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
        <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center pt-7 lg:pt-0 lg:h-[70vh] py-2 px-5 md:px-20 space-y-5">
          <h1 className="text-4xl lg:text-6xl font-bold lg:mt-10">
            Register an account with Homestead FBLA
          </h1>
          <div className="bg-watermelon-red w-full p-10 rounded-2xl 
                  flex flex-col lg:flex-row justify-center bg-opacity-75 gap-10">
            <Register />
          </div>
        </div>
      </main>

      <Footer />
    </main>
  );
}


