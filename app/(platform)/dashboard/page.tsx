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
  description: 'Your VidyaSetu learning dashboard.',
};

const recommendedCourses = [
  {
    category: 'MATHEMATICS',
    rating: '4.9',
    title: 'Fractions & Decimals',
    author: 'NCERT Class 5',
    description:
      'Learn fractions using real-world examples from daily village life',
    priceLabel: 'Price',
    price: 'Free',
  },
  {
    category: 'SCIENCE',
    rating: '4.9',
    title: 'Plants & Photosynthesis',
    author: 'NCERT Class 5',
    description:
      'Understand how plants make food using local farm examples',
    priceLabel: 'Price',
    price: 'Free',
  },
  {
    category: 'LANGUAGE',
    rating: '4.8',
    title: 'Reading & Comprehension',
    author: 'NCERT Class 4',
    description:
      'Build reading skills in your mother tongue with fun stories',
    priceLabel: 'Price',
    price: 'Free',
  },
];

const mentors = [
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    name: 'Maths Tutor',
    description: 'Arithmetic, fractions, geometry explained in your language',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    name: 'Science Tutor',
    description: 'Biology, physics, chemistry with local farm & village examples',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=200&h=200&fit=crop&crop=face',
    name: 'Language Guide',
    description: 'Hindi, Tamil, Telugu reading & writing skills',
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1519345182560-3f2917c472ef?w=200&h=200&fit=crop&crop=face',
    name: 'Social Studies',
    description: 'History, geography, civics of India and your state',
  },
];

const ongoingCourses = [
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=200&h=200&fit=crop&crop=face',
    heading: 'Plants & Photosynthesis',
    subHeading: 'Science — Class 5',
    currentLesson: 'Lesson 3: How leaves make food',
    totalLessons: '8 lessons',
    percentage: 38,
  },
  {
    avatarUrl:
      'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=200&h=200&fit=crop&crop=face',
    heading: 'Fractions Made Easy',
    subHeading: 'Maths — Class 5',
    currentLesson: 'Lesson 2: Adding fractions',
    totalLessons: '10 lessons',
    percentage: 20,
  },
];

const recentVideos = [
  {
    thumbnailUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    duration: '12:30',
    title: 'Water Cycle Explained in Tamil',
    author: 'VidyaSetu Tutor',
    date: 'Jan 15, 2025',
    accessType: 'free' as const,
  },
  {
    thumbnailUrl:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
    duration: '10:45',
    title: 'Addition & Subtraction in Hindi',
    author: 'VidyaSetu Tutor',
    date: 'Jan 12, 2025',
    accessType: 'free' as const,
  },
  {
    thumbnailUrl:
      'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
    duration: '14:10',
    title: 'Parts of a Plant — Telugu',
    author: 'VidyaSetu Tutor',
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

      {/* AI Tutors */}
      <section className="py-10 lg:pt-[72px] lg:pb-[96px] px-4 md:px-10 lg:px-[120px]">
        <SectionTitle
          title="AI Tutors"
          subtitle="Learn any subject with AI-powered tutors in your language"
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
