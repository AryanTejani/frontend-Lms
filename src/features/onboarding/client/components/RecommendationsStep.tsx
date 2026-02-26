'use client';

import { useState } from 'react';
import { RecommendationTab } from './RecommendationTab';
import { RecommendationCard } from './RecommendationCard';
import { Button } from '@/components/ui';
import { AcademyIcon, VideosIcon, AIIcon } from '@/assets/icons';
type TabId = 'courses' | 'videos' | 'ai';

interface RecommendationsStepProps {
  onComplete: () => void;
}

const DUMMY_COURSES = [
  {
    title: 'Science for Class 5',
    instructor: 'VidyaSetu AI',
    lessonCount: 12,
    duration: '3h 45m',
    description: 'Plants, animals, and how the world works',
    thumbnailSrc: '/images/course-placeholder-1.jpg',
  },
  {
    title: 'Maths Foundations',
    instructor: 'VidyaSetu AI',
    lessonCount: 10,
    duration: '2h 30m',
    description: 'Numbers, fractions, and daily calculations',
    thumbnailSrc: '/images/course-placeholder-2.jpg',
  },
  {
    title: 'Hindi Reading',
    instructor: 'VidyaSetu AI',
    lessonCount: 8,
    duration: '2h 10m',
    description: 'Stories, poems, and comprehension',
    thumbnailSrc: '/images/course-placeholder-3.jpg',
  },
];

const DUMMY_VIDEOS = [
  {
    title: 'Photosynthesis in Tamil',
    instructor: 'VidyaSetu AI',
    lessonCount: 1,
    duration: '15m',
    description: 'How plants make food explained in simple Tamil',
    thumbnailSrc: '/images/course-placeholder-1.jpg',
  },
  {
    title: 'Fractions Made Simple',
    instructor: 'VidyaSetu AI',
    lessonCount: 1,
    duration: '12m',
    description: 'Fractions explained with real-world examples',
    thumbnailSrc: '/images/course-placeholder-2.jpg',
  },
];

const DUMMY_AI = [
  {
    title: 'AI Language Tutor',
    instructor: 'VidyaSetu AI',
    lessonCount: 0,
    duration: 'Interactive',
    description: 'Ask any question in your language, get instant answers',
    thumbnailSrc: '/images/course-placeholder-3.jpg',
  },
];

const TAB_DATA: Record<TabId, typeof DUMMY_COURSES> = {
  courses: DUMMY_COURSES,
  videos: DUMMY_VIDEOS,
  ai: DUMMY_AI,
};

export function RecommendationsStep({ onComplete }: RecommendationsStepProps) {
  const [activeTab, setActiveTab] = useState<TabId>('courses');

  return (
    <div
      className="flex flex-col w-full flex-1 justify-center"
      style={{
        background:
          'linear-gradient(to bottom, rgba(var(--color-primary-rgb), 0.14), rgba(var(--color-primary-rgb), 0.01))',
      }}
    >
      {/* Header */}
      <div className="flex flex-col items-center gap-(--space-base) pt-(--space-xl2) pb-(--space-lg)">
        <div className="w-14 h-14 rounded-full bg-(--color-bg-opaque) flex items-center justify-center">
          <AIIcon className="w-7 h-7 text-(--color-action-primary)" />
        </div>
        <h4 className="h4 h4-semibold text-(--color-text-primary) text-center">
          Recommended For You
        </h4>
      </div>

      {/* Content */}
      <div className="max-w-[896px] w-full mx-auto px-(--space-base) pb-(--space-lg) flex flex-col gap-(--space-lg)">
        {/* Tabs */}
        <div className="flex gap-(--space-xs) bg-(--color-bg-primary) rounded-full w-[585px]">
          <RecommendationTab
            label="Recommended Courses"
            icon={<AcademyIcon className="w-4 h-4" />}
            active={activeTab === 'courses'}
            onClick={() => setActiveTab('courses')}
          />
          <RecommendationTab
            label="Recommended Videos"
            icon={<VideosIcon className="w-4 h-4" />}
            active={activeTab === 'videos'}
            onClick={() => setActiveTab('videos')}
          />
          <RecommendationTab
            label="AI Assistants"
            icon={<AIIcon className="w-4 h-4" />}
            active={activeTab === 'ai'}
            onClick={() => setActiveTab('ai')}
          />
        </div>

        {/* Cards */}
        <div className="flex flex-col gap-(--space-base)">
          {TAB_DATA[activeTab].map((item) => (
            <RecommendationCard
              key={item.title}
              title={item.title}
              instructor={item.instructor}
              lessonCount={item.lessonCount}
              duration={item.duration}
              description={item.description}
              thumbnailSrc={item.thumbnailSrc}
            />
          ))}
        </div>

        {/* CTAs */}
        <div className="flex gap-(--space-base)">
          <Button onClick={onComplete} className="flex-1 rounded-full">
            Explore All Courses
          </Button>
          <Button
            variant="stroke"
            onClick={onComplete}
            className="flex-1 rounded-full border border-(--color-stroke-tertiary)"
          >
            Maybe Later
          </Button>
        </div>
      </div>
    </div>
  );
}
