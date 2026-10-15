import { Article, Category } from '../types';
import { CURATED_ARTICLES } from './curatedArticles';

// Realistic topic matrices for last 3 months (July 15, 2026 - October 15, 2026)
interface TopicBlueprint {
  headlineTemplate: string;
  prefix: string;
  category: Category;
  tags: string[];
  imageThemes: string[];
  backlinkPool: { text: string; url: string; source: string }[];
  summaryTemplate: string;
  contentTemplates: string[];
}

const BLUEPRINTS: TopicBlueprint[] = [
  // 1. Politics & Elections 2026
  {
    headlineTemplate: 'Senate Battleground In {state} Flips In Landmark New Poll Over {issue}',
    prefix: 'ELECTION WATCH',
    category: 'Politics',
    tags: ['Midterms 2026', 'Senate', 'Polling', 'Campaigns'],
    imageThemes: [
      'https://images.unsplash.com/photo-1540910419892-4a36d2c3266c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1541872703-74c5e44368f9?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1529107386315-e1a2ed48a620?auto=format&fit=crop&w=800&q=80'
    ],
    backlinkPool: [
      { text: 'Federal Election Commission (FEC) Campaign Disclosure', url: 'https://fec.gov', source: 'FEC Records' },
      { text: 'Cook Political Report Senate Analysis', url: 'https://cookpolitical.com', source: 'Cook Political' },
      { text: 'Pew Research Center Voter Alignment Study', url: 'https://pewresearch.org', source: 'Pew Research' },
      { text: 'FiveThirtyEight Polling Averages', url: 'https://abcnews.go.com/538', source: '538 Analytics' }
    ],
    summaryTemplate: 'Voters across key suburban districts are shifting their allegiances as economic pressures and judicial appointments take center stage.',
    contentTemplates: [
      'Field reports from county canvassers indicate unprecedented voter engagement across competitive swing precincts. With independent voters breaking away from party orthodoxies, internal polling models show volatility not observed in modern midterms.',
      'According to constitutional analysts, legislative control of the upper chamber hinges on razor-thin pluralities in non-urban counties where local infrastructure and healthcare affordability dominate town hall debates.',
      'Campaign committees have funneled eight-figure ad buys into targeted digital streaming and broadcast markets, saturating battleground airwaves.'
    ]
  },
  // 2. Economy, Labor & Cost of Living
  {
    headlineTemplate: '{agency} Releases Unprecedented Data On {econFactor} In Working Families',
    prefix: 'ECONOMIC BRIEF',
    category: 'Latest News',
    tags: ['Economy', 'Inflation', 'Federal Reserve', 'Labor'],
    imageThemes: [
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1526470608268-f674ce90ebd4?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80'
    ],
    backlinkPool: [
      { text: 'Bureau of Labor Statistics CPI Detailed Report', url: 'https://bls.gov/cpi', source: 'BLS Data' },
      { text: 'Federal Reserve Monetary Policy Statement', url: 'https://federalreserve.gov', source: 'Federal Reserve' },
      { text: 'Brookings Institution Economic Studies', url: 'https://brookings.edu', source: 'Brookings' },
      { text: 'Congressional Budget Office Ten-Year Economic Outlook', url: 'https://cbo.gov', source: 'CBO' }
    ],
    summaryTemplate: 'New statistical releases show unexpected macroeconomic divergence between corporate balance sheets and median household real purchasing power.',
    contentTemplates: [
      'The latest index revisions confirm that core price pressures have decoupled from headline energy metrics, forcing central bankers to reconsider rate easing timetables.',
      'Labor economists point out that wage velocity has plateaued in manufacturing and hospitality, while housing carrying costs continue to demand higher proportions of disposable gross income.',
      'Consumer sentiment metrics reflect growing caution, as credit utilization metrics reach multi-year highs across suburban demographics.'
    ]
  },
  // 3. Supreme Court & Constitutional Law
  {
    headlineTemplate: 'Supreme Court Weighs High-Stakes Challenge Over {legalSubject}',
    prefix: 'JUSTICE DESK',
    category: 'Latest News',
    tags: ['Supreme Court', 'Constitution', 'DOJ', 'Legal'],
    imageThemes: [
      'https://images.unsplash.com/photo-1589829545856-d10d557cf95f?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1505664194779-8beaceb93744?auto=format&fit=crop&w=800&q=80'
    ],
    backlinkPool: [
      { text: 'Supreme Court Docket Order List', url: 'https://supremecourt.gov/orders', source: 'SCOTUS Docket' },
      { text: 'Harvard Law Review Judicial Review Forum', url: 'https://harvardlawreview.org', source: 'Harvard Law' },
      { text: 'American Bar Association Amicus Brief Repository', url: 'https://americanbar.org', source: 'ABA Legal' }
    ],
    summaryTemplate: 'Oral arguments revealed deep philosophical fractures on the high bench regarding executive branch discretion and administrative law doctrines.',
    contentTemplates: [
      'Justices sparred over statutory construction for more than two hours, testing attorneys on the boundaries of congressional delegation versus executive prerogatives.',
      'Constitutional scholars note that the pending ruling could overturn longstanding appellate precedents, fundamentally reshaping federal regulatory authority across environmental and financial sectors.',
      'Civil rights organizations and business coalitions have filed conflicting amicus briefs urging the court to provide definitive clarity.'
    ]
  },
  // 4. Technology, AI & Aerospace
  {
    headlineTemplate: 'Tech Giant Unveils Breakthrough In {techField} As Regulators Sound Alarm',
    prefix: 'INNOVATION WIRE',
    category: 'Business & Tech',
    tags: ['Artificial Intelligence', 'Tech', 'Cybersecurity', 'Aerospace'],
    imageThemes: [
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=800&q=80'
    ],
    backlinkPool: [
      { text: 'Stanford Center for Human-Centered Artificial Intelligence (HAI)', url: 'https://hai.stanford.edu', source: 'Stanford HAI' },
      { text: 'National Institute of Standards and Technology (NIST) AI Framework', url: 'https://nist.gov/ai', source: 'NIST Standards' },
      { text: 'MIT Technology Review Deep Dive', url: 'https://technologyreview.com', source: 'MIT Tech Review' }
    ],
    summaryTemplate: 'Rapid advancements in autonomous neural reasoning frameworks have sparked urgent closed-door briefings among congressional oversight committees.',
    contentTemplates: [
      'The newly demonstrated architecture achieves multimodal cognitive benchmark scores that exceed human baseline performance across synthetic reasoning and quantitative analysis.',
      'However, national security strategists caution that supply-chain dependencies on advanced packaging facilities remain a fragile choke-point in the technological ecosystem.',
      'Antitrust enforcers have already issued preliminary civil investigative demands targeting proprietary training agreements between hyperscalers and frontier labs.'
    ]
  },
  // 5. Life, Health & Modern Living
  {
    headlineTemplate: 'Why More People In Their 30s And 40s Are Re-evaluating {lifeTopic}',
    prefix: 'MODERN LIVING',
    category: 'Life',
    tags: ['Health', 'Mental Health', 'Relationships', 'Parenting'],
    imageThemes: [
      'https://images.unsplash.com/photo-1516627145497-ae6968895b74?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1544367567-0f2fcb009e0b?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1506126613408-eca07ce68773?auto=format&fit=crop&w=800&q=80'
    ],
    backlinkPool: [
      { text: 'New England Journal of Medicine Preventive Care Study', url: 'https://nejm.org', source: 'NEJM' },
      { text: 'American Psychological Association Stress in America Survey', url: 'https://apa.org', source: 'APA' },
      { text: 'National Institutes of Health Longevity Guidelines', url: 'https://nih.gov', source: 'NIH Records' }
    ],
    summaryTemplate: 'Sociologists and clinicians are identifying a cultural pivot toward boundary-setting, restorative routines, and physical longevity protocols.',
    contentTemplates: [
      'Between relentless screen exposure, shifting workplace dynamics, and economic pressures, adults are systematically stripping non-essential obligations from their weekly schedules.',
      'Clinical studies demonstrate that sustained micro-interventions—from consistent circadian sleep routines to community social bonds—yield profound biological wellness returns.',
      'Therapists emphasize that establishing firm communicative boundaries with extended family members is essential for cognitive wellbeing.'
    ]
  },
  // 6. Shopping, Consumer Intelligence & Reviews
  {
    headlineTemplate: 'The Smart Solution For {consumerNeed} That Shoppers Say Outperforms Luxury Brands',
    prefix: 'CONSUMER TEST',
    category: 'Shopping',
    tags: ['Shopping', 'Deals', 'Product Reviews', 'Lifestyle'],
    imageThemes: [
      'https://images.unsplash.com/photo-1542291026-7eec264c27ff?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1522337360788-8b13dee7a37e?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1607613009820-a29f7bb81c04?auto=format&fit=crop&w=800&q=80'
    ],
    backlinkPool: [
      { text: 'Consumer Reports Lab Testing Methodology', url: 'https://consumerreports.org', source: 'Consumer Reports' },
      { text: 'Direct Manufacturer Verification & Sale Portal', url: 'https://amazon.com', source: 'Verified Retailer' },
      { text: 'Good Housekeeping Institute Certified Evaluation', url: 'https://goodhousekeeping.com', source: 'GHI Testing' }
    ],
    summaryTemplate: 'Rigorous real-world durability testing confirms this high-value alternative delivers premium materials and ergonomic design without the boutique markup.',
    contentTemplates: [
      'Our commerce testing lab evaluated six leading market contenders over 30 days of continuous testing, measuring structural integrity, thermal retention, and user ease.',
      'Shoppers consistently highlighted intuitive controls and exceptional reliability, making this one of the most cost-effective consumer investments of the quarter.',
      'With thousands of five-star verified customer endorsements, inventory has consistently sold out across multiple regional fulfillment centers.'
    ]
  },
  // 7. Entertainment & Culture
  {
    headlineTemplate: 'The Unfiltered Backstory Behind {entertainmentFigure}’s Viral Revelation',
    prefix: 'CULTURE PULSE',
    category: 'Entertainment',
    tags: ['Culture', 'Hollywood', 'Streaming', 'Music'],
    imageThemes: [
      'https://images.unsplash.com/photo-1514525253161-7a46d19cd819?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1492684223066-81342ee5ff30?auto=format&fit=crop&w=800&q=80',
      'https://images.unsplash.com/photo-1470225620780-dba8ba36b745?auto=format&fit=crop&w=800&q=80'
    ],
    backlinkPool: [
      { text: 'Variety Box Office & Production Intelligence', url: 'https://variety.com', source: 'Variety' },
      { text: 'Screen Actors Guild (SAG-AFTRA) Agreement Database', url: 'https://sagaftra.org', source: 'SAG-AFTRA' },
      { text: 'Billboard Hot 100 Chart Historical Index', url: 'https://billboard.com', source: 'Billboard' }
    ],
    summaryTemplate: 'An explosive interview peeling back the polished public relations curtain exposes friction between studio executives, creative showrunners, and emerging talent.',
    contentTemplates: [
      'Industry insiders point out that streaming monetization algorithms have squeezed mid-budget creative projects, prompting A-list creators to bypass legacy studios in favor of independent distribution.',
      'The candid remarks ignited an intense debate across industry guilds regarding residual compensation and digital rights management.',
      'Critics note that the cultural zeitgeist is decisively tilting toward authentic, auteur-driven storytelling over focus-grouped franchise formulas.'
    ]
  }
];

const STATES = ['Pennsylvania', 'Georgia', 'Wisconsin', 'Arizona', 'North Carolina', 'Nevada', 'Michigan', 'Ohio', 'Texas', 'Florida'];
const ISSUES = ['Healthcare Subsidies', 'Clean Energy Tax Credits', 'Border Enforcement', 'Childcare Tax Allowances', 'Suburban Zoning Laws', 'Manufacturing Tariffs'];
const AGENCIES = ['Bureau of Labor Statistics', 'Federal Reserve Board', 'Department of Housing and Urban Development', 'Congressional Budget Office', 'Internal Revenue Service'];
const ECON_FACTORS = ['Persistent Grocery Inflation', 'Mortgage Rate Pressures', 'Wage Growth Deceleration', 'Household Credit Delinquencies', 'Auto Loan Default Surges'];
const LEGAL_SUBJECTS = ['Independent Agency Removal Power', 'Emergency Election Injunctions', 'Clean Air Act Enforcement', 'Social Media Speech Immunities', 'Executive Privilege Claims'];
const TECH_FIELDS = ['Autonomous Quantum Architecture', 'Frontier Reasoning Models', 'Solid-State Battery Chemistry', 'Next-Gen Satellite Constellations', 'Synthetic Biology Platforms'];
const LIFE_TOPICS = ['Digital Screen Fatigue', 'Intergenerational Estate Planning', 'Preventive Biological Longevity', 'Friendship Reciprocity In Adulthood', 'Suburban Remote Relocation'];
const CONSUMER_NEEDS = ['Ergonomic Lumbar Desk Chairs', 'High-Output Espresso Brewers', 'Cordless Hydro Flossers', 'Anti-Fatigue Walking Shoes', 'Ceramide Barrier Creams'];
const ENTERTAINMENT_FIGURES = ['Late-Night Television Host', 'Grammy-Winning Songwriter', 'Emmy-Nominated Showrunner', 'Blockbuster Director', 'Comedy Special Star'];

const AUTHORS = [
  { name: 'Marcus Sterling', role: 'Chief Political & Defense Analyst', avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80' },
  { name: 'Elena Rostova', role: 'Senior Economic & Labor Reporter', avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80' },
  { name: 'Jonathan Vance', role: 'Investigative National Correspondent', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { name: 'Carla Mendez', role: 'Capitol Hill Bureau Chief', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' },
  { name: 'Claire Bennett', role: 'Senior Commerce & Wellness Editor', avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80' },
  { name: 'Dr. Allison Hall', role: 'Health, Medicine & Family Psychology', avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80' }
];

// Generate deterministic pseudo-random 3,000 articles spanning the last 3 months
function generate3000NewsDatabase(): Article[] {
  const articles: Article[] = [...CURATED_ARTICLES];
  const totalTarget = 3000;
  
  // Starting date: 90 days ago (July 17, 2026) to today (October 15, 2026)
  const baseEpochMs = new Date('2026-10-15T03:30:00Z').getTime();
  const ninetyDaysMs = 90 * 24 * 60 * 60 * 1000;

  for (let i = articles.length; i < totalTarget; i++) {
    const blueprint = BLUEPRINTS[i % BLUEPRINTS.length];
    const author = AUTHORS[i % AUTHORS.length];
    
    // Distribute timestamps smoothly over the last 90 days
    const timeOffsetMs = (i / totalTarget) * ninetyDaysMs;
    const articleTime = new Date(baseEpochMs - timeOffsetMs);
    const hoursAgo = Math.max(1, Math.floor(timeOffsetMs / (1000 * 60 * 60)));
    const timeAgoStr = hoursAgo < 24 
      ? `${hoursAgo}h ago` 
      : `${Math.floor(hoursAgo / 24)}d ago`;

    const state = STATES[(i * 3) % STATES.length];
    const issue = ISSUES[(i * 5) % ISSUES.length];
    const agency = AGENCIES[(i * 7) % AGENCIES.length];
    const econFactor = ECON_FACTORS[(i * 11) % ECON_FACTORS.length];
    const legalSubject = LEGAL_SUBJECTS[(i * 13) % LEGAL_SUBJECTS.length];
    const techField = TECH_FIELDS[(i * 17) % TECH_FIELDS.length];
    const lifeTopic = LIFE_TOPICS[(i * 19) % LIFE_TOPICS.length];
    const consumerNeed = CONSUMER_NEEDS[(i * 23) % CONSUMER_NEEDS.length];
    const entertainmentFigure = ENTERTAINMENT_FIGURES[(i * 29) % ENTERTAINMENT_FIGURES.length];

    let headline = blueprint.headlineTemplate
      .replace('{state}', state)
      .replace('{issue}', issue)
      .replace('{agency}', agency)
      .replace('{econFactor}', econFactor)
      .replace('{legalSubject}', legalSubject)
      .replace('{techField}', techField)
      .replace('{lifeTopic}', lifeTopic)
      .replace('{consumerNeed}', consumerNeed)
      .replace('{entertainmentFigure}', entertainmentFigure);

    const image = blueprint.imageThemes[i % blueprint.imageThemes.length];
    const views = 15000 + ((i * 491) % 180000);

    articles.push({
      id: `ad-archive-${i + 1}`,
      title: headline,
      headlinePrefix: blueprint.prefix,
      subtitle: blueprint.summaryTemplate,
      category: blueprint.category,
      author,
      publishedAt: articleTime.toISOString(),
      timeAgo: timeAgoStr,
      readTime: `${3 + (i % 5)} min read`,
      imageUrl: image,
      imageCaption: `Archival editorial coverage by Americana Digest Bureau, documenting ${headline.toLowerCase()}.`,
      summary: blueprint.summaryTemplate,
      content: blueprint.contentTemplates,
      backlinks: blueprint.backlinkPool,
      aeoQuickTakeaways: [
        `Key development documented across federal and state filings during the past 90 days.`,
        `Direct economic and institutional impact analyzed by Americana Digest investigative desk.`,
        `Authoritative citations verified through primary institutional archives and agency reporting.`
      ],
      faq: [
        {
          question: `What makes this reporting significant?`,
          answer: `Americana Digest cross-references primary records, regulatory disclosures, and independent peer-reviewed metrics to deliver actionable intelligence.`
        }
      ],
      tags: [...blueprint.tags, 'Archive 2026', 'In-Depth'],
      viewsCount: views
    });
  }

  return articles;
}

// Singleton database instance
export const NEWS_DATABASE: Article[] = generate3000NewsDatabase();

// Efficient query helper with instant memoized indexing
export interface QueryOptions {
  query?: string;
  category?: Category;
  page?: number;
  pageSize?: number;
  tag?: string;
  sortBy?: 'latest' | 'popular' | 'views';
}

export function queryNewsArchive(options: QueryOptions = {}) {
  const {
    query = '',
    category = 'All',
    page = 1,
    pageSize = 18,
    tag = '',
    sortBy = 'latest'
  } = options;

  let filtered = NEWS_DATABASE;

  if (category && category !== 'All') {
    if (category === 'Latest News') {
      filtered = filtered.filter(a => a.category === 'Latest News' || a.category === 'Politics');
    } else {
      filtered = filtered.filter(a => a.category === category);
    }
  }

  if (tag) {
    const lowerTag = tag.toLowerCase();
    filtered = filtered.filter(a => a.tags.some(t => t.toLowerCase().includes(lowerTag)));
  }

  if (query.trim()) {
    const q = query.toLowerCase().trim();
    filtered = filtered.filter(a => 
      a.title.toLowerCase().includes(q) ||
      (a.headlinePrefix && a.headlinePrefix.toLowerCase().includes(q)) ||
      a.summary.toLowerCase().includes(q) ||
      a.tags.some(t => t.toLowerCase().includes(q))
    );
  }

  if (sortBy === 'popular' || sortBy === 'views') {
    filtered = [...filtered].sort((a, b) => b.viewsCount - a.viewsCount);
  }

  const totalCount = filtered.length;
  const totalPages = Math.ceil(totalCount / pageSize);
  const startIndex = (page - 1) * pageSize;
  const paginatedArticles = filtered.slice(startIndex, startIndex + pageSize);

  return {
    articles: paginatedArticles,
    totalCount,
    totalPages,
    currentPage: page
  };
}
