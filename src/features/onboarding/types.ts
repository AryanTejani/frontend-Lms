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
  { title: 'Hindi (हिंदी)', subtitle: "North India's most spoken language" },
  { title: 'Tamil (தமிழ்)', subtitle: 'Tamil Nadu & Sri Lanka' },
  { title: 'Telugu (తెలుగు)', subtitle: 'Andhra Pradesh & Telangana' },
  { title: 'Marathi (मराठी)', subtitle: 'Maharashtra' },
  { title: 'Kannada (ಕನ್ನಡ)', subtitle: 'Karnataka' },
  { title: 'Bengali (বাংলা)', subtitle: 'West Bengal & Bangladesh' },
];

export const GOAL_OPTIONS: GoalOption[] = [
  { title: 'Mathematics', subtitle: 'Numbers, shapes, and problem solving' },
  { title: 'Science', subtitle: 'Plants, animals, physics, and chemistry' },
  { title: 'English', subtitle: 'Reading, writing, and communication' },
  { title: 'Social Studies', subtitle: 'History, geography, and civics' },
];

export const STYLE_OPTIONS: StyleOption[] = [
  { title: 'Class 1-2', subtitle: 'Early learning foundation' },
  { title: 'Class 3-5', subtitle: 'Primary school' },
  { title: 'Class 6-8', subtitle: 'Upper primary school' },
];

export const TIME_OPTIONS: TimeOption[] = [
  { title: '1-2 hours/week', subtitle: 'Light commitment, self-paced learning' },
  { title: '3-5 hours/week', subtitle: 'Moderate commitment, steady progress' },
  { title: '6-10 hours/week', subtitle: 'Dedicated learner, accelerated growth' },
];
