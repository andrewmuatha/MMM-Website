import React from 'react';
import { ArrowRight, ArrowUpRight, Linkedin } from 'lucide-react';
import { InsightItem } from '../../types/cms';
import { EndShareRow } from './ShareTools';
import { CMS_INSIGHTS } from '../../data/cmsData';

interface ArticlePostContentProps {
  article: InsightItem;
  canonicalUrl: string;
  onSelectArticle?: (item: InsightItem) => void;
  onNavigateCategory?: (category: string) => void;
  onNavigateTopic?: (topicSlug: string) => void;
}

export const ArticlePostContent: React.FC<ArticlePostContentProps> = ({
  article,
  canonicalUrl,
  onSelectArticle,
  onNavigateCategory,
  onNavigateTopic,
}) => {
  const allAuthors = [article.author, ...(article.coAuthors || [])];

  // Derive related articles (1 to 3 items, editorial rows, exclude current and samples)
  const relatedArticles = (() => {
    const candidates = CMS_INSIGHTS.filter(
      (item) => item.id !== article.id && !item.isSample
    );

    // 1. Manual related picks
    const manualPicks = article.relatedPicks
      ? candidates.filter((item) => article.relatedPicks?.includes(item.id))
      : [];

    // 2. Same category & topic
    const categoryAndTopic = candidates.filter(
      (item) =>
        item.category === article.category &&
        item.topics.some((t) => article.topics.some((at) => at.slug === t.slug)) &&
        !manualPicks.some((m) => m.id === item.id)
    );

    // 3. Same category
    const sameCategory = candidates.filter(
      (item) =>
        item.category === article.category &&
        !manualPicks.some((m) => m.id === item.id) &&
        !categoryAndTopic.some((ct) => ct.id === item.id)
    );

    // 4. Same topic
    const sameTopic = candidates.filter(
      (item) =>
        item.topics.some((t) => article.topics.some((at) => at.slug === t.slug)) &&
        !manualPicks.some((m) => m.id === item.id) &&
        !categoryAndTopic.some((ct) => ct.id === item.id) &&
        !sameCategory.some((sc) => sc.id === item.id)
    );

    const merged = [...manualPicks, ...categoryAndTopic, ...sameCategory, ...sameTopic, ...candidates];
    // Return unique 3 items
    const uniqueMap = new Map<string, InsightItem>();
    merged.forEach((item) => {
      if (!uniqueMap.has(item.id) && item.id !== article.id && !item.isSample) {
        uniqueMap.set(item.id, item);
      }
    });

    return Array.from(uniqueMap.values()).slice(0, 3);
  })();

  return (
    <div className="pt-8">
      {/* 8.1 End share row */}
      <EndShareRow
        url={canonicalUrl}
        title={article.title}
        standfirst={article.excerpt}
      />

      {/* 8.2 Topic tags again: label "Filed under", category link plus topic chips. 32px above */}
      <div className="pt-8 pb-10 flex flex-wrap items-center gap-2 max-w-[680px]">
        <span className="text-[12px] uppercase tracking-[0.14em] text-[#5F5D55] font-medium mr-2">
          Filed under:
        </span>
        <a
          href={`/insights/category/${article.categorySlug}`}
          onClick={(e) => {
            if (onNavigateCategory) {
              e.preventDefault();
              onNavigateCategory(article.category);
            }
          }}
          className="inline-flex items-center h-[34px] px-3.5 text-[14px] font-semibold text-[#7A2142] border border-[#7A2142]/30 hover:border-[#7A2142] transition-colors"
        >
          {article.category}
        </a>
        {article.topics.map((t) => (
          <a
            key={t.slug}
            href={`/insights/topic/${t.slug}`}
            onClick={(e) => {
              if (onNavigateTopic) {
                e.preventDefault();
                onNavigateTopic(t.slug);
              }
            }}
            className="inline-flex items-center h-[34px] px-3.5 text-[14px] text-[#1A1815] border border-[#1A1815]/20 hover:border-[#16233F] hover:text-[#16233F] transition-colors"
          >
            {t.name}
          </a>
        ))}
      </div>

      {/* 8.3 Legal notice: 1px top rule, 24px padding-top. 40px above */}
      <div className="pt-10 border-t border-[#1A1815]/12 max-w-[680px]">
        <p className="text-[14px] leading-[22px] text-[#5F5D55]">
          Legal notice: this article is for general information and is not legal advice.
        </p>
      </div>

      {/* 8.4 Author box: 64px above. 1px top rule, padding-top 32px */}
      <div className="mt-16 pt-8 border-t border-[#1A1815]/12 max-w-[680px] space-y-8">
        <div className="text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
          {allAuthors.length > 1 ? 'About the authors' : 'About the author'}
        </div>

        {allAuthors.map((author, idx) => (
          <div
            key={author.name + idx}
            className="flex flex-col sm:flex-row items-start gap-6 group"
          >
            {/* 96px square portrait or monogram */}
            <div className="relative w-24 h-24 bg-[#16233F] shrink-0 overflow-hidden select-none flex items-center justify-center">
              <div className="absolute inset-0 bg-kuba opacity-[0.06] pointer-events-none" />
              <span className="relative z-10 font-serif text-[28px] font-semibold text-[#C6A455] tracking-wider transition-transform duration-700 group-hover:scale-105">
                {author.initials}
              </span>
            </div>

            {/* Author info */}
            <div className="space-y-2">
              <h3 className="font-serif text-[26px] leading-[34px] text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                <a
                  href={`/our-team/${author.slug || 'partner'}`}
                  className="focus-visible:outline-2 focus-visible:outline-[#16233F]"
                >
                  {author.name}
                </a>
              </h3>
              <p className="text-[14px] text-[#5F5D55] font-medium">{author.role || 'Partner'}</p>

              {/* Bio: only rendered if author bio is supplied */}
              {author.bio && (
                <p className="text-[15px] leading-[24px] text-[#1A1815]/85 pt-1">
                  {author.bio}
                </p>
              )}

              <div className="pt-2 flex items-center gap-4">
                <a
                  href={`/our-team/${author.slug || 'partner'}`}
                  className="inline-flex items-center gap-1.5 text-[14px] text-[#16233F] font-medium hover:text-[#7A2142] transition-colors"
                >
                  <span>View profile</span>
                  <ArrowRight size={14} aria-hidden="true" />
                </a>

                {author.linkedInUrl && (
                  <a
                    href={author.linkedInUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${author.name} on LinkedIn`}
                    className="text-[#5F5D55] hover:text-[#16233F] transition-colors p-1"
                  >
                    <Linkedin size={16} aria-hidden="true" />
                  </a>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* 8.5 Related articles: full grid width, separated by 1px rule */}
      {relatedArticles.length > 0 && (
        <section
          id="related-articles-section"
          className="related-articles mt-24 pt-20 sm:pt-24 border-t border-[#1A1815]/12"
          aria-label="Related insights"
        >
          <div className="space-y-4 mb-8">
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-medium">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>Related</span>
            </div>
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#16233F]">
              Further reading.
            </h2>
          </div>

          {/* Up to 3 items as editorial rows */}
          <div className="divide-y divide-[#1A1815]/12 border-t border-b border-[#1A1815]/12">
            {relatedArticles.map((relItem) => (
              <div
                key={relItem.id}
                className="group py-6 sm:py-7 flex flex-col md:flex-row md:items-center justify-between gap-4 hover:bg-[#F6F3EC]/50 transition-colors"
              >
                <div className="space-y-1.5 max-w-2xl">
                  <span className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold block">
                    {relItem.category}
                  </span>
                  <h3 className="font-serif text-[24px] sm:text-[28px] leading-[36px] text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                    <a
                      href={`/insights/${relItem.slug}`}
                      onClick={(e) => {
                        if (onSelectArticle) {
                          e.preventDefault();
                          onSelectArticle(relItem);
                        }
                      }}
                      className="focus-visible:outline-2 focus-visible:outline-[#16233F]"
                    >
                      {relItem.title}
                    </a>
                  </h3>
                </div>

                <div className="flex items-center gap-6 shrink-0">
                  <div className="text-[14px] text-[#5F5D55] text-right">
                    <time dateTime={relItem.publishedAt}>{relItem.displayDate}</time>
                    <span className="block text-[13px] text-[#5F5D55]/80">
                      {relItem.readTimeMinutes || 5} min read
                    </span>
                  </div>
                  <ArrowRight
                    size={18}
                    className="text-[#16233F] group-hover:translate-x-1 group-hover:text-[#7A2142] transition-all"
                    aria-hidden="true"
                  />
                </div>
              </div>
            ))}
          </div>
        </section>
      )}
    </div>
  );
};
