import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

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
    accent: "#5fd4ff",
  },
  {
    category: "Agentic AI & LLMs",
    items: ["LangChain", "LangGraph", "RAG", "Claude Code", "GitHub Copilot", "OpenCode"],
    bars: [
      { label: "Agentic Workflows", pct: 93 },
      { label: "RAG / LLM Integration", pct: 90 },
      { label: "Prompt Engineering", pct: 88 },
    ],
    accent: "#d8b4fe",
  },
  {
    category: "Cloud & Infrastructure",
    items: ["AWS S3", "SageMaker", "Docker", "Kubernetes", "Linux", "Virtual Machines"],
    bars: [
      { label: "Containerization", pct: 90 },
      { label: "Kubernetes", pct: 82 },
      { label: "Cloud Deployment", pct: 85 },
    ],
    accent: "#ffb37a",
  },
  {
    category: "DevOps & Observability",
    items: ["CI/CD", "Git / GitLab", "Kafka", "OpenTelemetry", "Prometheus", "Datadog", "Splunk"],
    bars: [
      { label: "CI/CD Pipelines", pct: 90 },
      { label: "Monitoring & Tracing", pct: 84 },
      { label: "Reliability Engineering", pct: 86 },
    ],
    accent: "#6ee7b7",
  },
  {
    category: "Backend & APIs",
    items: ["FastAPI", "REST APIs", "Microservices", "WebSockets", "Distributed Systems"],
    bars: [
      { label: "API Design", pct: 92 },
      { label: "Microservices", pct: 88 },
      { label: "Distributed Systems", pct: 82 },
    ],
    accent: "#5fd4ff",
  },
  {
    category: "Data & ML",
    items: ["Pandas", "NumPy", "Scikit-Learn", "Spark", "MySQL", "ETL Pipelines", "Data Warehouses"],
    bars: [
      { label: "Data Pipelines", pct: 90 },
      { label: "ML / Analytics", pct: 85 },
      { label: "Big Data (Spark)", pct: 78 },
    ],
    accent: "#d8b4fe",
  },
];

const PROJECTS = [
  {
    num: "01",
    icon: "RAG",
    tags: ["Google Vertex AI", "FastAPI", "Streamlit", "LangChain"],
    title: "Enterprise RAG Assistant on Vertex AI",
    desc: "A full stack RAG app I built for BMW Group. Vertex AI handles retrieval, FastAPI runs the backend, and Streamlit and React share the front end. I spent real time tuning prompts so answers stay accurate instead of confidently wrong.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#5fd4ff",
  },
  {
    num: "02",
    icon: "KG",
    tags: ["GPT-4", "LangChain", "Knowledge Graphs", "Kubernetes"],
    title: "Knowledge Graph RAG for a Cloud TMS",
    desc: "A ReAct agent and knowledge graph retrieval system I built at CREAT GmbH for a cloud transport management platform. Runs on Docker and Kubernetes so it can reason across a large operational dataset without falling over.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#d8b4fe",
  },
  {
    num: "03",
    icon: "DL",
    tags: ["PyTorch", "SqueezeNet", "Docker", "Vertex AI"],
    title: "MLOps Image Classification Pipeline",
    desc: "An end to end pipeline that trains and serves a SqueezeNet image classifier on Google Vertex AI. Dockerized training and inference, built so shipping from notebook to production endpoint does not take a week.",
    link: "https://github.com/Gaurang8200/MLOps_Project_DL",
    linkLabel: "View Repository",
    accent: "#ffb37a",
  },
  {
    num: "04",
    icon: "OPS",
    tags: ["OpenTelemetry", "Kafka", "Prometheus", "Grafana"],
    title: "Sustainable Cloud Diagnostics Toolkit",
    desc: "Python diagnostic tools I built at BMW for fast production triage, backed by OpenTelemetry across Kafka, Prometheus and Grafana. Improved web app stability by about 17 percent and cut manual deployment work by about 36 percent.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#6ee7b7",
  },
];

const EXPERIENCE = [
  {
    num: "01",
    company: "BMW Group",
    role: "Software Developer",
    type: "Full-Time",
    period: "Aug 2024 to Present",
    location: "Munich, Germany",
    accent: "#7dd3fc",
    status: "active",
    description:
      "Full stack work on sustainability focused cloud systems. I ship microservices, build validation environments and keep an eye on the observability that tells us when something is actually wrong.",
    achievements: [
      "Built and deployed Docker based microservices, fixing system wide issues around data consistency, latency and service communication.",
      "Set up cloud based validation environments with REST APIs and internal data pipelines for large scale sustainability testing.",
      "Built Python diagnostic tools for fast triage of production issues. Lifted web app stability by roughly 17 percent.",
      "Automated build, test and deployment with Git based CI/CD workflows, cutting manual release work by around 36 percent.",
      "Instrumented systems with OpenTelemetry across Prometheus, OpenSearch, Kafka and Grafana for faster fault diagnosis.",
      "Analyzed compute inefficiency across cloud services, comparing used versus requested capacity to find optimization opportunities.",
      "Took part in agile delivery with regular code reviews on GitHub and Jira, helping shape architecture decisions.",
    ],
    stack: ["Python", "Go", "TypeScript", "Angular", "Docker", "REST APIs", "OpenTelemetry", "Prometheus", "Kafka", "Grafana", "CI/CD", "GitHub"],
  },
  {
    num: "02",
    company: "CREAT GmbH",
    role: "Software Engineer",
    type: "Full-Time",
    period: "Sep 2023 to Jul 2024",
    location: "Ingolstadt, Germany",
    accent: "#ffb37a",
    status: "past",
    description:
      "Backend systems and ML backed services, built and run on Kubernetes for workloads that needed to behave like production even when they were not quite there yet.",
    achievements: [
      "Built data driven backend systems and ML backed services in Python and Go, wiring structured datasets into scalable apps.",
      "Built and ran containerized microservices with Docker and Kubernetes for distributed data processing.",
      "Designed data pipelines and ETL processes for structured data ingestion and transformation.",
      "Operated platform adjacent services on Kubernetes, focused on stability and reliable operation.",
      "Set up CI/CD with Git and GitLab, cutting manual intervention and recurring deployment failures.",
    ],
    stack: ["Python", "Go", "Docker", "Kubernetes", "ETL Pipelines", "GitLab CI/CD", "REST APIs", "Microservices"],
  },
  {
    num: "03",
    company: "Accenture",
    role: "Software Developer",
    type: "Full-Time",
    period: "Sep 2022 to Aug 2023",
    location: "Ingolstadt, Germany",
    accent: "#d8b4fe",
    status: "past",
    description:
      "Safety critical ADAS validation work. Building the test systems that prove autonomous features actually hold up under pressure.",
    achievements: [
      "Developed and validated ADAS functionality including Emergency Assist systems, focused on safety critical scenarios under ISO 26262.",
      "Built a real world test system to check behavior against safety critical automotive requirements.",
      "Designed scenario based test and validation workflows for edge cases and fault conditions.",
      "Integrated solutions into DevOps and MLOps pipelines on Linux infrastructure, working across test, deployment and monitoring.",
    ],
    stack: ["ADAS", "ISO 26262", "Python", "Linux", "DevOps", "MLOps", "Test Automation"],
  },
];

const EDUCATION = [
  { degree: "M.Eng. Artificial Intelligence", school: "Technische Hochschule Ingolstadt", period: "2024 to 2026" },
  { degree: "B.Eng. Automotive Engineering", school: "Technische Hochschule Ingolstadt", period: "2020 to 2024" },
];

/* ─── SCROLL PROGRESS BAR ────────────────────────────────────── */
function ProgressBar() {
  const [w, setW] = useState(0);
  useEffect(() => {
    const fn = () => setW((window.scrollY / (document.body.scrollHeight - window.innerHeight)) * 100);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);
  return (
    <div className="fixed top-0 left-0 h-[3px] z-[200]" style={{ width: `${w}%`, background: "#5fd4ff" }} />
  );
}

/* ─── NAV ───────────────────────────────────────────────────── */
function Navigation() {
  return (
    <nav className="sticky top-0 z-50 flex items-center justify-between px-6 md:px-10 py-5 bg-[#0b0b12] border-b border-white/10">
      <a href="#" className="flex items-center gap-3">
        <span className="w-10 h-10 rounded-full bg-[#5fd4ff] flex items-center justify-center font-extrabold text-[#0b0b12] text-sm">GM</span>
        <span className="hidden sm:block font-semibold text-white">Gourangkumar</span>
      </a>
      <ul className="hidden md:flex gap-8">
        {["About", "Skills", "Projects", "Experience", "Contact"].map((s) => (
          <li key={s}>
            <a href={`#${s.toLowerCase()}`} className="text-sm font-medium text-white/70 hover:text-white transition-colors">{s}</a>
          </li>
        ))}
      </ul>
      <a href="#contact" className="px-5 py-2.5 rounded-full bg-white text-[#0b0b12] text-sm font-semibold hover:bg-[#5fd4ff] transition-colors">
        Say Hi
      </a>
    </nav>
  );
}

/* ─── COLOR BLOCK WRAPPER ─────────────────────────────────────── */
function Block({ id, bg, dark, className = "", children }: { id?: string; bg: string; dark?: boolean; className?: string; children: React.ReactNode }) {
  const ref = useRef<HTMLElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from(ref.current, {
        opacity: 0, y: 60, duration: 0.9, ease: "power3.out",
        scrollTrigger: { trigger: ref.current, start: "top 88%", toggleActions: "play none none reverse" },
      });
    });
    return () => ctx.revert();
  }, []);
  return (
    <section
      ref={ref}
      id={id}
      className={`relative mx-3 md:mx-6 my-3 md:my-4 rounded-[32px] md:rounded-[48px] px-6 md:px-16 py-16 md:py-24 ${dark ? "text-white" : "text-[#0b0b12]"} ${className}`}
      style={{ background: bg }}
    >
      {children}
    </section>
  );
}

const H2 = ({ children, className = "" }: { children: React.ReactNode; className?: string }) => (
  <h2 className={`font-extrabold leading-[1.02] tracking-tight text-[clamp(2.5rem,6vw,5rem)] mb-8 ${className}`}>
    {children}
  </h2>
);

const Eyebrow = ({ children }: { children: React.ReactNode }) => (
  <p className="text-sm font-bold uppercase tracking-wide mb-4 opacity-60">{children}</p>
);

/* ─── HERO ──────────────────────────────────────────────────── */
function HeroSection() {
  const heroRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ delay: 0.2 });
      tl.from(".hero-eyebrow", { opacity: 0, y: 30, duration: 0.7, ease: "power3.out" })
        .from(".hero-title", { opacity: 0, y: 50, duration: 0.9, ease: "power3.out" }, "-=0.3")
        .from(".hero-desc", { opacity: 0, y: 20, duration: 0.7, ease: "power3.out" }, "-=0.4")
        .from(".hero-btns", { opacity: 0, y: 20, duration: 0.6, ease: "power3.out" }, "-=0.3")
        .from(".hero-badge", { opacity: 0, scale: 0.6, rotate: -20, duration: 0.8, ease: "back.out(1.6)" }, "-=0.6");
    }, heroRef);
    return () => ctx.revert();
  }, []);

  return (
    <div ref={heroRef}>
      <Block id="hero" bg="#5fd4ff" className="!py-20 md:!py-28">
        <div className="hero-eyebrow inline-block px-4 py-1.5 rounded-full bg-[#0b0b12] text-white text-xs font-bold uppercase tracking-wide mb-8">
          Full Stack Developer
        </div>
        <h1 className="hero-title font-extrabold leading-[0.95] tracking-tight text-[clamp(3rem,10vw,7.5rem)] mb-8">
          Gourangkumar<br />Monashara
        </h1>
        <p className="hero-desc text-[clamp(1.1rem,2vw,1.5rem)] font-medium max-w-2xl mb-10">
          I build cloud systems that hold up under real traffic. Python and Go on the backend, TypeScript up front, all wired together with CI/CD and observability so nothing breaks quietly.
        </p>
        <div className="hero-btns flex flex-wrap gap-4">
          <a href="#projects" className="px-7 py-4 rounded-full bg-[#0b0b12] text-white font-semibold hover:-translate-y-0.5 transition-transform">
            See My Work
          </a>
          <a href="#contact" className="px-7 py-4 rounded-full bg-white text-[#0b0b12] font-semibold hover:-translate-y-0.5 transition-transform">
            Say Hello
          </a>
        </div>
        <div className="hero-badge hidden md:flex absolute right-16 top-24 w-32 h-32 rounded-full bg-[#0b0b12] items-center justify-center rotate-6">
          <span className="text-white font-extrabold text-lg leading-tight text-center">BMW<br />Group</span>
        </div>
      </Block>
    </div>
  );
}

/* ─── ABOUT ─────────────────────────────────────────────────── */
function AboutSection() {
  const stats = [
    { n: "3+", label: "Years Experience" },
    { n: "3", label: "Companies" },
    { n: "2", label: "Degrees" },
    { n: "C1", label: "German and English" },
  ];

  return (
    <Block id="about" bg="#d8b4fe">
      <Eyebrow>About Me</Eyebrow>
      <H2>I like systems<br />that just work</H2>
      <div className="grid md:grid-cols-2 gap-12">
        <div className="space-y-5 text-lg font-medium leading-relaxed">
          <p>Three plus years as a full stack developer, building cloud infrastructure that stays stable even when nobody is watching.</p>
          <p>My stack covers the whole picture. TypeScript, Angular and Streamlit on the front end. Python and Go on the back. Microservices, REST APIs and distributed systems tying it all together.</p>
          <p>Right now I am a Software Developer at BMW Group in Munich, building diagnostic tools, CI/CD automation and observability for sustainable cloud infrastructure, while finishing a Master's in Artificial Intelligence at Technische Hochschule Ingolstadt.</p>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {stats.map((s) => (
            <div key={s.label} className="bg-[#0b0b12] text-white rounded-2xl p-6">
              <div className="font-extrabold text-4xl mb-1">{s.n}</div>
              <div className="text-sm font-medium opacity-70">{s.label}</div>
            </div>
          ))}
        </div>
      </div>
    </Block>
  );
}

/* ─── SKILLS ────────────────────────────────────────────────── */
function SkillsSection() {
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.utils.toArray<HTMLElement>(".bar-fill").forEach((bar) => {
        const w = bar.getAttribute("data-w") || "0";
        ScrollTrigger.create({
          trigger: bar, start: "top 90%",
          onEnter: () => gsap.to(bar, { scaleX: parseFloat(w), duration: 1.2, ease: "power3.out" }),
          onLeaveBack: () => gsap.to(bar, { scaleX: 0, duration: 0.4 }),
        });
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <Block id="skills" bg="#ffb37a">
      <Eyebrow>My Stack</Eyebrow>
      <H2>Tools I reach for</H2>
      <div className="grid md:grid-cols-3 gap-5">
        {SKILLS.map((s) => (
          <div key={s.category} className="bg-[#0b0b12] text-white rounded-2xl p-6">
            <div className="font-bold text-lg mb-4">{s.category}</div>
            <div className="flex flex-wrap gap-2 mb-6">
              {s.items.map((item) => (
                <span key={item} className="px-3 py-1 rounded-full text-xs font-medium" style={{ background: `${s.accent}22`, color: s.accent }}>
                  {item}
                </span>
              ))}
            </div>
            <div className="space-y-3">
              {s.bars.map((b) => (
                <div key={b.label}>
                  <div className="flex justify-between text-xs font-medium opacity-70 mb-1">
                    <span>{b.label}</span><span>{b.pct}%</span>
                  </div>
                  <div className="h-2 rounded-full bg-white/10">
                    <div className="bar-fill h-full rounded-full origin-left scale-x-0" data-w={b.pct / 100} style={{ background: s.accent }} />
                  </div>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </Block>
  );
}

/* ─── PROJECT CARD ──────────────────────────────────────────── */
function ProjectCard({ p }: { p: typeof PROJECTS[0] }) {
  const cardRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const card = cardRef.current;
    if (!card || window.matchMedia("(max-width: 768px)").matches) return;
    const onMove = (e: MouseEvent) => {
      const r = card.getBoundingClientRect();
      const xPct = (e.clientX - r.left) / r.width - 0.5;
      const yPct = (e.clientY - r.top) / r.height - 0.5;
      gsap.to(card, { rotateY: xPct * 8, rotateX: yPct * -8, duration: 0.4, ease: "power2.out", transformPerspective: 1000 });
    };
    const onLeave = () => gsap.to(card, { rotateY: 0, rotateX: 0, duration: 0.7, ease: "power2.out" });
    card.addEventListener("mousemove", onMove);
    card.addEventListener("mouseleave", onLeave);
    return () => {
      card.removeEventListener("mousemove", onMove);
      card.removeEventListener("mouseleave", onLeave);
    };
  }, []);

  return (
    <div ref={cardRef} className="bg-[#0b0b12] text-white rounded-2xl p-7" style={{ transformStyle: "preserve-3d" }}>
      <div className="flex items-center justify-between mb-5">
        <span className="font-extrabold text-3xl opacity-15">{p.icon}</span>
        <span className="text-xs font-bold opacity-40">{p.num}</span>
      </div>
      <div className="flex flex-wrap gap-2 mb-4">
        {p.tags.map((t) => (
          <span key={t} className="px-2.5 py-1 rounded-full text-xs font-medium" style={{ background: `${p.accent}22`, color: p.accent }}>{t}</span>
        ))}
      </div>
      <h3 className="font-bold text-xl mb-3">{p.title}</h3>
      <p className="text-sm opacity-70 leading-relaxed mb-5">{p.desc}</p>
      <a href={p.link} target={p.link.startsWith("http") ? "_blank" : undefined} rel="noreferrer"
        className="inline-flex items-center gap-2 text-sm font-semibold hover:gap-3 transition-all" style={{ color: p.accent }}>
        {p.linkLabel}
        <svg className="w-4 h-4" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
          <path d="M7 17L17 7M7 7h10v10" />
        </svg>
      </a>
    </div>
  );
}

/* ─── PROJECTS ──────────────────────────────────────────────── */
function ProjectsSection() {
  return (
    <Block id="projects" bg="#fdf6ec">
      <Eyebrow>Selected Work</Eyebrow>
      <H2>Some things I have built</H2>
      <div className="grid md:grid-cols-2 gap-5">
        {PROJECTS.map((p) => <ProjectCard key={p.num} p={p} />)}
      </div>
    </Block>
  );
}

/* ─── EXPERIENCE STACK CARD ───────────────────────────────────── */
function ExperienceStackCard({ exp, index }: { exp: typeof EXPERIENCE[0]; index: number }) {
  const [expanded, setExpanded] = useState(false);
  const visibleAch = expanded ? exp.achievements : exp.achievements.slice(0, 3);
  const hiddenCount = exp.achievements.length - 3;

  return (
    <div className="sticky" style={{ top: `${88 + index * 32}px`, zIndex: index + 1 }}>
      <div className="rounded-[32px] p-8 md:p-12 shadow-2xl" style={{ background: exp.accent, color: "#0b0b12" }}>
        <div className="flex items-center justify-between mb-8 flex-wrap gap-3">
          <span className="text-xs font-bold uppercase tracking-wide opacity-60">{exp.period}</span>
          {exp.status === "active" && (
            <span className="px-3 py-1 rounded-full bg-[#0b0b12] text-white text-xs font-bold uppercase">Current Role</span>
          )}
        </div>

        <div className="grid md:grid-cols-[1fr_1.6fr] gap-8 md:gap-12">
          <div>
            <h3 className="font-extrabold text-[clamp(2rem,4vw,3rem)] leading-[0.95] mb-3">{exp.company}</h3>
            <p className="font-semibold text-lg mb-1">{exp.role}</p>
            <p className="text-sm font-medium opacity-70">{exp.type}</p>
            <p className="text-sm font-medium opacity-70 mt-1">{exp.location}</p>
          </div>

          <div>
            <p className="font-medium leading-relaxed mb-6">{exp.description}</p>
            <div className="space-y-2.5 mb-4">
              {visibleAch.map((a, i) => (
                <div key={i} className="flex gap-3 text-sm leading-relaxed">
                  <span className="mt-2 w-1.5 h-1.5 rounded-full bg-[#0b0b12] flex-shrink-0" />
                  <span>{a}</span>
                </div>
              ))}
            </div>
            {hiddenCount > 0 && (
              <button onClick={() => setExpanded(!expanded)} className="text-sm font-bold underline mb-6">
                {expanded ? "Show less" : `Show ${hiddenCount} more`}
              </button>
            )}
            <div className="flex flex-wrap gap-2 mt-4">
              {exp.stack.map((t) => (
                <span key={t} className="px-3 py-1 rounded-full bg-[#0b0b12]/10 text-xs font-semibold">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

/* ─── EXPERIENCE ──────────────────────────────────────────────── */
function ExperienceSection() {
  const stats = [
    { n: "3+", label: "Years Experience" },
    { n: "3", label: "Companies" },
    { n: "2", label: "Degrees" },
    { n: "C1", label: "German and English" },
  ];

  return (
    <Block id="experience" bg="#0b0b12" dark className="!px-4 md:!px-10">
      <div className="px-2 md:px-6">
        <Eyebrow>Where I Have Worked</Eyebrow>
        <H2>Three years,<br />three companies</H2>
        <p className="text-lg font-medium opacity-70 max-w-2xl mb-14">
          From safety critical ADAS validation at Accenture to sustainable cloud infrastructure at BMW Group.
        </p>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-24">
          {stats.map((s) => (
            <div key={s.label} className="bg-white/5 rounded-2xl p-6">
              <div className="font-extrabold text-4xl mb-1">{s.n}</div>
              <div className="text-xs font-medium opacity-60 uppercase tracking-wide">{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      <div className="relative space-y-10 pb-10">
        {EXPERIENCE.map((exp, i) => (
          <ExperienceStackCard key={exp.num} exp={exp} index={i} />
        ))}
      </div>

      <div className="px-2 md:px-6 mt-16">
        <div className="flex items-center gap-3 mb-8">
          <span className="text-sm font-bold uppercase tracking-wide opacity-60">Education</span>
        </div>
        <div className="grid sm:grid-cols-2 gap-4 mb-16">
          {EDUCATION.map((edu) => (
            <div key={edu.degree} className="bg-white/5 rounded-2xl p-6">
              <div className="text-xs font-bold uppercase tracking-wide opacity-50 mb-2">{edu.period}</div>
              <div className="font-semibold mb-1">{edu.degree}</div>
              <div className="text-sm opacity-60">{edu.school}</div>
            </div>
          ))}
        </div>

        <div className="text-center">
          <p className="text-sm font-medium opacity-60 mb-4">Open to new opportunities from July 2026</p>
          <a href="#contact" className="inline-flex items-center gap-2 px-7 py-4 rounded-full bg-white text-[#0b0b12] font-semibold hover:-translate-y-0.5 transition-transform">
            Let's Build Together
          </a>
        </div>
      </div>
    </Block>
  );
}

/* ─── CONTACT ───────────────────────────────────────────────── */
function ContactSection() {
  return (
    <Block id="contact" bg="#ff8fa3" className="text-center">
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

/* ─── ROOT ───────────────────────────────────────────────────── */
export default function Index() {
  return (
    <div className="relative bg-[#0b0b12] text-white overflow-x-hidden">
      <ProgressBar />
      <Navigation />

      <main>
        <HeroSection />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ExperienceSection />
        <ContactSection />
      </main>

      <footer className="py-8 text-center">
        <p className="text-xs font-medium opacity-40">
          2026 Gourangkumar N Monashara. Full Stack and Cloud Systems Engineer based in Berlin, Germany.
        </p>
      </footer>
    </div>
  );
}
