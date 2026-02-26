'use client';

import { use, useState, useMemo, Suspense } from 'react';
import Link from 'next/link';
import { useRouter, useSearchParams } from 'next/navigation';
import {
  ArrowBackIcon,
  PlayCircleOutlineIcon,
  ChevronDownIcon,
  ChevronUpIcon,
} from '@/assets/icons';
import { Button, Badge } from '@/components/ui';
import { useCourse } from '@/features/academy/client/hooks/useCourse';
import { useCourseCheckout } from '@/features/academy/client/hooks/useCourseCheckout';
import { QuizCard } from '@/features/academy/client/components';
import { paths } from '@/config/paths';
import type { LessonRecord } from '@/features/academy/types';

function getInstructorName(course: {
  instructor?: { first_name: string | null; last_name: string | null; email: string } | null;
}): string {
  if (!course.instructor) return 'VidyaSetu';
  const first = course.instructor.first_name ?? '';
  const last = course.instructor.last_name ?? '';
  const name = `${first} ${last}`.trim();
  return name || course.instructor.email;
}

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function formatPrice(amountCents: number, currency: string): string {
  const amount = amountCents / 100;
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: currency || 'USD',
  }).format(amount);
}

export default function CourseDetailPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  return (
    <Suspense
      fallback={
        <div className="flex justify-center py-12">
          <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
        </div>
      }
    >
      <CourseDetailContent slug={slug} />
    </Suspense>
  );
}

function CourseDetailContent({ slug }: { slug: string }) {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { data: course, isLoading, isError } = useCourse(slug);
  const { isLoading: isPurchasing, error: purchaseError, handlePurchase } = useCourseCheckout();
  const [collapsedSections, setCollapsedSections] = useState<Set<string>>(new Set());

  const justPurchased = searchParams.get('purchased') === 'true';

  const sections = useMemo(
    () =>
      (course?.sections ?? [])
        .filter((s) => s.is_published)
        .sort((a, b) => a.sort_order - b.sort_order)
        .map((s) => ({
          ...s,
          lessons: (s.lessons ?? [])
            .filter((l) => l.is_published)
            .sort((a, b) => a.sort_order - b.sort_order)
            .map((l) => ({
              ...l,
              topics: (l.topics ?? [])
                .filter((t) => t.is_published)
                .sort((a, b) => a.sort_order - b.sort_order),
            })),
          quizzes: (s.quizzes ?? []).filter((q) => q.is_published),
        })),
    [course?.sections]
  );

  const lessons = useMemo(() => sections.flatMap((s) => s.lessons), [sections]);

  const totalDurationSecs = lessons.reduce((sum, l) => sum + (l.duration ?? 0), 0);

  function toggleSection(sectionId: string): void {
    setCollapsedSections((prev) => {
      const next = new Set(prev);

      if (next.has(sectionId)) {
        next.delete(sectionId);
      } else {
        next.add(sectionId);
      }

      return next;
    });
  }

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (isError || !course) {
    return (
      <div className="flex flex-col items-center gap-(--space-base) py-12">
        <p className="label-1 label-1-medium text-(--color-text-tertiary)">Course not found</p>
        <Link
          href={paths.academy}
          className="label-1 label-1-medium text-(--color-text-brand) hover:underline"
        >
          Back to Academy
        </Link>
      </div>
    );
  }

  const isPaidCourse = course.amount_cents > 0;
  const hasAccess = course.has_access !== false;

  return (
    <div className="flex flex-col gap-(--space-4xl) px-(--space-4xl) py-(--space-2xl)">
      {/* Purchase success banner */}
      {justPurchased && (
        <div className="rounded-(--radius-card) bg-green-50 border border-green-200 px-(--space-lg) py-(--space-base)">
          <p className="label-1 label-1-medium text-green-800">
            Purchase successful! You now have full access to this course.
          </p>
        </div>
      )}

      {/* Purchase error banner */}
      {purchaseError && (
        <div className="rounded-(--radius-card) bg-red-50 border border-red-200 px-(--space-lg) py-(--space-base)">
          <p className="label-1 label-1-medium text-red-800">{purchaseError}</p>
        </div>
      )}

      {/* Back link */}
      <Link
        href={paths.academy}
        className="flex items-center gap-(--space-base) py-(--space-xs) no-underline text-(--color-text-primary) hover:text-(--color-text-secondary) transition-colors w-fit"
      >
        <ArrowBackIcon className="icon-sm" />
        <span className="label-2 label-2-medium">Back to Academy</span>
      </Link>

      {/* Two-column layout */}
      <div className="flex gap-(--space-lg) items-start">
        {/* Left column — course info */}
        <div className="flex flex-1 flex-col gap-[64px]">
          {/* Title + description */}
          <div className="flex flex-col gap-(--space-lg)">
            <h3 className="h3 h3-semibold">{course.product_name}</h3>
            {course.product_description && (
              <p className="label-1 label-1-regular text-(--color-text-secondary)">
                {course.product_description}
              </p>
            )}
          </div>

          {/* Section-grouped lessons */}
          <section className="flex flex-col gap-(--space-base)">
            <h5 className="h5 h5-semibold">Course Content</h5>
            <p className="label-1 label-1-regular text-(--color-text-tertiary)">
              {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
              {totalDurationSecs > 0 && ` \u2022 ${formatDuration(totalDurationSecs)} total`}
            </p>

            <div className="flex flex-col gap-(--space-lg)">
              {sections.map((section) => {
                const isCollapsed = collapsedSections.has(section.id);

                return (
                  <div key={section.id} className="flex flex-col gap-(--space-sm)">
                    {/* Section header */}
                    <button
                      type="button"
                      onClick={() => toggleSection(section.id)}
                      className="flex items-center justify-between w-full py-(--space-sm) px-(--space-base) cursor-pointer bg-transparent border-none transition-colors hover:bg-(--color-bg-secondary)/50 rounded-(--radius-card)"
                    >
                      <div className="flex items-center gap-(--space-sm)">
                        <h6 className="h6 h6-semibold text-(--color-text-primary)">
                          {section.title}
                        </h6>
                        <span className="label-2 label-2-regular text-(--color-text-tertiary)">
                          {section.lessons.length} lesson{section.lessons.length !== 1 ? 's' : ''}
                        </span>
                      </div>
                      {isCollapsed ? (
                        <ChevronDownIcon className="icon-sm text-(--color-text-tertiary)" />
                      ) : (
                        <ChevronUpIcon className="icon-sm text-(--color-text-tertiary)" />
                      )}
                    </button>

                    {/* Lessons */}
                    {!isCollapsed && (
                      <div className="flex flex-col gap-(--space-sm)">
                        {section.lessons.map((lesson) => (
                          <LessonCard key={lesson.id} lesson={lesson} courseSlug={slug} />
                        ))}

                        {/* Quizzes at end of section */}
                        {section.quizzes.map((quiz) => (
                          <QuizCard key={quiz.id} quiz={quiz} courseSlug={slug} />
                        ))}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </section>
        </div>

        {/* Right column — sidebar */}
        <div className="sticky top-(--space-2xl) w-[395px] shrink-0 border border-(--color-bg-tertiary) rounded-(--radius-card) shadow-lg p-(--space-lg) flex flex-col gap-(--space-4xl)">
          {/* Instructor */}
          <div className="flex flex-col gap-(--space-sm)">
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">Instructor</span>
            <p className="label-1 label-1-semibold">{getInstructorName(course)}</p>
          </div>

          {/* Course details */}
          <div className="border-t border-(--color-bg-tertiary) pt-(--space-lg) flex flex-col gap-(--space-sm)">
            <div className="flex items-center gap-(--space-sm)">
              <PlayCircleOutlineIcon className="icon-sm text-(--color-text-tertiary)" />
              <span className="label-1 label-1-regular text-(--color-text-secondary)">
                {lessons.length} lesson{lessons.length !== 1 ? 's' : ''}
              </span>
            </div>

            {/* Price / access */}
            <div className="border-t border-(--color-bg-tertiary) pt-(--space-base) flex flex-col gap-(--space-xs)">
              {isPaidCourse && !hasAccess ? (
                <>
                  <p className="label-1 label-1-semibold text-(--color-text-primary)">
                    {formatPrice(course.amount_cents, course.currency)}
                  </p>
                  <Button
                    variant="default"
                    className="w-full rounded-lg h-9 mt-(--space-sm)"
                    disabled={isPurchasing}
                    onClick={() => handlePurchase(course.id)}
                  >
                    {isPurchasing
                      ? 'Redirecting...'
                      : `Enroll Now — ${formatPrice(course.amount_cents, course.currency)}`}
                  </Button>
                </>
              ) : isPaidCourse && hasAccess ? (
                <>
                  <Badge label="Purchased" variant="success" />
                  {lessons.length > 0 && (
                    <Button
                      variant="default"
                      className="w-full rounded-lg h-9 mt-(--space-sm)"
                      onClick={() => {
                        const first = lessons[0];
                        if (first) router.push(paths.lessonDetail(slug, first.id));
                      }}
                    >
                      Start Course
                    </Button>
                  )}
                </>
              ) : (
                <>
                  <Badge label="Free" variant="success" />
                  {lessons.length > 0 && (
                    <Button
                      variant="default"
                      className="w-full rounded-lg h-9 mt-(--space-sm)"
                      onClick={() => {
                        const first = lessons[0];
                        if (first) router.push(paths.lessonDetail(slug, first.id));
                      }}
                    >
                      Start Course
                    </Button>
                  )}
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

function LessonCard({
  lesson,
  courseSlug,
}: {
  lesson: LessonRecord & { topics: { id: string }[] };
  courseSlug: string;
}) {
  const router = useRouter();
  const topicCount = lesson.topics.length;

  return (
    <div className="rounded-(--radius-card) border border-(--color-bg-tertiary) overflow-hidden">
      <button
        type="button"
        onClick={() => router.push(paths.lessonDetail(courseSlug, lesson.id))}
        className="flex items-center gap-(--space-sm) w-full p-(--space-base) cursor-pointer bg-transparent border-none transition-colors hover:bg-(--color-bg-secondary)/50"
      >
        <div className="flex flex-1 flex-col items-start gap-(--space-xs2)">
          <span className="label-1 label-1-semibold text-(--color-text-primary)">
            {lesson.title}
          </span>
          <div className="flex items-center gap-(--space-sm)">
            <Badge
              label={lesson.lesson_type === 'video' ? 'Video' : 'Text'}
              variant={lesson.lesson_type === 'video' ? 'default' : 'success'}
            />
            {topicCount > 0 && (
              <span className="label-2 label-2-regular text-(--color-text-tertiary)">
                {topicCount} topic{topicCount !== 1 ? 's' : ''}
              </span>
            )}
            {lesson.duration != null && lesson.duration > 0 && (
              <span className="label-2 label-2-regular text-(--color-text-tertiary)">
                {formatDuration(lesson.duration)}
              </span>
            )}
          </div>
        </div>

        <PlayCircleOutlineIcon className="icon-md text-(--color-text-tertiary) shrink-0" />
      </button>
    </div>
  );
}
