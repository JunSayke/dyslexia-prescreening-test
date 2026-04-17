import { expect, test, describe } from 'vitest';
import { evaluateARHQ } from '../src/engine';
import { ADULT_ARHQ_PROFILE } from '../src/data/adult';
import { AssessmentPayload } from '../src/types';

describe('Scoring Engine', () => {
  test('calculates correct risk for male demographic', () => {
    const payload: AssessmentPayload = { demographics: { sex: 'male' }, answers: {} };
    ADULT_ARHQ_PROFILE.questions.forEach(q => payload.answers[q.id] = 2); // 23 * 2 = 46 total

    const result = evaluateARHQ(ADULT_ARHQ_PROFILE, payload);
    expect(result.totalScore).toBe(46);
    expect(result.riskLevel).toBe('Significant');
  });

  test('calculates correct risk for female demographic', () => {
    const payload: AssessmentPayload = { demographics: { sex: 'female' }, answers: {} };
    ADULT_ARHQ_PROFILE.questions.forEach(q => payload.answers[q.id] = 1); // 23 * 1 = 23 total

    const result = evaluateARHQ(ADULT_ARHQ_PROFILE, payload);
    expect(result.totalScore).toBe(23);
    expect(result.riskLevel).toBe('Minimal');
  });
});
