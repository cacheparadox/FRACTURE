"use client";

import { useState, useEffect, useCallback } from "react";

interface TypewriterTextProps {
  text: string;
  speed?: number;
  onComplete?: () => void;
  className?: string;
}

export default function TypewriterText({
  text,
  speed = 30,
  onComplete,
  className = "",
}: TypewriterTextProps) {
  const [displayedCount, setDisplayedCount] = useState(0);
  const [isComplete, setIsComplete] = useState(false);

  useEffect(() => {
    setDisplayedCount(0);
    setIsComplete(false);
  }, [text]);

  useEffect(() => {
    if (displayedCount >= text.length) {
      if (!isComplete) {
        setIsComplete(true);
        onComplete?.();
      }
      return;
    }

    const timer = setTimeout(() => {
      setDisplayedCount((prev) => prev + 1);
    }, speed);

    return () => clearTimeout(timer);
  }, [displayedCount, text, speed, isComplete, onComplete]);

  const skip = useCallback(() => {
    if (!isComplete) {
      setDisplayedCount(text.length);
      setIsComplete(true);
      onComplete?.();
    }
  }, [isComplete, text.length, onComplete]);

  return (
    <span className={className} onClick={skip} style={{ cursor: isComplete ? "default" : "pointer" }}>
      {text.slice(0, displayedCount)}
      {!isComplete && (
        <span className="inline-block w-[0.6em] h-[1.1em] bg-white ml-[2px] align-middle animate-blink" />
      )}
    </span>
  );
}
