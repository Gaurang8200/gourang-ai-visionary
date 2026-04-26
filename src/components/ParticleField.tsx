import { useRef, useMemo } from "react";

interface ParticleProps {
  delay: number;
  duration: number;
  startX: number;
  startY: number;
  size: number;
}

const Particle = ({ delay, duration, startX, startY, size }: ParticleProps) => {
  const style = {
    left: `${startX}%`,
    top: `${startY}%`,
    width: size,
    height: size,
    animationDelay: `${delay}s`,
    animationDuration: `${duration}s`,
  };

  return (
    <div
      className="absolute rounded-full particle"
      style={style}
    >
      <div className="w-full h-full rounded-full bg-gradient-to-br from-cyan-400/30 to-blue-500/20 blur-sm" />
    </div>
  );
};

interface FloatingShapeProps {
  delay: number;
  startX: number;
  startY: number;
  size: number;
  shape: "circle" | "square" | "triangle";
}

const FloatingShape = ({ delay, startX, startY, size, shape }: FloatingShapeProps) => {
  const baseStyle = {
    left: `${startX}%`,
    top: `${startY}%`,
    width: size,
    height: size,
    animationDelay: `${delay}s`,
  };

  const shapeClasses = {
    circle: "rounded-full",
    square: "rounded-lg rotate-45",
    triangle: "clip-triangle",
  };

  return (
    <div
      className={`absolute opacity-20 floating-shape ${shapeClasses[shape]}`}
      style={baseStyle}
    >
      <div className={`w-full h-full ${shape === "circle" ? "rounded-full" : ""} bg-gradient-to-br from-cyan-500/20 to-purple-500/10 blur-md`} />
    </div>
  );
};

export const ParticleField = () => {
  const particles = useMemo(() => {
    return Array.from({ length: 20 }, (_, i) => ({
      id: i,
      delay: Math.random() * 10,
      duration: 15 + Math.random() * 20,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      size: 2 + Math.random() * 6,
    }));
  }, []);

  const shapes = useMemo(() => {
    return Array.from({ length: 8 }, (_, i) => ({
      id: i,
      delay: Math.random() * 8,
      startX: Math.random() * 100,
      startY: Math.random() * 100,
      size: 60 + Math.random() * 100,
      shape: (["circle", "square", "triangle"] as const)[i % 3],
    }));
  }, []);

  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Particles */}
      {particles.map((particle) => (
        <Particle key={particle.id} {...particle} />
      ))}
      
      {/* Floating shapes */}
      {shapes.map((shape) => (
        <FloatingShape key={shape.id} {...shape} />
      ))}
    </div>
  );
};

// Orbital rings for hero section
export const OrbitalRings = () => {
  const rings = [200, 300, 400];

  return (
    <div className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 w-[200px] h-[200px] md:w-[300px] md:h-[300px] lg:w-[400px] lg:h-[400px]">
      {rings.map((size, i) => (
        <div
          key={i}
          className="absolute inset-0 rounded-full border border-cyan-500/10"
          style={{
            width: size,
            height: size,
            left: "50%",
            top: "50%",
            transform: "translate(-50%, -50%)",
            animation: `orbit ${15 + i * 5}s linear infinite`,
            animationDelay: `${i * 2}s`,
          }}
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-cyan-400/50 blur-sm" />
        </div>
      ))}
    </div>
  );
};

// 3D Cube placeholder component
export const AnimatedCube = () => {
  return (
    <div className="perspective-1000">
      <div className="cube-container animate-float">
        <div className="cube-face cube-front" />
        <div className="cube-face cube-back" />
        <div className="cube-face cube-right" />
        <div className="cube-face cube-left" />
        <div className="cube-face cube-top" />
        <div className="cube-face cube-bottom" />
      </div>
    </div>
  );
};

export default ParticleField;