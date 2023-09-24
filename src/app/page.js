"use client"
import Image from 'next/image'
import Nav from "@/components/nav";
import Footer from "@/components/footer"
import { useState, useEffect } from 'react';
// import Timeline from "@/components/CompetitionHistory";
// import CompetitionsHistory from '@/components/CompetitionHistory';
import Arnav from "../../public/static/officers.jpg"
import Link from 'next/link';
import firebase from './firebase';
import { BiRightArrowAlt } from 'react-icons/bi'
 
export default function Home() {

  return (
    <main className="mx-auto space-y-[-6px] pb-10 lg:px-0 min-h-screen">
        <Image src={Arnav} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]" draggable={false}/>
          <Nav />
          <main className='lg:flex flex-cols-2 justify-evenly'>
            <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center h-[50vh] lg:min-h-[80vh] py-2 px-5 md:px-20 space-y-5">
                <h1 className="text-4xl lg:text-6xl font-bold">Homestead FBLA</h1>
                <p className='text-xl lg:text-3xl font-medium '>The #1 Chapter in the Nation</p>
                <Link className='rounded-md bg-red-violet w-fit px-4 py-2 hover:brightness-90 transition ease-linear duration-300 flex flex-row group' 
                href="https://www.youtube.com/watch?v=fNxKm-bBoY8&feature=youtu.be&ab_channel=TimothyBeckmann" target='_blank'>
                  Watch Video <BiRightArrowAlt className='mt-[5px] scale-[1.25] ml-1 group-hover:translate-x-1 ease-linear duration-150'/>
                </Link>
            </div>
            <div className="rounded-lg hidden w-1/3 lg:flex flex-col text-center lg:text-left justify-center h-[50vh] lg:min-h-[80vh] py-2 gap-x-10 pr-10">
              <Image src={Arnav} className='object-cover h-full my-10 rounded-lg'/>
            </div>
          </main>
          <section className='py-10 px-10 lg:px-16 bg-red-violet bg-opacity-20'>
            <h1 className='text-3xl font-bold mb-5'>About Us</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              
              <div className='rounded-lg border-2 border-red-violet bg-red-violet bg-opacity-30 
              px-8 py-6 pb-9'>

                <h1 className='text-xl font-semibold'>Competions</h1>
                <p className='text-gray-300 mt-2 mb-[48px]'>Homestead FBLA competes at Bay Section, States, and Nationals every year. We currently have 23 consecutive Bay Section Championships, 21 consecutive state championships, and 20 national championships.</p>

                <Link href="/competitions" className='border-2 border-watermelon-red hover:bg-watermelon-red 
                ease-linear duration-200 cursor-pointer w-fit p-3 lg:text-[15px] text-sm rounded-xl'>
                  View Our Competitive History
                </Link>

              </div>

              <div className='rounded-lg border-2 border-watermelon-red bg-watermelon-red bg-opacity-30 
              px-8 py-6 pb-9'>
                <h1 className='text-xl font-semibold'>Projects</h1>
                <p className='text-gray-300 mt-2 mb-9'>Homestead FBLA currently has 4 projects. The projects consist of the American Enterprise Project, the Community Service Project, the Partnership with Business Project, and the Software Ventures Project.</p>
                
                <div className='lg:grid-cols-4 lg:gap-x-3 gap-x-3 gap-y-3 lg:justify-between grid grid-cols-2 lg:gap-0'>
                  <Link href="/projects/american-enterprise" className='border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 
                  text-[15px] rounded-xl'>
                    AE
                  </Link>

                  <Link href="/projects/community-service" className='border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 cursor-pointer flex justify-center p-3 
                  text-[15px] rounded-xl'>
                    CS
                  </Link>

                  <Link href="/projects/partnership-with-business" className='border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 
                  text-[15px] rounded-xl'>
                    PWB
                  </Link>

                  <Link href="/projects/software-ventures" className='border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 flex justify-center cursor-pointer p-3 
                  text-[15px] rounded-xl'>
                    SV
                  </Link>
                </div>
              </div>

              <div className='rounded-lg border-2 border-melon bg-melon bg-opacity-30 
              px-8 py-6 pb-9'>

                <h1 className='text-xl font-semibold'>Officers</h1>
                <p className='text-gray-300 mt-2 mb-[45px]'>Homestead FBLA's leadership consists of Teams setting strategy, handling logistics and events, and Project Chairs leading business initiatives. The officers provide direction, organization, and execution of the chapter's activities.</p>

                <Link href="/officers" className='border-2 border-red-300 hover:bg-red-300 
                hover:text-red-500 hover:font-semibold ease-linear duration-200 
                cursor-pointer w-fit p-3 lg:text-[15px] text-sm rounded-xl'>
                  Meet our Officer Team
                </Link>

              </div>
              
            </div>
          </section>

          {/* Mobile Form  */}

          {/* <section className='py-10 px-10 lg:px-16 bg-red-violet bg-opacity-20 block lg:hidden'>
            <h1 className='text-3xl font-bold mb-5'>Work With Us</h1>
            <form className="mx-auto max-w-md">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-base font-medium mb-2 text-red-400">First Name</label>
                <input type="text" id="firstName" name="firstName" className="bg-red-violet bg-opacity-60 text-white rounded-md py-2 px-3 w-full outline-none placeholder:text-red-200" placeholder='First and Last Name'/>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-base font-medium mb-2 text-red-400">Email</label>
                <input type="email" id="email" name="email" className="bg-red-violet bg-opacity-60 text-white rounded-md py-2 px-3 w-full outline-none placeholder:text-red-200" placeholder='Ex. johndoe@example.com'/>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-base font-medium mb-2 text-red-400">Message</label>
                <textarea id="message" name="message" rows="4" className="bg-red-violet bg-opacity-60 text-white rounded-md py-2 px-3 w-full outline-none placeholder:text-red-200" placeholder='Hey there! My name is John Doe...'></textarea>
              </div>
              
              <div className="text-center">
                <button type="submit" className="bg-watermelon-red text-white py-2 px-4 rounded-md hover:bg-opacity-75 transition duration-300 ease-in-out">Submit</button>
              </div>
            </form>
          </section> */}
       
          <Footer />


    </main>
  )
}
