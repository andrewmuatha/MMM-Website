import React, { useState, useRef } from 'react';
import { ArrowDownToLine, ArrowRight, ArrowUpRight } from 'lucide-react';
import { InsightItem } from '../../types/cms';
import { HoverImageReveal } from '../HoverImageReveal';

interface ArchiveListProps {
  items: InsightItem[];
  isEventsCategory?: boolean;
  isPublicationsCategory?: boolean;
  onSelectArticle: (article: InsightItem) => void;
  onSelectCategory?: (category: string) => void;
}

export const ArchiveList: React.FC<ArchiveListProps> = ({
  items,
  isEventsCategory = false,
  isPublicationsCategory = false,
  onSelectArticle,
  onSelectCategory,
}) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const firstNewItemRef = useRef<HTMLAnchorElement | null>(null);

  // Cursor hover image reveal state
  const [hoverState, setHoverState] = useState<{
    imageUrl: string | null;
    x: number;
    y: number;
    visible: boolean;
    rowId: string | null;
  }>({
    imageUrl: null,
    x: 0,
    y: 0,
    visible: false,
    rowId: null,
  });

  const handleLoadMore = () => {
    const prevCount = visibleCount;
    const newCount = prevCount + 10;
    const addedCount = Math.min(10, items.length - prevCount);
    setVisibleCount(newCount);
    setLiveAnnouncement(`${addedCount} more insights loaded`);

    setTimeout(() => {
      if (firstNewItemRef.current) {
        firstNewItemRef.current.focus();
      }
    }, 100);
  };

  // If Events category: split into Upcoming and Past events
  if (isEventsCategory) {
    const upcomingEvents = items
      .filter((i) => !i.eventDetails?.isPast)
      .sort((a, b) => {
        const dateA = a.eventDetails?.startDate || a.publishedAt;
        const dateB = b.eventDetails?.startDate || b.publishedAt;
        return dateA.localeCompare(dateB); // soonest first
      });

    const pastEvents = items
      .filter((i) => i.eventDetails?.isPast)
      .sort((a, b) => {
        const dateA = a.eventDetails?.startDate || a.publishedAt;
        const dateB = b.eventDetails?.startDate || b.publishedAt;
        return dateB.localeCompare(dateA); // most recent first
      });

    return (
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 pb-20 sm:pb-24 lg:pb-[120px] space-y-16">
        {/* Upcoming Events Group */}
        {upcomingEvents.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] text-[#16233F]">
              Upcoming events
            </h2>
            <div className="divide-y divide-[#1A1815]/12 border-t border-b border-[#1A1815]/12">
              {upcomingEvents.map((item) => (
                <div
                  key={item.id}
                  className="py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F6F3EC]/50 transition-colors"
                >
                  <div className="space-y-2 max-w-2xl">
                    <span className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold block">
                      {item.category}
                    </span>
                    <h3 className="font-serif text-[24px] sm:text-[28px] leading-[34px] text-[#16233F] hover:text-[#7A2142]">
                      <a
                        href={`/insights/${item.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectArticle(item);
                        }}
                      >
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-[14px] text-[#5F5D55]">
                      {item.eventDetails?.displayDate} · {item.eventDetails?.timeString || 'EAT (UTC+3)'} · {item.eventDetails?.format || 'Hybrid'}
                    </p>
                  </div>

                  <div className="shrink-0 flex items-center gap-4">
                    {item.eventDetails?.status === 'Open' && (
                      <a
                        href={`/insights/${item.slug}#event-details`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectArticle(item);
                        }}
                        className="inline-flex items-center gap-1.5 px-5 py-2.5 bg-[#16233F] text-[#FDFCF8] text-[13px] uppercase tracking-wider font-semibold hover:bg-[#7A2142] transition-colors"
                      >
                        <span>Register</span>
                        <ArrowUpRight size={14} />
                      </a>
                    )}
                    <ArrowRight size={18} className="text-[#16233F]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Past Events Group */}
        {pastEvents.length > 0 && (
          <div className="space-y-6">
            <h2 className="font-serif text-[28px] sm:text-[34px] lg:text-[40px] text-[#16233F]">
              Past events
            </h2>
            <div className="divide-y divide-[#1A1815]/12 border-t border-b border-[#1A1815]/12">
              {pastEvents.map((item) => (
                <div
                  key={item.id}
                  className="py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F6F3EC]/50 transition-colors"
                >
                  <div className="space-y-2 max-w-2xl">
                    <div className="flex items-center gap-3">
                      <span className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold">
                        {item.category}
                      </span>
                      <span className="text-[12px] uppercase tracking-wider text-[#86847A] font-medium bg-[#86847A]/15 px-2 py-0.5">
                        Past event
                      </span>
                    </div>
                    <h3 className="font-serif text-[24px] sm:text-[28px] leading-[34px] text-[#16233F] hover:text-[#7A2142]">
                      <a
                        href={`/insights/${item.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectArticle(item);
                        }}
                      >
                        {item.title}
                      </a>
                    </h3>
                    <p className="text-[14px] text-[#5F5D55]">
                      {item.eventDetails?.displayDate || item.displayDate} · {item.eventDetails?.venueName || 'Nairobi'}
                    </p>
                  </div>

                  <div className="shrink-0">
                    <ArrowRight size={18} className="text-[#16233F]" />
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    );
  }

  // If Publications category: library shelf grid (the only grid exception per spec)
  if (isPublicationsCategory) {
    return (
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 pb-20 sm:pb-24 lg:pb-[120px]">
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-x-4 sm:gap-x-6 gap-y-10 sm:gap-y-14">
          {items.slice(0, visibleCount).map((item) => {
            const pub = item.publicationDetails;
            const fileSize = pub?.fileSize || '3.2 MB';

            return (
              <article key={item.id} className="group flex flex-col justify-between">
                <div>
                  {/* Cover 1:1.414 ISO A4 */}
                  <a
                    href={`/insights/${item.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectArticle(item);
                    }}
                    className="block relative aspect-[1/1.414] bg-[#16233F] border border-[#1A1815]/12 overflow-hidden mb-5 transition-transform duration-500 group-hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-[#16233F]"
                  >
                    {item.heroImage ? (
                      <img
                        src={item.heroImage}
                        alt=""
                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#16233F] flex flex-col justify-between p-6">
                        <span className="font-serif text-[#C6A455] text-lg">MMM</span>
                        <span className="text-[12px] text-[#FDFCF8]">{item.title}</span>
                      </div>
                    )}
                  </a>

                  <h3 className="font-serif text-[20px] sm:text-[22px] leading-[1.3] text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                    <a
                      href={`/insights/${item.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectArticle(item);
                      }}
                    >
                      {item.title}
                    </a>
                  </h3>

                  <p className="pt-2 text-[14px] text-[#5F5D55]">
                    <time dateTime={item.publishedAt}>{item.displayDate}</time>
                  </p>
                </div>

                <div className="pt-4">
                  <a
                    href={pub?.pdfUrl || '#'}
                    download
                    className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] font-medium text-[#16233F] hover:text-[#7A2142] transition-colors"
                  >
                    <ArrowDownToLine size={15} />
                    <span>Download PDF ({fileSize})</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>

        {items.length > visibleCount && (
          <div className="pt-16 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="h-[48px] px-8 border border-[#16233F] bg-transparent text-[#16233F] text-[14px] uppercase tracking-[0.08em] font-medium hover:bg-[#16233F] hover:text-[#FDFCF8] transition-colors"
            >
              Load more insights
            </button>
          </div>
        )}
      </div>
    );
  }

  // Standard category / topic / author list: Lead pair (1 & 2) + editorial rows (3 to 10)
  const leadPairItems = items.slice(0, 2);
  const editorialRowItems = items.slice(2, visibleCount);
  const hasMore = items.length > visibleCount;

  return (
    <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 pb-20 sm:pb-24 lg:pb-[120px]">
      <div className="sr-only" aria-live="polite" role="status">
        {liveAnnouncement}
      </div>

      {/* Lead Pair (items 1 & 2) */}
      {leadPairItems.length > 0 && (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16">
          {leadPairItems.map((item) => (
            <article key={item.id} className="group flex flex-col justify-between">
              <div>
                <a
                  href={`/insights/${item.slug}`}
                  onClick={(e) => {
                    e.preventDefault();
                    onSelectArticle(item);
                  }}
                  className="block relative aspect-[3/2] overflow-hidden bg-[#16233F] mb-6 focus-visible:outline-2 focus-visible:outline-[#16233F]"
                >
                  {item.heroImage ? (
                    <img
                      src={item.heroImage}
                      alt=""
                      className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                    />
                  ) : (
                    <div className="w-full h-full bg-[#16233F] flex items-center justify-center">
                      <span className="font-serif text-[#C6A455] text-xl">MMM</span>
                    </div>
                  )}
                </a>

                <span className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold block mb-2">
                  {item.category}
                </span>

                <h3 className="font-serif text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.25] text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                  <a
                    href={`/insights/${item.slug}`}
                    onClick={(e) => {
                      e.preventDefault();
                      onSelectArticle(item);
                    }}
                  >
                    {item.title}
                  </a>
                </h3>

                <p className="pt-4 text-[16px] sm:text-[17px] leading-[1.65] text-[#5F5D55] line-clamp-2">
                  {item.excerpt}
                </p>
              </div>

              <div className="pt-5 text-[14px] text-[#5F5D55] flex flex-wrap items-center gap-1.5">
                <span className="font-medium text-[#1A1815]">By {item.author.name}</span>
                <span aria-hidden="true">·</span>
                <time dateTime={item.publishedAt}>{item.displayDate}</time>
                <span aria-hidden="true">·</span>
                <span>{item.readTimeMinutes || 5} min read</span>
              </div>
            </article>
          ))}
        </div>
      )}

      {/* Editorial Rows (items 3 to 10) */}
      {editorialRowItems.length > 0 && (
        <div className="divide-y divide-[#1A1815]/12 border-t border-b border-[#1A1815]/12">
          {editorialRowItems.map((item, index) => {
            const isFirstNew = index === 0 && visibleCount > 10;
            return (
              <div
                key={item.id}
                onMouseEnter={(e) => {
                  if (item.heroImage) {
                    setHoverState({
                      imageUrl: item.heroImage,
                      x: e.clientX,
                      y: e.clientY,
                      visible: true,
                      rowId: item.id,
                    });
                  }
                }}
                onMouseMove={(e) => {
                  if (hoverState.rowId === item.id) {
                    setHoverState((prev) => ({
                      ...prev,
                      x: e.clientX,
                      y: e.clientY,
                    }));
                  }
                }}
                onMouseLeave={() => {
                  setHoverState((prev) => ({ ...prev, visible: false, rowId: null }));
                }}
                className="group relative transition-colors hover:bg-[#F6F3EC]/50 py-6 sm:py-7 lg:py-8"
              >
                {/* Desktop 1440 Grid Layout */}
                <div className="hidden lg:grid grid-cols-12 gap-6 items-center">
                  <div className="col-span-2">
                    <span className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold">
                      {item.category}
                    </span>
                  </div>

                  <div className="col-span-7 transition-transform duration-400 group-hover:translate-x-1.5">
                    <h3 className="font-serif text-[26px] xl:text-[28px] leading-[1.3] text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                      <a
                        ref={isFirstNew ? firstNewItemRef : undefined}
                        href={`/insights/${item.slug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectArticle(item);
                        }}
                      >
                        {item.title}
                      </a>
                    </h3>
                    <p className="pt-2 text-[15px] text-[#5F5D55]">By {item.author.name}</p>
                  </div>

                  <div className="col-span-2 text-right">
                    <time dateTime={item.publishedAt} className="block text-[14px] text-[#1A1815] font-medium">
                      {item.displayDate}
                    </time>
                    <span className="block pt-1 text-[13px] text-[#5F5D55]">
                      {item.readTimeMinutes || 6} min read
                    </span>
                  </div>

                  <div className="col-span-1 flex justify-end">
                    <ArrowRight
                      size={18}
                      className="text-[#16233F] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#7A2142]"
                    />
                  </div>
                </div>

                {/* Tablet / Mobile Layout */}
                <div className="lg:hidden flex flex-col gap-2">
                  <span className="text-[11px] sm:text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold">
                    {item.category}
                  </span>
                  <h3 className="font-serif text-[20px] sm:text-[24px] leading-[1.3] text-[#16233F] group-hover:text-[#7A2142]">
                    <a
                      href={`/insights/${item.slug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        onSelectArticle(item);
                      }}
                    >
                      {item.title}
                    </a>
                  </h3>
                  <div className="text-[13px] text-[#5F5D55] flex items-center gap-1.5 pt-1">
                    <span>By {item.author.name}</span>
                    <span aria-hidden="true">·</span>
                    <time dateTime={item.publishedAt}>{item.displayDate}</time>
                    <span aria-hidden="true">·</span>
                    <span>{item.readTimeMinutes || 5} min read</span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Pagination button */}
      {hasMore && (
        <div className="pt-16 text-center">
          <button
            type="button"
            onClick={handleLoadMore}
            className="group relative inline-flex items-center justify-center h-[48px] px-8 border border-[#16233F] bg-transparent text-[#16233F] text-[14px] uppercase tracking-[0.08em] font-medium hover:bg-[#16233F] hover:text-[#FDFCF8] transition-colors"
          >
            <span className="text-roll">
              <span className="text-roll-stack">
                <span>Load more insights</span>
                <span>Load more insights</span>
              </span>
            </span>
          </button>
        </div>
      )}

      {/* Cursor hover follower */}
      <HoverImageReveal
        imageUrl={hoverState.imageUrl}
        targetX={hoverState.x}
        targetY={hoverState.y}
        visible={hoverState.visible}
      />
    </div>
  );
};
