import { QuizQuestion } from '../types';

export const QUIZ_QUESTIONS: QuizQuestion[] = [
  {
    id: 'q1',
    scenarioText: 'During a code review, your colleague writes 40 comments arguing whether single quotes or double quotes look prettier, while completely ignoring an unhandled database exception.',
    speakerRole: 'Code Reviewer',
    highlightedTerm: 'Bikeshedding',
    questionText: 'What software engineering term best describes this behavior?',
    options: [
      {
        text: 'Bikeshedding',
        isCorrect: true,
        explanation: 'Correct! Bikeshedding refers to wasting time debating trivial cosmetic details while ignoring major core architectural bugs.'
      },
      {
        text: 'YAGNI',
        isCorrect: false,
        explanation: 'Incorrect. YAGNI means "You Ain\'t Gonna Need It" (avoiding premature building of unnecessary features).'
      },
      {
        text: 'Dogfooding',
        isCorrect: false,
        explanation: 'Incorrect. Dogfooding refers to using your own product internally.'
      },
      {
        text: 'Heisenbug',
        isCorrect: false,
        explanation: 'Incorrect. A Heisenbug is a bug that disappears when you try to debug or observe it.'
      }
    ],
    codeAnalogySnippet: `if (hasCriticalBug && spendTimeOnCSSPadding) {
  // Classic Bikeshedding antipattern
}`
  },
  {
    id: 'q2',
    scenarioText: 'In a 20-person all-hands meeting, two engineers start arguing about tab spaces vs spaces in Dockerfiles. The meeting lead steps in and says: "Let\'s..."',
    speakerRole: 'Meeting Lead',
    highlightedTerm: 'Take it offline',
    questionText: 'Which phrase is the meeting lead most likely to use to stop wasting group bandwidth?',
    options: [
      {
        text: 'Boil the ocean',
        isCorrect: false,
        explanation: 'Boil the ocean means attempting an impossibly large project all at once.'
      },
      {
        text: 'Take it offline',
        isCorrect: true,
        explanation: 'Correct! "Take it offline" means stopping a granular group debate and moving it to a private 1-on-1 sync.'
      },
      {
        text: 'Move the needle',
        isCorrect: false,
        explanation: 'Move the needle means generating a statistically significant impact on business metrics.'
      },
      {
        text: 'Shift left',
        isCorrect: false,
        explanation: 'Shift left means running security or quality checks earlier in the CI/CD pipeline.'
      }
    ],
    codeAnalogySnippet: `spawnPrivateWorkerProcess("1-on-1-sync");`
  },
  {
    id: 'q3',
    scenarioText: 'A Junior Engineer proposes building a custom globally distributed multi-region database adapter framework for an app that currently has 10 daily test users.',
    speakerRole: 'Tech Lead',
    highlightedTerm: 'YAGNI',
    questionText: 'What principle should the Tech Lead remind the Junior Engineer of?',
    options: [
      {
        text: 'Bus Factor',
        isCorrect: false,
        explanation: 'Bus factor measures key team member knowledge dependency.'
      },
      {
        text: 'Technical Debt',
        isCorrect: false,
        explanation: 'Technical debt is the cost of shortcuts.'
      },
      {
        text: 'YAGNI (You Ain\'t Gonna Need It)',
        isCorrect: true,
        explanation: 'Correct! YAGNI advises developers not to build speculative code or premature abstractions before they are required.'
      },
      {
        text: 'Single Point of Failure',
        isCorrect: false,
        explanation: 'Single point of failure is an unredundant point in a architecture.'
      }
    ],
    codeAnalogySnippet: `if (!actualDemand) return simpleDirectImplementation();`
  }
];
