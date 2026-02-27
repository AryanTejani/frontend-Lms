export type LessonType = 'video' | 'text';

export interface CourseInstructor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
}

export interface LessonVideoInfo {
  id: string;
  bunny_video_id: string;
  title: string;
  thumbnail_url: string | null;
  duration: number;
}

export type TopicType = 'video' | 'text';

export interface TopicRecord {
  id: string;
  lesson_id: string;
  product_id: string;
  section_id: string;
  title: string;
  content: string | null;
  video_id: string | null;
  topic_type: TopicType;
  duration: number | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  video?: LessonVideoInfo | null;
  embed_url?: string;
  video_status?: 'processing' | 'ready' | 'failed';
}

export interface LessonRecord {
  id: string;
  product_id: string;
  section_id: string;
  title: string;
  content: string | null;
  video_id: string | null;
  lesson_type: LessonType;
  duration: number | null;
  section_name: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  video?: LessonVideoInfo | null;
  embed_url?: string;
  video_status?: 'processing' | 'ready' | 'failed';
  topics?: TopicRecord[];
  topic_count?: number;
}

export interface SectionRecord {
  id: string;
  product_id: string;
  title: string;
  description: string | null;
  sort_order: number;
  is_published: boolean;
  created_at: string;
  updated_at: string;
  lessons?: LessonRecord[];
  quizzes?: QuizRecord[];
}

export interface CourseRecord {
  id: string;
  product_name: string;
  product_slug: string | null;
  product_description: string | null;
  thumbnail_url: string | null;
  amount_cents: number;
  currency: string;
  language: string;
  content_type: string;
  instructor_id: string | null;
  is_published: boolean;
  published_at: string | null;
  sort_order: number;
  is_active: boolean;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  has_access?: boolean;
  stripe_price_id?: string | null;
  instructor?: CourseInstructor;
  sections?: SectionRecord[];
  lessons?: LessonRecord[];
  lesson_count?: number;
  quiz_count?: number;
  section_count?: number;
}

export type QuestionType = 'single' | 'multiple';

export interface QuizQuestionOptionRecord {
  id: string;
  question_id: string;
  option_text: string;
  is_correct: boolean;
  sort_order: number;
  created_at: string;
}

export interface QuizQuestionRecord {
  id: string;
  quiz_id: string;
  question_text: string;
  question_type: QuestionType;
  points: number;
  sort_order: number;
  hint: string | null;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  options?: QuizQuestionOptionRecord[];
}

export interface QuizRecord {
  id: string;
  product_id: string;
  title: string;
  description: string | null;
  passing_percentage: number;
  time_limit_seconds: number | null;
  sort_order: number;
  section_name: string | null;
  is_published: boolean;
  metadata: Record<string, unknown>;
  created_at: string;
  updated_at: string;
  questions?: QuizQuestionRecord[];
  question_count?: number;
}

export interface PaginatedCourseResponse {
  data: CourseRecord[];
  total: number;
  page: number;
  limit: number;
}
