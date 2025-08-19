import { useEffect, useRef, useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Calendar, MapPin, Building } from "lucide-react";

const Experience = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [visibleItems, setVisibleItems] = useState<number[]>([]);
  const sectionRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          // Animate items with delay
          experiences.forEach((_, index) => {
            setTimeout(() => {
              setVisibleItems(prev => [...prev, index]);
            }, index * 200);
          });
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const experiences = [
    {
      company: "CREAT GmbH",
      position: "Software Engineer",
      duration: "September 2022 - July 2025",
      location: "Munich, Germany",
      description: "Leading AI/ML initiatives focused on automotive applications and computer vision solutions. Developing cutting-edge algorithms for autonomous vehicle perception systems.",
      responsibilities: [
        "Developed and deployed deep learning (CNN, LSTM) for camera object detection and radar-based use cases across automotive scenarios",
        "Created Python-based automation scripts to reduce time and manual effort in test result report analysis, improving overall workflow efficiency",
        "Integrated AI-powered vision modules into cloud-based Test Management System, enabling automated system validation and monitoring",
        "Automated AI-related data workflows using Python and PostgreSQL to manage report bank data and test result processing from internal servers",
        "Utilized TensorFlow, PyTorch, Docker and Git for AI Pipeline development, model deployment, and test automation workflows",
        "Proposed AI-driven solutions to enhance functionality and automate tedious processes, resulting in overall user satisfaction"
      ],
      technologies: ["PyTorch", "OpenCV", "CUDA", "TensorRT", "ROS", "Python", "C++"]
    },
    {
      company: "Accenture",
      position: "AI Research Assistant",
      duration: "2020 - 2022",
      location: "Bangalore, India",
      description: "Delivered enterprise AI solutions and consulted on digital transformation projects. Specialized in machine learning implementation for large-scale business applications.",
      responsibilities: [
        "Designed and implemented ML solutions for enterprise clients",
        "Conducted technical workshops and training sessions",
        "Optimized existing systems using AI/ML technologies",
        "Collaborated with stakeholders to define technical requirements"
      ],
      technologies: ["TensorFlow", "AWS", "Docker", "Kubernetes", "Python", "SQL"]
    }
  ];

  return (
    <section id="experience" className="py-20 px-6 bg-secondary/20" ref={sectionRef}>
      <div className="container mx-auto max-w-4xl">
        <div
          className={`transition-smooth duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            Professional <span className="gradient-text">Experience</span>
          </h2>

          <div className="relative">
            {/* Timeline Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-primary via-accent to-primary"></div>

            {experiences.map((experience, index) => (
              <div
                key={experience.company}
                className={`relative mb-12 transition-smooth duration-800 ${
                  visibleItems.includes(index)
                    ? "opacity-100 translate-x-0"
                    : "opacity-0 translate-x-10"
                }`}
              >
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-primary rounded-full border-4 border-background glow-blue"></div>

                {/* Content Card */}
                <div className="ml-20">
                  <div className="glass-card p-6 rounded-xl hover:glow-blue transition-smooth">
                    <div className="flex flex-col md:flex-row md:items-center md:justify-between mb-4">
                      <div>
                        <h3 className="text-2xl font-bold gradient-text mb-1">
                          {experience.position}
                        </h3>
                        <div className="flex items-center text-lg font-semibold text-foreground mb-2">
                          <Building className="h-4 w-4 mr-2 text-primary" />
                          {experience.company}
                        </div>
                      </div>
                      <div className="flex flex-col md:items-end space-y-1">
                        <div className="flex items-center text-muted-foreground">
                          <Calendar className="h-4 w-4 mr-2" />
                          {experience.duration}
                        </div>
                        <div className="flex items-center text-muted-foreground">
                          <MapPin className="h-4 w-4 mr-2" />
                          {experience.location}
                        </div>
                      </div>
                    </div>

                    <p className="text-muted-foreground mb-4 leading-relaxed">
                      {experience.description}
                    </p>

                    <div className="mb-4">
                      <h4 className="font-semibold mb-2">Key Responsibilities:</h4>
                      <ul className="space-y-1">
                        {experience.responsibilities.map((responsibility, idx) => (
                          <li key={idx} className="text-muted-foreground flex items-start">
                            <span className="w-2 h-2 bg-primary rounded-full mr-3 mt-2 flex-shrink-0" />
                            {responsibility}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <h4 className="font-semibold mb-2">Technologies:</h4>
                      <div className="flex flex-wrap gap-2">
                        {experience.technologies.map((tech) => (
                          <Badge
                            key={tech}
                            variant="secondary"
                            className="bg-muted/50 text-foreground hover:bg-primary/20 transition-smooth"
                          >
                            {tech}
                          </Badge>
                        ))}
                      </div>
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