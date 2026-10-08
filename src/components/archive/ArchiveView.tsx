import React, { useState, useMemo, useEffect } from 'react';
import { ArchiveContext, InsightCategory, InsightItem, Topic } from '../../types/cms';
import { ArchiveHero } from './ArchiveHero';
import { ArchiveNavRow } from './ArchiveNavRow';
import { ArchiveList } from './ArchiveList';
import { ArchiveCrossLinkBand } from './ArchiveCrossLinkBand';
import { ArchiveEmptyState } from './ArchiveEmptyState';
import { NewsletterBand } from '../NewsletterBand';
import { SharedCta } from '../SharedCta';

interface ArchiveViewProps {
  context: ArchiveContext;
  allItems: InsightItem[];
  onNavigateHome: () => void;
  onSelectArticle: (article: InsightItem) => void;
  onNavigateCategory: (category: string) => void;
  onNavigateTopic: (topicSlug: string) => void;
  onNavigateAuthor: (authorSlug: string) => void;
}

export const ArchiveView: React.FC<ArchiveViewProps> = ({
  context,
  allItems,
  onNavigateHome,
  onSelectArticle,
  onNavigateCategory,
  onNavigateTopic,
  onNavigateAuthor,
}) => {
  const [inPageCategory, setInPageCategory] = useState<string>('All');
  const [liveAnnouncement, setLiveAnnouncement] = useState<string>('');

  // 1. Filter items belonging to this archive
  const archiveItems = useMemo(() => {
    // Exclude samples and unpublished items
    const published = allItems.filter((i) => !i.isSample);

    if (context.variant === 'category') {
      return published.filter(
        (i) =>
          i.categorySlug === context.slug ||
          i.category.toLowerCase().replace(/\s+/g, '-') === context.slug
      );
    }

    if (context.variant === 'topic') {
      return published.filter((i) => i.topics.some((t) => t.slug === context.slug));
    }

    if (context.variant === 'author') {
      return published.filter(
        (i) =>
          i.author.slug === context.slug ||
          i.author.name === context.authorMeta?.name ||
          i.author.fullName === context.title
      );
    }

    return published;
  }, [allItems, context]);

  // 2. Further in-page filtering for Topic & Author variants
  const displayedItems = useMemo(() => {
    if (context.variant === 'category' || inPageCategory === 'All') {
      return archiveItems;
    }
    return archiveItems.filter((i) => i.category === inPageCategory);
  }, [archiveItems, context.variant, inPageCategory]);

  const isEmpty = archiveItems.length === 0;

  // 3. Count line calculation per spec
  const countDisplay = useMemo(() => {
    if (isEmpty) return null;

    if (context.variant === 'category' && context.slug === 'events') {
      const upcoming = archiveItems.filter((i) => !i.eventDetails?.isPast).length;
      const past = archiveItems.filter((i) => i.eventDetails?.isPast).length;
      return `${upcoming} upcoming · ${past} past`;
    }

    if (context.variant === 'category' && context.slug === 'publications') {
      return `${archiveItems.length} publications`;
    }

    const n = archiveItems.length;
    return `${n} ${n === 1 ? 'insight' : 'insights'}`;
  }, [archiveItems, context, isEmpty]);

  // 4. Collect all published categories & topics present in the CMS
  const allPublishedCategories = useMemo(() => {
    const set = new Set<InsightCategory>();
    allItems
      .filter((i) => !i.isSample)
      .forEach((i) => set.add(i.category));
    return Array.from(set);
  }, [allItems]);

  const allPublishedTopics = useMemo(() => {
    const map = new Map<string, Topic>();
    allItems
      .filter((i) => !i.isSample)
      .forEach((i) => {
        i.topics.forEach((t) => map.set(t.slug, t));
      });
    return Array.from(map.values());
  }, [allItems]);

  // Canonical URL & SEO Title
  const canonicalUrl = `https://mmmadvocatesllp.com/insights/${context.variant}/${context.slug}`;

  useEffect(() => {
    let pageTitle = '';
    if (context.variant === 'category') {
      pageTitle = `${context.title} | Insights | MMM Advocates`;
    } else if (context.variant === 'topic') {
      pageTitle = `${context.title} insights | MMM Advocates`;
    } else {
      pageTitle = `Insights by ${context.title} | MMM Advocates`;
    }
    document.title = pageTitle;
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [context]);

  const handleInPageCategoryChange = (cat: string) => {
    setInPageCategory(cat);
    const count =
      cat === 'All' ? archiveItems.length : archiveItems.filter((i) => i.category === cat).length;
    setLiveAnnouncement(`${count} insights shown`);

    const query = cat === 'All' ? '' : `?category=${cat.toLowerCase().replace(/\s+/g, '-')}`;
    window.history.pushState(
      {},
      '',
      `/insights/${context.variant}/${context.slug}${query}`
    );
  };

  // Structured Data JSON-LD
  const jsonLdData = useMemo(() => {
    const itemList = displayedItems.map((item, idx) => ({
      '@type': 'ListItem',
      position: idx + 1,
      url: `https://mmmadvocatesllp.com/insights/${item.slug}`,
      name: item.title,
    }));

    const schema = {
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
              name: context.title,
              item: canonicalUrl,
            },
          ],
        },
        {
          '@type': 'CollectionPage',
          name: `${context.title} | Insights | MMM Advocates`,
          description: context.description || `${context.title} insights from MMM Advocates.`,
          url: canonicalUrl,
          isPartOf: 'https://mmmadvocatesllp.com/insights',
          about:
            context.variant === 'author'
              ? {
                  '@type': 'Person',
                  name: context.title,
                  url: `https://mmmadvocatesllp.com/our-team/${context.authorMeta?.slug || 'partner'}`,
                }
              : {
                  '@type': 'Thing',
                  name: context.title,
                },
          mainEntity: {
            '@type': 'ItemList',
            itemListElement: itemList,
          },
        },
      ],
    };

    return JSON.stringify(schema);
  }, [context, displayedItems, canonicalUrl]);

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1815]">
      {/* Live region for in-page filter announcements */}
      <div className="sr-only" aria-live="polite" role="status">
        {liveAnnouncement}
      </div>

      {/* JSON-LD injection */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: jsonLdData }}
      />

      {/* 1. ARCHIVE HERO */}
      <ArchiveHero
        variant={context.variant}
        name={context.title}
        description={context.description}
        countDisplay={countDisplay}
        practiceLink={context.practiceLink}
        authorMeta={context.authorMeta}
        onNavigateHome={onNavigateHome}
      />

      {isEmpty ? (
        /* 6. EMPTY STATE PER ARCHIVE */
        <ArchiveEmptyState
          variant={context.variant}
          name={context.title}
          practiceLink={context.practiceLink}
          onNavigateHome={onNavigateHome}
        />
      ) : (
        /* ARCHIVE CONTENT: NAV ROW + LIST + CROSS-LINK BAND */
        <>
          {/* 2. NAVIGATION ROW (Cross-links & In-page filter) */}
          <ArchiveNavRow
            variant={context.variant}
            currentSlug={context.slug}
            currentCategoryName={context.variant === 'category' ? context.title : undefined}
            allPublishedCategories={allPublishedCategories}
            allPublishedTopics={allPublishedTopics}
            inPageSelectedCategory={inPageCategory}
            onSelectInPageCategory={handleInPageCategoryChange}
            onNavigateCategory={onNavigateCategory}
            onNavigateTopic={onNavigateTopic}
          />

          {/* 3. LIST */}
          <ArchiveList
            items={displayedItems}
            isEventsCategory={context.variant === 'category' && context.slug === 'events'}
            isPublicationsCategory={
              context.variant === 'category' && context.slug === 'publications'
            }
            onSelectArticle={onSelectArticle}
            onSelectCategory={onNavigateCategory}
          />

          {/* 4. CROSS-LINK BAND */}
          <ArchiveCrossLinkBand
            variant={context.variant}
            currentSlug={context.slug}
            allItems={allItems}
            onNavigateCategory={onNavigateCategory}
            onNavigateTopic={onNavigateTopic}
            onNavigateAuthor={onNavigateAuthor}
          />
        </>
      )}

      {/* 5. NEWSLETTER BAND AND SHARED CTA */}
      <NewsletterBand isConnected={true} />
      <SharedCta headline="Have a matter to discuss?" />
    </div>
  );
};
