import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building, ArrowRight, Briefcase, GraduationCap } from "lucide-react";

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
      company: "CREAT GmbH",
      position: "Software Engineer - AI/ML & Computer Vision",
      duration: "Sep 2022 - Jul 2025",
      location: "Munich, Germany",
      description: "Leading AI/ML initiatives for automotive applications and computer vision solutions. Developed deep learning models for autonomous vehicle perception systems.",
      responsibilities: [
        "Developed CNN/LSTM models for object detection",
        "Reduced test analysis time by 60%",
        "Integrated AI vision modules into cloud systems",
        "Built AI pipelines with TensorFlow & PyTorch"
      ],
      technologies: ["PyTorch", "OpenCV", "CUDA", "TensorRT", "ROS", "Python", "C++", "Docker"]
    },
    {
      type: "work",
      company: "Accenture",
      position: "AI Research Assistant",
      duration: "2020 - 2022",
      location: "Bangalore, India",
      description: "Delivered enterprise AI solutions and digital transformation projects.",
      responsibilities: [
        "Designed ML solutions for enterprise clients",
        "Conducted technical workshops",
        "Optimized systems using AI/ML",
        "Collaborated with stakeholders"
      ],
      technologies: ["TensorFlow", "AWS", "Docker", "Kubernetes", "Python", "SQL"]
    }
  ];

  const education = [
    {
      type: "education",
      company: "MSc in Automotive Systems",
      position: "Technical University of Munich",
      duration: "2020 - 2022",
      location: "Munich, Germany",
      description: "Specialized in autonomous driving and AI systems",
      responsibilities: [],
      technologies: ["Machine Learning", "Computer Vision", "Robotics"]
    },
    {
      type: "education",
      company: "B.E in Electronics & Communication",
      position: "RIT Bangalore",
      duration: "2016 - 2020",
      location: "Bangalore, India",
      description: "Foundation in embedded systems and signal processing",
      responsibilities: [],
      technologies: ["C programming", "Embedded Systems", "DSP"]
    }
  ];

  return (
    <section 
      id="experience" 
      className="relative py-32 px-6 bg-secondary/10"
      ref={sectionRef}
    >
      {/* Background */}
      <div className="absolute inset-0 bg-gradient-to-b from-background via-secondary/5 to-background" />
      
      {/* Train track line */}
      <div className="absolute left-0 right-0 top-1/2 h-1 bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent -translate-y-1/2" />

      <div className="container mx-auto max-w-6xl relative z-10">
        {/* Section header */}
        <div 
          className={`text-center mb-20 transition-all duration-700 ${
            isInView ? "opacity-100 translate-y-0" : "opacity-0 -translate-y-16"
          }`}
        >
          <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4">
            My <span className="gradient-text">Journey</span>
          </h2>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto">
            From student to AI engineer - a train journey through my career
          </p>
        </div>

        {/* Work Experience - Train cars from alternate sides */}
        <div className="mb-16">
          <h3 className={`text-2xl font-bold mb-8 text-center transition-all duration-700 delay-200 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}>
            <Briefcase className="inline w-6 h-6 mr-2 text-cyan-400" />
            <span className="gradient-text">Work Experience</span>
          </h3>
          
          <div className="relative">
            {/* Train track */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-cyan-500/30 -translate-y-1/2" />
            
            {/* Station markers */}
            {[0, 1].map((i) => (
              <div 
                key={i}
                className="absolute top-1/2 w-4 h-4 rounded-full bg-cyan-500 border-4 border-background -translate-y-1/2"
                style={{ 
                  left: `${25 + i * 50}%`,
                  boxShadow: "0 0 20px hsl(180 100% 50% / 0.5)"
                }}
              />
            ))}

            {experiences.map((exp, index) => (
              <div
                key={exp.company}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                {/* Card coming from left or right */}
                <div 
                  className={`w-full md:w-5/12 transition-all duration-1000 ${
                    isInView 
                      ? index % 2 === 0 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-100 translate-x-0"
                      : index % 2 === 0
                        ? "opacity-0 -translate-x-32"
                        : "opacity-0 translate-x-32"
                  }`}
                  style={{ 
                    animationDelay: `${index * 300}ms`,
                    transitionDelay: `${index * 200}ms`
                  }}
                >
                  {/* Train car bubble */}
                  <div 
                    className={`glass-card p-6 rounded-2xl interactive-card relative ${
                      index % 2 === 0 ? 'mr-8' : 'ml-8'
                    }`}
                    style={{
                      transform: `perspective(1000px) rotateY(${index % 2 === 0 ? -5 : 5}deg)`,
                    }}
                  >
                    {/* Connector to track */}
                    <div className="absolute top-1/2 w-8 h-0.5 bg-cyan-500/50" 
                      style={index % 2 === 0 ? { right: 0, transform: 'translateX(100%)' } : { left: 0, transform: 'translateX(-100%)' }} 
                    />
                    
                    <div className="flex items-start justify-between mb-3">
                      <Building className="w-5 h-5 text-cyan-400" />
                      <Badge variant="outline" className="text-xs text-cyan-400 border-cyan-400/50">
                        {index === 0 ? "Current" : "Past"}
                      </Badge>
                    </div>

                    <h3 className="text-lg font-bold gradient-text mb-1">
                      {exp.position}
                    </h3>
                    <p className="text-foreground font-medium mb-2 flex items-center gap-1">
                      {exp.company}
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
                        {exp.responsibilities.slice(0, 3).map((resp, idx) => (
                          <li key={idx} className="text-xs text-muted-foreground flex items-start">
                            <span className="w-1 h-1 bg-cyan-400 rounded-full mr-2 mt-1.5 flex-shrink-0" />
                            {resp}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div className="flex flex-wrap gap-1.5 pt-3 border-t border-border/30">
                      {exp.technologies.slice(0, 5).map((tech) => (
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

        {/* Education - Train cars */}
        <div>
          <h3 className={`text-2xl font-bold mb-8 text-center transition-all duration-700 delay-500 ${
            isInView ? "opacity-100" : "opacity-0"
          }`}>
            <GraduationCap className="inline w-6 h-6 mr-2 text-purple-400" />
            <span className="gradient-text-alt">Education</span>
          </h3>
          
          <div className="relative">
            {/* Train track */}
            <div className="absolute left-0 right-0 top-1/2 h-0.5 bg-purple-500/30 -translate-y-1/2" />
            
            {[0, 1].map((i) => (
              <div 
                key={i}
                className="absolute top-1/2 w-4 h-4 rounded-full bg-purple-500 border-4 background -translate-y-1/2"
                style={{ 
                  left: `${25 + i * 50}%`,
                  boxShadow: "0 0 20px hsl(280 100% 50% / 0.5)"
                }}
              />
            ))}

            {education.map((edu, index) => (
              <div
                key={edu.company}
                className={`relative flex items-center mb-16 ${
                  index % 2 === 0 ? 'justify-start' : 'justify-end'
                }`}
              >
                <div 
                  className={`w-full md:w-5/12 transition-all duration-1000 ${
                    isInView 
                      ? index % 2 === 0 
                        ? "opacity-100 translate-x-0" 
                        : "opacity-100 translate-x-0"
                      : index % 2 === 0
                        ? "opacity-0 -translate-x-32"
                        : "opacity-0 translate-x-32"
                  }`}
                  style={{ 
                    animationDelay: `${(index + 2) * 300}ms`,
                    transitionDelay: `${(index + 2) * 200}ms`
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