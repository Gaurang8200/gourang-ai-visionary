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

function ExperienceStackCard({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const visibleAch = expanded ? exp.achievements : exp.achievements.slice(0, 3);
  const hiddenCount = exp.achievements.length - 3;

  return (
    <div className="sticky" style={{ top: `${88 + index * 32}px`, zIndex: index + 1 }}>
      <div className="rounded-[32px] p-8 md:p-12 shadow-2xl" style={{ background: exp.accent, color: "#0b0b12" }}>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <span className="text-xs font-bold uppercase tracking-wide opacity-60">{exp.period}</span>
          {exp.status === "active" && (
            <span className="px-3 py-1 rounded-full bg-[#0b0b12] text-white text-xs font-bold uppercase">Current Role</span>
          )}
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
          <div>
            <h3 className="font-extrabold text-[clamp(2rem,4vw,3rem)] leading-[0.95] mb-3">{exp.company}</h3>
            <p className="font-semibold text-lg mb-1">{exp.role}</p>
            <p className="text-sm font-medium opacity-70">{exp.type}</p>
            <p className="text-sm font-medium opacity-70 mt-1">{exp.location}</p>
          </div>

          <div>
            <p className="font-medium leading-relaxed mb-6">{exp.description}</p>
            <div className="space-y-2.5 mb-4">
              {visibleAch.map((a, i) => (
                <div key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0b0b12] flex-shrink-0" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
            {hiddenCount > 0 && (
              <button onClick={() => setExpanded(!expanded)} className="text-sm font-bold underline mb-6">
                {expanded ? "Show less" : `Show ${hiddenCount} more`}
              </button>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {exp.stack.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-[#0b0b12]/10 text-xs font-semibold">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <Block bg="#0b0b12" dark className="!px-4 md:!px-10">
      <div className="px-2 md:px-6">
        <Eyebrow>Where I Have Worked</Eyebrow>
        <H2>Three years,<br />three companies</H2>
        <p className="text-lg font-medium opacity-70 max-w-2xl mb-14">
          From safety critical ADAS validation at Accenture to sustainable cloud infrastructure at BMW Group.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {STATS.map((s) => (
            <div key={s.label} className="bg-white/5 rounded-2xl p-6">
              <div className="font-extrabold text-4xl mb-1">{s.n}</div>
              <div className="text-xs font-medium opacity-60 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative space-y-10 pb-10">
        {EXPERIENCE.map((exp, i) => (
          <ExperienceStackCard key={exp.num} exp={exp} index={i} />
        ))}
      </div>

      <div className="px-2 md:px-6 mt-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-bold uppercase tracking-wide opacity-60">Education</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="bg-white/5 rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-wide opacity-50 mb-2">{edu.period}</div>
              <div className="font-semibold mb-1">{edu.degree}</div>
              <div className="text-sm opacity-60">{edu.school}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium opacity-60 mb-4">Open to new opportunities from July 2026</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#0b0b12] font-semibold hover:-translate-y-0.5 transition-transform">
            Let's Build Together
          </Link>
        </div>
      </div>
    </Block>
  );
}
