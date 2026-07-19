import { Block, Eyebrow } from "@/components/PortfolioBlocks";
import Tilt3D from "@/components/Tilt3D";
import bg from "@/assets/photos/raw3.jpg";

const LINKS = [
  { label: "Email", value: "monashragaurang6@gmail.com", href: "mailto:monashragaurang6@gmail.com" },
  { label: "Phone", value: "+49 176 5771 3152", href: "tel:+4917657713152" },
  { label: "GitHub", value: "github.com/Gaurang8200", href: "https://github.com/Gaurang8200" },
  { label: "LinkedIn", value: "linkedin.com/in/gourangkumar-n-m", href: "https://linkedin.com/in/gourangkumar-n-m" },
];

export default function Contact() {
  return (
    <Block bg="#111111" dark className="overflow-hidden">
      <div className="absolute inset-0">
        <img src={bg} alt="" className="photo-treated w-full h-full object-cover opacity-25" />
        <div className="absolute inset-0 bg-gradient-to-r from-[#111111] via-[#111111]/90 to-[#111111]/40" />
      </div>
      <div className="relative grid md:grid-cols-2 gap-12" style={{ perspective: "1200px" }}>
        <Tilt3D max={5}>
        <div className="bg-white text-[#111111] rounded-2xl p-8 md:p-10 h-full">
          <p className="text-sm font-semibold uppercase tracking-widest text-[#ff5b2e] mb-3">Say Hello</p>
          <p className="text-2xl font-bold mb-8">Have a project in mind?</p>
          <div className="space-y-5">
            {LINKS.map((l) => (
              <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
                className="flex items-center justify-between border-b border-[#111111]/10 pb-3 group">
                <span>
                  <span className="block text-xs text-[#8a8a86] uppercase tracking-wide">{l.label}</span>
                  <span className="font-semibold">{l.value}</span>
                </span>
                <svg className="w-4 h-4 text-[#ff5b2e] group-hover:translate-x-1 transition-transform" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                  <path d="M7 17L17 7M7 7h10v10" />
                </svg>
              </a>
            ))}
          </div>
        </div>
        </Tilt3D>
        <div className="flex flex-col justify-center">
          <Eyebrow>Contact</Eyebrow>
          <h2 className="font-extrabold leading-[1.02] tracking-tight text-[clamp(2.5rem,6vw,5rem)] mb-6 text-white">
            Get In<br />Touch
          </h2>
          <p className="text-lg text-white/70 max-w-md">
            Open to AI and Cloud Engineering roles in Germany. Happy to relocate for the right one.
          </p>
        </div>
      </div>
    </Block>
  );
}
