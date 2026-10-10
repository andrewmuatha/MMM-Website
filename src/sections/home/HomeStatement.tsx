import React from 'react';
import { ArrowRight } from 'lucide-react';
import { site } from '../../content/site';
import { ImageSlot } from '../../components/ImageSlot';

interface HomeStatementProps {
  onNavigate?: (path: string) => void;
}

export const HomeStatement: React.FC<HomeStatementProps> = ({ onNavigate }) => {
  const isFoundedVerified = site.firm?.founded?.verified === true;

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <section
      className="relative w-full h-auto lg:h-[497px] overflow-hidden text-[#FDFCF8]"
      style={{
        background: 'linear-gradient(90deg, #461326 0%, #4F1C2F 30%, #6A3448 100%)',
      }}
      aria-label="Firm statement"
    >
      {/* Right-side Large Circle of Photography: radius ~610px (diameter ~1220px) */}
      <div
        className="hidden md:block absolute right-[-240px] top-[-360px] w-[1220px] h-[1220px] rounded-full overflow-hidden pointer-events-none border border-white/20 z-0"
        aria-hidden="true"
      >
        <ImageSlot
          src="/images/home-statement.jpg"
          alt="MMM Advocates legal team"
          filename="home-statement.jpg"
          className="w-full h-full object-cover"
        />
        {/* Burgundy layer #6A3448 at 55% with multiply blend mode */}
        <div
          className="absolute inset-0 bg-[#6A3448]/55"
          style={{ mixBlendMode: 'multiply' }}
        />
      </div>

      {/* Main Content: x=64 to x=1376 */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-[80px] lg:pt-[125px] pb-[80px] lg:pb-0 h-full flex flex-col justify-between">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: H2 (x=64, top at y≈125, max width 820px) */}
          <div className="lg:col-span-8 max-w-[820px]">
            <h2 className="font-['Newsreader',serif] text-[38px] sm:text-[50px] lg:text-[64px] leading-[1.2] font-normal tracking-[-0.01em] text-[#FDFCF8]">
              Built for the decisions that
              <br />
              shape a business, an
              <br />
              institution or a life.
            </h2>
          </div>

          {/* Right Column: Text Block at x=1072, 300px wide, top at y≈185 */}
          <div className="lg:col-span-4 lg:col-start-9 max-w-[300px] pt-2 lg:pt-[60px] space-y-[36px]">
            <p className="font-['Newsreader',serif] text-[18px] leading-[32px] text-[#FDFCF8] font-normal [font-variation-settings:'opsz'_16]">
              {isFoundedVerified
                ? 'Founded in 2018, the practice has evolved into an LLP while retaining the closeness and responsibility clients value.'
                : 'The practice has evolved into an LLP while retaining the closeness and responsibility clients value.'}
            </p>

            <div>
              <a
                href="/about"
                onClick={(e) => handleLinkClick(e, '/about')}
                className="group inline-flex flex-col text-[11px] font-semibold uppercase tracking-[0.1em] text-[#FDFCF8] font-['Instrument_Sans',sans-serif] focus-visible:outline-2 focus-visible:outline-white"
              >
                <span className="flex items-center gap-1.5 hover:text-[#C6A455] transition-colors">
                  ABOUT THE FIRM <ArrowRight size={14} className="inline transition-transform group-hover:translate-x-1" />
                </span>
                <span className="w-[138px] h-[2px] bg-[#FDFCF8] mt-[8px]" aria-hidden="true" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeStatement;
