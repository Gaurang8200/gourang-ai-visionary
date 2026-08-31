import { Block, H2, Eyebrow, PageNextLink } from "@/components/PortfolioBlocks";
import Tilt3D from "@/components/Tilt3D";
import { PROJECTS, CERTIFICATIONS, LANGUAGES } from "@/data/portfolio";

function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  return (
    <Tilt3D max={8}>
      <div className="bg-[#111111] text-white rounded-2xl overflow-hidden h-full">
        <div className="h-40 flex items-center justify-between px-7 pt-7">
          <span className="font-extrabold text-3xl text-white/10">{p.icon}</span>
          <span className="text-xs font-bold text-[#ff5b2e]">{p.num}</span>
        </div>
        <div className="p-7 pt-0">
          <div className="flex flex-wrap gap-2 mb-4">
            {p.tags.map((t) => (
              <span key={t} className="px-2.5 py-1 rounded-full border border-white/15 text-xs font-medium text-white/70">{t}</span>
            ))}
          </div>
          <h3 className="font-bold text-xl mb-3">{p.title}</h3>
          <p className="text-sm text-white/60 leading-relaxed mb-5">{p.desc}</p>
          <a href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
            className="inline-flex items-center gap-2 text-sm font-semibold text-[#ff5b2e] hover:gap-3 transition-all">
            {p.linkLabel}
            <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </Tilt3D>
  );
}

export default function Projects() {
  return (
    <>
      <Block bg="#f5f5f3">
        <Eyebrow>Projects &amp; Certification</Eyebrow>
        <H2>Some things I have built</H2>
        <div className="grid md:grid-cols-2 gap-5" style={{ perspective: "1200px" }}>
          {PROJECTS.map((p) => <ProjectCard key={p.num} p={p} />)}
        </div>
      </Block>

      <Block bg="#f5f5f3" className="!pt-0">
        <Eyebrow>Certifications</Eyebrow>
        <H2>What I have certified</H2>
        <div className="grid md:grid-cols-2 gap-5" style={{ perspective: "1200px" }}>
          {CERTIFICATIONS.map((c, i) => (
            <Tilt3D key={c.title} max={6}>
              <div className="bg-[#111111] text-white rounded-2xl p-7 h-full flex items-start justify-between gap-4">
                <div>
                  <div className="text-xs font-bold uppercase tracking-wide text-[#ff5b2e] mb-2">{c.issuer} · {c.year}</div>
                  <div className="font-bold text-lg leading-snug">{c.title}</div>
                </div>
                <span className="font-extrabold text-3xl text-white/10">0{i + 1}</span>
              </div>
            </Tilt3D>
          ))}
        </div>
      </Block>

      <Block bg="#f5f5f3" className="!pt-0">
        <Eyebrow>Languages</Eyebrow>
        <H2>Languages I speak</H2>
        <div className="grid md:grid-cols-2 gap-5" style={{ perspective: "1200px" }}>
          {LANGUAGES.map((l) => (
            <Tilt3D key={l.name} max={6}>
              <div className="bg-[#111111] text-white rounded-2xl p-8 h-full">
                <div className="flex items-baseline justify-between mb-3">
                  <h3 className="font-extrabold text-2xl tracking-tight">{l.name}</h3>
                  <span className="px-3 py-1 rounded-full bg-[#ff5b2e] text-white text-xs font-bold uppercase">{l.level}</span>
                </div>
                <p className="text-sm text-white/60 leading-relaxed">{l.note}</p>
              </div>
            </Tilt3D>
          ))}
        </div>
      </Block>

      <PageNextLink to="/journey" label="See My Experience" />
    </>
  );
}
