import React, { useEffect, useMemo } from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight, Mail, Phone, Clock, FileText } from 'lucide-react';
import { PracticeArea } from '../../types/practice';
import { PRACTICE_AREAS } from '../../data/practiceData';
import { InsightItem } from '../../types/cms';
import { PracticeBreadcrumb } from './PracticeBreadcrumb';
import { SharedCta } from '../SharedCta';

interface PracticeDetailViewProps {
  practice: PracticeArea;
  allInsights: InsightItem[];
  onSelectPractice: (slug: string) => void;
  onNavigateOverview: () => void;
  onNavigateHome: () => void;
  onSelectInsight: (insight: InsightItem) => void;
}

export const PracticeDetailView: React.FC<PracticeDetailViewProps> = ({
  practice,
  allInsights,
  onSelectPractice,
  onNavigateOverview,
  onNavigateHome,
  onSelectInsight,
}) => {
  // Update document title and schema
  useEffect(() => {
    document.title = `${practice.name} | MMM Advocates LLP`;

    const metaDescription = document.querySelector('meta[name="description"]');
    if (metaDescription) {
      metaDescription.setAttribute('content', practice.seoDescription);
    }

    // Dynamic JSON-LD structured data for LegalService & Breadcrumbs
    const scriptId = 'schema-practice-detail';
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
            {
              '@type': 'ListItem',
              position: 3,
              name: practice.name,
              item: `https://mmmadvocatesllp.com/practice-areas/${practice.slug}`,
            },
          ],
        },
        {
          '@type': 'Service',
          '@id': `https://mmmadvocatesllp.com/practice-areas/${practice.slug}`,
          name: practice.name,
          description: practice.seoDescription,
          provider: {
            '@type': 'LegalService',
            name: 'Mundui, Murai & Mwaniki Advocates LLP',
            address: {
              '@type': 'PostalAddress',
              streetAddress: 'Delta Corner Annex, 7th Floor, Ring Road Westlands, Off Chiromo Lane',
              addressLocality: 'Nairobi',
              postalCode: '00100',
              addressCountry: 'KE',
            },
            telephone: '+254713874830',
          },
          areaServed: {
            '@type': 'AdministrativeArea',
            name: 'East Africa',
          },
        },
      ],
    };

    script.textContent = JSON.stringify(schemaData);

    return () => {
      const existing = document.getElementById(scriptId);
      if (existing) existing.remove();
    };
  }, [practice]);

  // Determine previous and next practice areas
  const currentIndex = PRACTICE_AREAS.findIndex((p) => p.id === practice.id);
  const prevPractice =
    currentIndex > 0 ? PRACTICE_AREAS[currentIndex - 1] : PRACTICE_AREAS[PRACTICE_AREAS.length - 1];
  const nextPractice =
    currentIndex < PRACTICE_AREAS.length - 1 ? PRACTICE_AREAS[currentIndex + 1] : PRACTICE_AREAS[0];

  // Filter matching insights (without placeholder articles)
  const relatedInsights = useMemo(() => {
    return allInsights.filter((item) => {
      if (item.isSample) return false;
      return item.topics.some(
        (t) =>
          practice.relatedTopicSlugs.includes(t.slug) ||
          t.slug === practice.slug ||
          (practice.aliases && practice.aliases.includes(t.slug))
      );
    });
  }, [allInsights, practice]);

  // Special safe renderer for practice title to prevent "Telecommunications" from splitting
  const renderPracticeTitle = (name: string) => {
    if (name.includes('Telecommunications')) {
      return (
        <>
          Technology, Media &amp;{' '}
          <span className="inline-block break-keep whitespace-nowrap">Telecommunications</span>
        </>
      );
    }
    return name;
  };

  return (
    <article className="min-h-screen bg-[#FDFCF8]">
      {/* 1. BREADCRUMB */}
      <PracticeBreadcrumb
        practiceName={practice.name}
        onNavigateOverview={onNavigateOverview}
        onNavigateHome={onNavigateHome}
      />

      {/* 2. HERO SECTION */}
      <section className="pt-16 pb-20 md:pt-24 md:pb-28 border-b border-[#1A1815]/10">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            {/* Left 8 Cols: Practice Title, Lead & Context */}
            <div className="lg:col-span-8">
              {/* Section Eyebrow Label */}
              <div className="flex items-center gap-2 mb-6 text-[12px] uppercase tracking-[0.2em] font-medium text-[#7A2142]">
                <span className="inline-block w-2 h-2 bg-[#C6A455] rotate-45" />
                <span>
                  {practice.number} // Practice area
                </span>
              </div>

              {/* Practice Headline Title */}
              <h1 className="font-serif text-[40px] sm:text-[56px] lg:text-[68px] leading-[1.08] text-[#16233F] tracking-[-0.01em] mb-8">
                {renderPracticeTitle(practice.name)}
              </h1>

              {/* Subheading / Standfirst */}
              <p className="text-[20px] sm:text-[22px] leading-[1.6] text-[#1A1815] font-serif italic mb-8 border-l-2 border-[#C6A455] pl-6">
                &ldquo;{practice.headline}&rdquo;
              </p>

              {/* Lead Paragraph */}
              <p className="text-[17px] sm:text-[19px] leading-[1.7] text-[#1A1815] font-normal mb-8">
                {practice.lead}
              </p>

              {/* Extended Overview Paragraphs */}
              <div className="space-y-5 text-[15px] sm:text-[16px] leading-[1.75] text-[#5F5D55]">
                {practice.overview.map((para, idx) => (
                  <p key={idx}>{para}</p>
                ))}
              </div>
            </div>

            {/* Right 4 Cols: Lead Partner Contact & Key Scope */}
            <div className="lg:col-span-4 lg:pl-4">
              <div className="sticky top-28 bg-[#F6F3EC] border border-[#1A1815]/10 p-7 sm:p-8">
                <div className="text-[11px] uppercase tracking-[0.2em] text-[#86847A] font-semibold mb-6 flex items-center justify-between pb-3 border-b border-[#1A1815]/10">
                  <span>Practice leadership</span>
                  <span className="text-[#C6A455] font-mono">{practice.number}</span>
                </div>

                {/* Primary Partner Card */}
                <div className="flex items-start gap-4 mb-6">
                  <div className="w-14 h-14 bg-[#16233F] text-[#C6A455] flex items-center justify-center font-serif text-[18px] font-semibold shrink-0 border border-[#C6A455]/30">
                    {practice.primaryPartner.initials}
                  </div>
                  <div>
                    <h3 className="font-serif text-[19px] font-semibold text-[#16233F] leading-snug">
                      {practice.primaryPartner.fullName || practice.primaryPartner.name}
                    </h3>
                    <p className="text-[13px] text-[#7A2142] font-medium mt-0.5">
                      {practice.primaryPartner.role}
                    </p>
                    <p className="text-[12px] text-[#86847A] mt-1">Lead Partner</p>
                  </div>
                </div>

                {/* Partner Direct Contacts */}
                <div className="space-y-2.5 pt-4 border-t border-[#1A1815]/10 text-[13px] text-[#5F5D55]">
                  <a
                    href="mailto:contact@mmmadvocatesllp.com"
                    className="flex items-center gap-3 hover:text-[#16233F] transition-colors py-1 group"
                  >
                    <Mail size={15} className="text-[#C6A455] shrink-0" />
                    <span className="truncate group-hover:underline">
                      contact@mmmadvocatesllp.com
                    </span>
                  </a>
                  <a
                    href="tel:+254713874830"
                    className="flex items-center gap-3 hover:text-[#16233F] transition-colors py-1 group"
                  >
                    <Phone size={15} className="text-[#C6A455] shrink-0" />
                    <span>+254 713 874 830</span>
                  </a>
                </div>

                {/* Supporting Partners if available */}
                {practice.supportingPartners && practice.supportingPartners.length > 0 && (
                  <div className="mt-6 pt-5 border-t border-[#1A1815]/10">
                    <div className="text-[11px] uppercase tracking-[0.16em] text-[#86847A] font-semibold mb-3">
                      Supporting partners
                    </div>
                    {practice.supportingPartners.map((supp, sIdx) => (
                      <div key={sIdx} className="flex items-center gap-3 py-1.5 text-[13px]">
                        <div className="w-7 h-7 bg-[#16233F] text-[#C6A455] flex items-center justify-center font-serif text-[11px] font-semibold shrink-0">
                          {supp.initials}
                        </div>
                        <div>
                          <div className="font-medium text-[#16233F]">{supp.name}</div>
                          <div className="text-[11px] text-[#86847A]">{supp.role}</div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}

                {/* Direct Enquiry Button */}
                <div className="mt-8 pt-4">
                  <a
                    href="/contact"
                    className="group relative flex items-center justify-center w-full h-[46px] bg-[#16233F] text-[#FDFCF8] text-[13px] uppercase tracking-[0.08em] font-medium transition-colors hover:bg-[#7A2142] focus-visible:outline-2 focus-visible:outline-[#16233F]"
                  >
                    <span className="text-roll">
                      <span className="text-roll-stack">
                        <span>Consult on this practice</span>
                        <span>Consult on this practice</span>
                      </span>
                    </span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 3. CORE FOCUS AREAS & SUB-DISCIPLINES */}
      <section className="py-20 md:py-28 border-b border-[#1A1815]/10 bg-[#FDFCF8]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <div className="mb-14 md:mb-18">
            <div className="flex items-center gap-2 mb-4 text-[12px] uppercase tracking-[0.2em] font-medium text-[#7A2142]">
              <span className="inline-block w-2 h-2 bg-[#C6A455] rotate-45" />
              <span>Scope of counsel</span>
            </div>
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.15] text-[#16233F]">
              Core Capabilities &amp; Focus Areas
            </h2>
            <p className="text-[16px] text-[#5F5D55] max-w-2xl mt-4">
              Comprehensive advisory across statutory compliance, commercial structuring and regulatory interfaces.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {practice.focusAreas.map((focus, idx) => (
              <div
                key={idx}
                className="bg-[#F6F3EC]/70 border border-[#1A1815]/10 p-8 sm:p-10 flex flex-col justify-between hover:border-[#16233F]/30 transition-colors"
              >
                <div>
                  <div className="flex items-center justify-between mb-5">
                    <span className="text-[12px] font-mono text-[#7A2142] font-semibold tracking-wider">
                      {(idx + 1).toString().padStart(2, '0')} // FOCUS
                    </span>
                    <span className="w-1.5 h-1.5 bg-[#C6A455] rotate-45" />
                  </div>
                  <h3 className="font-serif text-[22px] sm:text-[25px] font-semibold text-[#16233F] leading-snug mb-4">
                    {focus.title}
                  </h3>
                  <p className="text-[15px] leading-[1.7] text-[#5F5D55] mb-6">
                    {focus.description}
                  </p>
                </div>

                {focus.points && focus.points.length > 0 && (
                  <ul className="space-y-2.5 pt-5 border-t border-[#1A1815]/10 text-[13px] text-[#1A1815]">
                    {focus.points.map((pt, pIdx) => (
                      <li key={pIdx} className="flex items-start gap-2.5">
                        <span className="inline-block w-1.5 h-1.5 bg-[#C6A455] rounded-none mt-2 shrink-0" />
                        <span className="leading-snug">{pt}</span>
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* 4. METHODOLOGY & WORKING APPROACH (Drawn method line) */}
      <section className="py-20 md:py-28 border-b border-[#1A1815]/10 bg-[#F6F3EC]/50">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <div className="mb-14 md:mb-18">
            <div className="flex items-center gap-2 mb-4 text-[12px] uppercase tracking-[0.2em] font-medium text-[#7A2142]">
              <span className="inline-block w-2 h-2 bg-[#C6A455] rotate-45" />
              <span>Advisory methodology</span>
            </div>
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[50px] leading-[1.15] text-[#16233F]">
              Our Approach &amp; Working Method
            </h2>
            <p className="text-[16px] text-[#5F5D55] max-w-2xl mt-4">
              Structured stages ensuring statutory grounding, commercial speed, and durable execution.
            </p>
          </div>

          {/* Drawn Method Line Container */}
          <div className="relative">
            {/* Architectural connecting line on desktop */}
            <div className="hidden md:block absolute top-[28px] left-[60px] right-[60px] h-[1px] bg-[#1A1815]/15 z-0" />

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-10 relative z-10">
              {practice.methodology.map((m, mIdx) => (
                <div key={mIdx} className="bg-[#FDFCF8] border border-[#1A1815]/10 p-8 sm:p-10 flex flex-col">
                  <div className="flex items-center gap-4 mb-6">
                    <div className="w-14 h-14 bg-[#16233F] text-[#C6A455] font-serif text-[18px] font-semibold flex items-center justify-center shrink-0 border border-[#C6A455]/40 shadow-sm">
                      {m.number}
                    </div>
                    <div>
                      <span className="text-[11px] uppercase tracking-[0.18em] text-[#7A2142] font-semibold block">
                        Phase {m.number}
                      </span>
                      <span className="text-[12px] text-[#86847A]">Procedural Milestone</span>
                    </div>
                  </div>

                  <h3 className="font-serif text-[22px] font-semibold text-[#16233F] mb-3">
                    {m.title}
                  </h3>
                  <p className="text-[14px] sm:text-[15px] leading-[1.7] text-[#5F5D55]">
                    {m.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* 5. REPRESENTATIVE ADVISORY SCOPE (LSK Compliant - No client names) */}
      <section className="py-20 md:py-28 border-b border-[#1A1815]/10 bg-[#FDFCF8]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-start">
            <div className="lg:col-span-5">
              <div className="flex items-center gap-2 mb-4 text-[12px] uppercase tracking-[0.2em] font-medium text-[#7A2142]">
                <span className="inline-block w-2 h-2 bg-[#C6A455] rotate-45" />
                <span>Representative experience</span>
              </div>
              <h2 className="font-serif text-[34px] sm:text-[44px] leading-[1.15] text-[#16233F] mb-6">
                Illustrative Transaction &amp; Advisory Scope
              </h2>
              <p className="text-[15px] sm:text-[16px] leading-[1.7] text-[#5F5D55] mb-6">
                In adherence to the Advocates (Marketing and Advertisement) Rules 2014, client identities remain strictly confidential. The following matters demonstrate the depth and breadth of our counsel.
              </p>
              <div className="p-5 bg-[#F6F3EC] border-l-2 border-[#16233F] text-[13px] text-[#5F5D55] leading-relaxed">
                Law Society of Kenya compliance notice: All matter summaries are anonymized and formulated to reflect substantive jurisprudence and commercial scope.
              </div>
            </div>

            <div className="lg:col-span-7">
              <div className="border-t border-[#1A1815]/10 divide-y divide-[#1A1815]/10">
                {practice.advisoryScope.map((scopeItem, sIdx) => (
                  <div key={sIdx} className="py-6 sm:py-7 flex items-start gap-5 group">
                    <span className="font-mono text-[13px] text-[#7A2142] font-semibold shrink-0 pt-0.5">
                      {(sIdx + 1).toString().padStart(2, '0')}.
                    </span>
                    <p className="text-[15px] sm:text-[16px] leading-[1.65] text-[#1A1815]">
                      {scopeItem}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* 6. RELATED INSIGHTS SECTION (Hidden if no matching articles) */}
      {relatedInsights.length > 0 && (
        <section className="py-20 md:py-28 border-b border-[#1A1815]/10 bg-[#F6F3EC]/40">
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-12 sm:mb-16 gap-4">
              <div>
                <div className="flex items-center gap-2 mb-3 text-[12px] uppercase tracking-[0.2em] font-medium text-[#7A2142]">
                  <span className="inline-block w-2 h-2 bg-[#C6A455] rotate-45" />
                  <span>Practice analysis</span>
                </div>
                <h2 className="font-serif text-[32px] sm:text-[42px] text-[#16233F]">
                  Related Insights &amp; Publications
                </h2>
              </div>
              <a
                href="/insights"
                className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.1em] font-semibold text-[#16233F] hover:text-[#7A2142] transition-colors"
              >
                <span>View all insights</span>
                <ArrowRight size={14} />
              </a>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {relatedInsights.slice(0, 3).map((item) => (
                <div
                  key={item.id}
                  onClick={() => onSelectInsight(item)}
                  className="bg-[#FDFCF8] border border-[#1A1815]/10 p-7 flex flex-col justify-between cursor-pointer hover:border-[#16233F] transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between text-[11px] text-[#86847A] mb-4 pb-3 border-b border-[#1A1815]/10">
                      <span className="uppercase tracking-[0.12em] font-medium text-[#7A2142]">
                        {item.category}
                      </span>
                      {item.readTimeMinutes && (
                        <span className="flex items-center gap-1">
                          <Clock size={12} />
                          <span>{item.readTimeMinutes} min</span>
                        </span>
                      )}
                    </div>

                    <h3 className="font-serif text-[20px] font-semibold text-[#16233F] group-hover:text-[#7A2142] transition-colors leading-snug mb-3 line-clamp-2">
                      {item.title}
                    </h3>
                    <p className="text-[14px] text-[#5F5D55] leading-relaxed line-clamp-3 mb-6">
                      {item.excerpt}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-[#1A1815]/10 flex items-center justify-between text-[12px] text-[#86847A]">
                    <span>{item.displayDate}</span>
                    <span className="font-medium text-[#16233F] group-hover:text-[#7A2142] inline-flex items-center gap-1">
                      Read analysis <ArrowUpRight size={13} />
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* 7. PREVIOUS / NEXT PRACTICE NAVIGATION (Wraps gracefully) */}
      <nav aria-label="Adjacent practice areas navigation" className="py-14 sm:py-16 border-b border-[#1A1815]/10 bg-[#FDFCF8]">
        <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
          <div className="flex flex-col sm:flex-row items-stretch justify-between gap-6 sm:gap-8">
            {/* Previous Practice Area */}
            <button
              type="button"
              onClick={() => onSelectPractice(prevPractice.slug)}
              className="group flex-1 text-left p-6 sm:p-7 border border-[#1A1815]/10 hover:border-[#16233F] hover:bg-[#F6F3EC]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#86847A] group-hover:text-[#7A2142] mb-3">
                  <ArrowLeft size={13} />
                  <span>Previous practice</span>
                </span>
                <div className="text-[12px] font-mono text-[#C6A455] font-semibold mb-1">
                  {prevPractice.number}
                </div>
                <h4 className="font-serif text-[20px] sm:text-[23px] text-[#16233F] font-semibold leading-snug">
                  {prevPractice.name}
                </h4>
              </div>
            </button>

            {/* Next Practice Area */}
            <button
              type="button"
              onClick={() => onSelectPractice(nextPractice.slug)}
              className="group flex-1 text-left sm:text-right p-6 sm:p-7 border border-[#1A1815]/10 hover:border-[#16233F] hover:bg-[#F6F3EC]/50 transition-all flex flex-col justify-between"
            >
              <div>
                <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] text-[#86847A] group-hover:text-[#7A2142] mb-3 sm:justify-end">
                  <span>Next practice</span>
                  <ArrowRight size={13} />
                </span>
                <div className="text-[12px] font-mono text-[#C6A455] font-semibold mb-1">
                  {nextPractice.number}
                </div>
                <h4 className="font-serif text-[20px] sm:text-[23px] text-[#16233F] font-semibold leading-snug">
                  {nextPractice.name}
                </h4>
              </div>
            </button>
          </div>
        </div>
      </nav>

      {/* 8. SHARED CTA */}
      <SharedCta headline="Have a matter to discuss?" />
    </article>
  );
};
