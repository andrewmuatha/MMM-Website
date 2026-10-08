import React from 'react';

interface FooterProps {
  onNavigate?: (path: string) => void;
}

export const Footer: React.FC<FooterProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
    }
  };

  return (
    <footer className="bg-[#F6F3EC] text-[#1A1815] border-t border-[#1A1815]/10 pt-16 sm:pt-20 pb-12">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 lg:gap-8 mb-16">
          {/* Column 1: Brand & Nairobi Registry (cols 1-5) */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center gap-3">
              <svg
                width="28"
                height="15"
                viewBox="0 0 46 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
                className="text-[#16233F]"
                aria-hidden="true"
              >
                <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="23" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="34" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" />
                <circle cx="23" cy="12" r="3.2" fill="#C6A455" />
              </svg>
              <span className="font-serif text-[18px] font-semibold text-[#16233F]">
                Mundui, Murai and Mwaniki Advocates LLP
              </span>
            </div>

            <p className="text-[12px] uppercase tracking-[0.14em] text-[#5F5D55]">
              Excellence · Integrity · Partnership
            </p>

            <div className="text-[14px] leading-[1.65] text-[#5F5D55] pt-2 space-y-1">
              <p className="font-medium text-[#1A1815]">Nairobi Registry:</p>
              <p>Delta Corner Annex, 7th Floor, Ring Road Westlands</p>
              <p>Off Chiromo Lane</p>
              <p>P.O. Box 48291-00100, Nairobi, Kenya</p>
            </div>

            <div className="pt-2 text-[14px] text-[#5F5D55] space-y-1">
              <p>
                <span className="font-medium text-[#1A1815]">Direct: </span>
                <a
                  href="tel:+254713874830"
                  className="hover:text-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
                >
                  +254 713 874 830
                </a>
              </p>
              <p>
                <span className="font-medium text-[#1A1815]">Enquiries: </span>
                <a
                  href="/contact"
                  className="hover:text-[#7A2142] underline transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
                >
                  Via our enquiry form
                </a>
              </p>
            </div>
          </div>

          {/* Column 2: Practice Areas (cols 6-8) */}
          <div className="lg:col-span-4 space-y-4">
            <h3 className="text-[12px] uppercase tracking-[0.14em] font-semibold text-[#16233F]">
              <a
                href="/practice-areas"
                onClick={(e) => handleLinkClick(e, '/practice-areas')}
                className="hover:underline"
              >
                Practice Areas
              </a>
            </h3>
            <ul className="space-y-2.5 text-[14px] text-[#5F5D55]">
              <li>
                <a
                  href="/practice-areas/tmt"
                  onClick={(e) => handleLinkClick(e, '/practice-areas/tmt')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  Technology, Media &amp; Telecommunications (TMT)
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
                  href="/practice-areas/property-real-estate"
                  onClick={(e) => handleLinkClick(e, '/practice-areas/property-real-estate')}
                  className="hover:text-[#16233F] transition-colors"
                >
                  Property &amp; Real Estate
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3: Firm & Counsel (cols 9-12) */}
          <div className="lg:col-span-3 space-y-4">
            <h3 className="text-[12px] uppercase tracking-[0.14em] font-semibold text-[#16233F]">
              Firm &amp; Counsel
            </h3>
            <ul className="space-y-2.5 text-[14px] text-[#5F5D55]">
              <li>
                <a href="/the-firm" className="hover:text-[#16233F] transition-colors">
                  About The Firm
                </a>
              </li>
              <li>
                <a href="/the-firm#ethos" className="hover:text-[#16233F] transition-colors">
                  Our Ethos
                </a>
              </li>
              <li>
                <a href="/our-people" className="hover:text-[#16233F] transition-colors">
                  Partners
                </a>
              </li>
              <li>
                <a href="/our-people#associates" className="hover:text-[#16233F] transition-colors">
                  Associates
                </a>
              </li>
              <li>
                <a href="/the-firm#administration" className="hover:text-[#16233F] transition-colors">
                  Administration
                </a>
              </li>
            </ul>
          </div>
          {/* Note: The newsletter signup column is strictly removed here because /insights has the dedicated newsletter band, avoiding duplicate forms per Prompt 0 section 4.1 */}
        </div>

        {/* Bottom Rule and Legal Notice */}
        <div className="pt-8 border-t border-[#1A1815]/10 flex flex-col sm:flex-row items-center justify-between gap-4 text-[13px] text-[#5F5D55]">
          <p>© 2018-2026 Mundui, Murai and Mwaniki Advocates LLP. All rights reserved.</p>
          <div className="flex items-center gap-6">
            <a href="/privacy-policy" className="hover:text-[#16233F] transition-colors">
              Privacy policy
            </a>
            <span aria-hidden="true">·</span>
            <a href="/terms-of-engagement" className="hover:text-[#16233F] transition-colors">
              Terms of engagement
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
};
