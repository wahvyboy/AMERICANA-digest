export type Category = 
  | 'All'
  | 'Politics'
  | 'Latest News'
  | 'Life'
  | 'Shopping'
  | 'Business & Tech';

export interface Backlink {
  text: string;
  url: string;
  source: string;
  isExternal?: boolean;
}

export interface AEOFAQ {
  question: string;
  answer: string;
}

export interface Article {
  id: string;
  title: string;
  headlinePrefix?: string;
  subtitle?: string;
  category: Category;
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  publishedAt: string;
  timeAgo: string;
  readTime: string;
  imageUrl: string;
  imageCaption?: string;
  summary: string;
  content: string[];
  backlinks: Backlink[];
  aeoQuickTakeaways: string[];
  faq: AEOFAQ[];
  isBreaking?: boolean;
  isLeadStory?: boolean;
  tags: string[];
  viewsCount: number;
  likesCount?: number;
  commentsCount?: number;
}

export interface LiveUpdate {
  id: string;
  text: string;
  timestamp: string;
  category: string;
  linkText?: string;
}

export interface Subscriber {
  email: string;
  name?: string;
  subscribedAt: string;
  topics: string[];
  emailConfirmationSent: boolean;
  confirmationId: string;
}

export interface AutomatedEmail {
  id: string;
  from: string;
  to: string;
  subject: string;
  sentAt: string;
  previewText: string;
  bodyHtml: string;
  status: 'delivered' | 'sending';
}
