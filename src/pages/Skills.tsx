import { useEffect } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { Block, H2, Eyebrow, PageNextLink } from "@/components/PortfolioBlocks";
import { SKILLS } from "@/data/portfolio";

gsap.registerPlugin(ScrollTrigger);

export default function Skills() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bar-fill").forEach((bar) => {
        const w = bar.getAttribute("data-w") || "0";
        ScrollTrigger.create({
          trigger: bar, start: "top 90%",
          onEnter: () => gsap.to(bar, { scaleX: parseFloat(w), duration: 1.2, ease: "power3.out" }),
          onLeaveBack: () => gsap.to(bar, { scaleX: 0, duration: 0.4 }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <>
      <Block bg="#ffb37a">
        <Eyebrow>My Stack</Eyebrow>
        <H2>Tools I reach for</H2>
        <div className="grid md:grid-cols-3 gap-5">
          {SKILLS.map((s) => (
            <div key={s.category} className="bg-[#0b0b12] text-white rounded-2xl p-6">
              <div className="font-bold text-lg mb-4">{s.category}</div>
              <div className="flex flex-wrap gap-2 mb-6">
                {s.items.map((item) => (
                  <span key={item} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${s.accent}22`, color: s.accent }}>
                    {item}
                  </span>
                ))}
              </div>
              <div className="space-y-3">
                {s.bars.map((b) => (
                  <div key={b.label}>
                    <div className="flex justify-between text-xs font-medium opacity-70 mb-1">
                      <span>{b.label}</span><span>{b.pct}%</span>
                    </div>
                    <div className="h-2 rounded-full bg-white/10">
                      <div className="bar-fill h-full rounded-full origin-left scale-x-0" data-w={b.pct / 100} style={{ background: s.accent }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </Block>
      <PageNextLink to="/projects" label="See My Projects" />
    </>
  );
}
