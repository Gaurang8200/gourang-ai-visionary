export const SKILLS = [
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

export const PROJECTS = [
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

export const EXPERIENCE = [
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

export const EDUCATION = [
  { degree: "M.Eng. Artificial Intelligence", school: "Technische Hochschule Ingolstadt", period: "2024 to 2026" },
  { degree: "B.Eng. Automotive Engineering", school: "Technische Hochschule Ingolstadt", period: "2020 to 2024" },
];
