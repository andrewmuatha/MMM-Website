import { Author } from './cms';

export interface PracticeFocusArea {
  title: string;
  description: string;
  points?: string[];
}

export interface PracticeArea {
  id: string;
  slug: string;
  aliases?: string[];
  number: string;
  name: string;
  shortName: string;
  headline: string;
  lead: string;
  overview: string[];
  primaryPartner: Author;
  supportingPartners?: Author[];
  focusAreas: PracticeFocusArea[];
  advisoryScope: string[];
  methodology: {
    number: string;
    title: string;
    description: string;
  }[];
  relatedTopicSlugs: string[];
  heroImage?: string;
  imageAlt?: string;
  seoTitle: string;
  seoDescription: string;
}
