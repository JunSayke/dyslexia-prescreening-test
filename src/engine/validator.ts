import type { TestProfile, AssessmentPayload } from '../types';

export function validatePayload(profile: TestProfile, payload: AssessmentPayload): void {
  const { answers } = payload;

  for (const question of profile.questions) {
    const answer = answers[question.id];

    if (answer === undefined || answer === null) {
      throw new Error(`Validation Error: Missing answer for question ID '${question.id}'.`);
    }

    if (answer < 0 || answer > question.maxValue) {
      throw new Error(`Validation Error: Answer for question ID '${question.id}' (${answer}) must be between 0 and ${question.maxValue}.`);
    }
  }
}
