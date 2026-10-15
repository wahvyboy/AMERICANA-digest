import React, { useState, useEffect } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize, Subtitles, MoreVertical } from 'lucide-react';

export const AmericanaVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(7);
  const [isMuted, setIsMuted] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const totalDuration = 78; // 01:18

  useEffect(() => {
    let interval: any;
    if (isPlaying) {
      interval = setInterval(() => {
        setCurrentTime((prev) => {
          if (prev >= totalDuration) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = secs % 60;
    return `${m.toString().padStart(2, '0')}:${s.toString().padStart(2, '0')}`;
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentTime(Number(e.target.value));
  };

  return (
    <div className="my-8 max-w-4xl mx-auto px-4">
      {/* Section Header with Horizontal Rule */}
      <div className="flex items-center space-x-3 mb-3">
        <h2 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-gray-900 whitespace-nowrap">
          AMERICANA VIDEO
        </h2>
        <div className="h-0.5 bg-gray-900 flex-1" />
      </div>

      {/* Video Container */}
      <div className="relative aspect-16/9 bg-black rounded-xs overflow-hidden shadow-lg group">
        {/* Visual Simulated Footage */}
        <img
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80"
          alt="Video coverage preview"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-90' : 'opacity-75'
          }`}
        />

        {/* Captions Overlay */}
        {captionsOn && (
          <div className="absolute top-1/4 left-0 right-0 text-center px-4 pointer-events-none">
            <span className="bg-black/80 text-white text-xs sm:text-sm font-semibold px-3 py-1 rounded inline-block backdrop-blur-xs">
              [NEWS REPORT] “Air traffic control confirmed diversion protocols following mid-flight disturbance...”
            </span>
          </div>
        )}

        {/* Video Title Banner */}
        <div className="absolute top-3 left-3 right-12 z-10 pointer-events-none">
          <div className="bg-black/80 text-white text-xs sm:text-sm font-bold px-2.5 py-1 rounded inline-block">
            ISRAEL-BOUND PLANE MAKES EMERGENCY AFTER REPORTED FIGHT BETWEEN PASSENGERS
          </div>
        </div>

        {/* Top Right Options */}
        <div className="absolute top-3 right-3 z-10">
          <button className="p-1.5 text-white bg-black/50 hover:bg-black/80 rounded-full">
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Center Play/Pause Overlay */}
        <div className="absolute inset-0 flex items-center justify-center space-x-6 z-10">
          <button
            onClick={() => setCurrentTime((t) => Math.max(0, t - 10))}
            className="p-2 sm:p-3 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-transform active:scale-95"
            aria-label="Rewind 10 seconds"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="p-4 sm:p-5 text-white bg-[#0E5B44]/90 hover:bg-[#0E5B44] border-2 border-white rounded-full transition-transform active:scale-90 shadow-xl"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
            ) : (
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            onClick={() => setCurrentTime((t) => Math.min(totalDuration, t + 10))}
            className="p-2 sm:p-3 text-white/90 hover:text-white bg-black/40 hover:bg-black/60 rounded-full transition-transform active:scale-95"
            aria-label="Forward 10 seconds"
          >
            <RotateCw className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Bottom Control Bar */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/90 via-black/60 to-transparent p-3 pt-6 z-10 flex flex-col justify-end">
          {/* Progress Bar Slider */}
          <input
            type="range"
            min={0}
            max={totalDuration}
            value={currentTime}
            onChange={handleSeek}
            className="w-full h-1 bg-white/30 accent-[#F02D5E] rounded-lg appearance-none cursor-pointer mb-2"
          />

          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center space-x-3">
              <button onClick={() => setIsMuted(!isMuted)} className="hover:text-emerald-300">
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="font-mono text-[11px] sm:text-xs">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>

            <div className="flex items-center space-x-3">
              <button
                onClick={() => setCaptionsOn(!captionsOn)}
                className={`p-1 rounded text-xs font-bold border ${
                  captionsOn ? 'bg-white text-black border-white' : 'border-white/50 text-white'
                }`}
              >
                CC
              </button>
              <button className="hover:text-emerald-300" aria-label="Fullscreen">
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
