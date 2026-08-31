export const SKILLS = [
  {
    num: "01",
    title: "Software Development",
    blurb: "Python and Go on the backend, TypeScript and React up front, wired together with REST APIs, WebSockets and microservices that hold up under real traffic.",
    tags: ["Python", "Go", "Java", "JavaScript", "TypeScript", "R", "Kotlin", "Bash", "CSS", "HTML", "React", "Vue.js", "Next.js", "Node.js", "FastAPI", "REST APIs", "WebSockets", "Microservices", "Distributed Systems"],
  },
  {
    num: "02",
    title: "Cloud & DevOps",
    blurb: "Docker and Kubernetes for deployment, AWS and Azure underneath, Git based CI/CD that ships without drama, and observability that catches problems before users do.",
    tags: ["AWS (S3, SageMaker)", "Azure", "Linux", "Docker", "Kubernetes", "GitLab", "CI/CD", "MLOps", "Jira", "OpenTelemetry", "Prometheus", "Grafana"],
  },
  {
    num: "03",
    title: "Agentic AI & LLMs",
    blurb: "LangChain and LangGraph for agent workflows, RAG systems that stay grounded, Claude Code and Copilot in the daily loop.",
    tags: ["LangChain", "LangGraph", "RAG", "Claude Code", "GitHub Copilot", "OpenCode"],
  },
  {
    num: "04",
    title: "Data & Machine Learning",
    blurb: "Pandas and Scikit-Learn for analysis, Spark for the bigger jobs, ETL pipelines that keep the data warehouse honest across PostgreSQL and MySQL.",
    tags: ["Pandas", "NumPy", "Scikit-Learn", "Apache Spark", "PostgreSQL", "MySQL", "Schema Tables", "ETL Pipelines", "Data Warehouses", "Excel"],
  },
  {
    num: "05",
    title: "Business & SAP",
    blurb: "Enterprise financial systems from the accounting side: SAP S/4HANA and BTP, HANA Cloud, and EU Taxonomy sustainability reporting.",
    tags: ["SAP S/4HANA FI/GL", "SAP BTP", "SAP HANA Cloud", "EU Taxonomy", "Financial Accounting"],
  },
  {
    num: "06",
    title: "Process Engineering",
    blurb: "Manufacturing discipline from my engineering roots: OEE and root cause analysis, Six Sigma and Lean methods for finding and clearing bottlenecks.",
    tags: ["OEE", "Root Cause Analysis", "Six Sigma", "Lean", "Kaizen", "TQM", "Bottleneck Analysis", "Process Capability"],
  },
];

export const PROJECTS = [
  {
    num: "01",
    icon: "RAG",
    tags: ["Google Vertex AI", "FastAPI", "Streamlit", "LangChain"],
    title: "Enterprise RAG Assistant on Vertex AI",
    desc: "An end to end RAG app I built for BMW Group. Vertex AI handles retrieval, FastAPI runs the backend, and Streamlit and React share the front end. I spent real time tuning prompts so answers stay accurate instead of confidently wrong.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#7c8cf0",
  },
  {
    num: "02",
    icon: "KG",
    tags: ["GPT-4", "LangChain", "Knowledge Graphs", "Kubernetes"],
    title: "Knowledge Graph RAG for a Cloud TMS",
    desc: "A ReAct agent and knowledge graph retrieval system I built at CREAT GmbH for a cloud transport management platform. Runs on Docker and Kubernetes so it can reason across a large operational dataset without falling over.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#8b93f0",
  },
  {
    num: "03",
    icon: "DL",
    tags: ["PyTorch", "SqueezeNet", "Docker", "Vertex AI"],
    title: "MLOps Image Classification Pipeline",
    desc: "An end to end pipeline that trains and serves a SqueezeNet image classifier on Google Vertex AI. Dockerized training and inference, built so shipping from notebook to production endpoint does not take a week.",
    link: "https://github.com/Gaurang8200/MLOps_Project_DL",
    linkLabel: "View Repository",
    accent: "#f2b544",
  },
  {
    num: "04",
    icon: "OPS",
    tags: ["OpenTelemetry", "Kafka", "Prometheus", "Grafana"],
    title: "Sustainable Cloud Diagnostics Toolkit",
    desc: "Python diagnostic tools I built at BMW for fast production triage, backed by OpenTelemetry across Kafka, Prometheus and Grafana. Improved web app stability by about 17 percent and cut manual deployment work by about 36 percent.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#2f9e6b",
  },
  {
    num: "05",
    icon: "ADV",
    tags: ["LangGraph", "ReAct", "Reflexion", "TDD"],
    title: "Builder vs. Breaker: Adversarial Agentic Pipeline",
    desc: "A LangGraph style workflow where Builder, Breaker, Referee and supervisor agents argue it out. ReAct and Reflexion drive the reasoning, critique loops and test driven iteration keep the output honest.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#7c8cf0",
  },
  {
    num: "06",
    icon: "OPS",
    tags: ["Multi-Agent", "OpenTelemetry", "SQLite", "Docker", "Helm"],
    title: "AgentOps: Observable Multi-Agent Research Pipeline",
    desc: "A production minded agent workflow with a deterministic mock mode for testing, hash chained SQLite audit logs, OpenTelemetry spans and CI smoke tests wired into Docker and Helm deployments.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#8b93f0",
  },
  {
    num: "07",
    icon: "CV",
    tags: ["Vertex AI", "PyTorch", "TorchServe", "Streamlit"],
    title: "Cloud MLOps: Intel Image Classification Pipeline",
    desc: "A full 6 class AI lifecycle on Vertex AI: GCS ingestion, human annotation, PyTorch training, TorchServe packaging, endpoint deployment and a Streamlit app for live inference.",
    link: "#",
    linkLabel: "Case Study",
    accent: "#f2b544",
  },
];

export const CERTIFICATIONS = [
  { title: "Generative AI Hub in SAP AI Core", issuer: "SAP", year: "2026" },
  { title: "IBM RAG and Agentic AI Professional Certificate", issuer: "IBM", year: "2025" },
  { title: "Generative AI with Large Language Models", issuer: "DeepLearning.AI", year: "2024" },
  { title: "Machine Learning Specialisation", issuer: "DeepLearning.AI", year: "2024" },
];

export const LANGUAGES = [
  {
    name: "English",
    level: "Native level",
    note: "Effectively a mother tongue. Educated in English from kindergarten all the way through Abitur.",
  },
  {
    name: "German",
    level: "C1",
    note: "German language school in Berlin, Feb 2019 to Jul 2020. C1 certificate and TestDaF C1. Bachelor studied in German.",
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
    accent: "#7c8cf0",
    status: "active",
    description:
      "AI and backend work inside vehicle testing. I turned a decades-old manual reporting process into a central data platform, then put an agent on top so engineers ask it questions instead of writing SQL.",
    achievements: [
      "Built a RAG agent with LangChain and LangGraph over PostgreSQL data, reaching 96 percent answer accuracy so engineers query technical vehicle data without hand-written SQL.",
      "Built the backend and database layer for roughly 10 million MF4 measurement files in Python, SQL and PostgreSQL, exposing structured vehicle data to web applications.",
      "Digitized a 40 year old Excel and PowerPoint reporting process into a TBS server application, making vehicle test data centrally available to test engineers for the first time.",
      "Developed REST interfaces between the web app, backend and PostgreSQL, cutting the manual steps needed to reach technical vehicle data.",
      "Automated development, test and deployment with Docker, GitHub, GitLab, GitHub Copilot and CI/CD workflows driven by Claude agents, keeping releases reproducible.",
      "Improved the stability of an internal BMW application by about 17 percent through Python based analysis and fixes across data flows and backend processes.",
      "Translated business requirements into technical features, aligning data models, interfaces and software changes across several BMW teams with regular GitHub and Jira code reviews.",
    ],
    stack: ["Python", "SQL", "PostgreSQL", "LangChain", "LangGraph", "RAG", "Docker", "GitHub", "GitLab", "CI/CD", "REST APIs", "Claude Agents"],
  },
  {
    num: "02",
    company: "CREAT GmbH",
    role: "Software Engineer",
    type: "Full-Time",
    period: "Sep 2023 to Jul 2024",
    location: "Ingolstadt, Germany",
    accent: "#f2b544",
    status: "past",
    description:
      "Backend and data engineering in Python and Go. I built the services and pipelines that moved data heavy workloads onto Kubernetes and kept them running at scale.",
    achievements: [
      "Built backend services in Python and Go, wiring REST APIs, SQL databases and ETL pipelines into data intensive applications.",
      "Built and operated containerized microservices with Docker and Kubernetes for distributed processing and scalable workflows.",
      "Designed data pipelines and complex ETL processes, moving up to 20 million records through automation and cutting manual data preparation by 67 percent.",
    ],
    stack: ["Python", "Go", "REST APIs", "SQL", "Docker", "Kubernetes", "ETL Pipelines", "Microservices"],
  },
  {
    num: "03",
    company: "Accenture",
    role: "Software Developer",
    type: "Full-Time",
    period: "Sep 2022 to Aug 2023",
    location: "Ingolstadt, Germany",
    accent: "#8b93f0",
    status: "past",
    description:
      "Safety critical software validation. Building the test systems that prove complex features actually hold up under pressure.",
    achievements: [
      "Developed and validated safety critical software functions, focused on high risk scenarios and strict quality standards.",
      "Built a real world test system to check behavior against safety critical requirements.",
      "Designed scenario based test and validation workflows for edge cases and fault conditions.",
      "Integrated solutions into DevOps and MLOps pipelines on Linux infrastructure, working across test, deployment and monitoring.",
    ],
    stack: ["Python", "Linux", "DevOps", "MLOps", "Test Automation", "CI/CD"],
  },
];

export const EDUCATION = [
  { degree: "M.Eng. Artificial Intelligence", school: "Technische Hochschule Ingolstadt", period: "2024 to 2026" },
  { degree: "B.Eng. Automotive Engineering", school: "Technische Hochschule Ingolstadt", period: "2020 to 2024" },
];
