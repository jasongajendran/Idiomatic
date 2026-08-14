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
  },
  {
    id: 'q4',
    scenarioText: 'A developer says: "This database race condition happens once in a blue moon, but we must protect against it before black friday."',
    speakerRole: 'Senior Backend Engineer',
    highlightedTerm: 'Once in a Blue Moon',
    questionText: 'What does the phrase "Once in a Blue Moon" communicate in a software engineering context?',
    options: [
      {
        text: 'A critical outage occurring every 30 days during lunar cycles',
        isCorrect: false,
        explanation: 'Incorrect. It is not tied to real calendar cycles.'
      },
      {
        text: 'An exceedingly rare, intermittent edge condition that happens in 0.0001% of requests',
        isCorrect: true,
        explanation: 'Correct! "Once in a blue moon" describes extremely rare, intermittent edge-case anomalies or heisenbugs.'
      },
      {
        text: 'A scheduled monthly cron job batch script',
        isCorrect: false,
        explanation: 'Incorrect. Scheduled jobs are predictable, not random edge conditions.'
      },
      {
        text: 'A routine code styling lint failure',
        isCorrect: false,
        explanation: 'Incorrect. Linting errors are reproducible deterministically.'
      }
    ],
    codeAnalogySnippet: `if (Math.random() < 0.0000001 && isFullMoon()) { triggerRareHeisenbug(); }`
  },
  {
    id: 'q5',
    scenarioText: 'The team spent 2 hours reviewing high-level PowerPoint diagrams. The Lead Architect says: "Let\'s move past the slides and get down to the nitty-gritty."',
    speakerRole: 'Lead Architect',
    highlightedTerm: 'Nitty-Gritty',
    questionText: 'What is the team about to do when getting down to the "Nitty-Gritty"?',
    options: [
      {
        text: 'Cancel the sprint and postpone the release',
        isCorrect: false,
        explanation: 'Incorrect. It refers to deep technical execution, not cancellation.'
      },
      {
        text: 'Dive into the specific low-level code mechanics, byte buffers, schema fields, and execution plans',
        isCorrect: true,
        explanation: 'Correct! "Getting down to the nitty-gritty" means examining the exact low-level technical specifics and implementation details.'
      },
      {
        text: 'Discuss high-level executive marketing roadmaps',
        isCorrect: false,
        explanation: 'Incorrect. That is high-level abstraction, the exact opposite of the nitty-gritty.'
      },
      {
        text: 'Delete legacy git branches and clean up Jira tags',
        isCorrect: false,
        explanation: 'Incorrect. That is general repository maintenance.'
      }
    ],
    codeAnalogySnippet: `const nittyGrittyDetails = { cpuRegisters, memoryPointers, byteOffset, rawSocketBuffer };`
  },
  {
    id: 'q6',
    scenarioText: 'After pulling an all-nighter, the DevOps lead sends a message to Slack: "The team is on cloud nine — the zero-downtime multi-region Kubernetes migration passed with 0 errors!"',
    speakerRole: 'DevOps Lead',
    highlightedTerm: 'On Cloud Nine',
    questionText: 'What does "On Cloud Nine" describe in an engineering team context?',
    options: [
      {
        text: 'Migrating servers to AWS cloud region us-east-9',
        isCorrect: false,
        explanation: 'Incorrect. It is an idiomatic state of happiness, not a literal cloud region.'
      },
      {
        text: 'Experiencing total euphoria and relief when a high-risk production release succeeds with perfect metrics',
        isCorrect: true,
        explanation: 'Correct! "On cloud nine" expresses total team celebration when critical high-stakes deployments succeed without defects.'
      },
      {
        text: 'Running 9 microservices simultaneously in parallel containers',
        isCorrect: false,
        explanation: 'Incorrect. It has nothing to do with container counts.'
      },
      {
        text: 'A high-severity cloud infrastructure outage alert',
        isCorrect: false,
        explanation: 'Incorrect. Cloud nine is positive and celebratory.'
      }
    ],
    codeAnalogySnippet: `if (migrationSuccessRate === 1.0 && prodErrorRate === 0) { teamMood = 'On Cloud Nine'; }`
  }
];
