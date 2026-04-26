import { useEffect, useRef, useState } from "react";
import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail, Sparkles, Code, Brain, Cpu } from "lucide-react";
import TypewriterText from "./TypewriterText";
import { useMousePosition } from "@/hooks/useMouseParallax";

const Hero = () => {
  const [isLoaded, setIsLoaded] = useState(false);
  const heroRef = useRef<HTMLDivElement>(null);
  const { smoothPosition } = useMousePosition();

  useEffect(() => {
    const timer = setTimeout(() => setIsLoaded(true), 100);
    return () => clearTimeout(timer);
  }, []);

  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section 
      ref={heroRef}
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background"
    >
      {/* Main content with fade-in animation */}
      <div 
        className={`relative z-10 text-center px-6 transition-all duration-1000 ${
          isLoaded ? "opacity-100 translate-y-0" : "opacity-0 translate-y-10"
        }`}
      >
        <div className="max-w-5xl mx-auto">
          {/* Badge */}
          <div 
            className="inline-flex items-center gap-2 px-4 py-2 mb-8 rounded-full glass text-sm text-muted-foreground animate-fade-in-up"
            style={{
              transform: `translate(${smoothPosition.x * 10}px, ${smoothPosition.y * 10}px)`,
              transition: "transform 0.3s ease-out",
            }}
          >
            <Sparkles className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Agentic AI & Full Stack Engineer</span>
            <span className="sm:hidden">AI Engineer</span>
          </div>

          {/* Main headline */}
          <div className="relative mb-6 animate-title-glow">
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-bold tracking-tight">
              <span className="block text-muted-foreground text-xl md:text-2xl lg:text-3xl font-normal mb-4">
                Hello, I'm
              </span>
              <div className="gradient-text inline-block">
                <TypewriterText 
                  text="Gourangkumar\nMonashara" 
                  typingSpeed={100}
                  deletingSpeed={60}
                  pauseDuration={2000}
                  className="leading-tight"
                />
              </div>
            </h1>
          </div>

          {/* Subtitle */}
          <div className="text-xl md:text-2xl lg:text-3xl text-muted-foreground mb-4 font-light animate-fade-in-up delay-200">
            Building the future with <span className="text-cyan-400">intelligent systems</span>
          </div>

          {/* Description */}
          <p className="text-lg text-muted-foreground/80 mb-12 max-w-2xl mx-auto leading-relaxed animate-fade-in-up delay-300">
            Specializing in AI, Machine Learning, and Computer Vision. 
            Creating cutting-edge solutions that bridge the gap between human intelligence and machine capability.
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in-up delay-400">
            <Button
              size="lg"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="btn-glass text-lg px-8 py-6 hover:scale-105 transition-transform"
            >
              <Code className="w-5 h-5 mr-2" />
              View Projects
            </Button>
            <Button
              size="lg"
              variant="ghost"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
              className="text-lg px-8 py-6"
            >
              <Mail className="w-5 h-5 mr-2" />
              Contact Me
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center gap-6 mb-16 animate-fade-in-up delay-500">
            <a
              href="https://github.com/Gaurang8200"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-primary/20 transition-all group"
            >
              <Github className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="https://www.linkedin.com/in/gourangkumar-n-monashara-b77972141"
              target="_blank"
              rel="noopener noreferrer"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-blue-400 hover:bg-primary/20 transition-all group"
            >
              <Linkedin className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
            <a
              href="mailto:monashragaurang6@gmail.com"
              className="w-12 h-12 rounded-full glass flex items-center justify-center text-muted-foreground hover:text-red-400 hover:bg-primary/20 transition-all group"
            >
              <Mail className="w-5 h-5 group-hover:scale-110 transition-transform" />
            </a>
          </div>

          {/* Scroll indicator */}
          <div className="flex flex-col items-center animate-fade-in-up delay-700">
            <button
              onClick={scrollToNext}
              className="text-muted-foreground hover:text-foreground transition-colors group"
            >
              <ArrowDown className="w-6 h-6 animate-bounce group-hover:translate-y-1 transition-transform" />
            </button>
            <span className="text-xs text-muted-foreground/50 mt-2">Scroll to explore</span>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Hero;