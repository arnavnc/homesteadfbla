import Image from 'next/image'
import Nav from "@/components/nav";
import Footer from "@/components/footer"
import Arnav from "../../../public/static/officers.jpg"
import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto space-y-[-6px] pb-10 lg:px-0 min-h-screen">
          <Image src={Arnav} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]" draggable={false}/>
          <Nav />
          <main className='lg:flexjustify-evenly'>
            <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center h-[90vh] lg:h-[70vh] py-2 px-5 md:px-20 space-y-5">
                <h1 className="text-4xl lg:text-6xl font-bold lg:mt-10">Competions History</h1>
                <p className='text-xl lg:text-3xl font-medium text-gray-300 pb-20'>View Homestead FBLA&apos;s Competitive History Through the Years</p>
                
                <div className='bg-watermelon-red w-full p-10 rounded-2xl 
                flex flex-col lg:flex-row justify-center lg:justify-normal bg-opacity-75 gap-10'>
                    <div className='w-full'>
                        Name
                    </div>

                    <div className='w-full'>
                        Year
                    </div>

                    <div className='w-full'>
                        Conferences
                    </div>

                    <div className='w-full'>
                        Events
                    </div>

                    <div className='w-full'>
                        Place
                    </div>
                 </div>
            </div>
            

          </main>
          
       
          <Footer />
    </main>
  )
}
