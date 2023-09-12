import Image from 'next/image'
import Nav from "@/components/Nav";
import Footer from "@/components/Footer";
// import Timeline from "@/components/CompetitionHistory";
// import CompetitionsHistory from '@/components/CompetitionHistory';


export default function Home() {
  return (
    <main className="mx-auto space-y-[-6px] pb-10 px-5 lg:px-0 min-h-screen">
          <Nav />
          <Footer />
    </main>
  )
}
