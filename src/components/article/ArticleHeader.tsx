import React from 'react';
import { ArrowDownToLine, ArrowUpRight, Calendar, Clock, MapPin } from 'lucide-react';
import { InsightItem } from '../../types/cms';

interface ArticleHeaderProps {
  article: InsightItem;
  onNavigateCategory?: (category: string) => void;
  onNavigateTopic?: (topicSlug: string) => void;
}

export const ArticleHeader: React.FC<ArticleHeaderProps> = ({
  article,
  onNavigateCategory,
  onNavigateTopic,
}) => {
  const allAuthors = [article.author, ...(article.coAuthors || [])];
  const isEvent = article.category === 'Events';
  const isPublication = article.category === 'Publications';

  // Format author names string
  const authorNamesDisplay = (() => {
    if (allAuthors.length === 1) return `By ${allAuthors[0].name}`;
    if (allAuthors.length === 2) return `By ${allAuthors[0].name} and ${allAuthors[1].name}`;
    return `By ${allAuthors.slice(0, -1).map((a) => a.name).join(', ')} and ${
      allAuthors[allAuthors.length - 1].name
    }`;
  })();

  const showUpdated =
    article.updatedAt &&
    article.displayUpdatedDate &&
    article.updatedAt > article.publishedAt;

  return (
    <header className="pt-8 sm:pt-10 lg:pt-12 pb-4">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          <div className="lg:col-span-9 lg:col-start-2">
            {/* Category tag: Rich Burgundy with 6px gold diamond ornament */}
            <div className="flex items-center gap-3">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455] shrink-0" aria-hidden="true" />
              <a
                href={`/insights/category/${article.categorySlug}`}
                onClick={(e) => {
                  if (onNavigateCategory) {
                    e.preventDefault();
                    onNavigateCategory(article.category);
                  }
                }}
                className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                {article.category}
              </a>
            </div>

            {/* 20px gap. H1 title: display serif 64/72 desktop, 48/56 tablet, 36/44 mobile */}
            <h1 className="pt-5 font-serif text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.12] text-[#16233F] tracking-tight max-w-[960px] text-balance">
              {article.title}
            </h1>

            {/* 28px gap. Standfirst (Excerpt): display serif 24/36 desktop, 22/34 tablet, 20/30 mobile */}
            <p className="pt-7 font-serif text-[20px] sm:text-[22px] lg:text-[24px] leading-[1.5] text-[#1A1815]/85 max-w-[720px]">
              {article.excerpt}
            </p>

            {/* 40px gap. Byline block, top border 1px Ink Charcoal 12%, padding-top 24px */}
            <div className="mt-10 pt-6 border-t border-[#1A1815]/12 flex flex-col md:flex-row md:items-center justify-between gap-6">
              {/* Author Portraits & Names */}
              <div className="flex items-center gap-4">
                {/* 48px square portraits with 12px overlap for co-authors */}
                <div className="flex items-center -space-x-3">
                  {allAuthors.map((author, index) => (
                    <div
                      key={author.name + index}
                      className="relative w-12 h-12 bg-[#16233F] select-none shrink-0 overflow-hidden ring-2 ring-[#FDFCF8] flex items-center justify-center"
                      title={author.name}
                      aria-hidden="true"
                    >
                      {/* Kuba pattern overlay */}
                      <div className="absolute inset-0 bg-kuba opacity-[0.06] pointer-events-none" />
                      <span className="relative z-10 font-serif text-[16px] font-semibold text-[#C6A455] tracking-wider">
                        {author.initials}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Names and Role */}
                <div>
                  <div className="text-[16px] font-medium text-[#1A1815]">
                    {allAuthors.length === 1 ? (
                      <a
                        href={`/our-team/${allAuthors[0].slug || 'partner'}`}
                        className="hover:text-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
                      >
                        {authorNamesDisplay}
                      </a>
                    ) : (
                      <span>{authorNamesDisplay}</span>
                    )}
                  </div>
                  <div className="text-[14px] text-[#5F5D55]">
                    {allAuthors[0].role || 'Partner'}
                  </div>
                </div>
              </div>

              {/* Meta line: Published, Updated, read time */}
              <div className="text-[14px] text-[#5F5D55] flex flex-wrap items-center gap-1.5 md:text-right">
                <span>
                  Published{' '}
                  <time dateTime={article.publishedAt} className="font-medium text-[#1A1815]">
                    {article.displayDate}
                  </time>
                </span>

                {showUpdated && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>
                      Updated{' '}
                      <time dateTime={article.updatedAt} className="font-medium text-[#1A1815]">
                        {article.displayUpdatedDate}
                      </time>
                    </span>
                  </>
                )}

                {!isEvent && !isPublication && article.readTimeMinutes && (
                  <>
                    <span aria-hidden="true">·</span>
                    <span>{article.readTimeMinutes} min read</span>
                  </>
                )}
              </div>
            </div>

            {/* 24px gap. Topic tags */}
            {article.topics && article.topics.length > 0 && (
              <div className="pt-6 flex flex-wrap items-center gap-2">
                <span className="text-[12px] uppercase tracking-[0.14em] text-[#5F5D55] font-medium mr-2">
                  Topics:
                </span>
                {article.topics.map((topic) => (
                  <a
                    key={topic.slug}
                    href={`/insights/topic/${topic.slug}`}
                    onClick={(e) => {
                      if (onNavigateTopic) {
                        e.preventDefault();
                        onNavigateTopic(topic.slug);
                      }
                    }}
                    className="inline-flex items-center h-[34px] px-3 text-[14px] border border-[#1A1815]/24 bg-transparent text-[#1A1815] hover:border-[#16233F] hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
                  >
                    {topic.name}
                  </a>
                ))}
              </div>
            )}

            {/* Event Details Panel (if Category = Events) */}
            {isEvent && article.eventDetails && (
              <div className="mt-8 bg-[#F6F3EC] p-6 sm:p-8 border-t-2 border-[#16233F] space-y-4">
                <div className="flex items-center gap-2 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
                  <Calendar size={15} className="text-[#C6A455]" aria-hidden="true" />
                  <span>Event Details</span>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-6 pt-2">
                  <div className="space-y-1">
                    <span className="text-[12px] uppercase tracking-wider text-[#5F5D55] block">
                      Date &amp; Time
                    </span>
                    <p className="text-[16px] font-semibold text-[#16233F]">
                      {article.eventDetails.displayDate}
                    </p>
                    <p className="text-[14px] text-[#5F5D55] flex items-center gap-1.5">
                      <Clock size={14} />
                      <span>{article.eventDetails.timeString || '09:00 - 17:00 EAT (UTC+3)'}</span>
                    </p>
                  </div>

                  <div className="space-y-1">
                    <span className="text-[12px] uppercase tracking-wider text-[#5F5D55] block">
                      Venue &amp; Format
                    </span>
                    <p className="text-[16px] font-semibold text-[#16233F]">
                      {article.eventDetails.venueName || 'MMM Advocates Nairobi Conference Hall'}
                    </p>
                    <p className="text-[14px] text-[#5F5D55] flex items-start gap-1.5">
                      <MapPin size={14} className="shrink-0 mt-0.5" />
                      <span>{article.eventDetails.venueAddress || 'Delta Corner Annex, Westlands, Nairobi'}</span>
                    </p>
                  </div>

                  <div className="flex flex-col justify-end items-start md:items-end">
                    {article.eventDetails.isPast ? (
                      <span className="inline-flex items-center px-4 py-2 bg-[#86847A]/20 text-[#5F5D55] text-[13px] uppercase tracking-wider font-semibold">
                        Past event
                      </span>
                    ) : article.eventDetails.status === 'Open' ? (
                      <a
                        href={article.eventDetails.registrationUrl || '#register'}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="group relative inline-flex items-center justify-center h-[48px] px-8 bg-[#16233F] text-[#FDFCF8] text-[14px] uppercase tracking-[0.08em] font-semibold transition-colors hover:bg-[#7A2142] focus-visible:outline-2 focus-visible:outline-[#16233F]"
                      >
                        <span className="text-roll mr-2">
                          <span className="text-roll-stack">
                            <span>Register</span>
                            <span>Register</span>
                          </span>
                        </span>
                        <ArrowUpRight size={16} aria-hidden="true" />
                        <span className="sr-only">(opens in a new tab)</span>
                      </a>
                    ) : (
                      <span className="text-[14px] text-[#5F5D55]">Registration closed</span>
                    )}
                  </div>
                </div>
              </div>
            )}

            {/* Publication PDF Download Block (above hero for publications per section 2) */}
            {isPublication && article.publicationDetails && (
              <div className="mt-8 border border-[#1A1815]/16 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 bg-[#FDFCF8]">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#16233F] text-[#C6A455] flex items-center justify-center shrink-0">
                    <ArrowDownToLine size={20} />
                  </div>
                  <div className="space-y-1">
                    <h3 className="text-[18px] font-semibold text-[#16233F]">
                      {article.publicationDetails.title || article.title}
                    </h3>
                    <p className="text-[14px] text-[#5F5D55]">
                      PDF · {article.publicationDetails.fileSize} · {article.publicationDetails.pages} pages
                    </p>
                  </div>
                </div>

                <a
                  href={article.publicationDetails.pdfUrl}
                  download
                  aria-label={`Download ${article.title}, PDF, ${article.publicationDetails.fileSize}`}
                  className="group relative inline-flex items-center justify-center shrink-0 h-[48px] px-7 bg-[#16233F] text-[#FDFCF8] text-[13px] uppercase tracking-[0.08em] font-semibold transition-colors hover:bg-[#7A2142] focus-visible:outline-2 focus-visible:outline-[#16233F]"
                >
                  <span className="text-roll mr-2">
                    <span className="text-roll-stack">
                      <span>Download PDF</span>
                      <span>Download PDF</span>
                    </span>
                  </span>
                  <ArrowDownToLine size={16} aria-hidden="true" />
                </a>
              </div>
            )}

            {/* Update note callout (if filled) */}
            {article.updateNote && (
              <div className="mt-8 p-5 border border-[#1A1815]/24 bg-transparent text-[15px] leading-relaxed text-[#1A1815]">
                <span className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold block mb-1">
                  Note
                </span>
                <span>
                  <strong>Updated {article.displayUpdatedDate}:</strong> {article.updateNote}
                </span>
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
};
