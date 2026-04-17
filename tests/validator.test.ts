import { expect, test, describe } from 'vitest';
import { validatePayload } from '../src/engine/validator';
import { ADULT_ARHQ_PROFILE } from '../src/data/adult';
import { AssessmentPayload } from '../src/types';

describe('Validator', () => {
  test('passes with valid payload', () => {
    const payload: AssessmentPayload = { demographics: { sex: 'male' }, answers: {} };
    ADULT_ARHQ_PROFILE.questions.forEach(q => payload.answers[q.id] = 2);
    expect(() => validatePayload(ADULT_ARHQ_PROFILE, payload)).not.toThrow();
  });

  test('fails on missing answers', () => {
    const payload: AssessmentPayload = { demographics: { sex: 'male' }, answers: { q1: 3 } };
    expect(() => validatePayload(ADULT_ARHQ_PROFILE, payload)).toThrow(/Missing answer/);
  });

  test('fails on out of bounds answers', () => {
    const payload: AssessmentPayload = { demographics: { sex: 'male' }, answers: {} };
    ADULT_ARHQ_PROFILE.questions.forEach(q => payload.answers[q.id] = 2);
    payload.answers['q1'] = 5; // max is 4
    expect(() => validatePayload(ADULT_ARHQ_PROFILE, payload)).toThrow(/must be between 0 and 4/);
  });
});
