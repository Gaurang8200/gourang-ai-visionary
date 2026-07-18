import { Link } from "react-router-dom";
import { Block, Eyebrow } from "@/components/PortfolioBlocks";
import hero from "@/assets/photos/raw2.jpg";

const SECTIONS = [
  { to: "/about", title: "About", desc: "Who I am and how I work." },
  { to: "/skills", title: "Skills", desc: "The tools I reach for." },
  { to: "/projects", title: "Works", desc: "Things I have built." },
  { to: "/journey", title: "Journey", desc: "Where I have worked." },
  { to: "/contact", title: "Contact", desc: "Let's talk." },
];

function HeroSection() {
  return (
    <div className="relative h-[92vh] min-h-[640px] overflow-hidden">
      <img src={hero} alt="Gourangkumar Monashara" className="photo-treated absolute inset-0 w-full h-full object-cover" style={{ objectPosition: "50% 20%" }} />
      <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/10 to-black/40" />

      <div className="animate-fade-up absolute top-28 md:top-32 left-6 md:left-10 max-w-xs text-white text-sm font-medium leading-relaxed">
        Building Cloud Systems<br />that Speak the Language<br />of Real Traffic
      </div>

      <div className="absolute top-28 md:top-32 right-6 md:right-10 w-14 h-14 rounded-full border border-white/60 flex items-center justify-center text-white text-xs">
        &reg;
      </div>

      <div className="animate-fade-up absolute bottom-0 left-0 right-0 px-4 md:px-8 pb-2 md:pb-4" style={{ animationDelay: "0.15s" }}>
        <h1 className="font-extrabold text-white leading-[0.8] tracking-tight text-[clamp(3.5rem,15vw,11rem)] whitespace-nowrap">
          gourang
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
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-px bg-[#111111]/10 border border-[#111111]/10">
          {SECTIONS.map((s) => (
            <Link key={s.to} to={s.to} className="group bg-[#f5f5f3] hover:bg-[#111111] p-8 transition-colors">
              <h3 className="font-extrabold text-2xl mb-2 group-hover:text-white transition-colors">{s.title}</h3>
              <p className="text-sm text-[#8a8a86] group-hover:text-white/60 mb-6 transition-colors">{s.desc}</p>
              <span className="text-sm font-bold text-[#ff5b2e] inline-flex items-center gap-2 group-hover:gap-3 transition-all">
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
