"use client"

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";

import { Squash as Hamburger } from 'hamburger-react'
import { Divide as Hamburger1 } from 'hamburger-react'
import { useState } from 'react'


const Nav = () => {

  const [isOpen, setOpen] = useState(false)

  return (
    <motion.div
      initial={{ y: -10, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.5 }}
      className="sticky top-4 z-40 backdrop-blur-lg shadow-2xl 
      bg-gradient-to-r from-dimBlack via-emerald-900 to-dimBlack rounded-xl ease-linear duration-200"
    >
      <Disclosure
        as="nav"
        className="w-full space-x-4 rounded-xl px-4 py-3"
      >
        {({ open }) => (
          <nav className="flex justify-between space-x-8 rounded-xl flex-col">
            
              <div className="flex flex-row justify-between px-[100px] pr-[110px]">

                <Link href='/' className="space-x-10 sm:flex text-[18px] rounded-md p-2 pl-4 xl:pt-2 md:pt-2 pt-5 
                font-semibold hover:scale-110 cursor-pointer ease-linear duration-300">
                  Homestead FBLA
                </Link>

                {/* Mobile Open/Close Btn */}
                <Disclosure.Button
                  className="rounded-xl p-2 text-white hover:text-gray-300 sm:hidden scale-90">
                  <Hamburger1 toggled={isOpen} toggle={setOpen} />
                </Disclosure.Button>

                {/* Desktop Links */}
                <div className="hidden space-x-10 sm:flex text-[17px]">

                  <Link href="/projects" className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300">
                      Projects
                  </Link>
                  <Link href="/competitions" className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300">
                      Competitions History
                  </Link>
                  <Link href="/press" className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300">
                      Press Releases
                  </Link>
                  <Link href="/mom" className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300">
                      Members of the Month
                  </Link>
                  <Link href="/officers" className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300">
                      Meet the Team
                  </Link>
                  <Link href="/login" className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300">
                      Login
                  </Link>
                  <Link href="/register" className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300">
                      Register
                  </Link>

                </div>

              </div>


            {/* Mobile Links */}
              <Transition
                show={open}
                enter="transition duration-500 ease-out"
                enterFrom="transform scale-95 opacity-100"
                enterTo="transform scale-100"
                leave="transition duration-250 ease-out"
                leaveFrom="transform scale-100 opacity-100"
                leaveTo="transform scale-95 opacity-0"
                className="relative"
              >
                <div
                  className="my-2 border-t border-emerald-800/40 sm:hidden mr-4 ml-[-7px]"
                >
                  <div className="mt-2 flex flex-col space-y-1">
                  <Link href="/" passHref className="mt-[3px]">
                      <Disclosure.Button
                        as="a"
                        className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                      >
                        Home
                      </Disclosure.Button>
                    </Link>
                    <Link href="/portfolio" passHref>
                      <Disclosure.Button
                        as="a"
                        className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                      >
                        Portfolio
                      </Disclosure.Button>
                    </Link>
                    <Link href="/blog" passHref>
                      <Disclosure.Button
                        as="a"
                        className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                      >
                        Blog
                      </Disclosure.Button>
                    </Link>
                    <Link href="/contact" passHref>
                      <Disclosure.Button
                        as="a"
                        className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                      >
                        Contact
                      </Disclosure.Button>
                    </Link>
                  </div>
                </div>
              </Transition>

            {/* Mobile Links */}
          </nav>
        )}
      </Disclosure>
    </motion.div>
  );
};

export default Nav;