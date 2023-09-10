import Image from 'next/image'
import Nav from "@/components/nav";
import Timeline from "@/components/timeline";


export default function Home() {
  return (
    <main className="mx-auto space-y-[-6px] pb-10 px-5 lg:px-0 min-h-screen">
          <Nav />
          <Timeline />
    </main>
  )
}
