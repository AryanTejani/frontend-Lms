'use client';

import { use, useEffect, useMemo, useRef, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { ArrowBackIcon, ChevronDownIcon, ChevronLeftIcon, ChevronRightIcon } from '@/assets/icons';
import { Button, Badge } from '@/components/ui';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { useCourse } from '@/features/academy/client/hooks/useCourse';
import { useLesson } from '@/features/academy/client/hooks/useLesson';
import { paths } from '@/config/paths';
import { cn, sanitizeHtml } from '@/utils';

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

export default function LessonPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string }>;
}) {
  const { slug, lessonId } = use(params);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: course } = useCourse(slug);
  const { data: lesson, isLoading, isError } = useLesson(slug, lessonId);

  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(() => new Set([lessonId]));

  const activeLessonRef = useRef<HTMLDivElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sidebarRef.current;
    const activeEl = activeLessonRef.current;
    if (!container || !activeEl) return;

    const containerRect = container.getBoundingClientRect();
    const activeRect = activeEl.getBoundingClientRect();
    const relativeTop = activeRect.top - containerRect.top;
    const relativeBottom = relativeTop + activeRect.height;

    if (relativeTop < 0) {
      container.scrollTop += relativeTop;
    } else if (relativeBottom > container.clientHeight) {
      container.scrollTop += relativeBottom - container.clientHeight;
    }
  }, [lessonId, isLoading]);

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
        })),
    [course?.sections]
  );

  const lessons = useMemo(() => sections.flatMap((s) => s.lessons), [sections]);

  const currentLessonTopics = useMemo(() => {
    for (const section of sections) {
      for (const l of section.lessons) {
        if (l.id === lessonId) return l.topics;
      }
    }
    return [];
  }, [sections, lessonId]);

  const currentIndex = lessons.findIndex((l) => l.id === lessonId);
  const prevLesson = currentIndex > 0 ? lessons[currentIndex - 1] : null;
  const nextLesson = currentIndex < lessons.length - 1 ? lessons[currentIndex + 1] : null;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (isError || !lesson) {
    return (
      <div className="flex flex-col items-center gap-(--space-base) py-12">
        <p className="label-1 label-1-medium text-(--color-text-tertiary)">Lesson not found</p>
        <Link
          href={paths.courseDetail(slug)}
          className="label-1 label-1-medium text-(--color-text-brand) hover:underline"
        >
          Back to Course
        </Link>
      </div>
    );
  }

  return (
    <div className="relative flex gap-(--space-lg) px-(--space-lg) py-(--space-2xl)">
      {/* Expand sidebar button (visible when collapsed) */}
      {!isSidebarOpen && (
        <button
          type="button"
          onClick={() => setIsSidebarOpen(true)}
          className="absolute right-4 top-4 z-10 flex items-center justify-center size-8 rounded-full bg-(--color-bg-primary) border border-(--color-stroke-tertiary) cursor-pointer shadow-sm"
          aria-label="Expand sidebar"
        >
          <ChevronLeftIcon className="icon-sm text-(--color-text-primary)" />
        </button>
      )}

      {/* Main content */}
      <div className="flex flex-1 flex-col gap-(--space-2xl)">
        {/* Back link */}
        <Link
          href={paths.courseDetail(slug)}
          className="flex items-center gap-(--space-base) py-(--space-xs) no-underline text-(--color-text-primary) hover:text-(--color-text-secondary) transition-colors w-fit"
        >
          <ArrowBackIcon className="icon-sm" />
          <span className="label-2 label-2-medium">Back to {course?.product_name ?? 'Course'}</span>
        </Link>

        {/* Video or text content */}
        {lesson.embed_url ? (
          <VideoPlayer
            src={lesson.embed_url}
            className="w-full overflow-hidden rounded-(--radius-2xl)"
          />
        ) : lesson.lesson_type === 'video' && lesson.video_status === 'processing' ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-(--space-base) rounded-(--radius-2xl) bg-(--color-bg-secondary)">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="label-1 label-1-medium text-(--color-text-tertiary)">
              Video is being processed...
            </p>
          </div>
        ) : lesson.lesson_type === 'video' && lesson.video_status === 'failed' ? (
          <div className="flex h-[400px] items-center justify-center rounded-(--radius-2xl) bg-(--color-bg-secondary)">
            <p className="label-1 label-1-medium text-(--color-text-danger)">
              Video processing failed
            </p>
          </div>
        ) : lesson.lesson_type === 'video' ? (
          <div className="flex h-[400px] items-center justify-center rounded-(--radius-2xl) bg-(--color-bg-secondary)">
            <p className="label-1 label-1-medium text-(--color-text-tertiary)">
              Video player is not available
            </p>
          </div>
        ) : null}

        {/* Title */}
        <div className="flex flex-col gap-(--space-sm)">
          <h1 className="h4 h4-semibold text-(--color-text-primary)">{lesson.title}</h1>
          <Badge
            label={lesson.lesson_type === 'video' ? 'Video' : 'Text'}
            variant={lesson.lesson_type === 'video' ? 'default' : 'success'}
          />
        </div>

        {/* Text content */}
        {lesson.content &&
          (() => {
            const html = lesson.embed_url
              ? lesson.content
                  .replace(/<div[^>]*>\s*<iframe[^>]*>[^<]*<\/iframe>\s*<\/div>/gi, '')
                  .replace(/<iframe[^>]*>[^<]*<\/iframe>/gi, '')
              : lesson.content;
            const sanitized = sanitizeHtml(html);
            if (!sanitized.trim()) return null;
            return (
              <div
                className="prose prose-sm max-w-none text-(--color-text-secondary)"
                dangerouslySetInnerHTML={{ __html: sanitized }}
              />
            );
          })()}

        {/* Topic list */}
        {currentLessonTopics.length > 0 && (
          <div className="flex flex-col gap-(--space-base)">
            <h5 className="h5 h5-semibold text-(--color-text-primary)">Lesson Content</h5>
            <div className="flex flex-col rounded-(--radius-card) border border-(--color-bg-tertiary) overflow-hidden">
              {currentLessonTopics.map((topic) => (
                <button
                  key={topic.id}
                  type="button"
                  onClick={() => router.push(paths.topicDetail(slug, lessonId, topic.id))}
                  className="flex items-center gap-(--space-sm) w-full px-(--space-lg) py-(--space-sm) cursor-pointer bg-transparent border-b border-(--color-bg-tertiary) last:border-b-0 transition-colors hover:bg-(--color-bg-secondary)/50 text-left"
                >
                  <div className="flex size-[20px] shrink-0 items-center justify-center rounded-full border-2 border-(--color-bg-tertiary)" />
                  <span className="label-2 label-2-medium text-(--color-text-primary) flex-1">
                    {topic.title}
                  </span>
                  <Badge
                    label={topic.topic_type === 'video' ? 'Video' : 'Text'}
                    variant={topic.topic_type === 'video' ? 'default' : 'success'}
                  />
                  {topic.duration != null && topic.duration > 0 && (
                    <span className="label-3 label-3-regular text-(--color-text-tertiary) shrink-0">
                      {formatDuration(topic.duration)}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-(--color-stroke-tertiary) pt-(--space-lg)">
          {prevLesson ? (
            <Button
              variant="stroke"
              onClick={() => router.push(paths.lessonDetail(slug, prevLesson.id))}
              className="rounded-full"
            >
              &larr; Previous Lesson
            </Button>
          ) : (
            <div />
          )}
          {nextLesson ? (
            <Button
              variant="default"
              onClick={() => router.push(paths.lessonDetail(slug, nextLesson.id))}
              className="rounded-full"
            >
              Next Lesson &rarr;
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Sidebar — lesson list */}
      <div
        className={cn(
          'shrink-0 transition-all duration-300 overflow-hidden',
          isSidebarOpen ? 'w-[320px]' : 'w-0'
        )}
      >
        <div className="sticky top-(--space-2xl) w-[320px] border border-(--color-bg-tertiary) rounded-(--radius-card) overflow-hidden">
          <div className="flex items-center justify-between p-(--space-base) border-b border-(--color-bg-tertiary)">
            <div>
              <h6 className="h6 h6-semibold text-(--color-text-primary)">
                {course?.product_name ?? 'Lessons'}
              </h6>
              <span className="label-2 label-2-regular text-(--color-text-tertiary)">
                {lessons.length} lessons
              </span>
            </div>
            <button
              type="button"
              onClick={() => setIsSidebarOpen(false)}
              className="flex items-center justify-center size-6 rounded-full bg-(--color-bg-secondary) cursor-pointer"
              aria-label="Collapse sidebar"
            >
              <ChevronRightIcon className="icon-sm text-(--color-text-primary)" />
            </button>
          </div>
          <div ref={sidebarRef} className="max-h-[600px] overflow-y-auto">
            {sections.map((section) => (
              <div key={section.id}>
                <div className="px-(--space-base) py-(--space-xs) border-b border-(--color-bg-tertiary) bg-(--color-bg-secondary)/30">
                  <span className="label-3 label-3-semibold text-(--color-text-tertiary) uppercase tracking-wide">
                    {section.title}
                  </span>
                </div>
                {section.lessons.map((l) => {
                  const isActive = l.id === lessonId;
                  const hasTopics = l.topics.length > 0;
                  const isExpanded = expandedLessons.has(l.id);

                  return (
                    <div key={l.id} ref={isActive ? activeLessonRef : undefined}>
                      <div
                        className={cn(
                          'flex items-center gap-(--space-sm) w-full px-(--space-base) py-(--space-sm) border-b border-(--color-bg-tertiary) transition-colors',
                          isActive
                            ? 'bg-(--color-action-primary)/10'
                            : 'hover:bg-(--color-bg-secondary)/50'
                        )}
                      >
                        <button
                          type="button"
                          onClick={() => router.push(paths.lessonDetail(slug, l.id))}
                          className="flex flex-1 flex-col gap-(--space-xs2) min-w-0 bg-transparent cursor-pointer text-left"
                        >
                          <span
                            className={cn(
                              'label-2 label-2-medium truncate',
                              isActive
                                ? 'text-(--color-action-primary)'
                                : 'text-(--color-text-primary)'
                            )}
                          >
                            {l.title}
                          </span>
                        </button>
                        {hasTopics ? (
                          <button
                            type="button"
                            onClick={() =>
                              setExpandedLessons((prev) => {
                                const next = new Set(prev);
                                if (next.has(l.id)) next.delete(l.id);
                                else next.add(l.id);
                                return next;
                              })
                            }
                            className="shrink-0 bg-transparent cursor-pointer p-0"
                          >
                            <ChevronDownIcon
                              className={cn(
                                'icon-sm text-(--color-text-tertiary) transition-transform',
                                !isExpanded && '-rotate-90'
                              )}
                            />
                          </button>
                        ) : null}
                      </div>
                      {/* Topics under expanded lesson */}
                      {hasTopics &&
                        isExpanded &&
                        l.topics.map((t) => (
                          <button
                            key={t.id}
                            type="button"
                            onClick={() => router.push(paths.topicDetail(slug, l.id, t.id))}
                            className="flex items-center gap-(--space-sm) w-full pl-(--space-2xl) pr-(--space-base) py-(--space-xs) border-b border-(--color-bg-tertiary) cursor-pointer bg-transparent transition-colors text-left hover:bg-(--color-bg-secondary)/50"
                          >
                            <div className="flex size-[14px] shrink-0 items-center justify-center rounded-full border-2 border-(--color-bg-tertiary)" />
                            <span className="label-3 label-3-medium text-(--color-text-secondary) truncate flex-1">
                              {t.title}
                            </span>
                          </button>
                        ))}
                    </div>
                  );
                })}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
