import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Eye, Cpu, Car, Zap, Database, Cloud, Sparkles } from "lucide-react";
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
      title: "Programming Languages",
      icon: Code,
      skills: ["Python", "C++", "JavaScript", "TypeScript", "MATLAB"],
      color: "from-blue-500 to-cyan-500",
    },
    {
      title: "ML & AI Frameworks",
      icon: Brain,
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Keras", "Pandas", "NumPy"],
      color: "from-purple-500 to-pink-500",
    },
    {
      title: "Computer Vision",
      icon: Eye,
      skills: ["OpenCV", "PIL", "Detectron2", "YOLO", "Image Processing"],
      color: "from-green-500 to-emerald-500",
    },
    {
      title: "Automotive AI",
      icon: Car,
      skills: ["Autonomous Driving", "ADAS", "Sensor Fusion", "Path Planning"],
      color: "from-orange-500 to-red-500",
    },
    {
      title: "Testing & Validation",
      icon: Zap,
      skills: ["HIL Testing", "Unit Testing", "Integration Testing", "Model Validation"],
      color: "from-yellow-500 to-amber-500",
    },
    {
      title: "Infrastructure",
      icon: Cloud,
      skills: ["Docker", "Kubernetes", "AWS", "PostgreSQL", "Linux"],
      color: "from-indigo-500 to-blue-500",
    },
  ];

  return (
    <section 
      id="skills" 
      className="relative py-32 px-6 bg-secondary/10"
      ref={sectionRef}
    >
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
        {/* Section header - scroll drop */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            Technical <span className="gradient-text">Skills</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Technologies I work with to bring ideas to life
          </p>
        </div>

        {/* Skills grid - stagger */}
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
              {/* Gradient border on hover */}
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

        {/* Additional info - scroll fade */}
        <div 
          className={`mt-16 text-center transition-all duration-700 delay-300 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-muted-foreground mb-6">
            Always learning and exploring new technologies
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            {["RAG Systems", "LLMs", "Agentic AI", "Edge AI", "TensorRT"].map((tech) => (
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