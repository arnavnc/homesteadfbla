"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import Image from "next/image";
import { getAuth, onAuthStateChanged, signOut} from "firebase/auth";
import logo from "../../public/static/logo.png";
import Dropdown from "./Dropdown";
import MobileDropdown from "./MobileDropdown";
import { Divide as Hamburger } from "hamburger-react";
import {auth} from "@/app/firebase"

const Nav = () => {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState(null);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    // const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUser(user);
      } else {
        setUser(null);
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = async () => {
    // const auth = getAuth();
    await signOut(auth);
    window.location.href = "/";
  };

  return (
    <motion.div
      initial={{ y: -5, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.1 }}
      className="sticky top-0 z-40 backdrop-blur-lg shadow-2xl rounded-xl rounded-t-none ease-linear duration-200"
    >
      <Disclosure as="nav" className="w-full space-x-4 rounded-xl px-4 py-0">
        {({ open }) => (
          <nav className="flex justify-between space-x-8 rounded-xl flex-col">
            <div className="flex flex-row justify-between xl:mx-10">
              <Link
                href="/"
                className="space-x-3 sm:flex text-[18px] rounded-md p-2 pl-4 xl:pt-2 md:pt-2 pt-5 
                font-semibold hover:scale-105 cursor-pointer ease-linear duration-150"
              >
                <Image
                  className="relative w-16 h-16 my-auto"
                  alt="SciLynk Logo"
                  placeholder="blur"
                  draggable="false"
                  src={logo}
                />
                <p className="my-auto sm:block hidden">Homestead FBLA</p>
              </Link>

              {/* Mobile Open/Close Btn */}
              <Disclosure.Button className="rounded-xl p-2 text-white hover:text-gray-300 sm:hidden scale-90">
                <Hamburger toggled={isOpen} toggle={setOpen} />
              </Disclosure.Button>

              {/* Desktop Links */}
              <div className="hidden space-x-4 sm:flex text-sm my-auto">
                {/* <div className="rounded-md p-2 font-semibold text-dimWhite hover:text-watermelon-red ease-linear duration-300 cursor-pointer">
                  <Dropdown />
                </div> */}
                <Link
                  href="/officers"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-watermelon-red ease-linear duration-300"
                >
                  Meet the Team
                </Link>
                <Link
                  href="/competitions"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-watermelon-red ease-linear duration-150"
                >
                  Competition Information
                </Link>
                <Link
                  href="/mentors"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-watermelon-red ease-linear duration-300"
                >
                  Mentors
                </Link>
                <Link
                  href="/press"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-watermelon-red ease-linear duration-300"
                >
                  Press Releases
                </Link>
{/* 
                <Link
                  href="/mom"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-watermelon-red ease-linear duration-300"
                >
                  Member of the Month(MOM)
                </Link> */}

                {user ? (
                  <div className="relative">
                    <button
                      onClick={() => setMenuOpen(!menuOpen)}
                      className="flex items-center space-x-2"
                    >
                      <img
                        src={user.photoURL}
                        alt="Profile"
                        className="w-9 h-9 rounded-full"
                      />
                    </button>
                    {menuOpen && (
                      <div className="absolute right-0 mt-2 w-36 bg-white rounded-md shadow-lg py-2">
                        <Link
                          href="/profile"
                          className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          My Profile
                        </Link>
                        <Link
                          href="/points"
                          className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          Activity Points
                        </Link>
                        <button
                          onClick={handleLogout}
                          className="block w-full text-left px-4 py-1 text-gray-700 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </div>
                    )}
                  </div>
                ) : (
                  <span className="p-2 font-semibold text-dimWhite ease-linear duration-300">
                    <Link
                      href="/login"
                      className="rounded-md p-2 border border-dark-chocolate py-2 px-3 text-warm-beige font-semibold ease-linear duration-300 hover:bg-dark-chocolate"
                    >
                      Login
                    </Link>
                    <Link
                      href="/register"
                      className="disabled:border-green-500 ml-3 rounded-md border border-dark-chocolate bg-dark-chocolate text-warm-beige py-2 px-3 font-semibold ease-linear duration-300 hover:brightness-90"
                    >
                      Register
                    </Link>
                  </span>
                )}
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
              <div className="my-2 border-t border-gray-800/40 sm:hidden mr-4 ml-[-7px] h-[345px] rounded-lg">
                <div className="mt-2 flex flex-col space-y-4">
                  {/* <div className="mt-[3px] mb-[-9px]">
                    <div
                      as="a"
                      className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      <MobileDropdown />
                    </div>
                  </div> */}
                  <Link href="/officers" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 pb-0 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      Meet the Team
                    </Disclosure.Button>
                  </Link>
                  <Link href="/mentors" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      Mentors
                    </Disclosure.Button>
                  </Link>
                  <Link href="/competitions" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      Competition Information
                    </Disclosure.Button>
                  </Link>
                  <Link href="/press" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      Press Releases
                    </Disclosure.Button>
                  </Link>
{/* 
                  <Link href="/mom" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      Member of the Month
                    </Disclosure.Button>
                  </Link> */}

                  <div className="">
                    {user ? (
                      <div className="flex flex-col space-y-4">
                      <hr className="border-white border-opacity-25 mx-2" />

                      <Link href="/profile" passHref>
                        <Disclosure.Button
                          as="a"
                          className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                        >
                          View Profile
                        </Disclosure.Button>
                      </Link>
                      <Link href="/points" passHref>
                        <Disclosure.Button
                          as="a"
                          className="rounded-md p-2 pb-0 font-semibold text-gray-300 hover:bg-gray-900/50"
                        >
                          Activity Points
                        </Disclosure.Button>
                      </Link>
                      <div>
                        <Disclosure.Button
                          onClick={handleLogout}
                          className="rounded-md p-2 pt-0 font-semibold text-red-400 hover:bg-gray-900/50 justify-start"
                          >
                            Logout
                        </Disclosure.Button>
                      </div>
                      </div>
                    ) : (
                      <div className="flex justify-between mx-10 mr-12 pt-4">
                        <Link href="/login" passHref>
                          <Disclosure.Button
                            as="a"
                            className="rounded-md bg-watermelon-red text-warm-beige py-2 px-3 
                            font-semibold ease-linear duration-300 hover:brightness-90"
                          >
                            Login
                          </Disclosure.Button>
                        </Link>

                        <Link href="/register" passHref>
                          <Disclosure.Button
                            as="a"
                            className="rounded-md p-2 py-2 px-3 text-warm-beige font-semibold ease-linear duration-300 bg-red-900"
                          >
                            Register
                          </Disclosure.Button>
                        </Link>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            </Transition>
          </nav>
        )}
      </Disclosure>
    </motion.div>
  );
};

export default Nav;