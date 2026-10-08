import React from 'react';
import { ChevronRight } from 'lucide-react';

interface PracticeBreadcrumbProps {
  practiceName: string;
  onNavigateOverview: () => void;
  onNavigateHome?: () => void;
}

export const PracticeBreadcrumb: React.FC<PracticeBreadcrumbProps> = ({
  practiceName,
  onNavigateOverview,
  onNavigateHome,
}) => {
  return (
    <nav aria-label="Breadcrumb" className="pt-8 pb-6 border-b border-[#1A1815]/10">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <ol className="flex items-center flex-wrap gap-2 text-[12px] sm:text-[13px] text-[#5F5D55]">
          <li>
            <button
              type="button"
              onClick={onNavigateHome || onNavigateOverview}
              className="hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
            >
              Home
            </button>
          </li>
          <li aria-hidden="true" className="text-[#86847A]">
            <ChevronRight size={13} />
          </li>
          <li>
            <button
              type="button"
              onClick={onNavigateOverview}
              className="hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
            >
              Practice areas
            </button>
          </li>
          <li aria-hidden="true" className="text-[#86847A]">
            <ChevronRight size={13} />
          </li>
          <li className="text-[#16233F] font-semibold truncate max-w-[280px] sm:max-w-none" aria-current="page">
            {practiceName}
          </li>
        </ol>
      </div>
    </nav>
  );
};
