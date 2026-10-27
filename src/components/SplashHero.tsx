import React from 'react';
import { Eye, Heart, MessageSquare, Flame } from 'lucide-react';
import { Article } from '../types';

interface SplashHeroProps {
  leadArticle: Article;
  onOpenArticle: (article: Article) => void;
  onSelectSubHeadline?: (headline: string) => void;
}

export const SplashHero: React.FC<SplashHeroProps> = ({
  leadArticle,
  onOpenArticle,
}) => {
  return (
    <section className="bg-white pt-2.5 sm:pt-4 pb-5 sm:pb-6 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-4 text-center">
        {/* The Signature Splash Stacked Headline with Fluid Typography */}
        <div 
          onClick={() => onOpenArticle(leadArticle)}
          className="cursor-pointer group select-none transition-transform hover:scale-[1.005] active:scale-[0.995]"
        >
          <h1 className="font-headline font-black uppercase splash-title-fluid tracking-tight">
            {/* Line 1: Vibrant Red */}
            <span className="block text-[#E0292B] group-hover:opacity-90">
              OPINION & INVESTIGATION: JACK WHIGHAM
            </span>
            
            {/* Line 2: Royal Blue */}
            <span className="block text-[#1565C0] group-hover:opacity-90 mt-0.5 sm:mt-1">
              THE GROWING CRISIS OF FAKE PROFILES
            </span>

            {/* Line 3: Black Italic */}
            <span className="block text-[#121212] italic group-hover:opacity-90 mt-0.5 sm:mt-1 font-black">
              A CALL FOR META TO PROTECT ITS USERS
            </span>
          </h1>
        </div>

        {/* Uploaded Header Image: Jack Whigham editorial portrait with fetchpriority="high" for Sub-second LCP */}
        <div 
          onClick={() => onOpenArticle(leadArticle)}
          className="mt-3.5 sm:mt-5 cursor-pointer overflow-hidden rounded-xs border border-gray-200 shadow-sm relative group bg-neutral-950 max-w-2xl mx-auto"
        >
          <div className="relative aspect-[4/5] sm:aspect-[16/11] md:aspect-[16/10] w-full overflow-hidden flex items-center justify-center">
            <img
              src={leadArticle.imageUrl}
              alt={leadArticle.title}
              width={1000}
              height={1250}
              fetchPriority="high"
              decoding="async"
              className="w-full h-full object-cover object-[center_28%] group-hover:scale-102 transition-transform duration-500 filter contrast-105"
            />
            {/* Subtle Gradient Scrim for Readability of Badges */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-transparent to-black/25 pointer-events-none" />

            {/* Top-Left Live Alert Ribbon */}
            <div className="absolute top-2 left-2 sm:top-3 sm:left-3 bg-[#E0292B] text-white text-[10px] sm:text-xs font-black uppercase px-2.5 py-1 rounded shadow flex items-center space-x-1.5">
              <span className="w-2 h-2 rounded-full bg-white animate-ping" />
              <span>EXCLUSIVE OP-ED</span>
            </div>

            {/* Bottom Photo Dateline & Image Credit Attribution */}
            <div className="absolute bottom-2 left-2 right-2 sm:bottom-3 sm:left-3 sm:right-3 flex items-center justify-between text-white text-[10px] sm:text-xs">
              <div className="bg-black/85 backdrop-blur-xs font-semibold px-2.5 py-1 rounded shadow">
                Jack Whigham • Author & Journalist
              </div>
              <div className="bg-black/85 backdrop-blur-xs text-gray-300 px-2.5 py-1 rounded shadow hidden xs:block">
                Image credit: Mine
              </div>
            </div>
          </div>
        </div>

        {/* Viral Engagement Stats Bar: Realistic Authentic Counters */}
        <div 
          onClick={() => onOpenArticle(leadArticle)}
          className="cursor-pointer mt-3 sm:mt-3.5 py-2 sm:py-2.5 px-3 sm:px-5 bg-gray-50 hover:bg-gray-100/80 border border-gray-200 rounded-xs flex flex-wrap items-center justify-between gap-2 text-xs sm:text-sm font-bold text-gray-700 transition-colors"
        >
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-gray-900">
            <Eye className="w-4 h-4 text-[#0E5B44]" />
            <span><strong className="text-black font-black font-mono">{(leadArticle.viewsCount || 41839274).toLocaleString()}</strong> Views</span>
          </div>
          
          <div className="flex items-center space-x-1.5 sm:space-x-2 text-[#F02D5E]">
            <Heart className="w-4 h-4 fill-current text-[#F02D5E]" />
            <span><strong className="font-black font-mono">{(leadArticle.likesCount || 2148693).toLocaleString()}</strong> Love</span>
          </div>

          <div className="flex items-center space-x-1.5 sm:space-x-2 text-blue-700">
            <MessageSquare className="w-4 h-4 text-blue-600" />
            <span><strong className="font-black font-mono">{(leadArticle.commentsCount || 2041892).toLocaleString()}</strong> Comments</span>
          </div>

          <div className="hidden sm:flex items-center space-x-1 text-emerald-800 bg-emerald-100/80 px-2 py-0.5 rounded text-[11px] font-black uppercase tracking-wider">
            <Flame className="w-3.5 h-3.5 text-orange-600 fill-current" />
            <span>Trending Worldwide</span>
          </div>
        </div>

        {/* Sub-headline lead deck */}
        <div className="mt-3.5 sm:mt-4 text-left sm:text-center">
          <button
            onClick={() => onOpenArticle(leadArticle)}
            className="text-left font-headline font-black uppercase text-lg sm:text-2xl md:text-3xl text-gray-900 hover:text-[#0E5B44] transition-colors tracking-tight leading-snug"
          >
            AUTHOR & JOURNALIST JACK WHIGHAM: THE GROWING CRISIS OF FAKE PROFILES DEMANDS META PROTECT ITS USERS
          </button>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-1.5 font-normal max-w-2xl mx-auto leading-relaxed">
            "Stealing someone's identity is more than using their name or photo without permission — it steals trust, damages reputations, and leaves real victims behind." Jack Whigham issues an urgent dispatch calling on Meta to take corporate responsibility and reform scam enforcement.
          </p>
        </div>
      </div>
    </section>
  );
};
