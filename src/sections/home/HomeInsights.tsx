import React, { useState } from 'react';
import { ArrowRight, Check } from 'lucide-react';
import { ImageSlot } from '../../components/ImageSlot';

interface HomeInsightsProps {
  onNavigate?: (path: string) => void;
}

export const HomeInsights: React.FC<HomeInsightsProps> = ({ onNavigate }) => {
  const [email, setEmail] = useState('');
  const [clientAlertsChecked, setClientAlertsChecked] = useState(true);
  const [eventsChecked, setEventsChecked] = useState(false);
  const [subscribeMessage, setSubscribeMessage] = useState(false);

  const handleLinkClick = (e: React.MouseEvent<HTMLAnchorElement>, path: string) => {
    if (onNavigate) {
      e.preventDefault();
      onNavigate(path);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleSubscribeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubscribeMessage(true);
  };

  const updateRows = [
    {
      meta: 'CATEGORY',
      title: 'Legal updates',
      path: '/insights/category/legal-updates',
    },
    {
      meta: 'CATEGORY',
      title: 'Client alerts',
      path: '/insights/category/client-alerts',
    },
    {
      meta: 'CATEGORY',
      title: 'Publications',
      path: '/insights/category/publications',
    },
  ];

  return (
    <section
      className="relative w-full bg-[#F8FAFC] text-[#1A1815] pb-[60px]"
      aria-label="Commercial Insights & Briefings"
    >
      {/* Top 62px Paper Bar with 1px Gold Rule at y=62 */}
      <div className="w-full bg-[#FDFCF8] h-[62px]">
        <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 h-full flex items-end">
          <div className="w-full h-[1px] bg-[#C6A455]" aria-hidden="true" />
        </div>
      </div>

      {/* Main Section Header Area */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16 pt-[33px] pb-[40px]">
        <h2 className="font-['Newsreader',serif] text-[48px] sm:text-[64px] lg:text-[80px] leading-[1.1] sm:leading-[1.25] font-normal tracking-tight text-[#16233F]">
          Commercial Insights &amp;
          <br />
          Briefings
        </h2>
      </div>

      {/* Content Layout: Left 760px Feature, Right 452px Updates & Subscribe Panel */}
      <div className="w-full max-w-[1440px] mx-auto px-5 sm:px-10 lg:px-16">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-16 items-start">
          {/* Left Feature: 760px wide on desktop (span 7 cols) */}
          <div className="lg:col-span-7 w-full max-w-[760px]">
            {/* Skyline Image: 760 x 428px */}
            <div className="w-full aspect-[760/428] overflow-hidden bg-[#16233F]">
              <ImageSlot
                src="/images/home-insights.jpg"
                alt="Nairobi commercial skyline"
                filename="home-insights.jpg"
                className="w-full h-full object-cover"
              />
            </div>

            {/* Solid #C6A455 Gold Block directly below */}
            <div className="w-full bg-[#C6A455] p-8 sm:p-12 lg:px-12 lg:pt-[37px] lg:pb-[48px] text-[#16233F]">
              {/* Meta line: Instrument Sans 12px, 500, letter-spacing 0.08em */}
              <div className="text-[12px] font-medium uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] text-[#1A1815] mb-[32px]">
                INSIGHTS · COMING SOON
              </div>

              {/* Heading: Newsreader 64px, line-height 76px */}
              <h3 className="font-['Newsreader',serif] text-[36px] sm:text-[48px] lg:text-[60px] leading-[1.15] lg:leading-[1.2] font-normal text-[#16233F] mb-[36px]">
                Legal updates and client alerts from the firm.
              </h3>

              {/* Paragraph: Instrument Sans 18px, line-height 28px, #3A3835, max width 690px */}
              <p className="text-[16px] sm:text-[18px] leading-[28px] text-[#3A3835] font-['Instrument_Sans',sans-serif] max-w-[690px] mb-[36px]">
                Briefings, client alerts and publications from MMM Advocates will appear here.
              </p>

              {/* Action Link: Instrument Sans 13px, 600 */}
              <a
                href="/insights"
                onClick={(e) => handleLinkClick(e, '/insights')}
                className="group inline-flex items-center gap-2 text-[13px] font-semibold uppercase tracking-[0.08em] text-[#16233F] font-['Instrument_Sans',sans-serif] hover:text-[#7A2142] transition-colors"
              >
                <span>VISIT INSIGHTS</span>
                <ArrowRight size={15} className="transition-transform group-hover:translate-x-1" />
              </a>
            </div>
          </div>

          {/* Right Column: Latest Updates rows + Subscribe Panel */}
          <div className="lg:col-span-5 w-full max-w-[452px] space-y-12">
            {/* Updates Header Label */}
            <div>
              <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#1A1815] font-['Instrument_Sans',sans-serif] mb-6">
                LATEST UPDATES
              </div>

              {/* 3 Rows */}
              <div className="divide-y divide-[#D5D8DE] border-t border-b border-[#D5D8DE]">
                {updateRows.map((row) => (
                  <a
                    key={row.title}
                    href={row.path}
                    onClick={(e) => handleLinkClick(e, row.path)}
                    className="group block py-5 transition-colors hover:bg-white/40"
                  >
                    <div className="text-[11px] font-semibold uppercase tracking-[0.08em] text-[#7A2142] font-['Instrument_Sans',sans-serif] mb-2">
                      {row.meta}
                    </div>
                    <h4 className="font-['Newsreader',serif] text-[24px] sm:text-[28px] leading-[34px] font-normal text-[#16233F] group-hover:text-[#7A2142] transition-colors">
                      {row.title}
                    </h4>
                  </a>
                ))}
              </div>
            </div>

            {/* Subscribe Panel: 452px wide, bg #F7F3E7, 1px border #D5CCC4, 32px padding */}
            <div className="w-full bg-[#F7F3E7] border border-[#D5CCC4] p-8 space-y-5">
              <div className="text-[12px] font-semibold uppercase tracking-[0.1em] text-[#7A2142] font-['Instrument_Sans',sans-serif]">
                NEWSLETTER
              </div>

              <h4 className="font-['Newsreader',serif] text-[28px] sm:text-[30px] leading-[36px] font-normal text-[#16233F]">
                Subscribe to updates
              </h4>

              <p className="text-[14px] leading-[23px] text-[#3A3835] font-['Instrument_Sans',sans-serif]">
                Selected legal updates and client alerts from MMM Advocates.
              </p>

              <form onSubmit={handleSubscribeSubmit} className="space-y-4 pt-2">
                <div>
                  <label
                    htmlFor="subscribe-email"
                    className="block text-[10px] font-semibold uppercase tracking-[0.1em] text-[#1A1815] font-['Instrument_Sans',sans-serif] mb-2"
                  >
                    EMAIL ADDRESS
                  </label>
                  <input
                    id="subscribe-email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="Your email address"
                    required
                    className="w-full h-[56px] px-4 bg-white border border-[#86847A] text-[14px] font-['Instrument_Sans',sans-serif] text-[#1A1815] placeholder-[#86847A] focus:outline-none focus:border-[#16233F] rounded-none"
                  />
                </div>

                {/* Checkboxes */}
                <div className="space-y-2.5 pt-2">
                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={clientAlertsChecked}
                      onChange={(e) => setClientAlertsChecked(e.target.checked)}
                      className="w-4 h-4 rounded-none accent-[#6B1E3F]"
                    />
                    <span className="text-[14px] text-[#1A1815] font-['Instrument_Sans',sans-serif]">
                      Client alerts and legal updates
                    </span>
                  </label>

                  <label className="flex items-center gap-3 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={eventsChecked}
                      onChange={(e) => setEventsChecked(e.target.checked)}
                      className="w-4 h-4 rounded-none accent-[#6B1E3F]"
                    />
                    <span className="text-[14px] text-[#1A1815] font-['Instrument_Sans',sans-serif]">
                      Events and roundtables
                    </span>
                  </label>
                </div>

                {/* Consent text */}
                <p className="text-[12px] leading-[18px] text-[#5F5D55] font-['Instrument_Sans',sans-serif] pt-1">
                  By subscribing you agree to us processing your details under the Kenya Data
                  Protection Act 2019. Unsubscribe at any time.
                </p>

                {/* Full-width navy button 48px tall */}
                <button
                  type="submit"
                  className="w-full h-[48px] bg-[#16233F] hover:bg-[#7A2142] text-[#FDFCF8] text-[12px] font-semibold uppercase tracking-[0.08em] font-['Instrument_Sans',sans-serif] transition-colors rounded-none mt-3"
                >
                  SUBSCRIBE
                </button>

                {subscribeMessage && (
                  <p className="text-[13px] text-[#6B1E3F] font-['Instrument_Sans',sans-serif] pt-2">
                    Subscriptions open soon. In the meantime, call +254 713 874 830.
                  </p>
                )}
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HomeInsights;
