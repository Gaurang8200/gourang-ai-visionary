import { Block, H2, Eyebrow, PageNextLink } from "@/components/PortfolioBlocks";

const STATS = [
  { n: "3+", label: "Years Experience" },
  { n: "3", label: "Companies" },
  { n: "2", label: "Degrees" },
  { n: "C1", label: "German and English" },
];

export default function About() {
  return (
    <>
      <Block bg="#d8b4fe">
        <Eyebrow>About Me</Eyebrow>
        <H2>I like systems<br />that just work</H2>
        <div className="grid md:grid-cols-2 gap-12">
          <div className="space-y-5 text-lg font-medium leading-relaxed">
            <p>Three plus years as a full stack developer, building cloud infrastructure that stays stable even when nobody is watching.</p>
            <p>My stack covers the whole picture. TypeScript, Angular and Streamlit on the front end. Python and Go on the back. Microservices, REST APIs and distributed systems tying it all together.</p>
            <p>Right now I am a Software Developer at BMW Group in Munich, building diagnostic tools, CI/CD automation and observability for sustainable cloud infrastructure, while finishing a Master's in Artificial Intelligence at Technische Hochschule Ingolstadt.</p>
          </div>
          <div className="grid grid-cols-2 gap-4">
            {STATS.map((s) => (
              <div key={s.label} className="bg-[#0b0b12] text-white rounded-2xl p-6">
                <div className="font-extrabold text-4xl mb-1">{s.n}</div>
                <div className="text-sm font-medium opacity-70">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </Block>
      <PageNextLink to="/skills" label="See My Skills" />
    </>
  );
}
