export type OnboardingStep =
  | 'welcome'
  | 'language'
  | 'age'
  | 'grade'
  | 'subjects'
  | 'goals'
  | 'summary';

export interface OnboardingData {
  languagePreference: string | null;
  age: number | null;
  grade: string | null;
  subjects: string[];
  learningGoals: string[];
}

export interface LanguageOption {
  code: string;
  title: string;
  nativeName: string;
  subtitle: string;
}

export interface GradeOption {
  title: string;
  subtitle: string;
}

export interface SubjectOption {
  title: string;
  subtitle: string;
}

export interface GoalOption {
  title: string;
  subtitle: string;
}

export const LANGUAGE_OPTIONS: LanguageOption[] = [
  { code: 'en', title: 'English', nativeName: 'English', subtitle: 'Global language of learning' },
  { code: 'hi', title: 'Hindi', nativeName: 'हिंदी', subtitle: "North India's most spoken language" },
  { code: 'ta', title: 'Tamil', nativeName: 'தமிழ்', subtitle: 'Tamil Nadu & Sri Lanka' },
  { code: 'te', title: 'Telugu', nativeName: 'తెలుగు', subtitle: 'Andhra Pradesh & Telangana' },
  { code: 'mr', title: 'Marathi', nativeName: 'मराठी', subtitle: 'Maharashtra' },
  { code: 'kn', title: 'Kannada', nativeName: 'ಕನ್ನಡ', subtitle: 'Karnataka' },
  { code: 'bn', title: 'Bengali', nativeName: 'বাংলা', subtitle: 'West Bengal & Bangladesh' },
];

export const GRADE_OPTIONS: GradeOption[] = [
  { title: 'Class 1-5', subtitle: 'Primary school foundation' },
  { title: 'Class 6-8', subtitle: 'Upper primary school' },
  { title: 'Class 9-10', subtitle: 'Secondary school (Board exams)' },
  { title: 'Class 11-12', subtitle: 'Higher secondary school' },
  { title: 'Undergraduate', subtitle: 'College / University' },
  { title: 'Competitive Exam Prep', subtitle: 'JEE, NEET, UPSC, SSC' },
  { title: 'Lifelong Learner', subtitle: 'Learning for personal growth' },
];

export const SUBJECT_OPTIONS: SubjectOption[] = [
  { title: 'Mathematics', subtitle: 'Numbers, algebra, and problem solving' },
  { title: 'Science', subtitle: 'Physics, chemistry, and biology' },
  { title: 'English', subtitle: 'Reading, writing, and communication' },
  { title: 'Social Studies', subtitle: 'History, geography, and civics' },
  { title: 'Hindi', subtitle: 'Hindi language and literature' },
  { title: 'Computer Science', subtitle: 'Programming and digital literacy' },
];

export const GOAL_OPTIONS: GoalOption[] = [
  { title: 'Pass my exams', subtitle: 'Score well in school/board exams' },
  { title: 'Understand concepts deeply', subtitle: 'Go beyond rote memorization' },
  { title: 'Prepare for competitive exams', subtitle: 'JEE, NEET, UPSC preparation' },
  { title: 'Learn in my language', subtitle: 'Study in my mother tongue' },
  { title: 'Improve English', subtitle: 'Build English communication skills' },
  { title: 'Explore new subjects', subtitle: 'Learn topics outside my curriculum' },
];
