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
  "From automotive engineering to artificial intelligence",
  "Completed my Bachelor and Master in Artificial Intelligence",
  "Currently working as a Developer at BMW Group",
  "Building agents and cloud systems at enterprise scale",
  "Competitive cricket taught me teamwork under pressure",
  "Kicker champion at the office",
  "Quick learner, that's what my teammates call me",
  "Looking forward to joining your team",
];

/* Scroll-scrubbed video story. One persistent rAF loop drives the playhead:
   it lerps toward the scroll target and never issues a new seek while the
   previous one is still in flight, which is what keeps scrubbing fluid
   instead of photo-stepping. Cream-to-video gradients dissolve the section
   edges into the page so entering and leaving feels continuous. */
function ScrollyVideo() {
  const wrapRef = useRef<HTMLDivElement>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const progressRef = useRef(0);
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
        progressRef.current = p;
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

  // single persistent scrub loop; wait out in-flight seeks before the next one
  useEffect(() => {
    const v = videoRef.current;
    if (!v) return;
    v.pause();
    let raf = 0;
    let dead = false;
    const tick = () => {
      if (dead) return;
      raf = requestAnimationFrame(tick);
      if (!v.duration || v.seeking) return;
      const target = progressRef.current * Math.max(0, v.duration - 0.05);
      const cur = v.currentTime;
      const delta = target - cur;
      if (Math.abs(delta) < 0.004) return;
      // gentle glide toward the target, capped so fast scrolls stay cinematic
      const step = Math.max(-0.28, Math.min(0.28, delta * 0.14));
      v.currentTime = cur + step;
    };
    tick();
    return () => { dead = true; cancelAnimationFrame(raf); };
  }, []);

  const n = LINES.length;

  return (
    <div ref={wrapRef} className="relative" style={{ height: `${n * 60 + 100}vh`, background: "#f5f5f3" }}>
      <div className="sticky top-0 h-screen overflow-hidden">
        <video
          ref={videoRef}
          src="/intro-video.mp4"
          muted
          playsInline
          preload="auto"
          className="absolute inset-0 w-full h-full object-cover"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-black/30 pointer-events-none" />

        {/* Only the edges feather into the page, so the frame is never washed
           out. Cream bleeds a short distance in from top and bottom, which
           dissolves the seam without ever hiding the video or the text. */}
        <div
          className="absolute inset-x-0 top-0 h-[22vh] pointer-events-none"
          style={{ background: "linear-gradient(to bottom, #f5f5f3 0%, rgba(245,245,243,0.75) 35%, rgba(245,245,243,0) 100%)" }}
        />
        <div
          className="absolute inset-x-0 bottom-0 h-[22vh] pointer-events-none"
          style={{ background: "linear-gradient(to top, #f5f5f3 0%, rgba(245,245,243,0.75) 35%, rgba(245,245,243,0) 100%)" }}
        />

        {LINES.map((line, i) => {
          // each line owns one band of progress; fade + rise around its center.
          // First line is already visible at the top, last one holds to the end.
          const center = (i + 0.5) / n;
          let eff = progress;
          if (i === 0 && progress < center) eff = center;
          if (i === n - 1 && progress > center) eff = center;
          const dist = Math.abs(eff - center) * n;
          // gentler falloff plus longer travel: the outgoing line clears the
          // frame as the next rises in, so the handoff reads as motion rather
          // than two dim lines overlapping in place
          const opacity = Math.max(0, 1 - dist * 1.25);
          const y = (eff - center) * n * -110;
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

        {/* sits above the bottom feather so it stays crisp */}
        <div className="absolute bottom-[25vh] left-1/2 -translate-x-1/2 w-48">
          <div className="h-[2px] bg-white/25">
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
      <Block bg="#f5f5f3" className="!py-16 !pb-8">
        <Eyebrow>About Me</Eyebrow>
        <H2 className="!mb-0 max-w-5xl">Where curiosity meets code and ideas become intelligent systems.</H2>
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
