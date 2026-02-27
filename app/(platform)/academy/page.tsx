'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { SearchBar } from '@/components/ui';
import { CourseCard } from '@/features/academy/client/components';
import { useCourses } from '@/features/academy/client/hooks/useCourses';
import { useCurrentUser } from '@/features/auth/client/hooks';
import { useLocale } from 'next-intl';
import { LANGUAGE_OPTIONS } from '@/features/onboarding/types';
import { paths } from '@/config/paths';
import { cn } from '@/utils';

const categoryValues = ['Courses', 'Masterclasses', 'Reports'] as const;
type Category = (typeof categoryValues)[number];

const filterValues = ['All', 'Free', 'Paid'] as const;
type PriceFilter = (typeof filterValues)[number];

function getInstructorName(course: {
  instructor?: { first_name: string | null; last_name: string | null; email: string } | null;
}): string {
  if (!course.instructor) return 'VidyaSetu';
  const first = course.instructor.first_name ?? '';
  const last = course.instructor.last_name ?? '';
  const name = `${first} ${last}`.trim();
  return name || course.instructor.email;
}

function getLanguageLabel(code: string): string {
  const lang = LANGUAGE_OPTIONS.find((l) => l.code === code);
  return lang?.title ?? code;
}

export default function AcademyPage() {
  const router = useRouter();
  const t = useTranslations('academy');
  const tc = useTranslations('common');
  const { data: userData } = useCurrentUser();
  const cookieLocale = useLocale();
  const userLang = cookieLocale ?? userData?.user.language_preference ?? 'en';

  const [searchValue, setSearchValue] = useState('');
  const [activeCategory, setActiveCategory] = useState<Category>('Courses');
  const [activeFilter, setActiveFilter] = useState<PriceFilter>('All');
  const [activeLanguage, setActiveLanguage] = useState<string | null>(null);

  const selectedLanguage = activeLanguage ?? userLang;

  const categoryLabels: Record<Category, string> = {
    Courses: t('courses'),
    Masterclasses: t('masterclasses'),
    Reports: t('reports'),
  };

  const filterLabels: Record<PriceFilter, string> = {
    All: t('all'),
    Free: tc('free'),
    Paid: tc('paid'),
  };

  const { data, isLoading } = useCourses(selectedLanguage === 'all' ? undefined : selectedLanguage);

  const courses = data?.data ?? [];

  const filtered = courses.filter((course) => {
    if (searchValue && !course.product_name.toLowerCase().includes(searchValue.toLowerCase())) {
      return false;
    }

    if (activeFilter === 'Free' && course.amount_cents > 0) return false;
    if (activeFilter === 'Paid' && course.amount_cents === 0) return false;
    return true;
  });

  const languagePills = [
    { code: 'all', label: t('allLanguages') },
    { code: userLang, label: getLanguageLabel(userLang) },
    ...LANGUAGE_OPTIONS.filter((l) => l.code !== userLang)
      .map((l) => ({ code: l.code, label: l.title })),
  ];

  return (
    <div className="flex flex-col gap-(--space-4xl) items-center px-(--space-lg) py-(--space-2xl)">
      {/* Hero */}
      <div className="flex flex-col gap-(--space-base) items-center text-center">
        <h3 className="h3 h3-bold">{t('heroTitle')}</h3>
        <p className="label-1 label-1-medium text-(--color-text-secondary)">
          {t('heroSubtitle')}
        </p>
      </div>

      {/* Search */}
      <SearchBar
        value={searchValue}
        onChange={setSearchValue}
        onClear={() => setSearchValue('')}
        placeholder={t('searchPlaceholder')}
        className="max-w-[506px] w-full"
      />

      {/* Language pills */}
      <div className="flex items-center gap-(--space-sm) w-full overflow-x-auto">
        {languagePills.map((lang) => (
          <button
            key={lang.code}
            type="button"
            onClick={() => setActiveLanguage(lang.code)}
            className={cn(
              'h-[32px] px-(--space-base) rounded-full label-2 label-2-medium transition-colors cursor-pointer border-none whitespace-nowrap',
              selectedLanguage === lang.code
                ? 'bg-(--color-action-primary) text-white'
                : 'bg-(--color-bg-secondary) text-(--color-text-secondary) hover:text-(--color-text-primary)'
            )}
          >
            {lang.label}
          </button>
        ))}
      </div>

      {/* Tabs row */}
      <div className="flex items-center justify-between w-full">
        {/* Category pills */}
        <div className="flex items-center gap-(--space-sm)">
          {categoryValues.map((cat) => (
            <button
              key={cat}
              type="button"
              onClick={() => setActiveCategory(cat)}
              className={cn(
                'h-[32px] px-(--space-base) rounded-full label-2 label-2-medium transition-colors cursor-pointer border-none',
                activeCategory === cat
                  ? 'bg-(--color-action-primary) text-white'
                  : 'bg-transparent text-(--color-text-secondary) hover:text-(--color-text-primary)'
              )}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Price filter */}
        <div className="flex items-center bg-(--color-bg-secondary) rounded-full p-(--space-xs2) gap-(--space-xs)">
          {filterValues.map((filter) => (
            <button
              key={filter}
              type="button"
              onClick={() => setActiveFilter(filter)}
              className={cn(
                'h-[28px] px-(--space-base) rounded-full label-2 label-2-medium transition-colors cursor-pointer border-none',
                activeFilter === filter
                  ? 'bg-(--color-bg-primary) text-(--color-text-primary)'
                  : 'bg-transparent text-(--color-text-secondary) hover:text-(--color-text-primary)'
              )}
            >
              {filterLabels[filter]}
            </button>
          ))}
        </div>
      </div>

      {/* Course grid */}
      {isLoading ? (
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        </div>
      ) : filtered.length === 0 ? (
        <div className="flex justify-center py-12">
          <p className="label-1 label-1-medium text-(--color-text-tertiary)">{t('noCoursesFound')}</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-(--space-lg) w-full">
          {filtered.map((course) => (
            <CourseCard
              key={course.id}
              imageUrl={
                course.thumbnail_url ||
                'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop'
              }
              badgeLabel={course.amount_cents > 0 ? tc('paid') : tc('free')}
              title={course.product_name}
              author={getInstructorName(course)}
              description={course.product_description ?? ''}
              price={course.amount_cents > 0 ? tc('paid') : tc('free')}
              onClick={() => router.push(paths.courseDetail(course.product_slug ?? course.id))}
              className="w-full"
            />
          ))}
        </div>
      )}
    </div>
  );
}
