import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────────────── */
const SKILLS = [
  {
    category: "AI / Machine Learning",
    items: ["PyTorch", "TensorFlow", "Keras", "Scikit-learn", "Hugging Face", "YOLO", "OpenCV"],
    bars: [
      { label: "Deep Learning", pct: 95 },
      { label: "Computer Vision", pct: 93 },
      { label: "Model Deployment", pct: 85 },
    ],
  },
  {
    category: "Automotive AI",
    items: ["ADAS Systems", "HIL Testing", "CAN Bus", "NVIDIA Jetson Orin", "HMI Validation", "OCR Pipelines"],
    bars: [
      { label: "Automotive Testing", pct: 92 },
      { label: "HIL / SIL Integration", pct: 88 },
      { label: "ADAS Validation", pct: 85 },
    ],
  },
  {
    category: "Programming & Tools",
    items: ["Python", "C++", "TypeScript", "Docker", "Git", "AWS", "Jupyter", "Linux"],
    bars: [
      { label: "Python / C++", pct: 96 },
      { label: "MLOps / DevOps", pct: 80 },
      { label: "Cloud Platforms", pct: 75 },
    ],
  },
];

const PROJECTS = [
  {
    num: "01",
    icon: "CV",
    tags: ["Python", "OpenCV", "TensorFlow", "Jetson Orin"],
    title: "Vision-Based HMI Testing Framework",
    desc: "Two-phase automated testing framework for automotive infotainment and digital cluster systems. Phase 1 uses CNNs, OCR, and object detection on NVIDIA Jetson Orin Nano for open-loop UI validation. Phase 2 integrates a HIL simulator for closed-loop end-to-end testing.",
    link: "https://saemobilus.sae.org/papers/vision-based-framework-automated-testing-automotive-hmi-systems-using-deep-learning-techniques-2026-26-0571",
    linkLabel: "SAE Research Paper",
  },
  {
    num: "02",
    icon: "HIL",
    tags: ["Python", "CAN Bus", "Ethernet", "HIL Simulator"],
    title: "ADAS HIL Closed-Loop Automation",
    desc: "Closed-loop automotive testing environment that integrates HIL simulators with vision-based verification systems. Simulates vehicle CAN/Ethernet network traffic while the AI vision layer validates HMI responsiveness, screen transitions, and safety-critical alerts.",
    link: "#",
    linkLabel: "Explore Project",
  },
  {
    num: "03",
    icon: "AI",
    tags: ["PyTorch", "YOLO", "OpenCV", "Real-Time"],
    title: "Real-Time Anomaly Detection Pipeline",
    desc: "Production-grade visual inspection pipeline for automotive display systems. Detects UI anomalies, render glitches, and layout violations in real-time across infotainment and digital cluster displays — reducing manual QA effort by over 70%.",
    link: "#",
    linkLabel: "Explore Project",
  },
];

const EXPERIENCE = [
  {
    date: "2023 — Present",
    role: "AI/ML & Computer Vision Engineer",
    company: "AVL Technical Centre Pvt. Ltd., Pune",
    desc: "Leading development of vision-based automated testing frameworks for automotive HMI, infotainment, and ADAS systems. Designed and deployed deep learning pipelines on edge hardware (NVIDIA Jetson Orin). Published research at the SAE Symposium on International Automotive Technology (SIAT 2026), Pune.",
  },
  {
    date: "2021 — 2023",
    role: "Machine Learning Engineer",
    company: "Previous Organisation",
    desc: "Developed and deployed computer vision models for industrial quality inspection. Built end-to-end ML pipelines from data collection and annotation through training, optimization, and edge deployment. Reduced defect escape rate by 35% through automated visual QA.",
  },
  {
    date: "2017 — 2021",
    role: "B.Tech — Computer Science & Engineering",
    company: "University",
    desc: "Specialized in Artificial Intelligence and Computer Vision. Final-year project on deep learning-based object detection for embedded systems. Active participant in robotics and AI research clubs.",
  },
];

/* ─── THREE.JS CANVAS ──────────────────────────────────────── */
function ThreeBackground() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 2));
    renderer.setSize(window.innerWidth, window.innerHeight);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, window.innerWidth / window.innerHeight, 0.1, 200);
    camera.position.set(0, 0, 7);

    const group = new THREE.Group();

    // Central icosahedron
    const coreGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff, metalness: 0.9, roughness: 0.1,
      transparent: true, opacity: 0.12,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.22 });
    const wire = new THREE.Mesh(coreGeo.clone(), wireMat);

    // Outer shell
    const shellGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const shellWire = new THREE.Mesh(shellGeo, new THREE.MeshBasicMaterial({ color: 0xff6b00, wireframe: true, transparent: true, opacity: 0.07 }));

    // Rings
    const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.008, 8, 80), new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.35 }));
    r1.rotation.x = Math.PI / 4;
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.005, 8, 80), new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.2 }));
    r2.rotation.x = -Math.PI / 3; r2.rotation.y = Math.PI / 5;

    // Satellite nodes
    const nodeMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff });
    for (let i = 0; i < 10; i++) {
      const nd = new THREE.Mesh(new THREE.SphereGeometry(0.04, 6, 6), nodeMat);
      const theta = (i / 10) * Math.PI * 2;
      const phi = (Math.random() * 0.8 + 0.1) * Math.PI;
      const r = 2.0 + Math.random() * 0.5;
      nd.position.set(r * Math.sin(phi) * Math.cos(theta), r * Math.sin(phi) * Math.sin(theta), r * Math.cos(phi));
      group.add(nd);
    }

    group.add(core, wire, shellWire, r1, r2);
    scene.add(group);

    const amb = new THREE.AmbientLight(0xffffff, 0.3);
    const pt1 = new THREE.PointLight(0x00d4ff, 2.5, 12);
    pt1.position.set(3, 3, 3);
    const pt2 = new THREE.PointLight(0xff6b00, 1.8, 12);
    pt2.position.set(-3, -2, 2);
    scene.add(amb, pt1, pt2);

    let mx = 0, my = 0, ry = 0, rx = 0;
    let scrollPct = 0;
    let targetZ = 7;
    let frame = 0;

    const onMouse = (e: MouseEvent) => {
      mx = (e.clientX / window.innerWidth - 0.5) * 0.5;
      my = (e.clientY / window.innerHeight - 0.5) * 0.5;
    };
    const onScroll = () => {
      scrollPct = window.scrollY / (document.body.scrollHeight - window.innerHeight);
    };
    const onResize = () => {
      camera.aspect = window.innerWidth / window.innerHeight;
      camera.updateProjectionMatrix();
      renderer.setSize(window.innerWidth, window.innerHeight);
    };

    document.addEventListener("mousemove", onMouse);
    window.addEventListener("scroll", onScroll);
    window.addEventListener("resize", onResize);

    const tick = () => {
      requestAnimationFrame(tick);
      frame++;
      const s = scrollPct;

      // Section-based position
      if (s < 0.2) { group.position.x = gsap.utils.interpolate(0, 0, s / 0.2); targetZ = gsap.utils.interpolate(7, 6, s / 0.2); }
      else if (s < 0.45) { const t = (s - 0.2) / 0.25; group.position.x = gsap.utils.interpolate(0, -2.5, t); targetZ = gsap.utils.interpolate(6, 9, t); }
      else if (s < 0.65) { const t = (s - 0.45) / 0.2; group.position.x = gsap.utils.interpolate(-2.5, 2.5, t); targetZ = gsap.utils.interpolate(9, 8, t); }
      else { const t = (s - 0.65) / 0.35; group.position.x = gsap.utils.interpolate(2.5, 0, t); targetZ = gsap.utils.interpolate(8, 5, t); }

      ry += (mx - ry) * 0.04;
      rx += (-my - rx) * 0.04;
      group.rotation.y += ry * 0.05 + 0.004;
      group.rotation.x += rx * 0.04 + 0.001;
      r1.rotation.z += 0.005;
      r2.rotation.z -= 0.004;
      shellWire.rotation.y -= 0.003;
      camera.position.z += (targetZ - camera.position.z) * 0.04;

      const pulse = Math.sin(frame * 0.025) * 0.5 + 0.5;
      pt1.intensity = 2 + pulse * 1.5;
      coreMat.opacity = 0.08 + pulse * 0.08;

      renderer.render(scene, camera);
    };
    tick();

    return () => {
      document.removeEventListener("mousemove", onMouse);
      window.removeEventListener("scroll", onScroll);
      window.removeEventListener("resize", onResize);
      renderer.dispose();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className="fixed inset-0 w-full h-full pointer-events-none z-0"
    />
  );
}

/* ─── NAV ───────────────────────────────────────────────────── */
function Navigation() {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-16 py-5 transition-all duration-500 ${scrolled ? "bg-[rgba(3,3,10,0.85)] backdrop-blur-xl border-b border-white/[0.06]" : ""}`}>
      <a href="#" className="font-mono text-sm tracking-[0.3em] text-[#00d4ff] uppercase hover:text-white transition-colors">GM</a>
      <ul className="hidden md:flex gap-10">
        {["About", "Skills", "Projects", "Experience", "Contact"].map((s) => (
          <li key={s}>
            <a href={`#${s.toLowerCase()}`} className="text-xs tracking-[0.15em] uppercase text-[#5a5a75] hover:text-white transition-colors duration-200">{s}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="hidden md:block text-xs tracking-[0.15em] uppercase px-5 py-2.5 border border-[#00d4ff] text-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#03030a] transition-all duration-200">
        Hire Me
      </a>
    </nav>
  );
}

/* ─── HERO ──────────────────────────────────────────────────── */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  const nameRef = useRef<HTMLHeadingElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 30, duration: 0.8, ease: "power3.out" })
        .from(nameRef.current, { opacity: 0, y: 60, duration: 1.1, ease: "power3.out" }, "-=0.4")
        .from(".hero-sub", { opacity: 0, y: 25, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.8, ease: "power3.out" }, "-=0.5")
        .from(".hero-btns", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(".hero-scroll", { opacity: 0, duration: 1 }, "-=0.2");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={heroRef} id="hero" className="relative min-h-screen flex flex-col items-center justify-center text-center px-8 z-10">
      <div className="hero-eyebrow font-mono text-xs tracking-[0.4em] text-[#00d4ff] uppercase mb-8">
        AI Engineer · Computer Vision · Automotive AI
      </div>

      <h1 ref={nameRef} className="font-['Bebas_Neue'] text-[clamp(4.5rem,13vw,12rem)] leading-[0.88] tracking-[0.03em] mb-6"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #c0c0d8 45%, #00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        GOURANGKUMAR<br />MONASHARA
      </h1>

      <div className="hero-sub text-[clamp(0.85rem,2vw,1.1rem)] tracking-[0.2em] uppercase text-[#5a5a75] mt-4 mb-6">
        AI, ML &amp; Computer Vision Engineer
      </div>

      <p className="hero-desc text-[clamp(0.9rem,1.4vw,1.1rem)] font-light text-[#9090a8] max-w-xl leading-[1.9] mb-10">
        Driving the future of automotive intelligence through deep learning, vision-based testing systems, and AI-powered ADAS validation.
      </p>

      <div className="hero-btns flex gap-5 flex-wrap justify-center">
        <a href="#projects" className="px-8 py-3.5 text-xs tracking-[0.12em] uppercase font-medium bg-[#00d4ff] text-[#03030a] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] hover:-translate-y-0.5 transition-all duration-200"
          style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}>
          View My Work
        </a>
        <a href="#contact" className="px-8 py-3.5 text-xs tracking-[0.12em] uppercase border border-white/10 text-white/80 hover:border-[#00d4ff]/50 hover:text-white hover:-translate-y-0.5 transition-all duration-200 backdrop-blur-sm bg-white/[0.03]"
          style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}>
          Get In Touch
        </a>
      </div>

      <div className="hero-scroll absolute bottom-10 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 opacity-60">
        <div className="w-px h-16 bg-gradient-to-b from-transparent via-[#00d4ff] to-transparent animate-pulse" />
        <span className="font-mono text-[0.55rem] tracking-[0.35em] uppercase text-[#5a5a75]">Scroll</span>
      </div>
    </section>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────── */
function AboutSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".about-reveal").forEach((el) => {
        gsap.from(el, {
          opacity: 0, y: 50, duration: 0.9, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { n: "3+", label: "Years in Automotive AI" },
    { n: "20+", label: "AI Projects Shipped" },
    { n: "2026", label: "SAE SIAT Published" },
    { n: "∞", label: "Problems to Solve" },
  ];

  return (
    <section ref={ref} id="about" className="relative min-h-screen flex items-center py-28 px-8 z-10">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
        {/* Text */}
        <div>
          <p className="about-reveal font-mono text-xs tracking-[0.35em] text-[#00d4ff] uppercase mb-4 flex items-center gap-4">
            <span className="w-10 h-px bg-[#00d4ff] inline-block" /> About Me
          </p>
          <h2 className="about-reveal font-['Bebas_Neue'] text-[clamp(2.5rem,5vw,5rem)] leading-tight text-white mb-8">
            Building Intelligent<br /><span className="text-[#00d4ff]">Automotive</span> Systems
          </h2>
          <p className="about-reveal text-[1.15rem] font-light text-white/80 leading-[1.9] mb-5"
            style={{ background: "linear-gradient(to right, #e0e0f8, #9090a8)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            I'm an AI/ML & Computer Vision Engineer at AVL Technical Centre, where I build intelligence into automotive testing pipelines.
          </p>
          <p className="about-reveal text-sm text-[#7070889] leading-[1.9] mb-5 text-[#80809a]">
            My work sits at the intersection of deep learning and automotive engineering — building systems that see, reason, and validate. From CNNs classifying infotainment screens to HIL simulators testing ADAS behavior end-to-end, I engineer AI that meets automotive safety standards.
          </p>
          <p className="about-reveal text-sm text-[#80809a] leading-[1.9]">
            I published research at the SAE Symposium on International Automotive Technology (SIAT 2026) in Pune, presenting a vision-based framework that automates HMI testing for digital clusters and infotainment systems. My mission: make automotive AI safer, faster, and smarter.
          </p>
          <div className="about-reveal grid grid-cols-2 gap-px mt-10 border border-white/[0.07]">
            {stats.map((s, i) => (
              <div key={i} className="p-5 border-b border-r border-white/[0.07] last:border-r-0 odd:last:border-r-0">
                <div className="font-['Bebas_Neue'] text-4xl text-[#00d4ff] leading-none">{s.n}</div>
                <div className="text-[0.7rem] tracking-widest uppercase text-[#5a5a75] mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
        {/* Visual */}
        <div className="about-reveal hidden md:flex items-center justify-center relative">
          {[320, 260, 200].map((size, i) => (
            <div key={i} className="absolute rounded-full border border-white/5"
              style={{ width: size, height: size, animation: `spin ${14 + i * 4}s linear infinite ${i % 2 ? "reverse" : ""}` }} />
          ))}
          <div className="w-[170px] h-[170px] rounded-full flex items-center justify-center z-10 backdrop-blur-md border border-white/10"
            style={{ background: "radial-gradient(circle, rgba(0,212,255,0.08) 0%, rgba(3,3,10,0.6) 100%)" }}>
            <div className="font-['Bebas_Neue'] text-6xl text-[#00d4ff] tracking-wider">GM</div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ─── SKILLS ────────────────────────────────────────────────── */
function SkillsSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".skills-reveal").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 50, duration: 0.9, delay: i * 0.1,
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
      gsap.utils.toArray<HTMLElement>(".bar-fill").forEach((bar) => {
        const w = bar.getAttribute("data-w") || "0";
        ScrollTrigger.create({
          trigger: bar, start: "top 90%",
          onEnter: () => gsap.to(bar, { scaleX: parseFloat(w), duration: 1.4, ease: "power3.out", delay: 0.15 }),
          onLeaveBack: () => gsap.to(bar, { scaleX: 0, duration: 0.4 }),
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="skills" className="relative py-28 px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <p className="skills-reveal font-mono text-xs tracking-[0.35em] text-[#00d4ff] uppercase mb-4 flex items-center gap-4">
          <span className="w-10 h-px bg-[#00d4ff]" />Technical Arsenal
        </p>
        <h2 className="skills-reveal font-['Bebas_Neue'] text-[clamp(2.5rem,5vw,5rem)] text-white mb-16 leading-tight">
          My <span className="text-[#00d4ff]">Stack</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {SKILLS.map((s, si) => (
            <div key={si} className="skills-reveal group p-7 border border-white/[0.07] hover:border-[#00d4ff]/25 transition-all duration-300 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)" }}>
              <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-[#00d4ff] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="font-mono text-[0.65rem] tracking-[0.25em] text-[#00d4ff] uppercase mb-5">{s.category}</div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {s.items.map((item) => (
                  <span key={item} className="px-2.5 py-1 text-[0.7rem] border border-white/[0.07] text-white/60 hover:border-[#00d4ff]/30 hover:text-[#00d4ff] transition-all duration-200">
                    {item}
                  </span>
                ))}
              </div>
              <div className="space-y-3.5">
                {s.bars.map((b, bi) => (
                  <div key={bi}>
                    <div className="flex justify-between text-[0.7rem] text-[#5a5a75] mb-1.5">
                      <span>{b.label}</span><span>{b.pct}%</span>
                    </div>
                    <div className="h-[2px] bg-white/[0.06]">
                      <div className="bar-fill h-full bg-gradient-to-r from-[#00d4ff] to-[#0066ff] origin-left scale-x-0"
                        data-w={b.pct / 100}
                        style={{ boxShadow: "0 0 8px rgba(0,212,255,0.7)" }} />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────────── */
function ProjectsSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".proj-card").forEach((card, i) => {
        gsap.from(card, {
          opacity: 0, y: 70, duration: 1, delay: i * 0.15, ease: "power3.out",
          scrollTrigger: { trigger: card, start: "top 87%", toggleActions: "play none none reverse" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="projects" className="relative py-28 px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[0.35em] text-[#00d4ff] uppercase mb-4 flex items-center gap-4">
          <span className="w-10 h-px bg-[#00d4ff]" />Selected Work
        </p>
        <h2 className="font-['Bebas_Neue'] text-[clamp(2.5rem,5vw,5rem)] text-white mb-16 leading-tight">
          Featured <span className="text-[#00d4ff]">Projects</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {PROJECTS.map((p) => (
            <div key={p.num} className="proj-card group border border-white/[0.07] hover:border-[#00d4ff]/25 hover:-translate-y-2 transition-all duration-400 overflow-hidden"
              style={{ background: "rgba(255,255,255,0.02)" }}>
              <div className="h-44 flex items-center justify-center relative border-b border-white/[0.05] overflow-hidden">
                <div className="font-['Bebas_Neue'] text-[5rem] text-white/[0.05] tracking-wide group-hover:text-[#00d4ff]/10 group-hover:scale-105 transition-all duration-500">
                  {p.icon}
                </div>
                <span className="absolute top-4 left-5 font-mono text-[0.6rem] tracking-[0.2em] text-[#00d4ff]/50">{p.num}</span>
                <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(3,3,10,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              </div>
              <div className="p-6">
                <div className="flex flex-wrap gap-1.5 mb-4">
                  {p.tags.map((t) => (
                    <span key={t} className="px-2 py-0.5 text-[0.65rem] bg-[#00d4ff]/[0.08] border border-[#00d4ff]/20 text-[#00d4ff]">{t}</span>
                  ))}
                </div>
                <h3 className="font-['Bebas_Neue'] text-xl text-white mb-3 tracking-wide">{p.title}</h3>
                <p className="text-[0.82rem] text-[#7070889] leading-relaxed text-[#70708a]">{p.desc}</p>
                <a href={p.link} target={p.link !== "#" ? "_blank" : undefined} rel="noreferrer"
                  className="inline-flex items-center gap-2 mt-5 text-[0.72rem] tracking-[0.1em] uppercase text-[#00d4ff] hover:gap-3 transition-all duration-200">
                  {p.linkLabel}
                  <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                    <path d="M7 17L17 7M7 7h10v10" />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── EXPERIENCE ────────────────────────────────────────────── */
function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".exp-item").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, x: -40, duration: 0.9, delay: i * 0.15, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="experience" className="relative py-28 px-8 z-10">
      <div className="max-w-4xl mx-auto">
        <p className="font-mono text-xs tracking-[0.35em] text-[#00d4ff] uppercase mb-4 flex items-center gap-4">
          <span className="w-10 h-px bg-[#00d4ff]" />Journey
        </p>
        <h2 className="font-['Bebas_Neue'] text-[clamp(2.5rem,5vw,5rem)] text-white mb-16 leading-tight">
          My <span className="text-[#00d4ff]">Experience</span>
        </h2>

        <div className="relative pl-6 border-l border-white/[0.08]">
          {EXPERIENCE.map((e, i) => (
            <div key={i} className="exp-item relative pb-14 last:pb-0">
              <div className="absolute -left-[21px] top-1.5 w-3 h-3 rounded-full border-2 border-[#00d4ff] bg-[#03030a]"
                style={{ boxShadow: "0 0 10px rgba(0,212,255,0.6)" }} />
              <div className="font-mono text-[0.65rem] tracking-[0.2em] text-[#00d4ff] mb-2">{e.date}</div>
              <h3 className="font-['Bebas_Neue'] text-2xl text-white tracking-wide mb-0.5">{e.role}</h3>
              <div className="text-sm text-[#5a5a75] mb-4 italic">{e.company}</div>
              <p className="text-sm text-[#80809a] leading-[1.85] max-w-2xl">{e.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────── */
function ContactSection() {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".contact-reveal").forEach((el, i) => {
        gsap.from(el, {
          opacity: 0, y: 40, duration: 0.9, delay: i * 0.12, ease: "power3.out",
          scrollTrigger: { trigger: el, start: "top 85%", toggleActions: "play none none reverse" },
        });
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={ref} id="contact" className="relative min-h-screen flex items-center justify-center py-28 px-8 z-10 text-center">
      <div className="max-w-2xl w-full">
        <p className="contact-reveal font-mono text-xs tracking-[0.35em] text-[#00d4ff] uppercase mb-6 flex items-center justify-center gap-4">
          <span className="w-10 h-px bg-[#00d4ff]" />Contact<span className="w-10 h-px bg-[#00d4ff]" />
        </p>
        <h2 className="contact-reveal font-['Bebas_Neue'] text-[clamp(2.8rem,6vw,6rem)] text-white mb-6 leading-tight">
          Let's Build<br /><span className="text-[#00d4ff]">Something</span>
        </h2>
        <p className="contact-reveal text-sm text-[#80809a] leading-relaxed mb-10 max-w-md mx-auto">
          Open to collaborations in automotive AI, computer vision research, and ML engineering roles. Let's talk.
        </p>

        {/* Email */}
        <a href="mailto:gourangkumar@email.com"
          className="contact-reveal inline-block font-['Bebas_Neue'] text-[clamp(1.2rem,3vw,2rem)] text-white/80 border-b border-white/10 pb-1 mb-10 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all duration-300 tracking-wide">
          gourangkumar@email.com
        </a>

        <div className="contact-reveal flex gap-3 justify-center flex-wrap">
          {[
            { label: "GitHub", href: "https://github.com/Gaurang8200" },
            { label: "LinkedIn", href: "#" },
            { label: "SAE Research", href: "https://saemobilus.sae.org/papers/vision-based-framework-automated-testing-automotive-hmi-systems-using-deep-learning-techniques-2026-26-0571" },
            { label: "Resume", href: "#" },
          ].map((l) => (
            <a key={l.label} href={l.href} target={l.href !== "#" ? "_blank" : undefined} rel="noreferrer"
              className="px-5 py-2.5 text-[0.72rem] tracking-[0.1em] uppercase border border-white/[0.08] text-[#70708a] hover:border-[#00d4ff]/40 hover:text-[#00d4ff] transition-all duration-200 backdrop-blur-sm">
              {l.label}
            </a>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ─── PARTICLES ─────────────────────────────────────────────── */
function ParticleCanvas() {
  const cvs = useRef<HTMLCanvasElement>(null);
  useEffect(() => {
    const canvas = cvs.current!;
    const ctx = canvas.getContext("2d")!;
    let W = canvas.width = window.innerWidth;
    let H = canvas.height = window.innerHeight;
    window.addEventListener("resize", () => { W = canvas.width = window.innerWidth; H = canvas.height = window.innerHeight; });

    const pts = Array.from({ length: 100 }, () => ({
      x: Math.random() * W, y: Math.random() * H,
      vy: -(Math.random() * 0.3 + 0.08), vx: (Math.random() - 0.5) * 0.1,
      size: Math.random() * 1.2 + 0.2,
      op: Math.random() * 0.4 + 0.05,
      hue: Math.random() < 0.5 ? 195 : 28,
    }));

    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      ctx.clearRect(0, 0, W, H);
      pts.forEach((p) => {
        p.y += p.vy; p.x += p.vx; p.op -= 0.0004;
        if (p.y < -5 || p.op <= 0) { p.y = H + 5; p.x = Math.random() * W; p.op = Math.random() * 0.4 + 0.05; }
        ctx.beginPath(); ctx.arc(p.x, p.y, p.size, 0, Math.PI * 2);
        ctx.fillStyle = `hsla(${p.hue},100%,70%,${p.op})`; ctx.fill();
      });
    };
    tick();
    return () => cancelAnimationFrame(raf);
  }, []);
  return <canvas ref={cvs} className="fixed inset-0 pointer-events-none z-[1]" style={{ opacity: 0.7 }} />;
}

/* ─── PROGRESS BAR ──────────────────────────────────────────── */
function ProgressBar() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => setW(window.scrollY / (document.body.scrollHeight - window.innerHeight) * 100);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-[2px] z-[200] transition-[width_.05s_linear]"
      style={{ width: `${w}%`, background: "linear-gradient(to right, #00d4ff, #ff6b00)", boxShadow: "0 0 8px #00d4ff" }} />
  );
}

/* ─── ROOT ───────────────────────────────────────────────────── */
export default function Index() {
  return (
    <div className="relative bg-[#03030a] text-white overflow-x-hidden">
      {/* Backgrounds */}
      <ThreeBackground />
      <ParticleCanvas />
      {/* Ambient light beams */}
      <div className="fixed -top-40 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)", filter: "blur(60px)", animation: "drift1 22s ease-in-out infinite" }} />
      <div className="fixed -bottom-20 -right-20 w-[450px] h-[450px] rounded-full pointer-events-none z-[2]"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)", filter: "blur(60px)", animation: "drift2 28s ease-in-out infinite" }} />

      {/* UI */}
      <ProgressBar />
      <Navigation />

      <main className="relative z-10">
        <HeroSection />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <AboutSection />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <SkillsSection />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <ProjectsSection />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <ExperienceSection />
        <div className="h-px bg-gradient-to-r from-transparent via-white/[0.06] to-transparent" />
        <ContactSection />
      </main>

      <footer className="relative z-10 border-t border-white/[0.05] py-6 text-center">
        <p className="font-mono text-[0.65rem] tracking-[0.2em] uppercase text-[#3a3a50]">
          © 2026 Gourangkumar Monashara — AI, ML & Computer Vision Engineer
        </p>
      </footer>
    </div>
  );
}
