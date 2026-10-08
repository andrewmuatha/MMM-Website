import React from 'react';
import { ArrowDownToLine, ArrowRight } from 'lucide-react';
import { InsightItem } from '../types/cms';

interface PublicationsStripProps {
  publications: InsightItem[];
  sectionNumber?: string; // e.g. "03" or "02"
  onSelectArticle?: (article: InsightItem) => void;
}

export const PublicationsStrip: React.FC<PublicationsStripProps> = ({
  publications,
  sectionNumber = '03',
  onSelectArticle,
}) => {
  // If no published items in Publications category, hide entirely (no empty library)
  if (!publications || publications.length === 0) {
    return null;
  }

  // Take up to 4 newest publications
  const items = publications.slice(0, 4);

  return (
    <section
      className="bg-[#F6F3EC] py-16 sm:py-22 lg:py-28 transition-colors"
      aria-label="Publications library"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        {/* Header row */}
        <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-10">
          <div className="space-y-4">
            {/* Section label: "03 // Publications" */}
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-medium">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>{sectionNumber}</span>
              <span className="text-[#C6A455]" aria-hidden="true">//</span>
              <span>Publications</span>
            </div>

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#16233F]">
              From the library.
            </h2>
          </div>

          <a
            href="/insights/category/publications"
            className="group inline-flex items-center gap-2 text-[14px] uppercase tracking-[0.08em] font-medium text-[#16233F] hover:text-[#7A2142] transition-colors self-start md:self-end focus-visible:outline-2 focus-visible:outline-[#16233F]"
          >
            <span className="text-roll">
              <span className="text-roll-stack">
                <span>View all publications</span>
                <span>View all publications</span>
              </span>
            </span>
            <ArrowRight size={16} className="transition-transform group-hover:translate-x-1" aria-hidden="true" />
          </a>
        </div>

        {/* Publications Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {items.map((item) => {
            const pub = item.publicationDetails;
            const fileSize = pub?.fileSize || '3.2 MB';
            const pages = pub?.pages || 48;

            return (
              <article key={item.id} className="group flex flex-col justify-between">
                <div>
                  {/* Cover 1:1.414 (standard ISO A4) with 1px Ink Charcoal 12% border, no shadow */}
                  <a
                    href={`/insights/${item.slug}`}
                    onClick={(e) => {
                      if (onSelectArticle) {
                        e.preventDefault();
                        onSelectArticle(item);
                      }
                    }}
                    className="block relative aspect-[1/1.414] bg-[#16233F] border border-[#1A1815]/12 overflow-hidden transition-transform duration-500 group-hover:-translate-y-1.5 focus-visible:outline-2 focus-visible:outline-[#16233F]"
                    tabIndex={-1}
                    aria-hidden="true"
                  >
                    {item.heroImage ? (
                      <img
                        src={item.heroImage}
                        alt=""
                        className="w-full h-full object-cover opacity-90 transition-transform duration-700 group-hover:scale-105"
                        loading="lazy"
                      />
                    ) : (
                      <div className="w-full h-full bg-[#16233F] flex flex-col justify-between p-6">
                        <div className="w-8 h-8 bg-[#C6A455]/20 flex items-center justify-center text-[#C6A455] font-serif text-[13px] font-bold">
                          MMM
                        </div>
                        <div className="space-y-2">
                          <span className="text-[11px] uppercase tracking-[0.14em] text-[#C6A455]">
                            Research Report
                          </span>
                          <p className="font-serif text-[16px] text-[#FDFCF8] leading-tight line-clamp-3">
                            {item.title}
                          </p>
                        </div>
                      </div>
                    )}

                    {/* PDF Badge watermark */}
                    <div className="absolute top-3 right-3 px-2 py-1 bg-[#16233F]/85 backdrop-blur-xs text-[#FDFCF8] text-[10px] uppercase tracking-wider font-semibold">
                      PDF · {pages}P
                    </div>
                  </a>

                  {/* 20px gap to title */}
                  <div className="pt-5">
                    <h3 className="font-serif text-[22px] leading-[1.36] text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                      <a
                        href={`/insights/${item.slug}`}
                        onClick={(e) => {
                          if (onSelectArticle) {
                            e.preventDefault();
                            onSelectArticle(item);
                          }
                        }}
                        className="focus-visible:outline-2 focus-visible:outline-[#16233F]"
                      >
                        {item.title}
                      </a>
                    </h3>

                    {/* 8px gap to meta */}
                    <p className="pt-2 text-[14px] text-[#5F5D55]">
                      <time dateTime={item.publishedAt}>{item.displayDate}</time>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>PDF</span>
                      <span className="mx-1.5" aria-hidden="true">·</span>
                      <span>{fileSize}</span>
                    </p>
                  </div>
                </div>

                {/* 16px gap to Download Link */}
                <div className="pt-4">
                  <a
                    href={pub?.pdfUrl || '#'}
                    download
                    aria-label={`Download ${item.title}, PDF, ${fileSize}`}
                    className="inline-flex items-center gap-2 text-[13px] uppercase tracking-[0.08em] font-medium text-[#16233F] hover:text-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
                  >
                    <ArrowDownToLine size={15} aria-hidden="true" />
                    <span>Download PDF</span>
                  </a>
                </div>
              </article>
            );
          })}
        </div>
      </div>
    </section>
  );
};
