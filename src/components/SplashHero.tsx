import React from 'react';
import { Article } from '../types';

interface SplashHeroProps {
  leadArticle: Article;
  onOpenArticle: (article: Article) => void;
  onSelectSubHeadline?: (headline: string) => void;
}

export const SplashHero: React.FC<SplashHeroProps> = ({
  leadArticle,
  onOpenArticle,
  onSelectSubHeadline
}) => {
  return (
    <section className="bg-white pt-2.5 sm:pt-4 pb-5 sm:pb-6 border-b border-gray-200">
      <div className="max-w-4xl mx-auto px-3.5 sm:px-4 text-center">
        {/* The Signature HuffPost Splash Stacked Headline with Fluid Typography */}
        <div 
          onClick={() => onOpenArticle(leadArticle)}
          className="cursor-pointer group select-none transition-transform hover:scale-[1.005] active:scale-[0.995]"
        >
          <h1 className="font-headline font-black uppercase splash-title-fluid tracking-tight">
            {/* Line 1: Vibrant Red */}
            <span className="block text-[#E0292B] group-hover:opacity-90">
              YIKES: SPACEX SCREWS UKRAINE
            </span>
            
            {/* Line 2: Royal Blue */}
            <span className="block text-[#1565C0] group-hover:opacity-90 mt-0.5 sm:mt-1">
              UPDATE: MUSK BLAMES GOV'T
            </span>

            {/* Line 3: Black Italic */}
            <span className="block text-[#121212] italic group-hover:opacity-90 mt-0.5 sm:mt-1 font-black">
              FEAR: DON STACKING THE DECK
            </span>
          </h1>
        </div>

        {/* Split Hero Image: Zelenskyy & Musk with fetchpriority="high" for Sub-second LCP */}
        <div 
          onClick={() => onOpenArticle(leadArticle)}
          className="mt-3.5 sm:mt-6 cursor-pointer overflow-hidden rounded-xs border border-gray-100 shadow-xs relative group"
        >
          <div className="grid grid-cols-2 divide-x-2 divide-white aspect-16/10 sm:aspect-16/9 w-full bg-gray-100">
            {/* Left: Volodymyr Zelenskyy */}
            <div className="relative overflow-hidden">
              <img
                src="/images/zelenskyy.jpg"
                alt="President Volodymyr Zelenskyy"
                width={640}
                height={360}
                fetchPriority="high"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500"
              />
              <div className="absolute bottom-1.5 left-1.5 sm:bottom-2 sm:left-2 bg-black/80 backdrop-blur-xs text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow">
                Volodymyr Zelenskyy
              </div>
            </div>

            {/* Right: Elon Musk */}
            <div className="relative overflow-hidden">
              <img
                src="/images/elon-musk.jpg"
                alt="Elon Musk"
                width={640}
                height={360}
                fetchPriority="high"
                className="w-full h-full object-cover object-top group-hover:scale-102 transition-transform duration-500 filter contrast-105"
              />
              <div className="absolute bottom-1.5 right-1.5 sm:bottom-2 sm:right-2 bg-black/80 backdrop-blur-xs text-white text-[9px] sm:text-xs font-semibold px-2 py-0.5 sm:px-2.5 sm:py-1 rounded shadow">
                Elon Musk
              </div>
            </div>
          </div>
        </div>

        {/* Sub-headline lead deck */}
        <div className="mt-3.5 sm:mt-4 text-left sm:text-center">
          <button
            onClick={() => onOpenArticle(leadArticle)}
            className="text-left font-headline font-black uppercase text-lg sm:text-2xl md:text-3xl text-gray-900 hover:text-[#0E5B44] transition-colors tracking-tight leading-snug"
          >
            LATEST UPDATES: Trump Appeals Press Ban Ruling, DOJ Threatens Bar Assoc., Harris Campaign Trail Blitz, MORE...
          </button>
          <p className="text-gray-600 text-xs sm:text-sm mt-1 sm:mt-1.5 font-normal max-w-2xl mx-auto leading-relaxed">
            Diplomatic wires boil over as satellite communication throttling impacts frontlines while Washington gears up for explosive congressional oversight battles.
          </p>
        </div>
      </div>
    </section>
  );
};
