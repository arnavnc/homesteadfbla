"use client"

import Image from "next/image";
import logo from "../../public/static/faces/ChloeL.png"

export default function OfficerCard() {
    return (
        <figure class="md:flex bg-black bg-opacity-25 rounded-xl p-8 md:p-0">
            <Image src={logo} alt="" class="w-32 h-48 md:w-48 md:h-auto md:rounded-l-lg md:rounded-r-none rounded-l-lg rounded-r-lg mx-auto"/>
            <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                <figcaption class="font-medium">
                    <div class="font-bold text-xl text-watermelon-red">
                    Chloe Lu
                    </div>
                    <div class="text-md text-slate-300">
                    Executive VP - Development
                    </div>
                </figcaption>
                <blockquote>
                    <p class="text-md">
                    My name is Chloe Lu, and I am this year's Executive Vice President of Development. I am super excited to get to know the new members this year and see you all at the next project meetings! A little about me is that I love listening to live music, staying at Carmel by the Sea, eating Italian food, and learning American Sign Language in my free time. I will see you around campus, don't forget to say hi.
                    </p>
                </blockquote>
                <blockquote>
                    <p class="text-sm font-light italic">
                    “The elevator to success is out of order. You'll have to use the stairs. One step at a time.”
                    </p>
                </blockquote>
            </div>
        </figure>
    )
  }
