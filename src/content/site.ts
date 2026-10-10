export interface Partner {
  name: string;
  title: string;
  slug: string;
  initials: string;
  bio?: string | null;
  focus?: string[] | null;
}

export type Person = Partner;

export interface SiteContent {
  name: string;
  shortName: string;
  tagline: string;
  address: {
    line1: string;
    line2: string;
    poBox: string;
    phone: string;
  };
  team: {
    hero: {
      eyebrow: string;
      heading: string;
      body: string | null;
    };
    statement: {
      heading: string;
      body: string | null;
    };
    collaborative: {
      heading: string;
      body: string | null;
    };
    partners: Partner[];
  };
}

export const site: SiteContent = {
  name: 'Mundui, Murai & Mwaniki Advocates LLP',
  shortName: 'MMM Advocates',
  tagline: 'Excellence, integrity, partnership',
  address: {
    line1: 'Delta Corner Annex, 7th Floor, Ring Road Westlands',
    line2: 'Off Chiromo Lane',
    poBox: 'P.O. Box 48291-00100, Nairobi, Kenya',
    phone: '+254 713 874 830',
  },
  team: {
    hero: {
      eyebrow: 'Our team',
      heading: 'The people behind the counsel.',
      body: null,
    },
    statement: {
      heading: 'Experience is more than a title.',
      body: null,
    },
    collaborative: {
      heading: 'Counsel is a collaborative discipline.',
      body: null,
    },
    partners: [
      {
        name: 'Titus Wanjohi Mundui',
        title: 'Partner',
        slug: 'titus-wanjohi-mundui',
        initials: 'TWM',
        bio: null,
        focus: null,
      },
      {
        name: 'Donald Gitau Murai',
        title: 'Partner',
        slug: 'donald-gitau-murai',
        initials: 'DGM',
        bio: null,
        focus: null,
      },
      {
        name: 'Mwende Mwaniki',
        title: 'Partner',
        slug: 'mwende-mwaniki',
        initials: 'MM',
        bio: null,
        focus: null,
      },
    ],
  },
};

