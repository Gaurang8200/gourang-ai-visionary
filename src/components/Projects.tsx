import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Badge } from "@/components/ui/badge";
import { ExternalLink, Github, Eye } from "lucide-react";

const Projects = () => {
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

  const projects = [
    {
      title: "Autonomous Vehicle Perception System",
      description: "Real-time object detection and classification for autonomous vehicles using deep learning",
      fullDescription: "Developed a comprehensive perception system for autonomous vehicles capable of real-time object detection, classification, and tracking. The system processes camera feeds at 30fps and achieves 95% accuracy in urban environments. Implemented using PyTorch, OpenCV, and custom CNN architectures optimized for edge computing.",
      technologies: ["PyTorch", "OpenCV", "CUDA", "ROS", "C++"],
      category: "Computer Vision",
      highlights: [
        "Real-time processing at 30fps",
        "95% accuracy in object detection",
        "Optimized for edge computing",
        "Deployed in production vehicles"
      ]
    },
    {
      title: "ML Model Optimization Framework",
      description: "Automated framework for optimizing machine learning models for production deployment",
      fullDescription: "Built a comprehensive framework that automatically optimizes ML models for production deployment. The system reduces model size by up to 80% while maintaining accuracy, supports multiple formats (ONNX, TensorRT), and includes automated A/B testing capabilities.",
      technologies: ["TensorFlow", "ONNX", "TensorRT", "Docker", "Kubernetes"],
      category: "Machine Learning",
      highlights: [
        "80% reduction in model size",
        "Automated optimization pipeline",
        "Multi-format support",
        "Integrated A/B testing"
      ]
    },
    {
      title: "HIL Testing Automation Platform",
      description: "Comprehensive platform for Hardware-in-the-Loop testing of automotive control systems",
      fullDescription: "Designed and implemented a full-scale HIL testing platform for automotive ECU validation. The platform supports automated test case generation, real-time monitoring, and comprehensive reporting. Reduced testing time by 60% while improving test coverage.",
      technologies: ["Python", "CAN", "dSPACE", "MATLAB", "Jenkins"],
      category: "Automotive Testing",
      highlights: [
        "60% reduction in testing time",
        "Automated test generation",
        "Real-time monitoring",
        "Comprehensive reporting"
      ]
    },
    {
      title: "Vision-Based Quality Inspection",
      description: "AI-powered quality inspection system for manufacturing using computer vision",
      fullDescription: "Developed an AI-powered quality inspection system that automatically detects defects in manufactured products. The system uses advanced computer vision techniques and achieves 99.5% accuracy, significantly reducing manual inspection time and costs.",
      technologies: ["OpenCV", "TensorFlow", "FastAPI", "PostgreSQL", "React"],
      category: "Computer Vision",
      highlights: [
        "99.5% defect detection accuracy",
        "Real-time processing capability",
        "Reduced inspection costs by 40%",
        "Scalable cloud architecture"
      ]
    }
  ];

  return (
    <section id="projects" className="relative py-20 px-6" ref={sectionRef}>
      {/* Background animation */}
      <div className="pointer-events-none absolute inset-0 -z-10">
        <video
          className="h-full w-full object-cover"
          autoPlay
          muted
          loop
          playsInline
        >
          <source src="/hero-bg1.webm" type="video/webm" />
          <source src="/hero-bg1.mp4" type="video/mp4" />
          {/* Fallback image (optional) */}
          {/* <img src="/hero-bg1.jpg" alt="Background" className="h-full w-full object-cover" /> */}
        </video>
        {/* Dark gradient overlay to keep text readable */}
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/70 to-background/90" />
      </div>
      <div className="container mx-auto max-w-6xl">
        <div
          className={`transition-smooth duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Featured <span className="gradient-text">Projects</span>
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {projects.map((project, index) => (
              <Card
                key={project.title}
                className={`glass-card border-border/50 hover:glow-blue transition-smooth duration-500 group animate-fade-in hover:scale-105`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <CardHeader>
                  <div className="flex justify-between items-start mb-2">
                    <Badge variant="outline" className="text-primary border-primary/50">
                      {project.category}
                    </Badge>
                  </div>
                  <CardTitle className="text-xl font-bold group-hover:gradient-text transition-smooth">
                    {project.title}
                  </CardTitle>
                  <CardDescription className="text-muted-foreground">
                    {project.description}
                  </CardDescription>
                </CardHeader>
                
                <CardContent>
                  <div className="flex flex-wrap gap-2 mb-4">
                    {project.technologies.map((tech) => (
                      <Badge key={tech} variant="secondary" className="text-xs">
                        {tech}
                      </Badge>
                    ))}
                  </div>

                  <div className="flex gap-2">
                    <Dialog>
                      <DialogTrigger asChild>
                        <Button variant="glass" size="sm" className="flex-1">
                          <Eye className="h-4 w-4 mr-2" />
                          View Details
                        </Button>
                      </DialogTrigger>
                      <DialogContent className="glass-card border-border/50 max-w-2xl">
                        <DialogHeader>
                          <DialogTitle className="gradient-text">{project.title}</DialogTitle>
                          <DialogDescription className="text-muted-foreground">
                            {project.fullDescription}
                          </DialogDescription>
                        </DialogHeader>
                        
                        <div className="space-y-4">
                          <div>
                            <h4 className="font-semibold mb-2">Key Highlights</h4>
                            <ul className="space-y-1">
                              {project.highlights.map((highlight, idx) => (
                                <li key={idx} className="text-muted-foreground flex items-center">
                                  <span className="w-2 h-2 bg-primary rounded-full mr-2 flex-shrink-0" />
                                  {highlight}
                                </li>
                              ))}
                            </ul>
                          </div>
                          
                          <div>
                            <h4 className="font-semibold mb-2">Technologies Used</h4>
                            <div className="flex flex-wrap gap-2">
                              {project.technologies.map((tech) => (
                                <Badge key={tech} variant="secondary">
                                  {tech}
                                </Badge>
                              ))}
                            </div>
                          </div>

                          <div className="flex gap-2 pt-4">
                            <Button variant="neon" size="sm">
                              <Github className="h-4 w-4 mr-2" />
                              View Code
                            </Button>
                            <Button variant="glass" size="sm">
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
        </div>
      </div>
    </section>
  );
};

export default Projects;