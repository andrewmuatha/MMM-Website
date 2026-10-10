import React from 'react';
import { Person } from '../../content/site';

interface ProfileBioProps {
  person: Person;
}

// ProfileBio (paper)
// Hidden today until an approved biography is supplied in site.ts.
// Strictly observes Kenyan Advocates Rules 2014: no invented biographies or qualifications.
export const ProfileBio: React.FC<ProfileBioProps> = ({ person }) => {
  if (!person.bio) {
    return null;
  }

  return (
    <section id="biography" className="bg-[var(--paper)] py-16 border-t border-[var(--warm-gray)]/30">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="max-w-[768px]">
          <h2 className="font-serif text-[28px] text-[var(--navy)] mb-6">Biography</h2>
          <div className="text-[17px] leading-[28px] text-[var(--ink)]">
            <p>{person.bio}</p>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProfileBio;
