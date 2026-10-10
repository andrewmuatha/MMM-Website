import React from 'react';
import { Person } from '../../content/site';

interface ProfileSubNavProps {
  person: Person;
}

// Sub-nav for profile sections (Overview, Practice Focus, Insights)
// Hidden today when bio/focus are not yet supplied per specification.
export const ProfileSubNav: React.FC<ProfileSubNavProps> = ({ person }) => {
  const hasContent = Boolean(person.bio || (person.focus && person.focus.length > 0));
  if (!hasContent) {
    return null;
  }

  return (
    <nav
      aria-label="Profile section navigation"
      className="sticky top-20 z-30 bg-[var(--paper)]/95 backdrop-blur-sm border-b border-[var(--warm-gray)]/30"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <ul className="flex items-center gap-8 py-3 text-[12px] uppercase tracking-[0.14em]">
          {person.bio && (
            <li>
              <a href="#biography" className="text-[var(--navy)] font-semibold py-1">
                Biography
              </a>
            </li>
          )}
          {person.focus && (
            <li>
              <a href="#focus" className="text-[var(--muted-text)] hover:text-[var(--navy)] py-1">
                Practice Focus
              </a>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default ProfileSubNav;
