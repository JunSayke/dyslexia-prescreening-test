import type { TestProfile, AssessmentPayload, AssessmentResult, RiskLevel } from '../types';
import { validatePayload } from './validator';

export function evaluateARHQ(profile: TestProfile, payload: AssessmentPayload): AssessmentResult {
  // Validate payload completeness and bounds
  validatePayload(profile, payload);

  let totalScore = 0;
  let maxPossibleScore = 0;

  // Calculate score utilizing optional weights
  for (const question of profile.questions) {
    const answer = payload.answers[question.id];
    const weight = question.weight ?? 1;
    totalScore += answer * weight;
    maxPossibleScore += question.maxValue * weight;
  }

  // Match demographic rules
  const userSex = payload.demographics?.sex;
  let matchedRule = profile.scoringRules.find((rule) => rule.criteria?.sex === userSex);

  // Fallback to rules without specific criteria if no match
  if (!matchedRule) {
    matchedRule = profile.scoringRules.find((rule) => !rule.criteria || Object.keys(rule.criteria).length === 0);
  }

  let riskLevel: RiskLevel = 'Unknown';

  // Map to risk thresholds
  if (matchedRule) {
    const matchedThreshold = matchedRule.thresholds.find(
      (t) => totalScore >= t.minScore && totalScore <= t.maxScore
    );
    if (matchedThreshold) {
      riskLevel = matchedThreshold.level;
    }
  }

  return { totalScore, maxPossibleScore, riskLevel };
}
