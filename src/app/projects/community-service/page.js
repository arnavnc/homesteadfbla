"use client";


import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import officersPic from "../../../../public/static/officers.jpg";

export default function CommunityService() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser); // Update user state based on login status
    });

    return () => unsubscribe(); // Cleanup listener on component unmount
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
        <h1 className="text-3xl font-bold">Community Service</h1>
        {user ? (
          <p className="mt-3 text-lg">
            The Homestead High School FBLA Community Service Project for 2024-2025 is dedicated to raising awareness and providing support for dementia and Alzheimer&apos;s care. The initiative includes educational activities to teach about brain health and neurodegenerative diseases, alongside collaborations with organizations such as the Alzheimer&apos;s Association. Members will engage with elderly individuals through social activities, advocacy campaigns, and public outreach to reduce stigma and improve their quality of life. By capturing and sharing stories from volunteers and caregivers, the project aims to influence legislation and foster greater awareness within the community. Through compassion, education, and advocacy, the project seeks to make a meaningful impact on individuals and families affected by dementia.
          </p>
        ) : (
          <p className="mt-3 text-lg">
            The Homestead High School FBLA Community Service Project aims to empower the community through impactful initiatives driven by member engagement, collaboration, and public awareness campaigns. The project focuses on fostering connections and making a positive difference by organizing educational events, building relationships with local organizations, and providing meaningful opportunities for youth and community members to engage and grow. By leveraging leadership, advocacy, and strategic partnerships, the project seeks to inspire change and leave a lasting impact on the community.
          </p>
        )}
      </div>
      <Footer />
    </>
  );
}