import type { Metadata } from 'next';
import { HeroSection } from '@/components/layout';
import { Badge } from '@/components/ui';
import {
  SectionTitle,
  MentorCard,
  OngoingCard,
  RecommendedCourseCard,
} from '@/features/dashboard/client/components';
import { VideoCard } from '@/features/videos/client/components';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your TraderLion dashboard.',
};

const recommendedCourses = [
  {
    category: 'STAGE ANALYSIS',
    rating: '4.9',
    title: 'Stage Analysis Masterclass',
    author: 'Nate Michaud',
    description:
      'Master market cycles and optimal entry points using proven methodologies and techniques.',
    priceLabel: 'Investment',
    price: '$299',
  },
  {
    category: 'STAGE ANALYSIS',
    rating: '4.9',
    title: 'Advanced Stage Analysis',
    author: 'Alicia Keys',
    description:
      'Unlock the power of market stages to identify high-probability trading opportunities.',
    priceLabel: 'Price',
    price: '$499',
  },
  {
    category: 'MARKET TIMING',
    rating: '4.8',
    title: 'Market Timing Mastery',
    author: 'Artie VanDyke',
    description:
      'Unlock the power of market stages to identify high-probability trading opportunities.',
    priceLabel: 'Price',
    price: '$499',
  },
];

const mentors = [
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    name: "William O'Neil",
    description: 'Learn CAN SLIM methodology and growth investing strategies',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    name: 'Stan Weinstein',
    description: 'Pioneer of Stage Analysis, teaching traders to identify market phases',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    name: 'Mark Minervini',
    description: 'U.S. Investing Champion known for Volatility Contraction Patterns (VCP)',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
    name: 'Linda Raschke',
    description: 'Veteran trader recognized for practical, pattern-based swing strategies',
  },
];

const ongoingCourses = [
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    heading: 'Stage Analysis Masterclass',
    subHeading: 'Mark Minervini',
    currentLesson: 'Stage 3: Markup Phase',
    totalLessons: '24 lessons',
    percentage: 67,
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    heading: 'Technical Analysis Fundamentals',
    subHeading: 'David Ryan',
    currentLesson: 'Stage 3: Markup Phase',
    totalLessons: '24 lessons',
    percentage: 67,
  },
];

const recentVideos = [
  {
    thumbnailUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    duration: '24:30',
    title: 'How to Find Leading Stocks',
    author: 'Mark Minervini',
    date: 'Jan 15, 2025',
    accessType: 'free' as const,
  },
  {
    thumbnailUrl:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
    duration: '18:45',
    title: 'Reading Volume Like a Pro',
    author: 'David Ryan',
    date: 'Jan 12, 2025',
    accessType: 'subscription' as const,
  },
  {
    thumbnailUrl:
      'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
    duration: '32:10',
    title: 'Position Sizing Strategies',
    author: 'Mark Ritchie II',
    date: 'Jan 10, 2025',
    accessType: 'free' as const,
  },
];

export default function DashboardPage() {
  return (
    <div>
      <HeroSection />

      {/* Recommended for You */}
      <section className="bg-(--color-bg-active) py-10 lg:pt-[72px] lg:pb-[96px] px-4 md:px-10 lg:px-[120px]">
        <SectionTitle
          title="Recommended for You"
          titleExtra={<Badge label="AI Powered" className="gap-(--space-xs2)" />}
          subtitle="Based on your interest in Stage Analysis and Options Trading, and recent activity"
          actionLabel="View all"
        />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-(--space-lg) mt-(--space-4xl)">
          {recommendedCourses.map((course) => (
            <RecommendedCourseCard key={course.title} {...course} />
          ))}
        </div>
      </section>

      {/* AI Trading Mentors */}
      <section className="py-10 lg:pt-[72px] lg:pb-[96px] px-4 md:px-10 lg:px-[120px]">
        <SectionTitle
          title="AI Trading Mentors"
          subtitle="Learn from legendary traders with AI-powered mentorship"
          actionLabel="View all"
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--space-2xl) mt-(--space-4xl)">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.name} showButton className="w-full" {...mentor} />
          ))}
        </div>
      </section>

      {/* Continue Learning */}
      <section className="py-10 lg:pt-[96px] lg:pb-[60px] px-4 md:px-10 lg:px-[120px]">
        <SectionTitle title="Continue Learning" actionLabel="View all" />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--space-base) mt-(--space-4xl)">
          {ongoingCourses.map((course) => (
            <OngoingCard key={course.heading} className="w-full" {...course} />
          ))}
        </div>
      </section>

      {/* Recent Videos */}
      <section className="py-10 lg:py-[60px] px-4 md:px-10 lg:px-[120px]">
        <SectionTitle title="Recent Videos" actionLabel="View all" />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-(--space-base) mt-(--space-4xl)">
          {recentVideos.map((video) => (
            <VideoCard key={video.title} className="w-full" {...video} />
          ))}
        </div>
      </section>
    </div>
  );
}
