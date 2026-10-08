import React, { useState, useEffect } from 'react';
import {
  Linkedin,
  Facebook,
  Twitter,
  MessageCircle,
  Mail,
  Link2,
  Check,
  Share2,
  X,
} from 'lucide-react';

interface ShareToolsProps {
  url: string;
  title: string;
  standfirst?: string;
  railsFaded?: boolean;
}

export const ShareTools: React.FC<ShareToolsProps> = ({
  url,
  title,
  standfirst = '',
  railsFaded = false,
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);
  const [mobileBarVisible, setMobileBarVisible] = useState(false);
  const [bottomSheetOpen, setBottomSheetOpen] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(`${standfirst}\n\n${url}`);

  const shareTargets = [
    {
      name: 'LinkedIn',
      ariaLabel: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin size={18} aria-hidden="true" />,
    },
    {
      name: 'Facebook',
      ariaLabel: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook size={18} aria-hidden="true" />,
    },
    {
      name: 'X',
      ariaLabel: 'Share on X',
      href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Twitter size={18} aria-hidden="true" />,
    },
    {
      name: 'WhatsApp',
      ariaLabel: 'Share on WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <MessageCircle size={18} aria-hidden="true" />,
    },
    {
      name: 'Email',
      ariaLabel: 'Share by email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedBody}`,
      icon: <Mail size={18} aria-hidden="true" />,
    },
  ];

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      showToast('Link copied');
    } catch {
      showToast('Could not copy the link. Please copy it from the address bar.');
    }
  };

  const showToast = (msg: string) => {
    setToastMessage(msg);
    setToastVisible(true);
    setTimeout(() => {
      setToastVisible(false);
    }, 2400);
  };

  // Show mobile share bar after scrolling past hero and before related articles
  useEffect(() => {
    const handleScroll = () => {
      const heroThreshold = 550;
      const relatedSection = document.getElementById('related-articles-section');
      let isBeforeRelated = true;

      if (relatedSection) {
        const rect = relatedSection.getBoundingClientRect();
        if (rect.top <= window.innerHeight) {
          isBeforeRelated = false;
        }
      }

      if (window.scrollY > heroThreshold && isBeforeRelated) {
        setMobileBarVisible(true);
      } else {
        setMobileBarVisible(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleMobileShareClick = async () => {
    if (navigator.share) {
      try {
        await navigator.share({
          title,
          text: standfirst,
          url,
        });
      } catch {
        // User cancelled or error, no-op
      }
    } else {
      setBottomSheetOpen(true);
    }
  };

  return (
    <>
      {/* 5.1 DESKTOP SHARE RAIL (col 12 at 1440px) */}
      <aside
        id="share-rail"
        aria-label="Share this article"
        className={`hidden xl:block transition-opacity duration-300 ${
          railsFaded ? 'opacity-0 pointer-events-none' : 'opacity-100'
        }`}
      >
        <div className="sticky top-[120px] space-y-4">
          <div className="text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold">
            Share
          </div>

          <div className="flex flex-col gap-2">
            {shareTargets.map((target) => (
              <a
                key={target.name}
                href={target.href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={target.ariaLabel}
                className="w-11 h-11 border border-[#1A1815]/16 bg-transparent text-[#1A1815] flex items-center justify-center transition-colors duration-200 hover:bg-[#16233F] hover:text-[#FDFCF8] hover:border-[#16233F] focus-visible:outline-2 focus-visible:outline-[#16233F]"
              >
                {target.icon}
                <span className="sr-only">(opens in a new window)</span>
              </a>
            ))}

            {/* Copy link button */}
            <button
              type="button"
              onClick={handleCopyLink}
              aria-label="Copy link"
              className="w-11 h-11 border border-[#1A1815]/16 bg-transparent text-[#1A1815] flex items-center justify-center transition-colors duration-200 hover:bg-[#16233F] hover:text-[#FDFCF8] hover:border-[#16233F] focus-visible:outline-2 focus-visible:outline-[#16233F]"
            >
              <Link2 size={18} aria-hidden="true" />
            </button>
          </div>
        </div>
      </aside>

      {/* 5.2 "LINK COPIED" TOAST */}
      {toastVisible && toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 sm:bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#16233F] text-[#FDFCF8] px-5 py-3.5 flex items-center gap-3 shadow-2xl transition-all duration-300 text-[15px]"
          style={{ bottom: mobileBarVisible ? '88px' : '24px' }}
        >
          <Check size={16} className="text-[#C6A455] shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}

      {/* 5.3 MOBILE AND TABLET BOTTOM SHARE BAR (Below 1280px / xl) */}
      {mobileBarVisible && (
        <div
          id="mobile-share-bar"
          className="xl:hidden fixed bottom-0 left-0 right-0 z-40 bg-[#FDFCF8] border-t border-[#1A1815]/12 h-14 px-6 flex items-center justify-between shadow-md print:hidden"
        >
          <span className="text-[15px] font-medium text-[#1A1815]">Share this article</span>
          <button
            type="button"
            onClick={handleMobileShareClick}
            className="w-11 h-11 bg-[#16233F] text-[#FDFCF8] flex items-center justify-center hover:bg-[#7A2142] transition-colors focus-visible:outline-2 focus-visible:outline-[#16233F]"
            aria-label="Share options"
          >
            <Share2 size={18} aria-hidden="true" />
          </button>
        </div>
      )}

      {/* Mobile Fallback Bottom Sheet */}
      {bottomSheetOpen && (
        <div
          role="dialog"
          aria-modal="true"
          aria-label="Share options"
          className="fixed inset-0 z-50 bg-[#16233F]/70 flex flex-col justify-end xl:hidden"
        >
          <div className="bg-[#FDFCF8] border-t border-[#1A1815]/20 p-6 space-y-4 max-h-[80vh] overflow-y-auto">
            <div className="flex items-center justify-between pb-3 border-b border-[#1A1815]/12">
              <span className="text-[12px] uppercase tracking-[0.14em] font-semibold text-[#16233F]">
                Share this article
              </span>
              <button
                type="button"
                onClick={() => setBottomSheetOpen(false)}
                className="p-2 text-[#16233F] hover:text-[#7A2142]"
                aria-label="Close"
              >
                <X size={20} />
              </button>
            </div>

            <div className="space-y-2">
              {/* WhatsApp first for Kenya per spec */}
              <a
                href={shareTargets[3].href}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => setBottomSheetOpen(false)}
                className="flex items-center gap-4 h-14 px-4 border border-[#1A1815]/12 hover:bg-[#F6F3EC] text-[#1A1815]"
              >
                <MessageCircle size={20} className="text-[#25D366]" />
                <span className="text-[15px] font-medium">WhatsApp</span>
              </a>

              {shareTargets
                .filter((t) => t.name !== 'WhatsApp')
                .map((target) => (
                  <a
                    key={target.name}
                    href={target.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => setBottomSheetOpen(false)}
                    className="flex items-center gap-4 h-14 px-4 border border-[#1A1815]/12 hover:bg-[#F6F3EC] text-[#1A1815]"
                  >
                    {target.icon}
                    <span className="text-[15px] font-medium">{target.name}</span>
                  </a>
                ))}

              <button
                type="button"
                onClick={() => {
                  handleCopyLink();
                  setBottomSheetOpen(false);
                }}
                className="w-full flex items-center gap-4 h-14 px-4 border border-[#1A1815]/12 hover:bg-[#F6F3EC] text-[#1A1815]"
              >
                <Link2 size={20} />
                <span className="text-[15px] font-medium">Copy link</span>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export const EndShareRow: React.FC<{ url: string; title: string; standfirst?: string }> = ({
  url,
  title,
  standfirst = '',
}) => {
  const [toastMessage, setToastMessage] = useState<string | null>(null);
  const [toastVisible, setToastVisible] = useState(false);

  const encodedUrl = encodeURIComponent(url);
  const encodedTitle = encodeURIComponent(title);
  const encodedBody = encodeURIComponent(`${standfirst}\n\n${url}`);

  const shareTargets = [
    {
      name: 'LinkedIn',
      ariaLabel: 'Share on LinkedIn',
      href: `https://www.linkedin.com/sharing/share-offsite/?url=${encodedUrl}`,
      icon: <Linkedin size={18} aria-hidden="true" />,
    },
    {
      name: 'Facebook',
      ariaLabel: 'Share on Facebook',
      href: `https://www.facebook.com/sharer/sharer.php?u=${encodedUrl}`,
      icon: <Facebook size={18} aria-hidden="true" />,
    },
    {
      name: 'X',
      ariaLabel: 'Share on X',
      href: `https://x.com/intent/post?url=${encodedUrl}&text=${encodedTitle}`,
      icon: <Twitter size={18} aria-hidden="true" />,
    },
    {
      name: 'WhatsApp',
      ariaLabel: 'Share on WhatsApp',
      href: `https://wa.me/?text=${encodedTitle}%20${encodedUrl}`,
      icon: <MessageCircle size={18} aria-hidden="true" />,
    },
    {
      name: 'Email',
      ariaLabel: 'Share by email',
      href: `mailto:?subject=${encodedTitle}&body=${encodedBody}`,
      icon: <Mail size={18} aria-hidden="true" />,
    },
  ];

  const handleCopyLink = async () => {
    try {
      if (navigator.clipboard) {
        await navigator.clipboard.writeText(url);
      } else {
        const textarea = document.createElement('textarea');
        textarea.value = url;
        document.body.appendChild(textarea);
        textarea.select();
        document.execCommand('copy');
        document.body.removeChild(textarea);
      }
      setToastMessage('Link copied');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2400);
    } catch {
      setToastMessage('Could not copy link');
      setToastVisible(true);
      setTimeout(() => setToastVisible(false), 2400);
    }
  };

  return (
    <div className="pt-12 pb-8 border-t border-[#1A1815]/12">
      <div className="text-[12px] uppercase tracking-[0.14em] text-[#16233F] font-semibold mb-4">
        Share this article
      </div>

      <div className="flex flex-wrap items-center gap-2">
        {shareTargets.map((target) => (
          <a
            key={target.name}
            href={target.href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={target.ariaLabel}
            className="w-11 h-11 border border-[#1A1815]/16 bg-transparent text-[#1A1815] flex items-center justify-center transition-colors duration-200 hover:bg-[#16233F] hover:text-[#FDFCF8] hover:border-[#16233F] focus-visible:outline-2 focus-visible:outline-[#16233F]"
          >
            {target.icon}
            <span className="sr-only">(opens in a new window)</span>
          </a>
        ))}

        <button
          type="button"
          onClick={handleCopyLink}
          aria-label="Copy link"
          className="w-11 h-11 border border-[#1A1815]/16 bg-transparent text-[#1A1815] flex items-center justify-center transition-colors duration-200 hover:bg-[#16233F] hover:text-[#FDFCF8] hover:border-[#16233F] focus-visible:outline-2 focus-visible:outline-[#16233F]"
        >
          <Link2 size={18} aria-hidden="true" />
        </button>
      </div>

      {toastVisible && toastMessage && (
        <div
          role="status"
          aria-live="polite"
          className="fixed bottom-6 left-1/2 -translate-x-1/2 z-50 bg-[#16233F] text-[#FDFCF8] px-5 py-3.5 flex items-center gap-3 shadow-2xl text-[15px]"
        >
          <Check size={16} className="text-[#C6A455] shrink-0" aria-hidden="true" />
          <span>{toastMessage}</span>
        </div>
      )}
    </div>
  );
};
