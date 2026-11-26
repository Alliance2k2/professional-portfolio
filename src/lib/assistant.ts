import {
  development,
  education,
  experience,
  interests,
  profile,
  projects,
  research,
  skills,
} from '@/lib/content';

export type AssistantSource = { href: string; label: string; title: string };
export type RetrievalMatch = AssistantSource & {
  id: string;
  text: string;
  score: number;
};
export type Answer = {
  text: string;
  href: string;
  label: string;
  sources: AssistantSource[];
  suggestions: string[];
  abstained?: boolean;
};

type KnowledgeDocument = AssistantSource & { id: string; text: string };
type KnowledgeChunk = RetrievalMatch & { terms: string[] };

const documents: KnowledgeDocument[] = [
  {
    id: 'profile',
    href: '/about',
    label: 'About',
    title: 'Professional profile',
    text: `${profile.name}. ${profile.headline}. ${profile.summary} Based in ${profile.location}.`,
  },
  {
    id: 'contact',
    href: '/contact',
    label: 'Contact',
    title: 'Contact and professional links',
    text: `For professional inquiries, email ${profile.email}. GitHub: ${profile.github}. LinkedIn: ${profile.linkedin}.`,
  },
  ...experience.map((item, index) => ({
    id: `experience-${index}`,
    href: '/experience',
    label: 'Experience',
    title: `${item.title} — ${item.organization}`,
    text: `${item.title} at ${item.organization}. ${item.date}. ${item.detail}`,
  })),
  ...education.map((item, index) => ({
    id: `education-${index}`,
    href: '/education',
    label: 'Education',
    title: `${item.title} — ${item.organization}`,
    text: `Academic degree and education record. ${item.title} at ${item.organization}. ${item.date}. ${item.detail}`,
  })),
  {
    id: 'skills-overview',
    href: '/skills',
    label: 'Skills',
    title: 'Skills, technologies and programming tools',
    text: `Technical skills, programming languages, software tools and data technologies documented across ${skills.map((group) => group.title).join(', ')}: ${skills.flatMap((group) => group.items).join(', ')}.`,
  },
  ...skills.map((group, index) => ({
    id: `skills-${index}`,
    href: '/skills',
    label: 'Skills',
    title: group.title,
    text: `${group.title}. ${group.items.join('. ')}. Evidence: ${group.evidence}.`,
  })),
  ...development.map(([title, organization, date], index) => ({
    id: `development-${index}`,
    href: '/certifications',
    label: 'Professional development',
    title,
    text: `${title}. ${organization}. ${date}. Listed as professional development; credential documents are not included.`,
  })),
  ...projects.map((project) => ({
    id: `project-${project.slug}`,
    href: `/projects/${project.slug}`,
    label: 'Project',
    title: project.title,
    text: [
      project.title,
      project.subtitle,
      project.summary,
      project.problem,
      project.method,
      project.implementation,
      project.results,
      project.limitations,
      project.duration,
      project.contribution,
      project.architectureSource,
      ...(project.objectives ?? []),
      ...(project.architecture ?? []).flatMap((step) => [step.stage, step.detail]),
      ...(project.technicalChallenges ?? []),
      ...(project.lessonsLearned ?? []),
      ...(project.futureImprovements ?? []),
      ...(project.technologies ?? project.tags),
    ]
      .filter(Boolean)
      .join('. '),
  })),
  ...research.map((item) => ({
    id: `research-${item.slug}`,
    href: `/research/${item.slug}`,
    label: 'Research',
    title: item.title,
    text: [
      item.title,
      item.status,
      item.description,
      item.body,
      item.abstract,
      item.publicationStatus,
      ...(item.methodology ?? []),
      ...(item.researchInterests ?? []),
      ...(item.equations ?? []).map((equation) => `${equation.label} ${equation.tex}`),
    ]
      .filter(Boolean)
      .join('. '),
  })),
  {
    id: 'interests',
    href: '/about',
    label: 'Interests',
    title: 'Professional interests',
    text: `Professional interests include ${interests.join(', ')}. Personal interests include baking.`,
  },
];

const STOP_WORDS = new Set(
  'a an and are as at be by can do did for from has how i in is it its my of on or tell that the their this to was what when where which who why with would your about me please'.split(
    ' ',
  ),
);

const SYNONYMS: Record<string, string[]> = {
  ai: ['artificial intelligence', 'machine learning', 'applied ai'],
  artificial: ['ai', 'machine learning'],
  background: ['profile', 'experience', 'education'],
  bake: ['baking', 'interest', 'hobby'],
  baking: ['interest', 'hobby'],
  career: ['experience', 'employment', 'internship'],
  citizen: ['community', 'agricultural research'],
  contact: ['email', 'github', 'linkedin'],
  cv: ['resume', 'résumé', 'education', 'experience'],
  degree: ['education', 'qualification', 'university'],
  finance: ['financial analytics', 'banking', 'financial stability'],
  financial: ['finance', 'banking', 'economic', 'financial stability'],
  hobby: ['interest', 'baking'],
  interest: ['baking', 'financial analytics', 'research'],
  job: ['experience', 'career', 'internship'],
  math: ['mathematics', 'statistics', 'optimization'],
  mathematics: ['mathematical', 'statistics', 'optimization'],
  mathematical: ['math', 'statistics', 'statistical'],
  program: ['skill', 'software', 'code', 'language'],
  project: ['work', 'implementation', 'portfolio'],
  qualification: ['education', 'degree', 'study'],
  retrieval: ['bm25', 'search', 'documents', 'citations'],
  research: ['thesis', 'study', 'analysis'],
  resume: ['cv', 'profile', 'experience'],
  skill: ['technology', 'tool', 'software'],
  statistic: ['statistical', 'mathematics', 'math'],
  study: ['education', 'degree', 'research'],
  technology: ['tool', 'software', 'engineering'],
  work: ['project', 'experience', 'career'],
};

function stem(token: string): string {
  if (token.length > 5 && token.endsWith('ies')) return `${token.slice(0, -3)}y`;
  if (token.length > 5 && token.endsWith('ing')) {
    const base = token.slice(0, -3);
    return /([b-df-hj-np-tv-z])\1$/.test(base) ? base.slice(0, -1) : base;
  }
  if (token.length > 4 && token.endsWith('ied')) return `${token.slice(0, -3)}y`;
  if (token.length > 4 && token.endsWith('ed')) return token.slice(0, -2);
  if (token.length > 4 && token.endsWith('s') && !token.endsWith('ss')) {
    return token.slice(0, -1);
  }
  return token;
}

export function normalizeQuery(value: string): string[] {
  return Array.from(
    new Set(
      value
        .normalize('NFKD')
        .replace(/[\u0300-\u036f]/g, '')
        .toLocaleLowerCase('en')
        .replace(/&/g, ' and ')
        .replace(/[^a-z0-9+#]+/g, ' ')
        .split(/\s+/)
        .map(stem)
        .filter(
          (term) => (term.length > 1 || term === 'r' || term === 'c') && !STOP_WORDS.has(term),
        ),
    ),
  );
}

function splitIntoChunks(document: KnowledgeDocument): KnowledgeChunk[] {
  const sentences = `${document.label}. ${document.title}. ${document.text}`
    .replace(/\s+/g, ' ')
    .trim()
    .split(/(?<=[.!?])\s+/)
    .filter(Boolean);
  const chunks: string[] = [];
  let current = '';
  for (const sentence of sentences) {
    const candidate = `${current} ${sentence}`.trim();
    if (current && candidate.split(/\s+/).length > 76) {
      chunks.push(current);
      current = sentence;
    } else {
      current = candidate;
    }
  }
  if (current) chunks.push(current);
  return chunks.map((text, index) => ({
    ...document,
    id: `${document.id}-${index}`,
    text,
    score: 0,
    terms: normalizeQuery(text),
  }));
}

const indexedChunks: KnowledgeChunk[] = documents.flatMap(splitIntoChunks);
export const publicKnowledgeBase: RetrievalMatch[] = indexedChunks.map(
  ({ id, title, href, label, text, score }) => ({
    id,
    title,
    href,
    label,
    text,
    score,
  }),
);
const documentFrequency = new Map<string, number>();
for (const chunk of indexedChunks) {
  for (const term of new Set(chunk.terms)) {
    documentFrequency.set(term, (documentFrequency.get(term) ?? 0) + 1);
  }
}
const averageLength =
  indexedChunks.reduce((sum, chunk) => sum + chunk.terms.length, 0) /
  Math.max(indexedChunks.length, 1);

const MIN_RELEVANCE_SCORE = 1.25;
const BM25_K1 = 1.5;
const BM25_B = 0.75;

function weightedQueryTerms(query: string): Map<string, number> {
  const terms = new Map<string, number>();
  const add = (term: string, weight: number) => {
    terms.set(term, Math.max(terms.get(term) ?? 0, weight));
  };
  for (const term of normalizeQuery(query)) {
    add(term, 1);
    for (const synonym of SYNONYMS[term] ?? []) {
      for (const expanded of normalizeQuery(synonym)) add(expanded, 0.42);
    }
  }
  return terms;
}

function scoreChunk(chunk: KnowledgeChunk, queryTerms: Map<string, number>) {
  const frequencies = new Map<string, number>();
  for (const term of chunk.terms) {
    frequencies.set(term, (frequencies.get(term) ?? 0) + 1);
  }
  let score = 0;
  for (const [term, weight] of queryTerms) {
    const frequency = frequencies.get(term) ?? 0;
    if (!frequency) continue;
    const docFrequency = documentFrequency.get(term) ?? 0;
    const inverseFrequency = Math.log(
      1 + (indexedChunks.length - docFrequency + 0.5) / (docFrequency + 0.5),
    );
    const lengthNorm =
      frequency +
      BM25_K1 *
        (1 - BM25_B + BM25_B * (chunk.terms.length / averageLength));
    score += weight * inverseFrequency * ((frequency * (BM25_K1 + 1)) / lengthNorm);
  }
  let sourceBoost = 1;
  if (
    chunk.href.startsWith('/research/') &&
    (queryTerms.has('research') || queryTerms.has('thesis'))
  ) {
    sourceBoost *= 1.2;
  }
  if (
    chunk.href === '/education' &&
    ['education', 'degree', 'qualification', 'university'].some((term) =>
      queryTerms.has(term),
    )
  ) {
    sourceBoost *= 1.2;
  }
  if (
    chunk.href === '/skills' &&
    ['skill', 'technology', 'tool', 'program', 'software'].some((term) =>
      queryTerms.has(term),
    )
  ) {
    sourceBoost *= 1.2;
  }
  if (
    chunk.href === '/projects/cs-ircfs' &&
    queryTerms.has('architecture')
  ) {
    sourceBoost *= 1.25;
  }
  return score * sourceBoost;
}

function isFollowUp(query: string) {
  const terms = normalizeQuery(query);
  return (
    terms.length <= 2 ||
    /\b(more|that|this|it|why|how so|explain|details|continue)\b/i.test(query)
  );
}

export function retrieveSources(
  query: string,
  context?: string,
  limit = 3,
): RetrievalMatch[] {
  const normalized = query.trim().slice(0, 500);
  const contextualQuery = context && isFollowUp(normalized)
    ? `${context.slice(0, 240)} ${normalized}`
    : normalized;
  if (!normalized || !normalizeQuery(contextualQuery).length) return [];
  const queryTerms = weightedQueryTerms(contextualQuery);
  const ranked = indexedChunks
    .map((chunk) => ({ ...chunk, score: scoreChunk(chunk, queryTerms) }))
    .filter((chunk) => chunk.score >= MIN_RELEVANCE_SCORE)
    .sort((left, right) => right.score - left.score);
  const unique = new Map<string, RetrievalMatch>();
  for (const match of ranked) {
    if (!unique.has(match.href)) unique.set(match.href, match);
    if (unique.size >= limit) break;
  }
  return Array.from(unique.values());
}

const SUGGESTIONS: Record<string, string[]> = {
  '/about': ['What professional interests are listed?', 'How can I contact Alliance?'],
  '/contact': ['What projects are most relevant?', 'What is Alliance’s education?'],
  '/education': ['What was the MSc research topic?', 'What professional development is listed?'],
  '/experience': ['Tell me about citizen-science work.', 'What did Alliance do at the National Bank of Rwanda?'],
  '/projects/cs-ircfs': ['How is the platform architecture described?', 'What are the documented limits?'],
  '/projects/financial-stability-africa': ['What model result is reported?', 'What data was described?'],
  '/research/malaria': ['What methods are verified?', 'What research materials are available?'],
  '/research/citizen-science': ['What is CS-IRCFS?', 'How does the assistant retrieve sources?'],
};

const PRIVATE_QUERY =
  /\b(passport|national\s+id|identification\s+number|private\s+phone|personal\s+phone|telephone\s+number|home\s+address|secret|password)\b/i;

export function answerQuestion(query: string, previousQuery?: string): Answer {
  const cleaned = query.trim().slice(0, 500);
  if (!cleaned || PRIVATE_QUERY.test(cleaned)) {
    return {
      text: 'I can only search the public professional information on this site. I don’t retrieve private contact details or identity information.',
      href: '/privacy',
      label: 'Privacy notice',
      sources: [{ href: '/privacy', label: 'Privacy notice', title: 'Privacy notice' }],
      suggestions: ['What professional information is public?', 'How can I contact Alliance?'],
      abstained: true,
    };
  }
  const matches = retrieveSources(cleaned, previousQuery);
  if (!matches.length) {
    return {
      text: 'I couldn’t find a reliable answer in the public portfolio content. Try a question about education, experience, projects, research, skills, interests or contact details.',
      href: '/projects',
      label: 'Browse projects',
      sources: [],
      suggestions: ['What is Alliance’s education?', 'Tell me about CS-IRCFS.', 'What are the listed interests?'],
      abstained: true,
    };
  }
  const lead = matches[0];
  const supporting = matches.slice(1, 3);
  return {
    text: [lead, ...supporting]
      .map((match) => match.text)
      .join('\n\n'),
    href: lead.href,
    label: lead.label,
    sources: matches.map(({ href, label, title }) => ({ href, label, title })),
    suggestions: SUGGESTIONS[lead.href] ?? [
      'What are the project limitations?',
      'What related experience is documented?',
    ],
  };
}
