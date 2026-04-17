import {
  ADULT_ARHQ_PROFILE,
  ADULT_ARHQ_QUESTIONS,
  evaluateARHQ,
  AssessmentPayload,
} from '../src'; // In a real app, this would be: import { ... } from 'dyslexia-prescreening-test'

console.log('==================================================');
console.log('  Dyslexia Pre-Screening Test (ARHQ) - Client Demo');
console.log('==================================================\n');

// 1. The Client UI uses the exported questions to render a form
console.log(`[UI] Rendered a form with ${ADULT_ARHQ_QUESTIONS.length} questions.\n`);

// 2. Simulate a user filling out the form
const mockAnswers: Record<string, number> = {};

// Let's simulate a user answering '2' for most questions
ADULT_ARHQ_QUESTIONS.forEach(q => {
  mockAnswers[q.id] = 2; 
});

// Let's spike a few specific answers to simulate reading difficulties
mockAnswers['q3'] = 4;  // Max difficulty learning to spell
mockAnswers['q15'] = 4; // Max difficulty learning to read
mockAnswers['q22'] = 4; // Very negative attitude toward reading

// 3. Construct the payload
const payload: AssessmentPayload = {
  demographics: { sex: 'male' },
  answers: mockAnswers,
};

console.log('[Engine] Submitting payload to evaluateARHQ()...');

// 4. Evaluate and handle the result
try {
  const result = evaluateARHQ(ADULT_ARHQ_PROFILE, payload);
  
  console.log('\n--- Assessment Result ---');
  console.log(`Demographic:  Male`);
  console.log(`Total Score:  ${result.totalScore} / ${result.maxPossibleScore}`);
  console.log(`Risk Level:   ${result.riskLevel}`); // Expected to be 'Significant' (> 42)
  console.log('-------------------------\n');

} catch (error) {
  if (error instanceof Error) {
    console.error('\n[Error] Test failed validation:', error.message);
  }
}

// ---------------------------------------------------------
// Demo 2: Failing Validation
// ---------------------------------------------------------
console.log('[Engine] Submitting an incomplete payload...');
try {
  const badPayload: AssessmentPayload = {
    demographics: { sex: 'female' },
    answers: { q1: 3, q2: 1 }, // Missing q3 through q23
  };
  evaluateARHQ(ADULT_ARHQ_PROFILE, badPayload);
} catch (error) {
  if (error instanceof Error) {
    console.error('[Error] Caught expected validation failure:', error.message, '\n');
  }
}
