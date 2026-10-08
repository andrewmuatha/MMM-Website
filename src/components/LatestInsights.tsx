import React, { useState, useRef, useEffect } from 'react';
import { ArrowRight, ArrowUpRight } from 'lucide-react';
import { InsightCategory, InsightItem, Topic } from '../types/cms';
import { HoverImageReveal } from './HoverImageReveal';

interface LatestInsightsProps {
  items: InsightItem[];
  sectionNumber?: string;
  selectedCategory: string;
  onSelectCategory: (category: string) => void;
  selectedTopic: string | null;
  onSelectTopic: (topicSlug: string | null) => void;
  isPartialState?: boolean;
  onSelectArticle?: (article: InsightItem) => void;
}

const CATEGORY_ORDER: InsightCategory[] = [
  'Legal updates',
  'Client alerts',
  'Articles',
  'News',
  'Events',
  'Publications',
];

export const LatestInsights: React.FC<LatestInsightsProps> = ({
  items,
  sectionNumber = '02',
  selectedCategory,
  onSelectCategory,
  selectedTopic,
  onSelectTopic,
  isPartialState = false,
  onSelectArticle,
}) => {
  const [visibleCount, setVisibleCount] = useState(10);
  const [liveAnnouncement, setLiveAnnouncement] = useState('');
  const [expandedTopics, setExpandedTopics] = useState(false);
  const firstNewItemRef = useRef<HTMLAnchorElement | null>(null);

  // Category bar sliding indicator state
  const navRef = useRef<HTMLElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Cursor follow hover image reveal state
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

  // Filter items by category & topic
  const filteredItems = items.filter((item) => {
    if (selectedCategory !== 'All' && item.category !== selectedCategory) {
      return false;
    }
    if (selectedTopic && !item.topics.some((t) => t.slug === selectedTopic)) {
      return false;
    }
    return true;
  });

  // Published categories with at least 1 published item
  const publishedCategories = CATEGORY_ORDER.filter((cat) =>
    items.some((item) => item.category === cat)
  );

  // Requirement: The whole bar appears only when there are 4 or more published items across 2 or more categories.
  const showCategoryBar =
    !isPartialState && items.length >= 4 && publishedCategories.length >= 2;

  // Extract topics with at least one published item
  const topicMap = new Map<string, { topic: Topic; count: number }>();
  items.forEach((item) => {
    item.topics.forEach((t) => {
      const existing = topicMap.get(t.slug);
      if (existing) {
        existing.count += 1;
      } else {
        topicMap.set(t.slug, { topic: t, count: 1 });
      }
    });
  });

  const allPublishedTopics = Array.from(topicMap.values())
    .sort((a, b) => {
      // Practice topics first in sort order, then general topics by count
      if (a.topic.isPractice && !b.topic.isPractice) return -1;
      if (!a.topic.isPractice && b.topic.isPractice) return 1;
      return b.count - a.count;
    })
    .map((v) => v.topic);

  // Requirement: Hidden entirely when fewer than 2 topics have content
  const showTopicsRow = !isPartialState && allPublishedTopics.length >= 2;

  // Limit topics to 8 unless expanded
  const displayedTopics = expandedTopics
    ? allPublishedTopics
    : allPublishedTopics.slice(0, 8);

  // Update sliding underline on category change or resize
  useEffect(() => {
    if (!showCategoryBar || !navRef.current) return;

    const activeEl = navRef.current.querySelector(
      `[data-category="${selectedCategory}"]`
    ) as HTMLElement;

    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
      // Scroll active item into view on mobile
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [selectedCategory, showCategoryBar, publishedCategories.length]);

  const handleCategoryClick = (cat: string) => {
    onSelectCategory(cat);
    setVisibleCount(10);
    const targetSlug = cat === 'All' ? '' : `/category/${cat.toLowerCase().replace(/\s+/g, '-')}`;
    window.history.pushState({}, '', `/insights${targetSlug}`);
  };

  const handleTopicClick = (slug: string) => {
    const nextTopic = selectedTopic === slug ? null : slug;
    onSelectTopic(nextTopic);
    setVisibleCount(10);
    const targetUrl = nextTopic ? `/insights/topic/${nextTopic}` : '/insights';
    window.history.pushState({}, '', targetUrl);
  };

  const handleLoadMore = () => {
    const prevCount = visibleCount;
    const newCount = prevCount + 10;
    const addedCount = Math.min(10, filteredItems.length - prevCount);
    setVisibleCount(newCount);
    setLiveAnnouncement(`${addedCount} more insights loaded`);

    setTimeout(() => {
      if (firstNewItemRef.current) {
        firstNewItemRef.current.focus();
      }
    }, 100);
  };

  // Split into Lead pair and Editorial rows
  // If partial state (e.g. 2-3 items), spec: "no lead pair, no filter bar, no chips unless 2+ topics"
  const useLeadPair = !isPartialState && filteredItems.length >= 2;
  const leadPairItems = useLeadPair ? filteredItems.slice(0, 2) : [];
  const editorialRowItems = useLeadPair
    ? filteredItems.slice(2, visibleCount)
    : filteredItems.slice(0, visibleCount);

  const hasMore = filteredItems.length > visibleCount;

  return (
    <section
      className="pt-0 pb-16 sm:pb-22 lg:pb-[120px]"
      aria-label="Latest insights"
    >
      {/* Live region for accessibility announcements */}
      <div className="sr-only" aria-live="polite" role="status">
        {liveAnnouncement}
      </div>

      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        {/* Section Heading Row */}
        <div className="space-y-5 mb-8 sm:mb-10">
          <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-medium">
            <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            <span>{sectionNumber}</span>
            <span className="text-[#C6A455]" aria-hidden="true">//</span>
            <span>Latest</span>
          </div>

          <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#16233F]">
            Latest insights.
          </h2>
        </div>
      </div>

      {/* 3A. STICKY CATEGORY FILTER BAR (sticks directly under compact header at top-72px) */}
      {showCategoryBar && (
        <div className="sticky top-[72px] z-30 bg-[#FDFCF8] border-b border-[#1A1815]/12 transition-all">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 relative">
            <nav
              ref={navRef}
              aria-label="Insight categories"
              className="relative flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar scroll-smooth h-[56px]"
            >
              {/* "All" category link */}
              <a
                href="/insights"
                data-category="All"
                aria-current={selectedCategory === 'All' ? 'page' : undefined}
                onClick={(e) => {
                  e.preventDefault();
                  handleCategoryClick('All');
                }}
                className={`shrink-0 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F] focus-visible:outline-offset-2 ${
                  selectedCategory === 'All'
                    ? 'text-[#1A1815] font-semibold'
                    : 'text-[#5F5D55] hover:text-[#1A1815]'
                }`}
              >
                All
              </a>

              {/* Published categories in order */}
              {publishedCategories.map((category) => {
                const slug = category.toLowerCase().replace(/\s+/g, '-');
                const isActive = selectedCategory === category;
                return (
                  <a
                    key={category}
                    href={`/insights/category/${slug}`}
                    data-category={category}
                    aria-current={isActive ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      handleCategoryClick(category);
                    }}
                    className={`shrink-0 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F] focus-visible:outline-offset-2 ${
                      isActive
                        ? 'text-[#1A1815] font-semibold'
                        : 'text-[#5F5D55] hover:text-[#1A1815]'
                    }`}
                  >
                    {category}
                  </a>
                );
              })}

              {/* Active Indicator: one 2px Rich Burgundy underline sliding between items */}
              <span
                className="absolute bottom-0 h-[2px] bg-[#7A2142] transition-all duration-450 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
                aria-hidden="true"
              />
            </nav>

            {/* Right fade mask on overflow for mobile */}
            <div
              className="md:hidden absolute right-0 top-0 bottom-0 w-8 bg-gradient-to-l from-[#FDFCF8] to-transparent pointer-events-none"
              aria-hidden="true"
            />
          </div>
        </div>
      )}

      {/* 3B. TOPIC CHIPS ROW */}
      {showTopicsRow && (
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 pt-5 pb-6">
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <span className="text-[12px] uppercase tracking-[0.14em] text-[#5F5D55] font-medium shrink-0 mr-1">
              Topics:
            </span>

            {displayedTopics.map((topic) => {
              const isActive = selectedTopic === topic.slug;
              return (
                <button
                  key={topic.slug}
                  type="button"
                  onClick={() => handleTopicClick(topic.slug)}
                  aria-pressed={isActive}
                  className={`shrink-0 inline-flex items-center h-[34px] px-3.5 text-[14px] border transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F] ${
                    isActive
                      ? 'border-[#16233F] bg-[#16233F] text-[#FDFCF8]'
                      : 'border-[#1A1815]/24 text-[#1A1815] bg-transparent hover:border-[#16233F] hover:text-[#16233F]'
                  }`}
                >
                  {topic.name}
                </button>
              );
            })}

            {allPublishedTopics.length > 8 && (
              <button
                type="button"
                onClick={() => setExpandedTopics(!expandedTopics)}
                aria-expanded={expandedTopics}
                className="shrink-0 text-[13px] uppercase tracking-[0.08em] font-medium text-[#7A2142] underline ml-2 hover:text-[#16233F] focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                {expandedTopics ? 'Fewer topics' : 'All topics'}
              </button>
            )}

            {selectedTopic && (
              <button
                type="button"
                onClick={() => onSelectTopic(null)}
                className="shrink-0 text-[12px] uppercase tracking-[0.08em] font-medium text-[#5F5D55] hover:text-[#7A2142] ml-2"
              >
                Reset topic
              </button>
            )}
          </div>
        </div>
      )}

      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 pt-6">
        {/* If no articles match current filter */}
        {filteredItems.length === 0 && (
          <div className="py-16 text-center border-t border-[#1A1815]/12 space-y-3">
            <p className="text-[18px] text-[#5F5D55]">
              No insights published under the selected category or topic.
            </p>
            <button
              type="button"
              onClick={() => {
                onSelectCategory('All');
                onSelectTopic(null);
              }}
              className="text-[14px] uppercase tracking-[0.08em] font-semibold text-[#16233F] underline hover:text-[#7A2142]"
            >
              View all insights
            </button>
          </div>
        )}

        {/* 3C. FIRST PAGE LEAD PAIR (Items 1 and 2) */}
        {leadPairItems.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-12 mb-12 sm:mb-16 lg:mb-18">
            {leadPairItems.map((item) => (
              <article key={item.id} className="group flex flex-col justify-between">
                <div>
                  {/* Image 3:2 ratio */}
                  <a
                    href={`/insights/${item.slug}`}
                    onClick={(e) => {
                      if (onSelectArticle) {
                        e.preventDefault();
                        onSelectArticle(item);
                      }
                    }}
                    className="block relative aspect-[3/2] overflow-hidden bg-[#16233F] mb-6 focus-visible:outline-2 focus-visible:outline-[#16233F]"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {item.heroImage ? (
                      <img
                        src={item.heroImage}
                        alt=""
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#16233F] flex items-center justify-center">
                        <span className="font-serif text-[#C6A455] text-xl">MMM</span>
                      </div>
                    )}
                  </a>

                  {/* 24px gap to Category label */}
                  <div>
                    <a
                      href={`/insights/category/${item.categorySlug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(item.category);
                      }}
                      className="inline-block text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-[#16233F]"
                    >
                      {item.category}
                    </a>
                  </div>

                  {/* 12px gap to Title H3 */}
                  <h3 className="pt-3 font-serif text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.25] text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                    <a
                      href={`/insights/${item.slug}`}
                      onClick={(e) => {
                        if (onSelectArticle) {
                          e.preventDefault();
                          onSelectArticle(item);
                        }
                      }}
                      className="focus-visible:outline-2 focus-visible:outline-[#16233F]"
                    >
                      {item.title}
                    </a>
                  </h3>

                  {/* 16px gap to Excerpt clamped to 2 lines */}
                  <p className="pt-4 text-[16px] sm:text-[17px] leading-[1.65] text-[#5F5D55] line-clamp-2">
                    {item.excerpt}
                  </p>
                </div>

                {/* 20px gap to Meta line */}
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

        {/* 3C. EDITORIAL ROWS (Items 3 to 10 and beyond) */}
        {editorialRowItems.length > 0 && (
          <div className="divide-y divide-[#1A1815]/12 border-t border-b border-[#1A1815]/12">
            {editorialRowItems.map((item, index) => {
              const isFirstNew = index === 0 && visibleCount > 10;
              const isEvent = item.category === 'Events';
              const isPublication = item.category === 'Publications';

              // Specific meta format for Events and Publications
              let metaSecondary: string;
              if (isEvent && item.eventDetails) {
                metaSecondary = item.eventDetails.isPast
                  ? 'Past event'
                  : `Event · ${item.eventDetails.displayDate}`;
              } else if (isPublication && item.publicationDetails) {
                metaSecondary = `PDF · ${item.publicationDetails.pages} pages`;
              } else {
                metaSecondary = `${item.readTimeMinutes || 6} min read`;
              }

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
                    {/* Cols 1 to 2: Category label */}
                    <div className="col-span-2">
                      <a
                        href={`/insights/category/${item.categorySlug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(item.category);
                        }}
                        className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-[#16233F]"
                      >
                        {item.category}
                      </a>
                    </div>

                    {/* Cols 3 to 9: Title & Author line below */}
                    <div className="col-span-7 transition-transform duration-400 group-hover:translate-x-1.5">
                      <h3 className="font-serif text-[26px] xl:text-[28px] leading-[1.3] text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                        <a
                          ref={isFirstNew ? firstNewItemRef : undefined}
                          href={`/insights/${item.slug}`}
                          onClick={(e) => {
                            if (onSelectArticle) {
                              e.preventDefault();
                              onSelectArticle(item);
                            }
                          }}
                          className="focus-visible:outline-2 focus-visible:outline-[#16233F]"
                        >
                          {item.title}
                        </a>
                      </h3>
                      <p className="pt-2 text-[15px] text-[#5F5D55]">
                        By {item.author.name}
                      </p>
                    </div>

                    {/* Cols 10 to 11: Date over read time */}
                    <div className="col-span-2 text-right">
                      <time dateTime={item.publishedAt} className="block text-[14px] text-[#1A1815] font-medium">
                        {item.displayDate}
                      </time>
                      <span className="block pt-1 text-[13px] text-[#5F5D55]">
                        {metaSecondary}
                      </span>
                    </div>

                    {/* Col 12: Arrow icon right-aligned */}
                    <div className="col-span-1 flex justify-end">
                      <ArrowRight
                        size={18}
                        className="text-[#16233F] transition-transform duration-300 group-hover:translate-x-1 group-hover:text-[#7A2142]"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Tablet Layout (768 to 1023px) */}
                  <div className="hidden md:flex lg:hidden flex-col gap-3">
                    <div className="flex items-center justify-between text-[13px]">
                      <a
                        href={`/insights/category/${item.categorySlug}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handleCategoryClick(item.category);
                        }}
                        className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold"
                      >
                        {item.category}
                      </a>
                      <time dateTime={item.publishedAt} className="text-[#5F5D55]">
                        {item.displayDate}
                      </time>
                    </div>

                    <div className="flex items-start justify-between gap-4">
                      <h3 className="font-serif text-[24px] sm:text-[26px] leading-[1.3] text-[#16233F] group-hover:text-[#7A2142]">
                        <a
                          href={`/insights/${item.slug}`}
                          onClick={(e) => {
                            if (onSelectArticle) {
                              e.preventDefault();
                              onSelectArticle(item);
                            }
                          }}
                        >
                          {item.title}
                        </a>
                      </h3>
                      <ArrowRight size={18} className="shrink-0 text-[#16233F] mt-1" aria-hidden="true" />
                    </div>

                    <div className="text-[14px] text-[#5F5D55] flex items-center gap-2">
                      <span>By {item.author.name}</span>
                      <span aria-hidden="true">·</span>
                      <span>{metaSecondary}</span>
                    </div>
                  </div>

                  {/* Mobile Layout (< 768px) - No thumbnails */}
                  <div className="flex md:hidden flex-col gap-2">
                    <a
                      href={`/insights/category/${item.categorySlug}`}
                      onClick={(e) => {
                        e.preventDefault();
                        handleCategoryClick(item.category);
                      }}
                      className="text-[11px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold"
                    >
                      {item.category}
                    </a>

                    <h3 className="font-serif text-[20px] sm:text-[22px] leading-[1.35] text-[#16233F] group-hover:text-[#7A2142]">
                      <a
                        href={`/insights/${item.slug}`}
                        onClick={(e) => {
                          if (onSelectArticle) {
                            e.preventDefault();
                            onSelectArticle(item);
                          }
                        }}
                      >
                        {item.title}
                      </a>
                    </h3>

                    <div className="text-[13px] text-[#5F5D55] flex flex-wrap items-center gap-1.5 pt-1">
                      <span>By {item.author.name}</span>
                      <span aria-hidden="true">·</span>
                      <time dateTime={item.publishedAt}>{item.displayDate}</time>
                      <span aria-hidden="true">·</span>
                      <span>{metaSecondary}</span>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {/* 3D. LOAD MORE BUTTON */}
        {hasMore && (
          <div className="pt-16 text-center">
            <button
              type="button"
              onClick={handleLoadMore}
              className="group relative inline-flex items-center justify-center h-[48px] px-8 border border-[#16233F] bg-transparent text-[#16233F] text-[14px] uppercase tracking-[0.08em] font-medium transition-colors hover:bg-[#16233F] hover:text-[#FDFCF8] focus-visible:outline-2 focus-visible:outline-[#16233F] focus-visible:outline-offset-3"
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
      </div>

      {/* Decorative hover image reveal follower (Desktop fine pointer only) */}
      <HoverImageReveal
        imageUrl={hoverState.imageUrl}
        targetX={hoverState.x}
        targetY={hoverState.y}
        visible={hoverState.visible}
      />
    </section>
  );
};
