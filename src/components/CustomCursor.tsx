import { useEffect, useState } from 'react';

interface Dot {
  x: number;
  y: number;
  opacity: number;
  scale: number;
  id: number;
}

const CustomCursor = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [dots, setDots] = useState<Dot[]>([]);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
    };
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      setDots(prevDots => {
        // Add new dot
        const newDot: Dot = {
          x: mousePosition.x,
          y: mousePosition.y,
          opacity: 1,
          scale: Math.random() * 0.5 + 0.5,
          id: Date.now() + Math.random()
        };

        // Update existing dots with fade and lag effect
        const updatedDots = prevDots
          .map(dot => ({
            ...dot,
            opacity: dot.opacity - 0.05,
            scale: dot.scale * 0.98
          }))
          .filter(dot => dot.opacity > 0);

        return [newDot, ...updatedDots].slice(0, 20); // Keep only last 20 dots
      });
    }, 50);

    return () => clearInterval(interval);
  }, [mousePosition]);

  return (
    <>
      {/* Main cursor */}
      <div
        className="fixed top-0 left-0 w-4 h-4 bg-primary rounded-full pointer-events-none z-[9999] mix-blend-difference"
        style={{
          transform: `translate(${mousePosition.x - 8}px, ${mousePosition.y - 8}px)`,
          transition: 'transform 0.1s ease-out'
        }}
      />
      
      {/* Trailing sparkle dots */}
      {dots.map((dot) => (
        <div
          key={dot.id}
          className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[9998]"
          style={{
            transform: `translate(${dot.x - 4}px, ${dot.y - 4}px) scale(${dot.scale})`,
            opacity: dot.opacity,
            mixBlendMode: 'difference',
            boxShadow: '0 0 6px currentColor'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;