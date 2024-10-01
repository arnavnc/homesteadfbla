"use client";
import Image from "next/image";
import Nav from "@/components/nav";
import Footer from "@/components/footer";
import { useState, useEffect, useCallback } from "react";
import background from "../../../public/static/officers.jpg";
import Link from "next/link";
export default function Competition() {


    return(
      <>
      <Image src={background} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]" draggable={false}/>
      <Nav />
      <main className="lg:flex justify-center">
        <div className="m-4 lg:m-8">
          <div className="bg-watermelon-red font-semibold rounded-2xl flex flex-row justify-center bg-opacity-50 p-4">
            <h1 className="text-[4vh] md:text-[5vh] text-center">Competitive Information</h1>
          </div>
          <div className="grid grid-cols-1 gap-6 md:grid-cols-1 lg:grid-cols-3 justify-items-center mt-6 mb-8">
            {/** Grid Items with Equal Size */}
            <div className="bg-red-violet bg-opacity-40 p-6 md:p-10 rounded-2xl m-4 border-2 border-red-violet flex justify-center items-center w-full">
              <Link href="/compHistory" className="bg-dark-chocolate border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 cursor-pointer w-full text-center py-4 text-xl rounded-xl max-w-48 px-2">
                Competitive History
              </Link>
            </div>
            <div className="bg-red-violet bg-opacity-40 p-6 md:p-10 rounded-2xl m-4 border-2 border-red-violet flex justify-center items-center w-full">
              <Link href="/countdown" className="bg-dark-chocolate border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 cursor-pointer w-full text-center py-4 text-xl rounded-xl max-w-[200px]">
                Tryout Form Countdown
              </Link>
            </div>
            <div className="bg-red-violet bg-opacity-40 p-6 md:p-10 rounded-2xl m-4 border-2 border-red-violet flex justify-center items-center w-full">
              <Link href="/" className="bg-dark-chocolate border-2 border-watermelon-red hover:bg-watermelon-red ease-linear duration-200 cursor-pointer w-full text-center py-4 text-xl rounded-xl max-w-[200px] ">
                Competition Resources (Soon)
              </Link>
            </div>
          </div>
        </div>
      </main>
      <Footer/>
      </>
    )
}