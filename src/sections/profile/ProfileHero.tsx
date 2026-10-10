import React from 'react';
import { ChevronRight, Mail, Phone, MapPin, ArrowUpRight } from 'lucide-react';
import { Person, site } from '../../content/site';
import { SectionLabel } from '../../components/SectionLabel';
import { Reveal } from '../../components/Reveal';
import { SplitLines } from '../../components/SplitLines';

interface ProfileHeroProps {
  person: Person;
  onNavigateTeam?: () => void;
  onNavigateHome?: () => void;
}

export const ProfileHero: React.FC<ProfileHeroProps> = ({
  person,
  onNavigateTeam,
  onNavigateHome,
}) => {
  return (
    <section className="bg-[var(--paper)] text-[var(--ink)] pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-20 lg:pb-24">
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
              <li>
                <a
                  href="/our-team"
                  onClick={(e) => {
                    if (onNavigateTeam) {
                      e.preventDefault();
                      onNavigateTeam();
                    }
                  }}
                  className="hover:text-[var(--navy)] transition-colors focus-visible:outline-2 focus-visible:outline-[var(--navy)]"
                >
                  Our team
                </a>
              </li>
              <li aria-hidden="true" className="text-[var(--warm-gray)]">
                <ChevronRight size={13} />
              </li>
              <li className="text-[var(--navy)] font-semibold" aria-current="page">
                {person.name}
              </li>
            </ol>
          </nav>
        </Reveal>

        {/* Profile Grid: Left 8 cols identity & context, Right 4 cols portrait & contact card */}
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-6 gap-y-12 items-start">
          <div className="col-span-4 md:col-span-8 lg:col-span-8 space-y-6">
            <Reveal delay={0.1} y={12}>
              <SectionLabel variant="eyebrow" label="Partner profile" />
            </Reveal>

            <SplitLines delay={0.15}>
              <h1 className="font-serif text-[40px] leading-[46px] md:text-[56px] md:leading-[62px] lg:text-[72px] lg:leading-[78px] text-[var(--navy)] font-normal tracking-tight">
                {person.name}
              </h1>
            </SplitLines>

            <Reveal delay={0.2} y={14}>
              <div className="inline-block border-l-2 border-[var(--burgundy)] pl-4 py-1">
                <p className="text-[14px] sm:text-[15px] uppercase tracking-[0.16em] text-[var(--burgundy)] font-semibold">
                  {person.title}
                </p>
                <p className="text-[13px] text-[var(--muted-text)] mt-1">
                  Mundui, Murai &amp; Mwaniki Advocates LLP
                </p>
              </div>
            </Reveal>

            <Reveal delay={0.25} y={16}>
              <div className="pt-6 border-t border-[var(--warm-gray)]/30 max-w-[640px]">
                <p className="text-[17px] sm:text-[19px] leading-[28px] sm:leading-[32px] text-[var(--ink)] font-normal">
                  Advising domestic and international clients on high-value commercial mandates, regulatory compliance, and strategic dispute resolution under Kenyan law.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right 4 cols: Typographic Initials Portrait & Contact Card */}
          <div className="col-span-4 md:col-span-8 lg:col-span-4 lg:pl-4">
            <Reveal delay={0.2} y={16}>
              <div className="bg-[var(--paper-alt)] border border-[var(--warm-gray)]/40 p-6 sm:p-8">
                {/* 3:4 Typographic Portrait with Initials */}
                <div
                  className="relative aspect-[3/4] w-full bg-[var(--navy)] overflow-hidden border border-[#1A1815]/10 flex flex-col items-center justify-between p-6 sm:p-8 mb-6"
                  role="img"
                  aria-label={`Initials portrait for ${person.name}`}
                >
                  <div className="w-full flex items-center justify-between text-[#FDFCF8]/40">
                    <span className="text-[11px] uppercase tracking-[0.2em] font-mono">
                      Partner
                    </span>
                    <span className="w-1.5 h-1.5 rotate-45 bg-[var(--gold)]" aria-hidden="true" />
                  </div>

                  <div className="text-center py-4">
                    <div className="font-serif text-[52px] sm:text-[60px] text-[var(--gold)] tracking-wide font-normal select-none">
                      {person.initials}
                    </div>
                    <div className="mt-1 text-[11px] uppercase tracking-[0.2em] text-[#FDFCF8]/60 font-medium">
                      MMM Advocates
                    </div>
                  </div>

                  <div className="w-full text-center pt-3 border-t border-[#FDFCF8]/10 text-[#FDFCF8]/80 text-[12px] uppercase tracking-[0.14em]">
                    Nairobi, Kenya
                  </div>
                </div>

                {/* Identity & Direct Contacts */}
                <div className="border-b border-[var(--warm-gray)]/30 pb-4 mb-4">
                  <h2 className="font-serif text-[20px] font-semibold text-[var(--navy)]">
                    {person.name}
                  </h2>
                  <p className="text-[12px] uppercase tracking-[0.14em] text-[var(--burgundy)] font-medium mt-0.5">
                    {person.title}
                  </p>
                </div>

                <div className="space-y-2.5 text-[13px] text-[var(--muted-text)] pb-6 border-b border-[var(--warm-gray)]/30">
                  <a
                    href="mailto:contact@mmmadvocatesllp.com"
                    className="flex items-center gap-3 hover:text-[var(--navy)] transition-colors py-1 group"
                  >
                    <Mail size={15} className="text-[var(--gold)] shrink-0" />
                    <span className="truncate group-hover:underline">contact@mmmadvocatesllp.com</span>
                  </a>
                  <a
                    href={`tel:${site.address.phone.replace(/\s+/g, '')}`}
                    className="flex items-center gap-3 hover:text-[var(--navy)] transition-colors py-1 group"
                  >
                    <Phone size={15} className="text-[var(--gold)] shrink-0" />
                    <span className="group-hover:underline">{site.address.phone}</span>
                  </a>
                  <div className="flex items-start gap-3 py-1">
                    <MapPin size={15} className="text-[var(--gold)] shrink-0 mt-0.5" />
                    <span className="text-[12px] leading-relaxed">
                      {site.address.line1}, {site.address.line2}
                    </span>
                  </div>
                </div>

                <div className="mt-6">
                  <a
                    href="/contact"
                    className="group relative flex items-center justify-center h-[44px] w-full bg-[var(--gold)] text-[var(--navy)] text-[12px] uppercase tracking-[0.1em] font-semibold transition-all hover:bg-[#d6b465] focus-visible:outline-2 focus-visible:outline-[var(--navy)]"
                  >
                    <span className="mr-2">Start an enquiry</span>
                    <ArrowUpRight
                      size={14}
                      className="transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5"
                      aria-hidden="true"
                    />
                  </a>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileHero;
