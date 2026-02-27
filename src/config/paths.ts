export const paths = {
  auth: {
    signUp: '/sign-up',
    signIn: '/sign-in',
    forgotPassword: '/forgot-password',
    resetPasswordRequired: '/reset-password-required',
  },
  dashboard: '/dashboard',
  academy: '/academy',
  courseDetail: (slug: string) => `/academy/${slug}` as const,
  assistant: '/assistant',
  videos: '/videos',
  lessonDetail: (courseSlug: string, lessonId: string) =>
    `/academy/${courseSlug}/lessons/${lessonId}` as const,
  topicDetail: (courseSlug: string, lessonId: string, topicId: string) =>
    `/academy/${courseSlug}/lessons/${lessonId}/topics/${topicId}` as const,
  quizDetail: (courseSlug: string, quizId: string) =>
    `/academy/${courseSlug}/quizzes/${quizId}` as const,
  account: '/account',
  onboarding: '/onboarding',
  payment: '/payment',
  paymentSuccess: '/payment/success',
} as const;
