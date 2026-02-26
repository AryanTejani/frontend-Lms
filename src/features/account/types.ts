export interface UserProfile {
  fullName: string;
  username: string;
  avatarUrl?: string;
}

export interface Subscription {
  planName: string;
  description: string;
  billingCycle: string;
  nextBillingDate: string;
  amount: string;
  status: 'active' | 'cancelled' | 'past_due';
}

export interface EnrolledCourse {
  id: string;
  title: string;
  completedLessons: number;
  totalLessons: number;
  percentComplete: number;
}
