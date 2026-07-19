import { Block, H2, Eyebrow, PageNextLink } from "@/components/PortfolioBlocks";
import Tilt3D from "@/components/Tilt3D";

const STATS = [
  { n: "3+", label: "Years Experience" },
  { n: "3", label: "Companies" },
  { n: "2", label: "Degrees" },
  { n: "C1", label: "German and English" },
];

export default function About() {
  return (
    <>
      <Block bg="#f5f5f3">
        <Eyebrow>About Me</Eyebrow>
        <H2>I like systems<br />that just work</H2>
        <div className="grid md:grid-cols-2 gap-12 items-start" style={{ perspective: "1200px" }}>
          <Tilt3D max={5}>
            <div className="rounded-2xl overflow-hidden aspect-[4/5]">
              <video
                src="/intro-video.mp4"
                autoPlay
                muted
                loop
                playsInline
                className="w-full h-full object-cover"
                ref={(v) => {
                  // React omits the muted attribute, which blocks autoplay
                  if (v) {
                    v.muted = true;
                    v.play().catch(() => {});
                  }
                }}
                onCanPlay={(e) => {
                  const v = e.currentTarget;
                  if (v.paused) v.play().catch(() => {});
                }}
                onPause={(e) => {
                  // no controls are shown, so any pause is external throttling
                  const v = e.currentTarget;
                  if (!v.ended) v.play().catch(() => {});
                }}
              />
            </div>
          </Tilt3D>
          <div>
            <p className="text-lg leading-relaxed mb-6 text-[#111111]/80">
              Three plus years as an AI developer, building agents and cloud infrastructure that stay stable even when nobody is watching. My stack covers the whole picture, TypeScript and Angular on the front end, Python and Go on the back, microservices and REST APIs tying it all together.
            </p>
            <p className="text-lg leading-relaxed mb-10 text-[#111111]/80">
              Right now I am a Software Developer at BMW Group in Munich, building diagnostic tools, CI/CD automation and observability for sustainable cloud infrastructure, while finishing a Master's in Artificial Intelligence at Technische Hochschule Ingolstadt.
            </p>
            <div className="grid grid-cols-2 gap-8 pt-8 border-t border-[#111111]/10">
              {STATS.map((s) => (
                <div key={s.label}>
                  <div className="font-extrabold text-4xl mb-1">{s.n}</div>
                  <div className="text-sm text-[#8a8a86]">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Block>
      <PageNextLink to="/skills" label="See My Skills" />
    </>
  );
}
