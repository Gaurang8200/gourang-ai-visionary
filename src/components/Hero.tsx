import { Button } from "@/components/ui/button";
import { ArrowDown, Github, Linkedin, Mail } from "lucide-react";
import { useEffect, useRef } from "react";
import { useTheme } from "next-themes";
import TypewriterText from "./TypewriterText";


const Hero = () => {
  const { theme } = useTheme();

  const scrollToNext = () => {
    const aboutSection = document.querySelector("#about");
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: "smooth" });
    }
  };

  return (
    <section className="relative min-h-screen flex items-center justify-center overflow-hidden bg-background">
      {/* Video Background */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          muted 
          loop 
          className="absolute inset-0 w-full h-full object-cover opacity-80"
          style={{ filter: 'brightness(0.7) contrast(1.1)' }}
        >
          {/* Replace with your own video file - place it in the public folder */}
          <source src="/hero-bg.mp4" type="video/mp4" />
          {/* Fallback gradient for when video doesn't load */}
        </video>
        {/* Dark overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/50 via-black/30 to-black/50"></div>
        {/* Subtle AI-themed grid overlay */}
        <div className="absolute inset-0 bg-grid-pattern opacity-5"></div>
      </div>
      {/* Clean background without particles */}
      <div className="absolute inset-0 pointer-events-none z-10"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <span className="absolute -top-8 -left-4 text-lg text-muted-foreground">I'm</span>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 animate-fade-in">
              <TypewriterText 
                text="Gourangkumar\nMonashara" 
                className="gradient-text"
                typingSpeed={120}
                deletingSpeed={80}
                pauseDuration={1500}
              />
            </h1>
          </div>
          
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 animate-fade-in" style={{ animationDelay: "0.2s" }}>
            AI, ML & Computer Vision Engineer
          </p>
          
          <p className="text-lg text-muted-foreground mb-12 max-w-2xl mx-auto animate-fade-in" style={{ animationDelay: "0.4s" }}>
            Crafting intelligent solutions with cutting-edge machine learning and computer vision technologies
          </p>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12 animate-fade-in" style={{ animationDelay: "0.6s" }}>
            <Button
              variant="neon"
              size="lg"
              onClick={() => document.querySelector("#projects")?.scrollIntoView({ behavior: "smooth" })}
              className="animate-pulse-glow"
            >
              View Projects
            </Button>
            <Button
              variant="glass"
              size="lg"
              onClick={() => document.querySelector("#contact")?.scrollIntoView({ behavior: "smooth" })}
            >
              Contact Me
            </Button>
          </div>

          {/* Social Links */}
          <div className="flex justify-center space-x-6 mb-12 animate-fade-in" style={{ animationDelay: "0.8s" }}>
            <Button variant="ghost" size="icon" className="hover:glow-blue transition-smooth">
              <Github className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:glow-blue transition-smooth">
              <Linkedin className="h-5 w-5" />
            </Button>
            <Button variant="ghost" size="icon" className="hover:glow-blue transition-smooth">
              <Mail className="h-5 w-5" />
            </Button>
          </div>

          {/* Scroll Indicator */}
          <Button
            variant="ghost"
            size="icon"
            onClick={scrollToNext}
            className="animate-bounce hover:glow-blue transition-smooth animate-fade-in"
            style={{ animationDelay: "1s" }}
          >
            <ArrowDown className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
};

export default Hero;