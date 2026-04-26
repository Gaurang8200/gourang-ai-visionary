import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye, ArrowUpRight, Sparkles, TrendingUp, Shield, Zap, Code } from "lucide-react";
import { useMousePosition } from "@/hooks/useMouseParallax";

const Projects = () => {
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

  const projects = [
    {
      title: "Autonomous Vehicle Perception",
      description: "Real-time object detection and tracking for autonomous driving",
      fullDescription: "Developed a comprehensive perception system for autonomous vehicles capable of real-time object detection, classification, and tracking. The system processes camera feeds at 30fps and achieves 95% accuracy in urban environments.",
      icon: TrendingUp,
      iconColor: "text-green-400",
      iconBg: "bg-green-500/20",
      technologies: ["PyTorch", "OpenCV", "CUDA", "ROS", "C++"],
      category: "Computer Vision",
      highlights: ["Real-time 30fps processing", "95% detection accuracy", "Edge computing optimized", "Production deployed"],
      link: "#",
    },
    {
      title: "ML Model Optimization",
      description: "Automated framework for production ML deployment",
      fullDescription: "Built a comprehensive framework that automatically optimizes ML models for production deployment. The system reduces model size by up to 80% while maintaining accuracy.",
      icon: Sparkles,
      iconColor: "text-purple-400",
      iconBg: "bg-purple-500/20",
      technologies: ["TensorFlow", "ONNX", "TensorRT", "Docker", "K8s"],
      category: "Machine Learning",
      highlights: ["80% model size reduction", "Automated optimization", "Multi-format support", "A/B testing integrated"],
      link: "#",
    },
    {
      title: "HIL Testing Platform",
      description: "Hardware-in-the-loop testing automation",
      fullDescription: "Designed and implemented a full-scale HIL testing platform for automotive ECU validation. Reduced testing time by 60% while improving test coverage.",
      icon: Shield,
      iconColor: "text-blue-400",
      iconBg: "bg-blue-500/20",
      technologies: ["Python", "CAN", "dSPACE", "MATLAB", "Jenkins"],
      category: "Automotive",
      highlights: ["60% faster testing", "Automated generation", "Real-time monitoring", "Comprehensive reports"],
      link: "#",
    },
    {
      title: "Vision Quality Inspection",
      description: "AI-powered manufacturing quality control",
      fullDescription: "Developed an AI-powered quality inspection system that automatically detects defects in manufactured products with 99.5% accuracy.",
      icon: Zap,
      iconColor: "text-orange-400",
      iconBg: "bg-orange-500/20",
      technologies: ["OpenCV", "TensorFlow", "FastAPI", "PostgreSQL", "React"],
      category: "Computer Vision",
      highlights: ["99.5% accuracy", "Real-time processing", "40% cost reduction", "Cloud scalable"],
      link: "#",
    },
  ];

  return (
    <section 
      id="projects" 
      className="relative py-32 px-6"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/10 to-background" />
      
      {/* Animated background elements */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div 
          className="absolute w-[600px] h-[600px] rounded-full bg-cyan-500/3 blur-3xl top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
          style={{
            transform: `translate(-50%, -50%) translate(${smoothPosition.x * 30}px, ${smoothPosition.y * 30}px)`,
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
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 animate-title-glow">
            Featured <span className="gradient-text">Projects</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            Key projects demonstrating my technical expertise
          </p>
        </div>

        {/* Projects grid - stagger */}
        <div className="grid md:grid-cols-2 gap-6 lg:gap-8">
          {projects.map((project, index) => (
            <Card
              key={project.title}
              className={`group glass-card border-border/30 hover:border-cyan-500/30 transition-all duration-500 ${
                isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
              }`}
              style={{ 
                animationDelay: `${index * 150}ms`,
                transform: `perspective(1000px) rotateY(${smoothPosition.x * 3}deg) translateZ(${smoothPosition.y * 5}px)`,
                transition: "transform 0.3s ease-out, border-color 0.3s ease-out",
              }}
            >
              <CardHeader className="pb-2">
                <div className="flex items-center justify-between mb-2">
                  <Badge variant="outline" className="text-cyan-400 border-cyan-400/50">
                    {project.category}
                  </Badge>
                  <div 
                    className={`w-8 h-8 rounded-lg ${project.iconBg} flex items-center justify-center group-hover:scale-110 transition-transform`}
                  >
                    <project.icon className={`w-4 h-4 ${project.iconColor}`} />
                  </div>
                </div>
                <CardTitle className="text-xl font-bold group-hover:gradient-text transition-all">
                  {project.title}
                </CardTitle>
                <CardDescription className="text-muted-foreground">
                  {project.description}
                </CardDescription>
              </CardHeader>
              
              <CardContent>
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.technologies.slice(0, 4).map((tech) => (
                    <Badge key={tech} variant="secondary" className="text-xs bg-muted/30">
                      {tech}
                    </Badge>
                  ))}
                </div>

                <div className="flex gap-2">
                  <Dialog>
                    <DialogTrigger asChild>
                      <Button variant="ghost" size="sm" className="flex-1 hover:bg-primary/20">
                        <Eye className="h-4 w-4 mr-2" />
                        View Details
                      </Button>
                    </DialogTrigger>
                    <DialogContent className="glass-card border-border/50 max-w-2xl">
                      <DialogHeader>
                        <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg ${project.iconBg} flex items-center justify-center`}>
                            <project.icon className={`w-5 h-5 ${project.iconColor}`} />
                          </div>
                          <div>
                            <DialogTitle className="gradient-text">{project.title}</DialogTitle>
                            <DialogDescription className="text-muted-foreground">
                              {project.category}
                            </DialogDescription>
                          </div>
                        </div>
                      </DialogHeader>
                      
                      <div className="space-y-4 mt-4">
                        <p className="text-muted-foreground leading-relaxed">
                          {project.fullDescription}
                        </p>
                        
                        <div>
                          <h4 className="font-semibold mb-3">Key Highlights</h4>
                          <ul className="grid grid-cols-2 gap-2">
                            {project.highlights.map((highlight, idx) => (
                              <li key={idx} className="flex items-center text-muted-foreground text-sm">
                                <span className="w-1.5 h-1.5 bg-cyan-400 rounded-full mr-2" />
                                {highlight}
                              </li>
                            ))}
                          </ul>
                        </div>
                        
                        <div>
                          <h4 className="font-semibold mb-2">Technologies</h4>
                          <div className="flex flex-wrap gap-2">
                            {project.technologies.map((tech) => (
                              <Badge key={tech} variant="secondary">
                                {tech}
                              </Badge>
                            ))}
                          </div>
                        </div>

                        <div className="flex gap-2 pt-2">
                          <Button variant="outline" size="sm" className="hover:bg-primary/20">
                            <Github className="h-4 w-4 mr-2" />
                            View Code
                          </Button>
                          <Button variant="ghost" size="sm">
                            <ExternalLink className="h-4 w-4 mr-2" />
                            Live Demo
                          </Button>
                        </div>
                      </div>
                    </DialogContent>
                  </Dialog>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* View more CTA - scroll fade */}
        <div 
          className={`text-center mt-12 transition-all duration-700 delay-500 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 translate-y-8"
          }`}
        >
          <a
            href="https://github.com/Gaurang8200"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground transition-colors"
          >
            <span>View more projects on GitHub</span>
            <ArrowUpRight className="w-4 h-4" />
          </a>
        </div>
      </div>
    </section>
  );
};

export default Projects;