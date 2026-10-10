import React from 'react';
import { Seo } from '../components/Seo';
import { TeamHero } from '../sections/our-team/TeamHero';
import { TeamPartners } from '../sections/our-team/TeamPartners';
import { TeamStatement } from '../sections/our-team/TeamStatement';
import { TeamWider } from '../sections/our-team/TeamWider';
import { TeamCollaborative } from '../sections/our-team/TeamCollaborative';
import { SharedCta } from '../components/SharedCta';

interface OurTeamProps {
  onNavigateHome?: () => void;
  onSelectPartner?: (slug: string) => void;
}

export const OurTeam: React.FC<OurTeamProps> = ({ onNavigateHome, onSelectPartner }) => {
  return (
    <>
      <Seo
        title="Our Team | Mundui, Murai & Mwaniki Advocates LLP"
        description="Partners and legal counsel at Mundui, Murai & Mwaniki Advocates LLP, Nairobi, Kenya."
        canonicalUrl="https://mmmadvocatesllp.com/our-team"
      />

      {/* 1 TeamHero (paper) */}
      <TeamHero onNavigateHome={onNavigateHome} />

      {/* 2 TeamPartners (paper, "01 // Partners") */}
      <TeamPartners onSelectPartner={onSelectPartner} />

      {/* 3 TeamStatement (navy, "02 // Our people") */}
      <TeamStatement />

      {/* 4 TeamWider (paper, hidden today) */}
      <TeamWider />

      {/* 5 TeamCollaborative (paper-alt, "03 // How we work") */}
      <TeamCollaborative />

      {/* 6 SharedCTA (navy) */}
      <SharedCta headline="The right conversation starts with the right people." />
    </>
  );
};

export default OurTeam;
