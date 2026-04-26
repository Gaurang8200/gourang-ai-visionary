import { useEffect, useRef, useState } from "react";

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
      <div className={`relative ${className}`}>
        {/* Character body */}
        <div className="relative w-24 h-32">
          {/* Head */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-16 h-16 rounded-full bg-gradient-to-br from-cyan-400 to-purple-500 flex items-center justify-center shadow-lg animate-float-bounce">
            <div className="w-12 h-12 rounded-full bg-slate-900 flex items-center justify-center">
              {/* Eyes */}
              <div className="flex gap-2">
                <div className="w-2 h-3 bg-cyan-400 rounded-full animate-pulse" />
                <div className="w-2 h-3 bg-cyan-400 rounded-full animate-pulse" />
              </div>
            </div>
          </div>
          
          {/* Body */}
          <div className="absolute top-14 left-1/2 -translate-x-1/2 w-20 h-16 rounded-xl bg-gradient-to-r from-cyan-500 to-purple-600 flex items-center justify-center">
            <span className="text-white text-xs font-bold">AI</span>
          </div>
          
          {/* Arm - waving */}
          <div 
            className="absolute top-16 -right-4 w-8 h-3 bg-gradient-to-r from-cyan-400 to-cyan-500 rounded-full origin-left"
            style={{
              transform: isWaving ? "rotate(30deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              animation: isWaving ? "wave-hand 0.5s ease-in-out infinite" : "none"
            }}
          />
          
          {/* Hand */}
          <div 
            className="absolute top-14 -right-6 w-4 h-4 rounded-full bg-cyan-400"
            style={{
              transform: isWaving ? "rotate(30deg)" : "rotate(0deg)",
              transition: "transform 0.3s ease",
              animation: isWaving ? "wave 0.5s ease-in-out infinite" : "none"
            }}
          />
          
          {/* Legs */}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 flex gap-4">
            <div className="w-4 h-8 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-b-lg" />
            <div className="w-4 h-8 bg-gradient-to-b from-cyan-500 to-purple-600 rounded-b-lg" />
          </div>
        </div>
        
        {/* Hello text bubble */}
        <div className={`absolute -top-8 -right-8 bg-cyan-500 text-white text-xs font-bold px-3 py-1 rounded-full ${isWaving ? 'opacity-100' : 'opacity-0'}`}
          style={{ transition: "opacity 0.3s ease" }}>
          👋 Hello!
        </div>
      </div>
    );
  }

  if (type === "code") {
    return (
      <div className={`relative ${className}`}>
        <div className="w-20 h-24 rounded-lg bg-slate-900 p-2 shadow-lg">
          <div className="flex gap-1 mb-2">
            <div className="w-2 h-2 rounded-full bg-red-500" />
            <div className="w-2 h-2 rounded-full bg-yellow-500" />
            <div className="w-2 h-2 rounded-full bg-green-500" />
          </div>
          <div className="space-y-1">
            <div className="h-1 bg-slate-700 rounded w-full animate-pulse" />
            <div className="h-1 bg-slate-700 rounded w-3/4" />
            <div className="h-1 bg-cyan-500 rounded w-1/2" />
          </div>
        </div>
      </div>
    );
  }

  if (type === "think") {
    return (
      <div className={`relative ${className}`}>
        <div className="w-16 h-16 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center animate-bounce shadow-lg">
          <span className="text-2xl">🤔</span>
        </div>
      </div>
    );
  }

  return null;
};

export default AnimatedCharacter;