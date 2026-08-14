import { Scenario } from '../types';

export const SCENARIOS_DATA: Scenario[] = [
  {
    id: 'standup-sprint-planning',
    type: 'slack',
    title: '#eng-standup-sprint-24',
    subtitle: 'Daily Standup & Capacity Planning Dialogue',
    contextTag: 'Developer Standup & Sprint Planning',
    messages: [
      {
        id: 'msg-1',
        author: 'Alex Rivera',
        role: 'Frontend Engineer',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        timestamp: '09:30 AM',
        content: 'The API downtime is a total blocker for me right now. Once that is resolved, I can resume testing.',
        highlightedTerms: ['blocker', 'downtime']
      },
      {
        id: 'msg-2',
        author: 'Marcus Chen',
        role: 'Tech Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        timestamp: '09:32 AM',
        content: 'We took on a lot of technical debt when we rushed the last release. I need to spend two days refactoring this module.',
        highlightedTerms: ['technical-debt', 'refactoring']
      },
      {
        id: 'msg-3',
        author: 'Sarah Jenkins',
        role: 'Product Lead',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        timestamp: '09:35 AM',
        content: 'Adding a dark mode right now sounds like scope creep. Let\'s focus on getting the happy path working for launch.',
        highlightedTerms: ['scope-creep', 'happy-path']
      },
      {
        id: 'msg-4',
        author: 'Devon Vance',
        role: 'Scrum Master',
        avatar: 'https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=120&q=80',
        timestamp: '09:38 AM',
        content: 'We have over fifty items in our backlog. Let\'s pick out the low-hanging fruit first for quick wins.',
        highlightedTerms: ['backlog', 'low-hanging-fruit']
      }
    ]
  },
  {
    id: 'pr-review-debugging',
    type: 'pr_review',
    title: 'PR #402: Refactor Auth Middleware & Debugging Loop',
    subtitle: 'GitHub Code Review & Debugging Thread',
    contextTag: 'Code Reviews & Debugging',
    messages: [
      {
        id: 'pr-1',
        author: 'Liam Vance',
        role: 'Mid-level Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        timestamp: '2 hours ago',
        content: 'This function is turning into spaghetti code because it handles too many things. It\'s a bit of a code smell.',
        highlightedTerms: ['spaghetti-code', 'code-smell']
      },
      {
        id: 'pr-2',
        author: 'Elena Rostova',
        role: 'Principal Architect',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
        timestamp: '1 hour ago',
        content: 'Can I rubber duck with you for a minute? I\'m dealing with a brutal heisenbug that disappears every time I attach the debugger.',
        highlightedTerms: ['rubber-ducking', 'heisenbug']
      },
      {
        id: 'pr-3',
        author: 'Liam Vance',
        role: 'Mid-level Engineer',
        avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=120&q=80',
        timestamp: '30 mins ago',
        content: 'The database URL is currently hardcoded in the config file. Under the hood, the system expects a static path.',
        highlightedTerms: ['hardcoded', 'under-the-hood']
      },
      {
        id: 'pr-4',
        author: 'Elena Rostova',
        role: 'Principal Architect',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
        timestamp: '10 mins ago',
        content: 'Replace that magic number with an environment variable. We can avoid bikeshedding on quotes and merge now.',
        highlightedTerms: ['magic-numbers', 'bikeshedding']
      }
    ]
  },
  {
    id: 'architecture-review-adr',
    type: 'pr_review',
    title: 'ADR #88: Microservices Migration & Boundary Segregation',
    subtitle: 'Architecture Review & System Design Sync',
    contextTag: 'System Design & Architecture',
    messages: [
      {
        id: 'adr-1',
        author: 'Kenji Sato',
        role: 'Staff Architect',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Yesterday at 2:00 PM',
        content: 'Instead of doing a risky big bang rewrite, let us implement the strangler fig pattern to gradually peel off services.',
        highlightedTerms: ['strangler-fig', 'big-bang-release']
      },
      {
        id: 'adr-2',
        author: 'Elena Rostova',
        role: 'Principal Architect',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Yesterday at 2:15 PM',
        content: 'Remember Conway\'s law: our microservice boundaries must mirror our cross-functional team boundaries to prevent friction.',
        highlightedTerms: ['conways-law', 'paved-road']
      },
      {
        id: 'adr-3',
        author: 'Marcus Chen',
        role: 'Tech Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Yesterday at 2:30 PM',
        content: 'We need to respect Chesterton\'s fence before ripping out the legacy billing handler. That load-bearing code might look ugly, but it handles currency rounding edge cases.',
        highlightedTerms: ['chestertons-fence', 'load-bearing']
      }
    ]
  },
  {
    id: 'slack-incident-ops',
    type: 'slack',
    title: '#incident-outage-payment-gateway',
    subtitle: 'Deployment & Incident Response Channel',
    contextTag: 'Deployment & Operations',
    messages: [
      {
        id: 'ops-1',
        author: 'Priya Sharma',
        role: 'DevOps Lead',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
        timestamp: '10:14 AM',
        content: 'The main branch isn\'t production ready yet, but we need to push an emergency hotfix to payment webhooks.',
        highlightedTerms: ['production-ready', 'hotfix']
      },
      {
        id: 'ops-2',
        author: 'Alex Rivera',
        role: 'SRE On-Call',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        timestamp: '10:16 AM',
        content: 'We\'ve been dogfooding our new chat app internally, and now we are testing it in the wild on canary pods.',
        highlightedTerms: ['dogfooding', 'in-the-wild']
      },
      {
        id: 'ops-3',
        author: 'Marcus Chen',
        role: 'Tech Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        timestamp: '10:18 AM',
        content: 'We are going to sunset the old user portal next month to reduce legacy code overhead.',
        highlightedTerms: ['sunset', 'legacy-code']
      },
      {
        id: 'ops-4',
        author: 'Priya Sharma',
        role: 'DevOps Lead',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
        timestamp: '10:20 AM',
        content: 'Hotfix applied! Smoke tests are green and blast radius was isolated to US-East with a circuit breaker pattern.',
        highlightedTerms: ['smoke-test', 'blast-radius', 'circuit-breaker']
      }
    ]
  },
  {
    id: 'incident-postmortem-rca',
    type: 'slack',
    title: '#postmortem-incident-2024-08',
    subtitle: 'Blameless Post-Mortem & SRE Retrospective',
    contextTag: 'SRE & Root Cause Analysis',
    messages: [
      {
        id: 'pm-1',
        author: 'Priya Sharma',
        role: 'DevOps Lead',
        avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=120&q=80',
        timestamp: '11:00 AM',
        content: 'Welcome everyone. This is a blameless post-mortem focused on system guardrails and failure isolation.',
        highlightedTerms: ['blameless-post-mortem', 'guardrails']
      },
      {
        id: 'pm-2',
        author: 'Alex Rivera',
        role: 'SRE On-Call',
        avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=120&q=80',
        timestamp: '11:05 AM',
        content: 'A flaky test masked a race condition in staging, which allowed a leaky abstraction in our cache layer to breach thresholds.',
        highlightedTerms: ['flaky-test', 'leaky-abstraction']
      },
      {
        id: 'pm-3',
        author: 'Marcus Chen',
        role: 'Tech Lead',
        avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=120&q=80',
        timestamp: '11:10 AM',
        content: 'We need to fail fast and install automated guardrails so developers don\'t have to rely on hero culture during outages.',
        highlightedTerms: ['fail-fast', 'hero-culture']
      }
    ]
  },
  {
    id: 'jira-client-manager-meeting',
    type: 'jira',
    title: 'ENG-1082: Executive Sync & Strategic Alignment',
    subtitle: 'Strategic Management & Client Alignment Sync',
    contextTag: 'Meetings with Managers & Clients',
    messages: [
      {
        id: 'mgr-1',
        author: 'Sarah Jenkins',
        role: 'VP of Product',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Yesterday at 3:30 PM',
        content: 'Ping me on Slack later this afternoon. That\'s a great point about security, but let\'s take it offline to save time.',
        highlightedTerms: ['ping-me', 'take-it-offline']
      },
      {
        id: 'mgr-2',
        author: 'David Kim',
        role: 'Engineering Director',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Yesterday at 4:10 PM',
        content: 'Let\'s not boil the ocean with this release. What can we cut to make sure this is delivered by Friday?',
        highlightedTerms: ['boil-the-ocean']
      },
      {
        id: 'mgr-3',
        author: 'Sarah Jenkins',
        role: 'VP of Product',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Yesterday at 4:25 PM',
        content: 'I don\'t have the bandwidth to review that design right now. Can we circle back tomorrow morning?',
        highlightedTerms: ['bandwidth', 'circle-back']
      }
    ]
  },
  {
    id: 'executive-pitch-roadmap',
    type: 'jira',
    title: 'STRAT-200: Q3 North Star & Executive Roadmap Pitch',
    subtitle: 'Product Strategy & Resource Trade-Offs',
    contextTag: 'Executive Pitch & Strategy',
    messages: [
      {
        id: 'exec-1',
        author: 'Sarah Jenkins',
        role: 'VP of Product',
        avatar: 'https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Today at 10:00 AM',
        content: 'We cannot succumb to the sunk cost fallacy on the legacy platform. Our north star metric is developer activation velocity.',
        highlightedTerms: ['sunk-cost-fallacy', 'north-star-metric']
      },
      {
        id: 'exec-2',
        author: 'David Kim',
        role: 'Engineering Director',
        avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Today at 10:15 AM',
        content: 'Remember the iron triangle: with a fixed date and fixed budget, we must adjust scope rather than ship smoke and mirrors.',
        highlightedTerms: ['iron-triangle', 'smoke-and-mirrors']
      },
      {
        id: 'exec-3',
        author: 'Elena Rostova',
        role: 'Principal Architect',
        avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=120&q=80',
        timestamp: 'Today at 10:30 AM',
        content: 'Let\'s run a one-week spike to validate whether a greenfield rewrite or brownfield modularization yields a faster flywheel effect.',
        highlightedTerms: ['spike-solution', 'greenfield-vs-brownfield', 'flywheel-effect']
      }
    ]
  }
];
