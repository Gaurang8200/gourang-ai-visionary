import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Eye, Cpu, Car, Zap, Database, Cloud, Sparkles, GitBranch, Container, AppWindow } from "lucide-react";
import { useMousePosition } from "@/hooks/useMouseParallax";

const Skills = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);
  const { smoothPosition } = useMousePosition();

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
        }
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const skillCategories = [
    {
      title: "Programming",
      icon: Code,
      skills: ["Python", "JAVA", "C", "C++", "R", "React"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "AI & ML Frameworks",
      icon: Brain,
      skills: ["Pytorch", "TensorFlow", "Scikit Learn", "LangChain", "LangGraph", "GPT"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Data & Cloud",
      icon: Cloud,
      skills: ["AWS S3", "Azure", "Google Vertex", "Sagemaker", "BigData", "Spark"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Agentic AI",
      icon: Sparkles,
      skills: ["AI Agents", "RAG", "N8N", "Claude Opus", "Cursor", "Codex"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "DevOps & MLOps",
      icon: Zap,
      skills: ["Docker", "Kubernetes", "CI/CD", "MLOps", "DevOps", "Jupyter"],
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "Version Control",
      icon: GitBranch,
      skills: ["Git", "GitHub", "GitLab", "MS Office", "SAP 4/HANA"],
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section 
      id="skills" 
      className="relative py-32 px-6 bg-secondary/10"
      ref={sectionRef}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-10 left-1/4 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
            <path d="M50 10 L90 30 L90 70 L50 90 L10 70 L10 30 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-500"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" className="text-purple-500"/>
          </svg>
        </div>
        <div className="absolute top-20 right-1/3 w-28 h-28 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float-reverse" style={{animationDelay: '1.5s'}}>
            <rect x="20" y="20" width="60" height="60" rx="10" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"/>
            <rect x="30" y="30" width="40" height="40" rx="5" fill="none" stroke="currentColor" className="text-cyan-400"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/3 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float" style={{animationDelay: '0.5s'}}>
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-500"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-400"/>
          </svg>
        </div>
        <div className="absolute bottom-10 right-20 w-36 h-36 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float-reverse" style={{animationDelay: '2s'}}>
            <path d="M20 80 L50 20 L80 80" fill="none" stroke="currentColor" strokeWidth="2" className="text-green-500"/>
            <circle cx="50" cy="50" r="10" fill="currentColor" className="text-cyan-400"/>
          </svg>
        </div>
      </div>

      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      {/* Parallax glow */}
      <div className="absolute pointer-events-none">
        <div 
          className="absolute w-[300px] h-[300px] rounded-full bg-cyan-500/5 blur-3xl top-20 left-0"
          style={{
            transform: `translate(${smoothPosition.x * 15}px, ${smoothPosition.y * 15}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
      </div>

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-title-glow">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies I use to build intelligent solutions
          </p>
        </div>

        {/* Skills grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCategories.map((category, index) => (
            <div
              key={category.title}
              className={`group glass-card p-6 rounded-xl interactive-card transition-all duration-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
              }`}
              style={{ 
                animationDelay: `${index * 100}ms`,
                transform: `perspective(1000px) translateZ(${smoothPosition.y * (index % 2 === 0 ? 10 : -10)}px)`,
                transition: "transform 0.3s ease-out, box-shadow 0.3s ease-out",
              }}
            >
              <div 
                className={`absolute inset-0 rounded-xl opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-br ${category.color} -z-10`}
                style={{ filter: "blur(20px)", opacity: 0.2 }}
              />

              <div className="relative z-10">
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 rounded-lg bg-gradient-to-br ${category.color} flex items-center justify-center mr-3 group-hover:scale-110 transition-transform`}>
                    <category.icon className="w-5 h-5 text-white" />
                  </div>
                  <h3 className="text-lg font-semibold">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-muted/30 text-foreground/80 hover:bg-muted/50 hover:text-foreground transition-all cursor-pointer"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Additional skills */}
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground mb-6">
            Additional Expertise
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["Agile Methodology (Jira)", "Business intelligence", "Forecasting", "Predictive Analytics", "NLP", "Computer Vision"].map((tech) => (
              <span 
                key={tech}
                className="px-3 py-1 text-sm rounded-full border border-border/50 text-muted-foreground/60 hover:text-cyan-400 hover:border-cyan-400/50 transition-colors cursor-pointer"
              >
                {tech}
              </span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;