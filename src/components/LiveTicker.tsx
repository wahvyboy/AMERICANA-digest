import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, Pause, Play } from 'lucide-react';
import { LIVE_UPDATES } from '../data/liveUpdates';

interface LiveTickerProps {
  onSelectHeadline: (headlineText: string) => void;
}

export const LiveTicker: React.FC<LiveTickerProps> = ({ onSelectHeadline }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (!isPlaying) return;

    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % LIVE_UPDATES.length);
    }, 4500);

    return () => clearInterval(interval);
  }, [isPlaying]);

  const currentUpdate = LIVE_UPDATES[currentIndex];

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev - 1 + LIVE_UPDATES.length) % LIVE_UPDATES.length);
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev + 1) % LIVE_UPDATES.length);
  };

  return (
    <div className="bg-white border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-3 sm:px-6 py-2.5 flex items-center justify-between text-xs sm:text-sm">
        {/* Left: Red Live Updates Indicator + Headline */}
        <div className="flex items-center space-x-2 sm:space-x-3 overflow-hidden flex-1 mr-2 sm:mr-4">
          <div className="flex items-center space-x-1.5 shrink-0">
            <span className="w-2.5 h-2.5 rounded-full bg-[#E0292B] animate-pulse" />
            <span className="font-extrabold text-[#E0292B] uppercase tracking-wide text-xs">
              Live Updates
            </span>
          </div>

          <div className="truncate flex-1">
            <button
              onClick={() => onSelectHeadline(currentUpdate.text)}
              className="text-gray-900 font-bold hover:text-[#0E5B44] text-left truncate transition-colors text-xs sm:text-sm block"
              title={currentUpdate.text}
            >
              {currentUpdate.text}
            </button>
          </div>
        </div>

        {/* Right: Controls [<] [||] [>] */}
        <div className="flex items-center space-x-1 shrink-0 border border-gray-300 rounded overflow-hidden">
          <button
            onClick={handlePrev}
            className="p-1 hover:bg-gray-100 text-gray-700 transition-colors border-r border-gray-200"
            aria-label="Previous update"
          >
            <ChevronLeft className="w-3.5 h-3.5" />
          </button>
          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-1 hover:bg-gray-100 text-gray-700 transition-colors border-r border-gray-200"
            aria-label={isPlaying ? 'Pause updates' : 'Play updates'}
          >
            {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5" />}
          </button>
          <button
            onClick={handleNext}
            className="p-1 hover:bg-gray-100 text-gray-700 transition-colors"
            aria-label="Next update"
          >
            <ChevronRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>
    </div>
  );
};
