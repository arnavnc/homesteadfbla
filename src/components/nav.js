"use client";

import Link from "next/link";
import { AnimatePresence, motion } from "framer-motion";
import { Disclosure, Transition } from "@headlessui/react";
import { useState, useEffect } from "react";
import {Divide as Hamburger} from "hamburger-react";
import Image from "next/image";
import { getAuth, onAuthStateChanged, signOut } from "firebase/auth";
import logo from "../../public/static/logo.png";
import Dropdown from "./Dropdown";
import MobileDropdown from "./MobileDropdown";

const Nav = () => {
  const [isOpen, setOpen] = useState(false);
  const [user, setUser] = useState(null);

  useEffect(() => {
    const auth = getAuth();
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
    const auth = getAuth();
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
                <div className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300 cursor-pointer">
                  <Dropdown />
                </div>
                <Link
                  href="/competitions"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300"
                >
                  Competitions History
                </Link>
                <Link
                  href="/press"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300"
                >
                  Press Releases
                </Link>
                <Link
                  href="/mentors"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300"
                >
                  Mentors (Soon!)
                </Link>
                <Link
                  href="/officers"
                  className="rounded-md p-2 font-semibold text-dimWhite hover:text-gray-400 ease-linear duration-300"
                >
                  Meet the Team
                </Link>

                {user ? (
                  <button
                    onClick={handleLogout}
                    className="rounded-md p-2 border border-dark-chocolate py-2 px-3 text-warm-beige font-semibold ease-linear duration-300 hover:bg-dark-chocolate"
                  >
                    Logout
                  </button>
                ) : (
                  <span className="p-2 font-semibold text-dimWhite ease-linear duration-300">
                    <Link
                      href="/login"
                      className="rounded-md p-2 border border-dark-chocolate py-2 px-3 text-warm-beige font-semibold ease-linear duration-300 hover:bg-dark-chocolate"
                    >
                      Login
                    </Link>
                    <Link
                      disabled
                      href=""
                      className="disabled:border-green-500 ml-3 rounded-md border border-dark-chocolate bg-dark-chocolate text-warm-beige py-2 px-3 font-semibold ease-linear duration-300 hover:brightness-90"
                    >
                      Register (Soon!)
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
              <div className="my-2 border-t border-gray-800/40 sm:hidden mr-4 ml-[-7px] h-[240px]">
                <div className="mt-2 flex flex-col space-y-4">
                  <div className="mt-[3px] mb-[-9px]">
                    <div
                      as="a"
                      className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      <MobileDropdown />
                    </div>
                  </div>

                  <Link href="/competitions" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      Competitions History
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

                  <Link href="/officers" passHref>
                    <Disclosure.Button
                      as="a"
                      className="rounded-md p-2 font-semibold text-gray-300 hover:bg-gray-900/50"
                    >
                      Meet the Team
                    </Disclosure.Button>
                  </Link>

                  <div className="flex justify-between mx-10 mr-12 pt-4">
                    {user ? (
                      <button
                        onClick={handleLogout}
                        className="rounded-md bg-watermelon-red text-warm-beige py-2 px-3 
                          font-semibold ease-linear duration-300 hover:brightness-90"
                      >
                        Logout
                      </button>
                    ) : (
                      <>
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
                      </>
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
