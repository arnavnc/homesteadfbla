import React from 'react'
import Nav from '@/components/nav'
import Image from 'next/image'
import Link from 'next/link'
import { BiRightArrowAlt } from "react-icons/bi";
import Footer from "@/components/footer"

const page = () => {
  return (
    // <div>
    //   <Nav />
    //   <main className="lg:flex flex-cols-2 justify-evenly">
    //     <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center h-[50vh] lg:min-h-[80vh] py-2 px-5 md:px-20 space-y-5">
    //       <h1 className="text-4xl lg:text-6xl font-bold">Homestead FBLA</h1>
    //       <p className="text-xl lg:text-3xl font-medium ">
    //         The #1 Chapter in the Nation
    //       </p>
    //       <Link
    //         className="rounded-md bg-red-violet w-fit  px-4 py-2 hover:brightness-90 transition ease-linear duration-300 flex flex-row group"
    //         href="https://www.youtube.com/watch?v=fNxKm-bBoY8&feature=youtu.be&ab_channel=TimothyBeckmann"
    //         target="_blank"
    //       >
    //         Watch Video{" "}
    //         <BiRightArrowAlt className="mt-[5px] scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150" />
    //       </Link>
    //     </div>
    //   </main>
    // </div>
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