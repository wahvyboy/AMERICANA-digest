import React from 'react';
import { Mail, Heart } from 'lucide-react';
import { Category } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onOpenSubscriberModal: () => void;
  onOpenSupport: () => void;
  onOpenSubmitTip: () => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSubscriberModal,
  onOpenSupport,
  onOpenSubmitTip
}) => {
  return (
    <footer className="bg-[#0E5B44] text-white pt-12 pb-8 border-t-4 border-[#083c2d]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Footer: Brand + Newsletter Capture */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-emerald-800/80 gap-6">
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group inline-block"
            >
              <span className="font-logo text-3xl sm:text-4xl text-white font-black italic tracking-tighter">
                AMERICANA DIGEST
              </span>
            </a>
            <p className="text-emerald-200 text-xs sm:text-sm mt-1 max-w-md">
              Fearless independent journalism, breaking national politics, cultural analysis, and consumer reviews.
            </p>
          </div>

          {/* Quick Subscribe Button */}
          <div className="w-full md:w-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2">
              Newsroom Dispatch: support@americanadigest.blog
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

        {/* Middle Footer: Clean crawlable sections and real categories */}
        <div className="py-8 grid grid-cols-2 md:grid-cols-4 gap-6 text-xs font-bold uppercase tracking-wider text-emerald-100">
          {/* Col 1: Editorial Desks */}
          <div className="space-y-2.5">
            <div className="text-emerald-300 font-extrabold pb-1">Editorial Desks</div>
            <div>
              <a
                href="/latest-news"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('Latest News');
                }}
                className="hover:text-white transition-colors block"
              >
                LATEST NEWS
              </a>
            </div>
            <div>
              <a
                href="/politics"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('Politics');
                }}
                className="hover:text-white transition-colors block"
              >
                POLITICS
              </a>
            </div>
            <div>
              <a
                href="/life"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('Life');
                }}
                className="hover:text-white transition-colors block"
              >
                LIFE & CULTURE
              </a>
            </div>
            <div>
              <a
                href="/shopping"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('Shopping');
                }}
                className="hover:text-white transition-colors block"
              >
                SHOPPING & REVIEWS
              </a>
            </div>
            <div>
              <a
                href="/business-tech"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('Business & Tech');
                }}
                className="hover:text-white transition-colors block"
              >
                BUSINESS & TECH
              </a>
            </div>
          </div>

          {/* Col 2: Newsroom Actions */}
          <div className="space-y-2.5">
            <div className="text-emerald-300 font-extrabold pb-1">Direct Actions</div>
            <div>
              <button
                onClick={onOpenSupport}
                className="text-[#F02D5E] hover:text-white font-black transition-colors flex items-center space-x-1"
              >
                <Heart className="w-3.5 h-3.5 fill-current" />
                <span>SUPPORT OUR PRESS</span>
              </button>
            </div>
            <div>
              <button
                onClick={onOpenSubmitTip}
                className="text-yellow-300 hover:text-white transition-colors"
              >
                SUBMIT A CONFIDENTIAL TIP
              </button>
            </div>
            <div>
              <button
                onClick={onOpenSubscriberModal}
                className="hover:text-white transition-colors"
              >
                NEWSLETTERS & DISPATCH
              </button>
            </div>
            <div>
              <a
                href="mailto:support@americanadigest.blog"
                className="text-emerald-300 hover:text-white transition-colors lowercase"
              >
                support@americanadigest.blog
              </a>
            </div>
          </div>

          {/* Col 3: About & Standards */}
          <div className="space-y-2.5 text-emerald-200/90 font-medium">
            <div className="text-emerald-300 font-extrabold pb-1">Governance</div>
            <div><a href="#about" className="hover:text-white transition-colors">ABOUT US</a></div>
            <div><a href="mailto:support@americanadigest.blog" className="hover:text-white transition-colors">CONTACT EDITORS</a></div>
            <div><a href="#editorial-standards" className="hover:text-white transition-colors">EDITORIAL STANDARDS</a></div>
            <div><a href="#corrections" className="hover:text-white transition-colors">CORRECTIONS POLICY</a></div>
            <div><a href="/sitemap.xml" className="hover:text-white transition-colors">XML SITEMAP</a></div>
          </div>

          {/* Col 4: Legal & Privacy */}
          <div className="space-y-2.5 text-emerald-200/90 font-medium">
            <div className="text-emerald-300 font-extrabold pb-1">Legal Notice</div>
            <div><a href="#user-agreement" className="hover:text-white transition-colors">USER AGREEMENT</a></div>
            <div><a href="#comment-policy" className="hover:text-white transition-colors">COMMENT POLICY</a></div>
            <div><a href="#privacy" className="hover:text-white transition-colors">PRIVACY POLICY</a></div>
            <div><a href="#accessibility" className="hover:text-white transition-colors">ACCESSIBILITY</a></div>
            <div><a href="#dmca" className="hover:text-white transition-colors">DMCA NOTICE</a></div>
          </div>
        </div>

        {/* Bottom Copyright and Email */}
        <div className="pt-6 border-t border-emerald-800/80 text-center text-xs text-emerald-300/80 space-y-1 font-sans">
          <p>
            Part of Americana Digest News. ©2026 Americana Digest Media, Inc. All rights reserved.
          </p>
          <p className="font-semibold text-emerald-200">
            Americana Digest Bureau • Direct Inquiries: <a href="mailto:support@americanadigest.blog" className="underline hover:text-white">support@americanadigest.blog</a>
          </p>
        </div>
      </div>
    </footer>
  );
};
