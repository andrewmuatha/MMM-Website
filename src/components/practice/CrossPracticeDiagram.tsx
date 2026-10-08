import React, { useState } from 'react';
import { ArrowRight, Layers, ShieldCheck, Scale, Cpu, Building2 } from 'lucide-react';
import { PRACTICE_AREAS } from '../../data/practiceData';

interface CrossPracticeDiagramProps {
  onSelectPractice: (slug: string) => void;
}

export const CrossPracticeDiagram: React.FC<CrossPracticeDiagramProps> = ({
  onSelectPractice,
}) => {
  const [activePracticeId, setActivePracticeId] = useState<string>('tmt');

  const practiceIcons: Record<string, React.ReactNode> = {
    'corporate-commercial': <Scale size={20} className="text-[#C6A455]" />,
    'dispute-resolution': <ShieldCheck size={20} className="text-[#C6A455]" />,
    tmt: <Cpu size={20} className="text-[#C6A455]" />,
    property: <Building2 size={20} className="text-[#C6A455]" />,
  };

  const synergies: Record<
    string,
    {
      title: string;
      description: string;
      connectedPractices: string[];
      example: string;
    }
  > = {
    'corporate-commercial': {
      title: 'Corporate Structuring & Inter-Disciplinary Synergy',
      description:
        'Corporate transactions routinely integrate property due diligence for real estate assets, TMT compliance for fintech investments, and dispute risk modeling for shareholder contracts.',
      connectedPractices: ['Property & Real Estate', 'TMT', 'Dispute Resolution'],
      example: 'Private equity buyout of a digital payment platform holding freehold communications facilities.',
    },
    'dispute-resolution': {
      title: 'Commercial Controversy & Statutory Advocacy',
      description:
        'Our dispute resolution advocates work side-by-side with commercial teams to draft enforceable dispute escalation clauses and defend complex tax tribunal assessments.',
      connectedPractices: ['Corporate & Commercial', 'Tax & Regulatory', 'TMT'],
      example: 'Defending telecommunications operator in administrative appeal against spectrum fee assessments.',
    },
    tmt: {
      title: 'Digital Economy & Multidisciplinary Regulatory Integration',
      description:
        'Technology operations intersect with central bank digital lending mandates, commercial corporate governance, and intellectual property litigation.',
      connectedPractices: ['Corporate & Commercial', 'Banking & Finance', 'Dispute Resolution'],
      example: 'Structuring cross-border data transfer protocols and corporate joint ventures for regional cloud infrastructure.',
    },
    property: {
      title: 'Land Tenure, Sectional Conversions & Project Finance',
      description:
        'Real estate developments require corporate vehicle formation, banking collateral charges, and physical planning statutory clearances.',
      connectedPractices: ['Corporate & Commercial', 'Banking & Finance', 'Dispute Resolution'],
      example: 'Conversion of multi-unit commercial building into sectional titles with concurrent bank charge substitutions.',
    },
  };

  const selectedSynergy = synergies[activePracticeId] || synergies.tmt;
  const activePractice = PRACTICE_AREAS.find((p) => p.id === activePracticeId) || PRACTICE_AREAS[2];

  return (
    <div className="bg-[#F6F3EC] border border-[#1A1815]/10 p-8 sm:p-12">
      <div className="max-w-3xl mb-10">
        <div className="flex items-center gap-2 mb-3 text-[12px] uppercase tracking-[0.2em] font-medium text-[#7A2142]">
          <Layers size={14} className="text-[#C6A455]" />
          <span>Interdisciplinary practice synergy</span>
        </div>
        <h3 className="font-serif text-[28px] sm:text-[36px] text-[#16233F] leading-tight mb-4">
          Integrated Commercial Counsel
        </h3>
        <p className="text-[15px] sm:text-[16px] text-[#5F5D55] leading-relaxed">
          Contemporary legal problems rarely inhabit a single silo. Our practice areas operate as a cohesive multidisciplinary unit, providing cross-practice depth across all advisory mandates.
        </p>
      </div>

      {/* Interactive Tabs / Practice Selectors */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 mb-8">
        {PRACTICE_AREAS.map((practice) => {
          const isActive = practice.id === activePracticeId;
          return (
            <button
              key={practice.id}
              type="button"
              onClick={() => setActivePracticeId(practice.id)}
              className={`p-4 sm:p-5 text-left border transition-all flex flex-col justify-between ${
                isActive
                  ? 'bg-[#16233F] text-[#FDFCF8] border-[#16233F]'
                  : 'bg-[#FDFCF8] text-[#1A1815] border-[#1A1815]/10 hover:border-[#16233F]/30'
              }`}
            >
              <div className="flex items-center justify-between mb-3">
                <span className={`text-[11px] font-mono font-semibold ${isActive ? 'text-[#C6A455]' : 'text-[#7A2142]'}`}>
                  {practice.number}
                </span>
                {practiceIcons[practice.id]}
              </div>
              <div className={`font-serif text-[15px] sm:text-[17px] font-semibold leading-snug ${isActive ? 'text-[#FDFCF8]' : 'text-[#16233F]'}`}>
                {practice.shortName}
              </div>
            </button>
          );
        })}
      </div>

      {/* Active Synergy Detail Matrix */}
      <div className="bg-[#FDFCF8] border border-[#1A1815]/10 p-6 sm:p-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
          <div className="lg:col-span-8">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#7A2142] font-semibold mb-2">
              Cross-practice coordination
            </div>
            <h4 className="font-serif text-[22px] sm:text-[24px] font-semibold text-[#16233F] mb-3">
              {selectedSynergy.title}
            </h4>
            <p className="text-[14px] sm:text-[15px] text-[#5F5D55] leading-relaxed mb-5">
              {selectedSynergy.description}
            </p>

            <div className="pt-4 border-t border-[#1A1815]/10">
              <span className="text-[12px] font-medium text-[#1A1815] block mb-2">
                Routine cross-practice intersections:
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedSynergy.connectedPractices.map((cp, cIdx) => (
                  <span
                    key={cIdx}
                    className="inline-flex items-center px-2.5 py-1 text-[12px] bg-[#F6F3EC] border border-[#1A1815]/10 text-[#16233F] font-medium"
                  >
                    {cp}
                  </span>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-4 lg:border-l lg:border-[#1A1815]/10 lg:pl-8">
            <div className="text-[11px] uppercase tracking-[0.16em] text-[#86847A] font-semibold mb-2">
              Representative scenario
            </div>
            <p className="text-[13px] italic text-[#1A1815] leading-relaxed mb-6 font-serif">
              &ldquo;{selectedSynergy.example}&rdquo;
            </p>

            <button
              type="button"
              onClick={() => onSelectPractice(activePractice.slug)}
              className="inline-flex items-center gap-2 text-[12px] uppercase tracking-[0.1em] font-semibold text-[#16233F] hover:text-[#7A2142] transition-colors"
            >
              <span>Explore {activePractice.shortName}</span>
              <ArrowRight size={14} />
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
