import React from 'react';
import { Mail, Shield, Send } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onOpenSubscriberModal: () => void;
  onOpenSupport: () => void;
  onOpenSubmitTip: () => void;
  onOpenEmailInbox: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSubscriberModal,
  onOpenSupport,
  onOpenSubmitTip,
  onOpenEmailInbox
}) => {
  return (
    <footer className="bg-[#0E5B44] text-white pt-12 pb-8 border-t-4 border-[#083c2d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Footer: Brand + Automated Newsletter Capture */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-emerald-800/80 gap-6">
          <div>
            <button
              onClick={() => {
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group"
            >
              <span className="font-logo text-3xl sm:text-4xl text-white font-black italic tracking-tighter">
                AMERICANA DIGEST
              </span>
            </button>
            <p className="text-emerald-200 text-xs sm:text-sm mt-1 max-w-md">
              Fearless independent journalism, breaking national politics, cultural analysis, and consumer reviews.
            </p>
          </div>

          {/* Quick Subscribe Input */}
          <div className="w-full md:w-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
              Automated Dispatch: support@americanadigest.blog
            </p>
            <button
              onClick={onOpenSubscriberModal}
              className="w-full sm:w-auto bg-[#F02D5E] hover:bg-[#d92250] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-full shadow-sm transition-transform active:scale-95 flex items-center justify-center space-x-2"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Subscribe Free To Morning Intelligence</span>
            </button>
          </div>
        </div>

        {/* Middle Footer: Links matching Screenshot 10 */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-bold uppercase tracking-wider text-emerald-100">
          {/* Col 1 */}
          <div className="space-y-2.5">
            <div>
              <button
                onClick={() => onSelectCategory('Latest News')}
                className="hover:text-white transition-colors"
              >
                NEWS
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectCategory('Entertainment')}
                className="hover:text-white transition-colors"
              >
                ENTERTAINMENT
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectCategory('Voices')}
                className="hover:text-white transition-colors"
              >
                VOICES
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectCategory('Shopping')}
                className="hover:text-white transition-colors"
              >
                SHOPPING
              </button>
            </div>
            <div>
              <button
                onClick={onOpenSupport}
                className="text-[#F02D5E] hover:text-white font-black transition-colors"
              >
                SUPPORT US
              </button>
            </div>
          </div>

          {/* Col 2 */}
          <div className="space-y-2.5">
            <div>
              <button
                onClick={() => onSelectCategory('Politics')}
                className="hover:text-white transition-colors"
              >
                POLITICS
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectCategory('Life')}
                className="hover:text-white transition-colors"
              >
                LIFE
              </button>
            </div>
            <div>
              <button
                onClick={() => onSelectCategory('Life')}
                className="hover:text-white transition-colors"
              >
                AMERICANA PERSONAL
              </button>
            </div>
            <div>
              <button
                onClick={onOpenSubscriberModal}
                className="hover:text-white transition-colors"
              >
                NEWSLETTERS
              </button>
            </div>
            <div>
              <button
                onClick={onOpenEmailInbox}
                className="text-emerald-300 hover:text-white transition-colors"
              >
                AUTOMATED DISPATCH BOX
              </button>
            </div>
          </div>

          {/* Col 3 */}
          <div className="space-y-2.5 text-emerald-300/90 font-medium">
            <div><a href="#about" className="hover:text-white transition-colors">ABOUT US</a></div>
            <div><a href="#contact" className="hover:text-white transition-colors">CONTACT US</a></div>
            <div><button onClick={onOpenSubmitTip} className="text-yellow-300 hover:text-white transition-colors">SUBMIT A TIP</button></div>
            <div><a href="#faq" className="hover:text-white transition-colors">FAQ</a></div>
            <div><a href="#careers" className="hover:text-white transition-colors">CAREERS</a></div>
            <div><a href="#rss" className="hover:text-white transition-colors">RSS FEEDS</a></div>
          </div>

          {/* Col 4 */}
          <div className="space-y-2.5 text-emerald-300/90 font-medium">
            <div><a href="#user-agreement" className="hover:text-white transition-colors">USER AGREEMENT</a></div>
            <div><a href="#comment-policy" className="hover:text-white transition-colors">COMMENT POLICY</a></div>
            <div><a href="#dmca" className="hover:text-white transition-colors">DMCA POLICY</a></div>
            <div><a href="#accessibility" className="hover:text-white transition-colors">ACCESSIBILITY STATEMENT</a></div>
            <div><a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a></div>
            <div><a href="#consent" className="hover:text-white transition-colors">DO NOT SELL OR SHARE MY INFO</a></div>
          </div>
        </div>

        {/* Bottom Copyright matching Screenshot 10 */}
        <div className="pt-6 border-t border-emerald-800/80 text-center text-xs text-emerald-300/80 space-y-1 font-sans">
          <p>
            Part of Americana Digest News. ©2026 Americana Digest Media, Inc. All rights reserved.
          </p>
          <p className="font-semibold text-emerald-200">
            The Americana Digest • Direct Inquiries: support@americanadigest.blog
          </p>
        </div>
      </div>
    </footer>
  );
};
