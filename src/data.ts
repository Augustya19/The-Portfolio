import projects from './content/design-work.json'
import thumbnails from './content/thumbnails.json'

// Every fact below comes from the resume PDF or details the owner gave directly.
// Anything not yet supplied (Notion case-study links, design-work images) is left empty on purpose.

export const profile = {
  name: 'Augustya',
  brand: 'Augustya.',
  email: 'augustya13y@gmail.com',
  phone: '+91-8700113952',
  portfolio: 'https://augustya.vercel.app/',
  github: 'https://github.com/Augustya19',
  behance: 'https://behance.net/augustyayadav',
  summary:
    'Designer and frontend developer who takes products from Figma to deployed code, with additional exposure to AI integration and data-driven design. Strong foundation in visual storytelling, interaction design, and building interfaces that are both functional and visually compelling.',
  tags: ['Figma', 'Interaction design', 'Frontend code', 'Applied AI', 'Product thinking', 'Data-driven design'],
}

export const education = {
  institution: 'Arya College of Engineering and I.T, Jaipur',
  degree: 'B.Tech, Computer Science',
  years: '2021 to 2025',
  cgpa: 'CGPA 8.5/10',
  certifications: [
    'Front-end Developer Capstone',
    'Introduction to Front-End Development',
    'Fundamentals of Graphic Design',
    'Hands-On Data Visualization with Microsoft Power BI',
  ],
}

export const experience = [
  {
    company: 'OptiPhoenix',
    position: 'Graphic Designer',
    duration: 'May 2026 to Present',
    location: 'Remote',
    current: true,
    responsibilities: [
      'Led the end-to-end redesign of the company website, restructuring the information architecture and merging scattered content into one clear brand narrative.',
      'Designed and shipped conversion-focused landing pages and branded reports, building color and layout systems from each client’s brand assets.',
      'Built a reusable design system (typography, color tokens, layout patterns) for the monthly newsletter and social calendar.',
      'Produced LinkedIn carousels, recognition posts, and campaign visuals, combining coded (HTML/SVG) and traditional design workflows.',
    ],
  },
  {
    company: 'Self-directed',
    position: 'Indie Product Builder',
    duration: 'Nov 2025 to May 2026',
    location: 'Remote',
    current: false,
    responsibilities: [
      'Defined product vision, user personas, and OKRs for AdmitSync, ELI5, and FitAI; scoped MVP features with the RICE framework and wrote PRDs with acceptance criteria.',
      'Ran 10+ user interviews across AdmitSync and ELI5, turning findings into journey maps, problem statements, and a prioritised backlog.',
      'Owned the full product lifecycle: discovery, Figma wireframes, usability testing with about 15 users, and post-launch iteration.',
    ],
    achievement: 'Reduced navigation friction by about 25% across products.',
  },
  {
    company: 'Learning Routes',
    position: 'Management Trainee',
    duration: 'Jun 2025 to Aug 2025',
    location: 'Gurgaon',
    current: false,
    responsibilities: [
      'Tracked the end-to-end sales pipeline via CRM and Excel, and identified funnel drop-off patterns.',
      'Prepared weekly reports on client interactions and lead conversions for senior managers.',
    ],
    achievement: 'Presented findings that led to process improvements the team adopted.',
  },
]

export type CaseStudy = {
  title: string
  description: string
  color: 'lavender' | 'powder' | 'pink' | 'sky'
  headline: string // From the Notion page title, shown after the name.
  notion: string
  featured?: boolean // Shown as a big folder on the page; every study appears in "View all".
  // Summary shown on the paper that pops out of a featured folder. Taken from the Notion page.
  problem?: string
  role?: string
  outcome?: string
  tags?: string[]
}

const notion = (id: string) => `https://app.notion.com/p/${id}`

// Order matters: featured studies appear on the page in this order.
export const caseStudies: CaseStudy[] = [
  {
    title: 'SHUSH',
    headline: 'Women’s Health Portal',
    problem: 'Menstrual health education is missing from most Indian schools and homes.',
    role: 'Product, design and build',
    outcome: 'An anonymous, mobile-first health hub, live on the web.',
    tags: ['Health', 'Mobile-first'],
    description: 'A women’s health awareness platform with an anonymous-first design.',
    color: 'pink',
    notion: notion('339be2d7216a8066910ad3188f4a6236'),
    featured: true,
  },
  {
    title: 'AdmitSync',
    headline: 'College Application Tracker',
    problem: 'Exam deadlines are scattered across 30+ official sources.',
    role: 'Product, design and build',
    outcome: 'One personalised deadline timeline, live on the web.',
    tags: ['EdTech', 'Gemini AI'],
    description: 'A college application tracker for entrance exam deadlines.',
    color: 'sky',
    notion: notion('339be2d7216a8025aa2df48a8152d912'),
    featured: true,
  },
  {
    title: 'Uber',
    headline: 'Fare Revision Transparency for Ride-Hailing Apps',
    problem: 'Riders only see a higher fare on the receipt, after paying.',
    role: 'Product thinking and UI concept',
    outcome: 'An itemised fare-revision screen shown before payment.',
    tags: ['Concept', 'Mobility'],
    description: 'A concept that explains fare revisions to riders in plain language.',
    color: 'powder',
    notion: notion('2cabe2d7216a80ce845bd86145758bec'),
    featured: true,
  },
  {
    title: 'FitAI',
    headline: 'AI Fitness Coach',
    problem: 'Beginners quit because fitness apps overwhelm them on day one.',
    role: 'Product and UX',
    outcome: 'One short AI workout a day that adapts to feedback.',
    tags: ['AI', 'Health'],
    description: 'An AI fitness coach that builds personalised plans.',
    color: 'lavender',
    notion: notion('2c5be2d7216a8071a375fd5e6d48221e'),
    featured: true,
  },
  {
    title: 'ELI5',
    headline: 'Explain Like I’m 5',
    description: 'An AI tool that explains complex concepts in simple terms.',
    color: 'powder',
    notion: notion('303be2d7216a808db049eab46973f3fb'),
  },
  {
    title: 'Spotify',
    headline: 'Find That Tune',
    description: 'A concept for finding a song by humming the melody.',
    color: 'pink',
    notion: notion('324be2d7216a83af8bf701aaac609a95'),
  },
  {
    title: 'Spotify',
    headline: 'Focus Mode Intelligence',
    description: 'A concept that tunes music to what you are doing: coding, reading or relaxing.',
    color: 'lavender',
    notion: notion('2ebbe2d7216a80cf8bcee6c78ddf1395'),
  },
  {
    title: 'Rentickle',
    headline: 'PDP Redesign',
    description: 'A product page redesign for furniture rental.',
    color: 'sky',
    notion: notion('410be2d7216a81dd9af9df2447f1c0f9'),
  },
  {
    title: 'BlinkMoney',
    headline: 'Product Teardown',
    description: 'A teardown of a fintech app’s onboarding and trust gaps.',
    color: 'powder',
    notion: notion('410be2d7216a81318a05ee0f440e9b1c'),
  },
]

export type WorkCategory = 'Illustration' | 'UI/UX' | 'Branding'

export type WorkItem = {
  title: string
  category: WorkCategory
  link: string // The project page (Behance or any site). Its preview image becomes the thumbnail.
  description?: string // Shown only for UI/UX work.
  focus?: string // Optional crop point for the thumbnail, e.g. '50% 70%'.
  image?: string // Optional: your own thumbnail (a file in public/ or a full URL). Wins over the fetched one.
}

// To add a project: add an entry to src/content/design-work.json with its link.
// `npm run build` (and every Vercel deploy) fetches each link's preview image into
// public/thumbs/ and records it in src/content/thumbnails.json. Anything without a
// thumbnail shows a coloured placeholder instead.

const thumbs = thumbnails as Record<string, string>

export const designWork: WorkItem[] = (projects as WorkItem[]).map((p) => ({
  ...p,
  image: p.image ?? thumbs[p.link],
}))
