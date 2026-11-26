import { retrieveSources } from '@/lib/assistant';

export const assistantEvaluationDataset = [
  { query: 'What education and degrees has Alliance completed?', expected: '/education' },
  { query: 'What is the MSc research topic?', expected: '/research/malaria' },
  { query: 'What was studied for the bachelor degree?', expected: '/education' },
  { query: 'Tell me about citizen-science research and community feedback.', expected: '/research/citizen-science' },
  { query: 'How does the CS-IRCFS system architecture work?', expected: '/projects/cs-ircfs' },
  { query: 'How are duplicate SMS and USSD reports handled?', expected: '/projects/cs-ircfs' },
  { query: 'What retrieval methods and citations are used by the field assistant?', expected: '/projects/cs-evidence-assistant' },
  { query: 'What result is reported for the financial crisis model?', expected: '/projects/financial-stability-africa' },
  { query: 'Is financial analytics an area of interest?', expected: '/about' },
  { query: 'Which dataset was used for delivery and customer-satisfaction analysis?', expected: '/projects/last-mile-logistics' },
  { query: 'What authentication security features are documented for Arrowstack?', expected: '/projects/arrowstack-identity' },
  { query: 'Which programming and data tools are listed?', expected: '/skills' },
  { query: 'What professional training and summer schools are listed?', expected: '/certifications' },
  { query: 'What are Alliance’s personal interests beyond work?', expected: '/about' },
  { query: 'Where is Alliance based?', expected: '/about' },
  { query: 'How can I contact Alliance by email or LinkedIn?', expected: '/contact' },
  { query: 'What is known about the malaria seasonality research?', expected: '/research/malaria' },
  { query: 'What mathematical functions are in the production optimization project?', expected: '/projects/production-optimization' },
] as const;

export function evaluateAssistantRetrieval() {
  let topOne = 0;
  let recallAtThree = 0;
  let reciprocalRank = 0;
  let abstentions = 0;
  const topOneErrors: { query: string; expected: string; first?: string }[] = [];
  const missedAtThree: { query: string; expected: string; sources: string[] }[] = [];
  for (const sample of assistantEvaluationDataset) {
    const results = retrieveSources(sample.query, undefined, 3);
    if (!results.length) abstentions += 1;
    if (results[0]?.href === sample.expected) topOne += 1;
    else {
      topOneErrors.push({
        query: sample.query,
        expected: sample.expected,
        first: results[0]?.href,
      });
    }
    const rank = results.findIndex((result) => result.href === sample.expected);
    if (rank >= 0) {
      recallAtThree += 1;
      reciprocalRank += 1 / (rank + 1);
    } else {
      missedAtThree.push({
        query: sample.query,
        expected: sample.expected,
        sources: results.map((result) => result.href),
      });
    }
  }
  const cases = assistantEvaluationDataset.length;
  return {
    cases,
    topOneAccuracy: topOne / cases,
    recallAtThree: recallAtThree / cases,
    meanReciprocalRank: reciprocalRank / cases,
    abstentions,
    topOneErrors,
    missedAtThree,
  };
}
