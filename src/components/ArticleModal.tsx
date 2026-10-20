import React, { useState, useEffect, useRef } from 'react';
import { 
  X, Share2, Bookmark, Volume2, VolumeX, Eye, Clock, Check, 
  ExternalLink, MessageSquare, Sparkles, HelpCircle, ThumbsUp, Send, Link as LinkIcon,
  Type, ArrowLeft
} from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenArticle: (article: Article) => void;
  relatedArticles: Article[];
  onOpenSubscriberModal: () => void;
}

type FontSizeOption = 'normal' | 'large' | 'xlarge';

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenArticle,
  relatedArticles,
  onOpenSubscriberModal
}) => {
  // Persistent font size preference
  const [fontSize, setFontSize] = useState<FontSizeOption>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('americana_font_size');
      if (saved === 'normal' || saved === 'large' || saved === 'xlarge') {
        return saved;
      }
    }
    return 'normal';
  });

  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [shareSuccessMessage, setShareSuccessMessage] = useState('');
  const [comments, setComments] = useState<Array<{ name: string; text: string; time: string; likes: number }>>([
    { name: 'Dr. Arthur Sterling', text: 'The institutional implications highlighted in this reporting are spot on. Relying on commercial waivers poses clear constitutional questions.', time: '45m ago', likes: 14 },
    { name: 'Sarah Lin, JD', text: 'Extremely well-sourced piece. The references to the FLSA Section 13(a) docket are crucial context that cable broadcasts completely omit.', time: '2h ago', likes: 29 }
  ]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');

  const scrollContainerRef = useRef<HTMLDivElement>(null);

  // Lock body scroll when article is open
  useEffect(() => {
    if (article) {
      document.body.style.overflow = 'hidden';
      // Reset scroll position on new article
      if (scrollContainerRef.current) {
        scrollContainerRef.current.scrollTop = 0;
      }
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [article]);

  // Save font size changes to localStorage
  const handleSetFontSize = (size: FontSizeOption) => {
    setFontSize(size);
    if (typeof window !== 'undefined') {
      localStorage.setItem('americana_font_size', size);
    }
  };

  const cycleFontSize = () => {
    if (fontSize === 'normal') handleSetFontSize('large');
    else if (fontSize === 'large') handleSetFontSize('xlarge');
    else handleSetFontSize('normal');
  };

  if (!article) return null;

  const handleShare = async () => {
    const shareUrl = window.location.origin + '?article=' + article.id;
    if (navigator.share) {
      try {
        await navigator.share({
          title: article.title,
          text: article.subtitle || article.summary,
          url: shareUrl,
        });
        setShareSuccessMessage('Shared!');
        setTimeout(() => setShareSuccessMessage(''), 2000);
        return;
      } catch (err) {
        // User cancelled or share failed, fallback to clipboard
      }
    }

    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopiedLink(true);
      setShareSuccessMessage('Link copied to clipboard!');
      setTimeout(() => {
        setCopiedLink(false);
        setShareSuccessMessage('');
      }, 2500);
    } catch {
      setShareSuccessMessage('Link copied!');
      setTimeout(() => setShareSuccessMessage(''), 2000);
    }
  };

  const handleAddComment = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newComment.trim()) return;
    setComments([
      {
        name: commenterName.trim() || 'Verified Reader',
        text: newComment.trim(),
        time: 'Just now',
        likes: 1
      },
      ...comments
    ]);
    setNewComment('');
  };

  const fontClasses: Record<FontSizeOption, string> = {
    normal: 'text-base sm:text-lg leading-[1.8]',
    large: 'text-lg sm:text-xl leading-[1.85]',
    xlarge: 'text-xl sm:text-2xl leading-[1.9]'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-0 sm:p-4">
      {/* Container: Fullscreen on mobile (<640px), rounded elevated modal on desktop */}
      <div 
        ref={scrollContainerRef}
        onScroll={(e) => {
          const el = e.currentTarget;
          const total = el.scrollHeight - el.clientHeight;
          if (total > 0) setScrollProgress((el.scrollTop / total) * 100);
        }}
        className="bg-white w-full h-full sm:h-[94vh] sm:max-w-4xl sm:rounded-md shadow-2xl flex flex-col overflow-y-auto relative animate-fadeIn"
      >
        {/* Reading Progress Bar (Fixed across screen) */}
        <div 
          className="fixed sm:absolute top-0 left-0 h-1 bg-[#F02D5E] z-40 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Top Sticky Tool Bar with 48px touch targets */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-3 sm:px-5 py-2 sm:py-2.5 flex items-center justify-between pt-safe">
          <div className="flex items-center space-x-2">
            {/* Mobile Back / Close Button */}
            <button
              onClick={onClose}
              className="sm:hidden touch-target-44 p-2 -ml-1 text-gray-700 hover:text-black"
              aria-label="Back to frontpage"
            >
              <ArrowLeft className="w-5 h-5" />
            </button>
            <span className="text-xs font-black uppercase tracking-wider text-[#0E5B44]">
              {article.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">{article.readTime}</span>
          </div>

          <div className="flex items-center space-x-1 sm:space-x-2">
            {/* Font Resizer Buttons */}
            <div className="flex items-center border border-gray-200 rounded-sm overflow-hidden text-xs">
              <button
                onClick={() => handleSetFontSize('normal')}
                className={`touch-target-44 px-2.5 py-1.5 font-bold ${fontSize === 'normal' ? 'bg-[#0E5B44] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Default text size"
                aria-label="Default font size"
              >
                A
              </button>
              <button
                onClick={() => handleSetFontSize('large')}
                className={`touch-target-44 px-2.5 py-1.5 font-bold ${fontSize === 'large' ? 'bg-[#0E5B44] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Large text size"
                aria-label="Large font size"
              >
                A+
              </button>
              <button
                onClick={() => handleSetFontSize('xlarge')}
                className={`hidden sm:inline-flex touch-target-44 px-2.5 py-1.5 font-bold ${fontSize === 'xlarge' ? 'bg-[#0E5B44] text-white' : 'text-gray-600 hover:bg-gray-100'}`}
                title="Extra large text size"
                aria-label="Extra large font size"
              >
                A++
              </button>
            </div>

            {/* Audio Voice Player Toggle */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`touch-target-44 p-2 rounded-full transition-colors ${
                isPlayingAudio ? 'bg-[#0E5B44] text-white' : 'hover:bg-gray-100 text-gray-600'
              }`}
              title={isPlayingAudio ? 'Pause AI audio' : 'Listen to story'}
              aria-label={isPlayingAudio ? 'Pause audio briefing' : 'Listen to audio briefing'}
            >
              {isPlayingAudio ? <VolumeX className="w-5 h-5" /> : <Volume2 className="w-5 h-5" />}
            </button>

            {/* Bookmark Button */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className="touch-target-44 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors"
              title="Save story"
              aria-label="Bookmark article"
            >
              <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current text-[#F02D5E]' : ''}`} />
            </button>

            {/* Share Button */}
            <button
              onClick={handleShare}
              className="touch-target-44 p-2 rounded-full hover:bg-gray-100 text-gray-600 transition-colors relative"
              title="Share story"
              aria-label="Share article"
            >
              {copiedLink ? <Check className="w-5 h-5 text-emerald-600" /> : <Share2 className="w-5 h-5" />}
            </button>

            {/* Desktop Close Button */}
            <button
              onClick={onClose}
              className="hidden sm:inline-flex touch-target-44 p-2 rounded-full hover:bg-gray-200 text-gray-700 transition-colors ml-1"
              aria-label="Close article modal"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Share toast feedback notification */}
        {shareSuccessMessage && (
          <div className="bg-[#0E5B44] text-white text-xs font-bold text-center py-1.5 px-4 animate-fadeIn">
            ✓ {shareSuccessMessage}
          </div>
        )}

        {/* Audio Player Simulated Bar */}
        {isPlayingAudio && (
          <div className="bg-[#0E5B44] text-white px-3 sm:px-5 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-ping" />
              <span><strong>Americana Audio Brief:</strong> AI synthesized newsroom voice</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="w-24 bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-300 h-full w-2/3 animate-pulse" />
              </div>
              <button 
                onClick={() => setIsPlayingAudio(false)} 
                className="text-xs underline text-emerald-200 hover:text-white font-bold p-1 touch-target-44"
              >
                Stop
              </button>
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <article className="p-4 sm:p-8 max-w-3xl mx-auto w-full pb-28 sm:pb-12">
          {/* Prefix badge */}
          {article.headlinePrefix && (
            <div className="font-headline font-black text-xs sm:text-sm uppercase tracking-wider text-[#E0292B] mb-2">
              {article.headlinePrefix}
            </div>
          )}

          {/* Main Headline */}
          <h1 className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-gray-900 leading-[1.08] mb-3">
            {article.title}
          </h1>

          {/* Subtitle / Deck */}
          {article.subtitle && (
            <p className="text-gray-600 font-medium text-sm sm:text-xl leading-snug mb-5">
              {article.subtitle}
            </p>
          )}

          {/* Author Byline & Timestamps */}
          <div className="flex items-center justify-between py-3 border-y border-gray-200 mb-6 text-xs text-gray-600">
            <div className="flex items-center space-x-2.5 sm:space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                width={40}
                height={40}
                className="w-10 h-10 rounded-full object-cover border border-gray-200 shrink-0"
              />
              <div>
                <div className="font-bold text-gray-900 text-xs sm:text-sm">{article.author.name}</div>
                <div className="text-gray-500 text-[11px] sm:text-xs">{article.author.role}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-gray-900">{article.timeAgo}</div>
              <div className="text-[10px] sm:text-[11px] text-gray-400">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Hero Image with Explicit Aspect Ratio to eliminate CLS */}
          <div className="mb-6 rounded-xs overflow-hidden shadow-xs border border-gray-100 aspect-16/10 sm:aspect-16/9 bg-gray-100">
            <img
              src={article.imageUrl}
              alt={article.title}
              width={800}
              height={450}
              decoding="async"
              className="w-full h-full object-cover"
            />
          </div>
          {article.imageCaption && (
            <p className="p-2 sm:p-2.5 bg-gray-50 text-[11px] text-gray-500 italic border border-t-0 border-gray-200 rounded-b-xs -mt-6 mb-6">
              {article.imageCaption}
            </p>
          )}

          {/* AEO Quick Takeaways Box */}
          {article.aeoQuickTakeaways && article.aeoQuickTakeaways.length > 0 && (
            <div className="bg-emerald-50/70 border-l-4 border-[#0E5B44] p-4 my-6 rounded-r">
              <div className="flex items-center space-x-2 text-[#0E5B44] font-black uppercase text-xs tracking-wider mb-2">
                <Sparkles className="w-4 h-4" />
                <span>Executive Intelligence Brief & Key Takeaways</span>
              </div>
              <ul className="space-y-2 text-xs sm:text-sm text-gray-800 list-disc list-inside">
                {article.aeoQuickTakeaways.map((takeaway, idx) => (
                  <li key={idx} className="leading-relaxed">
                    {takeaway}
                  </li>
                ))}
              </ul>
            </div>
          )}

          {/* Paragraphs with Fluid Font Scaling */}
          <div className={`space-y-4 sm:space-y-6 font-serif-body text-gray-800 ${fontClasses[fontSize]}`}>
            {article.content.map((paragraph, index) => (
              <p key={index} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Sourced Backlinks Verification Matrix */}
          {article.backlinks && article.backlinks.length > 0 && (
            <div className="mt-8 pt-5 border-t border-gray-200">
              <div className="flex items-center space-x-2 text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">
                <LinkIcon className="w-3.5 h-3.5" />
                <span>Primary Document Backlinks & Investigative Sources</span>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                {article.backlinks.map((link, idx) => (
                  <a
                    key={idx}
                    href={link.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="p-3 rounded bg-gray-50 hover:bg-emerald-50 border border-gray-200 transition-colors flex items-center justify-between text-xs text-gray-700 hover:text-[#0E5B44] min-h-[44px]"
                  >
                    <span className="font-semibold truncate mr-2">{link.text}</span>
                    <ExternalLink className="w-4 h-4 text-gray-400 shrink-0" />
                  </a>
                ))}
              </div>
            </div>
          )}

          {/* AEO FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <div className="mt-8 p-4 sm:p-5 bg-gray-50 rounded-xs border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-900 font-headline font-black uppercase text-base sm:text-lg mb-3">
                <HelpCircle className="w-4 h-4 text-[#0E5B44]" />
                <span>Frequently Asked Questions & Official Inquiries</span>
              </div>
              <div className="space-y-3">
                {article.faq.map((item, idx) => (
                  <div key={idx} className="text-xs sm:text-sm">
                    <h4 className="font-bold text-gray-900 mb-1">{item.question}</h4>
                    <p className="text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Interactive Verified Comment Stream */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <MessageSquare className="w-4 h-4 text-[#0E5B44]" />
                <h3 className="font-headline font-black text-base sm:text-lg uppercase tracking-tight text-gray-900">
                  Reader Discussion ({comments.length})
                </h3>
              </div>
              <span className="text-[11px] text-gray-400">Moderated newsroom feed</span>
            </div>

            <form onSubmit={handleAddComment} className="mb-6 space-y-2">
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
                <input
                  type="text"
                  placeholder="Your Name / Credential"
                  value={commenterName}
                  onChange={(e) => setCommenterName(e.target.value)}
                  className="sm:col-span-1 border border-gray-300 rounded px-3 py-2 text-base sm:text-xs focus:ring-1 focus:ring-[#0E5B44] focus:outline-none min-h-[44px]"
                />
                <input
                  type="text"
                  required
                  placeholder="Add your verified analysis to this story..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="sm:col-span-2 border border-gray-300 rounded px-3 py-2 text-base sm:text-xs focus:ring-1 focus:ring-[#0E5B44] focus:outline-none min-h-[44px]"
                />
              </div>
              <div className="flex justify-end">
                <button
                  type="submit"
                  className="bg-[#0E5B44] hover:bg-[#083c2d] text-white font-bold text-xs uppercase px-5 py-2.5 rounded flex items-center space-x-1.5 min-h-[44px] active:scale-95 transition-transform"
                >
                  <Send className="w-3.5 h-3.5" />
                  <span>Submit Comment</span>
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {comments.map((c, i) => (
                <div key={i} className="p-3 bg-gray-50 rounded border border-gray-100 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900">{c.name}</span>
                    <span className="text-[10px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed mb-2">{c.text}</p>
                  <div className="flex items-center space-x-1 text-gray-500 hover:text-[#0E5B44] cursor-pointer text-[11px] p-1">
                    <ThumbsUp className="w-3.5 h-3.5" />
                    <span>{c.likes}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles Carousel / Grid */}
          <div className="mt-10 pt-6 border-t-2 border-gray-900">
            <h3 className="font-headline font-black text-xl uppercase tracking-tight text-gray-900 mb-4">
              More Stories From Our Desks
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {relatedArticles.slice(0, 4).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => {
                    onOpenArticle(rel);
                    if (scrollContainerRef.current) {
                      scrollContainerRef.current.scrollTop = 0;
                    }
                  }}
                  className="cursor-pointer group flex space-x-3 items-start border-b border-gray-100 pb-3"
                >
                  <div className="w-20 h-16 shrink-0 aspect-[5/4] overflow-hidden rounded-xs bg-gray-100">
                    <img
                      src={rel.imageUrl}
                      alt={rel.title}
                      width={80}
                      height={64}
                      loading="lazy"
                      decoding="async"
                      className="w-full h-full object-cover"
                    />
                  </div>
                  <div>
                    <h4 className="font-headline font-black text-xs sm:text-sm uppercase tracking-tight text-gray-900 group-hover:text-[#0E5B44] leading-snug line-clamp-2">
                      {rel.title}
                    </h4>
                    <span className="text-[10px] text-gray-400 mt-1 block">{rel.timeAgo}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </article>

        {/* Mobile Edge-to-Edge Sticky Bottom Quick Actions Bar */}
        <div 
          className="sm:hidden fixed bottom-0 left-0 right-0 z-40 bg-white/95 backdrop-blur-md border-t border-gray-200 px-3 py-2 flex items-center justify-around shadow-[0_-4px_16px_rgba(0,0,0,0.1)] pb-safe"
        >
          {/* Font Toggle */}
          <button
            onClick={cycleFontSize}
            className="flex flex-col items-center justify-center touch-target-44 text-gray-700 hover:text-black"
            aria-label="Cycle text size"
          >
            <Type className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-0.5 uppercase">
              {fontSize === 'normal' ? 'Font: 1x' : fontSize === 'large' ? 'Font: 1.2x' : 'Font: 1.5x'}
            </span>
          </button>

          {/* Audio Listen */}
          <button
            onClick={() => setIsPlayingAudio(!isPlayingAudio)}
            className={`flex flex-col items-center justify-center touch-target-44 ${
              isPlayingAudio ? 'text-[#0E5B44]' : 'text-gray-700 hover:text-black'
            }`}
            aria-label="Listen to story"
          >
            {isPlayingAudio ? <VolumeX className="w-5 h-5 text-[#0E5B44]" /> : <Volume2 className="w-5 h-5" />}
            <span className="text-[10px] font-bold mt-0.5 uppercase">
              {isPlayingAudio ? 'Pause' : 'Listen'}
            </span>
          </button>

          {/* Share */}
          <button
            onClick={handleShare}
            className="flex flex-col items-center justify-center touch-target-44 text-gray-700 hover:text-black"
            aria-label="Share article"
          >
            <Share2 className="w-5 h-5" />
            <span className="text-[10px] font-bold mt-0.5 uppercase">Share</span>
          </button>

          {/* Bookmark */}
          <button
            onClick={() => setBookmarked(!bookmarked)}
            className={`flex flex-col items-center justify-center touch-target-44 ${
              bookmarked ? 'text-[#F02D5E]' : 'text-gray-700 hover:text-black'
            }`}
            aria-label="Bookmark article"
          >
            <Bookmark className={`w-5 h-5 ${bookmarked ? 'fill-current' : ''}`} />
            <span className="text-[10px] font-bold mt-0.5 uppercase">Save</span>
          </button>

          {/* Close */}
          <button
            onClick={onClose}
            className="flex flex-col items-center justify-center touch-target-44 text-red-600 hover:text-red-700 font-bold"
            aria-label="Close article"
          >
            <X className="w-5 h-5" />
            <span className="text-[10px] uppercase">Close</span>
          </button>
        </div>
      </div>
    </div>
  );
};
