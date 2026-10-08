import { AUTHORS } from './cmsData';
import { PracticeArea } from '../types/practice';

export const PRACTICE_AREAS: PracticeArea[] = [
  {
    id: 'corporate-commercial',
    slug: 'corporate-commercial',
    aliases: ['corporate', 'commercial'],
    number: '01',
    name: 'Corporate & Commercial',
    shortName: 'Corporate & Commercial',
    headline: 'Strategic corporate counsel grounded in East African commercial reality.',
    lead: 'We advise domestic enterprises, multinational corporations, private equity funds and financial institutions on intricate mergers, acquisitions, regulatory compliance and cross-border commercial transactions.',
    overview: [
      'Our Corporate & Commercial practice delivers rigorous legal counsel across the complete enterprise lifecycle. From initial establishment and joint venture structuring through equity financing, regulatory licensing and strategic divestitures, we align legal precision with commercial objectives.',
      'We combine thorough statutory understanding of the Companies Act 2015, the Capital Markets Act and regional treaty regimes with pragmatic transactional insight, enabling clients to navigate regulatory clearances and governance demands seamlessly.',
    ],
    primaryPartner: AUTHORS.MM,
    supportingPartners: [AUTHORS.TWM],
    focusAreas: [
      {
        title: 'Mergers & Acquisitions and Private Equity',
        description: 'Comprehensive deal structuring, vendor and buyer-side legal due diligence, share purchase agreements, shareholder pacts and post-acquisition integration.',
        points: [
          'Pre-transaction structuring and antitrust risk appraisal',
          'Competition Authority of Kenya and COMESA merger notifications',
          'Asset and share sales, management buyouts and cross-border consolidations',
        ],
      },
      {
        title: 'Corporate Governance & Board Advisory',
        description: 'Advising boards of directors, audit committees and company secretariats on statutory duties, director liabilities and governance reporting.',
        points: [
          'Board governance charters and committee terms of reference',
          'Annual compliance audits under the Companies Act 2015',
          'Shareholder dispute mitigation and minority protection mechanisms',
        ],
      },
      {
        title: 'Commercial Contracting & Joint Ventures',
        description: 'Drafting and negotiating complex commercial instruments, distributorship arrangements, licensing agreements and public-private consortium accords.',
        points: [
          'Cross-border distribution, agency and franchising agreements',
          'Consortium and joint operating agreements for capital projects',
          'Supply chain procurement terms and risk-allocation warranties',
        ],
      },
      {
        title: 'Capital Markets & Banking Structuring',
        description: 'Assisting corporate issuers and institutional lenders in debt issues, syndications, structured collateral creation and regulatory disclosures.',
        points: [
          'Commercial paper issuances and corporate bond compliance',
          'Security creation, debentures and collateral regularization',
          'Capital Markets Authority circulars and regulatory reporting',
        ],
      },
    ],
    advisoryScope: [
      'Counsel on cross-border corporate reorganization involving holding entities in Kenya, Mauritius and the United Kingdom.',
      'Advisory on Competition Authority of Kenya clearance for regional manufacturing consolidation.',
      'Structuring of private equity investment vehicles and subscription agreements for agribusiness expansion in the Rift Valley.',
      'Drafting of EPC and long-term operations agreements for renewable energy independent power producers.',
      'Advising commercial banks on multi-tiered syndicated facility documentation and security perfection protocols.',
    ],
    methodology: [
      {
        number: '01',
        title: 'Diagnostic Appraisal',
        description: 'Early-stage review of transaction parameters, regulatory triggers, antitrust thresholds and jurisdictional constraints.',
      },
      {
        number: '02',
        title: 'Structural Drafting',
        description: 'Bespoke documentation tailored to allocate operational liabilities, balance shareholder governance and satisfy statutory mandates.',
      },
      {
        number: '03',
        title: 'Regulatory Execution',
        description: 'Proactive engagement with statutory registrars, sector regulators and competition authorities to secure timely clearances.',
      },
    ],
    relatedTopicSlugs: ['corporate-commercial', 'competition-law', 'climate-governance'],
    heroImage: 'https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Nairobi commercial financial district skyline',
    seoTitle: 'Corporate & Commercial Practice | MMM Advocates LLP Nairobi',
    seoDescription: 'Strategic corporate counsel on mergers, acquisitions, regulatory compliance and commercial contracts in Kenya and East Africa.',
  },
  {
    id: 'dispute-resolution',
    slug: 'dispute-resolution',
    aliases: ['litigation', 'arbitration'],
    number: '02',
    name: 'Dispute Resolution',
    shortName: 'Dispute Resolution',
    headline: 'Principled advocacy and decisive strategy in high-stakes commercial disputes.',
    lead: 'We represent corporate clients, institutional lenders and commercial entities in complex commercial litigation, domestic and international arbitration, tax tribunals and superior court appellate proceedings.',
    overview: [
      'MMM Advocates maintains an active dispute resolution practice handling substantial commercial controversies. We recognize that litigation is an extension of business strategy, requiring meticulous risk appraisal, factual mastery and decisive advocacy.',
      'Our team regularly appears before the High Court (Commercial and Tax Division), the Court of Appeal, the Supreme Court of Kenya, and specialized tribunals including the Tax Appeals Tribunal and the Public Procurement Administrative Review Board.',
    ],
    primaryPartner: AUTHORS.TWM,
    supportingPartners: [AUTHORS.MM],
    focusAreas: [
      {
        title: 'Commercial & Corporate Litigation',
        description: 'Representing commercial institutions in contract enforcement, shareholder conflicts, banking litigation and director liability claims.',
        points: [
          'High Court commercial proceedings and emergency injunctive relief',
          'Enforcement of financial covenants, loan defaults and guarantee recoveries',
          'Defending corporate boards against ultra vires challenges and derivative actions',
        ],
      },
      {
        title: 'Domestic & International Arbitration',
        description: 'Counsel in institutional and ad hoc arbitrations conducted under the Arbitration Act 1995, NCIA rules, UNCITRAL, and LCIA rules.',
        points: [
          'Drafting robust, multi-tiered dispute escalation agreements',
          'Representation in construction, infrastructure and joint venture arbitrations',
          'Recognition and enforcement of arbitral awards across EAC jurisdictions',
        ],
      },
      {
        title: 'Tax Controversies & Tribunal Appeals',
        description: 'Litigating complex transfer pricing assessments, withholding tax challenges, customs duty determinations and VAT disputes before the Tax Appeals Tribunal.',
        points: [
          'Preparation of objection applications and technical tax memoranda',
          'Tribunal hearings on arm’s length pricing and documentation burdens',
          'Appellate challenges against arbitrary revenue authority assessments',
        ],
      },
      {
        title: 'Constitutional & Administrative Law',
        description: 'Challenging unlawful regulatory decisions, ultra vires statutory notices and procedural unfairness through judicial review proceedings.',
        points: [
          'Judicial review applications challenging statutory agency decrees',
          'Constitutional petitions safeguarding property rights and economic due process',
          'Public procurement review board representations for tendering entities',
        ],
      },
    ],
    advisoryScope: [
      'Successful representation in commercial arbitration regarding contractual performance in regional infrastructure development.',
      'Appellate advocacy before the Court of Appeal upholding the validity of commercial collateral perfection procedures.',
      'Representation of multinational taxpayer before the Tax Appeals Tribunal concerning transfer pricing benchmark adjustments.',
      'Emergency High Court injunction restraining unlawful interference with commercial development land title.',
      'Advisory to financial institution on recovery strategies involving cross-border receivership and asset tracing.',
    ],
    methodology: [
      {
        number: '01',
        title: 'Merits Assessment',
        description: 'Unflinching appraisal of factual records, contractual language, evidentiary weight and procedural timeline vulnerabilities.',
      },
      {
        number: '02',
        title: 'Tactical Escalation',
        description: 'Deployment of targeted pre-action letters, conservatory orders, mediation avenues or arbitration notices to maximize leverage.',
      },
      {
        number: '03',
        title: 'Courtroom & Hearing Mastery',
        description: 'Persuasive written pleadings, methodical witness cross-examination and lucid oral advocacy before tribunals and superior courts.',
      },
    ],
    relatedTopicSlugs: ['dispute-resolution', 'arbitration', 'tax-regulatory'],
    heroImage: 'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Legal library volumes and judicial reference materials',
    seoTitle: 'Dispute Resolution Practice | MMM Advocates LLP Nairobi',
    seoDescription: 'High-stakes commercial litigation, international arbitration, tax appeals and constitutional advocacy in Kenya.',
  },
  {
    id: 'tmt',
    slug: 'tmt',
    aliases: ['technology-media-telecommunications', 'tech'],
    number: '03',
    name: 'Technology, Media & Telecommunications',
    shortName: 'TMT',
    headline: 'Pioneering legal counsel for the digital economy and critical communication sectors.',
    lead: 'We counsel telecommunications operators, fintech innovators, digital lending platforms, media enterprises and multinational technology providers on licensing, data governance and commercial contracts.',
    overview: [
      'The rapid evolution of East Africa’s digital landscape requires legal counsel that understands both the underlying architecture of modern technologies and the evolving regulatory mandates enforced by statutory bodies.',
      'Our Technology, Media & Telecommunications (TMT) practice assists clients in navigating statutory compliances with the Communications Authority of Kenya (CA), the Central Bank of Kenya (CBK), the Office of the Data Protection Commissioner (ODPC), and regional digital treaty frameworks.',
    ],
    primaryPartner: AUTHORS.DGM,
    supportingPartners: [AUTHORS.MM],
    focusAreas: [
      {
        title: 'FinTech, Digital Lending & Payment Systems',
        description: 'Advising on statutory licensing, consumer protection rules, anti-money laundering frameworks and Central Bank of Kenya regulatory oversight.',
        points: [
          'Non-deposit taking digital credit provider (DCP) licensing applications',
          'Payment service provider (PSP) regulatory approvals and escrow architectures',
          'Open banking frameworks, API sharing arrangements and fraud protocols',
        ],
      },
      {
        title: 'Data Protection, Privacy & Information Governance',
        description: 'Guiding corporate entities through Data Protection Act 2019 compliance, statutory registrations, data protection impact assessments (DPIAs) and cross-border data transfer regimes.',
        points: [
          'Office of the Data Protection Commissioner (ODPC) registration and compliance audits',
          'Cross-border personal data transfer mechanisms and statutory safeguards',
          'Data processing agreements, privacy notices and incident response manuals',
        ],
      },
      {
        title: 'Telecommunications Infrastructure & Spectrum',
        description: 'Advising network operators and infrastructure providers on Communications Authority authorizations, tower colocation agreements and spectrum management.',
        points: [
          'Telecommunications operator licensing, frequency assignment and renewals',
          'Fiber optic dark-fiber lease agreements and infrastructure sharing pacts',
          'Subsea cable landing rights and interconnection rate dispute counseling',
        ],
      },
      {
        title: 'Artificial Intelligence, Cloud & Software Licensing',
        description: 'Drafting enterprise cloud service contracts, software-as-a-service (SaaS) terms, AI model governance policies and intellectual property safeguards.',
        points: [
          'Enterprise software licensing and Service Level Agreement (SLA) drafting',
          'Cloud infrastructure hosting covenants and data localization assessments',
          'Algorithmic liability frameworks and generative artificial intelligence policies',
        ],
      },
      {
        title: 'Media, Digital Entertainment & Intellectual Property',
        description: 'Protecting content rights, broadcasting compliance, digital distribution agreements and advertising regulatory standards.',
        points: [
          'Broadcast license compliance and content moderation guidelines',
          'Digital copyright enforcement, licensing and trademark portfolio defense',
          'Influencer marketing compliance and consumer protection disclosures',
        ],
      },
    ],
    advisoryScope: [
      'Advising international fintech group on payment gateway licensing with the Central Bank of Kenya.',
      'Comprehensive data protection audit and statutory registration for pan-African logistics platform with the ODPC.',
      'Structuring of master services and infrastructure-sharing agreements for regional telecommunications network roll-out.',
      'Counsel to enterprise SaaS provider on cross-border cloud data transfer compliance under Kenyan data protection laws.',
      'Advisory on intellectual property protection and licensing architecture for mobile health application deployed across East Africa.',
    ],
    methodology: [
      {
        number: '01',
        title: 'Regulatory Mapping',
        description: 'Systematic classification of product architecture against telecommunications, financial services and data protection statutes.',
      },
      {
        number: '02',
        title: 'Contractual Fortification',
        description: 'Drafting commercial contracts with rigorous SLA thresholds, liability caps, intellectual property protections and data safeguards.',
      },
      {
        number: '03',
        title: 'Statutory Liaison',
        description: 'Constructive technical engagement with the Communications Authority, Central Bank and Data Protection Commissioner.',
      },
    ],
    relatedTopicSlugs: ['tmt', 'data-protection', 'digital-lending', 'banking-finance'],
    heroImage: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'High-speed telecommunications infrastructure and digital network operations',
    seoTitle: 'Technology, Media & Telecommunications Practice | MMM Advocates LLP Nairobi',
    seoDescription: 'Legal counsel for telecommunications operators, fintech innovators, digital lending platforms and technology enterprises in Kenya.',
  },
  {
    id: 'property',
    slug: 'property-real-estate',
    aliases: ['property', 'real-estate'],
    number: '04',
    name: 'Property & Real Estate',
    shortName: 'Property & Real Estate',
    headline: 'Authoritative guidance on complex land tenure, sectional titles and development finance.',
    lead: 'We counsel institutional real estate developers, commercial landlords, property funds and commercial banks on land title conversion, sectional property structuring, commercial leasing and property project finance.',
    overview: [
      'Land and real estate in Kenya are governed by dynamic statutory frameworks under the Constitution of Kenya 2010, the Land Act 2012, the Land Registration Act 2012 and the Sectional Properties Act 2020.',
      'Our Property & Real Estate team is recognized for deep procedural mastery in high-volume land title regularizations, conversion of historical sub-leases, physical planning authorizations and commercial real estate portfolio transactions.',
    ],
    primaryPartner: AUTHORS.TWM,
    supportingPartners: [AUTHORS.MM],
    focusAreas: [
      {
        title: 'Sectional Properties Conversions & Title Regularization',
        description: 'Leading the statutory migration from historical long-term sub-leases to certificates of sectional title under the Sectional Properties Regulations 2025.',
        points: [
          'Cadastral survey plan approvals and registration with the Director of Surveys',
          'Corporation formation and common property schedule regularization',
          'Financier deed substitution and replacement charges over sectional units',
        ],
      },
      {
        title: 'Commercial Conveyancing & Acquisition Due Diligence',
        description: 'Guiding institutional buyers and sellers through land searches, root of title verifications, boundary disputes and transfer instruments.',
        points: [
          'Historical search audits across Ardhi House and county registry archives',
          'Negotiation of sale agreements, escrow covenants and completion undertakings',
          'Payment of stamp duty, land rent clearance and rates clearances',
        ],
      },
      {
        title: 'Commercial Leasing & Estate Management',
        description: 'Drafting commercial leases for prime office parks, shopping centers, industrial warehouses and mixed-use commercial developments.',
        points: [
          'Service charge apportionment structures and sinking fund governance',
          'Tenant covenant enforcement, assignment conditions and forfeiture notices',
          'Long-term ground leases and sublease renewals',
        ],
      },
      {
        title: 'Physical Planning, Zoning & Environmental Compliance',
        description: 'Advising real estate developers on change of user, subdivision approvals, National Environment Management Authority (NEMA) licenses and county development permits.',
        points: [
          'Change of user and extension of leasehold term applications',
          'Subdivision and sectional consolidation approvals with county planning units',
          'NEMA environmental impact assessment approvals and riparian safeguards',
        ],
      },
      {
        title: 'Real Estate Project Finance & Banking Securities',
        description: 'Assisting commercial banks and borrowers in securing development loans through charges, debentures, collateral warranties and escrow arrangements.',
        points: [
          'Drafting and perfection of legal charges over leasehold and freehold titles',
          'Tripartite construction financing covenants with building contractors',
          'Discharge of charges upon off-plan sectional unit completions',
        ],
      },
    ],
    advisoryScope: [
      'Conversion of prime multi-story commercial office park in Westlands to sectional property titles under the 2025 Regulations.',
      'Advising international real estate fund on the acquisition and development of master-planned industrial logistics hub in Machakos County.',
      'Drafting uniform commercial lease documentation for regional retail shopping center comprising over 80 commercial tenancies.',
      'Regularization of leasehold terms and successful extension of government headleases for prime institutional campus in Nairobi.',
      'Advisory to consortium of commercial banks on financing and security perfection for mixed-use residential development in Kilimani.',
    ],
    methodology: [
      {
        number: '01',
        title: 'Title Integrity Audit',
        description: 'Rigorous examination of deed history, planning approvals, boundary registers and historical encumbrances.',
      },
      {
        number: '02',
        title: 'Statutory Alignment',
        description: 'Structuring documentation to comply strictly with sectional property mandates and statutory registration prerequisites.',
      },
      {
        number: '03',
        title: 'Closing & Collateral Perfection',
        description: 'Managing registry lodgements, stamp duty valuations and document release protocols with precision.',
      },
    ],
    relatedTopicSlugs: ['property-real-estate', 'banking-finance'],
    heroImage: 'https://images.unsplash.com/photo-1450133064473-71024230f91b?q=80&w=1400&auto=format&fit=crop',
    imageAlt: 'Architectural structures and commercial property development blueprint',
    seoTitle: 'Property & Real Estate Practice | MMM Advocates LLP Nairobi',
    seoDescription: 'Authoritative counsel on sectional properties conversion, land conveyancing, commercial leasing and real estate finance in Kenya.',
  },
];

// Helper to look up practice area by slug (with support for aliases like 'tmt', 'property', etc.)
export function getPracticeBySlug(slug: string): PracticeArea | undefined {
  const normalized = slug.toLowerCase().trim();
  return PRACTICE_AREAS.find(
    (p) =>
      p.slug.toLowerCase() === normalized ||
      p.aliases?.some((alias) => alias.toLowerCase() === normalized) ||
      p.name.toLowerCase().replace(/[^a-z0-9]+/g, '-') === normalized
  );
}
