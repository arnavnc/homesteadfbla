"use client";

import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import PwBGroupPhoto from "../../../../public/static/AE Group Photo.JPEG"; // Import the new image

import officersPic from "../../../../public/static/officers.jpg";

export default function AmericanEnterprise() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
    });

    return () => unsubscribe();
  }, []);

  return (
    <>
      <Image
        src={officersPic}
        className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] w-[100vw] z-[-10]"
        draggable={false}
      />
      <Nav />
      <div className="h-[80vh] border-2 border-dark-chocolate bg-dark-chocolate p-10 m-10 rounded-xl bg-opacity-30">
        <h1 className="text-3xl font-bold">American Enterprise</h1>
        {user ? (
          <p className="mt-3 text-lg">
            Hey everyone! The American Enterprise Project aims to educate the
            community on the free enterprise system which our country operates
            under. This year, our project focus is Lifestyle Entrepreneurship.
            This focus promotes following your passion through business while
            maintaining a work-life balance and aiding in career exploration.
            Throughout the year, we plan on hosting various events, as well as
            workshops to deepen your knowledge about Lifestyle Entrepreneurship,
            and make a community impact.
          </p>
        ) : (
          <p className="mt-3 text-lg">
            The American Enterprise Project aims to educate the community on the
            free enterprise system which our country operates under. We also
            host various events that lead to a positive community impact
            (including member socials). At Homestead, we plan to deepen the
            member&apos;s understanding of the economic system in which we live under
            and develop a concept in which we will share with our community.
          </p>
        )}
        {/* Add the new image inside the red box */}
        <div className="mt-5 flex justify-center">
                    <Image 
                        src={PwBGroupPhoto} 
                        className="rounded-lg border border-dark-chocolate shadow-lg" 
                        alt="PwB Group Photo" 
                        width={500} // Adjust width as needed
                        height={300} // Adjust height as needed
                    />
                    </div>
      </div>
      <Footer />
    </>
  );
}