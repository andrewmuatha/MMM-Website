import React from 'react';
import { motion, useReducedMotion } from 'motion/react';
import { ImageSlot } from '../../components/ImageSlot';

interface HomeHeroProps {
  onNavigate?: (path: string) => void;
}

export const HomeHero: React.FC<HomeHeroProps> = ({ onNavigate }) => {
  const shouldReduceMotion = useReducedMotion();

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const lineVariants = {
    hidden: { opacity: 0, y: shouldReduceMotion ? 0 : 24 },
    visible: (i: number) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: shouldReduceMotion ? 0.01 : 0.65,
        delay: shouldReduceMotion ? 0 : 0.15 + i * 0.09,
        ease: [0.22, 1, 0.36, 1] as const,
      },
    }),
  };

  return (
    <section
      className="relative w-full h-[807px] overflow-hidden bg-[#FDFCF8] flex flex-col justify-end pb-[110px]"
      aria-label="Welcome to MMM Advocates"
    >
      {/* Background: Nairobi skyline at dusk + paper wash */}
      <div className="absolute inset-0 pointer-events-none z-0">
        <ImageSlot
          src="/images/home-hero-nairobi.jpg"
          alt="Nairobi skyline at dusk"
          filename="home-hero-nairobi.jpg"
          className="w-full h-full object-cover object-center opacity-40"
          loading="eager"
        />
        {/* Paper Wash */}
        <div
          className="absolute inset-0"
          style={{
            background:
              'linear-gradient(to bottom, rgba(253,252,248,0.78) 0%, rgba(253,252,248,0.62) 100%)',
          }}
          aria-hidden="true"
        />
      </div>

      {/* Main Content Container: x=64 to x=1376 */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-end">
          {/* Left Column from x=64, max-width ~700px */}
          <div className="lg:col-span-8 max-w-[700px]">
            {/* Eyebrow */}
            <motion.div
              initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: shouldReduceMotion ? 0.01 : 0.5, delay: shouldReduceMotion ? 0 : 0.05 }}
              className="text-[13px] font-semibold uppercase tracking-[0.08em] text-[#7A2142] font-['Instrument_Sans',sans-serif] mb-[28px]"
            >
              MASTER MANAGE MULTIPLY
            </motion.div>

            {/* H1: Exactly three lines */}
            <h1 className="font-['Newsreader',serif] text-[52px] sm:text-[76px] lg:text-[104px] leading-[0.93] font-normal tracking-[-0.02em] text-[#16233F]">
              <motion.span
                custom={0}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block"
              >
                Clear counsel for
              </motion.span>
              <motion.span
                custom={1}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block"
              >
                consequential
              </motion.span>
              <motion.span
                custom={2}
                initial="hidden"
                animate="visible"
                variants={lineVariants}
                className="block"
              >
                decisions.
              </motion.span>
            </h1>
          </div>

          {/* Right Column from x=1072, 304px wide */}
          <motion.div
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: shouldReduceMotion ? 0.01 : 0.65, delay: shouldReduceMotion ? 0 : 0.45 }}
            className="lg:col-span-4 lg:col-start-9 w-full lg:max-w-[304px] space-y-[40px] mb-2"
          >
            {/* Paragraph */}
            <p className="font-['Newsreader',serif] font-normal text-[18px] leading-[29px] text-[#1A1815] [font-variation-settings:'opsz'_16]">
              MMM Advocates advises businesses, institutions and individuals across
              Kenya with grounded judgement and practical commercial focus.
            </p>

            {/* Stacked CTA Buttons */}
            <div className="flex flex-col space-y-[16px]">
              <a
                href="/practice-areas"
                onClick={(e) => handleLinkClick(e, '/practice-areas')}
                className="inline-flex items-center justify-center w-[155px] h-[40px] bg-[#16233F] hover:bg-[#7A2142] text-[#FDFCF8] text-[12px] font-semibold uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] transition-colors rounded-none focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                OUR PRACTICES
              </a>

              <a
                href="/contact"
                onClick={(e) => handleLinkClick(e, '/contact')}
                className="inline-flex items-center justify-center w-[137px] h-[42px] bg-transparent border border-[#1A1815] hover:bg-[#16233F] hover:text-[#FDFCF8] text-[#16233F] text-[12px] font-semibold uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] transition-colors rounded-none focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                CONTACT US
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default HomeHero;
