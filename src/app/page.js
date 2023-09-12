import Image from 'next/image'
import Nav from "@/components/nav";
import Footer from "@/components/footer"
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
            <h1 className='text-3xl font-bold mb-5'>About Us</h1>
            <div className='grid grid-cols-1 lg:grid-cols-3 gap-6'>
              
              <div className='rounded-lg border-2 border-red-violet bg-red-violet bg-opacity-30 
              px-8 py-6 pb-9'>
                <h1 className='text-xl font-semibold'>Competions</h1>
                <p className='text-gray-300 mt-2 mb-[50px]'>Homestead FBLA competes at Bay Section, States, and Nationals every year. We currently have 23 consecutive Bay Section Championships, 21 consecutive state championships, and 20 national championships.</p>
                <Link href="code.org" className='border-2 border-watermelon-red hover:bg-watermelon-red 
                ease-linear duration-200 cursor-pointer w-fit p-3 text-[15px] rounded-xl'>
                  View Our Competitive History
                </Link>
              </div>

              <div className='rounded-lg border-2 border-watermelon-red bg-watermelon-red bg-opacity-30 
              px-8 py-6 pb-9'>
                <h1 className='text-xl font-semibold'>Competions</h1>
                <p className='text-gray-300 mt-2 mb-9'>Homestead FBLA currently has 4 projects. The projects consist of the American Enterprise Project, the Community Service Project, the Partnership with Business Project, and the Software Ventures Project.</p>
                
                <div className='lg:flex lg:justify-between grid grid-cols-2 gap-y-5 lg:gap-0'>
                  <Link href="code.org" className='border-2 border-watermelon-red hover:bg-watermelon-red 
                  ease-linear duration-200 flex justify-center cursor-pointer w-16 p-3 text-[15px] rounded-xl'>
                    AE
                  </Link>

                  <Link href="code.org" className='border-2 border-watermelon-red hover:bg-watermelon-red 
                  ease-linear duration-200 cursor-pointer w-16 flex justify-center p-3 text-[15px] rounded-xl'>
                    CS
                  </Link>

                  <Link href="code.org" className='border-2 border-watermelon-red hover:bg-watermelon-red 
                  ease-linear duration-200 flex justify-center cursor-pointer w-16 p-3 text-[15px] rounded-xl'>
                    PWB
                  </Link>

                  <Link href="code.org" className='border-2 border-watermelon-red hover:bg-watermelon-red 
                  ease-linear duration-200 flex justify-center cursor-pointer w-16 p-3 text-[15px] rounded-xl'>
                    SV
                  </Link>
                </div>
              </div>

              <div className='rounded-lg border-2 border-melon bg-melon bg-opacity-30 
              px-8 py-6 pb-9'>
                <h1 className='text-xl font-semibold'>Competions</h1>
                <p className='text-gray-300 mt-2 mb-[50px]'>Homestead FBLA currently has 4 projects. The projects consist of the American Enterprise Project, the Community Service Project, the Partnership with Business Project, and the Software Ventures Project.</p>
                <Link href="code.org" className='border-2 border-red-300 hover:bg-red-300 
                ease-linear duration-200 cursor-pointer w-fit p-3 text-[15px] rounded-xl'>
                  View Our Competitive History
                </Link>
              </div>
              
            </div>
          </section>

          {/* Mobile Form  */}

          <section className='py-10 px-10 lg:px-16 bg-red-violet bg-opacity-20 block lg:hidden'>
            <h1 className='text-3xl font-bold mb-5'>Work With Us</h1>
            <form className="mx-auto max-w-md">
              <div className="mb-4">
                <label htmlFor="firstName" className="block text-base font-medium mb-2 text-red-400">First Name</label>
                <input type="text" id="firstName" name="firstName" className="bg-red-violet bg-opacity-60 text-white rounded-md py-2 px-3 w-full outline-none placeholder:text-red-200" placeholder='First and Last Name'/>
              </div>
              
              <div className="mb-4">
                <label htmlFor="email" className="block text-base font-medium mb-2 text-red-400">Email</label>
                <input type="email" id="email" name="email" className="bg-red-violet bg-opacity-60 text-white rounded-md py-2 px-3 w-full outline-none placeholder:text-red-200" placeholder='Ex. johndoe@example.com'/>
              </div>

              <div className="mb-4">
                <label htmlFor="message" className="block text-base font-medium mb-2 text-red-400">Message</label>
                <textarea id="message" name="message" rows="4" className="bg-red-violet bg-opacity-60 text-white rounded-md py-2 px-3 w-full outline-none placeholder:text-red-200" placeholder='Hey there! My name is John Doe...'></textarea>
              </div>
              
              <div className="text-center">
                <button type="submit" className="bg-watermelon-red text-white py-2 px-4 rounded-md hover:bg-opacity-75 transition duration-300 ease-in-out">Submit</button>
              </div>
            </form>
          </section>
      
          <Footer />
    </main>
  )
}
