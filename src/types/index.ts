export type RiskLevel = 'Minimal' | 'Moderate' | 'Significant' | 'Unknown';

export interface Question {
  id: string;
  text: string;
  maxValue: number;
  weight?: number;
}

export interface DemographicCriteria {
  sex?: 'male' | 'female';
}

export interface RiskThreshold {
  level: RiskLevel;
  minScore: number;
  maxScore: number;
}

export interface ScoringRule {
  criteria?: DemographicCriteria;
  thresholds: RiskThreshold[];
}

export interface TestProfile {
  id: string;
  name: string;
  questions: Question[];
  scoringRules: ScoringRule[];
}

export interface AssessmentPayload {
  answers: Record<string, number>;
  demographics: DemographicCriteria;
}

export interface AssessmentResult {
  totalScore: number;
  maxPossibleScore: number;
  riskLevel: RiskLevel;
}
