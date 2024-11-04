"use client";

import Image from "next/image";
import Link from "next/link";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import officersPic from "../../../../public/static/officers.jpg";
import { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";

export default function AmericanEnterprise() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        const auth = getAuth();
        const unsubscribe = onAuthStateChanged(auth, (user) => {
            setUser(user);
        });

        return () => unsubscribe(); // Clean up subscription on component unmount
    }, []);

    return (
        <>
            <Image src={officersPic} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] w-[100vw] z-[-10]" draggable={false} />
            <Nav />
            <div className="h-[80vh] border-2 border-dark-chocolate bg-dark-chocolate p-10 m-10 rounded-xl bg-opacity-30">
                <h1 className="text-3xl font-bold">Partnership with Business Project</h1>
                <p className="mt-3 text-lg">
                    The Partnership with Business project aims to create a mutually beneficial partnership with a business.
                </p>
                {user ? (
                    <p className="mt-3 text-lg">
                        We work with members and our business to give our members an unforgettable and real-world experience
                        and improve our partner business so they can reach their full potential. This year the PwB project is
                        excited to announce that we will be partnering with allcove! allcove is a mental health center created
                        by Stanford meant to support teens through mental health struggles, education, and the stresses of
                        day-to-day life. They are located right here in the Bay Area. Come out to our project meetings to get
                        involved and learn more!
                    </p>
                ) : (
                    <p className="mt-3 text-lg">
                        Project chairs, members, and business liaisons work together to help give our members an unforgettable
                        and real-world experience while simultaneously working to improve our partner business to help them
                        reach their full potential. Come out to our project meetings to get involved and learn more!
                    </p>
                )}
            </div>
            <Footer />
        </>
    );
}