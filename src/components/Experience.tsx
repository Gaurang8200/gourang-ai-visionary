import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, ArrowRight, Briefcase, GraduationCap, Cpu, Sparkles } from "lucide-react";

const Experience = () => {
  const [isInView, setIsInView] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

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

  const experiences = [
    {
      type: "work",
      company: "BMW Group",
      position: "AI Engineer – Full Stack & Data",
      duration: "Aug 2025 - Present",
      location: "Munich, Germany",
      description: "Designing and developing AI agents and ML solutions for automotive applications.",
      responsibilities: [
        "Designed AI agents workflows using LangChain, LangGraph, ReAct reasoning",
        "Built full stack AI apps with FastAPI, Streamlit/React",
        "Containerized ML/LLM components with Docker",
        "Developed forecasting models with Pandas and Scikit Learn",
        "Built RAG application on Google Vertex AI",
        "Tuned LLM prompts to reduce hallucinations",
      ],
      technologies: ["LangChain", "LangGraph", "GPT-4", "FastAPI", "Docker", "Python", "React", "Google Vertex"]
    },
    {
      type: "work",
      company: "CREAT GmbH",
      position: "Software & Data Engineer",
      duration: "Sep 2023 - Jul 2025",
      location: "Ingolstadt, Germany",
      description: "LLM and RAG-based automation systems development.",
      responsibilities: [
        "Developed RAG systems with GPT-4, LangChain, FastAPI",
        "Implemented containerized microservices with Docker/K8s",
        "Built knowledge graph-based agents",
        "End-to-end AI pipeline development",
        "CI/CD integration with TensorFlow & PyTorch",
      ],
      technologies: ["LangChain", "GPT-4", "FastAPI", "Docker", "Kubernetes", "TensorFlow", "PyTorch"]
    },
    {
      type: "work",
      company: "LAB - THI",
      position: "AI Research Assistant",
      duration: "Nov 2023 - Aug 2024",
      location: "Ingolstadt, Germany",
      description: "Research in agentic AI systems for autonomous decision making.",
      responsibilities: [
        "Research on agentic AI systems",
        "Multi-agent behavior planning",
        "Integration in MLOps pipelines",
      ],
      technologies: ["Python", "MLOps", "AI Agents"]
    }
  ];

  const education = [
    {
      type: "education",
      company: "Masters in Artificial Intelligence",
      position: "Technische Hochschule Ingolstadt",
      duration: "2025 - 2026",
      location: "Ingolstadt, Germany",
      description: "Specialized in AI and Machine Learning",
      technologies: ["Deep Learning", "NLP", "Computer Vision"]
    },
    {
      type: "education",
      company: "Bachelor of Engineering in Fahrzeugtechnik",
      position: "Technische Hochschule Ingolstadt",
      duration: "2020 - 2025",
      location: "Ingolstadt, Germany",
      description: "Automotive Engineering",
      technologies: ["Vehicle Technology", "Automotive Systems"]
    }
  ];

  return (
    <section 
      id="experience" 
      className="relative py-32 px-6 bg-secondary/10 overflow-hidden"
      ref={sectionRef}
    >
      {/* 3D Background - Floating AI/Car elements */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-500"/>
            <circle cx="50" cy="50" r="25" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-500"/>
            <circle cx="50" cy="50" r="10" fill="currentColor" className="text-cyan-400"/>
          </svg>
        </div>
        <div className="absolute top-40 right-20 w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float-reverse">
            <rect x="20" y="30" width="60" height="40" rx="5" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"/>
            <circle cx="35" cy="70" r="8" fill="none" stroke="currentColor" className="text-cyan-500"/>
            <circle cx="65" cy="70" r="8" fill="none" stroke="currentColor" className="text-cyan-500"/>
          </svg>
        </div>
        <div className="absolute bottom-20 left-1/4 w-24 h-24 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float" style={{animationDelay: '1s'}}>
            <path d="M20 60 L50 30 L80 60 L65 60 L65 80 L35 80 L35 60 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500"/>
          </svg>
        </div>
        <div className="absolute bottom-40 right-1/3 w-28 h-28 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float-reverse" style={{animationDelay: '0.5s'}}>
            <circle cx="50" cy="50" r="30" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-500"/>
            <circle cx="50" cy="50" r="15" fill="none" stroke="currentColor" strokeWidth="1" className="text-cyan-400"/>
          </svg>
        </div>
      </div>

      {/* Background gradient */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      {/* Train track line */}
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent -translate-y-1/2" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div 
          className={`text-center mb-20 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-title-glow">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From student to AI Engineer - Building the future with intelligent systems
          </p>
        </div>

        {/* Work Experience */}
        <div className="mb-16">
          <h3 className={`text-2xl font-bold mb-8 text-center transition-all duration-700 delay-200 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}>
            <Briefcase className="inline w-6 h-6 mr-2 text-cyan-400" />
            <span className="gradient-text">Work Experience</span>
          </h3>
          
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyan-500/30 -translate-y-1/2" />
            
            {[0, 1, 2].map((i) => (
              <div 
                key={i}
                className="absolute top-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-background -translate-y-1/2"
                style={{ 
                  left: `${20 + i * 30}%`,
                  boxShadow: "0 0 20px hsl(180 100% 50% / 0.5)"
                }}
              />
            ))}

            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div 
                  className={`w-full md:w-5/12 transition-all duration-1000 ${
                    isInView 
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                        ? "opacity-0 -translate-x-32"
                        : "opacity-0 translate-x-32"
                  }`}
                  style={{ 
                    animationDelay: `${index * 300}ms`
                  }}
                >
                  <div 
                    className={`glass-card p-6 rounded-2xl interactive-card relative ${
                      index % 2 === 0 ? 'mr-8' : 'ml-8'
                    }`}
                    style={{
                      transform: `perspective(1000px) rotateY(${index % 2 === 0 ? -5 : 5}deg)`,
                    }}
                  >
                    <div className="absolute top-1/2 w-8 h-0.5 bg-cyan-500/50" 
                      style={index % 2 === 0 ? { right: 0, transform: 'translateX(100%)' } : { left: 0, transform: 'translateX(-100%)' }} 
                    />
                    
                    <div className="flex items-start justify-between mb-3">
                      <Cpu className="w-5 h-5 text-cyan-400" />
                      <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-400/50">
                        {index === 0 ? "Current" : "Past"}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold gradient-text mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-foreground font-medium mb-2 flex items-center gap-1">
                      {exp.company} <ArrowRight className="w-3 h-3" />
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {exp.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {exp.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm mb-3 leading-relaxed">
                      {exp.description}
                    </p>

                    <div className="mb-3">
                      <ul className="space-y-1">
                        {exp.responsibilities.slice(0, 4).map((resp, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/30">
                      {exp.technologies.slice(0, 6).map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-xs bg-muted/30"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Education */}
        <div>
          <h3 className={`text-2xl font-bold mb-8 text-center transition-all duration-700 delay-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}>
            <GraduationCap className="inline w-6 h-6 mr-2 text-purple-400" />
            <span className="gradient-text-alt">Education</span>
          </h3>
          
          <div className="relative">
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-purple-500/30 -translate-y-1/2" />
            
            {[0, 1].map((i) => (
              <div 
                key={i}
                className="absolute top-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 background -translate-y-1/2"
                style={{ 
                  left: `${30 + i * 40}%`,
                  boxShadow: "0 0 20px hsl(280 100% 50% / 0.5)"
                }}
              />
            ))}

            {education.map((edu, index) => (
              <div
                key={edu.company}
                className={`relative flex items-center mb-12 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div 
                  className={`w-full md:w-5/12 transition-all duration-1000 ${
                    isInView 
                      ? "opacity-100 translate-x-0"
                      : index % 2 === 0
                        ? "opacity-0 -translate-x-32"
                        : "opacity-0 translate-x-32"
                  }`}
                  style={{ 
                    animationDelay: `${(index + 3) * 300}ms`
                  }}
                >
                  <div 
                    className={`glass-card p-6 rounded-2xl interactive-card ${
                      index % 2 === 0 ? 'mr-8' : 'ml-8'
                    }`}
                    style={{
                      transform: `perspective(1000px) rotateY(${index % 2 === 0 ? -5 : 5}deg)`,
                    }}
                  >
                    <div className="absolute top-1/2 w-8 h-0.5 bg-purple-500/50" 
                      style={index % 2 === 0 ? { right: 0, transform: 'translateX(100%)' } : { left: 0, transform: 'translateX(-100%)' }} 
                    />
                    
                    <div className="flex items-start justify-between mb-3">
                      <GraduationCap className="w-5 h-5 text-purple-400" />
                    </div>

                    <h3 className="text-lg font-bold gradient-text-alt mb-1">
                      {edu.company}
                    </h3>
                    <p className="text-foreground font-medium mb-2">
                      {edu.position}
                    </p>

                    <div className="flex flex-wrap gap-3 text-sm text-muted-foreground mb-3">
                      <span className="flex items-center gap-1">
                        <Calendar className="w-3 h-3" />
                        {edu.duration}
                      </span>
                      <span className="flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {edu.location}
                      </span>
                    </div>

                    <p className="text-muted-foreground text-sm leading-relaxed">
                      {edu.description}
                    </p>

                    <div className="flex flex-wrap gap-1.5 mt-3 pt-3 border-t border-border/30">
                      {edu.technologies.map((tech) => (
                        <Badge 
                          key={tech} 
                          variant="secondary" 
                          className="text-xs bg-purple-500/20"
                        >
                          {tech}
                        </Badge>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Experience;