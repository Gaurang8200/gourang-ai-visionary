import { useState } from "react";
import { Link } from "react-router-dom";
import { Block, H2, Eyebrow } from "@/components/PortfolioBlocks";
import { EXPERIENCE, EDUCATION } from "@/data/portfolio";

const STATS = [
  { n: "3+", label: "Years Experience" },
  { n: "3", label: "Companies" },
  { n: "2", label: "Degrees" },
  { n: "C1", label: "German and English" },
];

function ExperienceRow({ exp }: { exp: typeof EXPERIENCE[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-[#111111]/10">
      <button onClick={() => setOpen(!open)} className="w-full grid grid-cols-[auto_1fr_auto] md:grid-cols-[100px_1fr_1fr_auto] items-center gap-4 py-6 text-left group">
        <span className="text-sm font-semibold text-[#8a8a86]">{exp.period.split(" to ")[0]}</span>
        <span className="font-bold text-lg md:text-xl">{exp.company}</span>
        <span className="hidden md:block text-sm text-[#8a8a86]">{exp.role}</span>
        <svg className={`w-5 h-5 text-[#111111] transition-transform ${open ? "rotate-45" : ""}`} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M12 5v14M5 12h14" />
        </svg>
      </button>
      <div className={`accordion-panel ${open ? "open" : ""}`}>
        <div>
          <div className="pb-8 grid md:grid-cols-[1fr_2fr] gap-6">
            <div>
              <p className="text-sm font-semibold text-[#8a8a86] mb-1">{exp.period}</p>
              <p className="text-sm text-[#8a8a86]">{exp.location}</p>
              {exp.status === "active" && (
                <span className="inline-block mt-3 px-3 py-1 rounded-full bg-[#ff5b2e] text-white text-xs font-bold uppercase">Current Role</span>
              )}
            </div>
            <div>
              <p className="leading-relaxed mb-4 text-[#111111]/80">{exp.description}</p>
              <ul className="space-y-2 mb-4">
                {exp.achievements.map((a, i) => (
                  <li key={i} className="flex gap-3 text-sm leading-relaxed text-[#111111]/70">
                    <span className="mt-2 w-1 h-1 rounded-full bg-[#ff5b2e] flex-shrink-0" />
                    <span>{a}</span>
                  </li>
                ))}
              </ul>
              <div className="flex flex-wrap gap-2">
                {exp.stack.map((t) => (
                  <span key={t} className="px-2.5 py-1 rounded-full bg-[#111111]/5 text-xs font-semibold">{t}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <>
      <Block bg="#f5f5f3">
        <Eyebrow>Journey</Eyebrow>
        <H2>Where I have worked</H2>
        <p className="text-lg text-[#111111]/70 max-w-2xl mb-12">
          From safety critical ADAS validation at Accenture to sustainable cloud infrastructure at BMW Group.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mb-16 pt-8 border-t border-[#111111]/10">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-extrabold text-4xl mb-1">{s.n}</div>
              <div className="text-xs font-medium text-[#8a8a86] uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>

        <div className="border-t border-[#111111]/10">
          {EXPERIENCE.map((exp) => <ExperienceRow key={exp.num} exp={exp} />)}
        </div>
      </Block>

      <Block bg="#111111" dark>
        <Eyebrow>Education</Eyebrow>
        <H2 className="text-white">Where I studied</H2>
        <div className="border-t border-white/10">
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="grid grid-cols-[100px_1fr] md:grid-cols-[140px_1fr_1fr] gap-4 py-6 border-b border-white/10">
              <span className="text-sm font-semibold text-white/50">{edu.period}</span>
              <span className="font-bold">{edu.degree}</span>
              <span className="hidden md:block text-sm text-white/50">{edu.school}</span>
            </div>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-sm font-medium text-white/50 mb-4">Open to new opportunities from July 2026</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-md bg-white text-[#111111] font-semibold hover:bg-[#ff5b2e] hover:text-white transition-colors">
            Let's Build Together
          </Link>
        </div>
      </Block>
    </>
  );
}
