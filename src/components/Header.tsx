import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/insights', onNavigate }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const isInsightsActive = currentPath.startsWith('/insights');
  const isPracticeActive = currentPath.startsWith('/practice-areas') || currentPath.startsWith('/expertise');

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
    }
  };

  return (
    <header className="sticky top-0 z-50 bg-[#FDFCF8]/95 backdrop-blur-md border-b border-[#1A1815]/10 h-[72px] transition-all">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20 h-full flex items-center justify-between">
        {/* Brand Logo Lockup */}
        <a
          href="/"
          onClick={(e) => handleLinkClick(e, '/')}
          className="flex items-center gap-3.5 group focus-visible:outline-2 focus-visible:outline-[#16233F] focus-visible:outline-offset-2"
          aria-label="Mundui, Murai & Mwaniki Advocates LLP Home"
        >
          {/* Logo Mark: Architectural interlocking loops */}
          <svg
            width="34"
            height="18"
            viewBox="0 0 46 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="text-[#16233F] group-hover:text-[#7A2142] transition-colors"
            aria-hidden="true"
          >
            <circle cx="12" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" fill="none" />
            <circle cx="23" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" fill="none" />
            <circle cx="34" cy="12" r="9" stroke="currentColor" strokeWidth="2.2" fill="none" />
            <circle cx="23" cy="12" r="3.2" fill="#C6A455" />
          </svg>
          <div className="flex flex-col leading-tight">
            <span className="font-serif text-[15px] sm:text-[17px] tracking-wide text-[#16233F] font-semibold">
              Mundui, Murai &amp; Mwaniki
            </span>
            <span className="text-[10px] sm:text-[11px] uppercase tracking-[0.2em] text-[#5F5D55] font-medium">
              Advocates LLP
            </span>
          </div>
        </a>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 lg:gap-10" aria-label="Main navigation">
          <a
            href="/the-firm"
            className="text-[14px] text-[#5F5D55] hover:text-[#16233F] transition-colors font-medium focus-visible:outline-2 focus-visible:outline-[#16233F]"
          >
            The firm
          </a>
          <a
            href="/practice-areas"
            onClick={(e) => handleLinkClick(e, '/practice-areas')}
            aria-current={isPracticeActive ? 'page' : undefined}
            className={`relative text-[14px] transition-colors font-medium focus-visible:outline-2 focus-visible:outline-[#16233F] ${
              isPracticeActive ? 'text-[#16233F] font-semibold py-1' : 'text-[#5F5D55] hover:text-[#16233F]'
            }`}
          >
            Practice areas
            {isPracticeActive && (
              <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#7A2142]" />
            )}
          </a>
          <a
            href="/our-people"
            className="text-[14px] text-[#5F5D55] hover:text-[#16233F] transition-colors font-medium focus-visible:outline-2 focus-visible:outline-[#16233F]"
          >
            Our people
          </a>
          <a
            href="/insights"
            onClick={(e) => handleLinkClick(e, '/insights')}
            aria-current={isInsightsActive ? 'page' : undefined}
            className={`relative text-[14px] transition-colors font-medium py-1 focus-visible:outline-2 focus-visible:outline-[#16233F] ${
              isInsightsActive ? 'text-[#16233F] font-semibold' : 'text-[#5F5D55] hover:text-[#16233F]'
            }`}
          >
            Insights
            {isInsightsActive && (
              <span className="absolute bottom-[-4px] left-0 right-0 h-[2px] bg-[#7A2142]" />
            )}
          </a>
          <a
            href="/contact"
            className="group relative inline-flex items-center justify-center h-[44px] px-6 bg-[#16233F] text-[#FDFCF8] text-[13px] uppercase tracking-[0.08em] font-medium transition-colors hover:bg-[#7A2142] focus-visible:outline-2 focus-visible:outline-[#16233F] focus-visible:outline-offset-2"
          >
            <span className="text-roll">
              <span className="text-roll-stack">
                <span>Contact</span>
                <span>Contact</span>
              </span>
            </span>
          </a>
        </nav>

        {/* Mobile Menu Button */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="md:hidden p-2 text-[#16233F] hover:text-[#7A2142] focus-visible:outline-2 focus-visible:outline-[#16233F]"
          aria-expanded={mobileMenuOpen}
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Drawer */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-[#FDFCF8] border-b border-[#1A1815]/15 px-6 py-6 space-y-4">
          <nav className="flex flex-col space-y-3" aria-label="Mobile navigation">
            <a
              href="/the-firm"
              className="text-[16px] text-[#5F5D55] hover:text-[#16233F] py-2"
              onClick={(e) => handleLinkClick(e, '/the-firm')}
            >
              The firm
            </a>
            <a
              href="/practice-areas"
              aria-current={isPracticeActive ? 'page' : undefined}
              className={`text-[16px] py-2 ${
                isPracticeActive
                  ? 'text-[#16233F] font-semibold border-l-2 border-[#7A2142] pl-3'
                  : 'text-[#5F5D55] hover:text-[#16233F]'
              }`}
              onClick={(e) => handleLinkClick(e, '/practice-areas')}
            >
              Practice areas
            </a>
            <a
              href="/our-people"
              className="text-[16px] text-[#5F5D55] hover:text-[#16233F] py-2"
              onClick={(e) => handleLinkClick(e, '/our-people')}
            >
              Our people
            </a>
            <a
              href="/insights"
              aria-current={isInsightsActive ? 'page' : undefined}
              className={`text-[16px] py-2 ${
                isInsightsActive
                  ? 'text-[#16233F] font-semibold border-l-2 border-[#7A2142] pl-3'
                  : 'text-[#5F5D55] hover:text-[#16233F]'
              }`}
              onClick={(e) => handleLinkClick(e, '/insights')}
            >
              Insights
            </a>
            <div className="pt-2">
              <a
                href="/contact"
                className="w-full inline-flex items-center justify-center h-[48px] bg-[#16233F] text-[#FDFCF8] text-[13px] uppercase tracking-[0.08em] font-medium"
                onClick={() => setMobileMenuOpen(false)}
              >
                Contact
              </a>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
};
