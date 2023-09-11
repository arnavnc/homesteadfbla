"use client"

import { motion } from "framer-motion";
import Image from "next/image";


const OfficerCard = () => {
    return (
      <div className="xs:w-[250px] w-full ease-in-out duration-75">

          <div
            className=" rounded-[20px] 
            py-5 px-12 min-h-[280px] flex justify-evenly 
            items-center flex-col"
            >   
            
            
            <div className="bg-watermelon-red rounded-3xl max-w-4xl scale-75 flex flex-row">

                <Image src={'/verticalimg.jpg'} width={100} height={100} layout='responsive' alt="title" 
                className="p-10 rounded-full mr-10" 
                />

                <div className="scale-110 mr-7">
            
                <h1 className="text-melon text-3xl
                font-bold text-center pb-2 pt-24">{'Arnav Chakravarthy'}</h1>

                <h1 className="text-melon text-xl
                font-bold text-center pb-8">{'VP of Something'}</h1>

                <h1 className="text-melon text-xl
                font-bold text-center px-10 pb-5">Hey y'all, I'm Arnav and I can't wait to get to know all of you as your VP Member Relations this year! Outside of FBLA, I love reading sci-fi novels, playing/watching basketball, and meeting new people. Always feel free to reach out at any time -- I promise I'm one of the cooler officers </h1>

                <h1 className="text-melon text-xl
                font-bold text-center pb-10">{'Officer Quote'}</h1>

                </div>
              
            </div>

          </div>

      </div>
    )
  }

  export default OfficerCard;
