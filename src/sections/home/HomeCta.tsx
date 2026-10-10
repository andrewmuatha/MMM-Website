import React from 'react';
import { ArrowRight } from 'lucide-react';

interface HomeCtaProps {
  onNavigate?: (path: string) => void;
}

export const HomeCta: React.FC<HomeCtaProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full h-auto lg:h-[706px] bg-[#1D2941] text-[#FDFCF8] overflow-hidden py-16 lg:py-0 select-none"
      aria-label="Direct mandate engagement"
    >
      {/* Repeating Geometric Kuba Line Pattern Background */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: 'url(/brand/kuba-pattern.svg)',
          backgroundSize: '110px 110px',
          backgroundRepeat: 'repeat',
        }}
        aria-hidden="true"
      />

      {/* Full-width container with faint horizontal rules */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 h-full flex flex-col justify-between pt-[95px] pb-[50px]">
        {/* Top Header Block */}
        <div>
          {/* Label at y=95: Instrument Sans 11px, 600, letter-spacing 0.12em, #C6A455 */}
          <div className="text-[11px] font-semibold uppercase tracking-[0.12em] text-[#C6A455] font-['Instrument_Sans',sans-serif] mb-[30px]">
            06 // DIRECT MANDATE ENGAGEMENT
          </div>

          {/* Faint 1px horizontal rule at y=122 */}
          <div className="w-full h-[1px] bg-[#FDFCF8]/14 mb-[48px]" aria-hidden="true" />

          {/* H2 at top at y≈195: Newsreader 96px, -0.02em, #FDFCF8, one line */}
          <h2 className="font-['Newsreader',serif] text-[48px] sm:text-[72px] lg:text-[96px] leading-[1.05] font-normal tracking-[-0.02em] text-[#FDFCF8] max-w-4xl">
            Tell us what is at stake.
          </h2>
        </div>

        {/* Faint 1px horizontal rule at y=340 */}
        <div className="w-full h-[1px] bg-[#FDFCF8]/14 my-8 lg:my-0" aria-hidden="true" />

        {/* 3 Detail Columns at x=176, 571, 966 */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 lg:gap-12 pl-0 lg:pl-[112px]">
          {/* Column 1: TELEPHONE */}
          <div className="space-y-[12px] font-['Instrument_Sans',sans-serif]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C6A455]">
              TELEPHONE
            </div>
            <div>
              <a
                href="tel:+254713874830"
                className="text-[16px] text-[#FDFCF8] hover:text-[#C6A455] transition-colors"
              >
                +254 713 874 830
              </a>
            </div>
            <div className="text-[14px] text-[#FDFCF8]/85">
              Calls and enquiries
            </div>
          </div>

          {/* Column 2: ENQUIRIES */}
          <div className="space-y-[12px] font-['Instrument_Sans',sans-serif]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C6A455]">
              ENQUIRIES
            </div>
            <div>
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="text-[16px] text-[#FDFCF8] hover:text-[#C6A455] transition-colors underline decoration-1 underline-offset-4"
              >
                Send an enquiry
              </a>
            </div>
            <div className="text-[14px] text-[#FDFCF8]/85">
              Outline your matter using our enquiry form
            </div>
          </div>

          {/* Column 3: OFFICE */}
          <div className="space-y-[12px] font-['Instrument_Sans',sans-serif]">
            <div className="text-[11px] font-semibold uppercase tracking-[0.1em] text-[#C6A455]">
              OFFICE
            </div>
            <div className="text-[16px] text-[#FDFCF8]">
              Longonot Place, 7th Floor, Right Wing
            </div>
            <div className="text-[14px] text-[#FDFCF8]/85">
              Kijabe Street, Nairobi
            </div>
          </div>
        </div>

        {/* Faint 1px horizontal rule at y=538 */}
        <div className="w-full h-[1px] bg-[#FDFCF8]/14 my-8 lg:my-0" aria-hidden="true" />

        {/* Bottom Action Row: Buttons left, Firm identity right */}
        <div className="flex flex-col lg:flex-row items-start lg:items-center justify-between gap-6 pt-2">
          {/* Buttons: 212 x 48px, then 16px gap, then 262 x 48px */}
          <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-4">
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="inline-flex items-center justify-center w-full sm:w-[212px] h-[48px] border border-[#FDFCF8] text-[#FDFCF8] hover:bg-[#FDFCF8] hover:text-[#1D2941] text-[12px] font-semibold uppercase tracking-[0.1em] font-['Instrument_Sans',sans-serif] transition-colors rounded-none focus-visible:outline-2 focus-visible:outline-white"
            >
              <span>MAKE AN ENQUIRY</span>
              <span className="ml-2">→</span>
            </a>

            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="inline-flex items-center justify-center w-full sm:w-[262px] h-[48px] bg-[#C6A455] hover:bg-[#d8b76c] text-[#16233F] text-[12px] font-semibold uppercase tracking-[0.1em] font-['Instrument_Sans',sans-serif] transition-colors rounded-none focus-visible:outline-2 focus-visible:outline-[#C6A455]"
            >
              CONFIDENTIAL CONSULTATION
            </a>
          </div>

          {/* Right edge: MUNDUI, MURAI & MWANIKI ADVOCATES LLP · NAIROBI */}
          <div className="text-[11px] font-medium tracking-[0.1em] text-[#FDFCF8]/80 font-['Instrument_Sans',sans-serif]">
            MUNDUI, MURAI &amp; MWANIKI ADVOCATES LLP · NAIROBI
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeCta;
