import { Idiom } from '../types';

export const IDIOMS_DATA: Idiom[] = [
  {
    id: 'spaghetti-code',
    term: 'Spaghetti Code',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/spəˈɡɛt.i koʊd/',
    literalDefinition: 'Analogy: A ball of yarn tangled by a cat, or a bowl of intertwined pasta.',
    realMeaning: 'Source code that has a complex, convoluted, and tangled structure that is extremely difficult to maintain.',
    corporateTranslation: 'Management says: "Let\'s quickly extend this module." Dev hears: "Changing one line will break five unrelated pages across the app."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function executeOrder(order) {
  if (order.status) goto labelA;
  labelB:
    globalState.price = updateTax();
    goto labelC;
  labelA:
    if (user.isGold) goto labelB;
  labelC:
    return processPayment();
}`,
      explanation: 'Tangled control flow and unconstrained global mutations where execution paths criss-cross unpredictably.'
    },
    etymology: 'Coined in the 1970s to describe unstructured programs that used excessive GOTO statements.',
    formality: 'Internal Team Only',
    safeAlternative: 'Codebase with high structural complexity requiring modular decomposition.',
    tags: ['Refactoring', 'Code Quality', 'Legacy', 'Architecture'],
    popularityScore: 97,
    examples: [
      {
        context: 'PR Review',
        speaker: 'Senior Developer',
        quote: 'This legacy script is pure spaghetti code; changing one variable breaks five unrelated pages.',
        translatedQuote: 'We need to untangle this function into separate modules before adding new features.'
      }
    ]
  },
  {
    id: 'refactoring',
    term: 'Refactoring',
    category: 'Coding',
    seniority: 'Senior Architect',
    phonetic: '/riːˈfæk.tər.ɪŋ/',
    literalDefinition: 'Analogy: Cleaning and organizing a messy kitchen while cooking.',
    realMeaning: 'Restructuring existing code without changing its external behavior to improve readability and maintainability.',
    corporateTranslation: 'Dev says: "I am spending today refactoring." PM hears: "I am rewriting code that was already working." Dev means: "I am saving us from future outages."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// BEFORE: 100-line monolith function
// AFTER: Clean composition
const validateInput = (data) => Boolean(data?.id);
const calculateTotal = (items) => items.reduce((acc, i) => acc + i.price, 0);
const processOrder = (order) => validateInput(order) && saveOrder(order);`,
      explanation: 'Decomposing tangled procedures into pure, self-contained mathematical functions.'
    },
    etymology: 'Derived from mathematical factoring, introduced into programming by Martin Fowler and Ralph Johnson in the 1990s.',
    formality: 'Safe for Clients',
    safeAlternative: 'Code optimization and structural cleanup.',
    tags: ['Clean Code', 'Maintainability', 'Architecture', 'Quality'],
    popularityScore: 98,
    examples: [
      {
        context: 'Slack',
        speaker: 'Tech Lead',
        quote: 'The feature works, but I need a few hours for refactoring to make it maintainable.',
        translatedQuote: 'I need to organize the code logic so future team members don\'t struggle to read it.'
      }
    ]
  },
  {
    id: 'technical-debt',
    term: 'Technical Debt',
    category: 'Coding',
    seniority: 'Senior Architect',
    phonetic: '/ˈtɛk.nɪ.kəl dɛt/',
    literalDefinition: 'Analogy: Taking out a high-interest financial loan to buy something immediately.',
    realMeaning: 'The cumulative implied cost of future rework caused by choosing an easy, quick solution now instead of a better approach.',
    corporateTranslation: 'Dev says: "We accumulated tech debt." PM hears: "Developers want to rewrite working code for fun." Dev actually means: "If we touch this file, production will crash."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `let compoundingInterest = 1.25;

function quickHackToMeetFridayDeadline() {
  // Speed +50% now, Maintenance Cost x1.25 on every sprint
  futureMaintenanceCost *= compoundingInterest;
}`,
      explanation: 'Borrowing execution speed from tomorrow\'s stability to ship a feature today.'
    },
    etymology: 'Coined by Ward Cunningham in 1992 to explain financial interest trade-offs in software development.',
    formality: 'Safe for Clients',
    safeAlternative: 'Architectural trade-offs requiring scheduled maintenance sprint.',
    tags: ['Refactoring', 'Architecture', 'Sprint Planning', 'Code Quality'],
    popularityScore: 99,
    examples: [
      {
        context: 'Jira',
        speaker: 'Tech Lead',
        quote: 'We took on a lot of technical debt when we rushed the last release. I need to spend two days refactoring this module.',
        translatedQuote: 'Our rushed shortcut is now slowing down new feature development.'
      }
    ]
  },
  {
    id: 'under-the-hood',
    term: 'Under the Hood',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/ˈʌn.dər ðə hʊd/',
    literalDefinition: 'Analogy: Looking inside a sports car\'s engine bay.',
    realMeaning: 'The internal, underlying mechanics or backend implementation details of a system that are hidden from the surface UI.',
    corporateTranslation: 'PM says: "It looks simple on screen." Dev hears: "Under the hood, there are 12 distributed database locks running."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// UI Surface: simple button click
button.onClick = () => syncData();

// Under the hood:
async function syncData() {
  await acquireDistributedLock();
  await encryptPayload();
  await flushCacheToS3();
}`,
      explanation: 'Hiding complex infrastructure pipelines behind a minimal outer interface.'
    },
    etymology: 'Automotive origin referring to inspecting the engine beneath a vehicle\'s hood.',
    formality: 'Safe for Clients',
    safeAlternative: 'Internal architecture and underlying engine implementation.',
    tags: ['Backend', 'System Design', 'Architecture', 'UI/UX'],
    popularityScore: 95,
    examples: [
      {
        context: 'Slack',
        speaker: 'Software Engineer',
        quote: 'The database URL is currently hardcoded in the config. Under the hood, the system expects a static path.',
        translatedQuote: 'Behind the simple interface, the system logic relies on a fixed server address.'
      }
    ]
  },
  {
    id: 'out-of-the-box',
    term: 'Out of the Box',
    category: 'Strategy',
    seniority: 'C-Suite',
    phonetic: '/aʊt əv ðə bɑːks/',
    literalDefinition: 'Analogy: Plug-and-play electronics that work immediately after opening the box.',
    realMeaning: 'A feature, integration, or software product that works immediately without requiring custom configuration or coding.',
    corporateTranslation: 'Sales says: "It works out of the box!" Dev hears: "We still need 2 weeks to configure environment variables and permissions."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `import { OAuthProvider } from 'standard-auth-library';

// Zero custom setup required
const auth = OAuthProvider.initializeDefault();`,
      explanation: 'Pre-packaged functionality requiring zero bespoke adapter glue code.'
    },
    etymology: 'Originating from consumer electronics that are pre-assembled and ready to run upon unboxing.',
    formality: 'Safe for Clients',
    safeAlternative: 'Natively supported standard feature without custom integration.',
    tags: ['Integrations', 'Vendors', 'SaaS', 'Productivity'],
    popularityScore: 93,
    examples: [
      {
        context: 'Email',
        speaker: 'Product Director',
        quote: 'This tool integrates with our current technical stack completely out of the box.',
        translatedQuote: 'We don\'t need to spend engineering hours writing custom adapter code.'
      }
    ]
  },
  {
    id: 'corner-case',
    term: 'Corner Case',
    category: 'Coding',
    seniority: 'Senior Architect',
    phonetic: '/ˈkɔːr.nər keɪs/',
    literalDefinition: 'Analogy: A user trying to sign up on a leap year at exactly midnight with no internet connection.',
    realMeaning: 'A problem or situation that occurs only when multiple distinct edge conditions happen simultaneously.',
    corporateTranslation: 'QA says: "I found a bug!" Dev hears: "This only triggers if a user clicks 3 times while disconnected from WiFi on February 29th."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `if (isLeapYear && localTime === '00:00:00' && user.isOffline && cart.itemCount === 0) {
  // Rare corner case scenario
  handleEdgeCondition();
}`,
      explanation: 'The intersection of multiple rare state boundaries occurring at the exact same moment.'
    },
    etymology: 'Derived from engineering where multiple parameters reach extreme boundary limits simultaneously.',
    formality: 'Safe for Clients',
    safeAlternative: 'Multi-variable edge condition.',
    tags: ['Testing', 'Debugging', 'QA', 'Edge Cases'],
    popularityScore: 89,
    examples: [
      {
        context: 'PR Review',
        speaker: 'Staff Engineer',
        quote: 'We don\'t need to over-engineer this; it\'s a rare corner case that won\'t impact 99% of users.',
        translatedQuote: 'Focus on core functionality rather than building complex logic for a 1-in-a-million scenario.'
      }
    ]
  },
  {
    id: 'happy-path',
    term: 'Happy Path',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/ˈhæp.i pæθ/',
    literalDefinition: 'Analogy: Driving through every green light without hitting traffic or construction.',
    realMeaning: 'A default execution scenario where no errors or exceptional conditions occur.',
    corporateTranslation: 'PM says: "The demo went great!" Dev hears: "We only tested the happy path, don\'t press any unexpected buttons yet."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `async function checkout(cart) {
  // Happy path assumption: no card decline, no network drop, item in stock
  const payment = await chargeCard(cart.total);
  return sendReceipt(payment);
}`,
      explanation: 'Unconditional execution flow that assumes zero network drops, invalid inputs, or runtime exceptions.'
    },
    etymology: 'Software testing term popularized in the 1990s to distinguish default user flows from error-handling paths.',
    formality: 'Safe for Clients',
    safeAlternative: 'Standard primary user flow without error states.',
    tags: ['Testing', 'UX', 'QA', 'User Flow'],
    popularityScore: 94,
    examples: [
      {
        context: 'Slack',
        speaker: 'Engineering Lead',
        quote: 'Let\'s focus on getting the happy path working for the launch, and we can circle back to extra features later.',
        translatedQuote: 'Ensure the main user flow functions reliably before handling secondary edge cases.'
      }
    ]
  },
  {
    id: 'magic-numbers',
    term: 'Magic Numbers',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/ˈmædʒ.ɪk ˈnʌm.bərz/',
    literalDefinition: 'Analogy: A random pin code written on a wall with no label explaining what lock it opens.',
    realMeaning: 'Hardcoded numerical values directly inserted into source code without named constants or explanation.',
    corporateTranslation: 'Senior Dev says: "Remove magic numbers." Junior hears: "Replace 86400 with constant SECONDS_PER_DAY so people know what it means."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// BAD: What is 86400?
setTimeout(logout, 86400);

// GOOD: Self-documenting
const SECONDS_PER_DAY = 86400;
setTimeout(logout, SECONDS_PER_DAY);`,
      explanation: 'Replacing ambiguous literal values with descriptive named constants.'
    },
    etymology: 'Early computing term for unidentified numeric constants embedded directly in code routines.',
    formality: 'Internal Team Only',
    safeAlternative: 'Unnamed numerical literals requiring constant declarations.',
    tags: ['Code Quality', 'Refactoring', 'Clean Code', 'Linting'],
    popularityScore: 88,
    examples: [
      {
        context: 'PR Review',
        speaker: 'Code Reviewer',
        quote: 'Replace that magic number 86400 with a named constant like SECONDS_IN_A_DAY so people can read it.',
        translatedQuote: 'Give this raw number a descriptive variable name so future developers understand its purpose.'
      }
    ]
  },
  {
    id: 'hardcoded',
    term: 'Hardcoded',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/ˈhɑːrd.koʊ.dɪd/',
    literalDefinition: 'Analogy: Writing your home address in permanent marker directly on your phone case.',
    realMeaning: 'Embedding fixed data directly into source code rather than loading it dynamically from configuration files or database variables.',
    corporateTranslation: 'Dev says: "It\'s hardcoded for now." Lead hears: "I put a dummy string in so I could finish testing before lunch."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// BAD: Hardcoded secret
const apiKey = "secret_12345_prod";

// GOOD: Environment variable
const apiKey = process.env.API_KEY;`,
      explanation: 'Directly embedding static values instead of fetching parameters dynamically from runtime environment stores.'
    },
    etymology: 'Derived from early computer circuits that were physically wired (hard-wired) into place.',
    formality: 'Safe for Clients',
    safeAlternative: 'Static value assignment requiring configuration parameterization.',
    tags: ['Security', 'Configuration', 'Environment', 'DevOps'],
    popularityScore: 96,
    examples: [
      {
        context: 'Slack',
        speaker: 'DevOps Lead',
        quote: 'The database URL is currently hardcoded in the configuration file. We need to pull it from environment variables.',
        translatedQuote: 'Replace the static database address with a dynamic configuration parameter.'
      }
    ]
  },
  {
    id: 'code-smell',
    term: 'Code Smell',
    category: 'Coding',
    seniority: 'Senior Architect',
    phonetic: '/koʊd smɛl/',
    literalDefinition: 'Analogy: A faint bad odour in the kitchen that suggests something is rotting in the back of the fridge.',
    realMeaning: 'A surface symptom in code that indicates a deeper design or architectural flaw without technically being a runtime error.',
    corporateTranslation: 'Dev says: "This function has a code smell." Lead hears: "It works right now, but it will cause bugs in 3 months."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function handleEverything(req, res, db, mailer, logger, analytics) {
  // Code Smell: God function taking 8 dependencies and 600 lines
}`,
      explanation: 'Surface code indicators (like god objects or duplicated loops) pointing to architectural rot.'
    },
    etymology: 'Coined by Kent Beck while developing Extreme Programming and popularized in Martin Fowler\'s "Refactoring" book.',
    formality: 'Internal Team Only',
    safeAlternative: 'Architectural anti-pattern indicating potential sub-optimal maintainability.',
    tags: ['Architecture', 'Refactoring', 'Code Quality', 'Clean Code'],
    popularityScore: 92,
    examples: [
      {
        context: 'PR Review',
        speaker: 'Senior Developer',
        quote: 'This function is turning into spaghetti code because it handles too many things. It\'s a bit of a code smell.',
        translatedQuote: 'This long function breaks single-responsibility principles and should be refactored.'
      }
    ]
  },
  {
    id: 'rubber-ducking',
    term: 'Rubber Duck Debugging',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/ˈrʌb.ər dʌk.ɪŋ/',
    literalDefinition: 'Analogy: Talking out loud to your pet or bath toy until you suddenly realize where you left your keys.',
    realMeaning: 'Explaining a complex coding bug line-by-line out loud to an inanimate object (or colleague) to force logical clarity and discover the solution yourself.',
    corporateTranslation: 'Dev says: "Can I rubber duck with you?" Colleague hears: "Nod silently for 2 minutes while I realize my mistake mid-sentence."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function solveHardBug(bug, rubberDuck) {
  for (const line of bug.stackTrace) {
    rubberDuck.listen(line);
    if (developer.hasEpiphany()) {
      return "Aha! I forgot to await the promise!";
    }
  }
}`,
      explanation: 'Forcing verbal articulation of execution paths to trigger cognitive error detection in your own mind.'
    },
    etymology: 'From Andrew Hunt and David Thomas\'s 1999 book "The Pragmatic Programmer", where a programmer carried a rubber duck to explain code line-by-line.',
    formality: 'Internal Team Only',
    safeAlternative: 'Verbalizing the execution stack to locate logic mismatches.',
    tags: ['Debugging', 'Problem Solving', 'Engineering Culture', 'Mentorship'],
    popularityScore: 94,
    examples: [
      {
        context: 'Slack',
        speaker: 'Developer',
        quote: 'Can I rubber duck with you for a minute? I\'m dealing with a brutal heisenbug that disappears every time I attach the debugger.',
        translatedQuote: 'Let me explain this bug out loud so my brain catches what my eyes missed.'
      }
    ]
  },
  {
    id: 'heisenbug',
    term: 'Heisenbug',
    category: 'Coding',
    seniority: 'Senior Architect',
    phonetic: '/ˈhaɪ.zən.bʌɡ/',
    literalDefinition: 'Analogy: A ghost that disappears the exact moment you turn on the room lights.',
    realMeaning: 'A software bug that seems to disappear or alter its behavior when one attempts to study or debug it.',
    corporateTranslation: 'Dev says: "It\'s a heisenbug!" QA hears: "It crashed on my machine 10 minutes ago, but works perfectly now that you are watching."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function reproduceIssue(raceCondition) {
  if (debuggerAttached || consoleLogEnabled) {
    // Timing altered by observation; bug disappears!
    return "All tests passed!";
  }
  return "System Crashed!";
}`,
      explanation: 'Race conditions or memory pointer offsets whose timing characteristics change when inspection tools are attached.'
    },
    etymology: 'Punning on Werner Heisenberg\'s Uncertainty Principle in quantum physics.',
    formality: 'Internal Team Only',
    safeAlternative: 'Nondeterministic timing-sensitive concurrency error.',
    tags: ['Debugging', 'Concurrency', 'Race Conditions', 'Testing'],
    popularityScore: 91,
    examples: [
      {
        context: 'Slack',
        speaker: 'Senior Developer',
        quote: 'I tried to replicate the crash, but it\'s a heisenbug—it vanishes the moment I open the debugger.',
        translatedQuote: 'The bug is caused by a race condition whose timing changes when logging is turned on.'
      }
    ]
  },
  {
    id: 'legacy-code',
    term: 'Legacy Code',
    category: 'Coding',
    seniority: 'Senior Architect',
    phonetic: '/ˈlɛɡ.ə.si koʊd/',
    literalDefinition: 'Analogy: Moving into an old historic house with ancient, undocumented electrical wiring.',
    realMeaning: 'Source code inherited from older versions, previous developers, or obsolete frameworks that lacks automated tests and documentation.',
    corporateTranslation: 'Dev says: "That\'s legacy code." PM hears: "Nobody on the current team understands how this billing file works, so don\'t touch it."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// Created in 2014 by developer who left 6 years ago
// WARNING: DO NOT EDIT OR REMOVE
function legacyAuthSync() {
  // Undocumented side-effects
}`,
      explanation: 'Critical infrastructure logic lacking test suites or active domain ownership.'
    },
    etymology: 'Popularized by Michael Feathers in "Working Effectively with Legacy Code", defining it as code without automated tests.',
    formality: 'Safe for Clients',
    safeAlternative: 'Established core codebase requiring modernization.',
    tags: ['Legacy', 'Refactoring', 'Architecture', 'Documentation'],
    popularityScore: 95,
    examples: [
      {
        context: 'Slack',
        speaker: 'Engineering Manager',
        quote: 'We are going to sunset the old user portal next month. Maintaining that legacy code is taking up too much of the team\'s time.',
        translatedQuote: 'Retiring the unmaintained legacy portal will free up developer capacity for modern features.'
      }
    ]
  },
  {
    id: 'boilerplate',
    term: 'Boilerplate',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/ˈbɔɪ.lər.pleɪt/',
    literalDefinition: 'Analogy: Standard legal fine print at the bottom of every contract.',
    realMeaning: 'Sections of code that must be included in many places with little or no alteration.',
    corporateTranslation: 'Dev says: "I built a boilerplate generator." Lead hears: "I automated the 40 lines of setup code we write for every new API endpoint."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// Standard boilerplate required for every microservice endpoint
import express from 'express';
const app = express();
app.use(express.json());
app.use(cors());`,
      explanation: 'Mandatory structural scaffolding required before actual domain business logic can be executed.'
    },
    etymology: 'Derived from 19th-century printing plates used for syndicated newspaper content.',
    formality: 'Safe for Clients',
    safeAlternative: 'Standard initialization scaffolding.',
    tags: ['Productivity', 'Scaffolding', 'Frameworks', 'Setup'],
    popularityScore: 90,
    examples: [
      {
        context: 'Slack',
        speaker: 'Frontend Engineer',
        quote: 'Next.js saves us from writing tons of boilerplate routing configuration.',
        translatedQuote: 'The framework handles standard setup code automatically so we can focus on building features.'
      }
    ]
  },
  {
    id: 'scope-creep',
    term: 'Scope Creep',
    category: 'Management',
    seniority: 'Tech Lead',
    phonetic: '/skoʊp kriːp/',
    literalDefinition: 'Analogy: Asking a house painter to paint your kitchen, then asking them to do the hallway and bathroom for free.',
    realMeaning: 'The subtle, continuous expansion of project requirements beyond original commitments without proportional adjustments to timeline or budget.',
    corporateTranslation: 'Lead says: "That sounds like scope creep." Client hears: "No." Lead actually means: "If we add dark mode today, we will miss our launch date by 3 weeks."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function manageProject(sprintScope) {
  while (stakeholder.hasNewIdeas()) {
    // Uncontrolled scope expansion
    sprintScope.addFeature(stakeholder.latestIdea);
    projectDeadline.delayByWeeks(2);
  }
}`,
      explanation: 'Adding new feature requirements into an active iteration without increasing headcount or extending delivery dates.'
    },
    etymology: 'Project management term emerging in defense and software engineering during the 1980s.',
    formality: 'Safe for Clients',
    safeAlternative: 'Feature expansion beyond initial statement of work.',
    tags: ['Scope', 'Project Management', 'Agile', 'Sprint Planning'],
    popularityScore: 98,
    examples: [
      {
        context: 'Slack',
        speaker: 'Team Lead',
        quote: 'Adding a dark mode right now sounds like scope creep. Let\'s focus on getting the happy path working for the launch.',
        translatedQuote: "Dark mode was not part of the current sprint agreement, so let's defer it to avoid delaying launch."
      }
    ]
  },
  {
    id: 'blocker',
    term: 'Blocker',
    category: 'Management',
    seniority: 'Junior Dev',
    phonetic: '/ˈblɑː.kər/',
    literalDefinition: 'Analogy: A massive boulder blocking a single-lane mountain road.',
    realMeaning: 'An obstacle or dependency that completely halts progress on a specific task or feature until resolved.',
    corporateTranslation: 'Dev says: "I have a blocker." Standup Lead hears: "I am completely stuck until the DevOps team gives me database credentials."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `async function executeTask(developer) {
  if (!databaseCredentials.isAvailable()) {
    // Hard thread suspension
    await developer.waitForeverOnBlocker();
  }
}`,
      explanation: 'A critical external dependency failure suspending thread execution.'
    },
    etymology: 'Agile/Scrum terminology popularized in daily standups to identify obstacles for the Scrum Master to clear.',
    formality: 'Safe for Clients',
    safeAlternative: 'Critical path dependency delay.',
    tags: ['Agile', 'Standup', 'Dependencies', 'Scrum'],
    popularityScore: 99,
    examples: [
      {
        context: 'Standup',
        speaker: 'Developer',
        quote: 'The API downtime is a total blocker for me right now. Once that is resolved, I can finish the task.',
        translatedQuote: 'I cannot proceed with frontend work until the backend API server comes back online.'
      }
    ]
  },
  {
    id: 'siloed',
    term: 'Siloed',
    category: 'Management',
    seniority: 'C-Suite',
    phonetic: '/ˈsaɪ.loʊd/',
    literalDefinition: 'Analogy: Two departments in the same company acting like rival isolated countries.',
    realMeaning: 'Working in isolation without cross-functional communication, knowledge sharing, or collaboration.',
    corporateTranslation: 'VP says: "Our teams are too siloed." Dev hears: "Designers approved UI mockups without asking engineers if the database can support it."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// Department A and Department B share zero state or API endpoints
const designTeam = new IsolatedNamespace();
const devTeam = new IsolatedNamespace();
// Zero cross-process communication!`,
      explanation: 'Isolated domain namespaces operating independently without shared contracts or event buses.'
    },
    etymology: 'Derived from agricultural grain silos that keep different crops completely separated in tall sealed structures.',
    formality: 'Safe for Clients',
    safeAlternative: 'Operating with limited cross-functional alignment.',
    tags: ['Organization', 'Culture', 'Collaboration', 'Management'],
    popularityScore: 89,
    examples: [
      {
        context: 'Slack',
        speaker: 'Product Manager',
        quote: 'Our design and engineering teams are too siloed; we need to start collaborating earlier.',
        translatedQuote: 'Let\'s include developers in initial UI wireframe reviews to spot technical limitations early.'
      }
    ]
  },
  {
    id: 'low-hanging-fruit',
    term: 'Low-Hanging Fruit',
    category: 'Strategy',
    seniority: 'Tech Lead',
    phonetic: '/loʊ ˈhæŋ.ɪŋ fruːt/',
    literalDefinition: 'Analogy: Picking the apples at the bottom of the tree because you don\'t need a ladder.',
    realMeaning: 'Tasks or quick improvements that require minimal effort but yield immediate noticeable results.',
    corporateTranslation: 'PM says: "Let\'s pick low-hanging fruit." Dev hears: "Fix the 5 typos on the landing page so we can mark 5 tickets done today."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function selectNextTask(backlog) {
  // Effort = 1, Value = 10 -> Maximum Return on Investment!
  return backlog.filter(t => t.effort === 'LOW' && t.impact === 'HIGH');
}`,
      explanation: 'Sorting backlog items by high impact-to-effort ratios.'
    },
    etymology: 'Business management metaphor from the 1980s suggesting picking easily accessible fruit first.',
    formality: 'Safe for Clients',
    safeAlternative: 'Immediate high-return, low-effort optimizations.',
    tags: ['Backlog', 'Agile', 'Prioritization', 'Quick Wins'],
    popularityScore: 96,
    examples: [
      {
        context: 'Standup',
        speaker: 'Project Lead',
        quote: 'We have over fifty items in our backlog. Let\'s pick out the low-hanging fruit first so we can get some quick wins.',
        translatedQuote: 'Complete the simplest high-value tasks first to build momentum before tackling complex items.'
      }
    ]
  },
  {
    id: 'bikeshedding',
    term: 'Bikeshedding (Law of Triviality)',
    category: 'Coding',
    seniority: 'Tech Lead',
    phonetic: '/ˈbaɪkˌʃɛd.ɪŋ/',
    literalDefinition: 'Analogy: Spending 3 hours debating what color to paint the office bike shed while ignoring a broken roof.',
    realMeaning: 'Wasting disproportionate time debating trivial details (like button colors or naming) while ignoring critical complex architecture.',
    corporateTranslation: 'Lead says: "Let\'s avoid bikeshedding." Dev hears: "Stop arguing for 45 minutes about tab indentation when the payment service is offline."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function reviewPR(pullRequest) {
  if (pullRequest.hasSecurityVulnerability) {
    // Ignore database security leak, focus on CSS margin
    commentOnCSSPadding(pullRequest, "Is 8px or 10px better?");
  }
}`,
      explanation: 'Allocating maximum cognitive focus to low-complexity cosmetic trivialities.'
    },
    etymology: 'Coined by C. Northcote Parkinson in 1957 (Parkinson\'s Law of Triviality), observing that a nuclear plant committee spent most of its time debating the bike shed color.',
    formality: 'Internal Team Only',
    safeAlternative: 'Focusing on minor details over core architectural priorities.',
    tags: ['Code Review', 'Productivity', 'PR Debate', 'Agile'],
    popularityScore: 94,
    examples: [
      {
        context: 'PR Review',
        speaker: 'Senior Architect',
        quote: 'We are bicycle shedding over this font size while the core payment system is still broken.',
        translatedQuote: 'Stop debating minor formatting preferences and test the core payment transaction logic.'
      }
    ]
  },
  {
    id: 'bandwidth',
    term: 'Bandwidth',
    category: 'Management',
    seniority: 'C-Suite',
    phonetic: '/ˈbænd.wɪdθ/',
    literalDefinition: 'Analogy: A highway intersection that can only handle 5 cars at a time before causing traffic jams.',
    realMeaning: 'An individual\'s or team\'s work capacity, time availability, or cognitive load to take on new tasks.',
    corporateTranslation: 'Dev says: "I don\'t have bandwidth." Lead hears: "I am working 10 hours a day on 3 critical bugs, do not assign me another ticket."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function assignTicket(developer, newTicket) {
  if (developer.activeTaskCount >= developer.maxCapacity) {
    throw new CapacityExceededException("Zero bandwidth remaining!");
  }
}`,
      explanation: 'Checking resource utilization limits before allocating additional worker threads.'
    },
    etymology: 'Borrowed from signal processing and networking data throughput capacity in the 1990s.',
    formality: 'Safe for Clients',
    safeAlternative: 'Current workload capacity availability.',
    tags: ['Capacity', 'Sprint Planning', 'Agile', 'Workload'],
    popularityScore: 98,
    examples: [
      {
        context: 'Standup',
        speaker: 'Developer',
        quote: 'Once the API blocker is resolved, I won\'t have the bandwidth to finish the full feature this week.',
        translatedQuote: 'I do not have enough available hours remaining in this sprint to complete all secondary tasks.'
      }
    ]
  },
  {
    id: 'sprint',
    term: 'Sprint',
    category: 'Management',
    seniority: 'Junior Dev',
    phonetic: '/sprɪnt/',
    literalDefinition: 'Analogy: A 2-week race where runners commit to a specific distance and pace.',
    realMeaning: 'A time-boxed iteration (usually 1 to 2 weeks) in Agile development during which specific tasks must be completed and made ready for review.',
    corporateTranslation: 'Scrum Master says: "This sprint ends Friday." Dev hears: "Finish your code reviews before 5 PM or face the burndown chart wrath."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `const SPRINT_DURATION_DAYS = 14;

function runAgileIteration(backlogItems) {
  const committedItems = backlogItems.slice(0, teamVelocity);
  return executeTimebox(committedItems, SPRINT_DURATION_DAYS);
}`,
      explanation: 'A fixed time-boxed loop processing a bounded slice of work items.'
    },
    etymology: 'Adopted by Scrum framework creators Ken Schwaber and Jeff Sutherland in the early 1990s.',
    formality: 'Safe for Clients',
    safeAlternative: 'Time-boxed development cycle.',
    tags: ['Agile', 'Scrum', 'Planning', 'Workflow'],
    popularityScore: 99,
    examples: [
      {
        context: 'Standup',
        speaker: 'Scrum Master',
        quote: 'We committed to three major features for this sprint, so let\'s stay focused on our goal.',
        translatedQuote: 'Let\'s complete the agreed set of user stories committed for this 2-week cycle.'
      }
    ]
  },
  {
    id: 'backlog',
    term: 'Backlog',
    category: 'Management',
    seniority: 'Junior Dev',
    phonetic: '/ˈbæk.lɔːɡ/',
    literalDefinition: 'Analogy: A giant stack of unread books sitting on your nightstand.',
    realMeaning: 'A prioritized list of pending features, bug fixes, infrastructure improvements, and technical debt awaiting team capacity.',
    corporateTranslation: 'PM says: "Added to the backlog!" Dev hears: "This idea has been moved into an unindexed digital graveyard."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `const backlog = new PriorityQueue();

// Enqueue feature request
backlog.push({ title: "Dark mode", priority: 89 });`,
      explanation: 'A persistent queue storing queued feature specifications prioritized by business value.'
    },
    etymology: 'Originally referred to a large unburned log kept at the back of a fireplace hearth to sustain the fire.',
    formality: 'Safe for Clients',
    safeAlternative: 'Prioritized product feature pipeline.',
    tags: ['Agile', 'Jira', 'Product', 'Planning'],
    popularityScore: 98,
    examples: [
      {
        context: 'Jira',
        speaker: 'Product Owner',
        quote: 'We have over fifty items in our backlog. Let\'s pick out the low-hanging fruit first.',
        translatedQuote: "We have many queued feature requests; let's tackle simple high-value tasks first."
      }
    ]
  },
  {
    id: 'punt',
    term: 'Punt',
    category: 'Management',
    seniority: 'Tech Lead',
    phonetic: '/pʌnt/',
    literalDefinition: 'Analogy: Kicking a football downfield to deal with it later on defense.',
    realMeaning: 'Postponing or deferring a task, bug fix, or feature to a future sprint or release.',
    corporateTranslation: 'Lead says: "Let\'s punt this ticket." Dev hears: "Move this task to next month\'s backlog so we can ship today\'s release on time."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function reviewTask(task, launchDeadline) {
  if (task.isNonCritical && launchDeadline.isImminent()) {
    // Postpone task to future sprint
    sprintScope.remove(task);
    nextQuarterBacklog.push(task);
  }
}`,
      explanation: 'Removing non-critical thread execution tasks from the immediate scope.'
    },
    etymology: 'American football terminology where a team kicks the ball downfield to delay loss of position.',
    formality: 'Safe for Clients',
    safeAlternative: 'Defer task implementation to a subsequent milestone.',
    tags: ['Agile', 'Prioritization', 'Sprint Planning', 'Scope'],
    popularityScore: 91,
    examples: [
      {
        context: 'Standup',
        speaker: 'Engineering Manager',
        quote: 'I might need to punt the secondary tasks to the next sprint.',
        translatedQuote: 'I will defer lower-priority tasks to the next two-week work cycle to ensure core deliverables finish.'
      }
    ]
  },
  {
    id: 'on-your-radar',
    term: 'On Your Radar',
    category: 'Strategy',
    seniority: 'C-Suite',
    phonetic: '/ɑːn jʊər ˈreɪ.dɑːr/',
    literalDefinition: 'Analogy: Keeping an eye out for a storm warning on the horizon.',
    realMeaning: 'Bringing a potential upcoming issue, deadline, or dependency to someone\'s attention so they can keep track of it.',
    corporateTranslation: 'Manager says: "Just putting this on your radar." Dev hears: "This isn\'t urgent today, but you will be fixing it next Tuesday."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function trackUpcomingEvent(event) {
  // Register passive listener without blocking main thread
  eventMonitor.watch(event.date, () => alert("Attention required!"));
}`,
      explanation: 'Registering an async observer event listener for upcoming system state changes.'
    },
    etymology: 'Derived from military radar tracking systems used to detect distant objects on the horizon.',
    formality: 'Safe for Clients',
    safeAlternative: 'Notifying for upcoming situational awareness.',
    tags: ['Communication', 'Planning', 'Management', 'Awareness'],
    popularityScore: 93,
    examples: [
      {
        context: 'Email',
        speaker: 'DevOps Lead',
        quote: 'The server SSL certificate expires next month, just putting it on your radar.',
        translatedQuote: 'Be aware that we need to renew our security certificate in 30 days.'
      }
    ]
  },
  {
    id: 'in-the-loop',
    term: 'In the Loop',
    category: 'General',
    seniority: 'Junior Dev',
    phonetic: '/ɪn ðə luːp/',
    literalDefinition: 'Analogy: Being included in the main group chat instead of finding out details second-hand.',
    realMeaning: 'Keeping specific stakeholders or team members updated on project status and decision changes.',
    corporateTranslation: 'Manager says: "Keep me in the loop." Dev hears: "Cc me on every Slack message so I don\'t get surprised by client questions."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function updateSystemState(newState) {
  // Publish state updates to subscribed observers
  observers.forEach(obs => obs.notify(newState));
}`,
      explanation: 'Maintaining an observer subscription list to broadcast state mutations in real time.'
    },
    etymology: 'Derived from electrical control loops and executive feedback chains.',
    formality: 'Safe for Clients',
    safeAlternative: 'Ensuring continuous status updates and communication alignment.',
    tags: ['Communication', 'Slack', 'Updates', 'Management'],
    popularityScore: 96,
    examples: [
      {
        context: 'Slack',
        speaker: 'Engineering Lead',
        quote: 'Make sure to tag the product manager to keep them in the loop on these design updates.',
        translatedQuote: 'Include the product manager on communications so they remain aware of layout changes.'
      }
    ]
  },
  {
    id: 'in-the-wild',
    term: 'In the Wild',
    category: 'Operations',
    seniority: 'DevOps Ninja',
    phonetic: '/ɪn ðə waɪld/',
    literalDefinition: 'Analogy: Releasing a captive animal back into the jungle.',
    realMeaning: 'Software running live in the real production environment, exposed to real user behavior and unexpected inputs.',
    corporateTranslation: 'Dev says: "It\'s in the wild now." SRE hears: "Real users are now attempting inputs that our unit test suite never imagined."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function deployToProduction(app) {
  // Expose system to unpredictable real-world inputs
  app.listenOnPublicInternet({ untrustedTraffic: true });
}`,
      explanation: 'Exposing a system to un-sanitized, high-concurrency production user traffic.'
    },
    etymology: 'Biological metaphor referring to animals living in natural untamed habitats.',
    formality: 'Safe for Clients',
    safeAlternative: 'Deployed in the live production user environment.',
    tags: ['Deployment', 'Production', 'Monitoring', 'SRE'],
    popularityScore: 94,
    examples: [
      {
        context: 'Slack',
        speaker: 'Product Manager',
        quote: 'It\'s finally time to release it and see how it performs in the wild.',
        translatedQuote: 'Now that the app is live, real users will interact with it in real production scenarios.'
      }
    ]
  },
  {
    id: 'dogfooding',
    term: 'Dogfooding',
    category: 'Operations',
    seniority: 'Tech Lead',
    phonetic: '/ˈdɔːɡ.fuːd.ɪŋ/',
    literalDefinition: 'Analogy: A pet food manufacturer feeding their own product to their own pets to prove it is safe.',
    realMeaning: 'An organization using its own software product internally before releasing it to external customers.',
    corporateTranslation: 'VP says: "We are dogfooding feature X." Team hears: "The engineering team will use our buggy internal build for 2 weeks so we find crashes first."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function validateNewRelease(build) {
  // Enforce internal employee adoption prior to public rollout
  if (user.isCompanyEmployee) {
    return build.useExperimentalBeta();
  }
}`,
      explanation: 'Routing company employees to pre-release beta builds to catch runtime flaws internally.'
    },
    etymology: 'Coined in 1988 when Microsoft manager Paul Maritz sent an email titled "Eating our own Dogfood" urging internal usage of LAN Manager.',
    formality: 'Internal Team Only',
    safeAlternative: 'Internal product validation testing prior to public launch.',
    tags: ['Testing', 'Beta', 'Internal Tools', 'QA'],
    popularityScore: 95,
    examples: [
      {
        context: 'Slack',
        speaker: 'DevOps Lead',
        quote: 'We\'ve been dogfooding our new chat app internally for a month. It\'s time for public release.',
        translatedQuote: 'Our team has been testing our new application internally to ensure quality before public launch.'
      }
    ]
  },
  {
    id: 'smoke-test',
    term: 'Smoke Test',
    category: 'Operations',
    seniority: 'DevOps Ninja',
    phonetic: '/smoʊk tɛst/',
    literalDefinition: 'Analogy: Turning on a repaired machine for the first time just to see if smoke comes out.',
    realMeaning: 'A preliminary set of basic automated tests executed after a deployment to ensure core system services run without immediate catastrophic failure.',
    corporateTranslation: 'DevOps says: "Smoke tests passed." Lead hears: "The homepage loads and users can log in without the server exploding."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `async function runSmokeTest(environment) {
  const health = await fetch(\`\${environment}/health\`);
  if (health.status !== 200) throw new Error("Catastrophic deployment failure!");
  return "Smoke test green";
}`,
      explanation: 'Executing minimal assertion checks verifying fundamental system availability post-deployment.'
    },
    etymology: 'Borrowed from hardware plumbing and electronics where smoke indicated bad circuitry or leaking pipes upon powering on.',
    formality: 'Safe for Clients',
    safeAlternative: 'Initial post-deployment verification testing.',
    tags: ['Testing', 'Deployment', 'CI/CD', 'DevOps'],
    popularityScore: 92,
    examples: [
      {
        context: 'Slack',
        speaker: 'SRE Lead',
        quote: 'Run a quick smoke test after deployment to make sure the landing page actually loads.',
        translatedQuote: 'Execute a quick health check post-deployment to verify basic server functionality.'
      }
    ]
  },
  {
    id: 'sunset',
    term: 'Sunset',
    category: 'Operations',
    seniority: 'Senior Architect',
    phonetic: '/ˈsʌn.sɛt/',
    literalDefinition: 'Analogy: Gently retiring an old machine that served its purpose well.',
    realMeaning: 'Phasing out, deprecating, and shutting down a legacy feature, service, or software product in a planned manner.',
    corporateTranslation: 'PM says: "We are sunsetting API v1." Client hears: "Migrate to API v2 within 60 days or your requests will return 404 error."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function handleV1Request(req, res) {
  res.setHeader('Warning', '299 - API v1 is sunsetted. Migrate to v2.');
  if (currentDate > DEPRECATION_DATE) {
    return res.status(410).json({ error: "Endpoint permanently retired." });
  }
}`,
      explanation: 'Returning structural deprecation headers prior to complete endpoint deprovisioning.'
    },
    etymology: 'Business euphemism for planned product retirement, evoking a peaceful conclusion.',
    formality: 'Safe for Clients',
    safeAlternative: 'Deprecate and schedule system decommissioning.',
    tags: ['Deprecation', 'Legacy', 'API', 'Operations'],
    popularityScore: 93,
    examples: [
      {
        context: 'Email',
        speaker: 'Director of Product',
        quote: 'We are going to sunset the old user portal next month to focus entirely on the web platform.',
        translatedQuote: 'We will decommission the legacy user portal by end of Q4.'
      }
    ]
  },
  {
    id: 'bleeding-edge',
    term: 'Bleeding Edge',
    category: 'Operations',
    seniority: 'Senior Architect',
    phonetic: '/ˈbliː.dɪŋ ɛdʒ/',
    literalDefinition: 'Analogy: Testing a prototype jet engine that goes fast but carries high risk of failure.',
    realMeaning: 'Using software or hardware technologies so new that they carry high risk of instability and unpatched bugs.',
    corporateTranslation: 'Dev says: "We are on the bleeding edge!" SRE hears: "Our core library broke 4 times today because we used an alpha release build."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// package.json
"dependencies": {
  "framework": "0.0.1-alpha.experimental-canary.99"
}`,
      explanation: 'Importing unstable pre-release package dependencies in production environments.'
    },
    etymology: 'An evolution of "cutting edge", implying that being too far ahead results in metaphorical cuts and bleeding.',
    formality: 'Safe for Clients',
    safeAlternative: 'Early-adoption experimental technology stack.',
    tags: ['Technology Stack', 'Innovation', 'Risk', 'Dependencies'],
    popularityScore: 89,
    examples: [
      {
        context: 'Slack',
        speaker: 'Tech Architect',
        quote: 'Using this alpha framework is bleeding edge; expect a lot of breaking bugs.',
        translatedQuote: 'Adopting this experimental framework carries stability risks and breaking API changes.'
      }
    ]
  },
  {
    id: 'production-ready',
    term: 'Production Ready',
    category: 'Operations',
    seniority: 'DevOps Ninja',
    phonetic: '/prəˈdʌk.ʃən ˈrɛd.i/',
    literalDefinition: 'Analogy: A bridge that has been thoroughly safety-tested and is ready for heavy highway traffic.',
    realMeaning: 'Software that meets all security, performance, logging, scalability, and reliability requirements to serve real users safely.',
    corporateTranslation: 'Dev says: "It\'s production ready." SRE hears: "I added logging, automated tests, security scans, and error handling."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function assertProductionReady(service) {
  if (!service.hasLogging || !service.hasRateLimiting || !service.hasUnitTests) {
    throw new DeploymentBlockedException("Service is not production ready!");
  }
}`,
      explanation: 'Enforcing operational compliance gates (monitoring, telemetry, security checks) before live deployment.'
    },
    etymology: 'DevOps term distinguishing functional prototypes from enterprise-hardened software.',
    formality: 'Safe for Clients',
    safeAlternative: 'Fully verified and deployment-compliant.',
    tags: ['Production', 'DevOps', 'Quality', 'Security'],
    popularityScore: 97,
    examples: [
      {
        context: 'Slack',
        speaker: 'Engineering Manager',
        quote: 'The main branch isn\'t production ready yet, but we need to deploy a quick hotfix.',
        translatedQuote: 'The staging code has not completed security checks, requiring an isolated patch.'
      }
    ]
  },
  {
    id: 'hotfix',
    term: 'Hotfix',
    category: 'Operations',
    seniority: 'DevOps Ninja',
    phonetic: '/ˈhɑːt.fɪks/',
    literalDefinition: 'Analogy: Slapping duct tape on a leaking pipe while the water is still running.',
    realMeaning: 'An urgent, emergency bug fix deployed directly to live production servers to resolve a critical outage or security defect.',
    corporateTranslation: 'SRE says: "Pushing a hotfix!" Lead hears: "A critical bug is breaking checkout right now; we are deploying a patch immediately without waiting for the full sprint release."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function emergencyDeploy(patch) {
  // Bypass normal 2-week sprint cycle for emergency live patch
  git.checkout('main');
  git.apply(patch);
  deployToLiveServersNow();
}`,
      explanation: 'Bypassing standard release cycles to apply an immediate patch to live production clusters.'
    },
    etymology: 'Originated in software ops to describe patching a hot (running) production server without taking it offline.',
    formality: 'Safe for Clients',
    safeAlternative: 'Emergency live patch deployment.',
    tags: ['Hotfix', 'Emergency', 'Production', 'DevOps'],
    popularityScore: 96,
    examples: [
      {
        context: 'Slack',
        speaker: 'On-Call Engineer',
        quote: 'The checkout button is broken live! Push a hotfix directly to master immediately.',
        translatedQuote: 'Deploy an urgent patch directly to production to fix the broken checkout button.'
      }
    ]
  },
  {
    id: 'downtime',
    term: 'Downtime',
    category: 'Operations',
    seniority: 'DevOps Ninja',
    phonetic: '/ˈdaʊn.taɪm/',
    literalDefinition: 'Analogy: A power outage that shuts down an entire neighborhood unexpectedly.',
    realMeaning: 'A period during which a system, server, or application is unavailable to users due to failure or scheduled maintenance.',
    corporateTranslation: 'SRE says: "We had 10 minutes of downtime." Executive hears: "Our SLA status dropped and we need to write an incident report for stakeholders."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `if (serverStatus === 'UNAVAILABLE') {
  systemUptimePercentage.decrease();
  triggerPagerDutyAlert("System Downtime Detected!");
}`,
      explanation: 'Tracking service availability drop events violating service level agreements (SLAs).'
    },
    etymology: 'Industrial manufacturing term for machine non-operation extended to computer infrastructure.',
    formality: 'Safe for Clients',
    safeAlternative: 'Service interruption or scheduled maintenance window.',
    tags: ['Outage', 'SLA', 'DevOps', 'Monitoring'],
    popularityScore: 95,
    examples: [
      {
        context: 'Slack',
        speaker: 'SRE Engineer',
        quote: 'The API downtime is a total blocker for me right now. Once that is resolved, I can resume.',
        translatedQuote: 'The backend service outage is preventing my frontend testing.'
      }
    ]
  },
  {
    id: 'cold-start',
    term: 'Cold Start',
    category: 'Operations',
    seniority: 'DevOps Ninja',
    phonetic: '/koʊld stɑːrt/',
    literalDefinition: 'Analogy: Cranking an old car engine on a freezing winter morning before it warms up.',
    realMeaning: 'The delay that occurs when an idle cloud function or serverless container is invoked for the first time and must spin up resources.',
    corporateTranslation: 'Dev says: "That delay was a cold start." PM hears: "The serverless function was asleep, so the first request took 3 seconds instead of 100ms."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `async function handleServerlessInvocation(event) {
  if (containerState === 'UNINITIALIZED') {
    // Cold start latency penalty: +1200ms
    await bootContainerRuntimes();
  }
  return executeFunction(event);
}`,
      explanation: 'Latency overhead incurred when instantiating idle serverless container environments.'
    },
    etymology: 'Engine mechanics term applied to cloud computing and serverless architectures (AWS Lambda, Cloud Run).',
    formality: 'Safe for Clients',
    safeAlternative: 'Initial runtime instantiation latency.',
    tags: ['Serverless', 'Cloud', 'Latency', 'Performance'],
    popularityScore: 91,
    examples: [
      {
        context: 'Slack',
        speaker: 'Backend Dev',
        quote: 'Serverless functions sometimes experience a cold start delay on the very first request.',
        translatedQuote: 'The first request after inactivity takes longer while cloud resources spin up.'
      }
    ]
  },
  {
    id: 'monolith',
    term: 'Monolith',
    category: 'Coding',
    seniority: 'Senior Architect',
    phonetic: '/ˈmɑː.nə.lɪθ/',
    literalDefinition: 'Analogy: A single massive skyscraper that houses an entire city\'s services, offices, and residential spaces under one roof.',
    realMeaning: 'A single unified software application where all business logic, UI, and database access are tightly coupled in one repository.',
    corporateTranslation: 'Architect says: "Our app is a monolith." Executive hears: "Deploying one tiny bug fix requires recompiling and deploying the entire company codebase."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// Monolith App: Everything bundled in one massive application process
import { Billing } from './billing';
import { Auth } from './auth';
import { Analytics } from './analytics';

const monolithApp = { Billing, Auth, Analytics };`,
      explanation: 'Coupling disparate business domains into a single compiled binary deployment unit.'
    },
    etymology: 'Greek "monolithos" meaning single stone, adopted in computing to describe unified single-tier software architectures.',
    formality: 'Safe for Clients',
    safeAlternative: 'Unified single-tier application architecture.',
    tags: ['Architecture', 'Microservices', 'System Design', 'Scaling'],
    popularityScore: 96,
    examples: [
      {
        context: 'Slack',
        speaker: 'Principal Architect',
        quote: 'Our old architecture is a massive monolith. If the central server goes down, everything breaks.',
        translatedQuote: 'Our single tightly coupled application creates operational risks across all departments.'
      }
    ]
  },
  {
    id: 'single-point-of-failure',
    term: 'Single Point of Failure (SPOF)',
    category: 'Operations',
    seniority: 'DevOps Ninja',
    phonetic: '/ˈsɪŋ.ɡəl pɔɪnt əv ˈfeɪ.ljər/',
    literalDefinition: 'Analogy: A suspension bridge held up by a single master cable.',
    realMeaning: 'A component or service in a system whose failure will cause the entire application to stop functioning.',
    corporateTranslation: 'SRE says: "That Redis master is a SPOF." Lead hears: "If that one database server crashes, our entire global platform goes dark."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function processRequest(req) {
  // SPOF: If centralAuthDB fails, all requests throw error
  if (!centralAuthDB.isHealthy()) {
    throw new SystemWideOutageException();
  }
}`,
      explanation: 'A critical path dependency lacking failover redundancy or secondary replicas.'
    },
    etymology: 'High-availability engineering term for unredundant components in critical systems.',
    formality: 'Safe for Clients',
    safeAlternative: 'Unredundant critical dependency requiring failover architecture.',
    tags: ['SRE', 'Reliability', 'DevOps', 'Architecture'],
    popularityScore: 97,
    examples: [
      {
        context: 'Slack',
        speaker: 'SRE Lead',
        quote: 'Having a single point of failure on the primary database was a mistake.',
        translatedQuote: 'We need to add database read replicas so a single server failure does not crash the app.'
      }
    ]
  },
  {
    id: 'scalability',
    term: 'Scalability',
    category: 'Strategy',
    seniority: 'Senior Architect',
    phonetic: '/ˌskeɪ.ləˈbɪl.ə.ti/',
    literalDefinition: 'Analogy: A restaurant designed to easily add tables and chefs when a massive crowd arrives.',
    realMeaning: 'The capability of a system to handle growing amounts of work or traffic by adding resources.',
    corporateTranslation: 'VP says: "Is this scalable?" Architect hears: "Will our database crash if 100,000 users sign up from a Viral TikTok tomorrow?"',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function handleTrafficSpike(incomingRequests) {
  if (incomingRequests > capacity) {
    // Horizontal auto-scaling
    cluster.addInstances(Math.ceil(incomingRequests / instanceCapacity));
  }
}`,
      explanation: 'Dynamically scaling compute nodes proportionally with incoming request throughput.'
    },
    etymology: 'Parallel processing term from the 1970s measuring system throughput scaling against resource expansion.',
    formality: 'Safe for Clients',
    safeAlternative: 'Capacity growth tolerance and throughput elasticity.',
    tags: ['Scaling', 'Performance', 'Architecture', 'Cloud'],
    popularityScore: 98,
    examples: [
      {
        context: 'Email',
        speaker: 'VP of Engineering',
        quote: 'This database design lacks scalability; it will crash if 10,000 people use it at once.',
        translatedQuote: 'Our current database architecture cannot handle high concurrent user traffic.'
      }
    ]
  },
  {
    id: 'greenfield',
    term: 'Greenfield',
    category: 'Strategy',
    seniority: 'Senior Architect',
    phonetic: '/ˈɡriːn.fiːld/',
    literalDefinition: 'Analogy: Building a brand-new house on an empty grassy plot of land with no existing structures.',
    realMeaning: 'A brand-new software project built from scratch without constraints imposed by legacy code or existing infrastructure.',
    corporateTranslation: 'Dev says: "It\'s a greenfield project!" Team hears: "Zero legacy code, modern frameworks, and no ancient tech debt to fight with!"',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// Clean slate!
git.init();
npm.init();
// Zero legacy code constraints!`,
      explanation: 'Initializing a fresh project workspace without backward compatibility requirements.'
    },
    etymology: 'Urban planning and construction term for undeveloped rural land.',
    formality: 'Safe for Clients',
    safeAlternative: 'New initiative built on modern architectural foundations.',
    tags: ['Architecture', 'New Project', 'Strategy', 'Innovation'],
    popularityScore: 92,
    examples: [
      {
        context: 'Slack',
        speaker: 'Software Engineer',
        quote: 'Starting this new project is a dream—it\'s a complete greenfield project with zero legacy code constraints.',
        translatedQuote: 'Building this new feature from scratch lets us adopt modern patterns without legacy workarounds.'
      }
    ]
  },
  {
    id: 'brownfield',
    term: 'Brownfield',
    category: 'Strategy',
    seniority: 'Senior Architect',
    phonetic: '/ˈbraʊn.fiːld/',
    literalDefinition: 'Analogy: Remodeling a historic building where you must preserve old plumbing and structural walls.',
    realMeaning: 'A project that must be developed within the constraints of existing, legacy software systems and data structures.',
    corporateTranslation: 'Dev says: "It\'s a brownfield project." Team hears: "We have to hook our brand-new UI into a 12-year-old SQL database."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// Must interface with legacy 2011 database schemas
import { LegacyDatabaseV1 } from './ancient-db-connector';

class ModernService extends LegacyDatabaseV1 {
  // Constrained by old table schemas!
}`,
      explanation: 'Extending modern functionality while maintaining strict compatibility with legacy schemas.'
    },
    etymology: 'Urban development term for industrial sites that contain existing structures or environmental constraints.',
    formality: 'Safe for Clients',
    safeAlternative: 'Integration project operating within existing legacy system constraints.',
    tags: ['Legacy', 'Integration', 'Architecture', 'Strategy'],
    popularityScore: 88,
    examples: [
      {
        context: 'Jira',
        speaker: 'Tech Lead',
        quote: 'This is a brownfield project; we have to build the new dashboard on top of a 10-year-old database structure.',
        translatedQuote: 'Our new user dashboard must integrate cleanly with our existing legacy database tables.'
      }
    ]
  },
  {
    id: 'agnostic',
    term: 'Agnostic',
    category: 'Strategy',
    seniority: 'Senior Architect',
    phonetic: '/æɡˈnɑː.stɪk/',
    literalDefinition: 'Analogy: A universal phone charger that fits every device regardless of brand.',
    realMeaning: 'Software or hardware designed to operate across multiple operating systems, cloud providers, or platforms without modification.',
    corporateTranslation: 'Architect says: "We should be cloud-agnostic." Team hears: "Don\'t rely on proprietary AWS services so we can move to GCP if prices double."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `interface StorageAdapter {
  uploadFile(file): Promise<string>;
}
// Works seamlessly on AWS, GCP, Azure, or local disk!`,
      explanation: 'Designing abstract interfaces decoupled from vendor-specific underlying drivers.'
    },
    etymology: 'Philosophical term meaning "without knowledge", adopted in IT to signify neutrality toward specific platforms.',
    formality: 'Safe for Clients',
    safeAlternative: 'Platform-independent architecture.',
    tags: ['Cloud', 'Architecture', 'Multi-Cloud', 'Design Patterns'],
    popularityScore: 91,
    examples: [
      {
        context: 'Email',
        speaker: 'Principal Architect',
        quote: 'We should build this API tool to be cloud-agnostic so it can run on AWS, Azure, or Google Cloud.',
        translatedQuote: 'Design the service using standard interfaces so it operates across any cloud provider.'
      }
    ]
  },
  {
    id: 'technical-stack',
    term: 'Technical Stack',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/ˈtɛk.nɪ.kəl stæk/',
    literalDefinition: 'Analogy: The specific foundation, framing, bricks, and roofing materials used to build a house.',
    realMeaning: 'The complete set of technologies, frameworks, programming languages, databases, and tools used to build an application.',
    corporateTranslation: 'Recruiter says: "What\'s your tech stack?" Dev hears: "Which frontend framework, backend runtime, database, and cloud provider do you use daily?"',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `const techStack = {
  frontend: 'React + Tailwind',
  backend: 'Express Node server',
  database: 'PostgreSQL',
  cloud: 'Cloud Run'
};`,
      explanation: 'The cohesive combination of languages, frameworks, and datastores powering an application.'
    },
    etymology: 'Derived from software layering models where layers sit stacked on top of operating system foundations.',
    formality: 'Safe for Clients',
    safeAlternative: 'Technology infrastructure suite.',
    tags: ['Architecture', 'Tech Stack', 'Frameworks', 'Setup'],
    popularityScore: 98,
    examples: [
      {
        context: 'Slack',
        speaker: 'Dev Director',
        quote: 'This tool integrates with our current technical stack completely out of the box.',
        translatedQuote: 'The third-party software works seamlessly with our existing programming languages and tools.'
      }
    ]
  },
  {
    id: 'ping-me',
    term: 'Ping Me',
    category: 'General',
    seniority: 'Junior Dev',
    phonetic: '/pɪŋ miː/',
    literalDefinition: 'Analogy: Tapping someone lightly on the shoulder to grab their attention.',
    realMeaning: 'Send a quick direct chat message (usually on Slack or Teams) to get a brief response or follow up.',
    corporateTranslation: 'Manager says: "Ping me later." Dev hears: "Send me a direct Slack message around 2 PM so I remember to approve your PR."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function pingUser(recipientId, message) {
  // Send lightweight async chat packet
  slack.sendDirectMessage(recipientId, message);
}`,
      explanation: 'Dispatching a low-overhead asynchronous notification to an individual team member.'
    },
    etymology: 'Derived from the network ICMP utility `ping` used to test host responsiveness.',
    formality: 'Safe for Clients',
    safeAlternative: 'Send me a direct message or follow-up note.',
    tags: ['Slack', 'Communication', 'Workplace', 'Sync'],
    popularityScore: 99,
    examples: [
      {
        context: 'Slack',
        speaker: 'Manager',
        quote: 'Ping me on Slack later this afternoon and we can do a deep dive.',
        translatedQuote: 'Send me a quick direct message later today when you are ready to review the details.'
      }
    ]
  },
  {
    id: 'take-it-offline',
    term: 'Take It Offline',
    category: 'Management',
    seniority: 'C-Suite',
    phonetic: '/teɪk ɪt ˌɒfˈlaɪn/',
    literalDefinition: 'Analogy: Pausing a large dinner table conversation to discuss a private matter quietly in the hallway.',
    realMeaning: 'Stop discussing a granular or tangential topic during a group meeting and resolve it in a private 1-on-1 sync.',
    corporateTranslation: 'Facilitator says: "Let\'s take this offline." Room hears: "This niche debate is wasting 10 people\'s time; discuss it privately."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function processGroupMeeting(topic) {
  if (topic.isNicheDetail) {
    // Offload thread to isolated child process
    spawnPrivateSyncProcess("1-on-1-chat", topic);
    return "Taken offline";
  }
}`,
      explanation: 'Offloading specific low-relevance computations to a separate private thread process.'
    },
    etymology: 'Popularized in late-90s management consulting to prevent group meeting derailments.',
    formality: 'Safe for Clients',
    safeAlternative: 'Let\'s schedule a separate 1-on-1 follow-up sync.',
    tags: ['Meetings', 'Efficiency', 'Management', 'Communication'],
    popularityScore: 97,
    examples: [
      {
        context: 'Slack',
        speaker: 'Engineering Lead',
        quote: 'That\'s a great point about security, but let\'s take it offline to save time.',
        translatedQuote: 'Let\'s pause this group discussion and handle the security details in a separate 1-on-1 thread.'
      }
    ]
  },
  {
    id: 'wheelhouse',
    term: 'Wheelhouse',
    category: 'General',
    seniority: 'Tech Lead',
    phonetic: '/ˈwiːl.haʊs/',
    literalDefinition: 'Analogy: A ship captain sitting in the wheelhouse where they have total command of the vessel.',
    realMeaning: 'An individual\'s core area of expertise, skill, or comfort zone.',
    corporateTranslation: 'Manager says: "That\'s in Sarah\'s wheelhouse." Dev hears: "Sarah has optimized SQL queries for 8 years, let her fix this slow query in 10 minutes."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function assignDomainTask(task) {
  // Match task requirements to expert skill domain
  return team.find(member => member.specialty === task.category);
}`,
      explanation: 'Routing incoming requests directly to specialized domain handlers.'
    },
    etymology: 'Baseball origin referring to the sweet spot in a batter\'s strike zone where they hit with maximum power.',
    formality: 'Safe for Clients',
    safeAlternative: 'Primary area of core technical expertise.',
    tags: ['Expertise', 'Management', 'Delegation', 'Skills'],
    popularityScore: 91,
    examples: [
      {
        context: 'Slack',
        speaker: 'Manager',
        quote: 'Database optimization is right in Sarah\'s wheelhouse; let her take the lead.',
        translatedQuote: 'Sarah possesses deep expertise in database tuning, making her ideal for leading this project.'
      }
    ]
  },
  {
    id: 'deep-dive',
    term: 'Deep Dive',
    category: 'General',
    seniority: 'Tech Lead',
    phonetic: '/diːp daɪv/',
    literalDefinition: 'Analogy: Putting on scuba gear to explore the ocean floor instead of just swimming on the surface.',
    realMeaning: 'A thorough, detailed analysis or investigation of a complex issue, codebase, or metric.',
    corporateTranslation: 'Lead says: "Let\'s do a deep dive." Dev hears: "Open the server logs, trace every database query, and find why memory usage spikes at 3 AM."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `async function inspectIssue(system) {
  // Recursively inspect nested execution call stacks
  return await system.enableVerboseTracing().analyzeAllLogs();
}`,
      explanation: 'Enabling high-verbosity telemetry tracing across all execution call stacks.'
    },
    etymology: 'Corporate business metaphor popularized in the early 2000s for in-depth analytical reviews.',
    formality: 'Safe for Clients',
    safeAlternative: 'Comprehensive technical investigation.',
    tags: ['Debugging', 'Analysis', 'Investigation', 'Logging'],
    popularityScore: 95,
    examples: [
      {
        context: 'Slack',
        speaker: 'Staff Architect',
        quote: 'We need to do a deep dive into these performance logs to find the memory leak.',
        translatedQuote: 'We must conduct a thorough investigation of server logs to pinpoint the memory defect.'
      }
    ]
  },
  {
    id: 'touch-base',
    term: 'Touch Base',
    category: 'General',
    seniority: 'Junior Dev',
    phonetic: '/tʌtʃ beɪs/',
    literalDefinition: 'Analogy: Briefly high-fiving a teammate as you cross paths to confirm you are both on track.',
    realMeaning: 'Briefly contact or meet with someone to exchange quick updates or confirm alignment.',
    corporateTranslation: 'Manager says: "Let\'s touch base tomorrow." Dev hears: "Have a 5-minute status update ready tomorrow morning before the client presentation."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function syncAlignment(peer) {
  // Exchange lightweight status ping
  return peer.getQuickStatusUpdate();
}`,
      explanation: 'Initiating a lightweight synchronization handshake with a remote peer node.'
    },
    etymology: 'Baseball terminology where runners briefly step on base to stay safe.',
    formality: 'Safe for Clients',
    safeAlternative: 'Brief status alignment check.',
    tags: ['Sync', 'Communication', 'Meetings', 'Alignment'],
    popularityScore: 97,
    examples: [
      {
        context: 'Slack',
        speaker: 'Project Lead',
        quote: 'Let\'s touch base tomorrow morning to align on the client demo.',
        translatedQuote: 'Let\'s have a brief morning sync to confirm our presentation plan.'
      }
    ]
  },
  {
    id: 'circle-back',
    term: 'Circle Back',
    category: 'Management',
    seniority: 'C-Suite',
    phonetic: '/ˈsɜːr.kəl bæk/',
    literalDefinition: 'Analogy: Making a U-turn to return to a scenic viewpoint you missed earlier on a road trip.',
    realMeaning: 'Revisit a topic or decision at a later time when more information or capacity is available.',
    corporateTranslation: 'Executive says: "Let\'s circle back next quarter." Dev hears: "I am placing this idea into an unindexed digital landfill."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `async function deferTopic(topic) {
  // Push topic resolution into callback queue with long timeout
  await taskQueue.enqueue(topic, { delay: NEXT_QUARTER_MS });
}`,
      explanation: 'Deferring promise resolution into a future event loop cycle.'
    },
    etymology: 'Corporate management vernacular popularized in the 1990s to defer decisions gracefully.',
    formality: 'Safe for Clients',
    safeAlternative: 'Revisit this topic in our follow-up meeting next week.',
    tags: ['Meetings', 'Communication', 'Management', 'Deferral'],
    popularityScore: 98,
    examples: [
      {
        context: 'Slack',
        speaker: 'DevOps Lead',
        quote: 'We\'ll circle back at the 11:00 AM post-mortem after the hotfix is verified.',
        translatedQuote: 'We will review incident details during our scheduled follow-up meeting.'
      }
    ]
  },
  {
    id: 'band-aid-solution',
    term: 'Band-Aid Solution',
    category: 'Coding',
    seniority: 'Tech Lead',
    phonetic: '/ˈbænd.eɪd səˈluː.ʃən/',
    literalDefinition: 'Analogy: Putting a small adhesive plaster on a deep wound that actually requires stitches.',
    realMeaning: 'A temporary, superficial fix that addresses symptoms of a problem without resolving the underlying root cause.',
    corporateTranslation: 'Dev says: "Restarting the server is a Band-Aid solution." Lead hears: "It stops the crash for 6 hours, but we must fix the memory leak permanently."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// Temporary workaround
function autoRestartOnCrash() {
  if (memoryLeakDetected) {
    process.restart(); // Band-aid! Does not fix actual leak!
  }
}`,
      explanation: 'Masking exception symptoms rather than repairing core underlying state leaks.'
    },
    etymology: 'Metaphor from Band-Aid adhesive bandages used for minor surface cuts.',
    formality: 'Safe for Clients',
    safeAlternative: 'Temporary workaround requiring root-cause remediation.',
    tags: ['Workaround', 'Technical Debt', 'Debugging', 'Refactoring'],
    popularityScore: 96,
    examples: [
      {
        context: 'Slack',
        speaker: 'Senior Developer',
        quote: 'Restarting the server every morning is a Band-Aid solution; we need to fix the actual leak.',
        translatedQuote: 'Daily server reboots only mask symptoms; we must fix the underlying memory leak.'
      }
    ]
  },
  {
    id: 'buy-in',
    term: 'Buy-in',
    category: 'Strategy',
    seniority: 'C-Suite',
    phonetic: '/ˈbaɪ.ɪn/',
    literalDefinition: 'Analogy: Getting everyone in the car to agree on the road trip destination before starting the engine.',
    realMeaning: 'Agreement, support, and active commitment from key stakeholders or team members for a proposed strategy or decision.',
    corporateTranslation: 'Manager says: "We need leadership buy-in." Dev hears: "Prepare a slide deck proving this architecture shift saves money before we start refactoring."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function executeStrategy(proposal) {
  const approvals = stakeholders.map(s => s.review(proposal));
  if (!approvals.every(Boolean)) throw new Error("Missing buy-in!");
}`,
      explanation: 'Requiring unanimous consensus signatures across all validator nodes before committing state.'
    },
    etymology: 'Business management term emerging in the late 20th century to signify stakeholder consensus.',
    formality: 'Safe for Clients',
    safeAlternative: 'Stakeholder consensus and executive approval.',
    tags: ['Management', 'Strategy', 'Stakeholders', 'Consensus'],
    popularityScore: 95,
    examples: [
      {
        context: 'Email',
        speaker: 'Director of Tech',
        quote: 'We need leadership buy-in before we can switch our entire framework.',
        translatedQuote: 'We must secure executive approval before beginning framework migration.'
      }
    ]
  },
  {
    id: 'paradigm-shift',
    term: 'Paradigm Shift',
    category: 'Strategy',
    seniority: 'C-Suite',
    phonetic: '/ˈpær.ə.daɪm ʃɪft/',
    literalDefinition: 'Analogy: Moving from horse-drawn carriages to combustion engine automobiles.',
    realMeaning: 'A fundamental change in approach, underlying assumptions, or technology stack across an organization or industry.',
    corporateTranslation: 'VP says: "Cloud migration was a paradigm shift." Architect hears: "Everything we learned about managing physical hardware changed overnight."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// Monolith -> Serverless Microservices transition
const legacyModel = new OnPremisesMonolith();
const newModel = new ServerlessDistributedSystem();
// Total architectural transformation!`,
      explanation: 'A fundamental transformation in execution models and foundational patterns.'
    },
    etymology: 'Coined by physicist Thomas Kuhn in 1962 in "The Structure of Scientific Revolutions".',
    formality: 'Safe for Clients',
    safeAlternative: 'Fundamental strategic transformation.',
    tags: ['Strategy', 'Innovation', 'Architecture', 'Transformation'],
    popularityScore: 90,
    examples: [
      {
        context: 'Email',
        speaker: 'CTO',
        quote: 'The transition from local servers to cloud computing was a massive paradigm shift for IT.',
        translatedQuote: 'Migrating from physical hardware to cloud infrastructure fundamentally transformed our IT operations.'
      }
    ]
  },
  {
    id: 'yagni',
    term: 'YAGNI (You Ain\'t Gonna Need It)',
    category: 'Coding',
    seniority: 'Junior Dev',
    phonetic: '/ˈjæɡ.niː/',
    literalDefinition: 'Analogy: Packing 3 snow suits for a summer beach vacation "just in case".',
    realMeaning: 'An Extreme Programming principle stating that developers should not add speculative functionality until it is strictly necessary.',
    corporateTranslation: 'Architect says: "That feature is YAGNI." Dev hears: "Do not write 500 lines of abstract interfaces for a feature we have 1 user for."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `// BAD: Over-engineered speculative abstraction
interface UniversalDatabaseFactoryAdapterStrategy {}

// GOOD: YAGNI compliant - simple direct implementation
async function getUser(id) {
  return await db.users.findUnique({ id });
}`,
      explanation: 'Building simple direct solutions today rather than speculative frameworks for unknown future requirements.'
    },
    etymology: 'Originated in Extreme Programming (XP) by Ron Jeffries and Kent Beck to fight over-engineering.',
    formality: 'Safe for Clients',
    safeAlternative: 'Deferring non-essential feature development until required.',
    tags: ['Architecture', 'Refactoring', 'Extreme Programming', 'Scope'],
    popularityScore: 92,
    examples: [
      {
        context: 'PR Review',
        speaker: 'Staff Engineer',
        quote: 'Let\'s keep this PR minimal—implementing a custom caching layer right now is YAGNI.',
        translatedQuote: 'Don\'t build complex redis caching when our simple database query runs in 4ms.'
      }
    ]
  },
  {
    id: 'blast-radius',
    term: 'Blast Radius',
    category: 'Operations',
    seniority: 'DevOps Ninja',
    phonetic: '/blɑːst ˈreɪ.di.əs/',
    literalDefinition: 'Analogy: The distance from an explosion affected by detonation.',
    realMeaning: 'The maximum potential scope of damage or system degradation if a deployment or code change fails.',
    corporateTranslation: 'DevOps says: "We must minimize the blast radius." Lead hears: "Wrap this deployment in feature flags so only 1% of users suffer if it breaks."',
    codeAnalogy: {
      language: 'pseudocode',
      snippet: `function deployMicroservice(service) {
  if (service.blastRadius === "GLOBAL") {
    throw new RiskException("Isolate to canary release first!");
  }
}`,
      explanation: 'Restricting failure propagation scope via circuit breakers and microservice isolation boundaries.'
    },
    etymology: 'Borrowed from military terminology and popularized by AWS and Cloud Infrastructure Engineers.',
    formality: 'Internal Team Only',
    safeAlternative: 'Scope of impact during deployment failures.',
    tags: ['DevOps', 'Reliability', 'Deployment', 'SRE'],
    popularityScore: 95,
    examples: [
      {
        context: 'Slack',
        speaker: 'SRE Lead',
        quote: 'Decoupling the auth token validator reduces our blast radius during DB failovers.',
        translatedQuote: 'If the database goes down, users will still be able to read cached profile data.'
      }
    ]
  }
];
