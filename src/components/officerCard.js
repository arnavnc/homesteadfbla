"use client"
import Image from "next/image";

export default function OfficerCard({ name, position, bio, quote, image }) {
    return (
        <figure class="md:flex bg-white bg-opacity-5 rounded-xl p-8 md:p-0">
            <div class="pt-6 md:p-8 text-center md:text-left space-y-4 h-fit">
                <Image draggable={false} width={500} height={500} src={`/static/officers/${image}.JPG`} alt="" class="object-cover object-center h-96 opacity-75 rounded-l-lg rounded-r-lg mx-auto"/>
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
                        {quote}
                    </p>
                </blockquote>
            </div>
        </figure>
    )
  }
