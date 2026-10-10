import React, { useState } from 'react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [submitted, setSubmitted] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

  return (
    <footer className="w-full bg-[#FDFCF8] text-[#1A1815] pt-[96px] pb-[48px] border-t border-[#D9D2D0]/40">
      <div className="max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        {/* 4-Column Grid: starting at x=64, 515, 740, 965 */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-y-12 gap-x-8">
          {/* Column 1 (x=64, span 4 cols): Firm Name, Tagline, Address, Phone */}
          <div className="lg:col-span-4 space-y-3">
            <h2 className="font-['Newsreader',serif] text-[22px] font-semibold uppercase leading-[1.25] text-[#6B1E3F]">
              Mundui, Murai and Mwaniki
              <br />
              Advocates LLP
            </h2>

            <p className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#3A3835] font-['Instrument_Sans',sans-serif] pt-1">
              MASTER · MANAGE · MULTIPLY
            </p>

            <div className="pt-6 space-y-1 font-['Instrument_Sans',sans-serif]">
              <p className="text-[13px] font-semibold text-[#6B1E3F] mb-1">
                Nairobi office:
              </p>
              <p className="text-[14px] leading-[22px] text-[#3A3835]">
                Longonot Place, 7th Floor, Right Wing
              </p>
              <p className="text-[14px] leading-[22px] text-[#3A3835]">
                Kijabe Street
              </p>
              <p className="text-[14px] leading-[22px] text-[#3A3835]">
                Nairobi, Kenya
              </p>
            </div>

            <div className="pt-3 font-['Instrument_Sans',sans-serif]">
              <span className="text-[12px] font-semibold uppercase text-[#3A3835] mr-2">
                DIRECT:
              </span>
              <a
                href="tel:+254713874830"
                className="text-[14px] text-[#3A3835] hover:text-[#16233F] transition-colors"
              >
                +254 713 874 830
              </a>
            </div>
          </div>

          {/* Column 2 (x=515, span 2 cols): Practice Areas */}
          <div className="lg:col-span-2 lg:col-start-5 space-y-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B1E3F] font-['Instrument_Sans',sans-serif]">
              PRACTICE AREAS
            </h3>
            <div className="w-full h-[1px] bg-[#D9D2D0] mb-4" aria-hidden="true" />
            <ul className="space-y-4 text-[14px] text-[#3A3835] font-['Instrument_Sans',sans-serif]">
              <li>
                <a
                  href="/practice-areas/tmt"
                  onClick={(e) => handleLinkClick(e, '/practice-areas/tmt')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  TMT
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas/corporate-commercial"
                  onClick={(e) => handleLinkClick(e, '/practice-areas/corporate-commercial')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  Corporate &amp; Commercial
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas/dispute-resolution"
                  onClick={(e) => handleLinkClick(e, '/practice-areas/dispute-resolution')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  Dispute Resolution
                </a>
              </li>
              <li>
                <a
                  href="/practice-areas/property"
                  onClick={(e) => handleLinkClick(e, '/practice-areas/property')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  Property
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 (x=740, span 2 cols): The Firm */}
          <div className="lg:col-span-2 lg:col-start-7 space-y-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B1E3F] font-['Instrument_Sans',sans-serif]">
              THE FIRM
            </h3>
            <div className="w-full h-[1px] bg-[#D9D2D0] mb-4" aria-hidden="true" />
            <ul className="space-y-4 text-[14px] text-[#3A3835] font-['Instrument_Sans',sans-serif]">
              <li>
                <a
                  href="/about"
                  onClick={(e) => handleLinkClick(e, '/about')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  About
                </a>
              </li>
              <li>
                <a
                  href="/our-team"
                  onClick={(e) => handleLinkClick(e, '/our-team')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  Our team
                </a>
              </li>
              <li>
                <a
                  href="/insights"
                  onClick={(e) => handleLinkClick(e, '/insights')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  Insights
                </a>
              </li>
              <li>
                <a
                  href="/contact"
                  onClick={(e) => handleLinkClick(e, '/contact')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  Contact
                </a>
              </li>
            </ul>
          </div>

          {/* Column 4 (x=965 to x=1376, span 4 cols): Newsletter */}
          <div className="lg:col-span-4 lg:col-start-9 space-y-3">
            <h3 className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#6B1E3F] font-['Instrument_Sans',sans-serif]">
              LEGAL GAZETTE &amp; NEWSLETTER
            </h3>
            <div className="w-full h-[1px] bg-[#D9D2D0] mb-4" aria-hidden="true" />
            <p className="text-[14px] leading-[22px] text-[#3A3835] font-['Instrument_Sans',sans-serif]">
              Selected legal updates and client alerts from MMM Advocates.
            </p>

            <form onSubmit={handleSubmit} className="pt-4 space-y-3">
              <div className="flex flex-col sm:flex-row items-stretch">
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="EMAIL ADDRESS"
                  required
                  className="w-full sm:w-[286px] h-[56px] px-4 bg-[#FDF9ED] border border-[#D9D2D0] text-[13px] font-['Instrument_Sans',sans-serif] placeholder-[#86847A] uppercase text-[#1A1815] focus:outline-none focus:border-[#16233F] rounded-none"
                />
                <button
                  type="submit"
                  className="w-full sm:w-[125px] h-[56px] bg-[#1C1C15] hover:bg-[#3A3835] text-[#FDFCF8] text-[12px] font-semibold uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] shrink-0 rounded-none transition-colors"
                >
                  SUBSCRIBE
                </button>
              </div>

              {submitted && (
                <p className="text-[13px] text-[#6B1E3F] font-['Instrument_Sans',sans-serif] pt-1">
                  Subscriptions open soon. In the meantime, call +254 713 874 830.
                </p>
              )}
            </form>
          </div>
        </div>

        {/* Bottom Rule: 64px below columns */}
        <div className="w-full h-[1px] bg-[#D9D2D0] mt-16 mb-8" aria-hidden="true" />

        {/* Bottom Copyright & Legal Links: 32px below rule */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 text-[12px] font-semibold uppercase tracking-[0.06em] text-[#3A3835] font-['Instrument_Sans',sans-serif]">
          <p>
            &copy; 2026 MUNDUI, MURAI AND MWANIKI ADVOCATES LLP. ALL RIGHTS RESERVED.
          </p>
          <div className="flex items-center gap-4">
            <a
              href="/privacy-policy"
              onClick={(e) => handleLinkClick(e, '/privacy-policy')}
              className="hover:text-[#16233F] transition-colors"
            >
              PRIVACY POLICY
            </a>
            <span className="w-1.5 h-1.5 bg-[#C9C3BE]" aria-hidden="true" />
            <a
              href="/terms-of-engagement"
              onClick={(e) => handleLinkClick(e, '/terms-of-engagement')}
              className="hover:text-[#16233F] transition-colors"
            >
              TERMS OF ENGAGEMENT
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
