import React from 'react';
import { Mail, Heart, Shield, Scale, FileText, ArrowRight } from 'lucide-react';
import { Category, PolicySlug } from '../types';

interface FooterProps {
  onSelectCategory: (cat: Category) => void;
  onOpenSubscriberModal: () => void;
  onOpenSupport: () => void;
  onOpenSubmitTip: () => void;
  onOpenPolicy?: (slug: PolicySlug) => void;
}

export const Footer: React.FC<FooterProps> = ({
  onSelectCategory,
  onOpenSubscriberModal,
  onOpenSupport,
  onOpenSubmitTip,
  onOpenPolicy
}) => {
  const handlePolicyClick = (e: React.MouseEvent, slug: PolicySlug) => {
    e.preventDefault();
    if (onOpenPolicy) {
      onOpenPolicy(slug);
    }
  };

  return (
    <footer className="bg-[#0E5B44] text-white pt-10 sm:pt-12 pb-12 sm:pb-8 border-t-4 border-[#083c2d] overflow-x-clip max-w-full">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Top Footer: Brand with Official AD Emblem + Newsletter Capture */}
        <div className="flex flex-col md:flex-row md:items-center justify-between pb-8 border-b border-emerald-800/80 gap-6">
          <div>
            <a
              href="/"
              onClick={(e) => {
                e.preventDefault();
                onSelectCategory('All');
                window.scrollTo({ top: 0, behavior: 'smooth' });
              }}
              className="text-left group inline-flex items-center space-x-2"
              aria-label="Americana Digest Frontpage"
            >
              <div className="w-8 h-8 rounded-xs bg-white text-[#0E5B44] flex items-center justify-center font-serif font-black text-sm tracking-tighter shadow-xs shrink-0 select-none">
                AD
              </div>
              <span className="font-logo text-2xl sm:text-3xl text-white font-black italic tracking-tighter">
                AMERICANA DIGEST
              </span>
            </a>
            <p className="text-emerald-200 text-xs sm:text-sm mt-2 max-w-md leading-relaxed">
              Fearless independent journalism, breaking national politics, cultural analysis, and verified consumer reviews.
            </p>
          </div>

          {/* Quick Subscribe Button */}
          <div className="w-full md:w-auto">
            <p className="text-xs font-bold uppercase tracking-wider text-emerald-300 mb-2 break-all">
              Newsroom Dispatch: support@americanadigest.blog
            </p>
            <button
              onClick={onOpenSubscriberModal}
              className="w-full sm:w-auto bg-[#F02D5E] hover:bg-[#d92250] text-white font-bold text-xs uppercase tracking-wider py-2.5 px-6 rounded-full shadow-sm transition-transform active:scale-95 flex items-center justify-center space-x-2 min-h-[44px]"
            >
              <Mail className="w-3.5 h-3.5" />
              <span>Subscribe Free To Morning Intelligence</span>
            </button>
          </div>
        </div>

        {/* Middle Footer: Mobile Single-Column & Desktop 4-Column Grid (Zero Overflow) */}
        <div className="py-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 text-xs font-bold uppercase tracking-wider text-emerald-100">
          {/* Col 1: Editorial Desks */}
          <div className="space-y-2.5 bg-emerald-900/30 sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-emerald-800/60">
            <div className="text-emerald-300 font-extrabold pb-1 border-b sm:border-0 border-emerald-800 flex items-center justify-between">
              <span>Editorial Desks</span>
              <span className="text-[10px] text-emerald-400 sm:hidden">Coverage</span>
            </div>
            <div>
              <a
                href="/latest-news"
                onClick={(e) => {
                  e.preventDefault();
                  onSelectCategory('Latest News');
                }}
                className="hover:text-white transition-colors block py-1"
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
                className="hover:text-white transition-colors block py-1"
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
                className="hover:text-white transition-colors block py-1"
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
                className="hover:text-white transition-colors block py-1"
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
                className="hover:text-white transition-colors block py-1"
              >
                BUSINESS & TECH
              </a>
            </div>
          </div>

          {/* Col 2: Newsroom Actions */}
          <div className="space-y-2.5 bg-emerald-900/30 sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-emerald-800/60">
            <div className="text-emerald-300 font-extrabold pb-1 border-b sm:border-0 border-emerald-800 flex items-center justify-between">
              <span>Direct Actions</span>
              <span className="text-[10px] text-emerald-400 sm:hidden">Interact</span>
            </div>
            <div>
              <button
                onClick={onOpenSupport}
                className="text-[#F02D5E] hover:text-white font-black transition-colors flex items-center space-x-1 py-1 text-left"
              >
                <Heart className="w-3.5 h-3.5 fill-current shrink-0" />
                <span>SUPPORT OUR PRESS</span>
              </button>
            </div>
            <div>
              <button
                onClick={onOpenSubmitTip}
                className="text-yellow-300 hover:text-white transition-colors py-1 text-left"
              >
                SUBMIT A CONFIDENTIAL TIP
              </button>
            </div>
            <div>
              <button
                onClick={onOpenSubscriberModal}
                className="hover:text-white transition-colors py-1 text-left"
              >
                NEWSLETTERS & DISPATCH
              </button>
            </div>
            <div className="pt-1">
              <a
                href="mailto:support@americanadigest.blog"
                className="text-emerald-300 hover:text-white transition-colors lowercase break-all block py-0.5 text-[11px]"
              >
                support@americanadigest.blog
              </a>
            </div>
          </div>

          {/* Col 3: About & Standards (All wired to real Policy pages) */}
          <div className="space-y-2.5 bg-emerald-900/30 sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-emerald-800/60 text-emerald-200/90 font-medium">
            <div className="text-emerald-300 font-extrabold pb-1 border-b sm:border-0 border-emerald-800 flex items-center justify-between">
              <span>Governance & Standards</span>
              <span className="text-[10px] text-emerald-400 sm:hidden">Charters</span>
            </div>
            <div>
              <a
                href="/about"
                onClick={(e) => handlePolicyClick(e, 'about')}
                className="hover:text-white transition-colors block py-1"
              >
                ABOUT US
              </a>
            </div>
            <div>
              <a
                href="/masthead"
                onClick={(e) => handlePolicyClick(e, 'masthead')}
                className="hover:text-white transition-colors block py-1"
              >
                EDITORIAL MASTHEAD
              </a>
            </div>
            <div>
              <a
                href="/editorial-standards"
                onClick={(e) => handlePolicyClick(e, 'editorial-standards')}
                className="hover:text-white transition-colors block py-1"
              >
                EDITORIAL STANDARDS
              </a>
            </div>
            <div>
              <a
                href="/corrections"
                onClick={(e) => handlePolicyClick(e, 'corrections')}
                className="hover:text-white transition-colors block py-1"
              >
                CORRECTIONS POLICY
              </a>
            </div>
            <div>
              <a
                href="/contact"
                onClick={(e) => handlePolicyClick(e, 'contact')}
                className="hover:text-white transition-colors block py-1"
              >
                CONTACT EDITORS
              </a>
            </div>
            <div>
              <a
                href="/sitemap.xml"
                className="hover:text-white transition-colors block py-1"
              >
                XML SITEMAP
              </a>
            </div>
          </div>

          {/* Col 4: Legal & Reader Rights (All wired to real Policy pages) */}
          <div className="space-y-2.5 bg-emerald-900/30 sm:bg-transparent p-3 sm:p-0 rounded border sm:border-0 border-emerald-800/60 text-emerald-200/90 font-medium">
            <div className="text-emerald-300 font-extrabold pb-1 border-b sm:border-0 border-emerald-800 flex items-center justify-between">
              <span>Legal Notice & Rights</span>
              <span className="text-[10px] text-emerald-400 sm:hidden">Policies</span>
            </div>
            <div>
              <a
                href="/user-agreement"
                onClick={(e) => handlePolicyClick(e, 'user-agreement')}
                className="hover:text-white transition-colors block py-1"
              >
                USER AGREEMENT
              </a>
            </div>
            <div>
              <a
                href="/comment-policy"
                onClick={(e) => handlePolicyClick(e, 'comment-policy')}
                className="hover:text-white transition-colors block py-1"
              >
                COMMENT POLICY
              </a>
            </div>
            <div>
              <a
                href="/privacy"
                onClick={(e) => handlePolicyClick(e, 'privacy')}
                className="hover:text-white transition-colors block py-1"
              >
                PRIVACY POLICY (GDPR/CCPA)
              </a>
            </div>
            <div>
              <a
                href="/accessibility"
                onClick={(e) => handlePolicyClick(e, 'accessibility')}
                className="hover:text-white transition-colors block py-1"
              >
                ACCESSIBILITY STATEMENT
              </a>
            </div>
            <div>
              <a
                href="/dmca"
                onClick={(e) => handlePolicyClick(e, 'dmca')}
                className="hover:text-white transition-colors block py-1"
              >
                DMCA NOTICE
              </a>
            </div>
          </div>
        </div>

        {/* Bottom Copyright and Email with Zero Overflow */}
        <div className="pt-6 border-t border-emerald-800/80 text-center text-xs text-emerald-300/80 space-y-1.5 font-sans break-words max-w-full">
          <p className="leading-relaxed">
            Part of Americana Digest News. ©2026 Americana Digest Media, Inc. All rights reserved.
          </p>
          <p className="font-semibold text-emerald-200 leading-relaxed">
            Americana Digest Bureau • Direct Inquiries:{' '}
            <a href="mailto:support@americanadigest.blog" className="underline hover:text-white break-all">
              support@americanadigest.blog
            </a>
          </p>
        </div>
      </div>
    </footer>
  );
};
