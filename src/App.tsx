import React, { useState, useEffect } from 'react';
import { Header } from './components/Header';
import { LiveTicker } from './components/LiveTicker';
import { SplashHero } from './components/SplashHero';
import { KeepPressFree } from './components/KeepPressFree';
import { AmericanaVideo } from './components/AmericanaVideo';
import { SubmitTipBanner, SubmitTipModal } from './components/SubmitTipBanner';
import { ArticleModal } from './components/ArticleModal';
import { EmailFollowupModal } from './components/EmailFollowupModal';
import { SupportModal } from './components/SupportModal';
import { NewsArchive3000 } from './components/NewsArchive3000';
import { Footer } from './components/Footer';
import { Article, Category, AutomatedEmail } from './types';
import { CURATED_ARTICLES } from './data/curatedArticles';
import { NEWS_DATABASE, queryNewsArchive } from './data/databaseEngine';
import { getDispatchedEmails } from './services/subscriberService';
import { Mail, Sparkles, TrendingUp, Clock, Eye, ArrowRight, Share2, ShieldCheck, Flame } from 'lucide-react';

export default function App() {
  const [currentCategory, setCurrentCategory] = useState<Category>('All');
  const [searchQuery, setSearchQuery] = useState('');
  const [activeArticle, setActiveArticle] = useState<Article | null>(null);
  const [showSupportModal, setShowSupportModal] = useState(false);
  const [showSubscriberModal, setShowSubscriberModal] = useState(false);
  const [showEmailInboxModal, setShowEmailInboxModal] = useState(false);
  const [showSubmitTipModal, setShowSubmitTipModal] = useState(false);
  const [showArchiveSection, setShowArchiveSection] = useState(false);
  const [dispatchedEmails, setDispatchedEmails] = useState<AutomatedEmail[]>([]);
  const [newEmailToast, setNewEmailToast] = useState<AutomatedEmail | null>(null);

  useEffect(() => {
    const emails = getDispatchedEmails();
    setDispatchedEmails(emails);

    // Check if URL has ?article=ID
    const params = new URLSearchParams(window.location.search);
    const articleId = params.get('article');
    if (articleId) {
      const found = NEWS_DATABASE.find(a => a.id === articleId) || CURATED_ARTICLES.find(a => a.id === articleId);
      if (found) setActiveArticle(found);
    }
  }, []);

  const leadArticle = CURATED_ARTICLES[0]; // SpaceX & Ukraine
  const latestNewsLead = CURATED_ARTICLES.find(a => a.id === 'trump-workers-pay-cut') || CURATED_ARTICLES[1];

  // Specific groups for exact HuffPost layout recreation
  const latestNewsItems = CURATED_ARTICLES.filter(a => 
    [
      'hegseth-army-event',
      'thom-tillis-trump',
      'midterm-ten-billion',
      'ohio-oops-trump-democrat',
      'midterm-democrats-warning',
      'supreme-court-political-ad',
      'chick-fil-a-ceo-equal-rights',
      'doj-threatens-american-bar-association',
      'el-sayed-brilliant-reply',
      'james-carville-newsmax',
      'trump-livestreamed-execution-second-thoughts',
      'megyn Kelly-katie-zacharia',
      'scott-jennings-cnn-response',
      'jen-psaki-katie-zacharia'
    ].includes(a.id)
  );

  const whatsHappeningItems = CURATED_ARTICLES.filter(a =>
    [
      'mike-johnson-ilhan-omar-raid',
      'body-language-katie-zacharia',
      'embarrassing-questions-men-sex',
      'funniest-tweets-couples',
      'what-usb-stands-for'
    ].includes(a.id)
  );

  const lifeItems = CURATED_ARTICLES.filter(a =>
    [
      'grandparents-cross-boundary',
      'machine-gun-kelly-megan-fox',
      'social-security-office-visit'
    ].includes(a.id)
  );

  const shoppingItems = CURATED_ARTICLES.filter(a => a.category === 'Shopping');

  // Filtered stream when category is selected or search query active
  const filteredQueryResults = queryNewsArchive({
    query: searchQuery,
    category: currentCategory,
    pageSize: 24
  });

  const handleOpenArticle = (art: Article) => {
    setActiveArticle(art);
    window.history.pushState({}, '', `?article=${art.id}`);
  };

  const handleCloseArticle = () => {
    setActiveArticle(null);
    window.history.pushState({}, '', window.location.pathname);
  };

  const handleSelectHeadline = (headline: string) => {
    // Find closest article or set search
    const matched = NEWS_DATABASE.find(a => a.title.toLowerCase().includes(headline.substring(0, 20).toLowerCase()));
    if (matched) {
      handleOpenArticle(matched);
    } else {
      setSearchQuery(headline.substring(0, 25));
    }
  };

  return (
    <div className="min-h-screen flex flex-col bg-white text-gray-900 selection:bg-[#0E5B44] selection:text-white font-sans">
      {/* 1. Header with exact forest green, logo, Support Us button */}
      <Header
        currentCategory={currentCategory}
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSupport={() => setShowSupportModal(true)}
        onOpenSubscriberModal={() => setShowSubscriberModal(true)}
        onOpenEmailInbox={() => setShowEmailInboxModal(true)}
        dispatchedEmailsCount={dispatchedEmails.length}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        onOpenSubmitTip={() => setShowSubmitTipModal(true)}
        onViewArchive={() => {
          setShowArchiveSection(true);
          const el = document.getElementById('archive-vault');
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }}
      />

      {/* 2. Live Updates Ticker */}
      <LiveTicker onSelectHeadline={handleSelectHeadline} />

      {/* Floating Subscriber Instant Notification Badge */}
      {dispatchedEmails.length > 0 && (
        <div className="bg-[#083c2d] text-emerald-100 text-xs py-1.5 px-4 flex items-center justify-between border-b border-emerald-700">
          <div className="max-w-7xl mx-auto w-full flex items-center justify-between">
            <div className="flex items-center space-x-2 truncate">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping shrink-0" />
              <span className="truncate">
                <strong>Automated Dispatch Active:</strong> Welcome follow-up delivered to <code>{dispatchedEmails[0].to}</code> from <code>support@americanadigest.blog</code>
              </span>
            </div>
            <button
              onClick={() => setShowEmailInboxModal(true)}
              className="text-white underline hover:text-emerald-200 font-bold ml-2 shrink-0 text-xs"
            >
              Inspect Delivered Email
            </button>
          </div>
        </div>
      )}

      {/* Main Content Area */}
      <main className="flex-1">
        {/* If category is ALL and not searching, show full signature HuffPost Homepage layout */}
        {currentCategory === 'All' && !searchQuery ? (
          <>
            {/* A. Iconic 3-color Stacked Splash Headline */}
            <SplashHero
              leadArticle={leadArticle}
              onOpenArticle={handleOpenArticle}
              onSelectSubHeadline={handleSelectHeadline}
            />

            {/* B. LATEST NEWS Section */}
            <section className="max-w-4xl mx-auto px-3 sm:px-4 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase tracking-tight text-gray-900 whitespace-nowrap">
                  LATEST NEWS
                </h2>
                <div className="h-0.5 bg-gray-900 flex-1" />
              </div>

              {/* Big Featured Lead Story: Trump Workers Pay Cut */}
              <div
                onClick={() => handleOpenArticle(latestNewsLead)}
                className="cursor-pointer group mb-8 pb-8 border-b border-gray-200"
              >
                <div className="aspect-16/10 sm:aspect-16/9 overflow-hidden rounded-xs bg-gray-100 mb-4">
                  <img
                    src={latestNewsLead.imageUrl}
                    alt={latestNewsLead.title}
                    className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                  />
                </div>
                <h3 className="font-headline font-black text-2xl sm:text-4xl uppercase tracking-tight text-gray-900 group-hover:text-[#0E5B44] leading-tight">
                  {latestNewsLead.title}
                </h3>
                <p className="text-gray-600 text-sm sm:text-base mt-2 line-clamp-2">
                  {latestNewsLead.summary}
                </p>
                <div className="mt-2 text-xs text-gray-400 font-semibold">
                  By {latestNewsLead.author.name} • {latestNewsLead.timeAgo}
                </div>
              </div>

              {/* 2-Column Story Grid matching screenshot layout */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-6 gap-y-8">
                {latestNewsItems.map((article) => (
                  <article
                    key={article.id}
                    onClick={() => handleOpenArticle(article)}
                    className="cursor-pointer group flex flex-col justify-between border-b sm:border-b-0 pb-6 sm:pb-0 border-gray-100"
                  >
                    <div>
                      <div className="aspect-16/10 overflow-hidden rounded-xs bg-gray-100 mb-3">
                        <img
                          src={article.imageUrl}
                          alt={article.title}
                          loading="lazy"
                          className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                        />
                      </div>
                      {article.headlinePrefix && (
                        <div className="text-[10px] font-black uppercase tracking-wider text-[#E0292B] mb-1">
                          {article.headlinePrefix}
                        </div>
                      )}
                      <h4 className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight text-gray-900 group-hover:text-[#0E5B44] leading-snug">
                        {article.title}
                      </h4>
                    </div>
                    <div className="mt-3 flex items-center justify-between text-xs text-gray-400">
                      <span>{article.timeAgo}</span>
                      <span className="flex items-center space-x-1">
                        <Eye className="w-3 h-3" />
                        <span>{(article.viewsCount / 1000).toFixed(0)}k</span>
                      </span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* C. KEEP OUR PRESS TRULY FREE Contribution Callout */}
            <KeepPressFree
              onOpenSupport={() => setShowSupportModal(true)}
              onOpenLogin={() => setShowSubscriberModal(true)}
            />

            {/* D. 👇 WHAT'S HAPPENING 👇 Section */}
            <section className="max-w-4xl mx-auto px-3 sm:px-4 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-2 mb-6">
                <span className="text-xl">👇</span>
                <h2 className="font-headline font-black text-2xl uppercase tracking-tight text-gray-900 whitespace-nowrap">
                  WHAT'S HAPPENING
                </h2>
                <span className="text-xl">👇</span>
                <div className="h-0.5 bg-gray-900 flex-1 ml-2" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {whatsHappeningItems.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => handleOpenArticle(item)}
                    className="cursor-pointer group flex space-x-3 items-start border-b border-gray-100 pb-4"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-28 h-20 object-cover rounded-xs shrink-0 bg-gray-100 group-hover:opacity-90"
                    />
                    <div className="flex-1">
                      <h4 className="font-headline font-black text-base uppercase tracking-tight text-gray-900 group-hover:text-[#0E5B44] leading-snug line-clamp-3">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 mt-1 block">{item.timeAgo}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* E. AMERICANA VIDEO (Video Player) */}
            <AmericanaVideo />

            {/* F. LIFE Section */}
            <section className="max-w-4xl mx-auto px-3 sm:px-4 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase tracking-tight text-gray-900 whitespace-nowrap">
                  LIFE
                </h2>
                <div className="h-0.5 bg-gray-900 flex-1" />
              </div>

              {/* Lead Life Story */}
              {lifeItems.length > 0 && (
                <div
                  onClick={() => handleOpenArticle(lifeItems[0])}
                  className="cursor-pointer group mb-8 pb-6 border-b border-gray-200"
                >
                  <div className="aspect-16/10 sm:aspect-16/9 overflow-hidden rounded-xs bg-gray-100 mb-4">
                    <img
                      src={lifeItems[0].imageUrl}
                      alt={lifeItems[0].title}
                      className="w-full h-full object-cover group-hover:scale-101 transition-transform duration-300"
                    />
                  </div>
                  <h3 className="font-headline font-black text-2xl sm:text-3xl uppercase tracking-tight text-gray-900 group-hover:text-[#0E5B44] leading-tight">
                    {lifeItems[0].title}
                  </h3>
                  <p className="text-gray-600 text-sm sm:text-base mt-2 line-clamp-2">
                    {lifeItems[0].summary}
                  </p>
                </div>
              )}

              {/* Secondary Life Stories */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                {lifeItems.slice(1).map((item) => (
                  <article
                    key={item.id}
                    onClick={() => handleOpenArticle(item)}
                    className="cursor-pointer group flex space-x-3 items-start"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-28 h-20 object-cover rounded-xs shrink-0 bg-gray-100 group-hover:opacity-90"
                    />
                    <div className="flex-1">
                      <h4 className="font-headline font-black text-base uppercase tracking-tight text-gray-900 group-hover:text-[#0E5B44] leading-snug line-clamp-3">
                        {item.title}
                      </h4>
                      <span className="text-[11px] text-gray-400 mt-1 block">{item.timeAgo}</span>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* G. Submit a Tip Banner */}
            <SubmitTipBanner onOpenModal={() => setShowSubmitTipModal(true)} />

            {/* H. SHOPPING Section */}
            <section className="max-w-4xl mx-auto px-3 sm:px-4 py-6 border-b border-gray-200">
              <div className="flex items-center space-x-3 mb-6">
                <h2 className="font-headline font-black text-2xl sm:text-3xl uppercase tracking-tight text-gray-900 whitespace-nowrap">
                  SHOPPING
                </h2>
                <div className="h-0.5 bg-gray-900 flex-1" />
              </div>

              <div className="space-y-6">
                {shoppingItems.map((item) => (
                  <article
                    key={item.id}
                    onClick={() => handleOpenArticle(item)}
                    className="cursor-pointer group flex flex-col sm:flex-row space-y-3 sm:space-y-0 sm:space-x-4 items-start border-b border-gray-100 pb-6"
                  >
                    <img
                      src={item.imageUrl}
                      alt={item.title}
                      className="w-full sm:w-44 h-36 object-cover rounded-xs shrink-0 bg-gray-100 group-hover:opacity-90"
                    />
                    <div className="flex-1">
                      <span className="text-[10px] font-black uppercase text-[#0E5B44] tracking-wider mb-1 block">
                        {item.headlinePrefix || 'DEAL REVIEW'}
                      </span>
                      <h4 className="font-headline font-black text-lg sm:text-xl uppercase tracking-tight text-gray-900 group-hover:text-[#0E5B44] leading-snug">
                        {item.title}
                      </h4>
                      <p className="text-gray-600 text-xs sm:text-sm mt-1.5 line-clamp-2 leading-relaxed">
                        {item.summary}
                      </p>
                      <div className="mt-2.5 flex items-center space-x-2 text-xs font-bold text-[#F02D5E] uppercase tracking-wider">
                        <span>Read Tested Review & Verified Links</span>
                        <ArrowRight className="w-3.5 h-3.5" />
                      </div>
                    </div>
                  </article>
                ))}
              </div>
            </section>

            {/* I. 3,000 Articles Vault Anchor */}
            <div id="archive-vault">
              <NewsArchive3000 onOpenArticle={handleOpenArticle} />
            </div>
          </>
        ) : (
          /* Category Filtered or Search View */
          <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8">
            <div className="flex items-center justify-between pb-4 border-b border-gray-300 mb-6">
              <div>
                <span className="text-xs font-black uppercase tracking-wider text-[#0E5B44]">
                  {searchQuery ? 'Search Query Results' : 'Desk Coverage'}
                </span>
                <h1 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tight text-gray-900">
                  {searchQuery ? `"${searchQuery}"` : currentCategory}
                </h1>
                <p className="text-xs text-gray-500 mt-1">
                  Showing {filteredQueryResults.totalCount} authoritative articles from the last 90 days.
                </p>
              </div>

              <button
                onClick={() => {
                  setCurrentCategory('All');
                  setSearchQuery('');
                }}
                className="text-xs text-gray-600 hover:text-black underline font-semibold"
              >
                ← Back to Frontpage
              </button>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {filteredQueryResults.articles.map((art) => (
                <article
                  key={art.id}
                  onClick={() => handleOpenArticle(art)}
                  className="cursor-pointer group flex flex-col justify-between bg-white border border-gray-200 rounded-xs overflow-hidden hover:shadow-md transition-shadow"
                >
                  <div>
                    <div className="aspect-16/10 overflow-hidden bg-gray-100">
                      <img
                        src={art.imageUrl}
                        alt={art.title}
                        className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                      />
                    </div>
                    <div className="p-4">
                      {art.headlinePrefix && (
                        <span className="text-[10px] font-black uppercase text-[#E0292B] tracking-wider block mb-1">
                          {art.headlinePrefix}
                        </span>
                      )}
                      <h3 className="font-headline font-black text-lg uppercase tracking-tight text-gray-900 group-hover:text-[#0E5B44] leading-snug line-clamp-2">
                        {art.title}
                      </h3>
                      <p className="text-gray-600 text-xs mt-2 line-clamp-2">
                        {art.summary}
                      </p>
                    </div>
                  </div>

                  <div className="p-4 pt-0 flex items-center justify-between text-xs text-gray-400">
                    <span>{art.timeAgo}</span>
                    <span className="flex items-center space-x-1">
                      <Eye className="w-3 h-3" />
                      <span>{(art.viewsCount / 1000).toFixed(0)}k</span>
                    </span>
                  </div>
                </article>
              ))}
            </div>
          </div>
        )}
      </main>

      {/* Footer matching screenshot 10 */}
      <Footer
        onSelectCategory={(cat) => {
          setCurrentCategory(cat);
          setSearchQuery('');
          window.scrollTo({ top: 0, behavior: 'smooth' });
        }}
        onOpenSubscriberModal={() => setShowSubscriberModal(true)}
        onOpenSupport={() => setShowSupportModal(true)}
        onOpenSubmitTip={() => setShowSubmitTipModal(true)}
        onOpenEmailInbox={() => setShowEmailInboxModal(true)}
      />

      {/* Modals */}
      <ArticleModal
        article={activeArticle}
        onClose={handleCloseArticle}
        onOpenArticle={handleOpenArticle}
        relatedArticles={CURATED_ARTICLES.filter(a => a.id !== activeArticle?.id)}
        onOpenSubscriberModal={() => setShowSubscriberModal(true)}
      />

      <SupportModal
        isOpen={showSupportModal}
        onClose={() => setShowSupportModal(false)}
      />

      <EmailFollowupModal
        isOpen={showSubscriberModal || showEmailInboxModal}
        onClose={() => {
          setShowSubscriberModal(false);
          setShowEmailInboxModal(false);
          setDispatchedEmails(getDispatchedEmails());
        }}
      />

      <SubmitTipModal
        isOpen={showSubmitTipModal}
        onClose={() => setShowSubmitTipModal(false)}
      />
    </div>
  );
}
