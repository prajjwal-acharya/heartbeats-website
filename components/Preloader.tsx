import React, { useEffect, useState, useRef } from 'react';
import { AudioWaveform } from 'lucide-react';

interface PreloaderProps {
  onComplete: () => void;
}

const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [loadingText, setLoadingText] = useState('Initializing...');
  const [isFading, setIsFading] = useState(false);
  const onCompleteRef = useRef(onComplete);

  // Keep ref updated
  useEffect(() => {
    onCompleteRef.current = onComplete;
  }, [onComplete]);

  const texts = [
    "Tuning Sitars...",
    "Warming Analog Synths...",
    "Syncing Rhythms...",
    "Loading Ragas...",
    "Connecting to the Soul..."
  ];

  useEffect(() => {
    // Text Rotation
    let textIndex = 0;
    const textInterval = setInterval(() => {
      textIndex = (textIndex + 1) % texts.length;
      setLoadingText(texts[textIndex]);
    }, 800);

    // Progress Bar Simulation
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          clearInterval(textInterval);
          setIsFading(true);
          setTimeout(() => onCompleteRef.current(), 1000); // Wait for fade out
          return 100;
        }
        // Random increment for realistic feel
        const increment = Math.random() * 15;
        return Math.min(prev + increment, 100);
      });
    }, 300);

    return () => {
      clearInterval(textInterval);
      clearInterval(progressInterval);
    };
  }, []); // Empty dependency array - runs only once

  return (
    <div
      className={`fixed inset-0 z-[100] bg-[#050505] flex flex-col items-center justify-center transition-opacity duration-1000 ease-in-out ${isFading ? 'opacity-0 pointer-events-none' : 'opacity-100'}`}
    >
      <div className="relative">
        {/* Pulsing Glow behind logo */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-32 h-32 bg-band-red/20 rounded-full blur-3xl animate-pulse-slow"></div>

        <div className="flex flex-col items-center gap-6 relative z-10">
          <div className="p-4 rounded-full border border-white/10 relative">
            <AudioWaveform className="h-12 w-12 text-band-red animate-pulse" />
            {/* Spinner Ring */}
            <div className="absolute inset-0 border-t border-r border-band-red/50 rounded-full animate-spin-slow"></div>
          </div>

          <h1 className="text-3xl font-serif font-bold tracking-[0.2em] text-white">
            HEART<span className="text-band-red">BEATS</span>
          </h1>

          <div className="flex flex-col items-center gap-2 mt-8 h-10">
            <p className="font-mono text-xs text-band-red uppercase tracking-widest animate-pulse">
              {loadingText}
            </p>
            <p className="font-serif text-4xl font-light text-neutral-700">
              {Math.floor(progress)}%
            </p>
          </div>
        </div>
      </div>

      {/* Bottom Progress Line */}
      <div className="absolute bottom-0 left-0 h-[2px] bg-band-red transition-all duration-300 ease-out" style={{ width: `${progress}%` }}></div>
    </div>
  );
};

export default Preloader;