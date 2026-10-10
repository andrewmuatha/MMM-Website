import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

interface HeaderProps {
  currentPath?: string;
  onNavigate?: (path: string) => void;
}

export const Header: React.FC<HeaderProps> = ({ currentPath = '/', onNavigate }) => {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      setMobileMenuOpen(false);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const navLinks = [
    { label: 'ABOUT', path: '/about' },
    { label: 'PRACTICE AREAS', path: '/practice-areas' },
    { label: 'OUR TEAM', path: '/our-team' },
    { label: 'INSIGHTS', path: '/insights' },
  ];

  return (
    <>
      {/* SECTION 00: UTILITY BAR (image 01, top 32px) */}
      <div className="w-full h-[32px] bg-[#3A3835] text-[#FDFCF8] flex items-center z-50 relative select-none">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 flex justify-end items-center">
          <a
            href="tel:+254713874830"
            className="text-[12px] font-medium tracking-[0.08em] hover:text-[#C6A455] transition-colors font-['Instrument_Sans',sans-serif]"
          >
            +254 713 874 830
          </a>
        </div>
      </div>

      {/* SECTION 00: MAIN HEADER (105px tall, compacts to 80px on scroll) */}
      <header
        className={`sticky top-0 z-40 w-full bg-[#FDFCF8] transition-all duration-300 ${
          isScrolled
            ? 'h-[80px] border-b border-[#86847A]'
            : 'h-[105px] border-b border-transparent'
        }`}
      >
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 h-full flex items-center justify-between">
          {/* Logo at x=64, vertically centred, 50px tall (40px on mobile <900px) */}
          <a
            href="/"
            onClick={(e) => handleLinkClick(e, '/')}
            className="flex items-center shrink-0 focus-visible:outline-2 focus-visible:outline-[#16233F]"
            aria-label="Mundui, Murai & Mwaniki Advocates LLP Home"
          >
            <img
              src="/brand/mmm-logo-lockup.svg"
              alt="Mundui, Murai & Mwaniki Advocates LLP"
              className="h-[40px] lg:h-[50px] w-auto object-contain"
            />
          </a>

          {/* Desktop Nav at right: 4 links, 32px apart, ending 32px before the button */}
          <nav
            className="hidden min-[900px]:flex items-center"
            aria-label="Main navigation"
          >
            <div className="flex items-center space-x-8 mr-8">
              {navLinks.map((link) => {
                const isActive =
                  currentPath === link.path ||
                  (link.path !== '/' && currentPath.startsWith(link.path));
                return (
                  <a
                    key={link.path}
                    href={link.path}
                    onClick={(e) => handleLinkClick(e, link.path)}
                    className={`relative text-[13px] font-medium uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] text-[#1A1815] py-1 transition-colors hover:text-[#16233F] group ${
                      isActive ? 'font-semibold' : ''
                    }`}
                  >
                    <span>{link.label}</span>
                    <span
                      className={`absolute bottom-0 left-0 right-0 h-[1px] bg-[#16233F] transition-transform duration-200 ${
                        isActive
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </a>
                );
              })}
            </div>

            {/* Button "CONTACT": 130 x 48px, navy fill, paper text 13px, right edge at x=1376 */}
            <a
              href="/contact"
              onClick={(e) => handleLinkClick(e, '/contact')}
              className="inline-flex items-center justify-center w-[130px] h-[48px] bg-[#16233F] hover:bg-[#7A2142] text-[#FDFCF8] text-[13px] font-medium uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] transition-colors rounded-none focus-visible:outline-2 focus-visible:outline-[#16233F]"
            >
              CONTACT
            </a>
          </nav>

          {/* Mobile Menu Button (<900px) */}
          <button
            type="button"
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="min-[900px]:hidden p-2 text-[#1A1815] hover:text-[#16233F] focus-visible:outline-2 focus-visible:outline-[#16233F]"
            aria-label={mobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
            aria-expanded={mobileMenuOpen}
          >
            {mobileMenuOpen ? <X size={26} /> : <Menu size={26} />}
          </button>
        </div>

        {/* Mobile Full-width Paper Panel */}
        {mobileMenuOpen && (
          <div className="min-[900px]:hidden bg-[#FDFCF8] border-b border-[#86847A] px-5 py-6 space-y-4 shadow-lg">
            <nav className="flex flex-col space-y-4" aria-label="Mobile navigation">
              {navLinks.map((link) => (
                <a
                  key={link.path}
                  href={link.path}
                  onClick={(e) => handleLinkClick(e, link.path)}
                  className="text-[14px] font-medium uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] text-[#1A1815] py-2 border-b border-[#86847A]/20"
                >
                  {link.label}
                </a>
              ))}
              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="inline-flex items-center justify-center w-full h-[48px] bg-[#16233F] text-[#FDFCF8] text-[13px] font-medium uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] mt-2"
              >
                CONTACT
              </a>
            </nav>
          </div>
        )}
      </header>
    </>
  );
};

export default Header;
