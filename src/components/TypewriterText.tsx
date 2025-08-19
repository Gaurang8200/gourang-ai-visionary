import { useState, useEffect } from 'react';

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
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [started, setStarted] = useState(false);

  // Start typing immediately on mount
  useEffect(() => {
    if (!started) {
      setStarted(true);
      const timeout = setTimeout(() => {
        setDisplayText(text.slice(0, 1));
      }, 500); // Initial delay
      return () => clearTimeout(timeout);
    }
  }, [started, text]);

  useEffect(() => {
    if (!started) return;
    
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(!isDeleting);
      }, pauseDuration);
    } else if (isDeleting) {
      if (displayText.length > 0) {
        timeout = setTimeout(() => {
          setDisplayText(displayText.slice(0, -1));
        }, deletingSpeed);
      } else {
        setIsPaused(true);
      }
    } else {
      if (displayText.length < text.length) {
        timeout = setTimeout(() => {
          setDisplayText(text.slice(0, displayText.length + 1));
        }, typingSpeed);
      } else {
        setIsPaused(true);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, isDeleting, isPaused, text, typingSpeed, deletingSpeed, pauseDuration, started]);

  return (
    <span>
      {displayText.split('\n').map((line, index) => (
        <span key={index} className={`block ${className}`}>
          {line}
          {index === displayText.split('\n').length - 1 && (
            <span className="animate-pulse">|</span>
          )}
        </span>
      ))}
    </span>
  );
};

export default TypewriterText;