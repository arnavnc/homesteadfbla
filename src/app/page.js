"use client";
import Image from "next/image";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useState, useEffect, useCallback } from "react";
import Arnav from "../../public/static/officers.jpg";
import Link from "next/link";
import firebase from "./firebase";
import { BiRightArrowAlt } from "react-icons/bi";
import About from "@/components/timeline";
import { getFirestore, collection, query, orderBy, getDocs } from 'firebase/firestore';
import ContactForm from "@/components/ContactForm";

export default function Home() {
  const [eventsData, setEventsData] = useState([]);

  const fetchEvents = useCallback(async () => {
    const db = getFirestore();
    const upcomingEventsRef = query(collection(db, 'upcomingEvents', 'upcoming', 'events'), orderBy('date', 'asc'));
    const upcomingQuerySnapshot = await getDocs(upcomingEventsRef);
    const upcomingEvents = upcomingQuerySnapshot.docs.map(doc => ({ ...doc.data(), id: doc.id }));
    setEventsData(upcomingEvents);
  }, []);

  useEffect(() => {
    fetchEvents();
  }, [fetchEvents]);

  const EventCard = ({ event }) => (
    <div className="bg-red-violet bg-opacity-90 p-8 rounded-lg mb-4 transform hover:scale-[1.02] ease-linear duration-150">
      <h3 className="text-2xl font-semibold text-white">{event.title}</h3>
      <p className="text-gray-200 mt-2">{new Date(event.date).toLocaleDateString()}</p>
      <p className="text-gray-100 mt-4">{event.description}</p>
    </div>
  );

  return (
    <main className="mx-auto space-y-[-6px] lg:px-0 min-h-screen">
      <Image
        src={Arnav}
        className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
        draggable={false}
      />
      <Nav />
      <main className="lg:flex flex-cols-2 justify-evenly">
        <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center h-[50vh] lg:min-h-[80vh] py-2 px-5 md:px-20 space-y-5">
          <h1 className="text-4xl lg:text-6xl font-bold">Homestead FBLA</h1>
          <p className="text-xl lg:text-3xl font-medium">
            The #1 Chapter in the Nation
          </p>
          <div className="flex flex-row space-x-4">
            <Link
              className="rounded-md bg-red-violet w-fit px-4 py-2 hover:brightness-90 transition ease-linear 
              duration-300 flex flex-row group my-auto"
              href="https://www.youtube.com/watch?v=fNxKm-bBoY8&feature=youtu.be&ab_channel=TimothyBeckmann"
              target="_blank"
            >
              Watch Video{" "}
              <BiRightArrowAlt className="mt-[5px] scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
            </Link>
          </div>
        </div>
        <div className="rounded-lg hidden w-[40%] lg:flex flex-col text-center lg:text-left justify-center h-[50vh] lg:min-h-[80vh] py-2 gap-x-10 pr-10">
          <Image src={Arnav} className="object-cover h-full my-16 rounded-lg" />
        </div>
      </main>

      {/* Upcoming Events Section */}
      <section className="py-10 px-10 lg:px-16 bg-red-violet bg-opacity-20">
        <h1 className="text-3xl font-bold mb-7">Upcoming Events</h1>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {eventsData.length === 0 ? (
            <p>No upcoming events at the moment. Stay tuned!</p>
          ) : (
            eventsData.map((event, index) => (
              <EventCard key={index} event={event} />
            ))
          )}
        </div>
      </section>

      <section className="py-10 px-10 lg:px-16 bg-red-violet bg-opacity-20">
        <h1 className="text-3xl font-bold mb-5">About Us</h1>
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          <div
            className="rounded-lg border-2 border-red-violet bg-red-violet bg-opacity-30 
              px-8 py-6 pb-9"
          >
            <h1 className="text-xl font-semibold">Competitions</h1>
            <p className="text-gray-300 mt-2 mb-[48px]">
              Homestead FBLA competes at Bay Section, States, and Nationals
              every year. We currently have 27 consecutive Bay Section
              Championships, 25 consecutive state championships, and 22 national
              championships.
            </p>

            <Link
              href="/compHistory"
              className="border-2  border-watermelon-red hover:bg-watermelon-red 
              ease-linear duration-200 cursor-pointer w-fit p-3 lg:text-[15px] text-sm rounded-xl"
            >
              View Our Competitive History
            </Link>
          </div>

          <div
            className="rounded-lg border-2 border-watermelon-red bg-watermelon-red bg-opacity-30 
              px-8 py-6 pb-9"
          >
            <h1 className="text-xl font-semibold">Projects</h1>
            <p className="text-gray-300 mt-2 mb-9">
              Homestead FBLA currently has 4 projects; American Enterprise, 
              Community Service, Partnership with Business, and 
              Software Ventures Project. Each of them aims to develop valuable business and 
              leadership skills among students.
            </p>

            <div className="lg:grid-cols-4 lg:gap-x-3 gap-x-3 gap-y-3 lg:justify-between grid grid-cols-2 lg:gap-0">
              <Link
                href="/projects/american-enterprise"
                className="border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 
                  text-[15px] rounded-xl"
              >
                AE
              </Link>

              <Link
                href="/projects/community-service"
                className="border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 cursor-pointer flex justify-center p-3 
                  text-[15px] rounded-xl"
              >
                CS
              </Link>

              <Link
                href="/projects/partnership-with-business"
                className="border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 
                  text-[15px] rounded-xl"
              >
                PWB
              </Link>

              <Link
                href="/projects/software-ventures"
                className="border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 
                  text-[15px] rounded-xl"
              >
                SV
              </Link>
            </div>
          </div>

          <div
            className="rounded-lg border-2 border-melon bg-melon bg-opacity-30 
              px-8 py-6 pb-9">
            <h1 className="text-xl font-semibold">Officers</h1>
            <p className="text-gray-300 mt-2 mb-[45px]">
              Homestead FBLA&apos;s leadership consists of Teams setting
              strategy, handling logistics and events, and Project Chairs
              leading business initiatives. The officers provide direction,
              organization, and execution of the chapter&apos;s activities.
            </p>

            <Link
              href="/officers"
              className="border-2 border-red-300 hover:bg-red-300 
                hover:text-white ease-linear duration-200 
                cursor-pointer w-fit p-3 lg:text-[15px] text-sm rounded-xl"
            >
              Meet our Officer Team
            </Link>
          </div>
        </div>
      </section>

      {/* <ContactForm /> */}
      
      <Footer />
    </main>
  );
}