export type WorkflowCategory = 'Coding' | 'Management' | 'Operations' | 'Strategy';

export type SeniorityLevel = 'Junior Dev' | 'Senior Architect' | 'Tech Lead' | 'C-Suite' | 'DevOps Ninja';

export type FormalityRisk = 'Safe for Clients' | 'Internal Team Only' | 'High Risk / Passive Aggressive';

export interface CodeAnalogy {
  language: string;
  snippet: string;
  explanation: string;
}

export interface RealWorldExample {
  context: 'Slack' | 'PR Review' | 'Jira' | 'Email';
  speaker: string;
  quote: string;
  translatedQuote: string;
}

export interface Idiom {
  id: string;
  term: string;
  category: WorkflowCategory;
  seniority: SeniorityLevel;
  phonetic: string;
  literalDefinition: string;
  realMeaning: string;
  corporateTranslation: string; // What boss says vs what dev hears
  codeAnalogy: CodeAnalogy;
  etymology: string;
  formality: FormalityRisk;
  safeAlternative: string;
  tags: string[];
  examples: RealWorldExample[];
  popularityScore: number; // 1-100
}

export type ScenarioType = 'slack' | 'pr_review' | 'jira' | 'retrospective';

export interface ScenarioMessage {
  id: string;
  author: string;
  role: string;
  avatar: string;
  timestamp: string;
  content: string;
  highlightedTerms: string[]; // term ids or words
}

export interface Scenario {
  id: string;
  type: ScenarioType;
  title: string;
  subtitle: string;
  contextTag: string;
  messages: ScenarioMessage[];
}

export interface QuizQuestion {
  id: string;
  scenarioText: string;
  speakerRole: string;
  highlightedTerm: string;
  questionText: string;
  options: {
    text: string;
    isCorrect: boolean;
    explanation: string;
  }[];
  codeAnalogySnippet: string;
}

export interface TranslationResult {
  jargonIndex: number;
  summaryTone: string;
  detectedJargon: {
    term: string;
    literal: string;
    realMeaning: string;
    codeAnalogy: string;
    alternative: string;
  }[];
  plainEnglish: string;
  codeFunctionMapping: string;
  suggestedResponses: {
    directTechnical: string;
    diplomatic: string;
    executiveSummary: string;
  };
}
