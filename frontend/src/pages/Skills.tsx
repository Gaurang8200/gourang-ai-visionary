import { useState } from "react";
import { Block, H2, Eyebrow, PageNextLink } from "@/components/PortfolioBlocks";
import { SKILLS } from "@/data/portfolio";

function SkillRow({ s }: { s: typeof SKILLS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10">
      <button onClick={() => setOpen(!open)} className="w-full flex items-center justify-between py-8 text-left group">
        <span className="font-extrabold text-[clamp(1.5rem,4vw,2.8rem)] tracking-tight text-white/30 group-hover:text-white transition-colors">
          {s.title} <sup className="text-lg text-[#ff5b2e]">({s.num})</sup>
        </span>
        <svg className={`w-6 h-6 flex-shrink-0 text-white transition-transform ${open ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className={`accordion-panel ${open ? "open" : ""}`}>
        <div>
          <div className="pb-8 grid md:grid-cols-[2fr_1fr] gap-6">
            <p className="text-white/70 leading-relaxed">{s.blurb}</p>
            <div className="flex flex-wrap gap-2 content-start">
              {s.tags.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full border border-white/15 text-xs font-medium text-white/80">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Skills() {
  return (
    <>
      <Block bg="#111111" dark>
        <Eyebrow>My Stack</Eyebrow>
        <H2 className="text-white">Tools I reach for</H2>
        <div className="mt-10 border-t border-white/10">
          {SKILLS.map((s) => <SkillRow key={s.num} s={s} />)}
        </div>
      </Block>
      <PageNextLink to="/projects" label="See My Projects" />
    </>
  );
}
