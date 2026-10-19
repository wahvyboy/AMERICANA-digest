import React, { useState, useEffect } from 'react';
import { Menu, X, Search, Mail, Heart } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onOpenSupport: () => void;
  onOpenSubscriberModal: () => void;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSubmitTip: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSupport,
  onOpenSubscriberModal,
  searchQuery,
  onSearchChange,
  onOpenSubmitTip,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  // Lock body scroll when drawer is open on mobile
  useEffect(() => {
    if (drawerOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [drawerOpen]);

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
      <header className="sticky top-0 z-40 bg-[#0E5B44] text-white shadow-md">
        {/* Main Header Bar with safe-area padding */}
        <div className="max-w-7xl mx-auto px-2.5 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Mobile Drawer Button & Search with 48px touch targets */}
          <div className="flex items-center space-x-1 sm:space-x-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-2 sm:p-2.5 hover:bg-[#083c2d] active:bg-[#062c20] rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="p-2 sm:p-2.5 hover:bg-[#083c2d] active:bg-[#062c20] rounded-md transition-colors min-w-[44px] min-h-[44px] flex items-center justify-center"
              aria-label="Toggle search"
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
              <span className="font-logo text-xl sm:text-3xl md:text-4xl tracking-tighter text-white font-black group-hover:opacity-95 transition-opacity whitespace-nowrap">
                AMERICANA DIGEST
              </span>
            </a>
          </div>

          {/* Right: Support Us & Subscriber Actions */}
          <div className="flex items-center space-x-1.5 sm:space-x-3">
            {/* Support Us Button */}
            <button
              onClick={onOpenSupport}
              className="bg-[#F02D5E] hover:bg-[#d92250] text-white font-extrabold text-xs sm:text-sm px-3 sm:px-5 py-2 sm:py-1.5 rounded-full uppercase tracking-wider shadow-sm transition-transform active:scale-95 flex items-center space-x-1 min-h-[38px]"
            >
              <Heart className="w-3.5 h-3.5 fill-current hidden sm:inline" />
              <span>SUPPORT</span>
            </button>

            {/* Subscribe Free */}
            <button
              onClick={onOpenSubscriberModal}
              className="bg-emerald-800 hover:bg-emerald-700 text-white text-xs sm:text-sm font-bold px-3 py-2 sm:py-1.5 rounded-full uppercase tracking-wider flex items-center space-x-1.5 min-h-[38px]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span className="hidden sm:inline">Subscribe</span>
            </button>
          </div>
        </div>

        {/* Search Expansion Bar */}
        {showSearchInput && (
          <div className="bg-[#083c2d] px-3 sm:px-4 py-2.5 border-t border-[#0e5b44] animate-fadeIn">
            <div className="max-w-2xl mx-auto flex items-center space-x-2">
              <Search className="w-4 h-4 text-emerald-300 shrink-0" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search investigative articles, midterms, labor, economy..."
                className="w-full bg-white/10 text-white placeholder-emerald-200 text-sm px-3 py-2 rounded focus:outline-none focus:ring-1 focus:ring-white"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-emerald-300 hover:text-white px-2 py-1"
                >
                  Clear
                </button>
              )}
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
                className="text-yellow-300 hover:text-yellow-100 font-extrabold flex items-center space-x-1 py-1"
              >
                <span>SUBMIT A TIP</span>
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile / Slide-Out Drawer Navigation */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/70 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-[#0E5B44] text-white flex flex-col h-full shadow-2xl z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-emerald-800 flex items-center justify-between">
              <span className="font-logo text-xl italic font-black">AMERICANA DIGEST</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-2 hover:bg-[#083c2d] rounded-md min-w-[44px] min-h-[44px] flex items-center justify-center"
                aria-label="Close menu"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Subscriber Quick Box */}
            <div className="p-4 bg-[#083c2d] border-b border-emerald-800">
              <p className="text-xs text-emerald-200 mb-2">Morning Intelligence Brief</p>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSubscriberModal();
                }}
                className="w-full bg-[#F02D5E] text-white font-bold text-xs py-2.5 px-3 rounded-full uppercase tracking-wider flex items-center justify-center space-x-1.5 min-h-[44px]"
              >
                <Mail className="w-4 h-4" />
                <span>Join Subscriber Dispatch</span>
              </button>
              <p className="text-[11px] text-emerald-300/80 mt-1.5 text-center">
                Contact: support@americanadigest.blog
              </p>
            </div>

            {/* Category Links */}
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
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
                    currentCategory === cat.value ? 'bg-[#083c2d] text-white' : 'text-emerald-100'
                  }`}
                >
                  <span>{cat.label}</span>
                  {currentCategory === cat.value && <span className="w-2 h-2 rounded-full bg-white" />}
                </a>
              ))}

              <div className="px-4 pt-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Newsroom Access
              </div>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSubmitTip();
                }}
                className="w-full text-left px-5 py-3.5 text-sm font-bold text-yellow-300 hover:bg-[#083c2d] active:bg-[#062c20] min-h-[48px] flex items-center"
              >
                Submit A Confidential Tip
              </button>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSupport();
                }}
                className="w-full text-left px-5 py-3.5 text-sm font-bold text-pink-300 hover:bg-[#083c2d] active:bg-[#062c20] min-h-[48px] flex items-center"
              >
                Support Independent Journalism
              </button>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#083c2d] border-t border-emerald-800 text-xs text-emerald-300">
              <p className="font-semibold text-white">Americana Digest Editorial Bureau</p>
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
