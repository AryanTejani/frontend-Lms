import type { UserProfile, Subscription, EnrolledCourse } from './types';

export const mockProfile: UserProfile = {
  fullName: 'Sarah Johnson',
  username: 'sarahjohnson',
  avatarUrl: undefined,
};

export const mockSubscription: Subscription = {
  planName: 'Pro Plan',
  description: 'Full access to all courses and features',
  billingCycle: 'Monthly',
  nextBillingDate: 'January 15, 2025',
  amount: '₹99/month',
  status: 'active',
};

export const mockCourses: EnrolledCourse[] = [
  {
    id: '1',
    title: 'Stage Analysis Masterclass',
    completedLessons: 16,
    totalLessons: 24,
    percentComplete: 67,
  },
  {
    id: '2',
    title: 'Swing Trading Psychology',
    completedLessons: 6,
    totalLessons: 18,
    percentComplete: 34,
  },
  {
    id: '3',
    title: 'Technical Analysis Foundations',
    completedLessons: 20,
    totalLessons: 20,
    percentComplete: 100,
  },
];
