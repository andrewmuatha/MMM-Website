export type InsightCategory =
  | 'Legal updates'
  | 'Client alerts'
  | 'Articles'
  | 'News'
  | 'Events'
  | 'Publications';

export type PartnerInitials = 'TWM' | 'DGM' | 'MM';

export interface Author {
  name: string;
  fullName?: string;
  role: string;
  initials: PartnerInitials;
  avatarUrl?: string;
  slug?: string;
  linkedInUrl?: string;
  bio?: string;
  description?: string;
}

export interface Topic {
  slug: string;
  name: string;
  isPractice?: boolean;
  practiceName?: string;
  practiceUrl?: string;
  description?: string;
}

export interface CategoryMeta {
  name: InsightCategory;
  slug: string;
  description: string;
}

export type ArchiveVariant = 'category' | 'topic' | 'author';

export interface ArchiveContext {
  variant: ArchiveVariant;
  slug: string;
  title: string;
  description?: string;
  breadcrumbName: string;
  // Variant extras
  practiceLink?: { name: string; url: string };
  authorMeta?: Author;
}

export interface EventDetails {
  startDate: string; // ISO date '2026-11-12'
  displayDate: string; // '12 November 2026'
  timeString?: string; // '09:00 - 16:30 EAT (UTC+3)'
  format?: 'In-person' | 'Hybrid' | 'Virtual';
  venueName?: string;
  venueAddress?: string;
  status?: 'Open' | 'Closed' | 'Past';
  isPast: boolean;
  registrationUrl?: string;
}

export interface PublicationDetails {
  title?: string;
  description?: string;
  pages: number;
  fileSize: string; // '3.4 MB'
  pdfUrl: string;
}

export interface VideoMedia {
  posterUrl: string;
  videoTitle: string;
  embedUrl: string;
  platform: 'YouTube' | 'Vimeo';
}

export interface GalleryImage {
  url: string;
  caption: string;
  credit?: string;
}

export interface TableData {
  caption: string;
  headers: string[];
  rows: (string | number)[][];
  isWide?: boolean;
  source?: string;
  numericCols?: number[]; // indices of numeric columns
}

export interface FootnoteItem {
  id: number;
  text: string;
}

export type RichContentBlock =
  | { type: 'paragraph'; text: string }
  | { type: 'h2'; id: string; text: string }
  | { type: 'h3'; text: string }
  | { type: 'list-unordered'; items: string[] }
  | { type: 'list-ordered'; items: string[] }
  | { type: 'blockquote'; quote: string; citation?: string }
  | { type: 'pullquote'; quote: string; attribution?: string }
  | { type: 'takeaways'; title?: string; items: string[] }
  | { type: 'note'; text: string }
  | { type: 'table'; data: TableData }
  | { type: 'figure'; url: string; caption: string; credit?: string; width?: 'measure' | 'wide' | 'full-bleed' }
  | { type: 'video'; data: VideoMedia; caption?: string }
  | { type: 'gallery'; images: GalleryImage[] }
  | { type: 'audio'; title: string; duration: string; audioUrl: string; transcriptUrl?: string }
  | { type: 'divider' }
  | { type: 'pdf-block'; data: PublicationDetails };

export interface InsightItem {
  id: string;
  title: string;
  slug: string;
  category: InsightCategory;
  categorySlug: string;
  excerpt: string;
  author: Author;
  coAuthors?: Author[];
  publishedAt: string; // ISO date '2026-09-18'
  displayDate: string; // '18 September 2026'
  updatedAt?: string; // ISO date e.g. '2026-09-25'
  displayUpdatedDate?: string;
  updateNote?: string;
  readTimeMinutes?: number;
  heroImage?: string;
  heroVideo?: VideoMedia;
  heroCaption?: string;
  heroCredit?: string;
  imageAlt?: string;
  featured?: boolean;
  isSample?: boolean;
  noindex?: boolean;
  seoTitle?: string;
  seoDescription?: string;
  topics: Topic[];
  eventDetails?: EventDetails;
  publicationDetails?: PublicationDetails;
  contentBlocks?: RichContentBlock[];
  footnotes?: FootnoteItem[];
  relatedPicks?: string[]; // IDs of manual related items
}

export type CmsMode = 'full' | 'partial-1' | 'partial-3' | 'empty';

