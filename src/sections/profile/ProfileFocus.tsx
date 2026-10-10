import React from 'react';
import { Person } from '../../content/site';

interface ProfileFocusProps {
  person: Person;
}

// ProfileFocus (paper-alt)
// Hidden today until practice focus is officially commissioned.
// Respects: "Never write a biography, qualifications, admission year, practice focus, specialism, languages, years, awards or quotes for anyone."
export const ProfileFocus: React.FC<ProfileFocusProps> = ({ person }) => {
  if (!person.focus || person.focus.length === 0) {
    return null;
  }

  return (
    <section id="focus" className="bg-[var(--paper-alt)] py-16 border-t border-[var(--warm-gray)]/30">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <h2 className="font-serif text-[28px] text-[var(--navy)] mb-6">Practice Focus</h2>
        <ul className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {person.focus.map((item, idx) => (
            <li key={idx} className="p-4 bg-[var(--paper)] border border-[var(--warm-gray)]/30 text-[15px] text-[var(--ink)]">
              {item}
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
};

export default ProfileFocus;
