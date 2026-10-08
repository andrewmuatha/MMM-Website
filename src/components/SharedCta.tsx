import React from 'react';
import { ArrowUpRight, Phone } from 'lucide-react';

interface SharedCtaProps {
  headline?: string;
  className?: string;
}

export const SharedCta: React.FC<SharedCtaProps> = ({
  headline = 'Have a matter to discuss?',
  className = '',
}) => {
  return (
    <section
      className={`relative bg-[#16233F] text-[#FDFCF8] overflow-hidden py-16 sm:py-24 lg:py-28 ${className}`}
      aria-label="Contact call to action"
    >
      {/* Background Kuba architectural pattern */}
      <div className="absolute inset-0 bg-kuba opacity-[0.05] pointer-events-none" />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
          {/* Left Column: Heading and copy */}
          <div className="lg:col-span-7 space-y-5">
            {/* Unnumbered label with gold diamonds */}
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#FDFCF8]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>Get in touch</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            </div>

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#FDFCF8] tracking-tight">
              {headline}
            </h2>

            <p className="text-[16px] sm:text-[18px] lg:text-[20px] leading-[1.6] text-[#FDFCF8]/85 max-w-xl">
              Call us or send a short note about your matter through our enquiry form.
            </p>
          </div>

          {/* Right Column: CTA Buttons and Direct Phone */}
          <div className="lg:col-span-5 flex flex-col sm:flex-row lg:flex-col items-start gap-5 lg:items-end justify-center">
            {/* Start an enquiry button: gold fill, navy text, 52px tall (48px mobile), 0 radius, text-roll hover */}
            <a
              href="/contact"
              className="group relative inline-flex items-center justify-center h-[48px] sm:h-[52px] px-8 bg-[#C6A455] text-[#16233F] text-[14px] uppercase tracking-[0.08em] font-semibold transition-all hover:bg-[#d6b465] focus-visible:outline-2 focus-visible:outline-[#C6A455] focus-visible:outline-offset-3"
            >
              <span className="text-roll mr-2">
                <span className="text-roll-stack">
                  <span>Start an enquiry</span>
                  <span>Start an enquiry</span>
                </span>
              </span>
              <ArrowUpRight
                size={18}
                className="transition-transform group-hover:translate-x-1 group-hover:-translate-y-1"
                aria-hidden="true"
              />
            </a>

            {/* Direct Phone Link */}
            <a
              href="tel:+254713874830"
              className="inline-flex items-center gap-2.5 text-[15px] sm:text-[16px] text-[#FDFCF8]/90 hover:text-[#C6A455] transition-colors py-2 focus-visible:outline-2 focus-visible:outline-[#C6A455]"
            >
              <Phone size={16} className="text-[#C6A455]" aria-hidden="true" />
              <span className="font-medium tracking-wide">+254 713 874 830</span>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
};
