import React, { useState, useEffect, useRef } from 'react';
import { ChevronDown, ChevronUp } from 'lucide-react';

export interface TocHeading {
  id: string;
  text: string;
}

interface TableOfContentsProps {
  headings: TocHeading[];
  activeId: string;
  onSelectHeading: (id: string) => void;
  railsFaded?: boolean;
}

export const TableOfContents: React.FC<TableOfContentsProps> = ({
  headings,
  activeId,
  onSelectHeading,
  railsFaded = false,
}) => {
  const [dropdownOpen, setDropdownOpen] = useState(false);
  const [dropdownVisible, setDropdownVisible] = useState(false);
  const listRef = useRef<HTMLUListElement>(null);
  const [indicatorStyle, setIndicatorStyle] = useState<{ top: number; height: number }>({
    top: 0,
    height: 0,
  });

  // TOC only renders when there are 3 or more H2s
  if (!headings || headings.length < 3) {
    return null;
  }

  // Update active indicator bar position on desktop
  useEffect(() => {
    if (!listRef.current) return;
    const activeIndex = headings.findIndex((h) => h.id === activeId);
    if (activeIndex >= 0) {
      const activeEl = listRef.current.children[activeIndex] as HTMLElement;
      if (activeEl) {
        setIndicatorStyle({
          top: activeEl.offsetTop,
          height: activeEl.offsetHeight,
        });
      }
    }
  }, [activeId, headings]);

  // Show mobile/tablet dropdown only after scrolling past header (e.g. 350px)
  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 350) {
        setDropdownVisible(true);
      } else {
        setDropdownVisible(false);
        setDropdownOpen(false);
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Handle escape key to close mobile dropdown
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && dropdownOpen) {
        setDropdownOpen(false);
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [dropdownOpen]);

  const currentHeading = headings.find((h) => h.id === activeId) || headings[0];

  return (
    <>
      {/* 4.1 DESKTOP LEFT RAIL TABLE OF CONTENTS (1440px breakpoint, cols 1 to 3) */}
      <div
        id="toc-rail"
        className={`hidden xl:block transition-opacity duration-300 ${
          railsFaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="sticky top-[120px] max-h-[calc(100vh-160px)] overflow-y-auto no-scrollbar pr-4">
          <nav aria-label="On this page" className="space-y-5">
            <h2 className="text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
              On this page
            </h2>

            <div className="relative">
              {/* 1px Ink Charcoal 12% vertical track */}
              <div
                className="absolute left-0 top-0 bottom-0 w-[1px] bg-[#1A1815]/12"
                aria-hidden="true"
              />

              {/* 2px Rich Burgundy active indicator line that slides */}
              <div
                className="absolute left-0 w-[2px] bg-[#7A2142] transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)]"
                style={{
                  top: `${indicatorStyle.top}px`,
                  height: `${indicatorStyle.height || 36}px`,
                }}
                aria-hidden="true"
              />

              {/* Headings list */}
              <ul ref={listRef} className="space-y-1">
                {headings.map((heading) => {
                  const isActive = activeId === heading.id;
                  return (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        aria-current={isActive ? 'location' : undefined}
                        onClick={(e) => {
                          e.preventDefault();
                          onSelectHeading(heading.id);
                        }}
                        className={`block pl-5 py-2 text-[15px] leading-[22px] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F] ${
                          isActive
                            ? 'text-[#1A1815] font-semibold'
                            : 'text-[#5F5D55] hover:text-[#1A1815]'
                        }`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          </nav>
        </div>
      </div>

      {/* 4.2 "ON THIS PAGE" DROPDOWN (Below 1280px / xl) */}
      {dropdownVisible && (
        <div
          id="sticky-dropdown"
          className="xl:hidden sticky top-[72px] z-30 bg-[#FDFCF8] border-b border-[#1A1815]/12 transition-all print:hidden"
        >
          <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12">
            <button
              type="button"
              onClick={() => setDropdownOpen(!dropdownOpen)}
              aria-expanded={dropdownOpen}
              aria-controls="mobile-toc-panel"
              className="w-full h-[52px] flex items-center justify-between text-left text-[14px] text-[#16233F] focus-visible:outline-2 focus-visible:outline-[#16233F]"
            >
              <div className="flex items-center gap-2 overflow-hidden pr-3">
                <span className="text-[#5F5D55] text-[12px] uppercase tracking-[0.14em] font-medium shrink-0">
                  On this page:
                </span>
                <span className="font-semibold truncate">
                  {currentHeading?.text || 'Introduction'}
                </span>
              </div>
              <span className="shrink-0 text-[#16233F]">
                {dropdownOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
              </span>
            </button>
          </div>

          {/* Expanded dropdown panel */}
          {dropdownOpen && (
            <div
              id="mobile-toc-panel"
              className="bg-[#FDFCF8] border-t border-[#1A1815]/10 max-h-[60vh] overflow-y-auto px-5 sm:px-10 py-4 shadow-lg space-y-2"
            >
              <ul className="space-y-1">
                {headings.map((heading) => {
                  const isActive = activeId === heading.id;
                  return (
                    <li key={heading.id}>
                      <a
                        href={`#${heading.id}`}
                        onClick={(e) => {
                          e.preventDefault();
                          setDropdownOpen(false);
                          onSelectHeading(heading.id);
                        }}
                        className={`block py-2.5 text-[15px] border-l-2 pl-3 transition-colors ${
                          isActive
                            ? 'border-[#7A2142] text-[#1A1815] font-semibold bg-[#F6F3EC]'
                            : 'border-transparent text-[#5F5D55] hover:text-[#1A1815]'
                        }`}
                      >
                        {heading.text}
                      </a>
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </>
  );
};
