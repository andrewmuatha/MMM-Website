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
  firm: {
    founded: {
      year: number;
      verified: boolean;
    };
  };
  address: {
    line1: string;
    line2: string;
    city: string;
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
  tagline: 'MASTER · MANAGE · MULTIPLY',
  firm: {
    founded: {
      year: 2018,
      verified: false,
    },
  },
  address: {
    line1: 'Longonot Place, 7th Floor, Right Wing',
    line2: 'Kijabe Street',
    city: 'Nairobi, Kenya',
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

