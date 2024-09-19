import Nav from "@/components/nav";
import Image from "next/image";
import officersPic from "../../../public/static/officers.jpg";
import Footer from "@/components/footer";
import rohanPic from "../../../public/static/mom/Rohan.jpg"; // Import Rohan's image

export default function mom() {
  return (
    <>
      {/* Background image */}
      <Image
        src={officersPic}
        className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] w-[100vw] z-[-10]"
        draggable={false}
      />
      
      <Nav />
      
      <div className="px-10">
        <div className="my-10 bg-blue-600 bg-opacity-20 border-2 rounded-lg border-blue-300 px-8 py-6">
          <h2 className="text-blue-600 text-2xl font-bold mb-6">Member of the Month</h2>

          {/* Flex container to align image and description side by side */}
          <div className="flex flex-col md:flex-row md:space-x-8 items-center md:items-start">
            
            {/* Left: Rohan's Image */}
            <div className="flex-shrink-0">
              <Image
                src={rohanPic}
                alt="Rohan - Member of the Month"
                className="rounded-lg"
                width={500}  // Increased width for larger image
                height={500} // Increased height for larger image
                draggable={false}
              />
            </div>

            {/* Right: Description and facts */}
            <div className="mt-6 md:mt-0">
              <h3 className="text-xl font-bold mb-2">Rohan</h3>
              <p className="text-md text-white-500 mb-4">September Member of the Month</p>

              {/* Facts about Rohan */}
              <ul className="list-disc list-inside text-left text-md text-white-700">
                <li><span className="font-semibold">He is a junior.</span></li>
                <li><span className="font-semibold">He loves to eat.</span></li>
                <li><span className="font-semibold">He has an older sister.</span></li>
              </ul>
            </div>
            
          </div>
        </div>
      </div>

      <Footer />
    </>
  );
}