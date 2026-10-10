import React from 'react';
import { Person } from '../../content/site';

interface ProfileInsightsProps {
  person: Person;
}

// ProfileInsights (paper)
// Hidden today per specification: "ProfileSubNav, ProfileBio (paper), ProfileFocus (paper-alt), ProfileInsights (paper): all hidden today"
export const ProfileInsights: React.FC<ProfileInsightsProps> = () => {
  return null;
};

export default ProfileInsights;
