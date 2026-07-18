import { Block, H2, Eyebrow } from "@/components/PortfolioBlocks";

export default function Contact() {
  return (
    <Block bg="#ff8fa3" className="text-center">
      <Eyebrow>Contact</Eyebrow>
      <H2 className="mb-6">Let's build<br />something</H2>
      <p className="text-lg font-medium max-w-md mx-auto mb-10 opacity-80">
        Open to Full Stack and Cloud Engineering roles in Germany. Happy to relocate for the right one.
      </p>
      <a href="mailto:monashragaurang6@gmail.com" className="inline-block font-extrabold text-[clamp(1.3rem,3vw,2.2rem)] border-b-4 border-[#0b0b12] pb-1 mb-10 hover:opacity-70 transition-opacity">
        monashragaurang6@gmail.com
      </a>
      <div className="flex gap-3 justify-center flex-wrap">
        {[
          { label: "GitHub", href: "https://github.com/Gaurang8200" },
          { label: "LinkedIn", href: "https://linkedin.com/in/gourangkumar-n-m" },
          { label: "Phone", href: "tel:+4917657713152" },
        ].map((l) => (
          <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
            className="px-6 py-3 rounded-full bg-[#0b0b12] text-white text-sm font-semibold hover:-translate-y-0.5 transition-transform">
            {l.label}
          </a>
        ))}
      </div>
    </Block>
  );
}
