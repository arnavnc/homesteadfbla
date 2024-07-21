import React from 'react'
import Nav from '@/components/nav'
import Image from 'next/image'
import Link from 'next/link'
import { BiRightArrowAlt } from "react-icons/bi";
import Footer from "@/components/footer"

const page = () => {
  return (
   
    <>
    <Nav />
    <div>
      <h1> PROFILE PAGE</h1>
    </div>
    <Footer />
    </>
  )
}

export default page