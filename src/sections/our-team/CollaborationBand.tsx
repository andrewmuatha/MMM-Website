import React from 'react';
import { SectionLabel } from '../../components/SectionLabel';
import { Reveal } from '../../components/Reveal';
import { SplitLines } from '../../components/SplitLines';

export const CollaborationBand: React.FC = () => {
  return (
    <section
      className="bg-[var(--paper-alt)] py-20 sm:py-24 lg:py-28 border-t border-[var(--warm-gray)]/30"
      aria-labelledby="collaboration-band-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-6 gap-y-12 items-center">
          {/* Left Column (Desktop 6 cols, Tablet 8 cols, Mobile 4 cols): Narrative */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 space-y-6">
            <Reveal delay={0.05} y={10}>
              <SectionLabel
                variant="numbered"
                number="04"
                label="Collaboration"
              />
            </Reveal>

            <SplitLines delay={0.12}>
              <h2
                id="collaboration-band-heading"
                className="font-serif text-[34px] leading-[40px] sm:text-[44px] sm:leading-[50px] lg:text-[52px] lg:leading-[58px] text-[var(--navy)] font-normal tracking-tight"
              >
                Counsel is a collaborative discipline.
              </h2>
            </SplitLines>

            <Reveal delay={0.2} y={14}>
              <div className="space-y-5 text-[var(--ink)]">
                <p className="text-[17px] sm:text-[19px] lg:text-[20px] leading-[28px] sm:leading-[30px] lg:leading-[32px] font-normal">
                  Our partners work collaboratively across practice disciplines, bringing together transactional insight and dispute resolution experience to address complex matters cohesively.
                </p>
                <p className="text-[15px] sm:text-[16px] leading-[24px] sm:leading-[26px] text-[var(--muted-text)] font-normal">
                  Whether structuring a cross-border corporate transaction or resolving multi-party commercial disputes, our clients benefit from unified counsel combining regulatory depth and procedural acumen.
                </p>
              </div>
            </Reveal>
          </div>

          {/* Right Column (Desktop 6 cols, Tablet 8 cols, Mobile 4 cols):
              Architectural collaboration panel adhering strictly to missing-image guidelines:
              "If a file is missing, render a flat --paper-alt block with the filename in small text so it is obvious."
          */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:pl-6">
            <Reveal delay={0.25} y={16}>
              <div
                className="relative aspect-[4/3] w-full bg-[var(--paper)] border border-[var(--warm-gray)]/40 p-8 sm:p-10 flex flex-col justify-between"
                role="img"
                aria-label="Collaboration discipline diagram"
              >
                {/* Header within architectural panel */}
                <div className="flex items-center justify-between border-b border-[var(--warm-gray)]/30 pb-4 text-[11px] uppercase tracking-[0.16em] text-[var(--muted-text)]">
                  <span>Mundui, Murai &amp; Mwaniki</span>
                  <span className="font-mono">Cohesive Practice</span>
                </div>

                {/* Central interlocking framework diagram */}
                <div className="my-auto py-6">
                  <div className="grid grid-cols-3 gap-3 text-center">
                    <div className="p-3 bg-[var(--paper-alt)] border border-[var(--warm-gray)]/20">
                      <div className="w-1.5 h-1.5 rotate-45 bg-[var(--gold)] mx-auto mb-2" aria-hidden="true" />
                      <div className="font-serif text-[15px] text-[var(--navy)] font-medium">Corporate</div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted-text)] mt-1">Transaction</div>
                    </div>
                    <div className="p-3 bg-[var(--navy)] text-[var(--paper)] border border-[var(--navy)]">
                      <div className="w-1.5 h-1.5 rotate-45 bg-[var(--gold)] mx-auto mb-2" aria-hidden="true" />
                      <div className="font-serif text-[15px] text-[var(--gold)] font-medium">Real Estate</div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--paper)]/70 mt-1">Finance</div>
                    </div>
                    <div className="p-3 bg-[var(--paper-alt)] border border-[var(--warm-gray)]/20">
                      <div className="w-1.5 h-1.5 rotate-45 bg-[var(--gold)] mx-auto mb-2" aria-hidden="true" />
                      <div className="font-serif text-[15px] text-[var(--navy)] font-medium">Disputes</div>
                      <div className="text-[10px] uppercase tracking-[0.14em] text-[var(--muted-text)] mt-1">Arbitration</div>
                    </div>
                  </div>
                </div>

                {/* Spec compliance note in small text */}
                <div className="flex items-center justify-between pt-4 border-t border-[var(--warm-gray)]/30 text-[11px] text-[var(--muted-text)] font-mono">
                  <span>collaboration-discipline.jpg</span>
                  <span>Integrated counsel</span>
                </div>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
