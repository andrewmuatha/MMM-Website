import React from 'react';
import { SectionLabel } from '../../components/SectionLabel';
import { Reveal } from '../../components/Reveal';
import { SplitLines } from '../../components/SplitLines';

export const PhilosophyBand: React.FC = () => {
  return (
    <section
      className="bg-[var(--navy)] text-[var(--paper)] py-20 sm:py-24 lg:py-28"
      aria-labelledby="philosophy-band-heading"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-x-6 gap-y-10 items-center">
          {/* Left Column (Desktop 6 cols, Tablet 8 cols, Mobile 4 cols): Eyebrow & H2 Heading */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 space-y-6">
            <Reveal delay={0.05} y={10}>
              <SectionLabel
                variant="numbered"
                number="02"
                label="Senior counsel"
                dark={true}
              />
            </Reveal>

            <SplitLines delay={0.15}>
              <h2
                id="philosophy-band-heading"
                className="font-serif text-[34px] leading-[40px] sm:text-[44px] sm:leading-[50px] lg:text-[52px] lg:leading-[58px] text-[var(--paper)] font-normal tracking-tight"
              >
                Experience is more than a title.
              </h2>
            </SplitLines>
          </div>

          {/* Right Column (Desktop 6 cols, Tablet 8 cols, Mobile 4 cols): Narrative */}
          <div className="col-span-4 md:col-span-8 lg:col-span-6 lg:pl-6">
            <Reveal delay={0.25} y={16}>
              <div className="space-y-5 border-l border-[var(--gold)]/40 pl-6 sm:pl-8">
                <p className="text-[18px] leading-[30px] sm:text-[19px] sm:leading-[32px] lg:text-[20px] lg:leading-[34px] text-[var(--paper)]/90 font-normal">
                  Legal counsel at MMM Advocates is delivered directly by experienced practitioners who remain actively engaged throughout each mandate, ensuring decisive guidance and personal accountability.
                </p>
                <p className="text-[15px] leading-[26px] sm:text-[16px] sm:leading-[28px] text-[var(--paper)]/75 font-normal">
                  Our practice structure ensures partners handle substantive matters personally, providing direct access and strategic insight from inception to resolution.
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
};
