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
      {/* Video Background with better error handling */}
      <div className="absolute inset-0 w-full h-full">
        <video 
          autoPlay 
          muted 
          loop 
          playsInline
          preload="metadata"
          className="absolute inset-0 w-full h-full object-cover"
          style={{ filter: 'brightness(0.6) contrast(1.2) saturate(1.1)' }}
          onError={(e) => {
            console.log('Video failed to load:', e);
            // Hide video element if it fails to load
            e.currentTarget.style.display = 'none';
          }}
          onLoadStart={() => {
            console.log('Video started loading');
          }}
          onCanPlay={() => {
            console.log('Video can play');
          }}
        >
          <source src="/hero-bg.mp4" type="video/mp4" />
          <source src="/hero-bg.webm" type="video/webm" />
          Your browser does not support the video tag.
        </video>
        {/* Fallback background when video doesn't load */}
        <div className="absolute inset-0 bg-gradient-to-br from-background via-primary/20 to-background opacity-80"></div>
        {/* Enhanced overlay for better text readability */}
        <div className="absolute inset-0 bg-gradient-to-br from-black/60 via-black/40 to-black/60"></div>
        {/* Subtle tech grid overlay */}
        <div className="absolute inset-0 opacity-10">
          <div className="h-full w-full bg-[linear-gradient(rgba(255,255,255,0.1)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.1)_1px,transparent_1px)] bg-[size:50px_50px]"></div>
        </div>
      </div>
      {/* Clean background without particles */}
      <div className="absolute inset-0 pointer-events-none z-10"></div>

      {/* Content */}
      <div className="relative z-10 text-center px-6">
        <div className="max-w-4xl mx-auto">
          <div className="relative">
            <span className="absolute -top-8 left-1/2 transform -translate-x-1/2 text-lg text-muted-foreground">I'm</span>
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