import { useEffect, useState } from "react";

interface AnimatedCharacterProps {
  type: "wave" | "code" | "think";
  className?: string;
}

export const AnimatedCharacter = ({ type, className = "" }: AnimatedCharacterProps) => {
  const [isWaving, setIsWaving] = useState(false);
  
  useEffect(() => {
    const waveInterval = setInterval(() => {
      setIsWaving(true);
      setTimeout(() => setIsWaving(false), 2000);
    }, 4000);
    
    return () => clearInterval(waveInterval);
  }, []);

  if (type === "wave") {
    return (
      <div className={`relative ${className}`} style={{ width: 100, height: 120 }}>
        <svg viewBox="0 0 100 120" className="w-full h-full">
          {/* Body - smooth rounded shape */}
          <defs>
            <linearGradient id="bodyGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#06b6d4" />
              <stop offset="50%" stopColor="#8b5cf6" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
            <filter id="glow">
              <feGaussianBlur stdDeviation="2" result="coloredBlur"/>
              <feMerge>
                <feMergeNode in="coloredBlur"/>
                <feMergeNode in="SourceGraphic"/>
              </feMerge>
            </filter>
          </defs>
          
          {/* Body */}
          <ellipse 
            cx="50" 
            cy="75" 
            rx="35" 
            ry="40" 
            fill="url(#bodyGrad)" 
            filter="url(#glow)"
            style={{ 
              transformOrigin: 'center',
              animation: 'float 3s ease-in-out infinite'
            }}
          />
          
          {/* Head */}
          <circle 
            cx="50" 
            cy="35" 
            r="22" 
            fill="url(#bodyGrad)"
            filter="url(#glow)"
          />
          
          {/* Eyes */}
          <circle cx="42" cy="32" r="4" fill="white" />
          <circle cx="58" cy="32" r="4" fill="white" />
          <circle cx="42" cy="32" r="2" fill="#0f172a" />
          <circle cx="58" cy="32" r="2" fill="#0f172a" />
          
          {/* Smile */}
          <path 
            d="M 42 42 Q 50 48 58 42" 
            stroke="white" 
            strokeWidth="2" 
            fill="none" 
            strokeLinecap="round"
          />
          
          {/* Waving arm */}
          <g style={{
            transformOrigin: '60px 65px',
            transform: isWaving ? 'rotate(-30deg)' : 'rotate(0deg)',
            transition: 'transform 0.5s ease'
          }}>
            <ellipse cx="60" cy="65" rx="8" ry="20" fill="url(#bodyGrad)" filter="url(#glow)" />
            {/* Hand */}
            <circle 
              cx="60" 
              cy="82" 
              r="6" 
              fill="url(#bodyGrad)"
              filter="url(#glow)"
            />
          </g>
          
          {/* Other arm */}
          <ellipse cx="30" cy="70" rx="6" ry="18" fill="url(#bodyGrad)" filter="url(#glow)" transform="rotate(-15 30 70)" />
          
          {/* Legs */}
          <ellipse cx="38" cy="110" rx="8" ry="12" fill="url(#bodyGrad)" />
          <ellipse cx="62" cy="110" rx="8" ry="12" fill="url(#bodyGrad)" />
        </svg>
        
        {/* Hello text bubble */}
        {isWaving && (
          <div className="absolute -top-2 -right-4 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full animate-bounce">
            👋 Hi!
        </div>
        )}
      </div>
    );
  }

  if (type === "code") {
    return (
      <div className={`relative ${className}`} style={{ width: 80, height: 100 }}>
        <svg viewBox="0 0 80 100" className="w-full h-full">
          <defs>
            <linearGradient id="codeGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#22c55e" />
              <stop offset="100%" stopColor="#14b8a6" />
            </linearGradient>
          </defs>
          
          {/* Laptop base */}
          <rect x="5" y="30" width="70" height="45" rx="5" fill="#1e293b" />
          {/* Screen */}
          <rect x="10" y="35" width="60" height="35" rx="3" fill="#0f172a" />
          {/* Code lines */}
          <rect x="14" y="42" width="30" height="2" rx="1" fill="#22c55e" />
          <rect x="14" y="48" width="40" height="2" rx="1" fill="#6ee7b7" />
          <rect x="14" y="54" width="25" height="2" rx="1" fill="#22c55e" />
          <rect x="14" y="60" width="35" height="2" rx="1" fill="#6ee7b7" />
        </svg>
      </div>
    );
  }

  if (type === "think") {
    return (
      <div className={`relative ${className}`} style={{ width: 60, height: 60 }}>
        <svg viewBox="0 0 60 60" className="w-full h-full animate-bounce">
          <defs>
            <linearGradient id="thinkGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#a855f7" />
              <stop offset="100%" stopColor="#ec4899" />
            </linearGradient>
          </defs>
          <circle cx="30" cy="30" r="25" fill="url(#thinkGrad)" />
          <text x="30" y="38" textAnchor="middle" fontSize="20">🤔</text>
        </svg>
      </div>
    );
  }

  return null;
};

export default AnimatedCharacter;