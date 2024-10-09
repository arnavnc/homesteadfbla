"use client"
import Image from "next/image";
import Link from "next/link";
import { BiRightArrowAlt } from 'react-icons/bi'

export default function PDFCard({ title, date, desc, link, image }) {
    return (
        <div class="md:flex bg-white bg-opacity-5 rounded-xl p-8 md:p-0">
            <Image draggable={false} width={300} height={1000} src={`/static/pdf/${image}.png`} alt="" class="object-cover object-left opacity-50 rounded-l-lg rounded-r-lg md:rounded-r-none mx-auto"/>
            <div class="pt-6 md:p-8 text-center md:text-left justify-between flex flex-col">
                <div class="font-medium mb-3">
                    <div class="font-bold text-xl text-red-violet">
                    {title}
                    </div>
                    <div class="text-lg text-melon">
                    {date}
                    </div>
                    <div class="text-sm text-white my-3 font-light">
                    {/* {desc} */}
                    </div>
                </div>
                <div className="bg-dark-chocolate rounded-md px-3 py-2 w-full text-center text-sm border-2 border-dark-chocolate hover:brightness-90 transition ease-linear duration-300">
                    <Link href={link} target="blank" className="flex flex-row group justify-center text-lg lg:text-[17px] lg:justify-start">
                        View Press Release <BiRightArrowAlt className='mt-[6px] scale-[1.35] ml-[7px] group-hover:translate-x-1 ease-linear duration-150 sm:block hidden'/>
                    </Link>
                </div>
                
            </div>
        </div>
    )
  }
