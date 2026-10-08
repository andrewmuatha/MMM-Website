import React, { useEffect, useState } from 'react';
import { ArrowRight, ArrowUpRight, ChevronRight, Check } from 'lucide-react';
import { PRACTICE_AREAS } from '../../data/practiceData';
import { CrossPracticeDiagram } from './CrossPracticeDiagram';
import { SharedCta } from '../SharedCta';

interface PracticeOverviewViewProps {
  onSelectPractice: (slug: string) => void;
  onNavigateHome: () => void;
}

export const PracticeOverviewView: React.FC<PracticeOverviewViewProps> = ({
  onSelectPractice,
  onNavigateHome,
}) => {
  const [activeTab, setActiveTab] = useState<string>(PRACTICE_AREAS[0].id);
  const [hoveredPracticeId, setHoveredPracticeId] = useState<string | null>(null);

  useEffect(() => {
    document.title = 'Practice Areas | MMM Advocates LLP Nairobi';

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute(
        'content',
        'Specialised practice areas spanning Corporate & Commercial, Dispute Resolution, Technology Media & Telecommunications, and Property & Real Estate in Kenya.'
      );
    }

    const scriptId = 'schema-practice-overview';
    let script = document.getElementById(scriptId) as HTMLScriptElement | null;
    if (!script) {
      script = document.createElement('script');
      script.id = scriptId;
      script.type = 'application/ld+json';
      document.head.appendChild(script);
    }

    const schemaData = {
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
              name: 'Practice Areas',
              item: 'https://mmmadvocatesllp.com/practice-areas',
            },
          ],
        },
        {
          '@type': 'CollectionPage',
          name: 'Practice Areas | MMM Advocates LLP',
          description:
            'Specialised practice areas spanning Corporate & Commercial, Dispute Resolution, TMT, and Property & Real Estate in Kenya.',
          url: 'https://mmmadvocatesllp.com/practice-areas',
        },
      ],
    };

    script.textContent = JSON.stringify(schemaData);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, []);

  const scrollToChapter = (id: string) => {
    const el = document.getElementById(`chapter-${id}`);
    if (el) {
      const topOffset = 130;
      const elementPosition = el.getBoundingClientRect().top + window.pageYOffset;
      window.scrollTo({
        top: elementPosition - topOffset,
        behavior: 'smooth',
      });
      setActiveTab(id);
    }
  };

  return (
    <div className="min-h-screen bg-[#FDFCF8] text-[#1A1815]">
      {/* 1. BREADCRUMB */}
      <nav aria-label="Breadcrumb" className="pt-8 pb-6 border-b border-[#1A1815]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <ol className="flex items-center gap-2 text-[12px] sm:text-[13px] text-[#5F5D55]">
            <li>
              <button
                type="button"
                onClick={onNavigateHome}
                className="hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                Home
              </button>
            </li>
            <li aria-hidden="true" className="text-[#86847A]">
              <ChevronRight size={13} />
            </li>
            <li className="text-[#16233F] font-semibold" aria-current="page">
              Practice areas
            </li>
          </ol>
        </div>
      </nav>

      {/* 2. HERO SECTION */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1815]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <div className="max-w-4xl">
            <div className="flex items-center gap-2 mb-6 text-[12px] uppercase tracking-[0.2em] font-medium text-[#7A2142]">
              <span className="inline-block w-2 h-2 bg-[#C6A455] rotate-45" />
              <span>Practice overview</span>
            </div>
            <h1 className="font-serif text-[42px] sm:text-[60px] lg:text-[72px] leading-[1.08] text-[#16233F] tracking-[-0.01em] mb-8">
              Commercial thinking, structured for East Africa.
            </h1>
            <p className="text-[19px] sm:text-[22px] leading-[1.65] text-[#1A1815] font-serif italic mb-6">
              Rigorous statutory analysis, pragmatic structuring, and resolute advocacy across key economic drivers.
            </p>
            <p className="text-[16px] sm:text-[17px] leading-[1.75] text-[#5F5D55] max-w-3xl">
              We focus on four foundational pillars of modern commercial activity. Each discipline is led by seasoned partners who combine technical depth with an intimate grasp of regional market conditions.
            </p>
          </div>
        </div>
      </section>

      {/* 3. STICKY SCROLL-SPY ANCHOR BAR */}
      <div className="sticky top-[72px] z-40 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#1A1815]/15">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <div className="flex items-center overflow-x-auto no-scrollbar py-3.5 gap-2 sm:gap-6">
            <span className="text-[11px] uppercase tracking-[0.18em] text-[#86847A] font-semibold shrink-0 hidden md:inline">
              Jump to:
            </span>
            {PRACTICE_AREAS.map((p) => {
              const isActive = activeTab === p.id;
              return (
                <button
                  key={p.id}
                  type="button"
                  onClick={() => scrollToChapter(p.id)}
                  className={`text-[13px] font-medium whitespace-nowrap px-3 py-1.5 transition-colors shrink-0 flex items-center gap-2 ${
                    isActive
                      ? 'text-[#16233F] font-semibold bg-[#F6F3EC] border-b-2 border-[#7A2142]'
                      : 'text-[#5F5D55] hover:text-[#16233F]'
                  }`}
                >
                  <span className="font-mono text-[11px] text-[#C6A455]">{p.number}</span>
                  <span>{p.shortName}</span>
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 4. HOVER-REVEAL INDEX TABLE */}
      <section className="py-14 sm:py-20 border-b border-[#1A1815]/10 bg-[#F6F3EC]/40">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <div className="mb-8">
            <div className="text-[11px] uppercase tracking-[0.2em] text-[#7A2142] font-semibold mb-2">
              Practice catalogue
            </div>
            <h2 className="font-serif text-[26px] sm:text-[34px] text-[#16233F]">
              Four Core Disciplines
            </h2>
          </div>

          <div className="border-t border-[#1A1815]/15 divide-y divide-[#1A1815]/10">
            {PRACTICE_AREAS.map((p) => (
              <div
                key={p.id}
                onMouseEnter={() => setHoveredPracticeId(p.id)}
                onMouseLeave={() => setHoveredPracticeId(null)}
                onClick={() => onSelectPractice(p.slug)}
                className="py-6 sm:py-8 flex flex-col md:flex-row md:items-center justify-between gap-4 cursor-pointer group hover:bg-[#FDFCF8] px-4 -mx-4 transition-all"
              >
                <div className="flex items-start md:items-center gap-6 md:gap-10">
                  <span className="font-mono text-[16px] text-[#C6A455] font-semibold pt-1 md:pt-0">
                    {p.number}
                  </span>
                  <div>
                    <h3 className="font-serif text-[22px] sm:text-[28px] text-[#16233F] group-hover:text-[#7A2142] transition-colors font-semibold">
                      {p.name.includes('Telecommunications') ? (
                        <>
                          Technology, Media &amp;{' '}
                          <span className="inline-block break-keep whitespace-nowrap">
                            Telecommunications
                          </span>
                        </>
                      ) : (
                        p.name
                      )}
                    </h3>
                    <p className="text-[14px] text-[#5F5D55] mt-1 max-w-2xl line-clamp-1">
                      {p.headline}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 pl-12 md:pl-0">
                  <span className="text-[12px] uppercase tracking-[0.1em] font-semibold text-[#16233F] group-hover:text-[#7A2142] group-hover:underline flex items-center gap-1">
                    View practice <ArrowRight size={14} />
                  </span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 5. EDITORIAL CHAPTERS */}
      <div className="divide-y divide-[#1A1815]/15">
        {PRACTICE_AREAS.map((practice) => (
          <section
            key={practice.id}
            id={`chapter-${practice.id}`}
            className="py-20 md:py-28"
          >
            <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
                {/* Left 8 Cols */}
                <div className="lg:col-span-8">
                  <div className="flex items-center gap-2 mb-5 text-[12px] uppercase tracking-[0.2em] font-medium text-[#7A2142]">
                    <span className="font-mono text-[#C6A455] font-semibold">
                      {practice.number}
                    </span>
                    <span>// Chapter</span>
                  </div>

                  <h2 className="font-serif text-[36px] sm:text-[48px] lg:text-[54px] leading-[1.12] text-[#16233F] mb-6">
                    {practice.name.includes('Telecommunications') ? (
                      <>
                        Technology, Media &amp;{' '}
                        <span className="inline-block break-keep whitespace-nowrap">
                          Telecommunications
                        </span>
                      </>
                    ) : (
                      practice.name
                    )}
                  </h2>

                  <p className="text-[18px] sm:text-[20px] leading-[1.6] text-[#1A1815] font-serif italic mb-6 border-l-2 border-[#C6A455] pl-5">
                    &ldquo;{practice.headline}&rdquo;
                  </p>

                  <p className="text-[16px] sm:text-[17px] leading-[1.7] text-[#5F5D55] mb-8">
                    {practice.lead}
                  </p>

                  {/* Focus areas summary */}
                  <div className="mb-8">
                    <h4 className="text-[12px] uppercase tracking-[0.16em] text-[#86847A] font-semibold mb-4">
                      Primary advisory areas:
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      {practice.focusAreas.slice(0, 4).map((fa, faIdx) => (
                        <div
                          key={faIdx}
                          className="p-4 bg-[#F6F3EC]/70 border border-[#1A1815]/10"
                        >
                          <div className="text-[14px] font-semibold text-[#16233F] mb-1">
                            {fa.title}
                          </div>
                          <div className="text-[12px] text-[#5F5D55] line-clamp-2">
                            {fa.description}
                          </div>
                        </div>
                      ))}
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => onSelectPractice(practice.slug)}
                    className="group inline-flex items-center gap-2 px-6 py-3 bg-[#16233F] text-[#FDFCF8] text-[13px] uppercase tracking-[0.08em] font-medium transition-colors hover:bg-[#7A2142] focus-visible:outline-2 focus-visible:outline-[#16233F]"
                  >
                    <span>Explore full practice details</span>
                    <ArrowRight size={14} />
                  </button>
                </div>

                {/* Right 4 Cols: Partner Lead summary */}
                <div className="lg:col-span-4 lg:pl-4">
                  <div className="bg-[#F6F3EC] border border-[#1A1815]/10 p-7">
                    <div className="text-[11px] uppercase tracking-[0.18em] text-[#86847A] font-semibold mb-4">
                      Practice leadership
                    </div>
                    <div className="flex items-center gap-4 mb-4">
                      <div className="w-12 h-12 bg-[#16233F] text-[#C6A455] font-serif text-[16px] font-semibold flex items-center justify-center shrink-0 border border-[#C6A455]/30">
                        {practice.primaryPartner.initials}
                      </div>
                      <div>
                        <h4 className="font-serif text-[18px] font-semibold text-[#16233F]">
                          {practice.primaryPartner.fullName || practice.primaryPartner.name}
                        </h4>
                        <p className="text-[12px] text-[#7A2142] font-medium">
                          {practice.primaryPartner.role}
                        </p>
                      </div>
                    </div>
                    <p className="text-[13px] text-[#5F5D55] leading-relaxed mb-4">
                      {practice.primaryPartner.description ||
                        'Advising commercial enterprises and institutions across East Africa.'}
                    </p>
                    <button
                      type="button"
                      onClick={() => onSelectPractice(practice.slug)}
                      className="text-[12px] text-[#16233F] font-semibold hover:text-[#7A2142] inline-flex items-center gap-1"
                    >
                      View partner profile &amp; scope <ArrowUpRight size={13} />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        ))}
      </div>

      {/* 6. CROSS-PRACTICE DIAGRAM SECTION */}
      <section className="py-20 md:py-28 border-b border-[#1A1815]/10 bg-[#FDFCF8]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <CrossPracticeDiagram onSelectPractice={onSelectPractice} />
        </div>
      </section>

      {/* 7. SHARED CTA */}
      <SharedCta headline="Have a matter to discuss?" />
    </div>
  );
};
