import { useState, useEffect, useMemo } from 'react';

interface TypewriterTextProps {
  text: string;
  className?: string;
  typingSpeed?: number;
  deletingSpeed?: number;
  pauseDuration?: number;
}

const TypewriterText = ({ 
  text, 
  className = "", 
  typingSpeed = 100, 
  deletingSpeed = 50, 
  pauseDuration = 1000 
}: TypewriterTextProps) => {
  const [displayText, setDisplayText] = useState("");
  const [started, setStarted] = useState(false);
  const normalizedText = useMemo(() => text.replace(/\\n/g, '\n'), [text]);

  // Start typing immediately on mount
  useEffect(() => {
    if (!started) {
      setStarted(true);
      const timeout = setTimeout(() => {
        setDisplayText(normalizedText.slice(0, 1));
      }, 500); // Initial delay
      return () => clearTimeout(timeout);
    }
  }, [started, normalizedText]);

  useEffect(() => {
    if (!started) return;
    
    let timeout: NodeJS.Timeout;

    // Only type forward, no deleting
    if (displayText.length < normalizedText.length) {
      timeout = setTimeout(() => {
        setDisplayText(normalizedText.slice(0, displayText.length + 1));
      }, typingSpeed);
    } else {
      // When finished, restart from beginning after pause
      timeout = setTimeout(() => {
        setDisplayText("");
      }, pauseDuration);
    }

    return () => clearTimeout(timeout);
  }, [displayText, normalizedText, typingSpeed, pauseDuration, started]);

  const [line1Full, line2Full = ""] = normalizedText.split('\n');
  const idx = displayText.length;
  const line1Count = Math.min(idx, line1Full.length);
  const hasNewlineTyped = idx > line1Full.length;
  const line2Count = hasNewlineTyped ? Math.min(line2Full.length, idx - line1Full.length - 1) : 0;

  return (
    <div>
      <div className={className} style={{ lineHeight: '1.2', marginBottom: '0.5rem' }}>
        {line1Full.slice(0, line1Count)}
        {!hasNewlineTyped && <span className="animate-pulse">|</span>}
      </div>
      <div className={className} style={{ lineHeight: '1.2' }}>
        {line2Full.slice(0, line2Count)}
        {hasNewlineTyped && <span className="animate-pulse">|</span>}
      </div>
    </div>
  );
};

export default TypewriterText;