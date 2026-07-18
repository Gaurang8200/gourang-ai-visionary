import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import * as THREE from "three";

gsap.registerPlugin(ScrollTrigger);

/* ─── DATA ─────────────────────────────────────────────────── */
const SKILLS = [
  {
    category: "Programming",
    items: ["Python", "Go", "TypeScript", "Java", "JavaScript / React", "C", "C++", "SQL", "R", "Bash", "Kotlin"],
    bars: [
      { label: "Python / Go", pct: 95 },
      { label: "TypeScript / React", pct: 85 },
      { label: "C / C++", pct: 75 },
    ],
    accent: "#00d4ff",
  },
  {
    category: "Agentic AI & LLMs",
    items: ["LangChain", "LangGraph", "RAG", "Claude Code", "GitHub Copilot", "OpenCode"],
    bars: [
      { label: "Agentic Workflows", pct: 93 },
      { label: "RAG / LLM Integration", pct: 90 },
      { label: "Prompt Engineering", pct: 88 },
    ],
    accent: "#a855f7",
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS S3", "SageMaker", "Docker", "Kubernetes", "Linux", "Virtual Machines"],
    bars: [
      { label: "Containerization", pct: 90 },
      { label: "Kubernetes", pct: 82 },
      { label: "Cloud Deployment", pct: 85 },
    ],
    accent: "#ff6b00",
  },
  {
    category: "DevOps & Observability",
    items: ["CI/CD", "Git / GitLab", "Kafka", "OpenTelemetry", "Prometheus", "Datadog", "Splunk"],
    bars: [
      { label: "CI/CD Pipelines", pct: 90 },
      { label: "Monitoring & Tracing", pct: 84 },
      { label: "Reliability Engineering", pct: 86 },
    ],
    accent: "#10b981",
  },
  {
    category: "Backend & APIs",
    items: ["FastAPI", "REST APIs", "Microservices", "WebSockets", "Distributed Systems"],
    bars: [
      { label: "API Design", pct: 92 },
      { label: "Microservices", pct: 88 },
      { label: "Distributed Systems", pct: 82 },
    ],
    accent: "#00d4ff",
  },
  {
    category: "Data & ML",
    items: ["Pandas", "NumPy", "Scikit-Learn", "Spark", "MySQL", "ETL Pipelines", "Data Warehouses"],
    bars: [
      { label: "Data Pipelines", pct: 90 },
      { label: "ML / Analytics", pct: 85 },
      { label: "Big Data (Spark)", pct: 78 },
    ],
    accent: "#a855f7",
  },
];

const PROJECTS = [
  {
    num: "01",
    icon: "RAG",
    tags: ["Google Vertex AI", "FastAPI", "Streamlit", "LangChain"],
    title: "Enterprise RAG Assistant on Vertex AI",
    desc: "Full-stack RAG application built for BMW Group — Vertex AI retrieval layer, FastAPI backend, and a Streamlit/React front end wired together for enterprise Q&A over internal engineering data. Includes prompt tuning to cut hallucinations and enforce deterministic answers.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#00d4ff",
  },
  {
    num: "02",
    icon: "KG",
    tags: ["GPT-4", "LangChain", "Knowledge Graphs", "Kubernetes"],
    title: "Knowledge-Graph RAG for Cloud TMS",
    desc: "ReAct-agent and knowledge-graph-backed retrieval system for a cloud transport-management platform at CREAT GmbH — containerized on Docker/Kubernetes for scalable, contextual document reasoning across a large operational dataset.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#a855f7",
  },
  {
    num: "03",
    icon: "DL",
    tags: ["PyTorch", "SqueezeNet", "Docker", "Vertex AI"],
    title: "MLOps Image-Classification Pipeline",
    desc: "End-to-end MLOps pipeline that trains and serves a SqueezeNet image classifier on Google Vertex AI — Dockerized training/inference services with a reproducible deployment flow from notebook to production endpoint.",
    link: "https://github.com/Gaurang8200/MLOps_Project_DL",
    linkLabel: "View Repository",
    accent: "#ff6b00",
  },
  {
    num: "04",
    icon: "OPS",
    tags: ["OpenTelemetry", "Kafka", "Prometheus", "Grafana"],
    title: "Sustainable Cloud Diagnostics Toolkit",
    desc: "Python-based diagnostic tooling for fast production triage at BMW, paired with OpenTelemetry-driven observability across Kafka, Prometheus, and Grafana — improved web-app stability by ~17% and cut manual deployment intervention by ~36%.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#10b981",
  },
];

/* ─── EXPERIENCE: REAL CV DATA ─────────────────────────────── */
const EXPERIENCE = [
  {
    num: "01",
    company: "BMW Group",
    role: "Software Developer",
    type: "Full-Time",
    period: "Aug 2024 — Present",
    location: "Munich, Germany",
    accent: "#0066ff",
    accent2: "#00d4ff",
    status: "active",
    description:
      "Full-stack development on sustainability-focused cloud systems — shipping microservices, validation environments, and the observability that keeps them honest.",
    achievements: [
      "Built and deployed Docker-based microservices, resolving system-wide issues spanning data inconsistency, latency, and service communication",
      "Stood up cloud-based validation environments with REST APIs and internal data pipelines for large-scale testing under real sustainability conditions",
      "Built Python diagnostic tooling for rapid triage of production issues — lifted web-app stability by roughly 17%",
      "Automated build, test, and deployment with Git-based CI/CD workflows, cutting manual release intervention by around 36%",
      "Instrumented systems with OpenTelemetry across Prometheus, OpenSearch, Kafka, and Grafana for deeper transparency and faster fault diagnosis",
      "Analyzed compute inefficiency across cloud services — measured used vs. requested capacity to surface resource-optimization opportunities",
      "Contributed to agile delivery with regular code reviews via GitHub and Jira, shaping architecture decisions and surfacing technical trade-offs",
    ],
    stack: ["Python", "Go", "TypeScript", "Angular", "Docker", "REST APIs", "OpenTelemetry", "Prometheus", "Kafka", "Grafana", "CI/CD", "GitHub"],
  },
  {
    num: "02",
    company: "CREAT GmbH",
    role: "Software Engineer",
    type: "Full-Time",
    period: "Sep 2023 — Jul 2024",
    location: "Ingolstadt, Germany",
    accent: "#ff6b00",
    accent2: "#ffaa44",
    status: "past",
    description:
      "Data-driven backend systems and ML-backed services, built and operated on Kubernetes for scalable, production-adjacent workloads.",
    achievements: [
      "Built data-driven backend systems and ML-backed services in Python and Go, integrating structured datasets into scalable applications",
      "Built and operated containerized microservices with Docker and Kubernetes for distributed data processing and scalable workflows",
      "Designed data pipelines and complex ETL processes for structured data ingestion and transformation",
      "Developed and operated platform-adjacent services on Kubernetes, focused on stability and reliable operation of production-facing systems",
      "Implemented CI/CD with Git and GitLab, reducing manual intervention and recurring deployment failures during quality assurance",
    ],
    stack: ["Python", "Go", "Docker", "Kubernetes", "ETL Pipelines", "GitLab CI/CD", "REST APIs", "Microservices"],
  },
  {
    num: "03",
    company: "Accenture",
    role: "Software Developer",
    type: "Full-Time",
    period: "Sep 2022 — Aug 2023",
    location: "Ingolstadt, Germany",
    accent: "#7b5ea7",
    accent2: "#bf94ff",
    status: "past",
    description:
      "Safety-critical ADAS validation for the automotive industry — building the test systems that prove autonomous features work under pressure.",
    achievements: [
      "Developed and validated ADAS functionality, including Emergency-Assist systems, with focus on safety-critical scenarios under ISO 26262",
      "Built a real-world test system to evaluate system behavior against safety-critical automotive requirements",
      "Designed scenario-based test and validation workflows to evaluate system response in edge cases and fault conditions",
      "Integrated solutions into DevOps/MLOps pipelines on Linux infrastructure, collaborating with cross-functional teams on test, deployment, and monitoring",
    ],
    stack: ["ADAS", "ISO 26262", "Python", "Linux", "DevOps", "MLOps", "Test Automation"],
  },
];

const EDUCATION = [
  {
    degree: "M.Eng. Artificial Intelligence",
    school: "Technische Hochschule Ingolstadt",
    period: "2024 — 2026",
    accent: "#00d4ff",
  },
  {
    degree: "B.Eng. Automotive Engineering",
    school: "Technische Hochschule Ingolstadt",
    period: "2020 — 2024",
    accent: "#a855f7",
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
        Full-Stack Engineer · Cloud Systems · Agentic AI
      </div>

      <h1 ref={nameRef} className="font-['Bebas_Neue'] text-[clamp(4.5rem,13vw,12rem)] leading-[0.88] tracking-[0.03em] mb-6"
        style={{ background: "linear-gradient(135deg, #ffffff 0%, #c0c0d8 45%, #00d4ff 100%)", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent", backgroundClip: "text" }}>
        GOURANGKUMAR<br />MONASHARA
      </h1>

      <div className="hero-sub text-[clamp(0.85rem,2vw,1.1rem)] tracking-[0.2em] uppercase text-[#5a5a75] mt-4 mb-6">
        Software Developer @ BMW Group
      </div>

      <p className="hero-desc text-[clamp(0.9rem,1.4vw,1.1rem)] font-light text-[#9090a8] max-w-xl leading-[1.9] mb-10">
        Building resilient, resource-aware cloud systems — full-stack from Python and Go services to TypeScript front ends, wired together with CI/CD, observability, and increasingly, agentic AI workflows.
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
    { n: "3+", label: "Years Professional Exp." },
    { n: "3", label: "Companies · BMW, CREAT, Accenture" },
    { n: "2", label: "Engineering Degrees" },
    { n: "C1", label: "German & English" },
  ];

  return (
    <section ref={ref} id="about" className="relative min-h-screen flex items-center py-28 px-8 z-10">
      <div className="max-w-6xl mx-auto w-full grid md:grid-cols-2 gap-20 items-center">
        <div>
          <p className="about-reveal font-mono text-xs tracking-[0.35em] text-[#a855f7] uppercase mb-4 flex items-center gap-4">
            <span className="w-10 h-px bg-[#a855f7] inline-block" /> About Me
          </p>
          <h2 className="about-reveal font-['Bebas_Neue'] text-[clamp(2.5rem,5vw,5rem)] leading-tight text-white mb-8">
            Engineering Cloud Systems<br /><span className="text-[#a855f7]">Built to Last</span>
          </h2>
          <p className="about-reveal text-[1.15rem] font-light text-white/80 leading-[1.9] mb-5">
            Full-stack developer with 3+ years turning cloud infrastructure into something stable, automated, and resource-aware.
          </p>
          <p className="about-reveal text-sm text-[#80809a] leading-[1.9] mb-5">
            My work spans the whole stack — TypeScript, Angular, and Streamlit on the front end; Python and Go on the back — wired into microservice architectures with REST APIs, relational databases, and distributed cloud systems. I care as much about what keeps a system running at 3am as what ships the feature.
          </p>
          <p className="about-reveal text-sm text-[#80809a] leading-[1.9]">
            Currently a Software Developer at BMW Group in Munich, building diagnostic tooling, CI/CD automation, and observability into sustainable cloud infrastructure — while completing a Master's in Artificial Intelligence at Technische Hochschule Ingolstadt.
          </p>
          <div className="about-reveal grid grid-cols-2 gap-px mt-10 border border-white/[0.07]">
            {stats.map((s, i) => (
              <div key={i} className="p-5 border-b border-r border-white/[0.07]">
                <div className="font-['Bebas_Neue'] text-4xl text-[#a855f7] leading-none">{s.n}</div>
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
            style={{ background: "radial-gradient(circle, rgba(168,85,247,0.1) 0%, rgba(3,3,10,0.6) 100%)" }}>
            <div className="font-['Bebas_Neue'] text-6xl text-[#a855f7] tracking-wider">GM</div>
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
        <p className="skills-reveal font-mono text-xs tracking-[0.35em] text-[#ff6b00] uppercase mb-4 flex items-center gap-4">
          <span className="w-10 h-px bg-[#ff6b00]" />Technical Arsenal
        </p>
        <h2 className="skills-reveal font-['Bebas_Neue'] text-[clamp(2.5rem,5vw,5rem)] text-white mb-16 leading-tight">
          My <span className="text-[#ff6b00]">Stack</span>
        </h2>

        <div className="grid md:grid-cols-3 gap-5">
          {SKILLS.map((s, si) => (
            <div key={si} className="skills-reveal group p-7 border border-white/[0.07] transition-all duration-300 relative overflow-hidden"
              style={{ background: "rgba(255,255,255,0.025)" }}
              onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${s.accent}40`)}
              onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}>
              <div className="absolute inset-x-0 top-0 h-px opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                style={{ background: `linear-gradient(to right, transparent, ${s.accent}, transparent)` }} />
              <div className="font-mono text-[0.65rem] tracking-[0.25em] uppercase mb-5" style={{ color: s.accent }}>{s.category}</div>
              <div className="flex flex-wrap gap-1.5 mb-6">
                {s.items.map((item) => (
                  <span key={item} className="px-2.5 py-1 text-[0.7rem] border border-white/[0.07] text-white/60 transition-all duration-200"
                    style={{ ["--hover" as string]: s.accent }}
                    onMouseEnter={(e) => { e.currentTarget.style.borderColor = `${s.accent}50`; e.currentTarget.style.color = s.accent; }}
                    onMouseLeave={(e) => { e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)"; e.currentTarget.style.color = "rgba(255,255,255,0.6)"; }}>
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
                      <div className="bar-fill h-full origin-left scale-x-0"
                        data-w={b.pct / 100}
                        style={{ background: `linear-gradient(to right, ${s.accent}, #0066ff)`, boxShadow: `0 0 8px ${s.accent}b3` }} />
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

/* ─── 3D TILT PROJECT CARD ──────────────────────────────────── */
function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  const innerRef = useRef<HTMLDivElement>(null);
  const shineRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const card = cardRef.current;
    const inner = innerRef.current;
    const shine = shineRef.current;
    if (!card || !inner || !shine) return;
    if (window.matchMedia("(max-width: 768px)").matches) return;

    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const xPct = (e.clientX - r.left) / r.width  - 0.5;
      const yPct = (e.clientY - r.top)  / r.height - 0.5;
      gsap.to(inner, {
        rotateY: xPct * 12, rotateX: yPct * -10,
        duration: 0.4, ease: "power2.out", transformPerspective: 1200,
      });
      shine.style.background =
        `radial-gradient(circle at ${(xPct + 0.5) * 100}% ${(yPct + 0.5) * 100}%, ${p.accent}30, transparent 50%)`;
    };
    const onLeave = () => {
      gsap.to(inner, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power2.out" });
      shine.style.background = "transparent";
    };
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  useEffect(() => {
    if (!cardRef.current) return;
    gsap.from(cardRef.current, {
      opacity: 0, y: 70, duration: 1, ease: "power3.out",
      scrollTrigger: { trigger: cardRef.current, start: "top 87%", toggleActions: "play none none reverse" },
    });
  }, []);

  return (
    <div ref={cardRef} className="proj-card" style={{ perspective: "1200px" }}>
      <div ref={innerRef} className="group relative border border-white/[0.07] overflow-hidden transition-colors duration-300"
        style={{
          background: "rgba(255,255,255,0.02)",
          transformStyle: "preserve-3d",
          boxShadow: "0 20px 60px -20px rgba(0,0,0,0.5)",
        }}
        onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${p.accent}66`)}
        onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}
      >
        {/* Mouse-tracked shine layer */}
        <div ref={shineRef} className="absolute inset-0 pointer-events-none transition-opacity duration-300" style={{ background: "transparent" }} />

        <div className="h-44 flex items-center justify-center relative border-b border-white/[0.05] overflow-hidden">
          <div className="font-['Bebas_Neue'] text-[5rem] text-white/[0.05] tracking-wide group-hover:scale-110 transition-all duration-500"
               style={{ transform: "translateZ(30px)", color: "rgba(255,255,255,0.05)" }}
               onMouseEnter={(e) => (e.currentTarget.style.color = `${p.accent}26`)}>
            {p.icon}
          </div>
          <span className="absolute top-4 left-5 font-mono text-[0.6rem] tracking-[0.2em]" style={{ color: `${p.accent}80` }}>{p.num}</span>
          <div className="absolute inset-0 bg-gradient-to-b from-transparent to-[rgba(3,3,10,0.5)] opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
        </div>
        <div className="p-6" style={{ transform: "translateZ(20px)" }}>
          <div className="flex flex-wrap gap-1.5 mb-4">
            {p.tags.map((t) => (
              <span key={t} className="px-2 py-0.5 text-[0.65rem]" style={{ background: `${p.accent}14`, border: `1px solid ${p.accent}33`, color: p.accent }}>{t}</span>
            ))}
          </div>
          <h3 className="font-['Bebas_Neue'] text-xl text-white mb-3 tracking-wide">{p.title}</h3>
          <p className="text-[0.82rem] text-[#70708a] leading-relaxed">{p.desc}</p>
          <a href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
            className="inline-flex items-center gap-2 mt-5 text-[0.72rem] tracking-[0.1em] uppercase hover:gap-3 transition-all duration-200" style={{ color: p.accent }}>
            {p.linkLabel}
            <svg className="w-3.5 h-3.5" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
              <path d="M7 17L17 7M7 7h10v10" />
            </svg>
          </a>
        </div>
      </div>
    </div>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────────── */
function ProjectsSection() {
  return (
    <section id="projects" className="relative py-28 px-8 z-10">
      <div className="max-w-6xl mx-auto">
        <p className="font-mono text-xs tracking-[0.35em] text-[#10b981] uppercase mb-4 flex items-center gap-4">
          <span className="w-10 h-px bg-[#10b981]" />Selected Work
        </p>
        <h2 className="font-['Bebas_Neue'] text-[clamp(2.5rem,5vw,5rem)] text-white mb-16 leading-tight">
          Featured <span className="text-[#10b981]">Projects</span>
        </h2>

        <div className="grid md:grid-cols-2 gap-6">
          {PROJECTS.map((p) => <ProjectCard key={p.num} p={p} />)}
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
    { n: "3+", label: "Years Experience" },
    { n: "3",  label: "Companies" },
    { n: "2",  label: "Degrees" },
    { n: "C1", label: "German & English" },
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
            Building Across<br />The <span style={{ color: "#00d4ff" }}>Cloud Stack</span>
          </h2>
          <p className="exp-header text-[clamp(0.9rem,1.4vw,1.05rem)] text-[#9090a8] max-w-2xl mx-auto leading-[1.85] font-light">
            Three years shipping full-stack cloud systems and automation pipelines — from safety-critical
            ADAS validation at Accenture to sustainable cloud infrastructure at BMW Group.
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

        <div className="mt-20">
          <div className="flex items-center gap-3 mb-8 justify-center">
            <div className="w-6 h-px bg-[#a855f7]" />
            <span className="font-mono text-[0.65rem] tracking-[0.3em] uppercase text-[#a855f7]">Education</span>
            <div className="w-6 h-px bg-[#a855f7]" />
          </div>
          <div className="grid sm:grid-cols-2 gap-5 max-w-3xl mx-auto">
            {EDUCATION.map((edu) => (
              <div key={edu.degree} className="p-6 border border-white/[0.07] backdrop-blur-md transition-colors duration-300"
                style={{ background: "rgba(255,255,255,0.02)" }}
                onMouseEnter={(e) => (e.currentTarget.style.borderColor = `${edu.accent}40`)}
                onMouseLeave={(e) => (e.currentTarget.style.borderColor = "rgba(255,255,255,0.07)")}>
                <div className="font-mono text-[0.65rem] tracking-[0.2em] uppercase mb-2" style={{ color: edu.accent }}>{edu.period}</div>
                <div className="text-white font-medium text-[0.95rem] mb-1">{edu.degree}</div>
                <div className="text-[#70708a] text-sm">{edu.school}</div>
              </div>
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
          Open to Full-Stack and Cloud Engineering roles in Germany — and open to relocating for the right one.
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

/* ─── CURSOR GLOW (follows mouse with cyan halo) ───────────── */
function CursorGlow() {
  const ref = useRef<HTMLDivElement>(null);
  useEffect(() => {
    if (window.matchMedia("(max-width: 768px)").matches) return;
    let tx = 0, ty = 0, x = 0, y = 0;
    const onMove = (e: MouseEvent) => { tx = e.clientX; ty = e.clientY; };
    document.addEventListener("mousemove", onMove);
    let raf: number;
    const tick = () => {
      raf = requestAnimationFrame(tick);
      x += (tx - x) * 0.18;
      y += (ty - y) * 0.18;
      if (ref.current) ref.current.style.transform = `translate(${x - 200}px, ${y - 200}px)`;
    };
    tick();
    return () => { document.removeEventListener("mousemove", onMove); cancelAnimationFrame(raf); };
  }, []);
  return (
    <div ref={ref} className="cursor-glow fixed top-0 left-0 pointer-events-none z-[3] hidden md:block"
      style={{
        width: 400, height: 400,
        background: "radial-gradient(circle, rgba(0,212,255,0.15) 0%, rgba(0,212,255,0.05) 30%, transparent 65%)",
        filter: "blur(15px)",
        mixBlendMode: "screen",
      }}
    />
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
      <CursorGlow />
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
          © 2026 Gourangkumar N Monashara — Full-Stack & Cloud Systems Engineer · Berlin, Germany
        </p>
      </footer>
    </div>
  );
}
