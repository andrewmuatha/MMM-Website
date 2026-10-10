import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site, Partner } from '../../content/site';
import { SectionLabel } from '../../components/SectionLabel';
import { Reveal } from '../../components/Reveal';

interface TeamDirectoryProps {
  onSelectPartner?: (slug: string) => void;
}

export const TeamDirectory: React.FC<TeamDirectoryProps> = ({ onSelectPartner }) => {
  const { partners } = site.team;

  // As per strict specification: empty groups (Associates, Administration) are hidden.
  // Only populated groups (Partners) render, maintaining pure truth-in-content.
  if (!partners || partners.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-[var(--paper)] py-20 sm:py-24 lg:py-28 border-t border-[var(--warm-gray)]/30"
      aria-labelledby="team-directory-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between pb-8 mb-4 border-b border-[var(--warm-gray)]">
          <div>
            <SectionLabel variant="numbered" number="03" label="Directory" className="mb-4" />
            <h2
              id="team-directory-heading"
              className="font-serif text-[32px] sm:text-[40px] lg:text-[48px] leading-[1.1] text-[var(--navy)] font-normal"
            >
              Practice leadership
            </h2>
          </div>
          <div className="mt-4 sm:mt-0 text-[13px] uppercase tracking-[0.14em] text-[var(--muted-text)] font-medium">
            Partnership roll
          </div>
        </div>

        {/* Partners Department Ruled Rows */}
        <div className="divide-y divide-[var(--warm-gray)]/40">
          {partners.map((partner: Partner, index: number) => {
            const handleRowClick = (e: React.MouseEvent) => {
              if (onSelectPartner) {
                e.preventDefault();
                onSelectPartner(partner.slug);
              }
            };

            return (
              <Reveal key={partner.slug} delay={0.08 * index} y={10}>
                <a
                  href={`/our-team/${partner.slug}`}
                  onClick={handleRowClick}
                  className="group flex flex-col sm:flex-row sm:items-center justify-between py-6 sm:py-7 px-2 hover:bg-[var(--paper-alt)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--navy)]"
                  aria-label={`View profile of ${partner.name}, ${partner.title}`}
                >
                  {/* Left: Department, Index & Partner Name */}
                  <div className="flex items-center gap-6 sm:gap-10">
                    <span className="text-[12px] uppercase tracking-[0.14em] font-mono text-[var(--muted-text)] w-6 shrink-0">
                      {String(index + 1).padStart(2, '0')}
                    </span>
                    <div>
                      <h3 className="font-serif text-[22px] sm:text-[26px] lg:text-[28px] text-[var(--navy)] group-hover:text-[var(--burgundy)] transition-colors font-normal">
                        {partner.name}
                      </h3>
                      <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted-text)] font-semibold mt-1">
                        {partner.title}
                      </p>
                    </div>
                  </div>

                  {/* Right: Department Tag & Action link */}
                  <div className="flex items-center justify-between sm:justify-end gap-6 mt-4 sm:mt-0 pl-12 sm:pl-0">
                    <span className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted-text)] font-medium hidden md:inline-block">
                      Mundui, Murai &amp; Mwaniki
                    </span>
                    <div className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.14em] font-semibold text-[var(--navy)] group-hover:text-[var(--burgundy)] transition-colors">
                      <span className="text-[12px]">View profile</span>
                      <ArrowUpRight
                        size={16}
                        className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>
                </a>
              </Reveal>
            );
          })}
        </div>
      </div>
    </section>
  );
};
