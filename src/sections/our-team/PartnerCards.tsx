import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { site, Partner } from '../../content/site';
import { SectionLabel } from '../../components/SectionLabel';
import { Reveal } from '../../components/Reveal';

interface PartnerCardsProps {
  onSelectPartner?: (slug: string) => void;
}

export const PartnerCards: React.FC<PartnerCardsProps> = ({ onSelectPartner }) => {
  const { partners } = site.team;

  return (
    <section
      className="bg-[var(--paper)] pb-20 sm:pb-24 lg:pb-28"
      aria-labelledby="partner-cards-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        {/* Section Header / Eyebrow */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-[var(--warm-gray)]/30">
          <SectionLabel variant="numbered" number="01" label="Partners" />
          <span className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted-text)] font-mono">
            {String(partners.length).padStart(2, '0')} Partners
          </span>
        </div>

        {/* 3 Partner Cards Grid: 12 columns desktop (4 cols each), tablet 2-then-1, mobile 1 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 lg:gap-8 xl:gap-10">
          {partners.map((partner: Partner, index: number) => {
            const handleCardClick = (e: React.MouseEvent) => {
              if (onSelectPartner) {
                e.preventDefault();
                onSelectPartner(partner.slug);
              }
            };

            return (
              <Reveal key={partner.slug} delay={0.1 + index * 0.1} y={16}>
                <a
                  href={`/our-team/${partner.slug}`}
                  onClick={handleCardClick}
                  className="group flex flex-col h-full bg-[var(--paper)] focus-visible:outline-2 focus-visible:outline-[var(--navy)] focus-visible:outline-offset-4"
                  aria-label={`${partner.name}, ${partner.title}`}
                >
                  {/* Portrait Block (Typographic Fallback, 3:4 Aspect Ratio) */}
                  <div className="relative aspect-[3/4] w-full bg-[var(--navy)] overflow-hidden border border-[#1A1815]/10 flex flex-col items-center justify-between p-8 sm:p-10 transition-transform duration-300 group-hover:-translate-y-1">
                    {/* Top Corner Architectural Monogram Accent */}
                    <div className="w-full flex items-center justify-between text-[#FDFCF8]/40">
                      <span className="text-[11px] uppercase tracking-[0.2em] font-mono">
                        {String(index + 1).padStart(2, '0')}
                      </span>
                      <span className="w-1.5 h-1.5 rotate-45 bg-[var(--gold)]" aria-hidden="true" />
                    </div>

                    {/* Centre Initials in EB Garamond Serif */}
                    <div className="text-center py-6">
                      <div className="font-serif text-[48px] sm:text-[56px] lg:text-[64px] text-[var(--gold)] tracking-wide font-normal select-none">
                        {partner.initials}
                      </div>
                      <div className="mt-2 text-[11px] uppercase tracking-[0.2em] text-[#FDFCF8]/60 font-medium">
                        MMM Advocates
                      </div>
                    </div>

                    {/* Bottom Status / Arrow indicator */}
                    <div className="w-full flex items-center justify-between pt-4 border-t border-[#FDFCF8]/10 text-[#FDFCF8]/70 text-[12px]">
                      <span className="uppercase tracking-[0.14em] text-[11px] text-[#FDFCF8]/80 font-medium">
                        View profile
                      </span>
                      <ArrowUpRight
                        size={16}
                        className="text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-1 group-hover:-translate-y-1"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Partner Details Below Portrait */}
                  <div className="pt-6 pb-2 flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-serif text-[24px] sm:text-[28px] lg:text-[30px] leading-[1.2] text-[var(--navy)] group-hover:text-[var(--burgundy)] transition-colors">
                        {partner.name}
                      </h3>
                      <p className="text-[13px] sm:text-[14px] uppercase tracking-[0.14em] text-[var(--muted-text)] font-semibold mt-2">
                        {partner.title}
                      </p>
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
