import { useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import gsap from "gsap";
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
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" })
        .from(".hero-title", { opacity: 0, y: 50, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(".hero-btns", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".hero-badge", { opacity: 0, scale: 0.6, rotate: -20, duration: 0.8, ease: "back.out(1.6)" }, "-=0.6");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      <Block bg="#5fd4ff" className="!py-20 md:!py-28">
        <div className="hero-eyebrow inline-block px-4 py-1.5 rounded-full bg-[#0b0b12] text-white text-xs font-bold uppercase tracking-wide mb-8">
          AI Developer
        </div>
        <h1 className="hero-title font-extrabold leading-[0.95] tracking-tight text-[clamp(3rem,10vw,7.5rem)] mb-8">
          Gourangkumar<br />Monashara
        </h1>
        <p className="hero-desc text-[clamp(1.1rem,2vw,1.5rem)] font-medium max-w-2xl mb-10">
          I build cloud systems that hold up under real traffic, and I am spending more of every week teaching agents to help me do it.
        </p>
        <div className="hero-btns flex flex-wrap gap-4">
          <Link to="/projects" className="px-7 py-4 rounded-full bg-[#0b0b12] text-white font-semibold hover:-translate-y-0.5 transition-transform">
            See My Work
          </Link>
          <Link to="/contact" className="px-7 py-4 rounded-full bg-white text-[#0b0b12] font-semibold hover:-translate-y-0.5 transition-transform">
            Say Hello
          </Link>
        </div>
        <div className="hero-badge hidden md:flex absolute right-16 top-24 w-32 h-32 rounded-full bg-[#0b0b12] items-center justify-center rotate-6">
          <span className="text-white font-extrabold text-lg leading-tight text-center">BMW<br />Group</span>
        </div>
      </Block>
    </div>
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
