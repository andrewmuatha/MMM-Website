import React, { useEffect } from 'react';

interface SeoProps {
  title: string;
  description?: string;
  canonicalUrl?: string;
}

export const Seo: React.FC<SeoProps> = ({
  title,
  description = 'Mundui, Murai & Mwaniki Advocates LLP, Nairobi, Kenya.',
  canonicalUrl,
}) => {
  useEffect(() => {
    document.title = title;

    if (description) {
      let metaDesc = document.querySelector('meta[name="description"]');
      if (!metaDesc) {
        metaDesc = document.createElement('meta');
        metaDesc.setAttribute('name', 'description');
        document.head.appendChild(metaDesc);
      }
      metaDesc.setAttribute('content', description);

      let ogDesc = document.querySelector('meta[property="og:description"]');
      if (ogDesc) {
        ogDesc.setAttribute('content', description);
      }
    }

    let ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) {
      ogTitle.setAttribute('content', title);
    }

    if (canonicalUrl) {
      let canonical = document.querySelector('link[rel="canonical"]');
      if (canonical) {
        canonical.setAttribute('href', canonicalUrl);
      }
    }
  }, [title, description, canonicalUrl]);

  return null;
};
