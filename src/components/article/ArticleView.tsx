import React, { useState, useEffect, useMemo } from 'react';
import { InsightItem } from '../../types/cms';
import { ArticleBreadcrumb } from './ArticleBreadcrumb';
import { ArticleHeader } from './ArticleHeader';
import { HeroMedia } from './HeroMedia';
import { TableOfContents, TocHeading } from './TableOfContents';
import { ReadingProgressBar } from './ReadingProgressBar';
import { ShareTools } from './ShareTools';
import { RichContentRenderer } from './RichContentRenderer';
import { ArticlePostContent } from './ArticlePostContent';
import { NewsletterBand } from '../NewsletterBand';
import { SharedCta } from '../SharedCta';

interface ArticleViewProps {
  article: InsightItem;
  onNavigateHome: () => void;
  onSelectArticle: (item: InsightItem) => void;
  onNavigateCategory: (category: string) => void;
  onNavigateTopic: (topicSlug: string) => void;
}

export const ArticleView: React.FC<ArticleViewProps> = ({
  article,
  onNavigateHome,
  onSelectArticle,
  onNavigateCategory,
  onNavigateTopic,
}) => {
  const canonicalUrl = `https://mmmadvocatesllp.com/insights/${article.slug}`;

  // Extract H2 headings for Table of Contents
  const tocHeadings: TocHeading[] = useMemo(() => {
    if (!article.contentBlocks) return [];
    return article.contentBlocks
      .filter((b) => b.type === 'h2')
      .map((b) => ({ id: (b as { id: string }).id, text: (b as { text: string }).text }));
  }, [article.contentBlocks]);

  const [activeHeadingId, setActiveHeadingId] = useState<string>(
    tocHeadings[0]?.id || ''
  );
  const [railsFaded, setRailsFaded] = useState(false);

  // Set page title and canonical URL in head
  useEffect(() => {
    document.title = `${article.title} | MMM Advocates`;
    window.scrollTo(0, 0);
  }, [article]);

  // Scroll-spy IntersectionObserver for H2 headings
  useEffect(() => {
    if (tocHeadings.length < 3) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveHeadingId(entry.target.id);
          }
        });
      },
      {
        rootMargin: '-104px 0px -60% 0px',
        threshold: 0,
      }
    );

    tocHeadings.forEach((h) => {
      const el = document.getElementById(h.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, [tocHeadings]);

  const handleSelectHeading = (id: string) => {
    setActiveHeadingId(id);
    const targetEl = document.getElementById(id);
    if (targetEl) {
      targetEl.scrollIntoView({ behavior: 'smooth' });
      targetEl.focus();
    }
    window.history.pushState(null, '', `#${id}`);
  };

  // Structured Data JSON-LD
  const jsonLdData = useMemo(() => {
    const authorsArray = [article.author, ...(article.coAuthors || [])].map((a) => ({
      '@type': 'Person',
      name: a.name,
      jobTitle: a.role || 'Partner',
      url: `https://mmmadvocatesllp.com/our-team/${a.slug || 'partner'}`,
    }));

    const articleSchema = {
      '@context': 'https://schema.org',
      '@graph': [
        {
          '@type': 'BreadcrumbList',
          itemListElement: [
            {
              '@type': 'ListItem',
              position: 1,
              name: 'Home',
              item: 'https://mmmadvocatesllp.com',
            },
            {
              '@type': 'ListItem',
              position: 2,
              name: 'Insights',
              item: 'https://mmmadvocatesllp.com/insights',
            },
            {
              '@type': 'ListItem',
              position: 3,
              name: article.category,
              item: `https://mmmadvocatesllp.com/insights/category/${article.categorySlug}`,
            },
            {
              '@type': 'ListItem',
              position: 4,
              name: article.title,
              item: canonicalUrl,
            },
          ],
        },
        {
          '@type': 'Article',
          headline: article.title.slice(0, 110),
          description: article.seoDescription || article.excerpt,
          image: [
            article.heroImage || 'https://mmmadvocatesllp.com/og-default.jpg',
          ],
          datePublished: `${article.publishedAt}T08:00:00+03:00`,
          dateModified: `${article.updatedAt || article.publishedAt}T08:00:00+03:00`,
          author: authorsArray,
          publisher: {
            '@type': 'Organization',
            name: 'Mundui, Murai and Mwaniki Advocates LLP',
            alternateName: 'MMM Advocates',
            url: 'https://mmmadvocatesllp.com',
            logo: {
              '@type': 'ImageObject',
              url: 'https://mmmadvocatesllp.com/logo.svg',
            },
          },
          mainEntityOfPage: canonicalUrl,
          articleSection: article.category,
          keywords: article.topics.map((t) => t.name).join(', '),
          inLanguage: 'en-KE',
        },
      ],
    };

    return JSON.stringify(articleSchema);
  }, [article, canonicalUrl]);

  return (
    <article className="min-h-screen bg-[#FDFCF8] text-[#1A1815]">
      {/* Skip link for accessibility */}
      <a
        href="#article-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-4 focus:left-4 z-50 px-4 py-2 bg-[#16233F] text-[#FDFCF8] text-[14px]"
      >
        Skip to article
      </a>

      {/* Structured data injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdData }}
      />

      {/* Reading Progress Bar (fixed 3px burgundy bar below compact header) */}
      <ReadingProgressBar targetContainerId="article-body-container" />

      {/* 1. Breadcrumb and Back link */}
      <ArticleBreadcrumb
        category={article.category}
        categorySlug={article.categorySlug}
        onNavigateHome={onNavigateHome}
        onNavigateCategory={onNavigateCategory}
      />

      {/* 2. Article Header */}
      <ArticleHeader
        article={article}
        onNavigateCategory={onNavigateCategory}
        onNavigateTopic={onNavigateTopic}
      />

      {/* 3. Hero Media */}
      <HeroMedia
        imageUrl={article.heroImage}
        imageAlt={article.imageAlt}
        video={article.heroVideo}
        caption={article.heroCaption}
        credit={article.heroCredit}
      />

      {/* 4. READING LAYOUT (Three Columns at 1440) */}
      <div id="article-body-container" className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 pb-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 xl:gap-12 relative">
          {/* Left Rail: cols 1 to 3 at 1440 (TOC, sticky top=120px) */}
          <div className="lg:col-span-3">
            <TableOfContents
              headings={tocHeadings}
              activeId={activeHeadingId}
              onSelectHeading={handleSelectHeading}
              railsFaded={railsFaded}
            />
          </div>

          {/* Centre Column: cols 4 to 10 (Max 680px reading measure) */}
          <div id="article-content" className="lg:col-span-8 xl:col-span-7">
            {article.contentBlocks && article.contentBlocks.length > 0 ? (
              <RichContentRenderer
                blocks={article.contentBlocks}
                footnotes={article.footnotes}
                onHeadingEnter={setActiveHeadingId}
                onWideMediaIntersect={(intersecting) => setRailsFaded(intersecting)}
              />
            ) : (
              /* Fallback standard body if item only has excerpt */
              <div className="article-body max-w-[680px]">
                <p className="text-[19px] leading-[32px] text-[#1A1815] mb-6">
                  {article.excerpt}
                </p>
                <div className="p-6 border border-[#1A1815]/16 bg-[#F6F3EC]">
                  <p className="text-[15px] leading-[24px] text-[#5F5D55]">
                    For comprehensive advice regarding this publication or regulatory matter, please
                    contact the MMM Advocates practice desk.
                  </p>
                </div>
              </div>
            )}

            {/* 8. AFTER THE BODY */}
            <ArticlePostContent
              article={article}
              canonicalUrl={canonicalUrl}
              onSelectArticle={onSelectArticle}
              onNavigateCategory={onNavigateCategory}
              onNavigateTopic={onNavigateTopic}
            />
          </div>

          {/* Right Rail: col 12 (Share rail, sticky top=120px) */}
          <div className="lg:col-span-1 lg:col-start-12">
            <ShareTools
              url={canonicalUrl}
              title={article.title}
              standfirst={article.excerpt}
              railsFaded={railsFaded}
            />
          </div>
        </div>
      </div>

      {/* Print Footer note: "Source: [canonical URL]" */}
      <div className="hidden print:block text-[9pt] text-[#444444] border-t border-[#000000] pt-4 mt-8 px-5">
        Source: {canonicalUrl}
      </div>

      {/* 8.6 Newsletter Band (navy) */}
      <NewsletterBand isConnected={true} />

      {/* 8.7 Shared Navy CTA */}
      <SharedCta headline="Have a matter to discuss?" />
    </article>
  );
};
