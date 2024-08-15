"use client"
import Image from "next/image";
import Link from "next/link";
import Aaron from "../../public/static/headshots/Aaron.JPG"
import Arnav from "../../public/static/faces-old/Arnav.png"

export default function MentorCard({ name, type, competition, desc, image }) {
    return (
        <div class="md:flex bg-white bg-opacity-5 rounded-xl p-8 md:p-0">
            <Image draggable={false} width={300} height={1000} src={Aaron} alt="" class="h-48 max-w-48 object-cover object-top opacity-50 rounded-l-lg rounded-r-lg md:rounded-r-none mx-auto ml-0"/>
            <div class="pt-6 md:p-5 text-center md:text-left justify-between flex flex-col">
                <div class="font-medium mb-3">
                    <div class="font-bold text-md text-red-violet">
                        Aaron Huang
                    </div>
                    <div class="text-xs text-melon">
                        Officer Mentor- Mobile Application Development, ...
                    </div>
                    <div class="text-xs text-white my-3 font-light">
                        Aaron is a ...
                    </div>
                </div>
            </div>
        </div>
    )
  }
