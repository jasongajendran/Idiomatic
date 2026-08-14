export type MeetingRole = 
  | 'Developer' 
  | 'Tester / QA' 
  | 'BSA (Business Analyst)' 
  | 'Iteration Manager / Scrum Master' 
  | 'Work Colleague' 
  | 'Gen-Z Tech Worker';

export type AgileCeremony = 
  | 'Daily Standup' 
  | 'Sprint Planning' 
  | 'Backlog Refinement' 
  | 'Sprint Retrospective' 
  | 'Sprint Review & Demo' 
  | 'Bug Triage & Incident' 
  | 'General Workplace';

export type PhraseTone = 
  | 'Diplomatic' 
  | 'Direct & Technical' 
  | 'Assertive Pushback' 
  | 'Casual & Gen-Z' 
  | 'Executive / Strategic';

export interface MeetingPhrase {
  id: string;
  phrase: string;
  role: MeetingRole;
  ceremony: AgileCeremony;
  tone: PhraseTone;
  scenarioContext: string;
  realMeaning: string;
  proTip: string;
  tags: string[];
}

export const CEREMONIES_DATA: MeetingPhrase[] = [
  // --- DEVELOPERS ---
  {
    id: 'dev-standup-blocker',
    phrase: "I'm currently blocked on the Auth token exchange because the downstream IAM service hasn't published their swagger contract yet.",
    role: 'Developer',
    ceremony: 'Daily Standup',
    tone: 'Direct & Technical',
    scenarioContext: 'When you cannot proceed because an external team has not delivered an API schema or contract.',
    realMeaning: "I can't write code for their service because they haven't told me what the request and response payloads look like.",
    proTip: "Call this out early in standup so the Iteration Manager can escalate the dependency to the IAM lead before noon.",
    tags: ['Blocker', 'API Contract', 'Dependencies', 'IAM']
  },
  {
    id: 'dev-standup-parking-lot',
    phrase: "Let's take the database sharding discussion to a parking lot topic right after standup so we don't hold up the rest of the team.",
    role: 'Developer',
    ceremony: 'Daily Standup',
    tone: 'Diplomatic',
    scenarioContext: 'When two engineers start an in-depth architectural debate during the 15-minute standup.',
    realMeaning: 'This is a deep dive that only affects 2 of us; let everyone else get back to their morning work.',
    proTip: 'Iteration Managers and Scrum Masters love developers who proactively suggest parking lot topics to preserve standup brevity.',
    tags: ['Parking Lot', 'Timeboxing', 'Architecture', 'Meeting Etiquette']
  },
  {
    id: 'dev-planning-capacity',
    phrase: "Given our 40% on-call rotation overhead and two bank holidays this sprint, our realistic committed capacity is 32 points, not 45.",
    role: 'Developer',
    ceremony: 'Sprint Planning',
    tone: 'Assertive Pushback',
    scenarioContext: 'When product management attempts to over-commit the sprint without accounting for holidays and production support.',
    realMeaning: 'If you force us to take 45 points, we will fail the sprint goal and burn out the team.',
    proTip: 'Always quantify non-feature overhead (on-call, PR reviews, ceremonies, holidays) in story points or developer days.',
    tags: ['Capacity', 'Velocity', 'Sprint Goal', 'Estimates']
  },
  {
    id: 'dev-refinement-tech-debt',
    phrase: "If we don't refactor this monolithic checkout service now, adding Apple Pay will increase our regression blast radius across all payment channels.",
    role: 'Developer',
    ceremony: 'Backlog Refinement',
    tone: 'Direct & Technical',
    scenarioContext: 'Justifying tech debt remediation to a product owner who only wants new user-facing features.',
    realMeaning: 'The code is spaghetti. If we rush this feature without cleanup, the entire checkout flow will become fragile.',
    proTip: 'Frame technical debt in terms of future feature delivery speed and production risk, not aesthetic code purity.',
    tags: ['Tech Debt', 'Refactoring', 'Blast Radius', 'Payment']
  },
  {
    id: 'dev-pr-bikeshedding',
    phrase: "This formatting question is handled by Prettier in CI; let's focus our review cycles on the concurrency race condition in the cache layer.",
    role: 'Developer',
    ceremony: 'General Workplace',
    tone: 'Diplomatic',
    scenarioContext: 'When code reviewers get stuck arguing about variable names, line breaks, or personal styling preferences.',
    realMeaning: 'Stop wasting time arguing over petty syntax when there are serious logic bugs in the pull request.',
    proTip: 'Automate linting and formatting in your CI/CD pipeline to completely eliminate subjective style debates.',
    tags: ['PR Review', 'Bikeshedding', 'Concurrency', 'CI/CD']
  },
  {
    id: 'dev-retro-flaky-ci',
    phrase: "Our E2E test suite had a 30% flake rate this sprint, which broke developer flow and caused people to bypass test checks.",
    role: 'Developer',
    ceremony: 'Sprint Retrospective',
    tone: 'Direct & Technical',
    scenarioContext: 'Raising intermittent test failures during retrospective action-item brainstorming.',
    realMeaning: 'People stop trusting tests when they fail randomly, leading to bad code being merged into production.',
    proTip: 'Propose quarantine strategies: immediately isolate flaky tests into a separate non-blocking suite until quarantined.',
    tags: ['Retrospective', 'Flaky Tests', 'CI Pipeline', 'Quality']
  },

  // --- TESTERS / QA ---
  {
    id: 'qa-triage-severity',
    phrase: "This is a Sev-1 Blocker because the checkout token expires silently on iOS Safari, causing 100% cart abandonment for mobile users.",
    role: 'Tester / QA',
    ceremony: 'Bug Triage & Incident',
    tone: 'Direct & Technical',
    scenarioContext: 'Categorizing a critical defect during a live release candidate triage meeting.',
    realMeaning: 'Do not deploy this release to production under any circumstances until this bug is resolved.',
    proTip: 'Always include exact device, browser, reproducible steps, console logs, and business revenue impact.',
    tags: ['Bug Triage', 'Sev-1', 'iOS Safari', 'Blocker']
  },
  {
    id: 'qa-refinement-acceptance-criteria',
    phrase: "The acceptance criteria cover the happy path, but what is the expected system behavior when the third-party payment gateway times out after 10 seconds?",
    role: 'Tester / QA',
    ceremony: 'Backlog Refinement',
    tone: 'Diplomatic',
    scenarioContext: 'Questioning unspecified edge cases and error states in user stories during grooming.',
    realMeaning: 'Your story only describes what happens when everything works perfectly; you forgot error handling.',
    proTip: 'Great QA engineers ask "What happens when things fail?" before developers start writing a single line of code.',
    tags: ['Acceptance Criteria', 'Edge Cases', 'Timeout', 'Resilience']
  },
  {
    id: 'qa-standup-regression-risk',
    phrase: "The backend DB schema migration landed yesterday afternoon; I will need 3 hours of focused regression testing before I can sign off on the release candidate.",
    role: 'Tester / QA',
    ceremony: 'Daily Standup',
    tone: 'Direct & Technical',
    scenarioContext: 'Communicating necessary QA testing buffers during the morning release standup.',
    realMeaning: 'Do not pressure me to deploy in 10 minutes; altering the database requires thorough validation.',
    proTip: 'Give clear time estimates for testing phases so product and release managers can coordinate go-live schedules.',
    tags: ['Regression Testing', 'Schema Migration', 'Release Sign-Off']
  },
  {
    id: 'qa-retro-test-data',
    phrase: "We lost two full days this sprint waiting for masked production test data in the staging environment; we need synthetic data generation fixtures.",
    role: 'Tester / QA',
    ceremony: 'Sprint Retrospective',
    tone: 'Assertive Pushback',
    scenarioContext: 'Highlighting environment and test data bottlenecks during sprint retrospective.',
    realMeaning: 'We cannot test complex user edge cases without realistic data, and manual DB seeding is a massive time sink.',
    proTip: 'Suggest containerized fixtures (e.g. Testcontainers or Faker scripts) to spin up clean test states on demand.',
    tags: ['Test Data', 'Staging', 'Synthetic Data', 'Efficiency']
  },

  // --- BSA (BUSINESS SYSTEM ANALYSTS) ---
  {
    id: 'bsa-refinement-scope-slice',
    phrase: "To keep this story within our 5-point threshold, let's slice off the international currency conversion into a Phase 2 fast-follower story.",
    role: 'BSA (Business Analyst)',
    ceremony: 'Backlog Refinement',
    tone: 'Diplomatic',
    scenarioContext: 'Breaking down an oversized, complex user story into smaller shippable vertical increments.',
    realMeaning: 'This story is too big to fit in one sprint. Let us deliver the core domestic feature first, then add international later.',
    proTip: 'Vertical slicing delivers end-to-end working software faster and prevents stories from spilling across multiple sprints.',
    tags: ['Vertical Slicing', 'Story Points', 'Phase 2', 'Scope']
  },
  {
    id: 'bsa-planning-definition-of-ready',
    phrase: "Story #402 does not meet our Definition of Ready yet because Figma UI specs and GDPR consent copy are still pending legal sign-off.",
    role: 'BSA (Business Analyst)',
    ceremony: 'Sprint Planning',
    tone: 'Assertive Pushback',
    scenarioContext: 'Preventing half-baked stories from entering the active sprint backlog.',
    realMeaning: 'Developers will get stuck halfway through if we start coding before the designs and legal copy are approved.',
    proTip: 'Enforcing the Definition of Ready protects the sprint from churn, mid-sprint requirement pivots, and blocked work.',
    tags: ['Definition of Ready', 'Figma', 'GDPR', 'Dependencies']
  },
  {
    id: 'bsa-standup-clarification',
    phrase: "I've updated the Jira ticket with the finalized refund calculation matrix after syncing with the Finance team this morning.",
    role: 'BSA (Business Analyst)',
    ceremony: 'Daily Standup',
    tone: 'Diplomatic',
    scenarioContext: 'Notifying engineering that an open business logic question has been resolved and documented.',
    realMeaning: 'The calculation formula is now officially confirmed, so developers can code the business logic without guesswork.',
    proTip: 'Always link directly to the updated section in Jira or Confluence so developers do not have to hunt for changes.',
    tags: ['Requirements', 'Finance', 'Jira', 'Business Logic']
  },
  {
    id: 'bsa-demo-stakeholder-feedback',
    phrase: "Thank you for the suggestion on custom CSV exports; I have captured that in our product backlog for prioritization against Q4 roadmap themes.",
    role: 'BSA (Business Analyst)',
    ceremony: 'Sprint Review & Demo',
    tone: 'Diplomatic',
    scenarioContext: 'Politely fielding out-of-scope feature requests from stakeholders during sprint review demos.',
    realMeaning: 'Good idea, but we are not derailing our planned roadmap to build your pet feature today.',
    proTip: 'Acknowledge stakeholder feedback positively while maintaining strong boundaries on sprint commitment and roadmap priority.',
    tags: ['Stakeholder Management', 'Sprint Review', 'Backlog', 'Roadmap']
  },

  // --- ITERATION MANAGERS / SCRUM MASTERS ---
  {
    id: 'im-standup-wip-limits',
    phrase: "We have 8 tickets in 'In Progress' for 4 developers. Let's swarm on the review and QA columns before pulling new stories from the backlog.",
    role: 'Iteration Manager / Scrum Master',
    ceremony: 'Daily Standup',
    tone: 'Direct & Technical',
    scenarioContext: 'Enforcing Work In Progress (WIP) limits when tickets get jammed in code review or testing.',
    realMeaning: 'Stop starting new tasks when existing ones are stuck. Help your teammates review and test to get tickets across the finish line.',
    proTip: 'Remember the Kanban mantra: "Stop starting, start finishing." Reducing WIP speeds up overall cycle time.',
    tags: ['WIP Limits', 'Swarming', 'Flow', 'Kanban']
  },
  {
    id: 'im-planning-sprint-goal',
    phrase: "What is the single cohesive Sprint Goal that delivers measurable customer value by the end of these two weeks?",
    role: 'Iteration Manager / Scrum Master',
    ceremony: 'Sprint Planning',
    tone: 'Executive / Strategic',
    scenarioContext: 'Guiding the team to establish a meaningful sprint goal rather than just a random grab-bag of tickets.',
    realMeaning: 'If we could only ship one major outcome this sprint, what would justify our work to the business?',
    proTip: 'A clear Sprint Goal provides focus when trade-offs or scope cuts must be made mid-sprint.',
    tags: ['Sprint Goal', 'Customer Value', 'Alignment', 'Focus']
  },
  {
    id: 'im-retro-psychological-safety',
    phrase: "Remember that this retrospective is blameless: we are here to inspect and adapt our system processes, not point fingers at individuals.",
    role: 'Iteration Manager / Scrum Master',
    ceremony: 'Sprint Retrospective',
    tone: 'Diplomatic',
    scenarioContext: 'Setting the psychological ground rules at the beginning of a retrospective after a tough production incident.',
    realMeaning: 'Everyone acted with good intentions based on what they knew at the time. Let us fix the safeguards so it does not happen again.',
    proTip: 'Norm Kerth’s Prime Directive creates psychological safety: "Regardless of what we discover, we understand that everyone did the best job they could."',
    tags: ['Blameless', 'Psychological Safety', 'Process Improvement', 'Prime Directive']
  },
  {
    id: 'im-standup-dependency-escalation',
    phrase: "I'll take the action item to escalate the Cloud Infrastructure firewall approval with their Engineering Director after this call.",
    role: 'Iteration Manager / Scrum Master',
    ceremony: 'Daily Standup',
    tone: 'Executive / Strategic',
    scenarioContext: 'Stepping in to remove an external organizational blocker for an engineer.',
    realMeaning: 'Developer, keep coding what you can; I will use management channels to get the bureaucracy cleared for you.',
    proTip: 'The Iteration Manager’s highest duty is shielding the team from external friction and clearing impediments.',
    tags: ['Impediment', 'Escalation', 'Unblocking', 'Leadership']
  },

  // --- WORKPLACE COLLEAGUES (DIPLOMATIC & CROSS-FUNCTIONAL) ---
  {
    id: 'colleague-disagree-commit',
    phrase: "I have reservations about choosing GraphQL over REST for this simple CRUD service, but I'm happy to disagree and commit to support the team's decision.",
    role: 'Work Colleague',
    ceremony: 'General Workplace',
    tone: 'Diplomatic',
    scenarioContext: 'Gracefully accepting a team consensus after an architectural or design disagreement.',
    realMeaning: 'I think you made the wrong call, but I will put 100% of my energy into making it work rather than sabotaging it.',
    proTip: 'Disagree and commit prevents endless decision paralysis while keeping team morale and camaraderie high.',
    tags: ['Disagree and Commit', 'Consensus', 'Architecture', 'Teamwork']
  },
  {
    id: 'colleague-async-first',
    phrase: "Let's draft a 1-page Request for Comments (RFC) document asynchronously on Notion so everyone can leave feedback before we book a 30-minute sync.",
    role: 'Work Colleague',
    ceremony: 'General Workplace',
    tone: 'Executive / Strategic',
    scenarioContext: 'Avoiding unnecessary meetings by establishing written clarity first.',
    realMeaning: 'Let us write down our thoughts first so we do not waste 6 people’s time sitting in a live meeting listening to someone ramble.',
    proTip: 'Async RFCs allow introverted and distributed team members across timezones to provide thoughtful input.',
    tags: ['Async', 'RFC', 'Meeting Reduction', 'Documentation']
  },
  {
    id: 'colleague-circle-back',
    phrase: "Let's circle back on this after we've reviewed the Datadog latency metrics from the canary deployment.",
    role: 'Work Colleague',
    ceremony: 'General Workplace',
    tone: 'Diplomatic',
    scenarioContext: 'Deferring an opinion-based argument until hard empirical data is available.',
    realMeaning: 'Let us stop arguing with subjective opinions and wait for the actual production server data to tell us the truth.',
    proTip: 'Replace opinion debates with empirical telemetry tests whenever possible.',
    tags: ['Circle Back', 'Canary', 'Data-Driven', 'Metrics']
  },
  {
    id: 'colleague-hard-stop',
    phrase: "I have a hard stop at the top of the hour, so let's summarize the key action items and owners for the remaining 5 minutes.",
    role: 'Work Colleague',
    ceremony: 'General Workplace',
    tone: 'Diplomatic',
    scenarioContext: 'Politely wrapping up a meeting on time and ensuring action items are assigned.',
    realMeaning: 'I have another meeting in 5 minutes; finish up what you are saying and assign who is doing what.',
    proTip: 'Announcing a hard stop at the start of a meeting keeps participants punctual and disciplined.',
    tags: ['Hard Stop', 'Time Management', 'Action Items', 'Punctuality']
  },

  // --- GEN-Z TECH WORKER & MODERN WORKPLACE PHRASES ---
  {
    id: 'genz-let-him-cook',
    phrase: "Hold on, let him cook — his dynamic caching proposal actually cuts our AWS Redis cluster bill by 40%.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'General Workplace',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Advocating for a teammate when someone tries to interrupt or dismiss an unconventional idea too quickly.',
    realMeaning: 'Give him room to explain his full logic before jumping in to criticize it.',
    proTip: 'In corporate settings, translate to: "Let us give him the floor to finish walking through the proposal before opening up for critique."',
    tags: ['Let Him Cook', 'Advocacy', 'Collaboration', 'Gen-Z']
  },
  {
    id: 'genz-standing-on-business',
    phrase: "We're standing on business with this security audit; no unsigned JWT tokens are passing through the API gateway under any circumstances.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Bug Triage & Incident',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Holding a firm, non-negotiable boundary on code quality, compliance, or security posture.',
    realMeaning: 'We are refusing to compromise our standards, no matter how much external pressure is applied.',
    proTip: 'Corporate alternative: "We are strictly adhering to our security compliance standards without exceptions."',
    tags: ['Standing On Business', 'Security', 'Integrity', 'Standards']
  },
  {
    id: 'genz-delulu-scope',
    phrase: "Thinking we can rewrite the entire legacy billing engine in a single 2-week sprint without QA regression is pure delulu.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Sprint Planning',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Calling out an unrealistic management deadline or wildly over-optimistic project plan.',
    realMeaning: 'That plan is completely detached from engineering reality and is guaranteed to fail.',
    proTip: 'Corporate alternative: "That estimate relies on overly optimistic assumptions that don’t align with our historical velocity."',
    tags: ['Delulu', 'Estimation', 'Reality Check', 'Scope']
  },
  {
    id: 'genz-touch-grass',
    phrase: "We've spent 45 minutes debating whether this button shadow should be 4px or 6px blur; everyone needs to touch grass and merge the PR.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'General Workplace',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Interrupting trivial, low-stakes bikeshedding arguments among engineers or designers.',
    realMeaning: 'We have lost all perspective on what actually matters to our users. Let us wrap this up and move on.',
    proTip: 'Corporate alternative: "Let us step back and look at the bigger picture so we do not over-index on negligible aesthetic details."',
    tags: ['Touch Grass', 'Perspective', 'Bikeshedding', 'Pragmatism']
  },
  {
    id: 'genz-its-giving',
    phrase: "This PR has 4,000 changed lines across 47 files... it's giving 'I haven't rebased on main in six months'.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'General Workplace',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Humorously calling out a massive, unreviewable pull request with merge conflict chaos.',
    realMeaning: 'This pull request is way too large and is going to create massive merge conflicts and bugs.',
    proTip: 'Corporate alternative: "This PR scope is too broad. Please break it into smaller, decoupled atomic commits."',
    tags: ['Its Giving', 'PR Scope', 'Git Rebase', 'Code Review']
  },
  {
    id: 'genz-no-cap',
    phrase: "Switching from Webpack to Vite brought our local HMR reload time from 12 seconds down to 40ms, no cap.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Sprint Retrospective',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Confirming an extraordinary performance improvement with absolute sincerity.',
    realMeaning: 'I am not exaggerating at all; this is the genuine, verified benchmark measurement.',
    proTip: 'Corporate alternative: "These benchmark measurements are 100% verified and reproducible."',
    tags: ['No Cap', 'Tooling', 'Vite', 'Developer Experience']
  },
  {
    id: 'genz-rent-free',
    phrase: "That intermittent Kafka consumer group rebalance bug has been living rent-free in my head all weekend.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Daily Standup',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Admitting you cannot stop thinking about a frustrating, elusive distributed systems bug.',
    realMeaning: 'I have been obsessively debugging this complex issue in my subconscious for days.',
    proTip: 'Corporate alternative: "I have been conducting root-cause analysis on this persistent distributed messaging issue."',
    tags: ['Rent Free', 'Kafka', 'Debugging', 'Obsession']
  },
  {
    id: 'genz-unserious',
    phrase: "Deploying an unversioned database migration directly to the production master on a Friday at 4:55 PM is deeply unserious behavior.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Bug Triage & Incident',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Calling out reckless DevOps or engineering practices that violate standard safety protocols.',
    realMeaning: 'That was an irresponsible risk that completely disregarded operational standards.',
    proTip: 'Corporate alternative: "Deploying changes without an approved rollback strategy directly violates our production deployment governance."',
    tags: ['Unserious', 'Friday Deploy', 'DevOps', 'Governance']
  },
  {
    id: 'genz-main-character',
    phrase: "The third-party auth provider is having main character energy today with their 504 gateway outages.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Bug Triage & Incident',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Playfully describing an external vendor whose outage is hogging all of the engineering team’s attention.',
    realMeaning: 'Their system outage is monopolizing our time and disrupting all our user logins.',
    proTip: 'Corporate alternative: "An upstream vendor outage is currently degrading our authentication availability SLA."',
    tags: ['Main Character Energy', 'Outage', 'Vendor', 'SLA']
  },
  {
    id: 'genz-hard-pass',
    phrase: "Building custom bespoke microservices to handle simple password resets when Auth0 already does it out of the box is a hard pass.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Sprint Planning',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Quickly rejecting an over-engineered build-vs-buy proposal.',
    realMeaning: 'We should definitely not waste our limited engineering bandwidth reinventing the wheel.',
    proTip: 'Corporate alternative: "We strongly recommend leveraging our existing identity platform rather than incurring custom maintenance overhead."',
    tags: ['Hard Pass', 'Build vs Buy', 'YAGNI', 'Architecture']
  },
  {
    id: 'genz-vibe-check',
    phrase: "Quick sprint vibe check: is everyone feeling good about shipping this release on Thursday, or are we secretly stressed about the data migration?",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Daily Standup',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Casually assessing team morale and hidden anxieties before a major milestone.',
    realMeaning: 'Let us be honest with each other about our real confidence level for this deployment.',
    proTip: 'Corporate alternative: "Let us conduct a quick confidence vote regarding our release readiness."',
    tags: ['Vibe Check', 'Morale', 'Confidence Vote', 'Standup']
  },
  {
    id: 'genz-corporate-glazing',
    phrase: "No corporate glazing, but our DevOps lead automating the multi-region Kubernetes failover in one afternoon was genuinely heroic.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Sprint Retrospective',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Giving high praise to an engineer for exceptional technical execution without sounding overly sycophantic.',
    realMeaning: 'I am giving honest praise where it is truly deserved because the accomplishment was outstanding.',
    proTip: 'Retrospectives are the best venue to give peer shoutouts and celebrate team wins.',
    tags: ['Praise', 'DevOps', 'Kubernetes', 'Kudos']
  },
  {
    id: 'genz-bet-say-less',
    phrase: "Bet, say less — I will spin up the feature flag and dark-launch the change to 5% of beta users right now.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'Daily Standup',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Expressing instant agreement and immediate execution after receiving a task from a tech lead.',
    realMeaning: 'Understood completely; I will begin implementing this immediately without further discussion.',
    proTip: 'Corporate alternative: "Understood. I will initiate the phased canary rollout under the designated feature flag immediately."',
    tags: ['Bet', 'Say Less', 'Canary Rollout', 'Feature Flag']
  },

  // --- ADDITIONAL ESSENTIAL DEVELOPER PHRASES ---
  {
    id: 'dev-api-contract-drift',
    phrase: "We need an OpenAPI schema validation test in the pipeline to prevent runtime API contract drift between frontend and backend.",
    role: 'Developer',
    ceremony: 'Backlog Refinement',
    tone: 'Direct & Technical',
    scenarioContext: 'Fixing miscommunication between frontend and backend engineers about payload keys.',
    realMeaning: 'Stop changing response fields without updating TypeScript types and breaking the frontend UI.',
    proTip: 'Use tools like Orval or OpenAPI Generator to auto-generate client types on every backend build.',
    tags: ['API Contract', 'TypeScript', 'OpenAPI', 'Frontend']
  },
  {
    id: 'dev-idempotent-webhook',
    phrase: "Make sure this webhook consumer is strictly idempotent using a Redis distributed lock so duplicate Stripe events don't double-charge customers.",
    role: 'Developer',
    ceremony: 'Backlog Refinement',
    tone: 'Direct & Technical',
    scenarioContext: 'Ensuring resilience in payment event processing.',
    realMeaning: 'If Stripe sends the same payment notification twice, our code must only charge the customer once.',
    proTip: 'Always store external event IDs with a unique constraint or TTL in your transaction log.',
    tags: ['Idempotency', 'Stripe', 'Redis', 'Webhooks']
  },
  {
    id: 'dev-premature-optimization',
    phrase: "Let's profile the slow database query with EXPLAIN ANALYZE before we prematurely introduce a distributed caching layer.",
    role: 'Developer',
    ceremony: 'Sprint Planning',
    tone: 'Diplomatic',
    scenarioContext: 'Preventing over-engineering when a simple database index can solve a performance lag.',
    realMeaning: 'Do not add the complexity of Redis when adding a single B-tree index on the SQL table will fix the 200ms delay.',
    proTip: 'Donald Knuth: "Premature optimization is the root of all evil." Measure first, optimize second.',
    tags: ['Performance', 'SQL Index', 'Premature Optimization', 'Profiling']
  },

  // --- ADDITIONAL ESSENTIAL TESTER / QA PHRASES ---
  {
    id: 'qa-edge-case-boundary',
    phrase: "What happens if a user enters special unicode characters or an emoji string in the credit card billing name field?",
    role: 'Tester / QA',
    ceremony: 'Backlog Refinement',
    tone: 'Direct & Technical',
    scenarioContext: 'Uncovering input sanitization and character encoding edge cases during refinement.',
    realMeaning: 'Will our backend crash with a 500 error if someone types a non-ASCII character into the input form?',
    proTip: 'Always test multi-byte UTF-8 inputs, zero-width spaces, and SQL injection strings.',
    tags: ['Sanitization', 'Unicode', 'Security', 'Edge Cases']
  },
  {
    id: 'qa-load-testing-peak',
    phrase: "Our Gatling load test showed server response times spike to 4.2 seconds once concurrent users exceed 1,500 during Black Friday simulation.",
    role: 'Tester / QA',
    ceremony: 'Bug Triage & Incident',
    tone: 'Direct & Technical',
    scenarioContext: 'Reporting performance bottleneck metrics before a major commercial shopping event.',
    realMeaning: 'Our web servers will crash under peak holiday shopping traffic unless we scale horizontal pods and tune DB connection pools.',
    proTip: 'Provide clear visual percentile graphs (p95, p99) rather than just average response times.',
    tags: ['Load Testing', 'Black Friday', 'p99 Latency', 'Scalability']
  },

  // --- ADDITIONAL ESSENTIAL BSA PHRASES ---
  {
    id: 'bsa-nfr-compliance',
    phrase: "Per SOC2 and HIPAA compliance requirements, all user Personally Identifiable Information (PII) must be encrypted both in transit and at rest in the database.",
    role: 'BSA (Business Analyst)',
    ceremony: 'Backlog Refinement',
    tone: 'Direct & Technical',
    scenarioContext: 'Documenting non-functional security and compliance requirements in ticket acceptance criteria.',
    realMeaning: 'We legally cannot store plain text emails, phone numbers, or health data without encryption keys.',
    proTip: 'Tag compliance acceptance criteria separately so auditors can easily verify trace matrices.',
    tags: ['SOC2', 'HIPAA', 'PII', 'Encryption', 'Non-Functional']
  },
  {
    id: 'bsa-user-persona-journey',
    phrase: "Let's align this story around the First-Time Guest User persona rather than the Enterprise Admin to ensure our onboarding conversion funnel stays frictionless.",
    role: 'BSA (Business Analyst)',
    ceremony: 'Sprint Planning',
    tone: 'Executive / Strategic',
    scenarioContext: 'Keeping user experience empathy at the forefront during feature scoping.',
    realMeaning: 'Do not overload first-time users with 20 configuration steps before they experience the core value.',
    proTip: 'Tie user stories back to specific user journey maps and conversion analytics.',
    tags: ['User Persona', 'Onboarding', 'UX Funnel', 'Conversion']
  },

  // --- ADDITIONAL ESSENTIAL ITERATION MANAGER PHRASES ---
  {
    id: 'im-cycle-time-burnup',
    phrase: "Our average ticket cycle time dropped from 6.4 days to 2.8 days after we adopted pair programming on complex backend tickets.",
    role: 'Iteration Manager / Scrum Master',
    ceremony: 'Sprint Retrospective',
    tone: 'Executive / Strategic',
    scenarioContext: 'Sharing objective agile flow metrics to demonstrate team improvement.',
    realMeaning: 'Working together in pairs helped us spot bugs faster and reduced PR review wait times by more than half.',
    proTip: 'Celebrate quantitative flow improvements to validate team process experiments.',
    tags: ['Cycle Time', 'Pair Programming', 'Flow Metrics', 'Agile']
  },
  {
    id: 'im-scope-creep-containment',
    phrase: "This looks like a valuable capability, but let's log it as a new backlog item rather than expanding the scope of our currently active in-flight sprint.",
    role: 'Iteration Manager / Scrum Master',
    ceremony: 'Daily Standup',
    tone: 'Diplomatic',
    scenarioContext: 'Protecting the team from mid-sprint scope creep and unexpected additions.',
    realMeaning: 'Stop trying to sneak extra features into the active sprint without proper estimation and trade-offs.',
    proTip: 'Shielding sprint scope preserves developer focus, predictable velocity, and on-time releases.',
    tags: ['Scope Creep', 'Sprint Protection', 'Backlog', 'Focus']
  },

  // --- IDIOMATIC EVERYDAY PHRASES FOR TECH PROFESSIONALS ---
  {
    id: 'dev-once-in-a-blue-moon',
    phrase: "This race condition only triggers once in a blue moon under ultra-high concurrent socket loads, but we should still patch the mutex lock to safeguard data consistency.",
    role: 'Developer',
    ceremony: 'Bug Triage & Incident',
    tone: 'Direct & Technical',
    scenarioContext: 'Explaining an intermittent edge-case bug during bug triage or incident postmortem.',
    realMeaning: 'The defect is exceedingly rare, but fixing it prevents catastrophic silent database corruption.',
    proTip: 'Acknowledge the rarity while emphasizing why the severity still justifies a patch.',
    tags: ['Once in a Blue Moon', 'Concurrency', 'Edge Cases', 'Bug Triage']
  },
  {
    id: 'devops-on-cloud-nine',
    phrase: "We're on cloud nine after yesterday's zero-downtime database migration — p99 latency stayed under 20ms throughout peak checkout traffic!",
    role: 'Work Colleague',
    ceremony: 'Daily Standup',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Sharing a major team deployment triumph during morning standup.',
    realMeaning: 'The infrastructure upgrade was an overwhelming success with perfect reliability metrics.',
    proTip: 'Boost team morale by sharing concrete performance wins and celebrating error-free releases.',
    tags: ['On Cloud Nine', 'Deployment', 'Success', 'Zero Downtime']
  },
  {
    id: 'lead-nitty-gritty',
    phrase: "Now that we have agreement on the high-level system architecture, let's get down to the nitty-gritty of the schema migrations and payload serialization.",
    role: 'Developer',
    ceremony: 'Backlog Refinement',
    tone: 'Direct & Technical',
    scenarioContext: 'Transitioning from broad architectural concepts to low-level implementation details in technical refinement.',
    realMeaning: 'Let us dive into the actual code structure, data types, and database fields required to build this.',
    proTip: 'Use this transition to refocus the team from theoretical debates to actionable engineering tickets.',
    tags: ['Nitty-Gritty', 'Architecture', 'Refinement', 'Details']
  },
  {
    id: 'qa-tip-of-the-iceberg',
    phrase: "This missing validation error in the signup UI is just the tip of the iceberg — the backend API accepts malformed JSON without returning a 400 Bad Request.",
    role: 'Tester / QA',
    ceremony: 'Bug Triage & Incident',
    tone: 'Assertive Pushback',
    scenarioContext: 'Alerting the team that a superficial UI defect hides a major backend security or data validation flaw.',
    realMeaning: 'Fixing the frontend button is not enough; the entire backend API schema validator needs fixing.',
    proTip: 'Highlight systemic risk so tickets do not get closed with shallow visual band-aids.',
    tags: ['Tip of the Iceberg', 'Security', 'QA', 'API Validation']
  },
  {
    id: 'arch-bite-the-bullet',
    phrase: "We've deferred upgrading this legacy ORM for three quarters; we need to bite the bullet this sprint and execute the migration before security support ends.",
    role: 'Developer',
    ceremony: 'Sprint Planning',
    tone: 'Executive / Strategic',
    scenarioContext: 'Advocating for essential, overdue technical debt remediation during sprint planning.',
    realMeaning: 'We must accept short-term refactoring effort now to avoid catastrophic security and build failures later.',
    proTip: 'Pair the request with compliance and security deadlines to win business stakeholder buy-in.',
    tags: ['Bite the Bullet', 'Tech Debt', 'Migration', 'Planning']
  },
  {
    id: 'bsa-back-to-drawing-board',
    phrase: "Given that user interviews revealed customers rarely use the batch export wizard, let's go back to the drawing board and design a one-click automated sync.",
    role: 'BSA (Business Analyst)',
    ceremony: 'Sprint Retrospective',
    tone: 'Diplomatic',
    scenarioContext: 'Pivoting product direction after user feedback invalidates the initial workflow design.',
    realMeaning: 'Our initial assumption was wrong; let us rethink the feature from the user perspective.',
    proTip: 'Framing redesigns around user analytics helps teams embrace pivots without feeling demoralized.',
    tags: ['Back to Drawing Board', 'UX Research', 'Pivot', 'Product Design']
  },
  {
    id: 'colleague-hit-nail-on-head',
    phrase: "You hit the nail on the head regarding the memory leak — unmounting the WebSocket listener in useEffect completely stabilized our client heap size.",
    role: 'Work Colleague',
    ceremony: 'Daily Standup',
    tone: 'Diplomatic',
    scenarioContext: 'Validating a teammate\'s diagnostic insight during morning standup.',
    realMeaning: 'Your diagnosis of the bug was 100% accurate and solved the core issue.',
    proTip: 'Giving public credit for sharp troubleshooting builds psychological safety and team trust.',
    tags: ['Hit the Nail on the Head', 'Recognition', 'Debugging', 'Memory Leak']
  },
  {
    id: 'lead-devils-advocate',
    phrase: "Let me play devil's advocate for a moment: what is our fallback strategy if the third-party payment webhook drops offline during Black Friday?",
    role: 'Developer',
    ceremony: 'Backlog Refinement',
    tone: 'Executive / Strategic',
    scenarioContext: 'Stress-testing resiliency and edge-case disaster recovery during technical design sessions.',
    realMeaning: 'Let us systematically test our assumptions and design an offline queue fallback mechanism.',
    proTip: 'Framing inquiries as devil\'s advocacy invites constructive scrutiny without personal defensiveness.',
    tags: ["Devil's Advocate", 'Resilience', 'Disaster Recovery', 'Architecture']
  },
  {
    id: 'im-ball-in-your-court',
    phrase: "The backend team has published the mock server and OpenAPI spec; the ball is now in the mobile team's court to hook up the client UI screens.",
    role: 'Iteration Manager / Scrum Master',
    ceremony: 'Daily Standup',
    tone: 'Diplomatic',
    scenarioContext: 'Clarifying ownership handoffs across cross-functional engineering teams in standup.',
    realMeaning: 'The prerequisites are finished, so the mobile engineers can proceed unblocked.',
    proTip: 'Explicit handoff signaling eliminates ambiguous blocker delays between frontend and backend.',
    tags: ['Ball in Your Court', 'Handoff', 'Dependencies', 'Standup']
  },
  {
    id: 'genz-touch-base-vibe',
    phrase: "Let's touch base async on Slack after standup so we can lock in the API contract without scheduling another 30-minute Zoom call.",
    role: 'Gen-Z Tech Worker',
    ceremony: 'General Workplace',
    tone: 'Casual & Gen-Z',
    scenarioContext: 'Proactively proposing lightweight asynchronous communication instead of unnecessary meetings.',
    realMeaning: 'We can solve this quickly in a Slack thread in 5 minutes rather than burning meeting time.',
    proTip: 'Async alignment saves engineering focus time while keeping conversations searchable in Slack.',
    tags: ['Touch Base', 'Async Work', 'Slack', 'Efficiency']
  },
  {
    id: 'dev-done-and-dusted',
    phrase: "The Stripe webhook retry mechanism is done and dusted — unit tests are passing, PR is merged, and verified on staging.",
    role: 'Developer',
    ceremony: 'Daily Standup',
    tone: 'Direct & Technical',
    scenarioContext: 'Announcing the complete, verified completion of a feature ticket with no pending work.',
    realMeaning: 'The task is 100% finished and verified; I am ready to pull the next ticket from the sprint backlog.',
    proTip: 'Using "done and dusted" signifies that definition-of-done criteria are satisfied and QA can sign off.',
    tags: ['Done and Dusted', 'Standup', 'Sprint Goal', 'Definition of Done']
  },
  {
    id: 'lead-move-the-needle',
    phrase: "Moving from client-side rendering to SSR really moved the needle on our Core Web Vitals and organic checkout conversions.",
    role: 'Developer',
    ceremony: 'Sprint Review & Demo',
    tone: 'Executive / Strategic',
    scenarioContext: 'Highlighting measurable business impact during a sprint demo with stakeholders.',
    realMeaning: 'Our technical refactoring led to a substantial, observable improvement in key business metrics.',
    proTip: 'Always link architectural refactors directly to business metrics like conversion rate, latency, or customer retention.',
    tags: ['Move the Needle', 'Sprint Demo', 'Metrics', 'Impact']
  },
  {
    id: 'im-on-the-same-page',
    phrase: "Let's review the updated acceptance criteria in Jira to make sure engineering, QA, and product are all on the same page before sprint kickoff.",
    role: 'Iteration Manager / Scrum Master',
    ceremony: 'Sprint Planning',
    tone: 'Diplomatic',
    scenarioContext: 'Establishing clear, unified expectations across all disciplines during planning.',
    realMeaning: 'Let us confirm that everyone understands the exact deliverables and scope.',
    proTip: 'Verifying shared understanding in refinement prevents costly rework and mid-sprint scope disputes.',
    tags: ['On the Same Page', 'Alignment', 'Acceptance Criteria', 'Planning']
  },
  {
    id: 'bsa-at-the-end-of-day',
    phrase: "While adding multi-tenant custom themes is a nice feature, at the end of the day, reliable data export is the non-negotiable requirement for this enterprise release.",
    role: 'BSA (Business Analyst)',
    ceremony: 'Backlog Refinement',
    tone: 'Executive / Strategic',
    scenarioContext: 'Re-centering feature prioritization around critical core business requirements.',
    realMeaning: 'Ultimately, we must guarantee foundational data capabilities before building cosmetic customizations.',
    proTip: 'Use "at the end of the day" to steer team consensus when competing features are being evaluated.',
    tags: ['At the End of the Day', 'Priorities', 'Backlog Refinement', 'MVP']
  },
  {
    id: 'qa-fall-through-cracks',
    phrase: "Let's automate our mobile Safari viewport regression tests so tablet layout glitches don't fall through the cracks again.",
    role: 'Tester / QA',
    ceremony: 'Sprint Retrospective',
    tone: 'Diplomatic',
    scenarioContext: 'Addressing an edge case defect in retrospective to prevent recurrence.',
    realMeaning: 'Let us add automated tests so this specific edge case is consistently verified in CI/CD.',
    proTip: 'Framing bugs as test automation improvements keeps retrospectives constructive and blameless.',
    tags: ['Fall Through the Cracks', 'QA', 'Retrospective', 'Automation']
  },
  {
    id: 'dev-up-to-speed',
    phrase: "I spent an hour pairing with our new backend engineer to bring them up to speed on our microservices repository structure and local Docker compose setup.",
    role: 'Developer',
    ceremony: 'Daily Standup',
    tone: 'Direct & Technical',
    scenarioContext: 'Sharing onboarding support and knowledge transfer activities in standup.',
    realMeaning: 'I assisted our new team member with codebase walkthrough and local environment setup.',
    proTip: 'Calling out onboarding pairing demonstrates collaborative leadership and helps Scrum Masters track velocity.',
    tags: ['Up to Speed', 'Onboarding', 'Pair Programming', 'Knowledge Transfer']
  },
  {
    id: 'lead-call-it-a-day',
    phrase: "We've resolved the staging memory leak and verified logs are clean; let's call it a day and perform the production rollout tomorrow morning.",
    role: 'Developer',
    ceremony: 'General Workplace',
    tone: 'Diplomatic',
    scenarioContext: 'Concluding work to prevent late-night fatigue and human error during deployments.',
    realMeaning: 'We accomplished today\'s milestones; let us deploy with fresh eyes tomorrow.',
    proTip: 'Avoiding late-night production rollouts drastically reduces deployment errors and post-release incidents.',
    tags: ['Call It a Day', 'Work-Life Balance', 'Deployment', 'Team Sustainability']
  }
];
