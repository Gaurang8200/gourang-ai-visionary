import { useEffect, useRef, useState } from "react";
import { useMousePosition, useScrollProgress } from "@/hooks/useMouseParallax";

export const BackgroundLayers = () => {
  const { smoothPosition } = useMousePosition();
  const { progress } = useScrollProgress();

  const backgroundRef = useRef<HTMLDivElement>(null);
  const deepRef = useRef<HTMLDivElement>(null);
  const midRef = useRef<HTMLDivElement>(null);
  const frontRef = useRef<HTMLDivElement>(null);

  // Initialize particle positions once
  useEffect(() => {
    if (!backgroundRef.current) return;

    const createParticles = (count: number, container: HTMLDivElement) => {
      for (let i = 0; i < count; i++) {
        const particle = document.createElement("div");
        particle.className = "particle";
        // random position
        particle.style.left = `${Math.random() * 100}%`;
        particle.style.top = `${Math.random() * 100}%`;
        // random size
        const size = Math.random() * 3 + 1;
        particle.style.width = `${size}px`;
        particle.style.height = `${size}px`;
        // random animation delay
        particle.style.animationDelay = `${Math.random() * 5}s`;
        container.appendChild(particle);
      }
    };

    // Clear existing
    deepRef.current?.innerHTML = "";
    midRef.current?.innerHTML = "";
    frontRef.current?.innerHTML = "";

    // Create particles for each layer
    if (deepRef.current) createParticles(20, deepRef.current);
    if (midRef.current) createParticles(30, midRef.current);
    if (frontRef.current) createParticles(50, frontRef.current);
  }, []);

  // Update background gradient based on scroll progress
  useEffect(() => {
    if (!backgroundRef.current) return;
    // Example: shift gradient hue based on scroll
    const hue = Math.round(180 + progress * 60); // from cyan to pink
    backgroundRef.current.style.setProperty("--bg-hue", `${hue}`);
  }, [progress]);

  return (
    <>
      <div
        ref={backgroundRef}
        className="fixed inset-0 -z-50"
        style={{
          background: `linear-gradient(135deg, hsl(var(--bg-hue, 199) 89% 48% / 0.1), hsl(var(--bg-hue, 250) 89% 48% / 0.1))`,
          backgroundSize: "200% 200%",
          animation: "gradientShift 20s ease infinite",
        }}
      >
        {/* Deep layer */}
        <div ref={deepRef} className="bg-layer-deep" />
        {/* Mid layer */}
        <div ref={midRef} className="bg-layer-mid" />
        {/* Front layer (particles) */}
        <div ref={frontRef} className="bg-layer-front" />
      </div>

      {/* Optional: add a subtle vignette */}
      <div className="fixed inset-0 -z-40 pointer-events-none" style={{
        background: "radial-gradient(ellipse at center, transparent 0%, black 70%)",
        opacity: 0.3,
      }} />
    </>
  );
};