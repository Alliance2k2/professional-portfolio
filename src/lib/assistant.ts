import { profile, projects, education, experience, skills } from './content';
export type Answer = { text: string; href: string; label: string };
const entries = [
  {
    terms: 'background about alliance profile who',
    text: profile.summary,
    href: '/about',
    label: 'Professional background',
  },
  {
    terms: 'education degree university aims qualifications master bachelor',
    text: education
      .map((e) => `${e.title}, ${e.organization} (${e.date}). ${e.detail}`)
      .join(' '),
    href: '/education',
    label: 'Education',
  },
  {
    terms: 'experience internship fellow employment work bank arrowstack',
    text: experience
      .map((e) => `${e.title} at ${e.organization}, ${e.date}.`)
      .join(' '),
    href: '/experience',
    label: 'Experience',
  },
  {
    terms: 'skills technology python sql programming expertise',
    text: skills.map((s) => `${s.title}: ${s.items.join(', ')}.`).join(' '),
    href: '/skills',
    label: 'Technical expertise',
  },
  {
    terms: 'contact email collaboration opportunities hire',
    text: `For collaboration, contact ${profile.email}. Based in ${profile.location}.`,
    href: '/contact',
    label: 'Contact Alliance',
  },
  ...projects.map((p) => ({
    terms: `${p.title} ${p.slug} ${p.summary} ${p.tags.join(' ')}`,
    text: `${p.summary} ${p.implementation} ${p.limitations}`,
    href: `/projects/${p.slug}`,
    label: p.title,
  })),
];
export function answerQuestion(question: string): Answer {
  if (
    question.length > 500 ||
    /ignore.*instruction|system prompt|secret|phone|passport|birthday|home address/i.test(
      question,
    )
  )
    return {
      text: 'I can only share the public professional information on this portfolio.',
      href: '/about',
      label: 'Public profile',
    };
  const tokens =
    question
      .toLowerCase()
      .match(/[a-z]{3,}/g)
      ?.filter(
        (t) =>
          ![
            'the',
            'and',
            'what',
            'does',
            'tell',
            'about',
            'your',
            'you',
            'can',
            'his',
            'her',
            'with',
          ].includes(t),
      ) ?? [];
  const ranked = entries
    .map((e) => ({
      e,
      score: tokens.reduce(
        (sum, t) => sum + (e.terms.toLowerCase().includes(t) ? 1 : 0),
        0,
      ),
    }))
    .sort((a, b) => b.score - a.score);
  if (!ranked[0]?.score)
    return {
      text: 'I don’t have verified information for that question. Try asking about education, projects, skills or collaboration.',
      href: '/contact',
      label: 'Ask Alliance directly',
    };
  return {
    text: ranked[0].e.text,
    href: ranked[0].e.href,
    label: ranked[0].e.label,
  };
}
