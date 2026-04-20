export interface HelpArticle {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  content: string; // Markdown or HTML content
  category: string;
  views: number;
  rating: number; // e.g., 4.8
  ratingCount: number;
  readTime: number; // in minutes
  lastUpdated: string;
  relatedArticleSlugs?: string[];
}

export interface HelpCategory {
  id: string;
  name: string;
  icon: string;
  articleCount: number;
}

export interface SupportTicket {
  subject: string;
  category: 'Technical' | 'Billing' | 'Feature Request' | 'Bug Report';
  priority: 'Low' | 'Normal' | 'High' | 'Urgent';
  description: string;
  files?: File[];
  relatedProjectId?: string;
  includeSystemInfo: boolean;
}