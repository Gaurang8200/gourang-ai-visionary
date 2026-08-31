import { Link } from "react-router-dom";
import { Block, Eyebrow } from "@/components/PortfolioBlocks";
import Tilt3D from "@/components/Tilt3D";
import WaterHero from "@/components/WaterHero";
import hero from "@/assets/photos/hero.jpg";

const SECTIONS = [
  { to: "/about", title: "About", desc: "Who I am and how I work." },
  { to: "/skills", title: "Skills", desc: "The tools I reach for." },
  { to: "/projects", title: "Projects & Certification", desc: "Things I have built and earned." },
  { to: "/journey", title: "Professional Experience", desc: "Where I have worked." },
  { to: "/contact", title: "Contact", desc: "Let's talk." },
];

function HeroSection() {
  return (
    <div className="relative h-[92vh] min-h-[640px] overflow-hidden">
      <WaterHero src={hero} imgStyle={{ objectPosition: "60% 30%" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/30 pointer-events-none" />

      <div className="animate-fade-up absolute top-28 md:top-32 left-6 md:left-10 max-w-sm text-white text-sm font-medium leading-relaxed pointer-events-none">
        AI Systems Developer building agents,<br />cloud services and the automation<br />that keeps them honest
      </div>

      <div className="animate-fade-up absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-2 md:pb-4 pointer-events-none" style={{ animationDelay: "0.15s" }}>
        <p className="text-white/80 font-semibold text-lg md:text-2xl mb-1 md:mb-2">Hello, I am</p>
        <h1 className="font-extrabold text-white leading-[0.8] tracking-tight text-[clamp(3.5rem,15vw,11rem)] whitespace-nowrap">
          Gourang
        </h1>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <Block bg="#f5f5f3">
        <Eyebrow>AI Developer</Eyebrow>
        <p className="font-extrabold leading-[1.05] tracking-tight text-[clamp(2rem,5vw,3.5rem)] max-w-3xl mb-16">
          I build cloud systems that hold up under real traffic, and spend more of every week teaching agents to help me do it.
        </p>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5" style={{ perspective: "1200px" }}>
          {SECTIONS.map((s) => (
            <Tilt3D key={s.to} max={10}>
              <Link to={s.to} className="group block h-full bg-white hover:bg-[#111111] p-8 rounded-2xl border border-[#111111]/10 transition-colors">
                <h3 className="font-extrabold text-2xl mb-2 group-hover:text-white transition-colors">{s.title}</h3>
                <p className="text-sm text-[#8a8a86] group-hover:text-white/60 mb-6 transition-colors">{s.desc}</p>
                <span className="text-sm font-bold text-[#ff5b2e] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                  Open
                  <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M5 12h14M13 5l7 7-7 7" />
                  </svg>
                </span>
              </Link>
            </Tilt3D>
          ))}
        </div>
      </Block>
    </>
  );
}
