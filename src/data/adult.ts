import type { TestProfile, Question } from '../types';

export const ADULT_ARHQ_QUESTIONS: Question[] = [
  { id: 'q1', text: 'How would you compare your current reading speed to that of others of the same age and education?', maxValue: 4 },
  { id: 'q2', text: 'How much reading do you do in conjunction with your work (if retired or not working, how much did you read when you were working?)', maxValue: 4 },
  { id: 'q3', text: 'How much difficulty did you have learning to spell in elementary school?', maxValue: 4 },
  { id: 'q4', text: 'How would you compare your current spelling to that of others of the same age and education?', maxValue: 4 },
  { id: 'q5', text: 'Did your parents ever consider having you repeat any grades in school due to academic failure (not illness)?', maxValue: 4 },
  { id: 'q6', text: 'Do you ever have difficulty remembering people’s names or names of places', maxValue: 4 },
  { id: 'q7', text: 'Do you have difficulty remembering addresses, phone numbers, or dates?', maxValue: 4 },
  { id: 'q8', text: 'Do you have difficulty remembering complex verbal instructions?', maxValue: 4 },
  { id: 'q9', text: 'Do you currently reverse the order of letters or numbers when you read or write?', maxValue: 4 },
  { id: 'q10', text: 'How many books do you read for pleasure each year?', maxValue: 4 },
  { id: 'q11', text: 'How many magazines do you read for pleasure each month?', maxValue: 4 },
  { id: 'q12', text: 'Do you read daily (Monday-Friday) newspapers?', maxValue: 4 },
  { id: 'q13', text: 'Do you read a newspaper on Sunday?', maxValue: 4 },
  { id: 'q14', text: 'Which of the following most nearly describes your attitude toward school when you were a child', maxValue: 4 },
  { id: 'q15', text: 'How much difficulty did you have learning to read in elementary school?', maxValue: 4 },
  { id: 'q16', text: 'How much extra help did you need when learning to read in elementary school?', maxValue: 4 },
  { id: 'q17', text: 'Did you ever reverse the order of letters or numbers when you were a child?', maxValue: 4 },
  { id: 'q18', text: 'Did you have difficulty learning letter and/or color names when you were a child?', maxValue: 4 },
  { id: 'q19', text: 'How would you compare your reading skill to that of others in your elementary classes?', maxValue: 4 },
  { id: 'q20', text: 'All students struggle from time to time in school. Compared to others in your classes, how much did you struggle to complete your work?', maxValue: 4 },
  { id: 'q21', text: 'Did you experience difficulty in high school or college English classes?', maxValue: 4 },
  { id: 'q22', text: 'What is your current attitude toward reading?', maxValue: 4 },
  { id: 'q23', text: 'How much reading do you do for pleasure?', maxValue: 4 }
];

export const ADULT_ARHQ_PROFILE: TestProfile = {
  id: 'arhq-adult-standard',
  name: 'Adult Reading History Questionnaire (Standard)',
  questions: ADULT_ARHQ_QUESTIONS,
  scoringRules: [
    {
      criteria: { sex: 'male' },
      thresholds: [
        { level: 'Minimal', minScore: 0, maxScore: 36 },
        { level: 'Moderate', minScore: 37, maxScore: 42 },
        { level: 'Significant', minScore: 43, maxScore: 92 },
      ],
    },
    {
      criteria: { sex: 'female' },
      thresholds: [
        { level: 'Minimal', minScore: 0, maxScore: 33 },
        { level: 'Moderate', minScore: 34, maxScore: 39 },
        { level: 'Significant', minScore: 40, maxScore: 92 },
      ],
    },
    {
      // Fallback rule (Average of the two thresholds)
      thresholds: [
        { level: 'Minimal', minScore: 0, maxScore: 35 },
        { level: 'Moderate', minScore: 36, maxScore: 40 },
        { level: 'Significant', minScore: 41, maxScore: 92 },
      ],
    }
  ],
};
