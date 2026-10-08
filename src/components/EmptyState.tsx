import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface EmptyStateProps {
  isNewsletterConnected?: boolean;
}

export const EmptyState: React.FC<EmptyStateProps> = ({
  isNewsletterConnected = true,
}) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!email || !emailRegex.test(email)) {
      setErrorMessage('Enter a valid email address.');
      return;
    }

    if (!consent) {
      setErrorMessage('Please confirm you agree to receive emails.');
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  return (
    <section
      className="bg-[#FDFCF8] pt-8 sm:pt-12 lg:pt-16 pb-16 sm:pb-24 lg:pb-[120px] transition-all"
      aria-label="Insights announcement"
    >
      <div className="max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-y-10">
          {/* Text stack: cols 1 to 7 on 1440 */}
          <div className="lg:col-span-7 space-y-5">
            {/* Eyebrow "Insights" with gold diamonds */}
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>Insights</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            </div>

            {/* H1 "Insights coming soon." display serif 72/78 desktop, 56/62 tablet, 40/46 mobile */}
            <h1 className="font-serif text-[40px] sm:text-[56px] lg:text-[72px] leading-[1.08] text-[#16233F] tracking-tight">
              Insights coming soon.
            </h1>

            {/* Copy: 24px below H1 */}
            <p className="pt-2 text-[17px] sm:text-[18px] lg:text-[20px] leading-[1.6] text-[#5F5D55]">
              Legal updates, client alerts and commentary from MMM Advocates will be published
              here. Subscribe to receive them by email.
            </p>
          </div>

          {/* Form stack: cols 1 to 6 below (40px below text) */}
          <div className="lg:col-span-6 pt-4 sm:pt-6">
            {isNewsletterConnected ? (
              isSubmitted ? (
                <div
                  role="status"
                  aria-live="polite"
                  className="bg-[#F6F3EC] border border-[#C6A455]/40 p-8 text-[#1A1815] space-y-3"
                >
                  <div className="flex items-center gap-3 text-[#16233F]">
                    <CheckCircle2 size={24} className="text-[#C6A455]" />
                    <span className="text-[14px] uppercase tracking-[0.14em] font-semibold">
                      Subscription Received
                    </span>
                  </div>
                  <p className="text-[18px] leading-[1.5] text-[#16233F]">
                    Thank you. Please check your inbox to confirm your subscription.
                  </p>
                  <p className="text-[14px] text-[#5F5D55]">
                    A verification link has been sent to <span className="font-medium text-[#1A1815]">{email}</span>.
                  </p>
                </div>
              ) : (
                <form onSubmit={handleSubmit} noValidate className="space-y-6">
                  <div>
                    <label
                      htmlFor="empty-state-email"
                      className="block text-[14px] text-[#1A1815] font-medium mb-2"
                    >
                      Email address
                    </label>
                    <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                      <input
                        id="empty-state-email"
                        type="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        placeholder="name@company.com"
                        aria-required="true"
                        className="w-full h-[56px] px-0 bg-transparent border-b border-[#1A1815]/40 text-[18px] text-[#1A1815] placeholder-[#5F5D55]/60 focus:border-b-2 focus:border-[#16233F] focus:outline-none transition-colors"
                      />

                      {/* Deep Navy button with Warm Paper text */}
                      <button
                        type="submit"
                        disabled={isSubmitting}
                        className="group relative inline-flex items-center justify-center shrink-0 h-[56px] px-8 bg-[#16233F] text-[#FDFCF8] text-[14px] uppercase tracking-[0.08em] font-semibold transition-colors hover:bg-[#7A2142] focus-visible:outline-2 focus-visible:outline-[#16233F] focus-visible:outline-offset-3 disabled:opacity-50"
                      >
                        <span className="text-roll">
                          <span className="text-roll-stack">
                            <span>{isSubmitting ? 'Submitting...' : 'Subscribe'}</span>
                            <span>{isSubmitting ? 'Submitting...' : 'Subscribe'}</span>
                          </span>
                        </span>
                      </button>
                    </div>
                  </div>

                  {/* Consent checkbox */}
                  <div className="flex items-start gap-3">
                    <input
                      id="empty-state-consent"
                      type="checkbox"
                      checked={consent}
                      onChange={(e) => setConsent(e.target.checked)}
                      className="mt-1 w-4 h-4 rounded-none accent-[#16233F] border-[#1A1815]/40 text-[#16233F] focus-visible:outline-2 focus-visible:outline-[#16233F]"
                      aria-required="true"
                    />
                    <label htmlFor="empty-state-consent" className="text-[14px] leading-[1.6] text-[#5F5D55]">
                      I agree to receive emails from MMM Advocates and have read the{' '}
                      <a
                        href="/privacy-policy"
                        className="underline text-[#1A1815] hover:text-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
                      >
                        Privacy policy
                      </a>
                      .
                    </label>
                  </div>

                  {/* Error state */}
                  {errorMessage && (
                    <div
                      role="alert"
                      className="flex items-center gap-2.5 text-[#7A2142] text-[14px] pt-1"
                    >
                      <AlertCircle size={16} className="text-[#7A2142] shrink-0" aria-hidden="true" />
                      <span>{errorMessage}</span>
                    </div>
                  )}
                </form>
              )
            ) : (
              /* If newsletter provider not connected, show text link "Contact us" to /contact per spec */
              <div className="pt-2">
                <a
                  href="/contact"
                  className="group inline-flex items-center gap-2 text-[15px] uppercase tracking-[0.08em] font-semibold text-[#16233F] hover:text-[#7A2142] underline focus-visible:outline-2 focus-visible:outline-[#16233F]"
                >
                  <span className="text-roll">
                    <span className="text-roll-stack">
                      <span>Contact us</span>
                      <span>Contact us</span>
                    </span>
                  </span>
                </a>
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
