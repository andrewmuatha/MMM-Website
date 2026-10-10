import { useState, useMemo, useEffect, useCallback } from 'react';
import { Header } from './components/Header';
import { Footer } from './components/Footer';
import { SharedCta } from './components/SharedCta';
import { InsightsHero } from './components/InsightsHero';
import { FeaturedArticle } from './components/FeaturedArticle';
import { LatestInsights } from './components/LatestInsights';
import { NewsletterBand } from './components/NewsletterBand';
import { PublicationsStrip } from './components/PublicationsStrip';
import { EmptyState } from './components/EmptyState';
import { CmsStateSwitcher } from './components/CmsStateSwitcher';
import { ArticleView } from './components/article/ArticleView';
import { ArchiveView } from './components/archive/ArchiveView';
import { PracticeDetailView } from './components/practice/PracticeDetailView';
import { PracticeOverviewView } from './components/practice/PracticeOverviewView';
import { OurTeam } from './pages/OurTeam';
import { PartnerProfile } from './pages/PartnerProfile';
import { site, Partner } from './content/site';
import {
  AUTHORS,
  CATEGORIES_META,
  CMS_INSIGHTS,
  GENERAL_TOPICS,
  PRACTICE_TOPICS,
} from './data/cmsData';
import { PRACTICE_AREAS, getPracticeBySlug } from './data/practiceData';
import { ArchiveContext, CmsMode, InsightItem, Topic } from './types/cms';
import { PracticeArea } from './types/practice';

export default function App() {
  const [cmsMode, setCmsMode] = useState<CmsMode>('full');
  const [isNewsletterConnected, setIsNewsletterConnected] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedTopic, setSelectedTopic] = useState<string | null>(null);
  const [activeArticle, setActiveArticle] = useState<InsightItem | null>(null);
  const [activeArchive, setActiveArchive] = useState<ArchiveContext | null>(null);
  const [activePractice, setActivePractice] = useState<PracticeArea | null>(null);
  const [activePartner, setActivePartner] = useState<Partner | null>(null);
  const [isPracticeOverview, setIsPracticeOverview] = useState(false);
  const [currentPath, setCurrentPath] = useState<string>(
    typeof window !== 'undefined' ? window.location.pathname : '/insights'
  );

  // Helper to resolve archive context from URL
  const resolveArchiveFromUrl = useCallback((path: string): ArchiveContext | null => {
    // 1. Category Archive: /insights/category/[slug]
    if (path.startsWith('/insights/category/')) {
      const slug = path.replace('/insights/category/', '').replace(/\/$/, '').split('?')[0];
      const catMeta = CATEGORIES_META[slug];
      if (catMeta) {
        return {
          variant: 'category',
          slug,
          title: catMeta.name,
          description: catMeta.description,
          breadcrumbName: catMeta.name,
        };
      }
      const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        variant: 'category',
        slug,
        title,
        description: `Archive of ${title.toLowerCase()} from MMM Advocates.`,
        breadcrumbName: title,
      };
    }

    // 2. Topic Archive: /insights/topic/[slug]
    if (path.startsWith('/insights/topic/')) {
      const slug = path.replace('/insights/topic/', '').replace(/\/$/, '').split('?')[0];
      const allTopics: Topic[] = [...PRACTICE_TOPICS, ...GENERAL_TOPICS];
      const matchedTopic = allTopics.find((t) => t.slug === slug);
      if (matchedTopic) {
        return {
          variant: 'topic',
          slug,
          title: matchedTopic.name,
          description: matchedTopic.description,
          breadcrumbName: matchedTopic.name,
          practiceLink:
            matchedTopic.isPractice && matchedTopic.practiceName && matchedTopic.practiceUrl
              ? { name: matchedTopic.practiceName, url: matchedTopic.practiceUrl }
              : undefined,
        };
      }
      const title = slug.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase());
      return {
        variant: 'topic',
        slug,
        title,
        description: `Analysis and legal updates regarding ${title}.`,
        breadcrumbName: title,
      };
    }

    // 3. Author Archive: /insights/author/[slug]
    if (path.startsWith('/insights/author/')) {
      const slug = path.replace('/insights/author/', '').replace(/\/$/, '').split('?')[0];
      const authorList = Object.values(AUTHORS);
      const matchedAuthor = authorList.find(
        (a) => a.slug === slug || a.name.toLowerCase().replace(/[\s.]+/g, '-') === slug
      );
      if (matchedAuthor) {
        return {
          variant: 'author',
          slug,
          title: matchedAuthor.fullName || matchedAuthor.name,
          description: matchedAuthor.description,
          breadcrumbName: matchedAuthor.fullName || matchedAuthor.name,
          authorMeta: matchedAuthor,
        };
      }
    }

    return null;
  }, []);

  // Sync route on mount and browser popstate
  useEffect(() => {
    const handleLocationChange = () => {
      const path = window.location.pathname;
      setCurrentPath(path);

      // 1. Redirect /expertise to /practice-areas (301 redirect requirement)
      if (path === '/expertise' || path === '/expertise/') {
        window.history.replaceState({}, '', '/practice-areas');
        setIsPracticeOverview(true);
        setActivePractice(null);
        setActiveArticle(null);
        setActiveArchive(null);
        setCurrentPath('/practice-areas');
        return;
      }

      // 1b. Redirect /our-people to /our-team (301 redirect requirement)
      if (path === '/our-people' || path === '/our-people/') {
        window.history.replaceState({}, '', '/our-team');
        setCurrentPath('/our-team');
        setActivePartner(null);
        setIsPracticeOverview(false);
        setActivePractice(null);
        setActiveArticle(null);
        setActiveArchive(null);
        return;
      }

      if (path.startsWith('/our-people/')) {
        const slug = path.replace('/our-people/', '').replace(/\/$/, '');
        const matched = site.team.partners.find((p) => p.slug === slug);
        if (matched) {
          window.history.replaceState({}, '', `/our-team/${matched.slug}`);
          setActivePartner(matched);
          setCurrentPath(`/our-team/${matched.slug}`);
          setIsPracticeOverview(false);
          setActivePractice(null);
          setActiveArticle(null);
          setActiveArchive(null);
          return;
        }
        window.history.replaceState({}, '', '/our-team');
        setCurrentPath('/our-team');
        setActivePartner(null);
        setIsPracticeOverview(false);
        setActivePractice(null);
        setActiveArticle(null);
        setActiveArchive(null);
        return;
      }

      // 1c. Our Team Page: /our-team
      if (path === '/our-team' || path === '/our-team/') {
        setCurrentPath('/our-team');
        setActivePartner(null);
        setIsPracticeOverview(false);
        setActivePractice(null);
        setActiveArticle(null);
        setActiveArchive(null);
        return;
      }

      // 1d. Partner Profile Template: /our-team/[slug]
      if (path.startsWith('/our-team/')) {
        const slug = path.replace('/our-team/', '').replace(/\/$/, '');
        const matched = site.team.partners.find((p) => p.slug === slug);
        if (matched) {
          setActivePartner(matched);
          setCurrentPath(`/our-team/${matched.slug}`);
          setIsPracticeOverview(false);
          setActivePractice(null);
          setActiveArticle(null);
          setActiveArchive(null);
          return;
        }
      }

      // 2. Check /expertise/[slug] redirects
      if (path.startsWith('/expertise/')) {
        const slug = path.replace('/expertise/', '').replace(/\/$/, '');
        const matched = getPracticeBySlug(slug);
        if (matched) {
          window.history.replaceState({}, '', `/practice-areas/${matched.slug}`);
          setActivePractice(matched);
          setIsPracticeOverview(false);
          setActiveArticle(null);
          setActiveArchive(null);
          setCurrentPath(`/practice-areas/${matched.slug}`);
          return;
        }
      }

      // 3. Practice Areas Overview: /practice-areas
      if (path === '/practice-areas' || path === '/practice-areas/') {
        setIsPracticeOverview(true);
        setActivePractice(null);
        setActiveArticle(null);
        setActiveArchive(null);
        return;
      }

      // 4. Practice Area Detail: /practice-areas/[slug]
      if (path.startsWith('/practice-areas/')) {
        const slug = path.replace('/practice-areas/', '').replace(/\/$/, '');
        const matched = getPracticeBySlug(slug);
        if (matched) {
          setActivePractice(matched);
          setIsPracticeOverview(false);
          setActiveArticle(null);
          setActiveArchive(null);
          return;
        }
      }

      // 5. Check Archive routes: /insights/category, topic, author
      const archiveCtx = resolveArchiveFromUrl(path);
      if (archiveCtx) {
        setActiveArchive(archiveCtx);
        setActiveArticle(null);
        setActivePractice(null);
        setIsPracticeOverview(false);
        return;
      }

      // 6. Check Single Article route: /insights/[slug]
      if (
        path.startsWith('/insights/') &&
        !path.startsWith('/insights/category/') &&
        !path.startsWith('/insights/topic/') &&
        !path.startsWith('/insights/author/')
      ) {
        const slug = path.replace('/insights/', '').replace(/\/$/, '');
        const matched = CMS_INSIGHTS.find((i) => i.slug === slug);
        if (matched) {
          setActiveArticle(matched);
          setActiveArchive(null);
          setActivePractice(null);
          setIsPracticeOverview(false);
          return;
        }
      }

      // 7. Default: Insights Landing Page
      setActiveArticle(null);
      setActiveArchive(null);
      setActivePractice(null);
      setIsPracticeOverview(false);
    };

    handleLocationChange();
    window.addEventListener('popstate', handleLocationChange);
    return () => window.removeEventListener('popstate', handleLocationChange);
  }, [resolveArchiveFromUrl]);

  // Navigation handlers
  const navigateToArticle = (article: InsightItem) => {
    setActiveArticle(article);
    setActiveArchive(null);
    setActivePractice(null);
    setIsPracticeOverview(false);
    setCurrentPath(`/insights/${article.slug}`);
    window.history.pushState({}, '', `/insights/${article.slug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToLanding = () => {
    setActiveArticle(null);
    setActiveArchive(null);
    setActivePractice(null);
    setIsPracticeOverview(false);
    setCurrentPath('/insights');
    window.history.pushState({}, '', '/insights');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTeam = () => {
    setActivePartner(null);
    setActiveArticle(null);
    setActiveArchive(null);
    setActivePractice(null);
    setIsPracticeOverview(false);
    setCurrentPath('/our-team');
    window.history.pushState({}, '', '/our-team');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToPartner = (slug: string) => {
    const matched = site.team.partners.find((p) => p.slug === slug);
    if (matched) {
      setActivePartner(matched);
      setIsPracticeOverview(false);
      setActivePractice(null);
      setActiveArticle(null);
      setActiveArchive(null);
      setCurrentPath(`/our-team/${matched.slug}`);
      window.history.pushState({}, '', `/our-team/${matched.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToPractice = (slug: string) => {
    const matched = getPracticeBySlug(slug);
    if (matched) {
      setActivePractice(matched);
      setIsPracticeOverview(false);
      setActiveArticle(null);
      setActiveArchive(null);
      setCurrentPath(`/practice-areas/${matched.slug}`);
      window.history.pushState({}, '', `/practice-areas/${matched.slug}`);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navigateToPracticeOverview = () => {
    setIsPracticeOverview(true);
    setActivePractice(null);
    setActiveArticle(null);
    setActiveArchive(null);
    setCurrentPath('/practice-areas');
    window.history.pushState({}, '', '/practice-areas');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToCategoryArchive = (categoryName: string) => {
    const catSlug = categoryName.toLowerCase().replace(/\s+/g, '-');
    const catMeta = CATEGORIES_META[catSlug];
    const ctx: ArchiveContext = {
      variant: 'category',
      slug: catSlug,
      title: catMeta?.name || categoryName,
      description: catMeta?.description,
      breadcrumbName: catMeta?.name || categoryName,
    };
    setActiveArchive(ctx);
    setActiveArticle(null);
    setActivePractice(null);
    setIsPracticeOverview(false);
    setCurrentPath(`/insights/category/${catSlug}`);
    window.history.pushState({}, '', `/insights/category/${catSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToTopicArchive = (topicSlug: string) => {
    const allTopics: Topic[] = [...PRACTICE_TOPICS, ...GENERAL_TOPICS];
    const matched = allTopics.find((t) => t.slug === topicSlug);
    const title = matched?.name || topicSlug.replace(/-/g, ' ');
    const ctx: ArchiveContext = {
      variant: 'topic',
      slug: topicSlug,
      title,
      description: matched?.description,
      breadcrumbName: title,
      practiceLink:
        matched?.isPractice && matched.practiceName && matched.practiceUrl
          ? { name: matched.practiceName, url: matched.practiceUrl }
          : undefined,
    };
    setActiveArchive(ctx);
    setActiveArticle(null);
    setActivePractice(null);
    setIsPracticeOverview(false);
    setCurrentPath(`/insights/topic/${topicSlug}`);
    window.history.pushState({}, '', `/insights/topic/${topicSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const navigateToAuthorArchive = (authorSlug: string) => {
    const authorList = Object.values(AUTHORS);
    const matched = authorList.find((a) => a.slug === authorSlug);
    if (!matched) return;

    const ctx: ArchiveContext = {
      variant: 'author',
      slug: authorSlug,
      title: matched.fullName || matched.name,
      description: matched.description,
      breadcrumbName: matched.fullName || matched.name,
      authorMeta: matched,
    };
    setActiveArchive(ctx);
    setActiveArticle(null);
    setActivePractice(null);
    setIsPracticeOverview(false);
    setCurrentPath(`/insights/author/${authorSlug}`);
    window.history.pushState({}, '', `/insights/author/${authorSlug}`);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  // Generic router dispatcher for Header/Footer navigation
  const handleGlobalNavigate = (path: string) => {
    if (path === '/' || path === '/insights') {
      navigateToLanding();
    } else if (path === '/our-team' || path === '/our-people') {
      navigateToTeam();
    } else if (path.startsWith('/our-team/')) {
      const slug = path.replace('/our-team/', '').replace(/\/$/, '');
      navigateToPartner(slug);
    } else if (path.startsWith('/our-people/')) {
      const slug = path.replace('/our-people/', '').replace(/\/$/, '');
      navigateToPartner(slug);
    } else if (path === '/practice-areas' || path === '/expertise') {
      navigateToPracticeOverview();
    } else if (path.startsWith('/practice-areas/') || path.startsWith('/expertise/')) {
      const slug = path.replace(/^\/(practice-areas|expertise)\//, '').replace(/\/$/, '');
      navigateToPractice(slug);
    } else {
      window.history.pushState({}, '', path);
      setCurrentPath(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  // Derive published non-sample items according to active CMS mode
  const publishedItems: InsightItem[] = useMemo(() => {
    const validItems = CMS_INSIGHTS.filter((item) => !item.isSample);
    switch (cmsMode) {
      case 'empty':
        return [];
      case 'partial-1':
        return validItems.slice(0, 1);
      case 'partial-3':
        return validItems.slice(0, 3);
      case 'full':
      default:
        return validItems;
    }
  }, [cmsMode]);

  const isZeroContent = publishedItems.length === 0;
  const isSingleItem = publishedItems.length === 1;
  const isPartial2Or3 = publishedItems.length >= 2 && publishedItems.length <= 3;

  const featuredArticle = useMemo(() => {
    if (isZeroContent) return null;
    const explicitlyFeatured = publishedItems.find((item) => item.featured);
    return explicitlyFeatured || publishedItems[0] || null;
  }, [publishedItems, isZeroContent]);

  const latestItems = useMemo(() => {
    if (!featuredArticle) return [];
    return publishedItems.filter((item) => item.id !== featuredArticle.id);
  }, [publishedItems, featuredArticle]);

  const publicationItems = useMemo(() => {
    return publishedItems.filter((item) => item.category === 'Publications');
  }, [publishedItems]);

  let currentSectionCount = 0;
  const featuredSectionNum = featuredArticle
    ? String(++currentSectionCount).padStart(2, '0')
    : null;

  const showLatestSection = !isZeroContent && !isSingleItem && latestItems.length > 0;
  const latestSectionNum = showLatestSection
    ? String(++currentSectionCount).padStart(2, '0')
    : null;

  const showPublicationsSection = !isZeroContent && publicationItems.length > 0;
  const publicationsSectionNum = showPublicationsSection
    ? String(++currentSectionCount).padStart(2, '0')
    : null;

  return (
    <div className="min-h-screen flex flex-col bg-[#FDFCF8] text-[#1A1815]">
      {/* Global Header */}
      <Header currentPath={currentPath} onNavigate={handleGlobalNavigate} />

      <main id="main-content" className="flex-grow">
        {activePartner ? (
          /* ========================================================
             0a. PARTNER PROFILE TEMPLATE (/our-team/[slug])
             ======================================================== */
          <PartnerProfile
            partner={activePartner}
            onNavigateTeam={navigateToTeam}
            onNavigateHome={navigateToLanding}
            onNavigatePractice={navigateToPractice}
            onNavigateArticle={navigateToArticle}
          />
        ) : currentPath === '/our-team' ? (
          /* ========================================================
             0b. OUR TEAM PAGE (/our-team)
             ======================================================== */
          <OurTeam
            onNavigateHome={navigateToLanding}
            onSelectPartner={navigateToPartner}
          />
        ) : activePractice ? (
          /* ========================================================
             1. PRACTICE AREA DETAIL TEMPLATE (/practice-areas/[slug])
             ======================================================== */
          <PracticeDetailView
            practice={activePractice}
            allInsights={CMS_INSIGHTS}
            onSelectPractice={navigateToPractice}
            onNavigateOverview={navigateToPracticeOverview}
            onNavigateHome={navigateToLanding}
            onSelectInsight={navigateToArticle}
          />
        ) : isPracticeOverview ? (
          /* ========================================================
             2. PRACTICE AREAS OVERVIEW (/practice-areas)
             ======================================================== */
          <PracticeOverviewView
            onSelectPractice={navigateToPractice}
            onNavigateHome={navigateToLanding}
          />
        ) : activeArticle ? (
          /* ========================================================
             3. SINGLE ARTICLE TEMPLATE (/insights/[slug])
             ======================================================== */
          <ArticleView
            article={activeArticle}
            onNavigateHome={navigateToLanding}
            onSelectArticle={navigateToArticle}
            onNavigateCategory={navigateToCategoryArchive}
            onNavigateTopic={navigateToTopicArchive}
          />
        ) : activeArchive ? (
          /* ========================================================
             4. ARCHIVE TEMPLATE (/insights/category, topic, author)
             ======================================================== */
          <ArchiveView
            context={activeArchive}
            allItems={CMS_INSIGHTS}
            onNavigateHome={navigateToLanding}
            onSelectArticle={navigateToArticle}
            onNavigateCategory={navigateToCategoryArchive}
            onNavigateTopic={navigateToTopicArchive}
            onNavigateAuthor={navigateToAuthorArchive}
          />
        ) : isZeroContent ? (
          /* ========================================================
             5. EXACT ZERO-CONTENT STATE
             ======================================================== */
          <>
            <EmptyState isNewsletterConnected={isNewsletterConnected} />
            <SharedCta headline="Have a matter to discuss?" />
          </>
        ) : (
          /* ========================================================
             6. EDITORIAL LANDING PAGE (/insights)
             ======================================================== */
          <>
            {/* 1. HERO */}
            <InsightsHero />

            {/* 2. FEATURED ARTICLE */}
            {featuredArticle && featuredSectionNum && (
              <FeaturedArticle
                article={featuredArticle}
                sectionNumber={featuredSectionNum}
                onSelectArticle={navigateToArticle}
                onSelectCategory={(cat) => {
                  navigateToCategoryArchive(cat);
                }}
              />
            )}

            {/* 3. LATEST INSIGHTS */}
            {showLatestSection && latestSectionNum && (
              <div id="latest-insights-anchor">
                <LatestInsights
                  items={latestItems}
                  sectionNumber={latestSectionNum}
                  selectedCategory={selectedCategory}
                  onSelectCategory={(cat) => {
                    if (cat === 'All') {
                      setSelectedCategory('All');
                    } else {
                      navigateToCategoryArchive(cat);
                    }
                  }}
                  selectedTopic={selectedTopic}
                  onSelectTopic={setSelectedTopic}
                  isPartialState={isPartial2Or3}
                  onSelectArticle={navigateToArticle}
                />
              </div>
            )}

            {/* 4. NEWSLETTER BAND (navy) */}
            <NewsletterBand isConnected={isNewsletterConnected} />

            {/* 5. PUBLICATIONS LIBRARY STRIP */}
            {showPublicationsSection && publicationsSectionNum && (
              <PublicationsStrip
                publications={publicationItems}
                sectionNumber={publicationsSectionNum}
                onSelectArticle={navigateToArticle}
              />
            )}

            {/* 6. SHARED CTA */}
            <SharedCta headline="Have a matter to discuss?" />
          </>
        )}
      </main>

      {/* Global Footer */}
      <Footer onNavigate={handleGlobalNavigate} />

      {/* Interactive CMS & Practice State Simulator for reviewer and QA */}
      <CmsStateSwitcher
        currentMode={cmsMode}
        onSelectMode={(mode) => {
          setCmsMode(mode);
          setSelectedCategory('All');
          setSelectedTopic(null);
          setActiveArticle(null);
          setActiveArchive(null);
          setActivePractice(null);
          setIsPracticeOverview(false);
        }}
        isNewsletterConnected={isNewsletterConnected}
        onToggleNewsletter={() => setIsNewsletterConnected(!isNewsletterConnected)}
        selectedArticle={activeArticle}
        onSelectArticle={(article) => {
          if (article) {
            navigateToArticle(article);
          } else {
            navigateToLanding();
          }
        }}
        selectedArchive={activeArchive}
        onSelectArchive={(archive) => {
          if (archive) {
            setActiveArchive(archive);
            setActiveArticle(null);
            setActivePractice(null);
            setIsPracticeOverview(false);
            window.history.pushState({}, '', `/insights/${archive.variant}/${archive.slug}`);
            window.scrollTo({ top: 0, behavior: 'smooth' });
          } else {
            navigateToLanding();
          }
        }}
        selectedPractice={activePractice}
        isPracticeOverview={isPracticeOverview}
        onNavigatePractice={(slug) => navigateToPractice(slug)}
        onNavigatePracticeOverview={() => navigateToPracticeOverview()}
        isTeamPage={currentPath === '/our-team'}
        onNavigateTeam={() => navigateToTeam()}
        selectedPartner={activePartner}
        onNavigatePartner={(slug) => navigateToPartner(slug)}
      />
    </div>
  );
}
