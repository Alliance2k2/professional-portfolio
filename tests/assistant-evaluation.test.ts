import { describe, expect, it } from 'vitest';
import { evaluateAssistantRetrieval } from '../src/lib/assistant-evaluation';

describe('held-out local assistant evaluation', () => {
  it('reports retrieval, abstention, citation, and latency metrics', () => {
    const report = evaluateAssistantRetrieval('held-out');
    expect(report.cases).toBeGreaterThanOrEqual(50);
    expect(report.supported).toBeGreaterThan(20);
    expect(report.expectedAbstentions).toBeGreaterThan(15);
    expect(report.responseLatencyMs.p50).toBeGreaterThanOrEqual(0);
    expect(report.responseLatencyMs.p95).toBeGreaterThanOrEqual(
      report.responseLatencyMs.p50,
    );
    console.info('ASSISTANT_HELD_OUT_EVALUATION', JSON.stringify(report));
  });
});
