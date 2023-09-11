import Nav from "@/components/nav";
import OfficerCard from "../../components/officerCard";
import officers from "../../data/officers.js";
import Footer from "@/components/footer";
import officersPic from "../../../public/static/officers.jpg"
import Image from "next/image";

export default function Officers() {
  return (
    <>
        <Nav />
        <div className="rounded-xl">  
            <Image src={officersPic} className="object-cover opacity-25 h-[60vh] w-[100vw] px-10"/>
        </div>
        
        <div className="px-10">
            <h1 className="text-4xl font-bold my-10">Meet our Team!</h1>

            
            <div className="border">
                <h2 className="text-2xl font-bold">The Executive Team</h2>
                {officers.exec.map((officer) => (
                <OfficerCard key={officer.name} {...officer} />
                ))}
            </div>

            
            <div className="my-10 bg-purple-600 bg-opacity-20 border-2 rounded-lg border-dashed border-purple-600 px-8 py-6">  
                <h2 className="text-purple-600 text-2xl font-bold mb-6">Operations Team</h2>
                <div className="grid grid-cols-3 gap-6">
                    {officers.ops.map((officer) => (
                    <OfficerCard key={officer.name} {...officer} />
                    ))}
                </div>
            </div>
            
            <div className="grid grid-4">
                <h2 className="text-2xl font-bold">Competitions Team</h2>
                {officers.comps.map((officer) => (
                <OfficerCard key={officer.name} {...officer} />
                ))}
            </div>

            
            {["ml", "ae", "cs", "pwb", "sv"].map((teamKey) => (
                <div key={teamKey}>
                <h2 className="text-2xl font-bold">Projects Team</h2>
                    <h3 className="text-lg font-bold">{getTeamTitle(teamKey)}</h3>
                    <div className="grid grid-2">
                        {officers.projects[teamKey].map((officer) => (
                        <OfficerCard key={officer.name} {...officer} />
                        ))}
                    </div>
                </div>
            ))}
        </div>
        <Footer />
    </>
    
  );
}

// Function to get readable team titles
function getTeamTitle(key) {
  const titles = {
    ml: "Middle Level",
    ae: "American Enterprise",
    cs: "Community Service",
    pwb: "Partnership with Business",
    sv: "Software Ventures",
  };
  return titles[key];
}
