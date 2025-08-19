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
  const [isMoving, setIsMoving] = useState(false);
  const [movementTimeout, setMovementTimeout] = useState<NodeJS.Timeout | null>(null);

  useEffect(() => {
    const updateMousePosition = (e: MouseEvent) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
      setIsMoving(true);

      // Clear existing timeout
      if (movementTimeout) {
        clearTimeout(movementTimeout);
      }

      // Set new timeout to detect when mouse stops
      const timeout = setTimeout(() => {
        setIsMoving(false);
        setDots([]); // Clear all dots when stopped
      }, 150);

      setMovementTimeout(timeout);
    };

    window.addEventListener('mousemove', updateMousePosition);

    return () => {
      window.removeEventListener('mousemove', updateMousePosition);
      if (movementTimeout) {
        clearTimeout(movementTimeout);
      }
    };
  }, [movementTimeout]);

  useEffect(() => {
    if (!isMoving) return;

    const interval = setInterval(() => {
      setDots(prevDots => {
        // Add new falling star dot only when moving
        const newDot: Dot = {
          x: mousePosition.x + (Math.random() - 0.5) * 10,
          y: mousePosition.y + (Math.random() - 0.5) * 10,
          opacity: 1,
          scale: Math.random() * 0.8 + 0.4,
          id: Date.now() + Math.random()
        };

        // Update existing dots with falling effect
        const updatedDots = prevDots
          .map(dot => ({
            ...dot,
            y: dot.y + 2, // Falling effect
            x: dot.x + (Math.random() - 0.5) * 1, // Slight horizontal drift
            opacity: dot.opacity - 0.08,
            scale: dot.scale * 0.95
          }))
          .filter(dot => dot.opacity > 0);

        return [newDot, ...updatedDots].slice(0, 15);
      });
    }, 40);

    return () => clearInterval(interval);
  }, [mousePosition, isMoving]);

  return (
    <>
      {/* Main cursor - AI symbol when stationary, dot when moving */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] transition-all duration-300 ${
          isMoving 
            ? "w-3 h-3 bg-primary rounded-full mix-blend-difference" 
            : "w-6 h-6 text-primary"
        }`}
        style={{
          transform: `translate(${mousePosition.x - (isMoving ? 6 : 12)}px, ${mousePosition.y - (isMoving ? 6 : 12)}px)`,
          transition: 'transform 0.05s ease-out'
        }}
      >
        {!isMoving && (
          <div className="relative w-full h-full animate-pulse">
            {/* AI symbol - brain/neural network */}
            <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full">
              <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
              <circle cx="12" cy="12" r="2" fill="currentColor" opacity="0.8" />
            </svg>
            <div className="absolute inset-0 animate-ping">
              <svg viewBox="0 0 24 24" fill="currentColor" className="w-full h-full opacity-30">
                <path d="M12 2L13.09 8.26L22 9L13.09 9.74L12 16L10.91 9.74L2 9L10.91 8.26L12 2Z" />
              </svg>
            </div>
          </div>
        )}
      </div>
      
      {/* Falling star trail - only when moving */}
      {isMoving && dots.map((dot) => (
        <div
          key={dot.id}
          className="fixed top-0 left-0 w-1 h-1 bg-primary rounded-full pointer-events-none z-[9998]"
          style={{
            transform: `translate(${dot.x}px, ${dot.y}px) scale(${dot.scale})`,
            opacity: dot.opacity,
            mixBlendMode: 'difference',
            boxShadow: '0 0 8px currentColor'
          }}
        />
      ))}
    </>
  );
};

export default CustomCursor;