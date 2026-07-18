import { useEffect, useRef } from "react";
import gsap from "gsap";
import { Block, H2, Eyebrow, PageNextLink } from "@/components/PortfolioBlocks";
import { PROJECTS } from "@/data/portfolio";

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(max-width: 768px)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const xPct = (e.clientX - r.left) / r.width - 0.5;
      const yPct = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: xPct * 8, rotateX: yPct * -8, duration: 0.4, ease: "power2.out", transformPerspective: 1000 });
    };
    const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power2.out" });
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="bg-[#0b0b12] text-white rounded-2xl p-7" style={{ transformStyle: "preserve-3d" }}>
      <div className="flex items-center justify-between mb-5">
        <span className="font-extrabold text-3xl opacity-15">{p.icon}</span>
        <span className="text-xs font-bold opacity-40">{p.num}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {p.tags.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${p.accent}22`, color: p.accent }}>{t}</span>
        ))}
      </div>
      <h3 className="font-bold text-xl mb-3">{p.title}</h3>
      <p className="text-sm opacity-70 leading-relaxed mb-5">{p.desc}</p>
      <a href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: p.accent }}>
        {p.linkLabel}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </a>
    </div>
  );
}

export default function Projects() {
  return (
    <>
      <Block bg="#fdf6ec">
        <Eyebrow>Selected Work</Eyebrow>
        <H2>Some things I have built</H2>
        <div className="grid md:grid-cols-2 gap-5">
          {PROJECTS.map((p) => <ProjectCard key={p.num} p={p} />)}
        </div>
      </Block>
      <PageNextLink to="/journey" label="See My Journey" />
    </>
  );
}
