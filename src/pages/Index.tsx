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
    link: "#",
    linkLabel: "Explore Project",
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

/* ─── EXPERIENCE: REAL CV DATA ─────────────────────────────── */
const EXPERIENCE = [
  {
    num: "01",
    company: "BMW Group",
    role: "AI Engineer",
    type: "Working Student",
    period: "Aug 2025 — Present",
    location: "Munich, Germany",
    accent: "#0066ff",
    accent2: "#00d4ff",
    status: "active",
    description:
      "Currently architecting Agentic AI workflows and full-stack LLM applications that automate engineering processes across BMW's enterprise environment.",
    achievements: [
      "Designed AI agent workflows using LangChain, LangGraph, ReAct reasoning, and multi-agent orchestration to automate engineering tasks",
      "Developed pipeline for BMW's replacement tool using Claude Code and Codex, including model tuning, benchmarking, and performance evaluation",
      "Built full-stack AI applications using FastAPI (backend APIs), Streamlit/React (frontend), with integrated data storage for end-to-end workflows",
      "Containerized ML and LLM components using Docker and deployed them in Linux environments for reproducibility and testing",
      "Developed forecasting and predictive analytics models in Python using Pandas and Scikit-Learn for data-driven planning and optimization",
      "Built a full-stack RAG application on Google Vertex AI with API layer, Streamlit frontend, and backend data pipeline for enterprise Q&A",
      "Designed LLM-based agent workflows using Llama and GPT-4.1 to extract KPIs, identify irregular patterns, and generate technical insights",
      "Tuned LLM prompts and agent workflows to reduce hallucinations and enforce deterministic behavior in signal and context analysis",
      "Worked cross-functionally with technical and non-technical teams, transforming business needs into AI assets and Agentic workflows",
    ],
    stack: ["LangChain", "LangGraph", "GPT-4.1", "Llama", "FastAPI", "Vertex AI", "Docker", "React", "Streamlit", "Claude Code", "Codex", "ReAct"],
  },
  {
    num: "02",
    company: "CREAT GmbH",
    role: "Software Engineer",
    type: "Working Student",
    period: "Sep 2023 — Jul 2025",
    location: "Ingolstadt, Germany",
    accent: "#ff6b00",
    accent2: "#ffaa44",
    status: "past",
    description:
      "Architected LLM-powered automation systems and scalable microservices for AI-driven validation workflows in cloud TMS environments.",
    achievements: [
      "Developed LLM- and RAG-based automation systems with GPT-4, LangChain, and FastAPI for semantic test data analysis and AI-driven validation workflow",
      "Implemented containerized microservices with Docker, FastAPI, and Kubernetes for scalable deployment of AI modules in DevOps environments",
      "Built RAG pipelines and knowledge graph-based agents for intelligent document retrieval and contextual reasoning in cloud TMS environments",
      "Implemented ReAct agents and modular microservices under Docker and RESTful APIs for dynamic knowledge processing in cloud TMS environments",
      "Utilized TensorFlow, PyTorch, Docker, and Git for end-to-end AI pipeline development, CI/CD integration, model deployment, and test automation",
      "Collaborated with cross-functional teams in implementing AI roadmaps and integrating AI into business processes following Agile/Scrum methodology",
    ],
    stack: ["GPT-4", "LangChain", "FastAPI", "Kubernetes", "Docker", "RAG", "PyTorch", "TensorFlow", "Knowledge Graphs", "ReAct", "REST APIs", "CI/CD"],
  },
  {
    num: "03",
    company: "LAB — THI",
    role: "AI Research Assistant",
    type: "Working Student",
    period: "Nov 2023 — Aug 2024",
    location: "Ingolstadt, Germany",
    accent: "#7b5ea7",
    accent2: "#bf94ff",
    status: "past",
    description:
      "Researched and prototyped agentic AI systems for autonomous decision-making and multi-agent behavior planning in robotic environments.",
    achievements: [
      "Researched and implemented agentic AI systems for autonomous decision logic, multi-agent coordination, and behavior planning in robotic environments",
      "Integrated AI solutions into Agile DevOps and MLOps pipelines, collaborating with cross-functional teams from AI Labs for productive deployment",
    ],
    stack: ["Agentic AI", "Multi-Agent Systems", "Robotics", "MLOps", "DevOps", "Python", "Behavior Planning", "Research"],
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

    const coreGeo = new THREE.IcosahedronGeometry(1.3, 1);
    const coreMat = new THREE.MeshStandardMaterial({
      color: 0x00d4ff, metalness: 0.9, roughness: 0.1,
      transparent: true, opacity: 0.12,
    });
    const core = new THREE.Mesh(coreGeo, coreMat);

    const wireMat = new THREE.MeshBasicMaterial({ color: 0x00d4ff, wireframe: true, transparent: true, opacity: 0.22 });
    const wire = new THREE.Mesh(coreGeo.clone(), wireMat);

    const shellGeo = new THREE.IcosahedronGeometry(2.1, 1);
    const shellWire = new THREE.Mesh(shellGeo, new THREE.MeshBasicMaterial({ color: 0xff6b00, wireframe: true, transparent: true, opacity: 0.07 }));

    const r1 = new THREE.Mesh(new THREE.TorusGeometry(2.4, 0.008, 8, 80), new THREE.MeshBasicMaterial({ color: 0x00d4ff, transparent: true, opacity: 0.35 }));
    r1.rotation.x = Math.PI / 4;
    const r2 = new THREE.Mesh(new THREE.TorusGeometry(2.8, 0.005, 8, 80), new THREE.MeshBasicMaterial({ color: 0xff6b00, transparent: true, opacity: 0.2 }));
    r2.rotation.x = -Math.PI / 3; r2.rotation.y = Math.PI / 5;

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

  return <canvas ref={canvasRef} className="fixed inset-0 w-full h-full pointer-events-none z-0" />;
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
    <nav className={`fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-8 md:px-16 py-5 transition-all duration-500 ${scrolled ? "bg-[rgba(3,3,10,0.85)] backdrop-blur-xl border-b border-white/[0.06]" : ""}`}>
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
    { n: "3+", label: "Years in AI" },
    { n: "20+", label: "AI Projects Shipped" },
    { n: "2026", label: "SAE SIAT Published" },
    { n: "∞", label: "Problems to Solve" },
  ];

  return (
    <section ref={ref} id="about" className="relative min-h-screen flex items-center py-28 px-8 z-10">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
        <div>
          <p className="about-reveal font-mono text-xs tracking-[0.35em] text-[#00d4ff] uppercase mb-4 flex items-center gap-4">
            <span className="w-10 h-px bg-[#00d4ff] inline-block" /> About Me
          </p>
          <h2 className="about-reveal font-['Bebas_Neue'] text-[clamp(2.5rem,5vw,5rem)] leading-tight text-white mb-8">
            Building Intelligent<br /><span className="text-[#00d4ff]">Automotive</span> Systems
          </h2>
          <p className="about-reveal text-[1.15rem] font-light text-white/80 leading-[1.9] mb-5">
            AI/ML Engineer building intelligence into testing pipelines and engineering automation.
          </p>
          <p className="about-reveal text-sm text-[#80809a] leading-[1.9] mb-5">
            My work sits at the intersection of deep learning and engineering — building systems that see, reason, and validate. From CNNs classifying infotainment screens to LLM agents automating BMW workflows, I engineer AI that meets enterprise standards.
          </p>
          <p className="about-reveal text-sm text-[#80809a] leading-[1.9]">
            Currently pursuing a Master's in AI at Technische Hochschule Ingolstadt while working as an AI Engineer at BMW Group, Munich.
          </p>
          <div className="about-reveal grid grid-cols-2 gap-px mt-10 border border-white/[0.07]">
            {stats.map((s, i) => (
              <div key={i} className="p-5 border-b border-r border-white/[0.07]">
                <div className="font-['Bebas_Neue'] text-4xl text-[#00d4ff] leading-none">{s.n}</div>
                <div className="text-[0.7rem] tracking-widest uppercase text-[#5a5a75] mt-1.5">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
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
                <p className="text-[0.82rem] text-[#70708a] leading-relaxed">{p.desc}</p>
                <a href={p.link} className="inline-flex items-center gap-2 mt-5 text-[0.72rem] tracking-[0.1em] uppercase text-[#00d4ff] hover:gap-3 transition-all duration-200">
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

/* ─── PREMIUM 3D EXPERIENCE CARD ────────────────────────────── */
type ExpItem = typeof EXPERIENCE[0];

function ExperienceCard({ exp }: { exp: ExpItem }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const glowRef  = useRef<HTMLDivElement>(null);
  const [expanded, setExpanded] = useState(false);

  // 3D mouse tilt
  useEffect(() => {
    const card  = cardRef.current;
    const inner = innerRef.current;
    const glow  = glowRef.current;
    if (!card || !inner || !glow) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const handleMove = (e: MouseEvent) => {
      const rect = card.getBoundingClientRect();
      const xPct = (e.clientX - rect.left) / rect.width  - 0.5;
      const yPct = (e.clientY - rect.top)  / rect.height - 0.5;
      gsap.to(inner, {
        rotateY: xPct *  6,
        rotateX: yPct * -5,
        duration: 0.5, ease: "power2.out", transformPerspective: 1500,
      });
      gsap.to(glow, { x: xPct * 80, y: yPct * 80, duration: 0.6, ease: "power2.out" });
    };
    const handleLeave = () => {
      gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.8, ease: "power2.out" });
      gsap.to(glow,  { x: 0, y: 0, duration: 0.8, ease: "power2.out" });
    };
    card.addEventListener("mousemove", handleMove);
    card.addEventListener("mouseleave", handleLeave);
    return () => {
      card.removeEventListener("mousemove", handleMove);
      card.removeEventListener("mouseleave", handleLeave);
    };
  }, []);

  // Scroll reveal
  useEffect(() => {
    if (!cardRef.current) return;
    const ctx = gsap.context(() => {
      gsap.from(cardRef.current, {
        opacity: 0, y: 100, rotateX: -10, scale: 0.94,
        duration: 1.2, ease: "power3.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 82%", toggleActions: "play none none reverse" },
      });
      gsap.from(cardRef.current!.querySelectorAll(".ach-row"), {
        opacity: 0, x: -30, duration: 0.5, stagger: 0.06, ease: "power2.out",
        scrollTrigger: { trigger: cardRef.current, start: "top 70%", toggleActions: "play none none reverse" },
      });
      gsap.from(cardRef.current!.querySelectorAll(".tech-pill"), {
        opacity: 0, scale: 0.7, y: 10, duration: 0.4, stagger: 0.03, ease: "back.out(1.4)",
        scrollTrigger: { trigger: cardRef.current, start: "top 60%", toggleActions: "play none none reverse" },
      });
    }, cardRef);
    return () => ctx.revert();
  }, []);

  const visibleAch = expanded ? exp.achievements : exp.achievements.slice(0, 3);
  const hiddenCount = exp.achievements.length - 3;

  return (
    <div ref={cardRef} className="relative" style={{ perspective: "1500px" }}>
      {/* Timeline dot */}
      <div className="absolute -left-[34px] md:-left-[42px] top-12 z-20 hidden sm:block">
        <div className="relative w-3 h-3 rounded-full"
             style={{ background: exp.accent, boxShadow: `0 0 18px ${exp.accent}, 0 0 6px ${exp.accent2}` }}>
          {exp.status === "active" && (
            <div className="absolute inset-0 rounded-full animate-ping"
                 style={{ background: exp.accent, opacity: 0.55 }} />
          )}
        </div>
      </div>

      <div ref={innerRef} className="relative" style={{ transformStyle: "preserve-3d" }}>
        {/* Glow layer */}
        <div ref={glowRef} className="absolute inset-0 rounded-2xl pointer-events-none"
             style={{
               background: `radial-gradient(ellipse at 30% 20%, ${exp.accent}22 0%, transparent 60%)`,
               filter: "blur(40px)",
               transform: "translateZ(-100px)",
             }} />

        {/* Card surface */}
        <div className="relative rounded-2xl overflow-hidden border backdrop-blur-xl"
             style={{
               background: `linear-gradient(135deg, rgba(255,255,255,0.025) 0%, rgba(255,255,255,0.005) 50%, ${exp.accent}06 100%)`,
               borderColor: `${exp.accent}20`,
               boxShadow: `0 30px 80px -20px rgba(0,0,0,0.5), 0 0 0 1px ${exp.accent}08, inset 0 1px 0 rgba(255,255,255,0.05)`,
             }}>
          {/* Top accent line */}
          <div className="absolute top-0 left-0 right-0 h-px"
               style={{ background: `linear-gradient(to right, transparent, ${exp.accent}, transparent)` }} />

          {/* Corner accents */}
          {[
            { pos: "top-3 left-3", brd: "border-t border-l" },
            { pos: "top-3 right-3", brd: "border-t border-r" },
            { pos: "bottom-3 left-3", brd: "border-b border-l" },
            { pos: "bottom-3 right-3", brd: "border-b border-r" },
          ].map((c, i) => (
            <div key={i} className={`absolute ${c.pos} ${c.brd} w-3 h-3`} style={{ borderColor: `${exp.accent}50` }} />
          ))}

          <div className="p-7 md:p-10">
            {/* Header */}
            <div className="flex items-start justify-between gap-4 mb-6 flex-wrap">
              <div className="flex items-center gap-4">
                <div className="font-mono text-[0.7rem] tracking-[0.3em] uppercase font-bold"
                     style={{ color: exp.accent }}>
                  {exp.num}
                </div>
                <div className="w-8 h-px" style={{ background: exp.accent }} />
                {exp.status === "active" && (
                  <div className="flex items-center gap-2 px-3 py-1 rounded-full"
                       style={{ background: `${exp.accent}15`, border: `1px solid ${exp.accent}40` }}>
                    <span className="relative flex h-1.5 w-1.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full opacity-75"
                            style={{ background: exp.accent }} />
                      <span className="relative inline-flex rounded-full h-1.5 w-1.5"
                            style={{ background: exp.accent }} />
                    </span>
                    <span className="text-[0.6rem] tracking-[0.2em] uppercase font-medium"
                          style={{ color: exp.accent }}>Active</span>
                  </div>
                )}
              </div>
              <div className="font-mono text-[0.7rem] tracking-[0.2em] uppercase"
                   style={{ color: exp.accent2 }}>
                {exp.period}
              </div>
            </div>

            <div className="grid md:grid-cols-[1fr_2fr] gap-8 md:gap-12">
              {/* LEFT */}
              <div className="md:border-r md:pr-8" style={{ borderColor: `${exp.accent}15` }}>
                <h3 className="font-['Bebas_Neue'] text-[clamp(2.2rem,4.5vw,3.8rem)] leading-[0.9] tracking-wider mb-3"
                    style={{
                      background: `linear-gradient(135deg, #ffffff 0%, ${exp.accent2} 100%)`,
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                      backgroundClip: "text",
                    }}>
                  {exp.company.split(" ").map((w, i) => (
                    <span key={i} className="block">{w}</span>
                  ))}
                </h3>

                <div className="space-y-1.5 mt-5">
                  <div className="text-[0.95rem] text-white font-medium">{exp.role}</div>
                  <div className="flex items-center gap-2 flex-wrap">
                    <span className="text-[0.7rem] px-2 py-0.5 rounded-sm font-mono uppercase tracking-wider"
                          style={{ background: `${exp.accent}12`, color: exp.accent2 }}>
                      {exp.type}
                    </span>
                  </div>
                  <div className="flex items-center gap-1.5 text-[0.78rem] text-[#80809a] pt-2">
                    <svg className="w-3 h-3" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
                      <circle cx="12" cy="10" r="3" />
                    </svg>
                    {exp.location}
                  </div>
                </div>

                {/* Decorative grid */}
                <div className="hidden md:block mt-8 relative h-24">
                  <div className="absolute inset-0 opacity-30"
                       style={{
                         backgroundImage: `linear-gradient(90deg, ${exp.accent}30 1px, transparent 1px), linear-gradient(${exp.accent}30 1px, transparent 1px)`,
                         backgroundSize: "16px 16px",
                         maskImage: "radial-gradient(ellipse 60% 60% at 30% 40%, black 30%, transparent 70%)",
                         WebkitMaskImage: "radial-gradient(ellipse 60% 60% at 30% 40%, black 30%, transparent 70%)",
                       }} />
                </div>
              </div>

              {/* RIGHT */}
              <div>
                <p className="text-[0.95rem] text-white/85 leading-[1.85] mb-6 font-light">
                  {exp.description}
                </p>

                <div className="mb-7">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px" style={{ background: exp.accent }} />
                    <span className="font-mono text-[0.62rem] tracking-[0.3em] uppercase"
                          style={{ color: exp.accent2 }}>
                      Key Achievements
                    </span>
                  </div>
                  <ul className="space-y-2.5">
                    {visibleAch.map((a, i) => (
                      <li key={i} className="ach-row flex gap-3 text-[0.83rem] leading-[1.7] text-[#b8b8c8]">
                        <span className="mt-2 flex-shrink-0 w-1 h-1 rounded-full"
                              style={{ background: exp.accent, boxShadow: `0 0 6px ${exp.accent}` }} />
                        <span>{a}</span>
                      </li>
                    ))}
                  </ul>
                  {hiddenCount > 0 && (
                    <button
                      onClick={() => setExpanded(!expanded)}
                      className="mt-4 inline-flex items-center gap-2 text-[0.72rem] tracking-[0.15em] uppercase font-medium hover:gap-3 transition-all duration-200"
                      style={{ color: exp.accent2 }}>
                      {expanded ? "Show Less" : `+ ${hiddenCount} More Achievements`}
                      <svg className={`w-3 h-3 transition-transform ${expanded ? "rotate-180" : ""}`}
                           viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        <path d="M6 9l6 6 6-6" />
                      </svg>
                    </button>
                  )}
                </div>

                <div>
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-6 h-px" style={{ background: exp.accent }} />
                    <span className="font-mono text-[0.62rem] tracking-[0.3em] uppercase"
                          style={{ color: exp.accent2 }}>
                      Tech Stack
                    </span>
                  </div>
                  <div className="flex flex-wrap gap-1.5">
                    {exp.stack.map((t) => (
                      <span key={t}
                            className="tech-pill px-2.5 py-1 text-[0.7rem] font-medium tracking-wide rounded-sm transition-all duration-200 hover:-translate-y-0.5 cursor-default"
                            style={{
                              background: `${exp.accent}10`,
                              border: `1px solid ${exp.accent}25`,
                              color: exp.accent2,
                            }}>
                        {t}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── PREMIUM EXPERIENCE SECTION ────────────────────────────── */
function ExperienceSection() {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(".exp-header", {
        opacity: 0, y: 40, duration: 1, stagger: 0.1, ease: "power3.out",
        scrollTrigger: { trigger: ".exp-header", start: "top 85%", toggleActions: "play none none reverse" },
      });
      gsap.utils.toArray<HTMLElement>(".exp-stat-num").forEach((el) => {
        const text = el.textContent || "";
        const num = parseInt(text.replace(/\D/g, ""));
        const suffix = text.replace(/[\d]/g, "");
        if (!isNaN(num)) {
          ScrollTrigger.create({
            trigger: el, start: "top 90%",
            onEnter: () => {
              gsap.fromTo({ v: 0 }, { v: num }, {
                duration: 1.5, ease: "power2.out",
                onUpdate: function () { el.textContent = Math.round((this.targets()[0] as { v: number }).v) + suffix; },
              });
            },
          });
        }
      });
      gsap.from(".exp-timeline-line", {
        scaleY: 0, transformOrigin: "top center", duration: 2, ease: "power2.out",
        scrollTrigger: { trigger: ".exp-timeline-wrap", start: "top 70%", end: "bottom 80%", scrub: 1 },
      });
    }, ref);
    return () => ctx.revert();
  }, []);

  const stats = [
    { n: "3+",  label: "Years Experience" },
    { n: "3",   label: "Companies" },
    { n: "20+", label: "AI Projects" },
    { n: "2",   label: "Countries" },
  ];

  return (
    <section ref={ref} id="experience" className="relative py-32 px-6 md:px-8 z-10 overflow-hidden">
      <div className="absolute top-1/4 left-1/3 w-[600px] h-[600px] rounded-full pointer-events-none"
           style={{
             background: "radial-gradient(circle, rgba(0,212,255,0.04) 0%, transparent 70%)",
             filter: "blur(80px)",
           }} />

      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-20">
          <p className="exp-header font-mono text-xs tracking-[0.4em] text-[#00d4ff] uppercase mb-6 flex items-center justify-center gap-4">
            <span className="w-12 h-px bg-[#00d4ff]" />Professional Journey<span className="w-12 h-px bg-[#00d4ff]" />
          </p>
          <h2 className="exp-header font-['Bebas_Neue'] text-[clamp(2.8rem,7vw,7rem)] leading-[0.95] tracking-wide mb-5"
              style={{
                background: "linear-gradient(135deg, #ffffff 0%, #c0c0d8 50%, #00d4ff 100%)",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>
            Building Across<br />The <span style={{ color: "#00d4ff" }}>AI Stack</span>
          </h2>
          <p className="exp-header text-[clamp(0.9rem,1.4vw,1.05rem)] text-[#9090a8] max-w-2xl mx-auto leading-[1.85] font-light">
            Three years architecting Agentic AI systems, full-stack LLM applications, and production ML pipelines —
            from BMW's enterprise environment to research labs at THI.
          </p>
        </div>

        <div className="exp-header grid grid-cols-2 md:grid-cols-4 gap-px border border-white/[0.07] mb-24 backdrop-blur-md"
             style={{ background: "rgba(255,255,255,0.015)" }}>
          {stats.map((s, i) => (
            <div key={i} className="px-6 py-7 border-b border-r border-white/[0.07] text-center md:text-left">
              <div className="exp-stat-num font-['Bebas_Neue'] text-[2.8rem] leading-none mb-1.5 tracking-wider"
                   style={{
                     background: "linear-gradient(135deg, #00d4ff, #0066ff)",
                     WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
                   }}>
                {s.n}
              </div>
              <div className="font-mono text-[0.62rem] tracking-[0.25em] text-[#5a5a75] uppercase">
                {s.label}
              </div>
            </div>
          ))}
        </div>

        <div className="exp-timeline-wrap relative pl-0 sm:pl-10 md:pl-14">
          <div className="exp-timeline-line absolute left-0 top-2 bottom-0 w-px hidden sm:block"
               style={{
                 background: "linear-gradient(to bottom, #00d4ff 0%, #ff6b00 50%, #7b5ea7 100%)",
                 boxShadow: "0 0 20px rgba(0,212,255,0.3)",
               }} />

          <div className="space-y-10 md:space-y-14">
            {EXPERIENCE.map((exp) => (
              <ExperienceCard key={exp.num} exp={exp} />
            ))}
          </div>
        </div>

        <div className="mt-20 text-center">
          <p className="font-mono text-[0.7rem] tracking-[0.25em] uppercase text-[#5a5a75] mb-4">
            Currently Available · July 2026
          </p>
          <a href="#contact"
             className="inline-flex items-center gap-3 px-8 py-3.5 text-xs tracking-[0.15em] uppercase font-medium border border-[#00d4ff]/40 text-[#00d4ff] hover:bg-[#00d4ff] hover:text-[#03030a] hover:shadow-[0_0_30px_rgba(0,212,255,0.4)] transition-all duration-300 backdrop-blur-sm"
             style={{ clipPath: "polygon(0 0,calc(100% - 10px) 0,100% 10px,100% 100%,10px 100%,0 calc(100% - 10px))" }}>
            Let's Build Together
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M5 12h14M13 5l7 7-7 7" />
            </svg>
          </a>
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
          Open to AI Engineering and Agentic AI roles in Germany. Available July 2026.
        </p>

        <a href="mailto:monashragaurang6@gmail.com"
          className="contact-reveal inline-block font-['Bebas_Neue'] text-[clamp(1.2rem,3vw,2rem)] text-white/80 border-b border-white/10 pb-1 mb-10 hover:text-[#00d4ff] hover:border-[#00d4ff] transition-all duration-300 tracking-wide">
          monashragaurang6@gmail.com
        </a>

        <div className="contact-reveal flex gap-3 justify-center flex-wrap">
          {[
            { label: "GitHub", href: "https://github.com/Gaurang8200" },
            { label: "LinkedIn", href: "https://linkedin.com/in/gourangkumar-n-m" },
            { label: "Phone", href: "tel:+4917657713152" },
            { label: "Resume", href: "#" },
          ].map((l) => (
            <a key={l.label} href={l.href} target={l.href.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
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
      <ThreeBackground />
      <ParticleCanvas />
      <div className="fixed -top-40 -left-20 w-[500px] h-[500px] rounded-full pointer-events-none z-[2]"
        style={{ background: "radial-gradient(circle, rgba(0,212,255,0.07) 0%, transparent 70%)", filter: "blur(60px)", animation: "drift1 22s ease-in-out infinite" }} />
      <div className="fixed -bottom-20 -right-20 w-[450px] h-[450px] rounded-full pointer-events-none z-[2]"
        style={{ background: "radial-gradient(circle, rgba(255,107,0,0.07) 0%, transparent 70%)", filter: "blur(60px)", animation: "drift2 28s ease-in-out infinite" }} />

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
          © 2026 Gourangkumar N Monashara — AI Engineer · Ingolstadt, Germany
        </p>
      </footer>
    </div>
  );
}
