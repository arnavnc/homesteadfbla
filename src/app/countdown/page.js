"use client";

import React, { useState, useEffect } from "react";
import background from "../../../public/static/officers.jpg";
import Footer from "@/components/footer";
import Nav from "@/components/nav";
import Image from "next/image";

const Countdown = () => {
  // Set the target date and time here
  const targetDate = "2025-06-29T12:50:59";

  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft(targetDate));

  useEffect(() => {
    if (timeLeft.total <= 0) return;

    const intervalId = setInterval(() => {
      setTimeLeft(calculateTimeLeft(targetDate));
    }, 1000);

    return () => clearInterval(intervalId);
  }, [targetDate, timeLeft.total]);

  function calculateTimeLeft(targetDate) {
    const difference = new Date(targetDate) - new Date();

    let timeLeft = {
      total: difference,
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };

    return timeLeft;
  }

  return (
    <main>
      <Image
        src={background}
        className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
        draggable={false}
        alt="Background"
      />
      <Nav />
      <div className="flex flex-col items-center justify-center text-center mb-64 mt-32 px-6 lg:px-0">
        <h1 className="text-5xl lg:text-7xl font-bold mb-6 text-gray-100">NLC 2025 Countdown!</h1>
        <p className="text-2xl lg:text-3xl font-bold mb-16 text-gray-300">Make sure you are fully prepared for NLC!</p>
        {/* <p href="https://docs.google.com/document/d/152ji7uSu-PcamZeIjM7CVck6eS6iuCfitFVj6BoGGgc/edit?usp=sharing" className="text-lg lg:text-2xl font-bold mb-10 text-gray-400">
        *Links to <a href="https://docs.google.com/forms/d/e/1FAIpQLSeY2gQHyEutjNmHtncDVKOn_HqT_pY-ElSnLsyzQQej39rPFA/formResponse" className="text-red-300 underline font-bold">Tryout Form</a> and <a href="https://docs.google.com/document/d/152ji7uSu-PcamZeIjM7CVck6eS6iuCfitFVj6BoGGgc/edit?usp=sharing" className="text-red-300 underline font-bold">Tryout Information</a> 
        </p> */}
        {timeLeft.total > 0 ? (
          <div className="bg-dark-chocolate bg-opacity-90 p-8 rounded-2xl shadow-xl flex flex-col lg:flex-row items-center justify-center text-white">
            <TimeBox value={timeLeft.days} label="DAYS" />
            <Separator />
            <TimeBox value={timeLeft.hours} label="HOURS" />
            <Separator />
            <TimeBox value={timeLeft.minutes} label="MINUTES" />
            <Separator />
            <TimeBox value={timeLeft.seconds} label="SECONDS" />
          </div>
        ) : (
          <div className="text-3xl lg:text-5xl md:text-7xl font-extrabold text-red-500">
            NLC 2025!!!
          </div>
        )}
      </div>
      <Footer />
    </main>
  );
};

// Reusable component for each time unit
const TimeBox = ({ value, label }) => (
  <div className="flex flex-col items-center px-4 lg:px-6 my-4 lg:my-0">
    <div className="text-5xl lg:text-6xl xl:text-7xl font-extrabold text-watermelon-red">{value}</div>
    <div className="text-sm lg:text-md xl:text-lg tracking-wider mt-3 text-red-300">{label}</div>
  </div>
);

// Reusable separator component
const Separator = () => (
  <div className="text-5xl lg:text-6xl xl:text-7xl font-bold text-red-500 mx-8">:</div>
);

export default Countdown;
