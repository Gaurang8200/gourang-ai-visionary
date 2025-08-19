import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Brain, Code, Eye, Cpu, Car, Zap } from "lucide-react";

const Skills = () => {
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
        }
      },
      { threshold: 0.3 }
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
      color: "neon-blue",
    },
    {
      title: "ML & AI Frameworks",
      icon: Brain,
      skills: ["PyTorch", "TensorFlow", "Scikit-learn", "Keras", "Pandas", "NumPy"],
      color: "neon-cyan",
    },
    {
      title: "Computer Vision",
      icon: Eye,
      skills: ["OpenCV", "PIL", "Detectron2", "YOLO", "Image Processing"],
      color: "neon-purple",
    },
    {
      title: "Automotive AI",
      icon: Car,
      skills: ["Autonomous Driving", "ADAS", "Sensor Fusion", "Path Planning"],
      color: "neon-pink",
    },
    {
      title: "Testing & Validation",
      icon: Zap,
      skills: ["HIL Testing", "Unit Testing", "Integration Testing", "Model Validation"],
      color: "neon-blue",
    },
    {
      title: "Development Tools",
      icon: Cpu,
      skills: ["Git", "Docker", "Linux", "AWS", "Jupyter", "VSCode"],
      color: "neon-cyan",
    },
  ];

  return (
    <section id="skills" className="py-20 px-6 bg-secondary/20" ref={sectionRef}>
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transition-smooth duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Technical <span className="gradient-text">Skills</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {skillCategories.map((category, index) => (
              <div
                key={category.title}
                className={`glass-card p-6 rounded-xl hover:glow-blue transition-smooth duration-500 animate-fade-in`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center mb-4">
                  <category.icon className="h-6 w-6 text-primary mr-3" />
                  <h3 className="text-xl font-semibold">{category.title}</h3>
                </div>
                
                <div className="flex flex-wrap gap-2">
                  {category.skills.map((skill) => (
                    <Badge
                      key={skill}
                      variant="secondary"
                      className="bg-muted/50 text-foreground hover:bg-primary/20 transition-smooth"
                    >
                      {skill}
                    </Badge>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Skills;