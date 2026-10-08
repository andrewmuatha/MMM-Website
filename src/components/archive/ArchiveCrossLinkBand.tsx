import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ArchiveVariant, InsightItem, Topic } from '../../types/cms';
import { AUTHORS } from '../../data/cmsData';

interface ArchiveCrossLinkBandProps {
  variant: ArchiveVariant;
  currentSlug: string;
  allItems: InsightItem[];
  onNavigateCategory: (category: string) => void;
  onNavigateTopic: (topicSlug: string) => void;
  onNavigateAuthor: (authorSlug: string) => void;
}

export const ArchiveCrossLinkBand: React.FC<ArchiveCrossLinkBandProps> = ({
  variant,
  currentSlug,
  allItems,
  onNavigateCategory,
  onNavigateTopic,
  onNavigateAuthor,
}) => {
  if (variant === 'category') {
    // Collect other categories with at least 1 published item
    const categoryCounts = new Map<string, number>();
    allItems.forEach((i) => {
      categoryCounts.set(i.category, (categoryCounts.get(i.category) || 0) + 1);
    });

    const currentCatNormalized = currentSlug.replace(/-/g, ' ').toLowerCase();

    const otherCategories = Array.from(categoryCounts.entries()).filter(
      ([cat, count]) =>
        cat.toLowerCase() !== currentCatNormalized &&
        cat.toLowerCase().replace(/\s+/g, '-') !== currentSlug &&
        count > 0
    );

    if (otherCategories.length === 0) return null;

    return (
      <section className="bg-[#FDFCF8] border-t border-[#1A1815]/12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>Explore</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#16233F]">
              Other categories.
            </h2>
          </div>

          <div className="divide-y divide-[#1A1815]/12 border-t border-b border-[#1A1815]/12">
            {otherCategories.map(([cat, count]) => (
              <a
                key={cat}
                href={`/insights/category/${cat.toLowerCase().replace(/\s+/g, '-')}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateCategory(cat);
                }}
                className="group py-6 flex items-center justify-between hover:bg-[#F6F3EC]/50 transition-colors px-2"
              >
                <span className="font-serif text-[24px] sm:text-[28px] text-[#16233F] group-hover:text-[#7A2142] group-hover:translate-x-1.5 transition-all">
                  {cat}
                </span>
                <div className="flex items-center gap-6">
                  <span className="text-[14px] text-[#5F5D55]">
                    {count} {count === 1 ? 'insight' : 'insights'}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-[#16233F] group-hover:translate-x-1 group-hover:text-[#7A2142] transition-all"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'topic') {
    // Find topics that co-occur most with current topic
    const topicCounts = new Map<string, { topic: Topic; count: number }>();
    const currentTopicArticles = allItems.filter((i) =>
      i.topics.some((t) => t.slug === currentSlug)
    );

    currentTopicArticles.forEach((article) => {
      article.topics.forEach((t) => {
        if (t.slug !== currentSlug) {
          const existing = topicCounts.get(t.slug);
          if (existing) {
            existing.count += 1;
          } else {
            topicCounts.set(t.slug, { topic: t, count: 1 });
          }
        }
      });
    });

    const relatedTopics = Array.from(topicCounts.values())
      .sort((a, b) => b.count - a.count)
      .slice(0, 6);

    if (relatedTopics.length === 0) return null;

    return (
      <section className="bg-[#FDFCF8] border-t border-[#1A1815]/12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>Explore</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#16233F]">
              Related topics.
            </h2>
          </div>

          <div className="flex flex-wrap items-center gap-3">
            {relatedTopics.map(({ topic, count }) => (
              <a
                key={topic.slug}
                href={`/insights/topic/${topic.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateTopic(topic.slug);
                }}
                className="inline-flex items-center h-[44px] px-5 text-[14px] font-medium border border-[#1A1815]/24 text-[#1A1815] hover:border-[#16233F] hover:text-[#16233F] transition-colors"
              >
                <span>{topic.name}</span>
                <span className="ml-2 text-[12px] text-[#5F5D55]">({count})</span>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'author') {
    // List other authors with published items
    const authorList = Object.values(AUTHORS).filter(
      (a) => a.slug !== currentSlug
    );

    const otherAuthorsWithItems = authorList
      .map((author) => {
        const count = allItems.filter(
          (i) => i.author.name === author.name || i.author.slug === author.slug
        ).length;
        return { author, count };
      })
      .filter((a) => a.count > 0);

    if (otherAuthorsWithItems.length === 0) return null;

    return (
      <section className="bg-[#FDFCF8] border-t border-[#1A1815]/12 py-16 sm:py-20 lg:py-24">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 space-y-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>Explore</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            </div>
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#16233F]">
              Other authors.
            </h2>
          </div>

          <div className="divide-y divide-[#1A1815]/12 border-t border-b border-[#1A1815]/12">
            {otherAuthorsWithItems.map(({ author, count }) => (
              <a
                key={author.slug}
                href={`/insights/author/${author.slug}`}
                onClick={(e) => {
                  e.preventDefault();
                  onNavigateAuthor(author.slug);
                }}
                className="group py-6 flex items-center justify-between hover:bg-[#F6F3EC]/50 transition-colors px-2"
              >
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 bg-[#16233F] flex items-center justify-center text-[#C6A455] font-serif font-semibold text-[14px]">
                    {author.initials}
                  </div>
                  <div>
                    <span className="font-serif text-[22px] sm:text-[26px] text-[#16233F] group-hover:text-[#7A2142] transition-colors block">
                      {author.fullName || author.name}
                    </span>
                    <span className="text-[13px] text-[#5F5D55]">{author.role}</span>
                  </div>
                </div>

                <div className="flex items-center gap-6">
                  <span className="text-[14px] text-[#5F5D55]">
                    {count} {count === 1 ? 'insight' : 'insights'}
                  </span>
                  <ArrowRight
                    size={18}
                    className="text-[#16233F] group-hover:translate-x-1 group-hover:text-[#7A2142] transition-all"
                  />
                </div>
              </a>
            ))}
          </div>
        </div>
      </section>
    );
  }

  return null;
};
