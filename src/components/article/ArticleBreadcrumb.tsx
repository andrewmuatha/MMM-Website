import React from 'react';
import { ArrowLeft } from 'lucide-react';
import { InsightCategory } from '../../types/cms';

interface ArticleBreadcrumbProps {
  category: InsightCategory;
  categorySlug: string;
  onNavigateHome?: () => void;
  onNavigateCategory?: (category: string) => void;
}

export const ArticleBreadcrumb: React.FC<ArticleBreadcrumbProps> = ({
  category,
  categorySlug,
  onNavigateHome,
  onNavigateCategory,
}) => {
  return (
    <div className="pt-8 pb-4">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Aligned to Article Header Column (cols 2 to 10 on desktop) */}
          <div className="lg:col-span-9 lg:col-start-2 flex items-center justify-between">
            {/* Desktop & Tablet Breadcrumb */}
            <nav aria-label="Breadcrumb" className="hidden sm:flex items-center text-[14px] text-[#5F5D55]">
              <a
                href="/insights"
                onClick={(e) => {
                  if (onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome();
                  }
                }}
                className="hover:underline hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                Insights
              </a>
              <span className="mx-2 text-[#86847A]" aria-hidden="true">
                /
              </span>
              <a
                href={`/insights/category/${categorySlug}`}
                onClick={(e) => {
                  if (onNavigateCategory) {
                    e.preventDefault();
                    onNavigateCategory(category);
                  }
                }}
                className="hover:underline hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                {category}
              </a>
            </nav>

            {/* Mobile: single back link "← [Category name]" (44px target) */}
            <div className="sm:hidden flex items-center">
              <a
                href={`/insights/category/${categorySlug}`}
                onClick={(e) => {
                  if (onNavigateCategory) {
                    e.preventDefault();
                    onNavigateCategory(category);
                  }
                }}
                className="inline-flex items-center gap-2 h-[44px] text-[14px] font-medium text-[#16233F] hover:text-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                <ArrowLeft size={16} aria-hidden="true" />
                <span>{category}</span>
              </a>
            </div>

            {/* Desktop right-aligned back link to /insights "All insights" with left arrow */}
            <div className="hidden sm:block">
              <a
                href="/insights"
                onClick={(e) => {
                  if (onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome();
                  }
                }}
                className="group inline-flex items-center gap-2 text-[14px] text-[#5F5D55] hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                <ArrowLeft
                  size={15}
                  className="transition-transform duration-300 group-hover:-translate-x-1"
                  aria-hidden="true"
                />
                <span>All insights</span>
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
