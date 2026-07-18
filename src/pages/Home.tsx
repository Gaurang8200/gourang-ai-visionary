import { Link } from "react-router-dom";
import { Block, Eyebrow } from "@/components/PortfolioBlocks";
import Mascot from "@/components/Mascot";

const SECTIONS = [
  { to: "/about", title: "About", desc: "Who I am and how I work.", bg: "#d8b4fe" },
  { to: "/skills", title: "Skills", desc: "The tools I reach for.", bg: "#ffb37a" },
  { to: "/projects", title: "Projects", desc: "Things I have built.", bg: "#fdf6ec" },
  { to: "/journey", title: "Journey", desc: "Where I have worked.", bg: "#7dd3fc" },
  { to: "/contact", title: "Contact", desc: "Let's talk.", bg: "#ff8fa3" },
];

function HeroSection() {
  return (
    <Block bg="#5fd4ff" className="!py-20 md:!py-28">
      <div className="animate-fade-up inline-block px-4 py-1.5 rounded-full bg-[#0b0b12] text-white text-xs font-bold uppercase tracking-wide mb-8">
        AI Developer
      </div>
      <h1 className="animate-fade-up font-extrabold leading-[0.95] tracking-tight text-[clamp(3rem,10vw,7.5rem)] mb-8" style={{ animationDelay: "0.08s" }}>
        Gourangkumar<br />Monashara
      </h1>
      <p className="animate-fade-up text-[clamp(1.1rem,2vw,1.5rem)] font-medium max-w-2xl mb-10" style={{ animationDelay: "0.16s" }}>
        I build cloud systems that hold up under real traffic, and I am spending more of every week teaching agents to help me do it.
      </p>
      <div className="animate-fade-up flex flex-wrap gap-4" style={{ animationDelay: "0.24s" }}>
        <Link to="/projects" className="px-7 py-4 rounded-full bg-[#0b0b12] text-white font-semibold hover:-translate-y-0.5 transition-transform">
          See My Work
        </Link>
        <Link to="/contact" className="px-7 py-4 rounded-full bg-white text-[#0b0b12] font-semibold hover:-translate-y-0.5 transition-transform">
          Say Hello
        </Link>
      </div>
    </Block>
  );
}

export default function Home() {
  return (
    <>
      <HeroSection />
      <Mascot />
      <Block bg="#0b0b12" dark>
        <Eyebrow>Explore</Eyebrow>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {SECTIONS.map((s) => (
            <Link key={s.to} to={s.to} className="group rounded-2xl p-7 hover:-translate-y-1 transition-transform" style={{ background: s.bg }}>
              <h3 className="font-extrabold text-2xl text-[#0b0b12] mb-2">{s.title}</h3>
              <p className="text-[#0b0b12]/70 font-medium text-sm mb-4">{s.desc}</p>
              <span className="text-[#0b0b12] font-bold text-sm inline-flex items-center gap-2 group-hover:gap-3 transition-all">
                Open
                <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M5 12h14M13 5l7 7-7 7" />
                </svg>
              </span>
            </Link>
          ))}
        </div>
      </Block>
    </>
  );
}
