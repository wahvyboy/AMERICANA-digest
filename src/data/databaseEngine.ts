import { Article, Category } from '../types';
import { CURATED_ARTICLES } from './curatedArticles';

// Authoritative in-memory article database sourced directly from verified newsroom articles
export const NEWS_DATABASE: Article[] = [...CURATED_ARTICLES];

// Efficient query helper with instant filtering over genuine curated articles
export interface QueryOptions {
  query?: string;
  category?: Category;
  page?: number;
  pageSize?: number;
  tag?: string;
  sortBy?: 'latest' | 'popular' | 'views';
}

export function queryNewsArchive(options: QueryOptions = {}) {
  const {
    query = '',
    category = 'All',
    page = 1,
    pageSize = 18,
    tag = '',
    sortBy = 'latest'
  } = options;

  let filtered = NEWS_DATABASE;

  if (category && category !== 'All') {
    if (category === 'Latest News') {
      filtered = filtered.filter(a => a.category === 'Latest News' || a.category === 'Politics');
    } else {
      filtered = filtered.filter(a => a.category === category);
    }
  }

  if (tag) {
    const lowerTag = tag.toLowerCase();
    filtered = filtered.filter(a => a.tags.some(t => t.toLowerCase().includes(lowerTag)));
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) ||
      (a.headlinePrefix && a.headlinePrefix.toLowerCase().includes(q)) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (sortBy === 'popular' || sortBy === 'views') {
    filtered = [...filtered].sort((a, b) => b.viewsCount - a.viewsCount);
  } else {
    // Sort by publishedAt date descending by default
    filtered = [...filtered].sort((a, b) => new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime());
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedArticles = filtered.slice(startIndex, startIndex + pageSize);

  return {
    articles: paginatedArticles,
    totalCount,
    totalPages,
    currentPage: page
  };
}
