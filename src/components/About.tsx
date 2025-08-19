import { useEffect, useRef, useState } from "react";

const About = () => {
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

  return (
    <section id="about" className="py-20 px-6" ref={sectionRef}>
      <div className="container mx-auto max-w-4xl">
        <div
          className={`transition-smooth duration-1000 ${
            isVisible
              ? "opacity-100 translate-y-0"
              : "opacity-0 translate-y-10"
          }`}
        >
          <h2 className="text-4xl md:text-5xl font-bold text-center mb-12">
            About <span className="gradient-text">Me</span>
          </h2>

          <div className="glass-card p-8 md:p-12 rounded-2xl">
            <div className="text-center">
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed mb-6">
                I'm a passionate AI and Machine Learning engineer with expertise in computer vision, 
                specializing in automotive AI solutions and HIL testing frameworks. With experience 
                at leading tech companies, I transform complex problems into intelligent, scalable solutions.
              </p>
              <p className="text-lg md:text-xl text-muted-foreground leading-relaxed">
                Currently focused on advancing autonomous systems and developing cutting-edge ML models 
                that push the boundaries of what's possible in artificial intelligence.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;