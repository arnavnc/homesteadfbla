import Nav from "@/components/nav";
import Image from "next/image";
import officersPic from "../../../public/static/officers.jpg"
import Footer from "@/components/footer";

export default function Press() {
  return (
    <>
      <Nav />
      <Image src={officersPic} className="fixed blur-sm bg-scroll object-cover opacity-10 h-[100vh] w-[100vw] z-[-10]" draggable={false}/>
      <Footer />
    </>
  );
}