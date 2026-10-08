import React, { useState, useEffect } from 'react';
import {
  ArrowDownToLine,
  ChevronLeft,
  ChevronRight,
  FileText,
  Play,
  Volume2,
  X,
} from 'lucide-react';
import { FootnoteItem, GalleryImage, RichContentBlock } from '../../types/cms';

interface RichContentRendererProps {
  blocks: RichContentBlock[];
  footnotes?: FootnoteItem[];
  onHeadingEnter?: (headingId: string) => void;
  onWideMediaIntersect?: (intersecting: boolean) => void;
}

export const RichContentRenderer: React.FC<RichContentRendererProps> = ({
  blocks,
  footnotes,
  onWideMediaIntersect,
}) => {
  // Gallery Lightbox state
  const [activeGallery, setActiveGallery] = useState<{
    images: GalleryImage[];
    index: number;
  } | null>(null);

  // Video embed states (loaded video IDs)
  const [loadedVideos, setLoadedVideos] = useState<Record<number, boolean>>({});

  // Lightbox keyboard controls
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!activeGallery) return;
      if (e.key === 'Escape') {
        setActiveGallery(null);
      } else if (e.key === 'ArrowRight') {
        setActiveGallery((prev) =>
          prev ? { ...prev, index: (prev.index + 1) % prev.images.length } : null
        );
      } else if (e.key === 'ArrowLeft') {
        setActiveGallery((prev) =>
          prev
            ? { ...prev, index: (prev.index - 1 + prev.images.length) % prev.images.length }
            : null
        );
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeGallery]);

  return (
    <div className="article-body">
      {blocks.map((block, index) => {
        switch (block.type) {
          case 'paragraph':
            return (
              <p
                key={index}
                className="text-[17px] sm:text-[18px] lg:text-[19px] leading-[28px] sm:leading-[30px] lg:leading-[32px] text-[#1A1815] mb-6 max-w-[680px]"
              >
                {block.text}
              </p>
            );

          case 'h2':
            return (
              <div key={index} className="pt-12 sm:pt-16 pb-5 max-w-[680px]">
                {/* 40px gold rule 24px above H2 */}
                <div className="w-10 h-[1px] bg-[#C6A455] mb-6" aria-hidden="true" />
                <h2
                  id={block.id}
                  tabIndex={-1}
                  className="article-h2 font-serif text-[28px] sm:text-[32px] lg:text-[36px] leading-[1.22] text-[#16233F] outline-none"
                >
                  {block.text}
                </h2>
              </div>
            );

          case 'h3':
            return (
              <h3
                key={index}
                className="text-[20px] sm:text-[21px] lg:text-[22px] leading-[28px] sm:leading-[29px] lg:leading-[30px] font-semibold text-[#16233F] mt-10 mb-3 max-w-[680px]"
              >
                {block.text}
              </h3>
            );

          case 'list-unordered':
            return (
              <ul
                key={index}
                className="my-6 pl-7 space-y-2.5 max-w-[680px] text-[17px] sm:text-[18px] lg:text-[19px] leading-[28px] sm:leading-[30px] lg:leading-[32px] text-[#1A1815]"
              >
                {block.items.map((item, i) => (
                  <li key={i} className="relative pl-3">
                    {/* 6px Premium Gold diamond marker vertically centered */}
                    <span
                      className="absolute left-[-16px] top-[11px] w-1.5 h-1.5 rotate-45 bg-[#C6A455]"
                      aria-hidden="true"
                    />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            );

          case 'list-ordered':
            return (
              <ol
                key={index}
                className="my-6 pl-7 space-y-2.5 max-w-[680px] list-decimal text-[17px] sm:text-[18px] lg:text-[19px] leading-[28px] sm:leading-[30px] lg:leading-[32px] text-[#1A1815] marker:font-medium marker:text-[#1A1815]"
              >
                {block.items.map((item, i) => (
                  <li key={i} className="pl-2">
                    {item}
                  </li>
                ))}
              </ol>
            );

          case 'blockquote':
            return (
              <figure
                key={index}
                className="my-10 pl-6 border-l-2 border-[#C6A455] max-w-[680px] print-avoid-break"
              >
                <blockquote className="text-[18px] leading-[30px] italic text-[#1A1815]/85">
                  “{block.quote}”
                </blockquote>
                {block.citation && (
                  <figcaption className="mt-3 text-[14px] text-[#5F5D55]">
                    — {block.citation}
                  </figcaption>
                )}
              </figure>
            );

          case 'pullquote':
            return (
              <figure
                key={index}
                onMouseEnter={() => onWideMediaIntersect && onWideMediaIntersect(true)}
                onMouseLeave={() => onWideMediaIntersect && onWideMediaIntersect(false)}
                className="my-14 sm:my-16 max-w-full lg:-mr-32 print-avoid-break"
              >
                {/* 2px Premium Gold rule 64px wide on top */}
                <div className="w-16 h-[2px] bg-[#C6A455] mb-7" aria-hidden="true" />
                <blockquote className="font-serif italic text-[24px] sm:text-[28px] lg:text-[32px] leading-[1.38] text-[#16233F]">
                  “{block.quote}”
                </blockquote>
                {block.attribution && (
                  <figcaption className="mt-5 text-[14px] uppercase tracking-[0.1em] text-[#5F5D55] font-medium">
                    {block.attribution}
                  </figcaption>
                )}
              </figure>
            );

          case 'takeaways':
            return (
              <aside
                key={index}
                aria-label={block.title || 'Key takeaways'}
                className="my-12 bg-[#F6F3EC] border-l-4 border-[#7A2142] p-8 sm:p-10 max-w-[680px] callout-box print-avoid-break"
              >
                <span className="text-[12px] uppercase tracking-[0.14em] text-[#7A2142] font-semibold block mb-5">
                  {block.title || 'Key takeaways'}
                </span>
                <ul className="space-y-3.5">
                  {block.items.map((item, i) => (
                    <li
                      key={i}
                      className="relative pl-5 text-[17px] sm:text-[18px] leading-[30px] text-[#1A1815]"
                    >
                      {/* 6px Rich Burgundy square marker */}
                      <span
                        className="absolute left-0 top-[11px] w-1.5 h-1.5 bg-[#7A2142]"
                        aria-hidden="true"
                      />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </aside>
            );

          case 'note':
            return (
              <aside
                key={index}
                aria-label="Note"
                className="my-10 border border-[#1A1815]/24 p-6 sm:p-7 max-w-[680px] bg-transparent callout-box print-avoid-break"
              >
                <span className="text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold block mb-2">
                  Note
                </span>
                <p className="text-[16px] leading-[26px] text-[#1A1815]">{block.text}</p>
              </aside>
            );

          case 'table': {
            const isWide = block.data.isWide;
            return (
              <div
                key={index}
                onMouseEnter={() => isWide && onWideMediaIntersect && onWideMediaIntersect(true)}
                onMouseLeave={() => isWide && onWideMediaIntersect && onWideMediaIntersect(false)}
                className={`my-12 print-avoid-break ${isWide ? 'lg:-mr-44 max-w-full' : 'max-w-[680px]'}`}
              >
                <div className="text-[15px] font-semibold text-[#16233F] mb-3">
                  {block.data.caption}
                </div>

                {/* Mobile scroll container */}
                <div
                  role="region"
                  aria-label={`${block.data.caption}, scrollable table`}
                  tabIndex={0}
                  className="overflow-x-auto relative no-scrollbar border-t-2 border-b border-[#1A1815]"
                >
                  <table className="w-full text-left border-collapse">
                    <thead>
                      <tr className="border-b border-[#1A1815]">
                        {block.data.headers.map((h, i) => (
                          <th
                            key={i}
                            scope="col"
                            className={`py-3.5 px-4 text-[12px] uppercase tracking-[0.08em] font-medium text-[#1A1815] ${
                              block.data.numericCols?.includes(i) ? 'text-right' : ''
                            }`}
                          >
                            {h}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#1A1815]/12">
                      {block.data.rows.map((row, rIndex) => (
                        <tr key={rIndex} className="hover:bg-[#F6F3EC]/50 transition-colors">
                          {row.map((cell, cIndex) => (
                            <td
                              key={cIndex}
                              className={`py-3.5 px-4 text-[15px] leading-[24px] text-[#1A1815] ${
                                block.data.numericCols?.includes(cIndex)
                                  ? 'text-right tabular-nums'
                                  : ''
                              }`}
                            >
                              {cell}
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                {block.data.source && (
                  <p className="mt-3 text-[13px] text-[#5F5D55]">Source: {block.data.source}</p>
                )}
              </div>
            );
          }

          case 'figure':
            return (
              <figure
                key={index}
                className={`my-12 print-avoid-break ${
                  block.width === 'wide' ? 'lg:-mr-40 max-w-full' : 'max-w-[680px]'
                }`}
              >
                <div className="overflow-hidden bg-[#16233F]">
                  <img
                    src={block.url}
                    alt={block.caption}
                    className="w-full h-auto object-cover max-h-[70vh]"
                    loading="lazy"
                  />
                </div>
                {(block.caption || block.credit) && (
                  <figcaption className="mt-3 text-[14px] leading-[22px] text-[#5F5D55] max-w-[680px]">
                    {block.caption}
                    {block.credit && (
                      <span className="text-[#5F5D55]/80"> Photo: {block.credit}</span>
                    )}
                  </figcaption>
                )}
              </figure>
            );

          case 'video': {
            const isVideoLoaded = loadedVideos[index];
            return (
              <figure key={index} className="my-12 max-w-[680px] print-avoid-break">
                <div className="relative aspect-[16/9] bg-[#16233F] overflow-hidden">
                  {isVideoLoaded ? (
                    <iframe
                      src={`${block.data.embedUrl}?autoplay=1`}
                      title={block.data.videoTitle}
                      allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                      allowFullScreen
                      className="w-full h-full border-0"
                    />
                  ) : (
                    <div className="relative w-full h-full group">
                      <img
                        src={block.data.posterUrl}
                        alt={block.data.videoTitle}
                        className="w-full h-full object-cover opacity-85"
                      />
                      <div className="absolute inset-0 flex flex-col items-center justify-center p-4">
                        <button
                          type="button"
                          onClick={() => setLoadedVideos({ ...loadedVideos, [index]: true })}
                          className="w-[72px] h-[72px] bg-[#16233F] hover:bg-[#7A2142] text-[#C6A455] flex items-center justify-center transition-colors focus-visible:outline-2 focus-visible:outline-[#C6A455]"
                          aria-label={`Play video: ${block.data.videoTitle}`}
                        >
                          <Play size={28} fill="#C6A455" className="ml-1" aria-hidden="true" />
                        </button>
                        <p className="mt-3 text-[12px] text-[#FDFCF8]/90 bg-[#16233F]/80 px-3 py-1">
                          Playing this video loads content from {block.data.platform}.
                        </p>
                      </div>
                    </div>
                  )}
                </div>
                {block.caption && (
                  <figcaption className="mt-3 text-[14px] leading-[22px] text-[#5F5D55]">
                    {block.caption}
                  </figcaption>
                )}
              </figure>
            );
          }

          case 'gallery':
            return (
              <div
                key={index}
                onMouseEnter={() => onWideMediaIntersect && onWideMediaIntersect(true)}
                onMouseLeave={() => onWideMediaIntersect && onWideMediaIntersect(false)}
                className="my-14 lg:-mr-40 max-w-full print-avoid-break"
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {block.images.map((img, imgIdx) => (
                    <button
                      key={imgIdx}
                      type="button"
                      onClick={() => setActiveGallery({ images: block.images, index: imgIdx })}
                      className="group relative aspect-[3/2] overflow-hidden bg-[#16233F] text-left focus-visible:outline-2 focus-visible:outline-[#16233F]"
                    >
                      <img
                        src={img.url}
                        alt={img.caption}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                      />
                      <div className="absolute inset-0 bg-[#16233F]/20 opacity-0 group-hover:opacity-100 transition-opacity flex items-end p-3">
                        <span className="text-[12px] text-[#FDFCF8] font-medium bg-[#16233F]/80 px-2 py-1">
                          View image
                        </span>
                      </div>
                    </button>
                  ))}
                </div>
              </div>
            );

          case 'audio':
            return (
              <aside
                key={index}
                aria-label={block.title}
                className="my-10 border border-[#1A1815]/16 p-6 max-w-[680px] bg-transparent print-avoid-break"
              >
                <div className="flex items-center gap-3 mb-2">
                  <Volume2 size={20} className="text-[#16233F]" aria-hidden="true" />
                  <span className="text-[17px] font-semibold text-[#16233F]">{block.title}</span>
                </div>
                <div className="text-[13px] text-[#5F5D55] mb-4">Duration: {block.duration}</div>
                <audio controls preload="none" className="w-full mb-3">
                  <source src={block.audioUrl} type="audio/mpeg" />
                  Your browser does not support the audio element.
                </audio>
                {block.transcriptUrl && (
                  <a
                    href={block.transcriptUrl}
                    className="text-[13px] uppercase tracking-[0.08em] font-medium text-[#7A2142] underline hover:text-[#16233F]"
                  >
                    Read the transcript
                  </a>
                )}
              </aside>
            );

          case 'divider':
            return (
              <div key={index} className="my-14 flex items-center justify-center max-w-[680px]">
                <span className="w-20 h-[1px] bg-[#1A1815]/12" aria-hidden="true" />
                <span className="mx-4 w-2 h-2 rotate-45 bg-[#C6A455]" aria-hidden="true" />
                <span className="w-20 h-[1px] bg-[#1A1815]/12" aria-hidden="true" />
              </div>
            );

          case 'pdf-block':
            return (
              <div
                key={index}
                className="my-10 border border-[#1A1815]/16 p-6 sm:p-7 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-6 max-w-[680px] print-avoid-break"
              >
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-[#16233F] text-[#C6A455] flex items-center justify-center shrink-0">
                    <FileText size={20} aria-hidden="true" />
                  </div>
                  <div>
                    <h4 className="text-[18px] font-semibold text-[#16233F]">
                      {block.data.title || 'Publication Document'}
                    </h4>
                    {block.data.description && (
                      <p className="text-[15px] leading-[24px] text-[#5F5D55] mt-1">
                        {block.data.description}
                      </p>
                    )}
                    <p className="text-[13px] text-[#5F5D55] mt-2">
                      PDF · {block.data.fileSize} · {block.data.pages} pages
                    </p>
                  </div>
                </div>

                <a
                  href={block.data.pdfUrl}
                  download
                  aria-label={`Download ${block.data.title || 'Publication'}, PDF, ${block.data.fileSize}`}
                  className="group relative inline-flex items-center justify-center shrink-0 h-[48px] px-6 bg-[#16233F] text-[#FDFCF8] text-[13px] uppercase tracking-[0.08em] font-semibold hover:bg-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
                >
                  <span className="text-roll mr-2">
                    <span className="text-roll-stack">
                      <span>Download PDF</span>
                      <span>Download PDF</span>
                    </span>
                  </span>
                  <ArrowDownToLine size={16} aria-hidden="true" />
                </a>
              </div>
            );

          default:
            return null;
        }
      })}

      {/* 6.10 Footnotes and Sources */}
      {footnotes && footnotes.length > 0 && (
        <div id="sources-and-notes" className="pt-12 mt-12 border-t border-[#1A1815]/12 max-w-[680px]">
          <h2 className="font-serif text-[26px] sm:text-[30px] leading-[1.3] text-[#16233F] mb-6">
            Sources and notes
          </h2>
          <ol className="space-y-3 list-decimal pl-6 text-[15px] leading-[24px] text-[#5F5D55]">
            {footnotes.map((fn) => (
              <li key={fn.id} id={`fn-${fn.id}`} className="pl-2">
                <span>{fn.text} </span>
                <a
                  href={`#fnref-${fn.id}`}
                  aria-label={`Back to reference ${fn.id}`}
                  className="text-[#7A2142] font-semibold hover:underline"
                >
                  ↩
                </a>
              </li>
            ))}
          </ol>
        </div>
      )}

      {/* Gallery Lightbox Modal */}
      {activeGallery && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Gallery lightbox"
          className="fixed inset-0 z-50 bg-[#1A1815]/95 backdrop-blur-sm flex flex-col justify-between p-4 sm:p-8"
        >
          {/* Top Bar: Close button & Counter */}
          <div className="flex items-center justify-between text-[#FDFCF8]">
            <span className="text-[13px] uppercase tracking-wider text-[#C6A455]">
              {activeGallery.index + 1} of {activeGallery.images.length}
            </span>
            <button
              type="button"
              onClick={() => setActiveGallery(null)}
              className="p-2 text-[#FDFCF8] hover:text-[#C6A455] transition-colors focus-visible:outline-2 focus-visible:outline-[#C6A455]"
              aria-label="Close gallery"
            >
              <X size={26} />
            </button>
          </div>

          {/* Center Image Container with prev/next controls */}
          <div className="relative flex-grow flex items-center justify-center my-4 overflow-hidden">
            <button
              type="button"
              onClick={() =>
                setActiveGallery({
                  ...activeGallery,
                  index:
                    (activeGallery.index - 1 + activeGallery.images.length) %
                    activeGallery.images.length,
                })
              }
              className="absolute left-2 sm:left-6 p-3 bg-[#16233F]/80 text-[#FDFCF8] hover:bg-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#C6A455]"
              aria-label="Previous image"
            >
              <ChevronLeft size={24} />
            </button>

            <img
              src={activeGallery.images[activeGallery.index].url}
              alt={activeGallery.images[activeGallery.index].caption}
              className="max-h-[75vh] max-w-[90vw] object-contain shadow-2xl"
            />

            <button
              type="button"
              onClick={() =>
                setActiveGallery({
                  ...activeGallery,
                  index: (activeGallery.index + 1) % activeGallery.images.length,
                })
              }
              className="absolute right-2 sm:right-6 p-3 bg-[#16233F]/80 text-[#FDFCF8] hover:bg-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#C6A455]"
              aria-label="Next image"
            >
              <ChevronRight size={24} />
            </button>
          </div>

          {/* Bottom Caption */}
          <div className="text-center text-[#FDFCF8] text-[14px] max-w-xl mx-auto">
            <p>{activeGallery.images[activeGallery.index].caption}</p>
            {activeGallery.images[activeGallery.index].credit && (
              <span className="text-[#C6A455] text-[12px] block mt-1">
                Photo: {activeGallery.images[activeGallery.index].credit}
              </span>
            )}
          </div>
        </div>
      )}
    </div>
  );
};
