import React from 'react';

interface HomePartnersProps {
  onNavigate?: (path: string) => void;
}

export const HomePartners: React.FC<HomePartnersProps> = ({ onNavigate }) => {
  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const partners = [
    {
      name: 'Titus Wanjohi Mundui',
      title: 'PARTNER',
      slug: 'titus-wanjohi-mundui',
      initials: 'TWM',
      photoPath: '/images/people/titus-wanjohi-mundui.jpg',
    },
    {
      name: 'Donald Gitau Murai',
      title: 'PARTNER',
      slug: 'donald-gitau-murai',
      initials: 'DGM',
      photoPath: '/images/people/donald-gitau-murai.jpg',
    },
    {
      name: 'Mwende Mwaniki',
      title: 'PARTNER',
      slug: 'mwende-mwaniki',
      initials: 'MM',
      photoPath: '/images/people/mwende-mwaniki.jpg',
    },
  ];

  return (
    <section
      className="w-full bg-[#FDFCF8] text-[#1A1815] pt-[97px] pb-[110px]"
      aria-label="Meet the partners"
    >
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        {/* Top 1px #86847A Rule */}
        <div className="w-full h-[1px] bg-[#86847A] mb-[38px]" aria-hidden="true" />

        {/* Header Row: H2 left, OUR TEAM right */}
        <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-4 mb-[48px] lg:mb-[64px]">
          <h2 className="font-['Newsreader',serif] text-[48px] sm:text-[60px] lg:text-[76px] leading-[1] font-normal tracking-[-0.02em] text-[#16233F]">
            Meet the partners
          </h2>

          <a
            href="/our-team"
            onClick={(e) => handleLinkClick(e, '/our-team')}
            className="group inline-flex flex-col items-start sm:items-end text-[12px] font-semibold uppercase tracking-[0.08em] text-[#16233F] font-['Instrument_Sans',sans-serif] focus-visible:outline-2 focus-visible:outline-[#16233F]"
          >
            <span className="hover:text-[#7A2142] transition-colors">OUR TEAM</span>
            <span className="w-full h-[2px] bg-[#16233F] mt-[6px]" aria-hidden="true" />
          </a>
        </div>

        {/* 3 Partner Columns: each 416px wide, 32px gap at 1440px wide */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {partners.map((partner) => (
            <a
              key={partner.slug}
              href={`/our-team/${partner.slug}`}
              onClick={(e) => handleLinkClick(e, `/our-team/${partner.slug}`)}
              className="group block w-full focus-visible:outline-2 focus-visible:outline-[#16233F]"
              aria-label={`${partner.name}, ${partner.title}`}
            >
              {/* Portrait Box: 416 x 520px (4:5 ratio) */}
              <div className="relative w-full aspect-[4/5] bg-[#16233F] overflow-hidden">
                <div className="w-full h-full flex flex-col items-center justify-center p-8 transition-transform duration-700 ease-out group-hover:scale-[1.03]">
                  {/* Faint logo mark (8% opacity) behind */}
                  <div
                    className="absolute inset-0 flex items-center justify-center opacity-[0.08] pointer-events-none"
                    aria-hidden="true"
                  >
                    <img
                      src="/brand/mmm-mark.svg"
                      alt=""
                      className="w-[280px] h-auto object-contain"
                    />
                  </div>

                  {/* Centred initials in Newsreader 96px #C6A455 */}
                  <div className="relative z-10 font-['Newsreader',serif] text-[72px] sm:text-[96px] text-[#C6A455] font-normal tracking-wide select-none">
                    {partner.initials}
                  </div>
                </div>
              </div>

              {/* 32px below box: 1px #86847A rule */}
              <div className="w-full h-[1px] bg-[#86847A] mt-[32px] mb-[18px]" aria-hidden="true" />

              {/* 18px below: Partner Name (Newsreader 24px, #16233F) */}
              <h3 className="font-['Newsreader',serif] text-[24px] leading-[1.2] font-normal text-[#16233F] group-hover:text-[#7A2142] transition-colors mb-[12px]">
                {partner.name}
              </h3>

              {/* 12px below: Title line (Instrument Sans 12px, 500, uppercase, letter-spacing 0.1em) */}
              <p className="text-[12px] font-medium uppercase tracking-[0.1em] text-[#1A1815] font-['Instrument_Sans',sans-serif]">
                {partner.title}
              </p>
            </a>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HomePartners;
