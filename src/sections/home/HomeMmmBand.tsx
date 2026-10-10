import React from 'react';
import { motion, useReducedMotion } from 'motion/react';

export const HomeMmmBand: React.FC = () => {
  const shouldReduceMotion = useReducedMotion();

  const columns = [
    {
      num: '01',
      title: 'Master',
      body: 'Rigorous legal thinking. Clear commercial advice.',
    },
    {
      num: '02',
      title: 'Manage',
      body: 'Direct conversations. Sound professional judgement.',
    },
    {
      num: '03',
      title: 'Multiply',
      body: 'Close working relationships. Advice that moves with clients.',
    },
  ];

  return (
    <section
      className="relative w-full h-auto lg:h-[456px] bg-[#162035] overflow-hidden select-none"
      aria-label="Firm Philosophy: Master, Manage, Multiply"
    >
      {/* Background: Woven mark scaled to ~1500px wide, centered */}
      <div
        className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-60 overflow-hidden"
        aria-hidden="true"
      >
        <img
          src="/brand/mmm-mark.svg"
          alt=""
          className="min-w-[1500px] w-[1500px] h-[456px] object-cover object-center"
        />
      </div>

      {/* Grid container: 3 columns, each 480px at 1440px wide, separated by 1px #C6A455 vertical rules */}
      <div className="relative z-10 w-full max-w-[1440px] mx-auto h-full flex flex-col lg:flex-row">
        {columns.map((col, index) => (
          <motion.div
            key={col.num}
            initial={{ opacity: 0, y: shouldReduceMotion ? 0 : 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-50px' }}
            transition={{
              duration: shouldReduceMotion ? 0.01 : 0.6,
              delay: shouldReduceMotion ? 0 : index * 0.15,
            }}
            className={`relative flex-1 h-full pt-[80px] lg:pt-[135px] pb-[80px] lg:pb-0 px-8 lg:px-[64px] ${
              index > 0 ? 'border-t lg:border-t-0 lg:border-l border-[#C6A455]' : ''
            }`}
          >
            {/* Number: Instrument Sans 11px, #C6A455 */}
            <div className="text-[11px] font-semibold tracking-[0.14em] text-[#C6A455] font-['Instrument_Sans',sans-serif] mb-[40px] lg:mb-[60px]">
              {col.num}
            </div>

            {/* Heading: Newsreader 34px, white */}
            <h2 className="font-['Newsreader',serif] text-[34px] font-normal leading-[1.2] text-[#FDFCF8] mb-[16px]">
              {col.title}
            </h2>

            {/* Paragraph: Newsreader text 19px, line-height 31px, white, max width 360px */}
            <p className="font-['Newsreader',serif] text-[19px] leading-[31px] text-[#FDFCF8] font-normal max-w-[360px] [font-variation-settings:'opsz'_16]">
              {col.body}
            </p>
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default HomeMmmBand;
