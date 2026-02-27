import type { Metadata } from 'next';
import { getTranslations } from 'next-intl/server';
import { HeroSection } from '@/components/layout';
import { Badge } from '@/components/ui';
import {
  SectionTitle,
  MentorCard,
  OngoingCard,
  RecommendedCourseCard,
} from '@/features/dashboard/client/components';
import { VideoCard } from '@/features/videos/client/components';
import { getUser } from '@/features/auth/server/get-user';
import { serverFetch } from '@/lib/fetch.server';
import type { PaginatedCourseResponse, CourseRecord } from '@/features/academy/types';

export const metadata: Metadata = {
  title: 'Dashboard',
  description: 'Your VidyaSetu learning dashboard.',
};

const SUBJECT_CATEGORY_MAP: Record<string, string> = {
  maths: 'MATHEMATICS',
  science: 'SCIENCE',
  language: 'LANGUAGE',
  social: 'SOCIAL STUDIES',
};

function getCategory(course: CourseRecord): string {
  const name = course.product_name.toLowerCase();

  if (name.includes('math') || name.includes('fraction') || name.includes('geometry') || name.includes('गणित') || name.includes('భిన్న') || name.includes('அபூர்ண') || name.includes('ভগ্নাংশ')) {
    return SUBJECT_CATEGORY_MAP.maths ?? 'COURSE';
  }

  if (name.includes('science') || name.includes('plant') || name.includes('water') || name.includes('विज्ञान') || name.includes('పౌధ') || name.includes('தாவர') || name.includes('উদ্ভিদ')) {
    return SUBJECT_CATEGORY_MAP.science ?? 'COURSE';
  }

  if (name.includes('history') || name.includes('geography') || name.includes('इतिहास') || name.includes('చరిత్ర') || name.includes('வரலாறு') || name.includes('ইতিহাস')) {
    return SUBJECT_CATEGORY_MAP.social ?? 'COURSE';
  }

  return SUBJECT_CATEGORY_MAP.language ?? 'COURSE';
}

function getInstructorName(course: CourseRecord): string {
  if (!course.instructor) return 'VidyaSetu';
  const first = course.instructor.first_name ?? '';
  const last = course.instructor.last_name ?? '';
  const name = `${first} ${last}`.trim();
  return name || course.instructor.email;
}

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

type VideoEntry = {
  thumbnailUrl: string;
  duration: string;
  title: string;
  author: string;
  date: string;
  accessType: 'free';
};

const RECENT_VIDEOS: Record<string, VideoEntry[]> = {
  en: [
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      duration: '12:30',
      title: 'Water Cycle Explained',
      author: 'VidyaSetu Tutor',
      date: 'Jan 15, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
      duration: '10:45',
      title: 'Addition & Subtraction — Class 3',
      author: 'VidyaSetu Tutor',
      date: 'Jan 12, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
      duration: '14:10',
      title: 'Parts of a Plant — Science',
      author: 'VidyaSetu Tutor',
      date: 'Jan 10, 2025',
      accessType: 'free',
    },
  ],
  hi: [
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      duration: '12:30',
      title: 'जल चक्र — हिंदी में समझें',
      author: 'VidyaSetu Tutor',
      date: 'Jan 15, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
      duration: '10:45',
      title: 'जोड़ और घटाव — कक्षा 3',
      author: 'VidyaSetu Tutor',
      date: 'Jan 12, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
      duration: '14:10',
      title: 'पौधों के भाग — विज्ञान',
      author: 'VidyaSetu Tutor',
      date: 'Jan 10, 2025',
      accessType: 'free',
    },
  ],
  te: [
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      duration: '12:30',
      title: 'నీటి చక్రం — తెలుగులో అర్థం చేసుకోండి',
      author: 'VidyaSetu Tutor',
      date: 'Jan 15, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
      duration: '10:45',
      title: 'కూడిక మరియు తీసివేత — తరగతి 3',
      author: 'VidyaSetu Tutor',
      date: 'Jan 12, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
      duration: '14:10',
      title: 'మొక్కల భాగాలు — సైన్స్',
      author: 'VidyaSetu Tutor',
      date: 'Jan 10, 2025',
      accessType: 'free',
    },
  ],
  ta: [
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      duration: '12:30',
      title: 'நீர் சுழற்சி — தமிழில் விளக்கம்',
      author: 'VidyaSetu Tutor',
      date: 'Jan 15, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
      duration: '10:45',
      title: 'கூட்டல் மற்றும் கழித்தல் — வகுப்பு 3',
      author: 'VidyaSetu Tutor',
      date: 'Jan 12, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
      duration: '14:10',
      title: 'தாவரத்தின் பாகங்கள் — அறிவியல்',
      author: 'VidyaSetu Tutor',
      date: 'Jan 10, 2025',
      accessType: 'free',
    },
  ],
  mr: [
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      duration: '12:30',
      title: 'जलचक्र — मराठीत समजून घ्या',
      author: 'VidyaSetu Tutor',
      date: 'Jan 15, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
      duration: '10:45',
      title: 'बेरीज आणि वजाबाकी — इयत्ता 3',
      author: 'VidyaSetu Tutor',
      date: 'Jan 12, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
      duration: '14:10',
      title: 'वनस्पतीचे भाग — विज्ञान',
      author: 'VidyaSetu Tutor',
      date: 'Jan 10, 2025',
      accessType: 'free',
    },
  ],
  kn: [
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      duration: '12:30',
      title: 'ನೀರಿನ ಚಕ್ರ — ಕನ್ನಡದಲ್ಲಿ',
      author: 'VidyaSetu Tutor',
      date: 'Jan 15, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
      duration: '10:45',
      title: 'ಸಂಕಲನ ಮತ್ತು ವ್ಯವಕಲನ — ತರಗತಿ 3',
      author: 'VidyaSetu Tutor',
      date: 'Jan 12, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
      duration: '14:10',
      title: 'ಸಸ್ಯದ ಭಾಗಗಳು — ವಿಜ್ಞಾನ',
      author: 'VidyaSetu Tutor',
      date: 'Jan 10, 2025',
      accessType: 'free',
    },
  ],
  bn: [
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      duration: '12:30',
      title: 'জলচক্র — বাংলায় বোঝা যাক',
      author: 'VidyaSetu Tutor',
      date: 'Jan 15, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
      duration: '10:45',
      title: 'যোগ ও বিয়োগ — শ্রেণি ৩',
      author: 'VidyaSetu Tutor',
      date: 'Jan 12, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
      duration: '14:10',
      title: 'উদ্ভিদের অংশ — বিজ্ঞান',
      author: 'VidyaSetu Tutor',
      date: 'Jan 10, 2025',
      accessType: 'free',
    },
  ],
  gu: [
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
      duration: '12:30',
      title: 'જળચક્ર — ગુજરાતીમાં સમજો',
      author: 'VidyaSetu Tutor',
      date: 'Jan 15, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
      duration: '10:45',
      title: 'સરવાળો અને બાદબાકી — ધોરણ 3',
      author: 'VidyaSetu Tutor',
      date: 'Jan 12, 2025',
      accessType: 'free',
    },
    {
      thumbnailUrl: 'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
      duration: '14:10',
      title: 'છોડના ભાગો — વિજ્ઞાન',
      author: 'VidyaSetu Tutor',
      date: 'Jan 10, 2025',
      accessType: 'free',
    },
  ],
};

export default async function DashboardPage() {
  const t = await getTranslations('dashboard');
  const tc = await getTranslations('common');
  const user = await getUser();
  const language = user?.language_preference ?? 'en';
  // eslint-disable-next-line @typescript-eslint/no-non-null-assertion -- en is always defined above
  const recentVideos = RECENT_VIDEOS[language] ?? RECENT_VIDEOS.en!;

  let recommendedCourses: {
    category: string;
    rating: string;
    title: string;
    author: string;
    description: string;
    price: string;
  }[] = [];

  try {
    const coursesData = await serverFetch<PaginatedCourseResponse>(
      `/courses?language=${encodeURIComponent(language)}`,
      { revalidate: 60 }
    );

    recommendedCourses = coursesData.data.slice(0, 3).map((course) => ({
      category: getCategory(course),
      rating: '4.9',
      title: course.product_name,
      author: getInstructorName(course),
      description: course.product_description ?? '',
      price: course.amount_cents > 0 ? `₹${course.amount_cents / 100}` : tc('free'),
    }));
  } catch {
    // Show empty if API is unavailable
  }

  return (
    <div>
      <HeroSection />

      {/* Recommended for You */}
      <section className="bg-(--color-bg-active) py-10 lg:pt-[72px] lg:pb-[96px] px-4 md:px-10 lg:px-[120px]">
        <SectionTitle
          title={t('recommendedForYou')}
          titleExtra={<Badge label={t('aiPowered')} className="gap-(--space-xs2)" />}
          subtitle={t('recommendedSubtitle')}
          actionLabel={tc('viewAll')}
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
          title={t('aiTutors')}
          subtitle={t('aiTutorsSubtitle')}
          actionLabel={tc('viewAll')}
        />
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--space-2xl) mt-(--space-4xl)">
          {mentors.map((mentor) => (
            <MentorCard key={mentor.name} showButton className="w-full" {...mentor} />
          ))}
        </div>
      </section>

      {/* Continue Learning */}
      <section className="py-10 lg:pt-[96px] lg:pb-[60px] px-4 md:px-10 lg:px-[120px]">
        <SectionTitle title={t('continueLearning')} actionLabel={tc('viewAll')} />
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-(--space-base) mt-(--space-4xl)">
          {ongoingCourses.map((course) => (
            <OngoingCard key={course.heading} className="w-full" {...course} />
          ))}
        </div>
      </section>

      {/* Recent Videos */}
      <section className="py-10 lg:py-[60px] px-4 md:px-10 lg:px-[120px]">
        <SectionTitle title={t('recentVideos')} actionLabel={tc('viewAll')} />
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-(--space-base) mt-(--space-4xl)">
          {recentVideos.map((video) => (
            <VideoCard key={video.title} className="w-full" {...video} />
          ))}
        </div>
      </section>
    </div>
  );
}
