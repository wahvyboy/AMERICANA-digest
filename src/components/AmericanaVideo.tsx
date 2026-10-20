import React, { useState, useEffect, useRef } from 'react';
import { Play, Pause, RotateCcw, RotateCw, Volume2, VolumeX, Maximize, MoreVertical } from 'lucide-react';

export const AmericanaVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTime, setCurrentTime] = useState(7);
  const [isMuted, setIsMuted] = useState(true);
  const [captionsOn, setCaptionsOn] = useState(true);
  const [skipFeedback, setSkipFeedback] = useState<'rewind' | 'forward' | null>(null);
  const totalDuration = 78; // 01:18

  const lastTapLeftRef = useRef<number>(0);
  const lastTapRightRef = useRef<number>(0);

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

  const skipBackward = () => {
    setCurrentTime((t) => Math.max(0, t - 10));
    setSkipFeedback('rewind');
    setTimeout(() => setSkipFeedback(null), 650);
  };

  const skipForward = () => {
    setCurrentTime((t) => Math.min(totalDuration, t + 10));
    setSkipFeedback('forward');
    setTimeout(() => setSkipFeedback(null), 650);
  };

  const handleLeftTap = () => {
    const now = Date.now();
    if (now - lastTapLeftRef.current < 320) {
      skipBackward();
      lastTapLeftRef.current = 0;
    } else {
      lastTapLeftRef.current = now;
    }
  };

  const handleRightTap = () => {
    const now = Date.now();
    if (now - lastTapRightRef.current < 320) {
      skipForward();
      lastTapRightRef.current = 0;
    } else {
      lastTapRightRef.current = now;
    }
  };

  return (
    <section className="my-8 max-w-4xl mx-auto px-3 sm:px-4">
      {/* Section Header with Horizontal Rule */}
      <div className="flex items-center space-x-3 mb-3">
        <h2 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-gray-900 whitespace-nowrap">
          AMERICANA VIDEO
        </h2>
        <div className="h-0.5 bg-gray-900 flex-1" />
      </div>

      {/* Strict aspect-video container (16:9) to eliminate layout shift */}
      <div className="relative w-full aspect-video bg-black rounded-xs overflow-hidden shadow-lg group select-none">
        {/* Visual Simulated Footage with explicit width/height */}
        <img
          src="https://images.unsplash.com/photo-1540959733332-eab4deabeeaf?auto=format&fit=crop&w=1200&q=80"
          alt="Video coverage preview"
          width={1200}
          height={675}
          loading="lazy"
          decoding="async"
          className={`w-full h-full object-cover transition-opacity duration-300 ${
            isPlaying ? 'opacity-90' : 'opacity-75'
          }`}
        />

        {/* Double-Tap Gesture Zones on Mobile (Left 35% & Right 35%) */}
        <div 
          onClick={handleLeftTap}
          className="absolute top-0 bottom-16 left-0 w-[35%] z-10 cursor-pointer"
          title="Double tap to rewind 10s"
        />
        <div 
          onClick={handleRightTap}
          className="absolute top-0 bottom-16 right-0 w-[35%] z-10 cursor-pointer"
          title="Double tap to skip 10s"
        />

        {/* Visual Ripple / Toast on Double-Tap */}
        {skipFeedback === 'rewind' && (
          <div className="absolute left-8 top-1/2 -translate-y-1/2 z-20 bg-black/85 text-white px-3 py-2 rounded-full flex items-center space-x-1.5 shadow-lg animate-fadeIn pointer-events-none">
            <RotateCcw className="w-5 h-5 text-pink-400 animate-spin" />
            <span className="text-xs font-bold font-mono">-10s</span>
          </div>
        )}
        {skipFeedback === 'forward' && (
          <div className="absolute right-8 top-1/2 -translate-y-1/2 z-20 bg-black/85 text-white px-3 py-2 rounded-full flex items-center space-x-1.5 shadow-lg animate-fadeIn pointer-events-none">
            <RotateCw className="w-5 h-5 text-pink-400 animate-spin" />
            <span className="text-xs font-bold font-mono">+10s</span>
          </div>
        )}

        {/* Captions Overlay */}
        {captionsOn && (
          <div className="absolute top-1/4 left-0 right-0 text-center px-4 pointer-events-none z-10">
            <span className="bg-black/85 text-white text-xs sm:text-sm font-semibold px-3 py-1.5 rounded inline-block backdrop-blur-xs max-w-[90%]">
              [NEWS REPORT] “Air traffic control confirmed diversion protocols following mid-flight disturbance...”
            </span>
          </div>
        )}

        {/* Video Title Banner */}
        <div className="absolute top-2.5 left-2.5 right-12 z-10 pointer-events-none">
          <div className="bg-black/85 text-white text-[11px] sm:text-xs font-bold px-2.5 py-1 rounded inline-block line-clamp-1">
            ISRAEL-BOUND PLANE MAKES EMERGENCY LANDING AFTER REPORTED FIGHT
          </div>
        </div>

        {/* Top Right Options */}
        <div className="absolute top-2.5 right-2.5 z-10">
          <button 
            className="touch-target-44 p-2 text-white bg-black/50 hover:bg-black/80 rounded-full"
            aria-label="Video options"
          >
            <MoreVertical className="w-4 h-4" />
          </button>
        </div>

        {/* Center Play/Pause & Skip Controls */}
        <div className="absolute inset-0 flex items-center justify-center space-x-4 sm:space-x-8 z-10 pointer-events-none">
          <button
            onClick={skipBackward}
            className="pointer-events-auto touch-target p-2.5 sm:p-3 text-white/90 hover:text-white bg-black/45 hover:bg-black/65 rounded-full transition-transform active:scale-95"
            aria-label="Rewind 10 seconds"
          >
            <RotateCcw className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>

          <button
            onClick={() => setIsPlaying(!isPlaying)}
            className="pointer-events-auto touch-target p-4 sm:p-5 text-white bg-[#0E5B44]/95 hover:bg-[#0E5B44] border-2 border-white rounded-full transition-transform active:scale-90 shadow-2xl"
            aria-label={isPlaying ? 'Pause video' : 'Play video'}
          >
            {isPlaying ? (
              <Pause className="w-7 h-7 sm:w-8 sm:h-8 fill-current" />
            ) : (
              <Play className="w-7 h-7 sm:w-8 sm:h-8 fill-current translate-x-0.5" />
            )}
          </button>

          <button
            onClick={skipForward}
            className="pointer-events-auto touch-target p-2.5 sm:p-3 text-white/90 hover:text-white bg-black/45 hover:bg-black/65 rounded-full transition-transform active:scale-95"
            aria-label="Forward 10 seconds"
          >
            <RotateCw className="w-5 h-5 sm:w-6 sm:h-6" />
          </button>
        </div>

        {/* Bottom Control Bar with Touch Scrubber */}
        <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black/95 via-black/70 to-transparent p-2.5 sm:p-3 pt-6 z-15 flex flex-col justify-end">
          {/* Touch-Optimized Scrubber Slider */}
          <div className="px-1 mb-2">
            <input
              type="range"
              min={0}
              max={totalDuration}
              value={currentTime}
              onChange={handleSeek}
              className="touch-scrubber w-full bg-white/30"
              aria-label="Video scrubber slider"
            />
          </div>

          <div className="flex items-center justify-between text-white text-xs">
            <div className="flex items-center space-x-3">
              <button 
                onClick={() => setIsMuted(!isMuted)} 
                className="touch-target-44 hover:text-emerald-300"
                aria-label={isMuted ? 'Unmute video' : 'Mute video'}
              >
                {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              </button>
              <span className="font-mono text-[11px] sm:text-xs">
                {formatTime(currentTime)} / {formatTime(totalDuration)}
              </span>
            </div>

            <div className="flex items-center space-x-2 sm:space-x-3">
              <button
                onClick={() => setCaptionsOn(!captionsOn)}
                className={`touch-target-44 px-2 py-0.5 rounded text-xs font-bold border ${
                  captionsOn ? 'bg-white text-black border-white' : 'border-white/50 text-white'
                }`}
                aria-label="Toggle subtitles"
              >
                CC
              </button>
              <button 
                className="touch-target-44 hover:text-emerald-300" 
                aria-label="Fullscreen mode"
              >
                <Maximize className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
