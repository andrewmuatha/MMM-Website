import React, { useState } from 'react';
import { AlertCircle, CheckCircle2 } from 'lucide-react';

interface NewsletterBandProps {
  isConnected?: boolean;
}

export const NewsletterBand: React.FC<NewsletterBandProps> = ({
  isConnected = true,
}) => {
  const [email, setEmail] = useState('');
  const [consent, setConsent] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  // If the newsletter provider is not connected, the whole band is hidden entirely per spec
  if (!isConnected) {
    return null;
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage(null);

    // Validation
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
    // Simulate double opt-in submission
    setTimeout(() => {
      setIsSubmitting(false);
      setIsSubmitted(true);
    }, 450);
  };

  return (
    <section
      className="relative bg-[#16233F] text-[#FDFCF8] overflow-hidden py-16 sm:py-22 lg:py-26"
      aria-label="Newsletter subscription"
    >
      {/* Subtle Kuba pattern texture at 4% opacity on right third (desktop only) */}
      <div
        className="hidden lg:block absolute right-0 top-0 bottom-0 w-1/3 bg-kuba-subtle opacity-[0.04] pointer-events-none"
        aria-hidden="true"
      />

      <div className="relative max-w-[1280px] mx-auto px-5 sm:px-10 lg:px-12 xl:px-20">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-start">
          {/* Heading Column: cols 1 to 5 */}
          <div className="lg:col-span-5 space-y-5">
            {/* Eyebrow: unnumbered with gold diamonds */}
            <div className="inline-flex items-center gap-3 text-[12px] uppercase tracking-[0.14em] text-[#FDFCF8]">
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
              <span>Newsletter</span>
              <span className="w-1.5 h-1.5 rotate-45 bg-[#C6A455]" aria-hidden="true" />
            </div>

            <h2 className="font-serif text-[34px] sm:text-[44px] lg:text-[52px] leading-[1.12] text-[#FDFCF8]">
              Stay informed.
            </h2>

            <p className="text-[17px] sm:text-[18px] leading-[1.65] text-[#FDFCF8]/85 max-w-md">
              Receive legal updates and client alerts from MMM Advocates by email.
            </p>
          </div>

          {/* Form Column: cols 7 to 12 */}
          <div className="lg:col-span-7 lg:col-start-7">
            {isSubmitted ? (
              <div
                role="status"
                aria-live="polite"
                className="bg-[#FDFCF8]/10 border border-[#C6A455]/40 p-8 text-[#FDFCF8] space-y-3"
              >
                <div className="flex items-center gap-3 text-[#C6A455]">
                  <CheckCircle2 size={24} />
                  <span className="text-[14px] uppercase tracking-[0.14em] font-semibold">
                    Subscription Received
                  </span>
                </div>
                <p className="text-[18px] leading-[1.5] text-[#FDFCF8]">
                  Thank you. Please check your inbox to confirm your subscription.
                </p>
                <p className="text-[14px] text-[#FDFCF8]/70">
                  A verification link has been sent to <span className="font-medium text-[#FDFCF8]">{email}</span>.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate className="space-y-6">
                <div>
                  <label
                    htmlFor="newsletter-email"
                    className="block text-[14px] text-[#FDFCF8]/90 font-medium mb-2"
                  >
                    Email address
                  </label>
                  <div className="flex flex-col sm:flex-row gap-4 sm:gap-0">
                    <input
                      id="newsletter-email"
                      type="email"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="name@company.com"
                      aria-required="true"
                      className="w-full h-[56px] px-0 bg-transparent border-b border-[#FDFCF8]/60 text-[18px] text-[#FDFCF8] placeholder-[#FDFCF8]/40 focus:border-b-2 focus:border-[#C6A455] focus:outline-none transition-colors"
                    />

                    {/* Submit button: Premium Gold fill, Deep Navy text, 56px high, 0 radius, text-roll hover */}
                    <button
                      type="submit"
                      disabled={isSubmitting}
                      className="group relative inline-flex items-center justify-center shrink-0 h-[56px] px-8 bg-[#C6A455] text-[#16233F] text-[14px] uppercase tracking-[0.08em] font-semibold transition-colors hover:bg-[#d6b465] focus-visible:outline-2 focus-visible:outline-[#C6A455] focus-visible:outline-offset-3 disabled:opacity-50"
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

                {/* Consent checkbox: unticked by default, required */}
                <div className="flex items-start gap-3">
                  <input
                    id="newsletter-consent"
                    type="checkbox"
                    checked={consent}
                    onChange={(e) => setConsent(e.target.checked)}
                    className="mt-1 w-4 h-4 rounded-none accent-[#C6A455] border-[#FDFCF8]/60 text-[#16233F] focus-visible:outline-2 focus-visible:outline-[#C6A455]"
                    aria-required="true"
                  />
                  <label htmlFor="newsletter-consent" className="text-[14px] leading-[1.6] text-[#FDFCF8]/85">
                    I agree to receive emails from MMM Advocates and have read the{' '}
                    <a
                      href="/privacy-policy"
                      className="underline hover:text-[#C6A455] transition-colors focus-visible:outline-2 focus-visible:outline-[#C6A455]"
                    >
                      Privacy policy
                    </a>
                    .
                  </label>
                </div>

                {/* Error message state: shown in Warm Paper with 16px error icon */}
                {errorMessage && (
                  <div
                    role="alert"
                    className="flex items-center gap-2.5 text-[#FDFCF8] text-[14px] pt-1"
                  >
                    <AlertCircle size={16} className="text-[#FDFCF8] shrink-0" aria-hidden="true" />
                    <span>{errorMessage}</span>
                  </div>
                )}
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
};
