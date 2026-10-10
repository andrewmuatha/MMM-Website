import React from 'react';
import { ArrowUpRight } from 'lucide-react';
import { Person, site, Partner } from '../../content/site';
import { SectionLabel } from '../../components/SectionLabel';
import { Reveal } from '../../components/Reveal';

interface ProfileOthersProps {
  person: Person;
  onSelectPartner?: (slug: string) => void;
}

export const ProfileOthers: React.FC<ProfileOthersProps> = ({
  person,
  onSelectPartner,
}) => {
  // Filter out the current partner to show other members of the partnership
  const otherPartners = site.team.partners.filter((p: Partner) => p.slug !== person.slug);

  if (otherPartners.length === 0) {
    return null;
  }

  return (
    <section
      className="bg-[var(--paper-alt)] py-20 sm:py-24 lg:py-28 border-t border-[var(--warm-gray)]/30"
      aria-labelledby="profile-others-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        {/* Eyebrow: re-flows to "01 // Our team" today */}
        <div className="flex items-center justify-between pb-6 mb-10 border-b border-[var(--warm-gray)]/30">
          <SectionLabel variant="numbered" number="01" label="Our team" />
          <span className="text-[12px] uppercase tracking-[0.14em] text-[var(--muted-text)] font-mono">
            Partnership
          </span>
        </div>

        {/* Other Partners Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10 max-w-[880px]">
          {otherPartners.map((other: Partner, index: number) => {
            const handleCardClick = (e: React.MouseEvent) => {
              if (onSelectPartner) {
                e.preventDefault();
                onSelectPartner(other.slug);
              }
            };

            return (
              <Reveal key={other.slug} delay={0.1 + index * 0.1} y={16}>
                <a
                  href={`/our-team/${other.slug}`}
                  onClick={handleCardClick}
                  className="group flex flex-col h-full bg-[var(--paper)] p-6 sm:p-8 border border-[var(--warm-gray)]/30 hover:border-[var(--gold)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--navy)]"
                  aria-label={`${other.name}, ${other.title}`}
                >
                  {/* Portrait Block (Typographic Fallback, 3:4 Aspect Ratio) */}
                  <div className="relative aspect-[3/4] w-full bg-[var(--navy)] overflow-hidden border border-[#1A1815]/10 flex flex-col items-center justify-between p-6 sm:p-8 mb-6 transition-transform duration-300 group-hover:-translate-y-1">
                    <div className="w-full flex items-center justify-between text-[#FDFCF8]/40">
                      <span className="text-[11px] uppercase tracking-[0.2em] font-mono">
                        Partner
                      </span>
                      <span className="w-1.5 h-1.5 rotate-45 bg-[var(--gold)]" aria-hidden="true" />
                    </div>

                    <div className="text-center py-4">
                      <div className="font-serif text-[44px] sm:text-[52px] text-[var(--gold)] tracking-wide font-normal select-none">
                        {other.initials}
                      </div>
                      <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#FDFCF8]/60 font-medium">
                        MMM Advocates
                      </div>
                    </div>

                    <div className="w-full flex items-center justify-between pt-3 border-t border-[#FDFCF8]/10 text-[#FDFCF8]/70 text-[11px] uppercase tracking-[0.14em]">
                      <span>View profile</span>
                      <ArrowUpRight
                        size={14}
                        className="text-[var(--gold)] transition-transform duration-300 group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                        aria-hidden="true"
                      />
                    </div>
                  </div>

                  {/* Other Partner Info */}
                  <div className="flex flex-col justify-between flex-grow">
                    <div>
                      <h3 className="font-serif text-[22px] sm:text-[24px] text-[var(--navy)] group-hover:text-[var(--burgundy)] transition-colors">
                        {other.name}
                      </h3>
                      <p className="text-[13px] uppercase tracking-[0.14em] text-[var(--muted-text)] font-semibold mt-1">
                        {other.title}
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

export default ProfileOthers;
