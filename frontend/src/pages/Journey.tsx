import { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { Block, H2, Eyebrow } from "@/components/PortfolioBlocks";
import Tilt3D from "@/components/Tilt3D";
import { EXPERIENCE, EDUCATION } from "@/data/portfolio";

const STATS = [
  { n: "3+", label: "Years Experience" },
  { n: "3", label: "Companies" },
  { n: "2", label: "Degrees" },
  { n: "C1", label: "German and English" },
];

/* Scroll-driven horizontal deck: tall wrapper, sticky stage, cards translate
   with scroll progress. CSS sticky only — survives route changes cleanly. */
function ExperienceScroller() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const trackRef = useRef<HTMLDivElement>(null);
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    let raf = 0;
    const onScroll = () => {
      cancelAnimationFrame(raf);
      raf = requestAnimationFrame(() => {
        const wrap = wrapRef.current;
        if (!wrap) return;
        const r = wrap.getBoundingClientRect();
        const total = r.height - window.innerHeight;
        const p = Math.min(1, Math.max(0, -r.top / (total || 1)));
        setProgress(p);
      });
    };
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onScroll);
    };
  }, []);

  useEffect(() => {
    const track = trackRef.current;
    const wrap = wrapRef.current;
    if (!track || !wrap) return;
    const maxShift = track.scrollWidth - wrap.clientWidth;
    track.style.transform = `translateX(${-progress * Math.max(0, maxShift)}px)`;
  }, [progress]);

  return (
    <div ref={wrapRef} className="relative bg-[#111111]" style={{ height: `${EXPERIENCE.length * 120 + 100}vh` }}>
      <div className="sticky top-0 h-screen flex flex-col overflow-hidden pt-24 md:pt-28 pb-8">
        <div className="px-6 md:px-10 mb-8 flex-shrink-0">
          <Eyebrow>Professional Experience</Eyebrow>
          <H2 className="text-white !mb-2">Where I have worked</H2>
          <p className="text-white/50 text-sm">Scroll to travel through the timeline</p>
        </div>

        {/* cards take the leftover height and stay vertically centered there,
           so the heading above is never pushed off-screen at higher zoom */}
        <div className="flex-1 min-h-0 flex items-center overflow-hidden">
          <div ref={trackRef} className="flex gap-6 px-6 md:px-10 w-max" style={{ willChange: "transform" }}>
            {EXPERIENCE.map((exp, i) => (
              <Tilt3D key={exp.num} max={6} className="w-[85vw] md:w-[640px] flex-shrink-0">
                <div className="bg-[#f5f5f3] text-[#111111] rounded-2xl p-8 md:p-10 h-full">
                  <div className="flex items-center justify-between mb-6">
                    <span className="font-extrabold text-5xl text-[#111111]/10">0{i + 1}</span>
                    {exp.status === "active" ? (
                      <span className="px-3 py-1 rounded-full bg-[#ff5b2e] text-white text-xs font-bold uppercase">Current Role</span>
                    ) : (
                      <span className="text-xs font-semibold text-[#8a8a86] uppercase">{exp.period}</span>
                    )}
                  </div>
                  <h3 className="font-extrabold text-3xl md:text-4xl tracking-tight mb-1">{exp.company}</h3>
                  <p className="font-semibold text-[#ff5b2e] mb-1">{exp.role}</p>
                  <p className="text-sm text-[#8a8a86] mb-5">{exp.period} · {exp.location}</p>
                  <p className="text-sm leading-relaxed text-[#111111]/80 mb-5">{exp.description}</p>
                  <ul className="space-y-1.5 mb-6">
                    {exp.achievements.slice(0, 3).map((a, j) => (
                      <li key={j} className="flex gap-2.5 text-xs leading-relaxed text-[#111111]/70">
                        <span className="mt-1.5 w-1 h-1 rounded-full bg-[#ff5b2e] flex-shrink-0" />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.slice(0, 8).map((t) => (
                      <span key={t} className="px-2.5 py-1 rounded-full bg-[#111111]/5 text-xs font-semibold">{t}</span>
                    ))}
                  </div>
                </div>
              </Tilt3D>
            ))}
          </div>
        </div>

        <div className="px-6 md:px-10 mt-6 flex-shrink-0">
          <div className="h-[2px] bg-white/10 max-w-md">
            <div className="h-full bg-[#ff5b2e]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Journey() {
  return (
    <>
      <Block bg="#f5f5f3" className="!py-16">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-extrabold text-4xl mb-1">{s.n}</div>
              <div className="text-xs font-medium text-[#8a8a86] uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </Block>

      <ExperienceScroller />

      <Block bg="#f5f5f3">
        <Eyebrow>Education</Eyebrow>
        <H2>Where I studied</H2>
        <div className="grid md:grid-cols-2 gap-5">
          {EDUCATION.map((edu) => (
            <Tilt3D key={edu.degree} max={6}>
              <div className="bg-[#111111] text-white rounded-2xl p-8 h-full">
                <div className="text-xs font-bold uppercase tracking-wide text-[#ff5b2e] mb-3">{edu.period}</div>
                <div className="font-bold text-xl mb-1">{edu.degree}</div>
                <div className="text-sm text-white/50">{edu.school}</div>
              </div>
            </Tilt3D>
          ))}
        </div>
        <div className="text-center mt-16">
          <p className="text-sm font-medium text-[#8a8a86] mb-4">Open to new opportunities from July 2026</p>
          <Link to="/contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-md bg-[#111111] text-white font-semibold hover:bg-[#ff5b2e] transition-colors">
            Let's Build Together
          </Link>
        </div>
      </Block>
    </>
  );
}
