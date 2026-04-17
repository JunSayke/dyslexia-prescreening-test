# Dyslexia Pre-Screening Test (ARHQ)

A robust, stateless TypeScript scoring engine for the Adult Reading History Questionnaire (ARHQ).

This library provides a mathematically strict, data-driven rules engine to evaluate ARHQ payloads and calculate risk levels (Minimal, Moderate, Significant) based on demographic clinical thresholds.

**CLINICAL DISCLAIMER:** _This library implements a self-report screening tool. It is ONLY a screener and does not constitute a formal evaluation or diagnosis. Results should be used to guide whether a user should consult a licensed psychologist or primary care physician._

## Features

- **Stateless Functional Core**: Pure, predictable evaluation logic (`evaluateARHQ`) with zero side effects.
- **Data-Driven Architecture**: Questionnaires and demographic risk thresholds are decoupled into `TestProfile` objects.
- **Strict Validation**: Fails fast on missing data or out-of-bounds answers to prevent falsely low clinical risk calculations.
- **Fully Typed**: Built from the ground up with strict TypeScript contracts.
- **Extensible**: Easily swap in custom risk thresholds, weighted questions, or newly researched test variants without changing engine logic.

## Installation

```bash

npm install dyslexia-prescreening-test

```

## Quick Start

The library exports the questionnaire data (`ADULT_ARHQ_QUESTIONS`) so you can easily render your frontend UI, and the profile/engine to evaluate the results.

```TypeScript
import {
  ADULT_ARHQ_PROFILE,
  ADULT_ARHQ_QUESTIONS,
  evaluateARHQ,
  AssessmentPayload,
} from 'dyslexia-prescreening-test';

// 1. Build your UI using ADULT_ARHQ_QUESTIONS
// ...

// 2. Construct the payload from user input
const payload: AssessmentPayload = {
  demographics: { sex: 'male' }, // Demographic thresholds modify the risk scoring
  answers: {
    q1: 2,
    q2: 1,
    q3: 4,
    // ... must include all 23 questions defined in the profile
  },
};

// 3. Evaluate the score
try {
  const result = evaluateARHQ(ADULT_ARHQ_PROFILE, payload);

  console.log(`Total Score: ${result.totalScore}`);
  console.log(`Risk Level: ${result.riskLevel}`); // 'Minimal' | 'Moderate' | 'Significant'
} catch (error) {
  // Engine strictly throws on missing or invalid (out of bounds) answers
  console.error('Validation failed:', error.message);
}
```

## Architecture

This library uses a Data-Driven Rules Engine approach combined with a Functional Core.

1. Profiles (`src/data`): Define the What. A TestProfile contains the questions, acceptable bounds, and demographic threshold rules (e.g., Males need > 42 for Significant risk, Females need > 39).

2. Validator (`src/engine/validator.ts`): Ensures data integrity. Clinical scoring requires complete data; missing answers throw an error rather than assuming 0.

3. Engine (`src/engine`): Defines the How. A stateless function that iterates through the TestProfile, sums the payload (respecting optional multipliers/weights), and matches the result against the demographic rules.

## Custom Questionnaires

Because of the data-driven architecture, you can create custom variants (like an ARHQ-Brief or a localized version) without modifying the evaluation engine. Just create an object that satisfies the TestProfile interface and pass it to evaluateARHQ().

## Development

Install dependencies: `npm install`

Run the unit tests: `npm run test`

Build the library: `npm run build`

## Attribution & References

The Adult Reading History Questionnaire (ARHQ) questions and scoring thresholds provided in the default profiles of this library are based on the tools and research provided by the **International Dyslexia Association (IDA)**.

- **Source Material:** [Dyslexia Screener for Adults (IDA)](https://dyslexiaida.org/screening-for-dyslexia/dyslexia-screener-for-adults/)
- **Original Research:** Lefly, D. L., & Pennington, B. F. (2000). _Reliability and validity of the Adult Reading History Questionnaire_. Journal of Learning Disabilities, 33(3), 286-296.
