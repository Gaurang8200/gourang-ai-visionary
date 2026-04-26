import { useEffect, useRef, useState } from "react";
import { Brain, Cpu, Eye, Rocket, Sparkles, MapPin, Calendar, Mail, Phone } from "lucide-react";
import { useMousePosition } from "@/hooks/useMouseParallax";

const About = () => {
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
      { threshold: 0.2 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const highlights = [
    {
      icon: Brain,
      title: "Agentic AI",
      description: "Building AI agents with LangChain and LangGraph",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: Cpu,
      title: "Full Stack AI",
      description: "End-to-end AI applications development",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
    },
    {
      icon: Eye,
      title: "Computer Vision",
      description: "Advanced vision systems for automotive",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Rocket,
      title: "MLOps",
      description: "Production-ready AI deployments",
      color: "text-pink-400",
      bgColor: "bg-pink-500/20",
    },
  ];

  return (
    <section 
      id="about" 
      className="relative py-32 px-6 overflow-hidden"
      ref={sectionRef}
    >
      {/* 3D Background */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        <div className="absolute top-20 left-10 w-40 h-40 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float">
            <circle cx="50" cy="50" r="35" fill="none" stroke="currentColor" strokeWidth="2" className="text-cyan-500"/>
            <circle cx="50" cy="50" r="20" fill="none" stroke="currentColor" strokeWidth="1" className="text-purple-500"/>
            <circle cx="50" cy="50" r="8" fill="currentColor" className="text-cyan-400"/>
          </svg>
        </div>
        <div className="absolute top-30 right-20 w-36 h-36 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float-reverse" style={{animationDelay: '1s'}}>
            <rect x="15" y="25" width="70" height="50" rx="8" fill="none" stroke="currentColor" strokeWidth="2" className="text-blue-500"/>
            <circle cx="35" cy="75" r="8" fill="none" stroke="currentColor" className="text-cyan-500"/>
            <circle cx="65" cy="75" r="8" fill="none" stroke="currentColor" className="text-cyan-500"/>
          </svg>
        </div>
        <div className="absolute bottom-30 left-1/4 w-28 h-28 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float" style={{animationDelay: '0.5s'}}>
            <path d="M50 15 L85 85 L50 70 L15 85 Z" fill="none" stroke="currentColor" strokeWidth="2" className="text-pink-500"/>
          </svg>
        </div>
        <div className="absolute bottom-20 right-1/4 w-32 h-32 opacity-10">
          <svg viewBox="0 0 100 100" className="w-full h-full animate-float-reverse" style={{animationDelay: '1.5s'}}>
            <circle cx="50" cy="50" r="40" fill="none" stroke="currentColor" strokeWidth="2" className="text-purple-500"/>
            <path d="M25 50 L50 25 L75 50 L50 75 Z" fill="none" stroke="currentColor" className="text-cyan-400"/>
          </svg>
        </div>
      </div>

      {/* Background effects */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      {/* Parallax orbs */}
      <div className="absolute pointer-events-none">
        <div 
          className="absolute w-[500px] h-[500px] rounded-full bg-cyan-500/5 blur-3xl -top-40 -left-40"
          style={{
            transform: `translate(${smoothPosition.x * -20}px, ${smoothPosition.y * -20}px)`,
            transition: "transform 0.4s ease-out",
          }}
        />
        <div 
          className="absolute w-[400px] h-[400px] rounded-full bg-purple-500/5 blur-3xl -bottom-40 -right-40"
          style={{
            transform: `translate(${smoothPosition.x * 20}px, ${smoothPosition.y * 20}px)`,
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
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            AI Engineer passionate about building intelligent solutions
          </p>
        </div>

        {/* Main content */}
        <div 
          className={`grid md:grid-cols-2 gap-8 lg:gap-12 transition-all duration-700 delay-200 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-16"
          }`}
        >
          {/* Left - Bio card */}
          <div className="relative group">
            <div 
              className="glass-card p-8 lg:p-10 rounded-2xl interactive-card h-full"
              style={{
                transform: `perspective(1000px) rotateY(${smoothPosition.x * 2}deg) rotateX(${-smoothPosition.y * 2}deg)`,
                transition: "transform 0.3s ease-out",
              }}
            >
              <div className="relative z-10">
                <h3 className="text-2xl font-semibold mb-6 gradient-text">
                  AI Engineer & Full Stack Developer
                </h3>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    With 3+ years of global experience as an Agentic AI and Full Stack Engineer, 
                    I develop and deploy ML and AI solutions for real-world applications 
                    across Business, cloud-based, and customer domains.
                  </p>
                  <p>
                    Currently working at BMW Group in Munich, designing AI agent workflows 
                    and building full-stack AI applications. Previously at CREAT GmbH 
                    and THI AI LAB.
                  </p>
                  <p>
                    Based in Ingolstadt, Germany. Open to relocation in Germany. 
                    Available from July 2026.
                  </p>
                </div>

                {/* Quick info */}
                <div className="grid grid-cols-2 gap-4 mt-8 pt-6 border-t border-border/50">
                  <div className="flex items-center gap-2">
                    <MapPin className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm">Ingolstadt, Germany</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm">Available: July 2026</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Mail className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm">monashragaurang6@gmail.com</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Phone className="w-4 h-4 text-cyan-400" />
                    <span className="text-sm">+49 17657713152</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Highlights */}
          <div className="grid grid-cols-2 gap-4">
            {highlights.map((item, index) => (
              <div
                key={item.title}
                className={`glass-card p-6 rounded-xl interactive-card transition-all duration-500 ${
                  isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
                }`}
                style={{ 
                  animationDelay: `${300 + index * 100}ms`,
                  transform: `perspective(1000px) translateZ(${smoothPosition.y * 10 * (index % 2 === 0 ? 1 : -1)}px)`,
                  transition: "transform 0.3s ease-out",
                }}
              >
                <div className={`w-12 h-12 rounded-lg ${item.bgColor} flex items-center justify-center mb-4 group-hover:scale-110 transition-transform`}>
                  <item.icon className={`w-6 h-6 ${item.color}`} />
                </div>
                <h4 className="text-lg font-semibold mb-2 group-hover:gradient-text transition-all">
                  {item.title}
                </h4>
                <p className="text-sm text-muted-foreground leading-relaxed">
                  {item.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;