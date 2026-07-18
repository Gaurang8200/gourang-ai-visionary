import { useEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

const WORDS = ["I", "ship", "code", "that", "survives", "production."];

export default function Mascot() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const mouthRef = useRef<SVGPathElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.set(mouthRef.current, { transformOrigin: "50% 50%", scaleY: 0.08 });
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: wrapRef.current,
          start: "top bottom",
          end: "bottom top",
          scrub: 0.6,
        },
      });
      tl.to(mouthRef.current, { scaleY: 1, duration: 0.4, ease: "power2.out" })
        .to(".mascot-word", { opacity: 1, x: 0, stagger: 0.18, duration: 0.3, ease: "power2.out" }, "-=0.1")
        .to(".mascot-head", { rotate: 4, duration: 0.4, ease: "power1.inOut" }, "-=0.5");
    }, wrapRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={wrapRef} className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div className="sticky top-1/3 flex flex-col md:flex-row items-center gap-8 md:gap-12 px-6">
        <svg width="220" height="220" viewBox="0 0 220 220" className="mascot-head flex-shrink-0">
          <circle cx="110" cy="110" r="100" fill="#5fd4ff" />
          <circle cx="75" cy="90" r="11" fill="#0b0b12" />
          <circle cx="145" cy="90" r="11" fill="#0b0b12" />
          <rect x="60" y="60" width="18" height="4" rx="2" fill="#0b0b12" transform="rotate(-8 60 60)" />
          <rect x="142" y="60" width="18" height="4" rx="2" fill="#0b0b12" transform="rotate(8 160 60)" />
          <path
            ref={mouthRef}
            d="M65 135 Q110 135 155 135 Q155 168 110 168 Q65 168 65 135 Z"
            fill="#0b0b12"
          />
        </svg>
        <div className="flex flex-wrap max-w-sm gap-x-3 gap-y-1 justify-center md:justify-start">
          {WORDS.map((w, i) => (
            <span
              key={i}
              className="mascot-word font-extrabold text-3xl md:text-4xl text-white opacity-0"
              style={{ transform: "translateX(-24px)" }}
            >
              {w}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
