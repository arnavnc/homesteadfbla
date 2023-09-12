import Image from 'next/image'
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
// import Timeline from "@/components/CompetitionHistory";
// import CompetitionsHistory from '@/components/CompetitionHistory';
import Arnav from "../../public/static/officers.jpg"
import Link from 'next/link';

export default function Home() {
  return (
    <main className="mx-auto space-y-[-6px] pb-10 lg:px-0 min-h-screen">
          <Image src={Arnav} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] z-[-10]" draggable={false}/>
          <Nav />
          <main className='lg:flex flex-cols-2 justify-evenly'>
            <div className="flex flex-col text-center items-center lg:items-start lg:text-left justify-center h-[50vh] lg:min-h-[80vh] py-2 px-5 md:px-20 space-y-5">
                <h1 className="text-4xl lg:text-6xl font-bold">Homestead FBLA</h1>
                <p className='text-xl lg:text-3xl font-medium '>The #1 Chapter in the Nation</p>
                <Link className='rounded-md bg-red-violet w-fit px-4 py-2 hover:brightness-75 transition ease-linear duration-300' href="">Watch Video &rarr;</Link>
            </div>
            <div className="rounded-lg hidden w-1/3 lg:flex flex-col text-center lg:text-left justify-center h-[50vh] lg:min-h-[80vh] py-2 gap-x-10 pr-10">
              <Image src={Arnav} className='object-cover h-full my-10 rounded-lg'/>
            </div>
          </main>
          <section className='py-10 px-10 lg:px-16 bg-red-violet bg-opacity-20'>
            <h1 className='text-3xl font-bold mb-5'>HEader</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              <div className='rounded-lg border-2 border-red-violet bg-red-violet bg-opacity-30 px-8 py-6'>
                <h1>Blah</h1>
                <p>Blah</p>
              </div>
              <div className='rounded-lg border-2 border-watermelon-red bg-watermelon-red bg-opacity-40 px-8 py-6'>
                <h1>Blah</h1>
                <p>Blah</p>
              </div>
              <div className='rounded-lg border-2 border-melon bg-melon bg-opacity-20 px-8 py-6'>
                <h1>Blah</h1>
                <p>Blah</p>
              </div>
              
            </div>
          </section>
          <Footer />
    </main>
  )
}
