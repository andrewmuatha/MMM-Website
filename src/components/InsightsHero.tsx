import React from 'react';

export const InsightsHero: React.FC = () => {
  return (
    <section
      className="bg-[#FDFCF8] pt-8 sm:pt-12 lg:pt-16 pb-14 sm:pb-14 lg:pb-[72px] transition-all"
      aria-label="Insights Introduction"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-8 lg:gap-6">
          {/* Eyebrow & Heading: cols 1 to 8 on 1440 (tablet cols 1 to 7) */}
          <div className="lg:col-span-8 md:col-span-7 space-y-5">
            {/* Eyebrow: "Insights" flanked by two 6px gold diamonds from the mark with 12px gaps */}
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>Insights</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            </div>

            {/* H1: "Commercial thinking, clearly considered." Display serif 72/78 desktop, 56/62 tablet, 40/46 mobile */}
            <h1 className="font-serif text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.08] text-[#16233F] tracking-tight">
              Commercial thinking,
              <br />
              clearly considered.
            </h1>
          </div>

          {/* Intro Paragraph: cols 1 to 6 on 1440 (positioned below or on side) */}
          <div className="lg:col-span-6 md:col-span-7 pt-2 lg:pt-4">
            <p className="text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.6] text-[#5F5D55]">
              Legal updates, client alerts and considered commentary from MMM Advocates on the
              matters that shape business, institutions and property in Kenya.
            </p>
          </div>
        </div>

        {/* Bottom: 1px Ink Charcoal 12% rule across cols 1 to 12 */}
        <div className="mt-12 sm:mt-14 lg:mt-16 w-full h-[1px] bg-[#1A1815]/12 transition-all duration-900" />
      </div>
    </section>
  );
};
