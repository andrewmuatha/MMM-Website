import React, { useRef, useEffect, useState } from 'react';
import { ArchiveVariant, InsightCategory, Topic } from '../../types/cms';

interface ArchiveNavRowProps {
  variant: ArchiveVariant;
  currentSlug: string;
  currentCategoryName?: string;
  allPublishedCategories: InsightCategory[];
  allPublishedTopics: Topic[];
  inPageSelectedCategory: string; // for Topic and Author variants
  onSelectInPageCategory: (cat: string) => void;
  onNavigateCategory: (catName: string) => void;
  onNavigateTopic: (topicSlug: string) => void;
}

export const ArchiveNavRow: React.FC<ArchiveNavRowProps> = ({
  variant,
  currentSlug,
  currentCategoryName,
  allPublishedCategories,
  allPublishedTopics,
  inPageSelectedCategory,
  onSelectInPageCategory,
  onNavigateCategory,
  onNavigateTopic,
}) => {
  const categoryNavRef = useRef<HTMLElement>(null);
  const buttonGroupRef = useRef<HTMLDivElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ left: number; width: number }>({
    left: 0,
    width: 0,
  });

  // Calculate sliding underline position
  useEffect(() => {
    const activeContainer =
      variant === 'category' ? categoryNavRef.current : buttonGroupRef.current;
    if (!activeContainer) return;

    const targetKey =
      variant === 'category' ? currentCategoryName : inPageSelectedCategory;

    const activeEl = activeContainer.querySelector(
      `[data-category="${targetKey}"]`
    ) as HTMLElement;

    if (activeEl) {
      setIndicatorStyle({
        left: activeEl.offsetLeft,
        width: activeEl.offsetWidth,
      });
      activeEl.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [variant, currentCategoryName, inPageSelectedCategory, allPublishedCategories]);

  return (
    <div className="pt-10 pb-12 transition-all">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 space-y-6">
        {/* Topic Variant: Topic chips row on top */}
        {variant === 'topic' && (
          <div className="flex items-center gap-3 overflow-x-auto no-scrollbar py-1">
            <span className="text-[12px] uppercase tracking-[0.14em] text-[#5F5D55] font-semibold shrink-0 mr-1">
              Topics:
            </span>

            {allPublishedTopics.map((topic) => {
              const isCurrent = topic.slug === currentSlug;
              return (
                <a
                  key={topic.slug}
                  href={`/insights/topic/${topic.slug}`}
                  aria-current={isCurrent ? 'page' : undefined}
                  onClick={(e) => {
                    e.preventDefault();
                    onNavigateTopic(topic.slug);
                  }}
                  className={`shrink-0 inline-flex items-center h-[36px] px-4 text-[14px] border transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F] ${
                    isCurrent
                      ? 'border-[#16233F] bg-[#16233F] text-[#FDFCF8] font-medium'
                      : 'border-[#1A1815]/24 text-[#1A1815] bg-transparent hover:border-[#16233F] hover:text-[#16233F]'
                  }`}
                >
                  {topic.name}
                </a>
              );
            })}
          </div>
        )}

        {/* Category Bar: Sticky under header */}
        <div className="sticky top-[72px] z-30 bg-[#FDFCF8] border-b border-[#1A1815]/12">
          {variant === 'category' ? (
            /* VARIANT A: Category archive cross-links */
            <nav
              ref={categoryNavRef}
              aria-label="Insight categories"
              className="relative flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar h-[56px]"
            >
              <a
                href="/insights"
                data-category="All"
                className="shrink-0 py-3 text-[15px] font-medium text-[#5F5D55] hover:text-[#1A1815] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                All
              </a>

              {allPublishedCategories.map((category) => {
                const isCurrent = category === currentCategoryName;
                const catSlug = category.toLowerCase().replace(/\s+/g, '-');

                return (
                  <a
                    key={category}
                    href={`/insights/category/${catSlug}`}
                    data-category={category}
                    aria-current={isCurrent ? 'page' : undefined}
                    onClick={(e) => {
                      e.preventDefault();
                      onNavigateCategory(category);
                    }}
                    className={`shrink-0 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F] ${
                      isCurrent
                        ? 'text-[#1A1815] font-semibold'
                        : 'text-[#5F5D55] hover:text-[#1A1815]'
                    }`}
                  >
                    {category}
                  </a>
                );
              })}

              {/* 2px Rich Burgundy active indicator */}
              <span
                className="absolute bottom-0 h-[2px] bg-[#7A2142] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
                aria-hidden="true"
              />
            </nav>
          ) : (
            /* VARIANTS B & C: In-page category filter toggle buttons (Topic / Author) */
            <div
              ref={buttonGroupRef}
              role="group"
              aria-label="Filter by category"
              className="relative flex items-center gap-6 sm:gap-8 overflow-x-auto no-scrollbar h-[56px]"
            >
              <button
                type="button"
                data-category="All"
                aria-pressed={inPageSelectedCategory === 'All'}
                onClick={() => onSelectInPageCategory('All')}
                className={`shrink-0 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F] ${
                  inPageSelectedCategory === 'All'
                    ? 'text-[#1A1815] font-semibold'
                    : 'text-[#5F5D55] hover:text-[#1A1815]'
                }`}
              >
                All
              </button>

              {allPublishedCategories.map((category) => {
                const isSelected = inPageSelectedCategory === category;
                return (
                  <button
                    key={category}
                    type="button"
                    data-category={category}
                    aria-pressed={isSelected}
                    onClick={() => onSelectInPageCategory(category)}
                    className={`shrink-0 py-3 text-[15px] font-medium transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F] ${
                      isSelected
                        ? 'text-[#1A1815] font-semibold'
                        : 'text-[#5F5D55] hover:text-[#1A1815]'
                    }`}
                  >
                    {category}
                  </button>
                );
              })}

              {/* Sliding 2px burgundy underline */}
              <span
                className="absolute bottom-0 h-[2px] bg-[#7A2142] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] pointer-events-none"
                style={{
                  left: `${indicatorStyle.left}px`,
                  width: `${indicatorStyle.width}px`,
                }}
                aria-hidden="true"
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
