import { useEffect, useRef, useState } from "react";
import { Block, H2, Eyebrow, PageNextLink } from "@/components/PortfolioBlocks";

const STATS = [
  { n: "3+", label: "Years Experience" },
  { n: "2", label: "Degrees" },
  { n: "C1", label: "German and English" },
];

const LINES = [
  "Three plus years as an AI developer",
  "Started my journey in 2020, learning German",
  "Completed my Bachelor and Master in Artificial Intelligence",
  "Currently working as a Developer at BMW Group",
  "I love playing cricket",
  "Kicker champion at the office",
  "Quick learner, that's what my teammates call me",
  "Looking forward to joining your team",
];

/* Scroll-scrubbed video story: tall wrapper, sticky fullscreen video whose
   currentTime follows scroll progress (lerped in rAF for smoothness), with
   one story line per scroll band fading in and out. Fully reversible. */
function ScrollyVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
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
        setProgress(Math.min(1, Math.max(0, -r.top / (total || 1))));
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

  // scrub the video toward the scroll target so frames glide, not jump
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    let raf = 0;
    let dead = false;
    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);
      if (!v.duration) return;
      const target = progress * Math.max(0, v.duration - 0.05);
      const delta = target - v.currentTime;
      if (Math.abs(delta) > 0.02) v.currentTime += delta * 0.25;
    };
    tick();
    return () => { dead = true; cancelAnimationFrame(raf); };
  }, [progress]);

  const n = LINES.length;

  return (
    <div ref={wrapRef} className="relative bg-[#111111]" style={{ height: `${n * 60 + 100}vh` }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src="/intro-video.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-black/40 pointer-events-none" />

        {LINES.map((line, i) => {
          // each line owns one band of progress; fade + rise around its center.
          // First line is already visible at the top, last one holds to the end.
          const center = (i + 0.5) / n;
          let eff = progress;
          if (i === 0 && progress < center) eff = center;
          if (i === n - 1 && progress > center) eff = center;
          const dist = Math.abs(eff - center) * n;
          const opacity = Math.max(0, 1 - dist * 1.6);
          const y = (eff - center) * n * -40;
          return (
            <div key={i} className="absolute inset-0 flex items-center justify-center px-6 pointer-events-none">
              <p
                className="max-w-3xl text-center text-white font-extrabold tracking-tight text-[clamp(1.6rem,4.5vw,3.5rem)] leading-tight"
                style={{ opacity, transform: `translateY(${y}px)`, textShadow: "0 2px 24px rgba(0,0,0,0.6)" }}
              >
                {line}
              </p>
            </div>
          );
        })}

        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-48">
          <div className="h-[2px] bg-white/20">
            <div className="h-full bg-[#ff5b2e]" style={{ width: `${progress * 100}%` }} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default function About() {
  return (
    <>
      <Block bg="#f5f5f3" className="!py-16">
        <Eyebrow>About Me</Eyebrow>
        <H2 className="!mb-2">I like systems<br />that just work</H2>
        <p className="text-sm text-[#8a8a86]">Scroll to play my story</p>
      </Block>

      <ScrollyVideo />

      <Block bg="#f5f5f3" className="!py-16">
        <div className="grid grid-cols-3 gap-8">
          {STATS.map((s) => (
            <div key={s.label}>
              <div className="font-extrabold text-4xl mb-1">{s.n}</div>
              <div className="text-xs font-medium text-[#8a8a86] uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </Block>
      <PageNextLink to="/skills" label="See My Skills" />
    </>
  );
}
