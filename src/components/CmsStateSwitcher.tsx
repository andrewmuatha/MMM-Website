import React, { useState } from 'react';
import { Settings2, ChevronDown, ChevronUp, BookOpen, Layers, FolderGit2, Briefcase } from 'lucide-react';
import { ArchiveContext, CmsMode, InsightItem } from '../types/cms';
import { PracticeArea } from '../types/practice';
import { CMS_INSIGHTS } from '../data/cmsData';
import { PRACTICE_AREAS } from '../data/practiceData';

interface CmsStateSwitcherProps {
  currentMode: CmsMode;
  onSelectMode: (mode: CmsMode) => void;
  isNewsletterConnected: boolean;
  onToggleNewsletter: () => void;
  selectedArticle: InsightItem | null;
  onSelectArticle: (article: InsightItem | null) => void;
  selectedArchive: ArchiveContext | null;
  onSelectArchive: (archive: ArchiveContext | null) => void;
  selectedPractice?: PracticeArea | null;
  isPracticeOverview?: boolean;
  onNavigatePractice?: (slug: string) => void;
  onNavigatePracticeOverview?: () => void;
}

export const CmsStateSwitcher: React.FC<CmsStateSwitcherProps> = ({
  currentMode,
  onSelectMode,
  isNewsletterConnected,
  onToggleNewsletter,
  selectedArticle,
  onSelectArticle,
  selectedArchive,
  onSelectArchive,
  selectedPractice,
  isPracticeOverview,
  onNavigatePractice,
  onNavigatePracticeOverview,
}) => {
  const [isOpen, setIsOpen] = useState(false);

  // Articles available for quick preview
  const sampleItem = CMS_INSIGHTS.find((i) => i.isSample);
  const featuredItem = CMS_INSIGHTS.find((i) => i.featured);

  return (
    <div className="fixed bottom-4 right-4 z-50 print:hidden font-sans">
      <div className="bg-[#16233F] text-[#FDFCF8] border border-[#C6A455]/40 shadow-xl transition-all max-w-sm">
        {/* Header toggle button */}
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="flex items-center justify-between w-full px-4 py-2.5 text-[12px] uppercase tracking-[0.14em] text-[#C6A455] hover:text-[#FDFCF8] transition-colors focus-visible:outline-2 focus-visible:outline-[#C6A455]"
          aria-expanded={isOpen}
        >
          <span className="flex items-center gap-2">
            <Settings2 size={14} className="text-[#C6A455]" />
            <span className="font-semibold truncate max-w-[200px]">
              {selectedPractice
                ? `Practice: ${selectedPractice.shortName}`
                : isPracticeOverview
                ? 'Practice Overview'
                : selectedArticle
                ? 'Viewing Article'
                : selectedArchive
                ? `Archive: ${selectedArchive.title}`
                : 'CMS & Page Simulator'}
            </span>
          </span>
          <span className="ml-3">
            {isOpen ? <ChevronDown size={14} /> : <ChevronUp size={14} />}
          </span>
        </button>

        {/* Collapsible panel */}
        {isOpen && (
          <div className="p-4 border-t border-[#C6A455]/20 space-y-4 max-h-[80vh] overflow-y-auto text-[13px]">
            {/* Practice Areas Navigation */}
            <div>
              <span className="text-[11px] uppercase tracking-wider text-[#C6A455] block mb-2 font-semibold flex items-center gap-1.5">
                <Briefcase size={13} />
                <span>Practice Area Templates:</span>
              </span>

              <div className="space-y-1">
                {/* Practice Overview */}
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigatePracticeOverview) onNavigatePracticeOverview();
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors ${
                    isPracticeOverview
                      ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                      : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                  }`}
                >
                  <div className="font-medium">/practice-areas (Overview)</div>
                </button>

                {/* 4 Practice Details */}
                {PRACTICE_AREAS.map((practice) => (
                  <button
                    key={practice.id}
                    type="button"
                    onClick={() => {
                      if (onNavigatePractice) onNavigatePractice(practice.slug);
                    }}
                    className={`w-full text-left px-3 py-1.5 transition-colors ${
                      selectedPractice?.id === practice.id
                        ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                        : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                    }`}
                  >
                    <div className="font-medium flex items-center justify-between">
                      <span>{practice.number} // {practice.shortName}</span>
                      <span className="text-[10px] opacity-75 font-mono">/{practice.slug}</span>
                    </div>
                  </button>
                ))}
              </div>
            </div>

            {/* Template Navigation for Insights */}
            <div className="pt-2 border-t border-[#FDFCF8]/10">
              <span className="text-[11px] uppercase tracking-wider text-[#C6A455] block mb-2 font-semibold flex items-center gap-1.5">
                <BookOpen size={13} />
                <span>Insights Views:</span>
              </span>

              <div className="space-y-1">
                {/* Landing Page */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectArticle(null);
                    onSelectArchive(null);
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors ${
                    !selectedArticle && !selectedArchive && !selectedPractice && !isPracticeOverview
                      ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                      : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                  }`}
                >
                  <div className="font-medium">/insights (Landing Page)</div>
                </button>

                {/* Sample Test Article */}
                {sampleItem && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectArchive(null);
                      onSelectArticle(sampleItem);
                    }}
                    className={`w-full text-left px-3 py-1.5 transition-colors ${
                      selectedArticle?.id === sampleItem.id
                        ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                        : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                    }`}
                  >
                    <div className="font-medium text-[#C6A455]">
                      ★ Article: [SAMPLE Specimen]
                    </div>
                  </button>
                )}

                {/* Featured Article */}
                {featuredItem && (
                  <button
                    type="button"
                    onClick={() => {
                      onSelectArchive(null);
                      onSelectArticle(featuredItem);
                    }}
                    className={`w-full text-left px-3 py-1.5 transition-colors ${
                      selectedArticle?.id === featuredItem.id
                        ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                        : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                    }`}
                  >
                    <div className="font-medium truncate">Article: Sectional Properties 2026</div>
                  </button>
                )}
              </div>
            </div>

            {/* Archive Variants */}
            <div className="pt-2 border-t border-[#FDFCF8]/10">
              <span className="text-[11px] uppercase tracking-wider text-[#C6A455] block mb-2 font-semibold flex items-center gap-1.5">
                <FolderGit2 size={13} />
                <span>Archive Templates:</span>
              </span>

              <div className="space-y-1">
                {/* Variant 1A: Category - Events */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectArticle(null);
                    onSelectArchive({
                      variant: 'category',
                      slug: 'events',
                      title: 'Events',
                      breadcrumbName: 'Events',
                      description: 'Seminars, roundtables, symposia and practical legal training workshops convened by MMM Advocates.',
                    });
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors ${
                    selectedArchive?.variant === 'category' && selectedArchive.slug === 'events'
                      ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                      : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                  }`}
                >
                  <div className="font-medium">Category: Events</div>
                </button>

                {/* Variant 1B: Category - Publications */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectArticle(null);
                    onSelectArchive({
                      variant: 'category',
                      slug: 'publications',
                      title: 'Publications',
                      breadcrumbName: 'Publications',
                      description: 'Authoritative annual surveys, practice compendiums, sector manuals and research dossiers published by the firm.',
                    });
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors ${
                    selectedArchive?.variant === 'category' && selectedArchive.slug === 'publications'
                      ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                      : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                  }`}
                >
                  <div className="font-medium">Category: Publications</div>
                </button>

                {/* Variant 2A: Topic (Practice-linked) */}
                <button
                  type="button"
                  onClick={() => {
                    onSelectArticle(null);
                    onSelectArchive({
                      variant: 'topic',
                      slug: 'property-real-estate',
                      title: 'Property & Real Estate',
                      breadcrumbName: 'Property & Real Estate',
                      description: 'Analysis of sectional property conversions, land title regularizations, commercial leasing and physical planning jurisprudence.',
                      practiceLink: {
                        name: 'Property',
                        url: '/practice-areas/property-real-estate',
                      },
                    });
                  }}
                  className={`w-full text-left px-3 py-1.5 transition-colors ${
                    selectedArchive?.variant === 'topic' && selectedArchive.slug === 'property-real-estate'
                      ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                      : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                  }`}
                >
                  <div className="font-medium">Topic: Property &amp; Real Estate</div>
                </button>
              </div>
            </div>

            {/* Landing Page CMS Modes */}
            {!selectedArticle && !selectedArchive && !selectedPractice && !isPracticeOverview && (
              <div className="pt-2 border-t border-[#FDFCF8]/10">
                <span className="text-[11px] uppercase tracking-wider text-[#C6A455] block mb-2 font-semibold flex items-center gap-1.5">
                  <Layers size={13} />
                  <span>Landing Page CMS States:</span>
                </span>
                <div className="space-y-1">
                  <button
                    type="button"
                    onClick={() => onSelectMode('full')}
                    className={`w-full text-left px-3 py-1.5 transition-colors ${
                      currentMode === 'full'
                        ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                        : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                    }`}
                  >
                    <div className="font-medium">Full Editorial Index</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectMode('partial-3')}
                    className={`w-full text-left px-3 py-1.5 transition-colors ${
                      currentMode === 'partial-3'
                        ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                        : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                    }`}
                  >
                    <div className="font-medium">2 to 3 Items State</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectMode('partial-1')}
                    className={`w-full text-left px-3 py-1.5 transition-colors ${
                      currentMode === 'partial-1'
                        ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                        : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                    }`}
                  >
                    <div className="font-medium">1 Item Partial State</div>
                  </button>

                  <button
                    type="button"
                    onClick={() => onSelectMode('empty')}
                    className={`w-full text-left px-3 py-1.5 transition-colors ${
                      currentMode === 'empty'
                        ? 'bg-[#C6A455] text-[#16233F] font-semibold'
                        : 'bg-[#FDFCF8]/5 hover:bg-[#FDFCF8]/10 text-[#FDFCF8]'
                    }`}
                  >
                    <div className="font-medium">Exact Zero-Content State</div>
                  </button>
                </div>
              </div>
            )}

            {/* Newsletter toggle */}
            <div className="pt-2 border-t border-[#FDFCF8]/10">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-[12px] text-[#FDFCF8]/80">Newsletter provider</span>
                <input
                  type="checkbox"
                  checked={isNewsletterConnected}
                  onChange={onToggleNewsletter}
                  className="accent-[#C6A455] w-4 h-4 rounded-none"
                />
              </label>
              <div className="text-[11px] text-[#FDFCF8]/50 pt-1">
                {isNewsletterConnected ? 'Connected (Form displayed)' : 'Disconnected (Fallback link)'}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
