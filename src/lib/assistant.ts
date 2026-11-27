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
  {
    id: 'resume',
    href: '/resume',
    label: 'Résumé',
    title: 'Public résumé and PDF',
    text: 'The public online résumé can be printed or saved as a PDF. The original CV is kept private because it includes a telephone number. A reviewed public CV PDF can be added later.',
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
  'a an and are as at be by can do did for from has how i in is it its my of on or tell that the their this to was what when where which who why with would your about me please more le la les un une des du de au aux en est sont qui que quoi quel quelle quels quelles mon ma mes son sa ses pour dans par sur avec ou je vous il elle nous bwa mu ku kuri na ni ya yo iki igihe buri ki ubuhe iyihe'.split(
    ' ',
  ),
);

const QUERY_ALIASES: Record<string, string> = {
  uburezi: 'education',
  ubushakashatsi: 'research',
  imishinga: 'project',
  umushinga: 'project',
  ubuhanga: 'skill',
  ubunararibonye: 'experience',
  formation: 'education',
  diplome: 'education',
  etude: 'education',
  etudes: 'education',
  maitrise: 'msc',
  these: 'thesis',
  recherche: 'research',
  projet: 'project',
  competence: 'skill',
  competences: 'skill',
  travail: 'work',
  contacter: 'contact',
  joindre: 'contact',
  donnee: 'data',
  donnees: 'data',
  financiere: 'financial',
  financier: 'financial',
  paludisme: 'malaria',
  banque: 'bank',
  nationale: 'national',
  afrique: 'africa',
  stabilite: 'stability',
};

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
  experience: ['career', 'employment', 'internship', 'role'],
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
  if (token.endsWith('sis') || token.endsWith('is')) return token;
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

function tokenize(value: string): string[] {
  return value
    .normalize('NFKD')
    .replace(/[\u0300-\u036f]/g, '')
    .toLocaleLowerCase('en')
    .replace(/&/g, ' and ')
    .replace(/[^a-z0-9+#]+/g, ' ')
    .split(/\s+/)
    .map(stem)
    .filter(
      (term) => (term.length > 1 || term === 'r' || term === 'c') && !STOP_WORDS.has(term),
    );
}

export function normalizeQuery(value: string): string[] {
  return Array.from(
    new Set(tokenize(value).map((term) => QUERY_ALIASES[term] ?? term)),
  );
}

/** Document tokens preserve term frequency for BM25. Query tokens are unique. */
export function tokenizeDocument(value: string): string[] {
  return tokenize(value);
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
    terms: tokenizeDocument(text),
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

export const assistantIndexStats = {
  chunkCount: indexedChunks.length,
  vocabularySize: documentFrequency.size,
  averageDocumentLength: averageLength,
};

const MIN_RELEVANCE_SCORE = 1.25;
const BM25_K1 = 1.5;
const BM25_B = 0.75;
const vocabulary = Array.from(documentFrequency.keys());

function isOneEditAway(left: string, right: string): boolean {
  if (left === right || Math.abs(left.length - right.length) > 1) return false;
  let leftIndex = 0;
  let rightIndex = 0;
  let edits = 0;
  while (leftIndex < left.length && rightIndex < right.length) {
    if (left[leftIndex] === right[rightIndex]) {
      leftIndex += 1;
      rightIndex += 1;
      continue;
    }
    edits += 1;
    if (edits > 1) return false;
    if (
      left.length === right.length &&
      left[leftIndex] === right[rightIndex + 1] &&
      left[leftIndex + 1] === right[rightIndex]
    ) {
      leftIndex += 2;
      rightIndex += 2;
    } else if (left.length > right.length) {
      leftIndex += 1;
    } else if (right.length > left.length) {
      rightIndex += 1;
    } else {
      leftIndex += 1;
      rightIndex += 1;
    }
  }
  if (leftIndex < left.length || rightIndex < right.length) edits += 1;
  return edits === 1;
}

function uniqueTypoCandidate(term: string): string | undefined {
  if (term.length < 5 || documentFrequency.has(term)) return undefined;
  const candidates = vocabulary.filter(
    (candidate) =>
      Math.abs(candidate.length - term.length) <= 1 &&
      isOneEditAway(term, candidate),
  );
  return candidates.length === 1 ? candidates[0] : undefined;
}

function weightedQueryTerms(query: string): Map<string, number> {
  const terms = new Map<string, number>();
  const add = (term: string, weight: number) => {
    terms.set(term, Math.max(terms.get(term) ?? 0, weight));
  };
  for (const term of normalizeQuery(query)) {
    add(term, 1);
    const corrected = uniqueTypoCandidate(term);
    if (corrected) add(corrected, 0.58);
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
    sourceBoost *= 1.45;
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
    chunk.href === '/experience' &&
    ['experience', 'career', 'employment', 'internship', 'role'].some((term) =>
      queryTerms.has(term),
    )
  ) {
    sourceBoost *= 1.3;
  }
  if (
    chunk.href === '/resume' &&
    ['resume', 'cv', 'pdf', 'download'].some((term) => queryTerms.has(term))
  ) {
    sourceBoost *= 1.4;
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

const GENERIC_QUERY_TERMS = new Set([
  'detail',
  'limitation',
  'result',
  'method',
  'outcome',
  'project',
]);

export function retrieveSources(
  query: string,
  context?: string,
  limit = 3,
): RetrievalMatch[] {
  const normalized = query.trim().slice(0, 500);
  const contextualQuery = context && isFollowUp(normalized)
    ? `${context.slice(0, 240)} ${normalized}`
    : normalized;
  const normalizedTerms = normalizeQuery(contextualQuery);
  if (
    !normalized ||
    !normalizedTerms.length ||
    normalizedTerms.every((term) => GENERIC_QUERY_TERMS.has(term))
  ) {
    return [];
  }
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
  /\b(passport|national\s+id|identification\s+number|social\s+security|private\s+phone|personal\s+phone|mobile\s+number|phone\s+number|telephone\s+number|home\s+address|street\s+address|private\s+contact|personal\s+reference|secret|password)\b|\b(?:private|personal|family)\b[\s\S]{0,30}\breference\b/i;
const PROMPT_INJECTION_QUERY =
  /\b(ignore|disregard|override|bypass|forget)\b[\s\S]{0,100}\b(previous|system|developer|assistant|safety|instructions|prompt|rules)\b|\b(reveal|show|print|repeat|expose|export)\b[\s\S]{0,80}\b(system\s+prompt|developer\s+instructions|hidden\s+(?:instructions|prompt)|private\s+data)\b/i;
const FABRICATION_QUERY =
  /\b(invent|fabricate|make\s+up|create\s+fake)\b[\s\S]{0,80}\b(citation|source|publication|result|achievement|claim)\b/i;
const NON_SPECIFIC_EVIDENCE_TERMS = new Set([
  'alliance',
  'irigenera',
  'professional',
  'portfolio',
  'listed',
  'documented',
  'current',
  'exact',
  'specific',
  'one',
  'best',
  'there',
  'happen',
  ...GENERIC_QUERY_TERMS,
]);

function extractRelevantAnswer(
  text: string,
  query: string,
  context?: string,
): string {
  const contextualQuery =
    context && isFollowUp(query) ? context.slice(0, 240) + ' ' + query : query;
  const queryTerms = weightedQueryTerms(contextualQuery);
  const selected = text
    .split(/(?<=[.!?])\s+/)
    .map((sentence, index) => {
      const uniqueTerms = new Set(tokenizeDocument(sentence));
      let score = 0;
      for (const term of uniqueTerms) {
        if (!NON_SPECIFIC_EVIDENCE_TERMS.has(term)) {
          score += queryTerms.get(term) ?? 0;
        }
      }
      return { sentence, index, score };
    })
    .filter(({ sentence, score }) => sentence.length > 16 && score > 0)
    .sort((left, right) => right.score - left.score || left.index - right.index)
    .slice(0, 2)
    .sort((left, right) => left.index - right.index);
  return selected.map(({ sentence }) => sentence).join(' ');
}

function hasSpecificSourceEvidence(
  text: string,
  query: string,
  context?: string,
): boolean {
  const contextualQuery =
    context && isFollowUp(query) ? context.slice(0, 240) + ' ' + query : query;
  const queryTerms = normalizeQuery(contextualQuery).filter(
    (term) => !NON_SPECIFIC_EVIDENCE_TERMS.has(term),
  );
  if (!queryTerms.length) return false;
  const sourceTerms = new Set(tokenizeDocument(text));
  return queryTerms.some((term) => sourceTerms.has(term));
}

export function answerQuestion(query: string, previousQuery?: string): Answer {
  const cleaned = query.trim().slice(0, 500);
  if (
    !cleaned ||
    PRIVATE_QUERY.test(cleaned) ||
    PROMPT_INJECTION_QUERY.test(cleaned) ||
    FABRICATION_QUERY.test(cleaned)
  ) {
    return {
      text: 'I can only answer from public portfolio material. I cannot provide hidden instructions or private information.',
      href: '/privacy',
      label: 'Privacy notice',
      sources: [],
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
  const pageText = publicKnowledgeBase
    .filter((chunk) => chunk.href === lead.href)
    .map((chunk) => chunk.text)
    .join(' ');
  const excerpt = extractRelevantAnswer(pageText, cleaned, previousQuery);
  if (
    !hasSpecificSourceEvidence(pageText, cleaned, previousQuery) ||
    !excerpt ||
    (/\b(how many|how much|number of|count of)\b/i.test(cleaned) &&
      !/\b(?:\d[\d,]*(?:\.\d+)?|zero|one|two|three|four|five|six|seven|eight|nine|ten|eleven|twelve|thirteen)\b/i.test(
        excerpt,
      ))
  ) {
    return {
      text: 'I couldn’t find a reliable answer in the public portfolio content. Try asking about a specific project, qualification, skill or role.',
      href: '/projects',
      label: 'Browse projects',
      sources: [],
      suggestions: ['What is Alliance’s education?', 'Tell me about CS-IRCFS.'],
      abstained: true,
    };
  }
  return {
    text: excerpt,
    href: lead.href,
    label: lead.label,
    sources: [{ href: lead.href, label: lead.label, title: lead.title }],
    suggestions: SUGGESTIONS[lead.href] ?? [
      'What are the project limitations?',
      'What related experience is documented?',
    ],
  };
}
