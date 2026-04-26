import { useEffect, useRef, useState } from "react";
import { Brain, Cpu, Eye, Rocket, Sparkles, Award, Users, Globe } from "lucide-react";
import { useScrollAnimation } from "@/hooks/useScrollAnimation";
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
      title: "AI Innovation",
      description: "Building intelligent systems that push boundaries",
      color: "text-purple-400",
      bgColor: "bg-purple-500/20",
    },
    {
      icon: Cpu,
      title: "Performance",
      description: "Optimized solutions for real-world applications",
      color: "text-cyan-400",
      bgColor: "bg-cyan-500/20",
    },
    {
      icon: Eye,
      title: "Vision",
      description: "Advanced computer vision for complex challenges",
      color: "text-green-400",
      bgColor: "bg-green-500/20",
    },
    {
      icon: Rocket,
      title: "Scale",
      description: "Production-ready systems deployed worldwide",
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
        {/* Section header - scroll drop animation */}
        <div 
          className={`text-center mb-16 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-title-glow">
            About <span className="gradient-text">Me</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Passionate engineer transforming ideas into intelligent solutions
          </p>
        </div>

        {/* Main content - scroll reveal */}
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
                  AI & Computer Vision Engineer
                </h3>
                
                <div className="space-y-4 text-muted-foreground leading-relaxed">
                  <p>
                    I'm a passionate AI and Machine Learning engineer with deep expertise in computer vision, 
                    autonomous systems, and automotive AI solutions. Currently working at CREAT GmbH in Munich, Germany.
                  </p>
                  <p>
                    My journey spans from building real-time perception systems for autonomous vehicles 
                    to developing automated testing frameworks that reduce manual effort by significant margins.
                  </p>
                  <p>
                    I believe in creating solutions that are not just technically impressive, but also 
                    practical, scalable, and impactful in the real world.
                  </p>
                </div>

                {/* Stats */}
                <div className="grid grid-cols-3 gap-4 mt-8 pt-6 border-t border-border/50">
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold gradient-text">3+</div>
                    <div className="text-xs lg:text-sm text-muted-foreground">Years Experience</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold gradient-text">10+</div>
                    <div className="text-xs lg:text-sm text-muted-foreground">Projects Delivered</div>
                  </div>
                  <div className="text-center">
                    <div className="text-2xl lg:text-3xl font-bold gradient-text">95%</div>
                    <div className="text-xs lg:text-sm text-muted-foreground">Accuracy Rate</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right - Highlights - stagger animation */}
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

        {/* Tech stack - scroll fade */}
        <div 
          className={`mt-16 pt-8 border-t border-border/30 transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <p className="text-center text-sm text-muted-foreground mb-6">Core Technologies</p>
          <div className="flex flex-wrap justify-center gap-4">
            {["PyTorch", "TensorFlow", "OpenCV", "Python", "C++", "CUDA", "ROS", "Docker"].map((tech, index) => (
              <span 
                key={tech}
                className="px-4 py-2 rounded-full glass text-sm text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all cursor-pointer animate-float"
                style={{ animationDelay: `${index * 100}ms` }}
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

export default About;