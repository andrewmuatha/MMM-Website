import React from 'react';
import { ArrowRight } from 'lucide-react';
import { InsightItem } from '../types/cms';
import { AuthorTile } from './AuthorTile';

interface FeaturedArticleProps {
  article: InsightItem;
  sectionNumber?: string;
  onSelectCategory?: (category: string) => void;
  onSelectArticle?: (article: InsightItem) => void;
}

export const FeaturedArticle: React.FC<FeaturedArticleProps> = ({
  article,
  sectionNumber = '01',
  onSelectCategory,
  onSelectArticle,
}) => {
  if (!article) return null;

  const handleArticleClick = (e: React.MouseEvent) => {
    if (onSelectArticle) {
      e.preventDefault();
      onSelectArticle(article);
    }
  };

  return (
    <section
      className="relative pt-10 sm:pt-14 lg:pt-[72px] pb-16 sm:pb-22 lg:pb-[120px] transition-all"
      aria-label="Featured insight"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Image Column: cols 1 to 7 on 1440 */}
          <div className="lg:col-span-7 relative group">
            {/* 1px gold outline frame offset 20px right and 20px down (desktop & tablet, hidden on mobile) */}
            <div
              className="hidden sm:block absolute inset-0 translate-x-4 sm:translate-x-5 translate-y-4 sm:translate-y-5 border border-[#C6A455] pointer-events-none transition-transform duration-700 group-hover:translate-x-6 group-hover:translate-y-6"
              aria-hidden="true"
            />

            {/* Main Image Container */}
            <div className="relative aspect-[3/2] lg:aspect-[5/4] overflow-hidden bg-[#16233F]">
              {article.heroImage ? (
                <img
                  src={article.heroImage}
                  alt={article.imageAlt || article.title}
                  className="w-full h-full object-cover transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  loading="eager"
                />
              ) : (
                <div className="w-full h-full bg-[#16233F] flex items-center justify-center p-8">
                  <span className="font-serif text-[#C6A455] text-3xl font-semibold tracking-wider">
                    MMM Advocates
                  </span>
                </div>
              )}
            </div>
          </div>

          {/* Text Stack: cols 9 to 12 (centered vertically to image) */}
          <div className="lg:col-span-5 lg:col-start-8 xl:col-start-9 flex flex-col justify-center">
            {/* Section label: "01 // Featured" */}
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-medium">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>{sectionNumber}</span>
              <span className="text-[#C6A455]" aria-hidden="true">//</span>
              <span>Featured</span>
            </div>

            {/* 16px gap to Category label */}
            <div className="pt-4">
              <a
                href={`/insights/category/${article.categorySlug}`}
                onClick={(e) => {
                  if (onSelectCategory) {
                    e.preventDefault();
                    onSelectCategory(article.category);
                  }
                }}
                className="inline-block text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold hover:underline focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                {article.category}
              </a>
            </div>

            {/* 16px gap to Title H2 */}
            <h2 className="pt-4 font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#16233F] transition-colors group-hover:text-[#7A2142]">
              <a
                href={`/insights/${article.slug}`}
                onClick={handleArticleClick}
                className="hover:text-[#7A2142] focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                {article.title}
              </a>
            </h2>

            {/* 20px gap to Excerpt */}
            <p className="pt-5 text-[17px] sm:text-[18px] leading-[1.65] text-[#5F5D55] line-clamp-3">
              {article.excerpt}
            </p>

            {/* 24px gap to Byline Row */}
            <div className="pt-6 flex items-center gap-3.5">
              <AuthorTile initials={article.author.initials} size="sm" name={article.author.name} />
              <div className="text-[14px] leading-snug">
                <span className="text-[15px] text-[#1A1815] font-medium">
                  By {article.author.name}
                </span>
                <div className="text-[14px] text-[#5F5D55] flex items-center gap-1.5 pt-0.5">
                  <time dateTime={article.publishedAt}>{article.displayDate}</time>
                  <span aria-hidden="true">·</span>
                  <span>{article.readTimeMinutes || 6} min read</span>
                </div>
              </div>
            </div>

            {/* 32px gap to Action Link */}
            <div className="pt-8">
              <a
                href={`/insights/${article.slug}`}
                onClick={handleArticleClick}
                className="group/link inline-flex items-center gap-2.5 text-[14px] uppercase tracking-[0.08em] font-medium text-[#16233F] hover:text-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                <span className="text-roll">
                  <span className="text-roll-stack">
                    <span>Read the article</span>
                    <span>Read the article</span>
                  </span>
                </span>
                <ArrowRight
                  size={16}
                  className="transition-transform duration-300 group-hover/link:translate-x-1"
                  aria-hidden="true"
                />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
