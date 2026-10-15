import React, { useState } from 'react';
import { Menu, X, Search, Mail, Heart, CheckCircle2, Inbox } from 'lucide-react';
import { Category } from '../types';

interface HeaderProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onOpenSupport: () => void;
  onOpenSubscriberModal: () => void;
  onOpenEmailInbox: () => void;
  dispatchedEmailsCount: number;
  searchQuery: string;
  onSearchChange: (q: string) => void;
  onOpenSubmitTip: () => void;
  onViewArchive: () => void;
}

export const Header: React.FC<HeaderProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenSupport,
  onOpenSubscriberModal,
  onOpenEmailInbox,
  dispatchedEmailsCount,
  searchQuery,
  onSearchChange,
  onOpenSubmitTip,
  onViewArchive,
}) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [showSearchInput, setShowSearchInput] = useState(false);

  const categories: Category[] = [
    'All',
    'Politics',
    'Latest News',
    'Life',
    'Entertainment',
    'Shopping',
    'Voices',
    'Business & Tech'
  ];

  return (
    <>
      <header className="sticky top-0 z-40 bg-[#0E5B44] text-white shadow-md">
        {/* Main Header Bar */}
        <div className="max-w-7xl mx-auto px-3 sm:px-6 h-14 sm:h-16 flex items-center justify-between">
          {/* Left: Mobile Drawer Button & Search */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            <button
              onClick={() => setDrawerOpen(true)}
              className="p-1.5 hover:bg-[#083c2d] rounded-md transition-colors"
              aria-label="Open menu"
            >
              <Menu className="w-6 h-6 text-white" />
            </button>
            <button
              onClick={() => setShowSearchInput(!showSearchInput)}
              className="p-1.5 hover:bg-[#083c2d] rounded-md transition-colors"
              aria-label="Toggle search"
            >
              <Search className="w-5 h-5 text-emerald-100 hover:text-white" />
            </button>
          </div>

          {/* Center: Signature HuffPost-Style Logo */}
          <div className="flex-1 text-center sm:text-left sm:ml-4">
            <button
              onClick={() => {
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="inline-block text-left group"
            >
              <span className="font-logo text-2xl sm:text-3xl md:text-4xl tracking-tighter text-white font-black group-hover:opacity-95 transition-opacity">
                AMERICANA DIGEST
              </span>
            </button>
          </div>

          {/* Right: Support Us & Subscriber Actions */}
          <div className="flex items-center space-x-2 sm:space-x-3">
            {/* Automated Dispatch Email Inbox Viewer Button */}
            <button
              onClick={onOpenEmailInbox}
              className="relative p-1.5 hover:bg-[#083c2d] rounded-full text-emerald-100 hover:text-white transition-colors"
              title="View automated emails from support@americanadigest.blog"
            >
              <Inbox className="w-5 h-5" />
              {dispatchedEmailsCount > 0 && (
                <span className="absolute -top-1 -right-1 bg-[#F02D5E] text-white text-[10px] font-bold w-4 h-4 rounded-full flex items-center justify-center animate-pulse">
                  {dispatchedEmailsCount}
                </span>
              )}
            </button>

            {/* Support Us Button (Exact HuffPost Pink Pill) */}
            <button
              onClick={onOpenSupport}
              className="bg-[#F02D5E] hover:bg-[#d92250] text-white font-extrabold text-xs sm:text-sm px-3.5 sm:px-5 py-1.5 rounded-full uppercase tracking-wider shadow-sm transition-transform active:scale-95"
            >
              SUPPORT US
            </button>

            {/* Subscribe / Log In */}
            <button
              onClick={onOpenSubscriberModal}
              className="hidden sm:inline-block text-white text-xs sm:text-sm font-semibold hover:underline px-2 py-1"
            >
              Subscribe Free
            </button>
          </div>
        </div>

        {/* Search Expansion Bar */}
        {showSearchInput && (
          <div className="bg-[#083c2d] px-4 py-2 border-t border-[#0e5b44]">
            <div className="max-w-2xl mx-auto flex items-center space-x-2">
              <Search className="w-4 h-4 text-emerald-300" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => onSearchChange(e.target.value)}
                placeholder="Search 3,000+ investigative articles, midterms, labor, economy..."
                className="w-full bg-white/10 text-white placeholder-emerald-200 text-sm px-3 py-1.5 rounded focus:outline-none focus:ring-1 focus:ring-white"
                autoFocus
              />
              {searchQuery && (
                <button
                  onClick={() => onSearchChange('')}
                  className="text-xs text-emerald-300 hover:text-white"
                >
                  Clear
                </button>
              )}
            </div>
          </div>
        )}

        {/* Desktop Category Navigation */}
        <nav className="hidden md:block bg-[#083c2d] border-t border-emerald-900/60 overflow-x-auto">
          <div className="max-w-7xl mx-auto px-6 flex items-center justify-between text-xs font-bold uppercase tracking-wider text-emerald-100">
            <div className="flex items-center space-x-6 py-2.5">
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => onSelectCategory(cat)}
                  className={`transition-colors whitespace-nowrap hover:text-white ${
                    currentCategory === cat ? 'text-white border-b-2 border-white pb-0.5' : 'text-emerald-200/90'
                  }`}
                >
                  {cat === 'All' ? 'HOME' : cat}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-4 pl-4 border-l border-emerald-800">
              <button
                onClick={onViewArchive}
                className="text-emerald-300 hover:text-white font-extrabold flex items-center space-x-1"
              >
                <span>3,000 ARCHIVE (90 DAYS)</span>
              </button>
              <button
                onClick={onOpenSubmitTip}
                className="text-yellow-300 hover:text-yellow-100 font-extrabold"
              >
                SUBMIT A TIP
              </button>
            </div>
          </div>
        </nav>
      </header>

      {/* Mobile / Slide-Out Drawer Navigation */}
      {drawerOpen && (
        <div className="fixed inset-0 z-50 flex">
          <div
            className="fixed inset-0 bg-black/60 backdrop-blur-xs transition-opacity"
            onClick={() => setDrawerOpen(false)}
          />
          <div className="relative w-80 max-w-[85vw] bg-[#0E5B44] text-white flex flex-col h-full shadow-2xl z-10">
            {/* Drawer Header */}
            <div className="p-4 border-b border-emerald-800 flex items-center justify-between">
              <span className="font-logo text-xl italic font-black">AMERICANA DIGEST</span>
              <button
                onClick={() => setDrawerOpen(false)}
                className="p-1 hover:bg-[#083c2d] rounded-md"
              >
                <X className="w-6 h-6 text-white" />
              </button>
            </div>

            {/* Subscriber Quick Box */}
            <div className="p-4 bg-[#083c2d] border-b border-emerald-800">
              <p className="text-xs text-emerald-200 mb-2">Automated Morning Intelligence Brief</p>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSubscriberModal();
                }}
                className="w-full bg-[#F02D5E] text-white font-bold text-xs py-2 px-3 rounded-full uppercase tracking-wider flex items-center justify-center space-x-1.5"
              >
                <Mail className="w-3.5 h-3.5" />
                <span>Join Subscriber Dispatch</span>
              </button>
              <p className="text-[11px] text-emerald-300/80 mt-1.5 text-center">
                Dispatched from support@americanadigest.blog
              </p>
            </div>

            {/* Category Links */}
            <div className="flex-1 overflow-y-auto py-2">
              <div className="px-4 py-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Editorial Categories
              </div>
              {categories.map((cat) => (
                <button
                  key={cat}
                  onClick={() => {
                    onSelectCategory(cat);
                    setDrawerOpen(false);
                  }}
                  className={`w-full text-left px-5 py-3 text-sm font-bold uppercase tracking-wide border-b border-emerald-800/40 hover:bg-[#083c2d] transition-colors flex items-center justify-between ${
                    currentCategory === cat ? 'bg-[#083c2d] text-white' : 'text-emerald-100'
                  }`}
                >
                  <span>{cat === 'All' ? 'Top Stories / Frontpage' : cat}</span>
                  {currentCategory === cat && <span className="w-2 h-2 rounded-full bg-white" />}
                </button>
              ))}

              <div className="px-4 pt-4 pb-2 text-[11px] font-bold uppercase tracking-wider text-emerald-300">
                Special Desks & Tools
              </div>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onViewArchive();
                }}
                className="w-full text-left px-5 py-3 text-sm font-bold text-emerald-200 hover:bg-[#083c2d] flex items-center justify-between"
              >
                <span>3,000 Articles Archive (Last 90 Days)</span>
                <span className="text-xs bg-emerald-800 text-emerald-200 px-2 py-0.5 rounded">3,000</span>
              </button>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenSubmitTip();
                }}
                className="w-full text-left px-5 py-3 text-sm font-bold text-yellow-300 hover:bg-[#083c2d]"
              >
                Submit A Confidential Tip
              </button>
              <button
                onClick={() => {
                  setDrawerOpen(false);
                  onOpenEmailInbox();
                }}
                className="w-full text-left px-5 py-3 text-sm font-bold text-emerald-200 hover:bg-[#083c2d] flex items-center justify-between"
              >
                <span>Automated Email Dispatch Box</span>
                {dispatchedEmailsCount > 0 && (
                  <span className="text-xs bg-[#F02D5E] text-white px-2 py-0.5 rounded-full">
                    {dispatchedEmailsCount} New
                  </span>
                )}
              </button>
            </div>

            {/* Drawer Footer */}
            <div className="p-4 bg-[#083c2d] border-t border-emerald-800 text-xs text-emerald-300">
              <p className="font-semibold text-white">Americana Digest Editorial Bureau</p>
              <p className="text-[11px] text-emerald-400 mt-1">support@americanadigest.blog</p>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
