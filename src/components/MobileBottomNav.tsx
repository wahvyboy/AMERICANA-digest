import React from 'react';
import { Home, Compass, Search, Mail, ShieldAlert } from 'lucide-react';
import { Category } from '../types';

interface MobileBottomNavProps {
  currentCategory: Category;
  onSelectCategory: (cat: Category) => void;
  onOpenDrawer: () => void;
  onToggleSearch: () => void;
  onOpenSubscribe: () => void;
  onOpenTip: () => void;
}

export const MobileBottomNav: React.FC<MobileBottomNavProps> = ({
  currentCategory,
  onSelectCategory,
  onOpenDrawer,
  onToggleSearch,
  onOpenSubscribe,
  onOpenTip,
}) => {
  return (
    <nav
      className="md:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#0E5B44]/95 backdrop-blur-md border-t border-emerald-800/80 shadow-[0_-4px_20px_rgba(0,0,0,0.25)] text-white"
      style={{ paddingBottom: 'max(env(safe-area-inset-bottom, 0px), 6px)' }}
      aria-label="Mobile Quick Actions"
    >
      <div className="grid grid-cols-5 h-14 items-stretch px-1">
        {/* 1. Home */}
        <button
          onClick={() => {
            onSelectCategory('All');
            window.scrollTo({ top: 0, behavior: 'smooth' });
          }}
          className={`flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 transition-all active:scale-95 ${
            currentCategory === 'All' ? 'text-white' : 'text-emerald-200/80 hover:text-white'
          }`}
          aria-label="Frontpage Home"
        >
          <Home className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-black tracking-tight uppercase leading-tight">
            Home
          </span>
          {currentCategory === 'All' && (
            <span className="w-1.5 h-1.5 rounded-full bg-white mt-0.5" />
          )}
        </button>

        {/* 2. Desks (Drawer) */}
        <button
          onClick={onOpenDrawer}
          className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 text-emerald-200/80 hover:text-white transition-all active:scale-95"
          aria-label="Open Editorial Desks"
        >
          <Compass className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-black tracking-tight uppercase leading-tight">
            Desks
          </span>
        </button>

        {/* 3. Search */}
        <button
          onClick={onToggleSearch}
          className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 text-emerald-200/80 hover:text-white transition-all active:scale-95"
          aria-label="Search articles"
        >
          <Search className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-black tracking-tight uppercase leading-tight">
            Search
          </span>
        </button>

        {/* 4. Subscribe */}
        <button
          onClick={onOpenSubscribe}
          className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 text-emerald-200/80 hover:text-white transition-all active:scale-95"
          aria-label="Subscribe to dispatch"
        >
          <Mail className="w-5 h-5 mb-0.5" />
          <span className="text-[10px] font-black tracking-tight uppercase leading-tight">
            Dispatch
          </span>
        </button>

        {/* 5. Submit Tip */}
        <button
          onClick={onOpenTip}
          className="flex flex-col items-center justify-center min-h-[48px] min-w-[48px] py-1 text-yellow-300 hover:text-yellow-100 transition-all active:scale-95"
          aria-label="Submit confidential news tip"
        >
          <ShieldAlert className="w-5 h-5 mb-0.5 text-yellow-300" />
          <span className="text-[10px] font-black tracking-tight uppercase leading-tight text-yellow-300">
            Tip Desk
          </span>
        </button>
      </div>
    </nav>
  );
};
