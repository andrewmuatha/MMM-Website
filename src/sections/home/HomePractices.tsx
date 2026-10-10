import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HomePracticesProps {
  onNavigate?: (path: string) => void;
}

export const HomePractices: React.FC<HomePracticesProps> = ({ onNavigate }) => {
  const handleRowClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const practices = [
    {
      num: '01',
      title: 'TMT',
      desc: 'Technology, media and telecommunications in changing markets.',
      path: '/practice-areas/tmt',
      heightClass: 'min-h-[105px]',
    },
    {
      num: '02',
      title: 'Corporate & Commercial',
      desc: 'Corporate structuring, transactions and day-to-day commercial advice.',
      path: '/practice-areas/corporate-commercial',
      heightClass: 'min-h-[105px]',
    },
    {
      num: '03',
      title: 'Dispute Resolution',
      desc: 'Strategic management of commercial disputes and risk.',
      path: '/practice-areas/dispute-resolution',
      heightClass: 'min-h-[105px]',
    },
    {
      num: '04',
      title: 'Property',
      desc: 'Property transactions, development and asset management.',
      path: '/practice-areas/property',
      heightClass: 'min-h-[105px]',
    },
  ];

  return (
    <section
      className="w-full bg-[#FDFCF8] text-[#1A1815] pb-[30px]"
      aria-label="Our practice areas"
    >
      {/* Top Area: 223px tall */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-[75px] pb-[50px]">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* H2 "Our practices" at x=64 */}
          <div className="lg:col-span-8">
            <h2 className="font-['Newsreader',serif] text-[48px] sm:text-[60px] lg:text-[76px] leading-[1] font-normal tracking-[-0.02em] text-[#16233F]">
              Our practices
            </h2>
          </div>

          {/* Intro Paragraph at x=1072, 304px wide */}
          <div className="lg:col-span-4 lg:col-start-9 max-w-[304px]">
            <p className="font-['Newsreader',serif] text-[18px] leading-[31px] text-[#1A1815] [font-variation-settings:'opsz'_16]">
              Focused expertise for transactions, disputes, property and fast-moving
              regulated sectors.
            </p>
          </div>
        </div>
      </div>

      {/* Four Rows with Full-width (x 0 to 1440) 1px #86847A rules */}
      <div className="w-full">
        {practices.map((practice) => (
          <div key={practice.num} className="w-full border-t border-[#86847A]">
            <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
              <a
                href={practice.path}
                onClick={(e) => handleRowClick(e, practice.path)}
                className={`group flex flex-col md:flex-row items-start md:items-center py-6 md:py-0 ${practice.heightClass} transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]`}
              >
                {/* Number at x=64: Instrument Sans 11px */}
                <div className="w-[112px] shrink-0 text-[11px] font-semibold tracking-[0.08em] text-[#1A1815] font-['Instrument_Sans',sans-serif] mb-2 md:mb-0">
                  {practice.num}
                </div>

                {/* Title at x=176: Newsreader 32px */}
                <div className="w-full md:w-[448px] shrink-0 font-['Newsreader',serif] text-[26px] md:text-[32px] leading-[1.2] text-[#16233F] transition-transform duration-300 group-hover:translate-x-[6px] mb-2 md:mb-0">
                  {practice.title}
                </div>

                {/* Description at x=624: max width 520px */}
                <div className="w-full md:max-w-[520px] shrink-0 font-['Newsreader',serif] text-[16px] md:text-[18px] leading-[31px] text-[#1A1815] [font-variation-settings:'opsz'_16]">
                  {practice.desc}
                </div>

                {/* Arrow at right (~x=1360) */}
                <div className="hidden md:flex ml-auto items-center justify-end pl-4">
                  <ArrowRight
                    size={18}
                    className="text-[#16233F] transition-transform duration-300 group-hover:translate-x-[4px]"
                    aria-hidden="true"
                  />
                </div>
              </a>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default HomePractices;
