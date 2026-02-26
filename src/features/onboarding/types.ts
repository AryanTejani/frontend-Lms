export type OnboardingStep =
  | 'welcome'
  | 'experience'
  | 'goals'
  | 'style'
  | 'time'
  | 'summary'
  | 'recommendations';

export interface OnboardingData {
  experienceLevel: string | null;
  learningGoals: string[];
  tradingStyle: string | null;
  timeCommitment: string | null;
}

export interface ExperienceOption {
  title: string;
  subtitle: string;
}

export interface GoalOption {
  title: string;
  subtitle: string;
}

export interface StyleOption {
  title: string;
  subtitle: string;
}

export interface TimeOption {
  title: string;
  subtitle: string;
}

export const EXPERIENCE_OPTIONS: ExperienceOption[] = [
  { title: 'Beginner', subtitle: 'New to trading or less than 1 year' },
  { title: 'Intermediate', subtitle: '1-3 years of trading experience' },
  { title: 'Advanced', subtitle: '3+ years of active trading' },
];

export const GOAL_OPTIONS: GoalOption[] = [
  { title: 'Learn Technical Analysis', subtitle: 'Chart patterns & indicators' },
  { title: 'Build a Trading System', subtitle: 'Rules-based approach' },
  { title: 'Risk Management', subtitle: 'Protect your capital' },
  { title: 'Find Winning Stocks', subtitle: 'Stock screening & selection' },
  { title: 'Improve Consistency', subtitle: 'Develop discipline & routine' },
  { title: 'Grow My Portfolio', subtitle: 'Long-term wealth building' },
];

export const STYLE_OPTIONS: StyleOption[] = [
  { title: 'Day Trading', subtitle: 'Open & close positions within the same day' },
  { title: 'Swing Trading', subtitle: 'Hold positions for days to weeks' },
  { title: 'Position Trading', subtitle: 'Hold positions for weeks to months' },
];

export const TIME_OPTIONS: TimeOption[] = [
  { title: '1-2 hours/week', subtitle: 'Light commitment, self-paced learning' },
  { title: '3-5 hours/week', subtitle: 'Moderate commitment, steady progress' },
  { title: '6-10 hours/week', subtitle: 'Dedicated learner, accelerated growth' },
];
