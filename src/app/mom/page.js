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
        <div className="my-10 bg-blue-600 bg-opacity-20 border-2 rounded-lg border-blue-600 px-8 py-6">
          <h2 className="text-blue-600 text-2xl font-bold mb-6">Member of the Month</h2>
          
          {/* Display Rohan's Image */}
          <div className="flex justify-center">
            <Image
              src={rohanPic} // Use the imported image
              alt="Rohan - Member of the Month"
              className="rounded-lg"
              width={500} // Adjust the size as needed
              height={500}
              draggable={false}
            />
          </div>

          <div className="text-center mt-4">
            <h3 className="text-xl font-bold">Rohan Bedekar</h3>
            <p className="text-md text-gray-500">September Member of the Month</p>
          </div>
        </div>
      </div>
      
      <Footer />
    </>
  );
}