import React, { useState, useEffect } from 'react';
import { 
  X, Share2, Bookmark, Volume2, VolumeX, Eye, Clock, Check, 
  ExternalLink, MessageSquare, Sparkles, HelpCircle, ThumbsUp, Send, Link as LinkIcon 
} from 'lucide-react';
import { Article } from '../types';

interface ArticleModalProps {
  article: Article | null;
  onClose: () => void;
  onOpenArticle: (article: Article) => void;
  relatedArticles: Article[];
  onOpenSubscriberModal: () => void;
}

export const ArticleModal: React.FC<ArticleModalProps> = ({
  article,
  onClose,
  onOpenArticle,
  relatedArticles,
  onOpenSubscriberModal
}) => {
  const [fontSize, setFontSize] = useState<'normal' | 'large' | 'xlarge'>('normal');
  const [isPlayingAudio, setIsPlayingAudio] = useState(false);
  const [copiedLink, setCopiedLink] = useState(false);
  const [bookmarked, setBookmarked] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [comments, setComments] = useState<Array<{ name: string; text: string; time: string; likes: number }>>([
    { name: 'Dr. Arthur Sterling', text: 'The institutional implications highlighted in this reporting are spot on. Relying on commercial waivers poses clear constitutional questions.', time: '45m ago', likes: 14 },
    { name: 'Sarah Lin, JD', text: 'Extremely well-sourced piece. The references to the FLSA Section 13(a) docket are crucial context that cable broadcasts completely omit.', time: '2h ago', likes: 29 }
  ]);
  const [newComment, setNewComment] = useState('');
  const [commenterName, setCommenterName] = useState('');

  useEffect(() => {
    const handleScroll = (e: any) => {
      const el = e.target;
      if (el) {
        const total = el.scrollHeight - el.clientHeight;
        if (total > 0) {
          setScrollProgress((el.scrollTop / total) * 100);
        }
      }
    };
    return () => {};
  }, []);

  if (!article) return null;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(window.location.origin + '?article=' + article.id);
    setCopiedLink(true);
    setTimeout(() => setCopiedLink(false), 2000);
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

  const fontClasses = {
    normal: 'text-base sm:text-lg leading-relaxed',
    large: 'text-lg sm:text-xl leading-relaxed',
    xlarge: 'text-xl sm:text-2xl leading-relaxed'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-xs p-0 sm:p-4">
      <div 
        onScroll={(e) => {
          const el = e.currentTarget;
          const total = el.scrollHeight - el.clientHeight;
          if (total > 0) setScrollProgress((el.scrollTop / total) * 100);
        }}
        className="bg-white w-full h-full sm:h-[94vh] sm:max-w-4xl sm:rounded-md shadow-2xl flex flex-col overflow-y-auto relative animate-fadeIn"
      >
        {/* Reading Progress Bar */}
        <div 
          className="fixed sm:absolute top-0 left-0 h-1 bg-[#F02D5E] z-40 transition-all duration-150"
          style={{ width: `${scrollProgress}%` }}
        />

        {/* Top Sticky Tool Bar */}
        <div className="sticky top-0 z-30 bg-white/95 backdrop-blur-md border-b border-gray-200 px-4 py-2.5 flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-xs font-black uppercase tracking-wider text-[#0E5B44]">
              {article.category}
            </span>
            <span className="text-gray-300">•</span>
            <span className="text-xs text-gray-500 font-medium">{article.readTime}</span>
          </div>

          <div className="flex items-center space-x-2">
            {/* Font Sizer */}
            <div className="hidden sm:flex items-center bg-gray-100 rounded p-0.5 text-xs font-bold text-gray-700">
              <button
                onClick={() => setFontSize('normal')}
                className={`px-2 py-0.5 rounded ${fontSize === 'normal' ? 'bg-white shadow-xs' : ''}`}
              >
                A
              </button>
              <button
                onClick={() => setFontSize('large')}
                className={`px-2 py-0.5 rounded ${fontSize === 'large' ? 'bg-white shadow-xs' : ''}`}
              >
                A+
              </button>
              <button
                onClick={() => setFontSize('xlarge')}
                className={`px-2 py-0.5 rounded ${fontSize === 'xlarge' ? 'bg-white shadow-xs' : ''}`}
              >
                A++
              </button>
            </div>

            {/* Audio Summary Listen Mode */}
            <button
              onClick={() => setIsPlayingAudio(!isPlayingAudio)}
              className={`p-1.5 rounded-full transition-colors flex items-center space-x-1 text-xs font-bold ${
                isPlayingAudio ? 'bg-emerald-100 text-[#0E5B44]' : 'hover:bg-gray-100 text-gray-600'
              }`}
              title="Listen to automated article summary"
            >
              {isPlayingAudio ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span className="hidden md:inline">{isPlayingAudio ? 'Pause' : 'Listen'}</span>
            </button>

            {/* Bookmark */}
            <button
              onClick={() => setBookmarked(!bookmarked)}
              className={`p-1.5 rounded-full hover:bg-gray-100 transition-colors ${
                bookmarked ? 'text-[#F02D5E]' : 'text-gray-600'
              }`}
              title="Save story"
            >
              <Bookmark className={`w-4 h-4 ${bookmarked ? 'fill-current' : ''}`} />
            </button>

            {/* Share */}
            <button
              onClick={handleCopyLink}
              className="p-1.5 rounded-full hover:bg-gray-100 text-gray-600 transition-colors relative"
              title="Copy share link"
            >
              {copiedLink ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4" />}
            </button>

            {/* Close */}
            <button
              onClick={onClose}
              className="p-1.5 rounded-full hover:bg-gray-200 text-gray-700 transition-colors ml-2"
              aria-label="Close article"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Audio Player Simulated Bar */}
        {isPlayingAudio && (
          <div className="bg-[#0E5B44] text-white px-4 py-2.5 flex items-center justify-between text-xs">
            <div className="flex items-center space-x-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span><strong>Americana Audio:</strong> AI voice synthesized briefing running at 1.0x</span>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-24 bg-white/20 h-1.5 rounded-full overflow-hidden">
                <div className="bg-emerald-300 h-full w-2/3 animate-pulse" />
              </div>
              <button 
                onClick={() => setIsPlayingAudio(false)} 
                className="text-[11px] underline text-emerald-200 hover:text-white"
              >
                Stop
              </button>
            </div>
          </div>
        )}

        {/* Article Body Content */}
        <article className="p-4 sm:p-8 max-w-3xl mx-auto w-full">
          {/* Prefix badge */}
          {article.headlinePrefix && (
            <div className="font-headline font-black text-xs sm:text-sm uppercase tracking-wider text-[#E0292B] mb-2">
              {article.headlinePrefix}
            </div>
          )}

          {/* Main Headline */}
          <h1 className="font-headline font-black text-2xl sm:text-4xl md:text-5xl uppercase tracking-tight text-gray-900 leading-[1.05] mb-3">
            {article.title}
          </h1>

          {/* Subtitle / Deck */}
          {article.subtitle && (
            <p className="text-gray-600 font-medium text-base sm:text-xl leading-snug mb-5">
              {article.subtitle}
            </p>
          )}

          {/* Author Byline & Timestamps */}
          <div className="flex items-center justify-between py-3.5 border-y border-gray-200 mb-6 text-xs text-gray-600">
            <div className="flex items-center space-x-3">
              <img
                src={article.author.avatar}
                alt={article.author.name}
                className="w-10 h-10 rounded-full object-cover border border-gray-200"
              />
              <div>
                <div className="font-bold text-gray-900 text-sm">{article.author.name}</div>
                <div className="text-gray-500">{article.author.role}</div>
              </div>
            </div>

            <div className="text-right">
              <div className="font-semibold text-gray-900">{article.timeAgo}</div>
              <div className="text-[11px] text-gray-400">
                {new Date(article.publishedAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric'
                })}
              </div>
            </div>
          </div>

          {/* Hero Image */}
          <div className="mb-6 rounded-xs overflow-hidden shadow-xs border border-gray-100">
            <img
              src={article.imageUrl}
              alt={article.title}
              className="w-full max-h-[460px] object-cover"
            />
            {article.imageCaption && (
              <p className="p-2.5 bg-gray-50 text-[11px] text-gray-500 italic border-t border-gray-200">
                {article.imageCaption}
              </p>
            )}
          </div>

          {/* AEO / GEO Answer Engine Takeaways Box (Perplexity / SearchGPT / Google AI) */}
          <div className="my-6 bg-emerald-50/70 border-l-4 border-[#0E5B44] p-4 sm:p-5 rounded-r-md">
            <div className="flex items-center space-x-2 text-[#0E5B44] mb-2 font-bold text-xs uppercase tracking-wider">
              <Sparkles className="w-4 h-4" />
              <span>AEO Executive Summary • Instant Answer Brief</span>
            </div>
            <ul className="space-y-1.5 text-xs sm:text-sm text-gray-800 list-disc list-inside">
              {article.aeoQuickTakeaways.map((takeaway, idx) => (
                <li key={idx} className="leading-relaxed">
                  <span className="font-semibold">{takeaway}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Editorial Content with Smart Contextual Backlinks */}
          <div className={`space-y-4 font-serif-body text-gray-800 ${fontClasses[fontSize]}`}>
            {article.content.map((paragraph, idx) => (
              <p key={idx} className="leading-relaxed">
                {paragraph}
              </p>
            ))}
          </div>

          {/* Extensive Contextual Backlinks Directory (Authority SEO Boost) */}
          <div className="mt-8 pt-6 border-t border-gray-200">
            <div className="flex items-center space-x-2 text-gray-900 font-headline font-black uppercase text-sm mb-3">
              <LinkIcon className="w-4 h-4 text-[#0E5B44]" />
              <span>Verified Primary Sources & Editorial Backlinks</span>
            </div>
            <p className="text-xs text-gray-500 mb-3">
              Americana Digest grounds every investigation in primary public dockets, government filings, and peer-reviewed research:
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
              {article.backlinks.map((link, idx) => (
                <a
                  key={idx}
                  href={link.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded bg-gray-50 hover:bg-emerald-50 border border-gray-200 hover:border-emerald-300 transition-colors flex items-center justify-between group"
                >
                  <div className="truncate mr-2">
                    <span className="font-bold text-gray-900 group-hover:text-[#0E5B44] truncate block">
                      {link.text}
                    </span>
                    <span className="text-[10px] text-gray-400 font-mono">{link.source}</span>
                  </div>
                  <ExternalLink className="w-3.5 h-3.5 text-gray-400 group-hover:text-[#0E5B44] shrink-0" />
                </a>
              ))}
            </div>
          </div>

          {/* AEO Schema FAQ Section */}
          {article.faq && article.faq.length > 0 && (
            <div className="mt-8 bg-gray-50 p-5 rounded-md border border-gray-200">
              <div className="flex items-center space-x-2 text-gray-900 font-headline font-black uppercase text-sm mb-3">
                <HelpCircle className="w-4 h-4 text-[#0E5B44]" />
                <span>Frequently Asked Questions (AEO Grounded)</span>
              </div>
              <div className="space-y-3">
                {article.faq.map((item, idx) => (
                  <div key={idx} className="bg-white p-3.5 rounded border border-gray-200">
                    <h3 className="font-bold text-gray-900 text-xs sm:text-sm mb-1">{item.question}</h3>
                    <p className="text-xs text-gray-600 leading-relaxed">{item.answer}</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Automated Straight-to-Email Newsletter Inline Capture */}
          <div className="my-8 bg-[#0E5B44] text-white p-6 rounded-md text-center shadow-md">
            <h3 className="font-headline font-black text-2xl uppercase tracking-tight text-white mb-2">
              Never Miss A High-Velocity Scoop
            </h3>
            <p className="text-emerald-100 text-xs sm:text-sm max-w-md mx-auto mb-4">
              Get tomorrow morning’s unredacted intelligence briefing dispatched straight from <span className="underline font-bold text-white">support@americanadigest.blog</span>.
            </p>
            <button
              onClick={onOpenSubscriberModal}
              className="bg-[#F02D5E] hover:bg-[#d92250] text-white font-black text-xs sm:text-sm uppercase tracking-wider py-2.5 px-6 rounded-full shadow-md transition-transform active:scale-95"
            >
              Subscribe With 1-Click
            </button>
          </div>

          {/* Tags */}
          <div className="flex flex-wrap gap-1.5 my-6">
            {article.tags.map((tag) => (
              <span
                key={tag}
                className="text-[11px] font-semibold text-gray-600 bg-gray-100 hover:bg-gray-200 px-2.5 py-1 rounded transition-colors cursor-pointer"
              >
                #{tag}
              </span>
            ))}
          </div>

          {/* Interactive Comments Section */}
          <div className="mt-10 pt-6 border-t border-gray-200">
            <div className="flex items-center justify-between mb-4">
              <h3 className="font-headline font-black text-xl uppercase tracking-tight text-gray-900 flex items-center space-x-2">
                <MessageSquare className="w-5 h-5 text-[#0E5B44]" />
                <span>Reader Perspectives ({comments.length})</span>
              </h3>
              <span className="text-xs text-gray-400">Moderated Under Civil Standards</span>
            </div>

            <form onSubmit={handleAddComment} className="mb-6 space-y-2">
              <input
                type="text"
                placeholder="Your Name (Optional)"
                value={commenterName}
                onChange={(e) => setCommenterName(e.target.value)}
                className="w-full border border-gray-300 rounded px-3 py-1.5 text-xs focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
              />
              <div className="flex space-x-2">
                <input
                  type="text"
                  required
                  placeholder="Add your informed perspective to this investigation..."
                  value={newComment}
                  onChange={(e) => setNewComment(e.target.value)}
                  className="flex-1 border border-gray-300 rounded px-3 py-2 text-xs focus:ring-1 focus:ring-[#0E5B44] focus:outline-none"
                />
                <button
                  type="submit"
                  className="bg-[#0E5B44] hover:bg-[#083c2d] text-white px-4 py-2 rounded text-xs font-bold uppercase transition-colors shrink-0"
                >
                  Post
                </button>
              </div>
            </form>

            <div className="space-y-3">
              {comments.map((c, idx) => (
                <div key={idx} className="p-3.5 bg-gray-50 rounded border border-gray-200 text-xs">
                  <div className="flex items-center justify-between mb-1">
                    <span className="font-bold text-gray-900">{c.name}</span>
                    <span className="text-[11px] text-gray-400">{c.time}</span>
                  </div>
                  <p className="text-gray-700 leading-relaxed">{c.text}</p>
                  <div className="mt-2 flex items-center space-x-2 text-gray-400">
                    <button className="flex items-center space-x-1 hover:text-gray-700">
                      <ThumbsUp className="w-3 h-3" />
                      <span>{c.likes}</span>
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Related Articles Carousel / Grid */}
          <div className="mt-12 pt-8 border-t-2 border-gray-900">
            <h3 className="font-headline font-black text-xl uppercase tracking-tight text-gray-900 mb-4">
              More In-Depth Coverage
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {relatedArticles.slice(0, 3).map((rel) => (
                <div
                  key={rel.id}
                  onClick={() => onOpenArticle(rel)}
                  className="cursor-pointer group"
                >
                  <img
                    src={rel.imageUrl}
                    alt={rel.title}
                    className="w-full aspect-16/10 object-cover rounded-xs mb-2 group-hover:opacity-90"
                  />
                  <span className="text-[10px] font-black uppercase text-[#E0292B]">
                    {rel.headlinePrefix || rel.category}
                  </span>
                  <h4 className="font-headline font-black text-sm uppercase text-gray-900 group-hover:text-[#0E5B44] leading-snug line-clamp-2 mt-0.5">
                    {rel.title}
                  </h4>
                </div>
              ))}
            </div>
          </div>
        </article>
      </div>
    </div>
  );
};
