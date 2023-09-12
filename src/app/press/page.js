import Nav from "@/components/nav";
import Image from "next/image";
import officersPic from "../../../public/static/officers.jpg"
import Footer from "@/components/footer";
import pressData from "../../data/press.js";
import PDFCard from "@/components/PDFCard";
import Link from "next/link";

export default function Press() {
  return (
    <>
      <Nav />
      <Image src={officersPic} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] w-[100vw] z-[-10]" draggable={false}/>
      <div className="border-2 border-dark-chocolate bg-dark-chocolate p-10 m-10 rounded-xl bg-opacity-30">
        <h1 className="text-3xl font-bold">Press</h1>
        <p className="mt-3 text-lg">View our past press releases below. For any press related inquiries, email <Link href="mailto:press@hhsfbla.com" className="text-watermelon-red underline inline">press@hhsfbla.com</Link> and our press team will reach out to you within 48 hours.</p>
      </div>
      <div className="px-10 grid grid-cols-2 lg:grid-cols-2 2xl:grid-cols-3 gap-4">
        {pressData.map((press) => (
           <PDFCard key={press.title} {...press} />
        ))}
      </div>
      <Footer />
    </>
  );
}