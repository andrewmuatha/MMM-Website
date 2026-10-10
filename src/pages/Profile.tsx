import React, { useEffect } from 'react';
import { Person } from '../content/site';
import { Seo } from '../components/Seo';
import { ProfileHero } from '../sections/profile/ProfileHero';
import { ProfileSubNav } from '../sections/profile/ProfileSubNav';
import { ProfileBio } from '../sections/profile/ProfileBio';
import { ProfileFocus } from '../sections/profile/ProfileFocus';
import { ProfileInsights } from '../sections/profile/ProfileInsights';
import { ProfileOthers } from '../sections/profile/ProfileOthers';
import { SharedCta } from '../components/SharedCta';

interface ProfileProps {
  person: Person;
  onNavigateTeam?: () => void;
  onNavigateHome?: () => void;
  onSelectPartner?: (slug: string) => void;
}

export const Profile: React.FC<ProfileProps> = ({
  person,
  onNavigateTeam,
  onNavigateHome,
  onSelectPartner,
}) => {
  useEffect(() => {
    if (person?.slug) {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  }, [person?.slug]);

  if (!person) {
    return null;
  }

  // Check if any sub-nav section has content (hidden today)
  const hasSubContent = Boolean(person.bio || (person.focus && person.focus.length > 0));

  return (
    <>
      <Seo
        title={`${person.name} | Partner | Mundui, Murai & Mwaniki Advocates LLP`}
        description={`Profile of ${person.name}, Partner at Mundui, Murai & Mwaniki Advocates LLP, Nairobi, Kenya.`}
        canonicalUrl={`https://mmmadvocatesllp.com/our-team/${person.slug}`}
      />

      {/* 1 ProfileHero (paper) */}
      <ProfileHero
        person={person}
        onNavigateTeam={onNavigateTeam}
        onNavigateHome={onNavigateHome}
      />

      {/* 2 sub-nav wrapper (hidden today as bio/focus/insights are empty) */}
      {hasSubContent && (
        <div id="profile-subnav-wrapper">
          <ProfileSubNav person={person} />
          <ProfileBio person={person} />
          <ProfileFocus person={person} />
          <ProfileInsights person={person} />
        </div>
      )}

      {/* 3 ProfileOthers (paper-alt, "01 // Our team" today) */}
      <ProfileOthers person={person} onSelectPartner={onSelectPartner} />

      {/* 4 SharedCTA (navy) */}
      <SharedCta headline="The right conversation starts with the right people." />
    </>
  );
};

export default Profile;
