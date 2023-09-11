"use client"

import Image from "next/image";
import Saanika from "../../public/static/faces/Saanika.png"
import Chloe from "../../public/static/faces/ChloeL.png"
import Nitya from "../../public/static/faces/Nitya.png"
import Arnav from "../../public/static/faces/Arnav.png"
import Bhavya from "../../public/static/faces/Bhavya.png"
import Bridget from "../../public/static/faces/Bridget.png"
import Eric from "../../public/static/faces/Eric.png"
import Ian from "../../public/static/faces/Ian.png"
import ChloeK from "../../public/static/faces/ChloeK.png"
import Adithya from "../../public/static/faces/Giri.png"
import Samhitha from "../../public/static/faces/Samhitha.png"
import Krishna from "../../public/static/faces/Krishna.png"
import Vincent from "../../public/static/faces/Vincent.png"
import ChloeW from "../../public/static/faces/ChloeW.png"
import Smyan from "../../public/static/faces/Smyan.png"
import Aayushma from "../../public/static/faces/Aayushma.png"
import Varun from "../../public/static/faces/Varun.png"
import Jane from "../../public/static/faces/Jane.png"
import Alex from "../../public/static/faces/Alex.png"
import Aayush from "../../public/static/faces/Aayush.png"

export default function OfficerCard({ name, position, bio, quote, image }) {
    return (
        <figure class="md:flex bg-white bg-opacity-5 rounded-xl p-8 md:p-0">
            {/* <Image fill={true} src={{image}} alt="" class="w-32 h-48 md:w-48 md:h-auto md:rounded-l-lg md:rounded-r-none rounded-l-lg rounded-r-lg mx-auto"/> */}
            <div class="pt-6 md:p-8 text-center md:text-left space-y-4">
                <figcaption class="font-medium">
                    <div class="font-bold text-xl text-watermelon-red">
                    {name}
                    </div>
                    <div class="text-md text-slate-300">
                    {position}
                    </div>
                </figcaption>
                <blockquote>
                    <p class="text-md">
                    {bio}
                    </p>
                </blockquote>
                <blockquote>
                    <p class="text-sm font-light italic">
                    "{quote}"
                    </p>
                </blockquote>
            </div>
        </figure>
    )
  }
