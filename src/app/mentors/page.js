import Nav from "@/components/nav";
import MentorCard from "../../components/MentorCard";
import advisers from "../../data/advisers.js";
import Footer from "@/components/footer";
import advisersPic from "../../../public/static/advisers.jpg";
import Image from "next/image";

export default function Officers() {
  return (
    <>
      <Image
        src={advisersPic}
        className="fixed bg-scroll object-cover object-bottom opacity-10 h-[100vh] w-[100vw] z-[-10]"
        draggable={false}
      />
      <Nav />
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 px-10 my-10 gap-4"></div>
      <div className="px-10">
        <h2 className="text-watermelon-red text-2xl font-bold mb-6">
          Our Mentors ❤️
        </h2>
        <p className="text-lg italic font-light">
          Here are the dedicated collection of professionals, alumni, officers,
          and students who support our chapter competitors as committed mentors.
        </p>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 my-10">
          {advisers.map((adviser) => (
            <MentorCard key={adviser.name} {...adviser} />
          ))}
        </div>
      </div>
      <Footer />
    </>
  );
}
