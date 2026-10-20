import React, { useState } from 'react';
import { Play, ExternalLink, Youtube, Award, Sparkles } from 'lucide-react';

export const AmericanaVideo: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const videoId = 'Xu61kDyvnBQ';
  const videoUrl = `https://www.youtube.com/watch?v=${videoId}`;
  const embedUrl = `https://www.youtube-nocookie.com/embed/${videoId}?autoplay=1&rel=0&modestbranding=1`;

  return (
    <section className="my-8 max-w-4xl mx-auto px-3 sm:px-4">
      {/* Section Header with Horizontal Rule */}
      <div className="flex items-center space-x-3 mb-3">
        <div className="flex items-center space-x-1.5">
          <Youtube className="w-5 h-5 text-[#E0292B]" />
          <h2 className="font-headline font-black text-xl sm:text-2xl uppercase tracking-tight text-gray-900 whitespace-nowrap">
            AMERICANA VIDEO
          </h2>
        </div>
        <div className="h-0.5 bg-gray-900 flex-1" />
        <span className="text-[10px] font-black uppercase tracking-wider text-gray-500 hidden sm:inline">
          Special Georgia Wire
        </span>
      </div>

      {/* 16:9 Video Container with Facade Optimization */}
      <div className="relative w-full aspect-video bg-black rounded-xs overflow-hidden shadow-md group">
        {isPlaying ? (
          <iframe
            src={embedUrl}
            title="Stirring the pot over the rightful birthplace of Brunswick stew - WJXT News4JAX"
            className="w-full h-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
            allowFullScreen
          />
        ) : (
          <div 
            onClick={() => setIsPlaying(true)}
            className="relative w-full h-full cursor-pointer overflow-hidden"
          >
            {/* High-Res YouTube Poster with Fallback */}
            <img
              src={`https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`}
              onError={(e) => {
                // Fallback to hqdefault if maxresdefault isn't available
                (e.currentTarget as HTMLImageElement).src = `https://img.youtube.com/vi/${videoId}/hqdefault.jpg`;
              }}
              alt="Stirring the pot over the rightful birthplace of Brunswick stew - WJXT News4JAX"
              width={1280}
              height={720}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-500 filter contrast-105"
            />

            {/* Gradient Scrim */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/30 to-black/40" />

            {/* Top Badge: Dateline & Station Credential */}
            <div className="absolute top-3 left-3 right-3 flex items-center justify-between text-white text-xs">
              <span className="bg-[#E0292B] font-black uppercase text-[10px] sm:text-xs px-2.5 py-1 rounded shadow flex items-center space-x-1.5">
                <span className="w-2 h-2 rounded-full bg-white animate-pulse" />
                <span>BRUNSWICK, GEORGIA DISPATCH</span>
              </span>
              <span className="bg-black/80 backdrop-blur-xs text-[10px] sm:text-xs font-semibold px-2.5 py-1 rounded shadow text-gray-200">
                WJXT News4JAX Special Report
              </span>
            </div>

            {/* Center Play Button with Glow */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-[#E0292B] hover:bg-[#d02527] text-white flex items-center justify-center shadow-2xl transition-all duration-300 group-hover:scale-110 active:scale-95 ring-4 ring-white/30">
                <Play className="w-8 h-8 sm:w-9 sm:h-9 fill-current translate-x-0.5" />
              </div>
            </div>

            {/* Bottom Title & Duration Overlay */}
            <div className="absolute bottom-3 left-3 right-3 text-white">
              <h3 className="font-headline font-black uppercase text-base sm:text-xl md:text-2xl tracking-tight leading-tight drop-shadow-md">
                Stirring the Pot: The Battle for the Birthplace of Brunswick Stew
              </h3>
              <p className="text-gray-200 text-xs sm:text-sm mt-1 line-clamp-1 sm:line-clamp-2 drop-shadow">
                WJXT News4JAX investigates the deep culinary and cultural rivalry between coastal Georgia and Virginia.
              </p>
            </div>
          </div>
        )}
      </div>

      {/* Editorial Deck & Attribution */}
      <div className="mt-3 flex flex-col sm:flex-row sm:items-center justify-between gap-2 text-xs text-gray-600 bg-gray-50 p-3 rounded-xs border border-gray-200">
        <div className="flex items-center space-x-2">
          <Award className="w-4 h-4 text-[#0E5B44] shrink-0" />
          <span>
            <strong className="text-gray-900 font-bold">Local Heritage Wire:</strong> Broadcast report detailing the history of Brunswick, GA where national wires converge.
          </span>
        </div>
        <a
          href={videoUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center space-x-1 text-red-700 hover:text-red-900 font-bold underline shrink-0 touch-target-44 self-start sm:self-auto"
        >
          <span>Watch directly on YouTube</span>
          <ExternalLink className="w-3.5 h-3.5" />
        </a>
      </div>
    </section>
  );
};
