import React from 'react';
import { Partner, Person } from '../content/site';
import { Profile } from './Profile';
import { InsightItem } from '../types/cms';

interface PartnerProfileProps {
  partner: Partner;
  onNavigateTeam: () => void;
  onNavigateHome: () => void;
  onNavigatePractice?: (slug: string) => void;
  onNavigateArticle?: (article: InsightItem) => void;
  onSelectPartner?: (slug: string) => void;
}

export const PartnerProfile: React.FC<PartnerProfileProps> = ({
  partner,
  onNavigateTeam,
  onNavigateHome,
  onSelectPartner,
}) => {
  return (
    <Profile
      person={partner as Person}
      onNavigateTeam={onNavigateTeam}
      onNavigateHome={onNavigateHome}
      onSelectPartner={onSelectPartner}
    />
  );
};

export default PartnerProfile;
