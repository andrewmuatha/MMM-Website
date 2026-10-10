import React from 'react';
import { HomeHero } from '../sections/home/HomeHero';
import { HomeMmmBand } from '../sections/home/HomeMmmBand';
import { HomePractices } from '../sections/home/HomePractices';
import { HomeStatement } from '../sections/home/HomeStatement';
import { HomeInsights } from '../sections/home/HomeInsights';
import { HomePartners } from '../sections/home/HomePartners';
import { HomeCta } from '../sections/home/HomeCta';

interface HomeProps {
  onNavigate?: (path: string) => void;
}

export const Home: React.FC<HomeProps> = ({ onNavigate }) => {
  return (
    <div className="w-full bg-[#FDFCF8] text-[#1A1815]">
      {/* 01: HERO (807px) */}
      <HomeHero onNavigate={onNavigate} />

      {/* 02: MMM BAND (456px) */}
      <HomeMmmBand />

      {/* 03: OUR PRACTICES (667px) */}
      <HomePractices onNavigate={onNavigate} />

      {/* 04: STATEMENT (497px) */}
      <HomeStatement onNavigate={onNavigate} />

      {/* 05: INSIGHTS (1327px) */}
      <HomeInsights onNavigate={onNavigate} />

      {/* 06: MEET THE PARTNERS (1029px) */}
      <HomePartners onNavigate={onNavigate} />

      {/* 07: CTA (706px) */}
      <HomeCta onNavigate={onNavigate} />
    </div>
  );
};

export default Home;
