import React, { useEffect, useState } from 'react';

export interface SubNavItem {
  id: string;
  label: string;
}

interface StickySubNavProps {
  items: SubNavItem[];
  ariaLabel?: string;
  className?: string;
}

export const StickySubNav: React.FC<StickySubNavProps> = ({
  items = [],
  ariaLabel = 'Section navigation',
  className = '',
}) => {
  const [activeId, setActiveId] = useState<string>(items?.[0]?.id || '');

  useEffect(() => {
    if (!items || items.length === 0) return;

    const handleScroll = () => {
      const scrollY = window.scrollY;
      const offset = 140;

      for (let i = items.length - 1; i >= 0; i--) {
        const el = document.getElementById(items[i].id);
        if (el) {
          const top = el.offsetTop - offset;
          if (scrollY >= top) {
            setActiveId(items[i].id);
            break;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [items]);

  const scrollTo = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      const top = el.offsetTop - 120;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  };

  if (!items || items.length === 0) return null;

  return (
    <nav
      aria-label={ariaLabel}
      className={`sticky top-20 z-30 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--warm-gray)]/30 ${className}`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <ul className="flex items-center gap-6 overflow-x-auto no-scrollbar py-3 text-[12px] uppercase tracking-[0.14em]">
          {items.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id} className="shrink-0">
                <button
                  type="button"
                  onClick={() => scrollTo(item.id)}
                  className={`py-1.5 transition-colors relative border-b-2 font-medium ${
                    isActive
                      ? 'border-[var(--navy)] text-[var(--navy)]'
                      : 'border-transparent text-[var(--muted-text)] hover:text-[var(--ink)]'
                  }`}
                  aria-current={isActive ? 'true' : undefined}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );
};

export default StickySubNav;
