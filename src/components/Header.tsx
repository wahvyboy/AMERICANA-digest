import React, { useState, useEffect, useRef } from 'react';
import { Menu, X, Search, Mail, Heart, ArrowRight } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onOpenSupport: () => void;
  onOpenSubscriberModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSubmitTip: () => void;
  drawerOpen?: boolean;
  onToggleDrawer?: (open: boolean) => void;
  showSearchInput?: boolean;
  onToggleSearchInput?: (show: boolean) => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSupport,
  onOpenSubscriberModal,
  searchQuery,
  onSearchChange,
  onOpenSubmitTip,
  drawerOpen: controlledDrawerOpen,
  onToggleDrawer,
  showSearchInput: controlledShowSearch,
  onToggleSearchInput,
}) => {
  const [internalDrawerOpen, setInternalDrawerOpen] = useState(false);
  const [internalShowSearch, setInternalShowSearch] = useState(false);
  const searchInputRef = useRef<HTMLInputElement>(null);

  const isDrawerOpen = controlledDrawerOpen !== undefined ? controlledDrawerOpen : internalDrawerOpen;
  const setDrawerOpen = (open: boolean) => {
    if (onToggleDrawer) onToggleDrawer(open);
    setInternalDrawerOpen(open);
  };

  const isSearchOpen = controlledShowSearch !== undefined ? controlledShowSearch : internalShowSearch;
  const setSearchOpen = (open: boolean) => {
    if (onToggleSearchInput) onToggleSearchInput(open);
    setInternalShowSearch(open);
  };

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (isDrawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isDrawerOpen]);

  // Focus input when search bar opens
  useEffect(() => {
    if (isSearchOpen) {
      setTimeout(() => {
        searchInputRef.current?.focus();
      }, 100);
    }
  }, [isSearchOpen]);

  // Touch swipe handling for drawer
  const touchStartXRef = useRef<number | null>(null);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartXRef.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartXRef.current !== null) {
      const touchEndX = e.changedTouches[0].clientX;
      const deltaX = touchEndX - touchStartXRef.current;
      // If swiped left by more than 50px, close drawer
      if (deltaX < -50) {
        setDrawerOpen(false);
      }
      touchStartXRef.current = null;
    }
  };

  // Active editorial categories matching real published coverage
  const categories: { label: string; value: Category; path: string }[] = [
    { label: 'HOME', value: 'All', path: '/' },
    { label: 'POLITICS', value: 'Politics', path: '/politics' },
    { label: 'LATEST NEWS', value: 'Latest News', path: '/latest-news' },
    { label: 'LIFE', value: 'Life', path: '/life' },
    { label: 'SHOPPING', value: 'Shopping', path: '/shopping' },
    { label: 'BUSINESS & TECH', value: 'Business & Tech', path: '/business-tech' }
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0E5B44] text-white shadow-md pt-safe">
        {/* Main Header Bar with safe-area padding & 48px touch targets */}
        <div className="max-w-7xl mx-auto px-2 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Mobile Drawer Button & Search with 48px min touch targets */}
          <div className="flex items-center space-x-1 sm:space-x-2">
            <button
              onClick={() => setDrawerOpen(true)}
              className="touch-target p-2 sm:p-2.5 hover:bg-[#083c2d] active:bg-[#062c20] rounded-md transition-colors"
              aria-label="Open navigation menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setSearchOpen(!isSearchOpen)}
              className="touch-target p-2 sm:p-2.5 hover:bg-[#083c2d] active:bg-[#062c20] rounded-md transition-colors"
              aria-label="Toggle search input"
            >
              <Search className="w-5 h-5 text-emerald-100 hover:text-white" />
            </button>
          </div>

          {/* Center: Signature HuffPost-Style Logo */}
          <div className="flex-1 text-center sm:text-left sm:ml-4">
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block text-left group py-1"
            >
              <span className="font-logo text-lg sm:text-3xl md:text-4xl tracking-tighter text-white font-black group-hover:opacity-95 transition-opacity whitespace-nowrap">
                AMERICANA DIGEST
              </span>
            </a>
          </div>

          {/* Right: Support Us & Subscriber Actions with ergonomic touch areas */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Support Us Button */}
            <button
              onClick={onOpenSupport}
              className="bg-[#F02D5E] hover:bg-[#d92250] active:scale-95 text-white font-black text-xs sm:text-sm px-3 sm:px-4 py-2 sm:py-2 rounded-full uppercase tracking-wider shadow-sm transition-transform flex items-center space-x-1 min-h-[44px]"
              aria-label="Support Independent Journalism"
            >
              <Heart className="w-3.5 h-3.5 fill-current hidden sm:inline" />
              <span>SUPPORT</span>
            </button>

            {/* Subscribe Free Button */}
            <button
              onClick={onOpenSubscriberModal}
              className="bg-emerald-800 hover:bg-emerald-700 active:scale-95 text-white text-xs sm:text-sm font-bold px-3 sm:px-4 py-2 sm:py-2 rounded-full uppercase tracking-wider flex items-center space-x-1.5 min-h-[44px]"
              aria-label="Subscribe to free dispatch"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Subscribe</span>
            </button>
          </div>
        </div>

        {/* Responsive Search Expansion Bar */}
        {isSearchOpen && (
          <div className="bg-[#083c2d] px-3 sm:px-6 py-2.5 border-t border-[#0e5b44] animate-fadeIn">
            <div className="max-w-3xl mx-auto flex items-center space-x-2">
              <Search className="w-5 h-5 text-emerald-300 shrink-0" />
              <input
                ref={searchInputRef}
                type="search"
                inputMode="search"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search investigative articles, midterms, labor, economy..."
                className="w-full bg-white/10 text-white placeholder-emerald-200/80 text-sm sm:text-base px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-white"
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="touch-target-44 text-xs font-semibold text-emerald-300 hover:text-white px-2"
                  aria-label="Clear search text"
                >
                  Clear
                </button>
              )}
              <button
                onClick={() => setSearchOpen(false)}
                className="touch-target-44 text-xs font-bold text-white bg-white/15 hover:bg-white/25 px-3 rounded"
                aria-label="Close search bar"
              >
                Close
              </button>
            </div>
          </div>
        )}

        {/* Desktop Category Navigation */}
        <nav className="hidden md:block bg-[#083c2d] border-t border-emerald-900/60 overflow-x-auto" aria-label="Main Navigation">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-100">
            <div className="flex items-center space-x-6 py-2.5">
              {categories.map((cat) => (
                <a
                  key={cat.value}
                  href={cat.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory(cat.value);
                  }}
                  className={`transition-colors whitespace-nowrap hover:text-white py-1 ${
                    currentCategory === cat.value ? 'text-white border-b-2 border-white pb-0.5' : 'text-emerald-200/90'
                  }`}
                >
                  {cat.label}
                </a>
              ))}
            </div>

            <div className="flex items-center space-x-4 pl-4 border-l border-emerald-800">
              <button
                onClick={onOpenSubmitTip}
                className="text-yellow-300 hover:text-yellow-100 font-extrabold flex items-center space-x-1 py-1 min-h-[36px]"
              >
                <span>SUBMIT A TIP</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile / Slide-Out Drawer Navigation with Smooth Slide Transition & Backdrop Blur */}
      {isDrawerOpen && (
        <div 
          className="fixed inset-0 z-50 flex animate-fadeIn"
          onTouchStart={handleTouchStart}
          onTouchEnd={handleTouchEnd}
        >
          {/* Backdrop Blur Dismissal */}
          <div
            className="fixed inset-0 bg-black/75 backdrop-blur-xs transition-opacity duration-300"
            onClick={() => setDrawerOpen(false)}
            aria-hidden="true"
          />

          {/* Drawer Sliding Sheet */}
          <div className="relative w-80 max-w-[85vw] bg-[#0E5B44] text-white flex flex-col h-full shadow-2xl z-10 pt-safe pb-safe transform transition-transform duration-300 ease-out">
            {/* Drawer Header */}
            <div className="p-4 border-b border-emerald-800 flex items-center justify-between">
              <span className="font-logo text-xl italic font-black">AMERICANA DIGEST</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="touch-target p-2 hover:bg-[#083c2d] active:bg-[#062c20] rounded-md transition-colors"
                aria-label="Close menu drawer"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Subscriber Quick Box */}
            <div className="p-4 bg-[#083c2d] border-b border-emerald-800">
              <p className="text-xs text-emerald-200 font-semibold mb-2">Morning Intelligence Brief</p>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSubscriberModal();
                }}
                className="w-full bg-[#F02D5E] hover:bg-[#d92250] text-white font-black text-xs py-3 px-3 rounded-full uppercase tracking-wider flex items-center justify-center space-x-1.5 min-h-[48px] shadow transition-transform active:scale-95"
              >
                <Mail className="w-4 h-4" />
                <span>Join Subscriber Dispatch</span>
              </button>
              <p className="text-[11px] text-emerald-300/80 mt-1.5 text-center">
                Official Desk: support@americanadigest.blog
              </p>
            </div>

            {/* Category Links with 48px min touch height */}
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-2 text-[11px] font-black uppercase tracking-wider text-emerald-300">
                Editorial Categories
              </div>
              {categories.map((cat) => (
                <a
                  key={cat.value}
                  href={cat.path}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectCategory(cat.value);
                    setDrawerOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3.5 text-sm font-bold uppercase tracking-wide border-b border-emerald-800/40 hover:bg-[#083c2d] active:bg-[#062c20] transition-colors flex items-center justify-between min-h-[48px] ${
                    currentCategory === cat.value ? 'bg-[#083c2d] text-white font-black' : 'text-emerald-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  {currentCategory === cat.value ? (
                    <span className="w-2.5 h-2.5 rounded-full bg-white shadow-xs" />
                  ) : (
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-400 opacity-60" />
                  )}
                </a>
              ))}

              <div className="px-4 pt-4 pb-2 text-[11px] font-black uppercase tracking-wider text-emerald-300">
                Newsroom Access
              </div>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSubmitTip();
                }}
                className="w-full text-left px-5 py-3.5 text-sm font-bold text-yellow-300 hover:bg-[#083c2d] active:bg-[#062c20] min-h-[48px] flex items-center justify-between border-b border-emerald-800/40"
              >
                <span>Submit A Confidential Tip</span>
                <span className="text-xs bg-yellow-400/20 px-2 py-0.5 rounded text-yellow-200">24/7 Desk</span>
              </button>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSupport();
                }}
                className="w-full text-left px-5 py-3.5 text-sm font-bold text-pink-300 hover:bg-[#083c2d] active:bg-[#062c20] min-h-[48px] flex items-center justify-between border-b border-emerald-800/40"
              >
                <span>Support Independent Press</span>
                <Heart className="w-4 h-4 text-pink-400 fill-current" />
              </button>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#083c2d] border-t border-emerald-800 text-xs text-emerald-300">
              <p className="font-bold text-white">Americana Digest Editorial Bureau</p>
              <a href="mailto:support@americanadigest.blog" className="text-[11px] text-emerald-400 mt-1 block hover:underline">
                support@americanadigest.blog
              </a>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
