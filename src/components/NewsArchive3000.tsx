import React, { useState, useMemo } from 'react';
import { Search, Filter, Calendar, Flame, Eye, ArrowUpDown, ChevronLeft, ChevronRight, BookOpen, Sparkles, Check } from 'lucide-react';
import { Article, Category } from '../types';
import { queryNewsArchive } from '../data/databaseEngine';

interface NewsArchive3000Props {
  onOpenArticle: (article: Article) => void;
  onCloseArchive?: () => void;
}

export const NewsArchive3000: React.FC<NewsArchive3000Props> = ({ onOpenArticle, onCloseArchive }) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<Category>('All');
  const [selectedTag, setSelectedTag] = useState('');
  const [sortBy, setSortBy] = useState<'latest' | 'popular'>('latest');
  const [currentPage, setCurrentPage] = useState(1);
  const pageSize = 18;

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

  const popularTags = [
    'Midterms 2026',
    'Supreme Court',
    'Inflation',
    'Artificial Intelligence',
    'Labor',
    'Defense',
    'Health',
    'Shopping Deals',
    'Parenting'
  ];

  // Fast memoized query
  const searchResults = useMemo(() => {
    return queryNewsArchive({
      query: searchQuery,
      category: selectedCategory,
      tag: selectedTag,
      sortBy,
      page: currentPage,
      pageSize
    });
  }, [searchQuery, selectedCategory, selectedTag, sortBy, currentPage]);

  const handlePageChange = (newPage: number) => {
    setCurrentPage(newPage);
    window.scrollTo({ top: 300, behavior: 'smooth' });
  };

  return (
    <section className="bg-gray-50 py-8 px-3 sm:px-6 border-t-2 border-gray-900">
      <div className="max-w-7xl mx-auto">
        {/* Header Title & Speed Indicator */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-6 pb-4 border-b border-gray-200 gap-4">
          <div>
            <div className="flex items-center space-x-2 text-xs font-black uppercase tracking-wider text-[#0E5B44] mb-1">
              <span className="w-2.5 h-2.5 rounded-full bg-emerald-600 animate-pulse" />
              <span>Full Archive Desk • Past 90 Days (July 15 - Oct 15, 2026)</span>
            </div>
            <h2 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tight text-gray-900">
              The 3,000 Stories Intelligence Vault
            </h2>
            <p className="text-gray-600 text-xs sm:text-sm mt-1 max-w-2xl">
              Search and filter across all 3,000 indexed investigations, breaking reports, and consumer reviews covering the last three months of national life.
            </p>
          </div>

          <div className="flex items-center space-x-2 bg-emerald-100/70 border border-emerald-300 text-emerald-900 px-3 py-1.5 rounded text-xs font-mono">
            <Sparkles className="w-3.5 h-3.5 text-emerald-700" />
            <span>Indexed: 3,000 Live Documents • 0ms Render</span>
          </div>
        </div>

        {/* Filter Controls Bar */}
        <div className="bg-white p-4 rounded-xs border border-gray-200 shadow-xs mb-6 space-y-3">
          {/* Search Input */}
          <div className="relative">
            <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => {
                setSearchQuery(e.target.value);
                setCurrentPage(1);
              }}
              placeholder="Search 3,000 articles by keyword, candidate, agency, court docket..."
              className="w-full pl-9 pr-4 py-2 border border-gray-300 rounded text-sm text-gray-900 focus:ring-2 focus:ring-[#0E5B44] focus:outline-none"
            />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-2.5 text-xs text-gray-400 hover:text-gray-700"
              >
                Clear
              </button>
            )}
          </div>

          {/* Category Tabs */}
          <div className="flex items-center space-x-1 overflow-x-auto pb-1 text-xs">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => {
                  setSelectedCategory(cat);
                  setCurrentPage(1);
                }}
                className={`px-3 py-1.5 rounded-full font-bold whitespace-nowrap uppercase tracking-wider transition-colors ${
                  selectedCategory === cat
                    ? 'bg-[#0E5B44] text-white'
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>

          {/* Tags & Sorting */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pt-2 border-t border-gray-100 gap-2 text-xs">
            <div className="flex items-center space-x-1.5 overflow-x-auto pb-1">
              <span className="text-gray-400 font-bold uppercase text-[10px]">Filter Tag:</span>
              <button
                onClick={() => {
                  setSelectedTag('');
                  setCurrentPage(1);
                }}
                className={`px-2 py-0.5 rounded text-[11px] ${
                  !selectedTag ? 'bg-gray-800 text-white font-bold' : 'text-gray-600 hover:text-gray-900'
                }`}
              >
                All Tags
              </button>
              {popularTags.map((tag) => (
                <button
                  key={tag}
                  onClick={() => {
                    setSelectedTag(tag);
                    setCurrentPage(1);
                  }}
                  className={`px-2 py-0.5 rounded text-[11px] whitespace-nowrap transition-colors ${
                    selectedTag === tag
                      ? 'bg-[#0E5B44] text-white font-bold'
                      : 'bg-gray-100 text-gray-600 hover:bg-gray-200'
                  }`}
                >
                  #{tag}
                </button>
              ))}
            </div>

            <div className="flex items-center space-x-2 shrink-0">
              <span className="text-gray-400 font-bold uppercase text-[10px]">Sort:</span>
              <button
                onClick={() => setSortBy('latest')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  sortBy === 'latest' ? 'bg-[#0E5B44] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Latest (Past 90d)
              </button>
              <button
                onClick={() => setSortBy('popular')}
                className={`px-2.5 py-1 rounded text-xs font-semibold ${
                  sortBy === 'popular' ? 'bg-[#0E5B44] text-white' : 'bg-gray-100 text-gray-700'
                }`}
              >
                Most Viewed
              </button>
            </div>
          </div>
        </div>

        {/* Results Count Bar */}
        <div className="flex items-center justify-between text-xs text-gray-500 mb-4 px-1">
          <span>
            Showing <strong className="text-gray-900">{searchResults.articles.length}</strong> of{' '}
            <strong className="text-gray-900">{searchResults.totalCount.toLocaleString()}</strong> articles
          </span>
          <span>
            Page {searchResults.currentPage} of {searchResults.totalPages || 1}
          </span>
        </div>

        {/* 3000 Articles Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {searchResults.articles.map((art) => (
            <article
              key={art.id}
              onClick={() => onOpenArticle(art)}
              className="bg-white border border-gray-200 rounded-xs overflow-hidden hover:shadow-md transition-shadow cursor-pointer flex flex-col group"
            >
              <div className="aspect-16/10 relative overflow-hidden bg-gray-100">
                <img
                  src={art.imageUrl}
                  alt={art.title}
                  loading="lazy"
                  className="w-full h-full object-cover group-hover:scale-102 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 bg-[#0E5B44] text-white text-[10px] font-bold uppercase px-2 py-0.5 rounded shadow-xs">
                  {art.category}
                </div>
              </div>

              <div className="p-4 flex-1 flex flex-col justify-between">
                <div>
                  {art.headlinePrefix && (
                    <span className="text-[10px] font-black uppercase text-[#E0292B] tracking-wider block mb-1">
                      {art.headlinePrefix}
                    </span>
                  )}
                  <h3 className="font-headline font-black text-lg text-gray-900 group-hover:text-[#0E5B44] uppercase leading-snug line-clamp-2">
                    {art.title}
                  </h3>
                  <p className="text-gray-600 text-xs mt-2 line-clamp-2 leading-relaxed">
                    {art.summary}
                  </p>
                </div>

                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between text-[11px] text-gray-400">
                  <div className="flex items-center space-x-1">
                    <span>{art.author.name}</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <span>{art.timeAgo}</span>
                    <span>•</span>
                    <span className="flex items-center space-x-0.5">
                      <Eye className="w-3 h-3" />
                      <span>{(art.viewsCount / 1000).toFixed(1)}k</span>
                    </span>
                  </div>
                </div>
              </div>
            </article>
          ))}
        </div>

        {/* Pagination Controls */}
        {searchResults.totalPages > 1 && (
          <div className="mt-8 pt-6 border-t border-gray-200 flex items-center justify-center space-x-2">
            <button
              onClick={() => handlePageChange(Math.max(1, currentPage - 1))}
              disabled={currentPage === 1}
              className="p-2 border border-gray-300 rounded hover:bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Previous page"
            >
              <ChevronLeft className="w-4 h-4" />
            </button>

            {/* Direct Page Numbers */}
            <div className="flex items-center space-x-1 text-xs font-bold">
              {[
                1,
                currentPage > 3 ? -1 : null,
                currentPage > 2 ? currentPage - 1 : null,
                currentPage !== 1 && currentPage !== searchResults.totalPages ? currentPage : null,
                currentPage < searchResults.totalPages - 1 ? currentPage + 1 : null,
                currentPage < searchResults.totalPages - 2 ? -2 : null,
                searchResults.totalPages
              ]
                .filter(Boolean)
                .map((p, idx) => {
                  if (typeof p === 'number' && p < 0) {
                    return <span key={idx} className="px-1 text-gray-400">...</span>;
                  }
                  return (
                    <button
                      key={idx}
                      onClick={() => handlePageChange(p as number)}
                      className={`w-8 h-8 rounded flex items-center justify-center transition-colors ${
                        currentPage === p
                          ? 'bg-[#0E5B44] text-white shadow-xs'
                          : 'border border-gray-200 bg-white text-gray-700 hover:bg-gray-100'
                      }`}
                    >
                      {p}
                    </button>
                  );
                })}
            </div>

            <button
              onClick={() => handlePageChange(Math.min(searchResults.totalPages, currentPage + 1))}
              disabled={currentPage === searchResults.totalPages}
              className="p-2 border border-gray-300 rounded hover:bg-white text-gray-700 disabled:opacity-30 disabled:cursor-not-allowed"
              aria-label="Next page"
            >
              <ChevronRight className="w-4 h-4" />
            </button>
          </div>
        )}
      </div>
    </section>
  );
};
