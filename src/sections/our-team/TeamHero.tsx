import React from 'react';
import { ChevronRight } from 'lucide-react';
import { site } from '../../content/site';
import { SectionLabel } from '../../components/SectionLabel';
import { Reveal } from '../../components/Reveal';
import { SplitLines } from '../../components/SplitLines';

interface TeamHeroProps {
  onNavigateHome?: () => void;
}

export const TeamHero: React.FC<TeamHeroProps> = ({ onNavigateHome }) => {
  const { hero } = site.team;
  const isBodySupplied =
    Boolean(hero.body) &&
    hero.body?.trim() !== '' &&
    hero.body !== 'FROM_REFERENCE';

  return (
    <section
      className="bg-[var(--paper)] pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24 transition-colors"
      aria-labelledby="team-hero-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        {/* Breadcrumb Navigation */}
        <Reveal delay={0.05} y={10}>
          <nav aria-label="Breadcrumb" className="mb-8 lg:mb-10">
            <ol className="flex items-center flex-wrap gap-2 text-[12px] sm:text-[13px] text-[var(--muted-text)]">
              <li>
                <a
                  href="/"
                  onClick={(e) => {
                    if (onNavigateHome) {
                      e.preventDefault();
                      onNavigateHome();
                    }
                  }}
                  className="hover:text-[var(--navy)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--navy)]"
                >
                  Home
                </a>
              </li>
              <li aria-hidden="true" className="text-[var(--warm-gray)]">
                <ChevronRight size={13} />
              </li>
              <li
                className="text-[var(--navy)] font-semibold"
                aria-current="page"
              >
                Our team
              </li>
            </ol>
          </nav>
        </Reveal>

        {/* Hero Eyebrow */}
        <Reveal delay={0.1} y={12} className="mb-4 sm:mb-6">
          <SectionLabel variant="eyebrow" label={hero.eyebrow} />
        </Reveal>

        {/* Grid: 12 cols desktop (1440 & 1024), 8 cols tablet (768-1023), 4 cols mobile */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-4 md:gap-x-6 lg:gap-x-6 items-start">
          {/* H1 Heading: cols 1-8 */}
          <div className="col-span-4 md:col-span-8 lg:col-span-8">
            <SplitLines delay={0.15}>
              <h1
                id="team-hero-heading"
                className="font-serif text-[40px] leading-[46px] md:text-[56px] md:leading-[62px] lg:text-[72px] lg:leading-[78px] text-[var(--navy)] tracking-tight font-normal"
              >
                {hero.heading}
              </h1>
            </SplitLines>
          </div>

          {/* Supporting Paragraph:
              - Desktop (1024+): cols 9-12, aligned with top of heading
              - Tablet (768-1023): cols 1-6 stacked below H1 with 32px gap
              - Mobile (<768): 4 cols stacked with 24px gap
              - Hidden if FROM_REFERENCE or not supplied
          */}
          {isBodySupplied && (
            <div className="col-span-4 md:col-span-6 lg:col-span-4 mt-6 md:mt-8 lg:mt-0 pt-0 lg:pt-2">
              <Reveal delay={0.25} y={16}>
                <p className="text-[var(--ink)] text-[18px] leading-[28px] md:text-[19px] md:leading-[30px] lg:text-[20px] lg:leading-[32px] font-normal">
                  {hero.body}
                </p>
              </Reveal>
            </div>
          )}
        </div>

        {/* Bottom Rule: 1px warm-gray across all 12 columns, flush to padding-bottom */}
        <Reveal delay={0.3} y={8}>
          <div
            className="mt-14 sm:mt-18 lg:mt-20 w-full h-[1px] bg-[var(--warm-gray)]"
            aria-hidden="true"
          />
        </Reveal>
      </div>
    </section>
  );
};
