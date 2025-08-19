import { useEffect, useRef, useState } from 'react';

interface Star {
  id: number;
  x: number;
  y: number;
  vx: number;
  vy: number;
  opacity: number;
  length: number;
  angle: number;
}

const CustomCursor = () => {
  const [isMoving, setIsMoving] = useState(false);
  const [stars, setStars] = useState<Star[]>([]);
  const [cursorPos, setCursorPos] = useState({ x: window.innerWidth / 2, y: window.innerHeight / 2 });

  const targetRef = useRef({ x: cursorPos.x, y: cursorPos.y });
  const lagRef = useRef({ x: cursorPos.x, y: cursorPos.y });
  const prevRef = useRef({ x: cursorPos.x, y: cursorPos.y });
  const speedRef = useRef(0);
  const spawnCooldownRef = useRef(0);
  const stopTimerRef = useRef<number | null>(null);
  const rafRef = useRef<number | null>(null);

  useEffect(() => {
    const onMove = (e: MouseEvent) => {
      targetRef.current.x = e.clientX;
      targetRef.current.y = e.clientY;
      setIsMoving(true);

      if (stopTimerRef.current) window.clearTimeout(stopTimerRef.current);
      stopTimerRef.current = window.setTimeout(() => {
        setIsMoving(false);
        setStars([]); // Clear trail when stationary
      }, 140);
    };

    window.addEventListener('mousemove', onMove);
    return () => window.removeEventListener('mousemove', onMove);
  }, []);

  useEffect(() => {
    const tick = () => {
      // Lagging cursor position
      const ease = 0.15;
      const { x: tx, y: ty } = targetRef.current;
      lagRef.current.x += (tx - lagRef.current.x) * ease;
      lagRef.current.y += (ty - lagRef.current.y) * ease;

      // Velocity and speed
      const vx = lagRef.current.x - prevRef.current.x;
      const vy = lagRef.current.y - prevRef.current.y;
      const speed = Math.hypot(vx, vy);
      speedRef.current = speed;
      prevRef.current.x = lagRef.current.x;
      prevRef.current.y = lagRef.current.y;

      // Spawn falling star when moving fast enough
      if (isMoving && speed > 0.4 && spawnCooldownRef.current <= 0) {
        const angle = Math.atan2(vy, vx);
        const length = Math.min(28, 6 + speed * 0.9);
        const star: Star = {
          id: Date.now() + Math.random(),
          x: lagRef.current.x,
          y: lagRef.current.y,
          vx: vx * 0.8,
          vy: vy * 0.8 + 0.25, // slight downward bias
          opacity: 1,
          length,
          angle,
        };
        setStars((prev) => [star, ...prev].slice(0, 24));
        spawnCooldownRef.current = 2; // throttle spawning
      } else {
        spawnCooldownRef.current -= 1;
      }

      // Update stars physics
      if (stars.length) {
        setStars((prev) =>
          prev
            .map((s) => ({
              ...s,
              x: s.x + s.vx,
              y: s.y + s.vy,
              vy: s.vy + 0.18, // gravity
              opacity: s.opacity - 0.06,
              length: s.length * 0.96,
            }))
            .filter((s) => s.opacity > 0.05 && s.length > 2)
        );
      }

      // Reflect lag position to UI
      setCursorPos({ x: lagRef.current.x, y: lagRef.current.y });

      rafRef.current = requestAnimationFrame(tick);
    };

    rafRef.current = requestAnimationFrame(tick);
    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [isMoving, stars.length]);

  return (
    <>
      {/* Main cursor: AI symbol when stationary, subtle dot when moving (lagged) */}
      <div
        className={`fixed top-0 left-0 pointer-events-none z-[9999] ${
          isMoving ? 'w-3 h-3 rounded-full bg-primary mix-blend-difference' : 'w-7 h-7 text-primary'
        }`}
        style={{
          transform: `translate(${cursorPos.x - (isMoving ? 6 : 14)}px, ${cursorPos.y - (isMoving ? 6 : 14)}px)`,
          transition: isMoving ? 'transform 0.05s ease-out' : 'transform 0.15s ease-out',
        }}
      >
        {!isMoving && (
          <div className="relative w-full h-full">
            {/* AI badge */}
            <div className="absolute inset-0 rounded-full bg-primary/10 blur-sm" />
            <div className="absolute inset-0 rounded-full border border-primary/40" />
            <div className="absolute inset-0 grid place-items-center text-[10px] font-semibold tracking-wider">
              AI
            </div>
            <div className="absolute inset-0 rounded-full animate-ping opacity-30" style={{ color: 'hsl(var(--primary))' }}>
              <svg viewBox="0 0 24 24" className="w-full h-full" fill="currentColor">
                <circle cx="12" cy="12" r="11" />
              </svg>
            </div>
          </div>
        )}
      </div>

      {/* Falling stars trail (only while moving) */}
      {isMoving &&
        stars.map((s) => (
          <div
            key={s.id}
            className="fixed top-0 left-0 pointer-events-none z-[9998]"
            style={{
              transform: `translate(${s.x}px, ${s.y}px) rotate(${(s.angle * 180) / Math.PI}deg)`,
              transformOrigin: 'left center',
              width: `${s.length}px`,
              height: '2px',
              opacity: s.opacity,
              background: 'linear-gradient(90deg, currentColor, transparent)',
              color: 'hsl(var(--primary))',
              boxShadow: '0 0 10px currentColor',
              borderRadius: '9999px',
              mixBlendMode: 'screen',
            }}
          />
        ))}
    </>
  );
};

export default CustomCursor;
