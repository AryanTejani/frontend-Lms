import api from '@/lib/fetch.client';
import type {
  PaginatedCourseResponse,
  CourseRecord,
  LessonRecord,
  TopicRecord,
  QuizRecord,
} from '../types';

export async function fetchCourses(language?: string): Promise<PaginatedCourseResponse> {
  const params = language ? { language } : undefined;
  const response = await api.get<PaginatedCourseResponse>('/courses', { params });
  return response.data;
}

export async function fetchCourse(slug: string): Promise<CourseRecord> {
  const response = await api.get<CourseRecord>(`/courses/${slug}`);
  return response.data;
}

export async function fetchLesson(courseSlug: string, lessonId: string): Promise<LessonRecord> {
  const response = await api.get<LessonRecord>(`/courses/${courseSlug}/lessons/${lessonId}`);
  return response.data;
}

export async function fetchTopic(courseSlug: string, topicId: string): Promise<TopicRecord> {
  const response = await api.get<TopicRecord>(`/courses/${courseSlug}/topics/${topicId}`);
  return response.data;
}

export async function fetchQuizzes(courseSlug: string): Promise<QuizRecord[]> {
  const response = await api.get<QuizRecord[]>(`/courses/${courseSlug}/quizzes`);
  return response.data;
}

export async function fetchQuiz(courseSlug: string, quizId: string): Promise<QuizRecord> {
  const response = await api.get<QuizRecord>(`/courses/${courseSlug}/quizzes/${quizId}`);
  return response.data;
}

export async function createCourseCheckoutSession(
  productId: string,
  promotionCode?: string
): Promise<{ checkout_url: string }> {
  const response = await api.post<{ checkout_url: string }>('/checkout/course-session', {
    product_id: productId,
    ...(promotionCode !== undefined && { promotion_code: promotionCode }),
  });
  return response.data;
}
