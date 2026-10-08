import React from 'react';
import { ArrowLeft, ArrowRight, ArrowUpRight } from 'lucide-react';
import { ArchiveVariant, Author } from '../../types/cms';

interface ArchiveHeroProps {
  variant: ArchiveVariant;
  name: string;
  description?: string;
  countDisplay: string | null;
  practiceLink?: { name: string; url: string };
  authorMeta?: Author;
  onNavigateHome?: () => void;
}

export const ArchiveHero: React.FC<ArchiveHeroProps> = ({
  variant,
  name,
  description,
  countDisplay,
  practiceLink,
  authorMeta,
  onNavigateHome,
}) => {
  const eyebrowLabel = {
    category: 'Category',
    topic: 'Topic',
    author: 'Author',
  }[variant];

  // Hide description if placeholder or empty
  const isDescriptionPlaceholder =
    !description ||
    description.trim().startsWith('[') ||
    description.includes('firm to approve');

  return (
    <section
      className="bg-[#FDFCF8] pt-8 sm:pt-12 lg:pt-16 pb-14 sm:pb-14 lg:pb-16 transition-all"
      aria-label={`${name} Archive Introduction`}
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        {/* Breadcrumb nav: "Insights" / "[Name]" */}
        <div className="flex items-center justify-between pb-10 text-[14px] text-[#5F5D55]">
          <nav aria-label="Breadcrumb" className="flex items-center gap-2">
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
            <span className="text-[#86847A]" aria-hidden="true">
              /
            </span>
            <span className="text-[#1A1815] font-medium" aria-current="page">
              {name}
            </span>
          </nav>

          <a
            href="/insights"
            onClick={(e) => {
              if (onNavigateHome) {
                e.preventDefault();
                onNavigateHome();
              }
            }}
            className="hidden sm:inline-flex items-center gap-1.5 text-[14px] text-[#5F5D55] hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
          >
            <ArrowLeft size={15} aria-hidden="true" />
            <span>All insights</span>
          </a>
        </div>

        {/* Practice-linked extra link (Topic variant): 24px above */}
        {variant === 'topic' && practiceLink && (
          <div className="pb-6">
            <a
              href={practiceLink.url}
              className="group inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] font-medium text-[#7A2142] hover:text-[#16233F] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
            >
              <span className="text-roll">
                <span className="text-roll-stack">
                  <span>Explore our {practiceLink.name} practice</span>
                  <span>Explore our {practiceLink.name} practice</span>
                </span>
              </span>
              <ArrowRight
                size={16}
                className="transition-transform group-hover:translate-x-1"
                aria-hidden="true"
              />
            </a>
          </div>
        )}

        {/* Hero layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-6 lg:gap-8 items-start">
          {/* Author Variant: Monogram or portrait */}
          {variant === 'author' && authorMeta && (
            <div className="lg:col-span-2 shrink-0 pb-4 lg:pb-0">
              <div className="w-24 h-24 sm:w-28 sm:h-28 lg:w-[120px] lg:h-[120px] bg-[#16233F] overflow-hidden select-none flex items-center justify-center relative">
                <div className="absolute inset-0 bg-kuba opacity-[0.06] pointer-events-none" />
                <span className="relative z-10 font-serif text-[32px] sm:text-[38px] lg:text-[42px] font-semibold text-[#C6A455] tracking-wider">
                  {authorMeta.initials}
                </span>
              </div>
            </div>
          )}

          {/* Title & description stack */}
          <div
            className={
              variant === 'author'
                ? 'lg:col-span-10 space-y-4'
                : 'lg:col-span-8 space-y-4'
            }
          >
            {/* Archive eyebrow label with gold diamonds */}
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>{eyebrowLabel}</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            </div>

            {/* H1: display serif 64/72 desktop, 48/56 tablet, 36/44 mobile */}
            <h1 className="font-serif text-[36px] sm:text-[48px] lg:text-[64px] leading-[1.12] text-[#16233F] tracking-tight">
              {name}
            </h1>

            {/* Author variant: Role & Profile link */}
            {variant === 'author' && authorMeta && (
              <div className="pt-1 flex flex-wrap items-center gap-4 text-[15px]">
                <span className="text-[#1A1815] font-medium">{authorMeta.role}</span>
                <span className="text-[#86847A]" aria-hidden="true">
                  ·
                </span>
                <a
                  href={`/our-team/${authorMeta.slug || 'partner'}`}
                  className="inline-flex items-center gap-1.5 text-[#7A2142] hover:text-[#16233F] font-medium transition-colors"
                >
                  <span>View full profile</span>
                  <ArrowUpRight size={15} aria-hidden="true" />
                </a>
              </div>
            )}

            {/* Description: 24px below H1 */}
            {!isDescriptionPlaceholder && (
              <p className="pt-2 text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.6] text-[#1A1815]/85 max-w-2xl">
                {description}
              </p>
            )}

            {/* Count line: 24px below description (hidden in empty state) */}
            {countDisplay && (
              <div className="pt-2 text-[14px] text-[#5F5D55] font-medium tracking-wide">
                {countDisplay}
              </div>
            )}
          </div>
        </div>

        {/* Bottom rule: 1px Ink Charcoal 12% */}
        <div className="mt-12 sm:mt-14 lg:mt-16 w-full h-[1px] bg-[#1A1815]/12" />
      </div>
    </section>
  );
};
