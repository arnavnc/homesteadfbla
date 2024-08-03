import React from 'react'
import Nav from '@/components/nav'
import Image from 'next/image'
import Link from 'next/link'
import { BiRightArrowAlt } from "react-icons/bi";
import Footer from "@/components/footer"
import ProfileCard from "@/components/profile";
import Arnav from "../../../public/static/officers.jpg";
const page = () => {
  return (
   
    <>
    <main className="mx-auto space-y-[-6px] lg:px-0 min-h-screen">
      <Image 
        src={Arnav} 
        className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]"
        draggable={false}
      />
      <Nav />
      <div>

        <div>
          <ProfileCard/>
        </div>
      </div>

      <Footer />
    </main>
    </>
  )
}

export default page