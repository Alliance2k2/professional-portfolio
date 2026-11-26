import { describe, expect, it } from 'vitest';
import {
  answerQuestion,
  normalizeQuery,
  publicKnowledgeBase,
  retrieveSources,
} from '../src/lib/assistant';
import {
  assistantEvaluationDataset,
  evaluateAssistantRetrieval,
} from '../src/lib/assistant-evaluation';

describe('local portfolio retrieval', () => {
  it('normalizes punctuation, accents, and common word forms', () => {
    expect(normalizeQuery('Financial analytics, studies & CV!')).toEqual([
      'financial',
      'analytic',
      'study',
      'cv',
    ]);
  });

  it('chunks public professional content and returns attributed source pages', () => {
    expect(publicKnowledgeBase.length).toBeGreaterThan(20);
    expect(
      retrieveSources('What is the MSc research topic?').some(
        (source) => source.href === '/research/malaria',
      ),
    ).toBe(true);
    expect(retrieveSources('How can I contact Alliance by email?')[0]?.href).toBe(
      '/contact',
    );
  });

  it('uses the prior question to resolve short follow-ups', () => {
    const answer = answerQuestion('Tell me more', 'CS-IRCFS platform architecture');
    expect(answer.text).toContain('FastAPI');
    expect(answer.sources[0]?.href).toBe('/projects/cs-ircfs');
  });

  it('abstains on unsupported and sensitive requests', () => {
    expect(answerQuestion('What was my private phone number?').abstained).toBe(
      true,
    );
    expect(answerQuestion('What is the site conversion rate?').abstained).toBe(
      true,
    );
  });

  it('reports ranking performance on the curated evaluation set', () => {
    const report = evaluateAssistantRetrieval();
    expect(report.cases).toBe(assistantEvaluationDataset.length);
    expect(report.recallAtThree).toBeGreaterThanOrEqual(0.8);
    console.info('ASSISTANT_EVALUATION', JSON.stringify(report));
  });
});
