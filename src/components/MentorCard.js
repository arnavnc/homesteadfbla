"use client"
import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { auth } from "../app/firebase"; 


export default function MentorCard({ name, type, competitions, desc, image }) {

    const [isLoggedIn, setIsLoggedIn] = useState(false);

    useEffect(() => {
        // Listen for authentication state changes
        const unsubscribe = auth.onAuthStateChanged((user) => {
            setIsLoggedIn(!!user); // Set true if user is logged in, otherwise false
        });

        // Cleanup subscription on unmount
        return () => unsubscribe();
    }, []);

    const imageSrc = isLoggedIn ? `/static/mentors/${image}.JPG` : `/static/mentors/default.JPG`;
    // const imageSrc = `/static/mentors/default.JPG`;
    return (
        <div class="md:flex bg-white bg-opacity-10 rounded-xl p-8 md:p-0">
            <Image draggable={false} width={500} height={500} src={imageSrc} alt="" class="object-cover object-center h-[250px] w-[200px] opacity-90 rounded-l-lg rounded-r-lg mx-auto lg:ml-0 mb-0"/>
            <div class="pt-6 md:p-5 text-center md:text-left justify-between flex flex-col pb-0">
                <div class="font-medium mb-0">
                    <div class="font-bold text-lg text-red-violet mb-1">
                        {name}
                    </div>
                    <div class="text-base text-red-400 mb-1">
                        {type}
                    </div>
                    <div class="text-sm text-warm-beige mb-1">
                        {competitions}
                    </div>
                    <div class="text-sm text-white mb-0 font-light">
                        {desc}
                    </div>
                </div>
            </div>
        </div>
    )
  }
