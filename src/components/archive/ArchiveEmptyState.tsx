import React from 'react';
import { ArrowRight } from 'lucide-react';
import { ArchiveVariant } from '../../types/cms';

interface ArchiveEmptyStateProps {
  variant: ArchiveVariant;
  name: string;
  practiceLink?: { name: string; url: string };
  onNavigateHome?: () => void;
}

export const ArchiveEmptyState: React.FC<ArchiveEmptyStateProps> = ({
  variant,
  name,
  practiceLink,
  onNavigateHome,
}) => {
  const headingText =
    variant === 'category'
      ? `No ${name.toLowerCase()} published yet.`
      : `Nothing published on ${name} yet.`;

  return (
    <section className="bg-[#FDFCF8] pt-20 pb-28 sm:pt-24 sm:pb-32 lg:pt-28 lg:pb-36 transition-all">
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12">
          <div className="lg:col-span-7 space-y-6">
            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#16233F]">
              {headingText}
            </h2>

            <p className="text-[18px] sm:text-[20px] leading-[1.6] text-[#5F5D55]">
              Subscribe below to receive them by email when they are published.
            </p>

            <div className="pt-4 flex flex-wrap items-center gap-6">
              <a
                href="/insights"
                onClick={(e) => {
                  if (onNavigateHome) {
                    e.preventDefault();
                    onNavigateHome();
                  }
                }}
                className="group inline-flex items-center gap-2 text-[15px] uppercase tracking-[0.08em] font-semibold text-[#16233F] hover:text-[#7A2142] underline focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                <span>View all insights</span>
                <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
              </a>

              {variant === 'topic' && practiceLink && (
                <a
                  href={practiceLink.url}
                  className="group inline-flex items-center gap-2 text-[15px] uppercase tracking-[0.08em] font-medium text-[#7A2142] hover:text-[#16233F] transition-colors"
                >
                  <span>Explore our {practiceLink.name} practice</span>
                  <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" />
                </a>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
