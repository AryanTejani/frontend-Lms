'use client';

import { use, useMemo, useRef, useEffect, useState } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import {
  ArrowBackIcon,
  ChevronDownIcon,
  ChevronLeftIcon,
  ChevronRightIcon,
  PlayCircleOutlineIcon,
} from '@/assets/icons';
import { Button, Badge } from '@/components/ui';
import { ReadAloudButton } from '@/components/ui/ReadAloudButton';
import { VideoPlayer } from '@/components/ui/VideoPlayer';
import { useCourse } from '@/features/academy/client/hooks/useCourse';
import { useTopic } from '@/features/academy/client/hooks/useTopic';
import { paths } from '@/config/paths';
import { cn, sanitizeHtml } from '@/utils';
import type { TopicRecord } from '@/features/academy/types';

export default function TopicPage({
  params,
}: {
  params: Promise<{ slug: string; lessonId: string; topicId: string }>;
}) {
  const { slug, lessonId, topicId } = use(params);
  const router = useRouter();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);
  const { data: course } = useCourse(slug);
  const { data: topic, isLoading, isError } = useTopic(slug, topicId);

  // Build a flat list of all published topics across sections > lessons
  const allTopics = useMemo(() => {
    const topics: TopicRecord[] = [];

    for (const section of (course?.sections ?? [])
      .filter((s) => s.is_published)
      .sort((a, b) => a.sort_order - b.sort_order)) {
      for (const lesson of (section.lessons ?? [])
        .filter((l) => l.is_published)
        .sort((a, b) => a.sort_order - b.sort_order)) {
        for (const t of (lesson.topics ?? [])
          .filter((t) => t.is_published)
          .sort((a, b) => a.sort_order - b.sort_order)) {
          topics.push(t);
        }
      }
    }

    return topics;
  }, [course?.sections]);

  // Build section > lesson > topic structure for sidebar
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

  const activeLessonId = useMemo(() => {
    for (const section of sections) {
      for (const lesson of section.lessons) {
        if (lesson.topics.some((t) => t.id === topicId)) return lesson.id;
      }
    }
    return null;
  }, [sections, topicId]);

  const topicToLessonMap = useMemo(() => {
    const map = new Map<string, string>();
    for (const section of sections) {
      for (const lesson of section.lessons) {
        for (const t of lesson.topics) {
          map.set(t.id, lesson.id);
        }
      }
    }
    return map;
  }, [sections]);

  const [expandedLessons, setExpandedLessons] = useState<Set<string>>(new Set());

  useEffect(() => {
    if (activeLessonId) {
      setExpandedLessons((prev) => {
        if (prev.has(activeLessonId)) return prev;
        return new Set(prev).add(activeLessonId);
      });
    }
  }, [activeLessonId]);

  const toggleLesson = (lessonId: string) => {
    setExpandedLessons((prev) => {
      const next = new Set(prev);
      if (next.has(lessonId)) next.delete(lessonId);
      else next.add(lessonId);
      return next;
    });
  };

  const activeTopicRef = useRef<HTMLButtonElement>(null);
  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const container = sidebarRef.current;
    const activeEl = activeTopicRef.current;
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
  }, [topicId, isLoading, expandedLessons]);

  const currentIndex = allTopics.findIndex((t) => t.id === topicId);
  const prevTopic = currentIndex > 0 ? allTopics[currentIndex - 1] : null;
  const nextTopic = currentIndex < allTopics.length - 1 ? allTopics[currentIndex + 1] : null;

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (isError || !topic) {
    return (
      <div className="flex flex-col items-center gap-(--space-base) py-12">
        <p className="label-1 label-1-medium text-(--color-text-tertiary)">Topic not found</p>
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
        {topic.embed_url ? (
          <VideoPlayer
            src={topic.embed_url}
            className="w-full overflow-hidden rounded-(--radius-2xl)"
          />
        ) : topic.topic_type === 'video' && topic.video_status === 'processing' ? (
          <div className="flex h-[400px] flex-col items-center justify-center gap-(--space-base) rounded-(--radius-2xl) bg-(--color-bg-secondary)">
            <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
            <p className="label-1 label-1-medium text-(--color-text-tertiary)">
              Video is being processed...
            </p>
          </div>
        ) : topic.topic_type === 'video' && topic.video_status === 'failed' ? (
          <div className="flex h-[400px] items-center justify-center rounded-(--radius-2xl) bg-(--color-bg-secondary)">
            <p className="label-1 label-1-medium text-(--color-text-danger)">
              Video processing failed
            </p>
          </div>
        ) : topic.topic_type === 'video' ? (
          <div className="flex h-[400px] items-center justify-center rounded-(--radius-2xl) bg-(--color-bg-secondary)">
            <p className="label-1 label-1-medium text-(--color-text-tertiary)">
              Video player is not available
            </p>
          </div>
        ) : null}

        {/* Title */}
        <div className="flex flex-col gap-(--space-sm)">
          <h1 className="h4 h4-semibold text-(--color-text-primary)">{topic.title}</h1>
          <div className="flex items-center gap-(--space-sm)">
            <Badge
              label={topic.topic_type === 'video' ? 'Video' : 'Text'}
              variant={topic.topic_type === 'video' ? 'default' : 'success'}
            />
            {topic.content && <ReadAloudButton text={topic.content} />}
          </div>
        </div>

        {/* Text content */}
        {process.env.NODE_ENV === 'development' && topic.content && (
          <details className="rounded bg-yellow-100 p-2 text-xs text-yellow-800">
            <summary>
              Debug: content {topic.content.length} chars → sanitized{' '}
              {sanitizeHtml(topic.content).length} chars
            </summary>
            <div className="mt-2 space-y-2">
              <div>
                <strong>Raw (first 500):</strong>
                <pre className="whitespace-pre-wrap break-all">{topic.content.slice(0, 500)}</pre>
              </div>
              <div>
                <strong>Sanitized (first 500):</strong>
                <pre className="whitespace-pre-wrap break-all">
                  {sanitizeHtml(topic.content).slice(0, 500)}
                </pre>
              </div>
            </div>
          </details>
        )}
        {topic.content &&
          (() => {
            const html = topic.embed_url
              ? topic.content
                  .replace(/<div[^>]*>\s*<iframe[^>]*>[^<]*<\/iframe>\s*<\/div>/gi, '')
                  .replace(/<iframe[^>]*>[^<]*<\/iframe>/gi, '')
              : topic.content;
            const sanitized = sanitizeHtml(html);
            if (!sanitized.trim()) return null;
            return (
              <div
                className="prose prose-sm max-w-none text-(--color-text-secondary)"
                dangerouslySetInnerHTML={{ __html: sanitized }}
              />
            );
          })()}

        {/* Navigation */}
        <div className="flex items-center justify-between border-t border-(--color-stroke-tertiary) pt-(--space-lg)">
          {prevTopic ? (
            <Button
              variant="stroke"
              onClick={() =>
                router.push(
                  paths.topicDetail(
                    slug,
                    topicToLessonMap.get(prevTopic.id) ?? lessonId,
                    prevTopic.id
                  )
                )
              }
              className="rounded-full"
            >
              &larr; Previous Topic
            </Button>
          ) : (
            <div />
          )}
          {nextTopic ? (
            <Button
              variant="default"
              onClick={() =>
                router.push(
                  paths.topicDetail(
                    slug,
                    topicToLessonMap.get(nextTopic.id) ?? lessonId,
                    nextTopic.id
                  )
                )
              }
              className="rounded-full"
            >
              Next Topic &rarr;
            </Button>
          ) : (
            <div />
          )}
        </div>
      </div>

      {/* Sidebar — section > lesson > topic navigation */}
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
                {course?.product_name ?? 'Course'}
              </h6>
              <span className="label-2 label-2-regular text-(--color-text-tertiary)">
                {allTopics.length} topic{allTopics.length !== 1 ? 's' : ''}
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
                {section.lessons.map((lesson) => (
                  <div key={lesson.id}>
                    {/* Lesson sub-header */}
                    <div className="flex items-center justify-between w-full px-(--space-base) py-(--space-xs) border-b border-(--color-bg-tertiary) bg-(--color-action-primary)/5">
                      <button
                        type="button"
                        onClick={() => router.push(paths.lessonDetail(slug, lesson.id))}
                        className="label-2 label-2-medium text-(--color-text-secondary) cursor-pointer hover:text-(--color-text-primary) transition-colors text-left"
                      >
                        {lesson.title}
                      </button>
                      {lesson.topics.length > 0 && (
                        <button
                          type="button"
                          onClick={() => toggleLesson(lesson.id)}
                          className="cursor-pointer p-(--space-xxs) hover:bg-(--color-bg-tertiary) rounded transition-colors"
                        >
                          <ChevronDownIcon
                            className={cn(
                              'icon-sm text-(--color-text-tertiary) transition-transform',
                              !expandedLessons.has(lesson.id) && '-rotate-90'
                            )}
                          />
                        </button>
                      )}
                    </div>
                    {/* Topics */}
                    {expandedLessons.has(lesson.id) &&
                      lesson.topics.map((t) => (
                        <button
                          key={t.id}
                          ref={t.id === topicId ? activeTopicRef : undefined}
                          type="button"
                          onClick={() => router.push(paths.topicDetail(slug, lesson.id, t.id))}
                          className={cn(
                            'flex items-center gap-(--space-sm) w-full px-(--space-base) py-(--space-sm) border-b border-(--color-bg-tertiary) cursor-pointer bg-transparent transition-colors text-left',
                            t.id === topicId
                              ? 'bg-(--color-action-primary)/10'
                              : 'hover:bg-(--color-bg-secondary)/50'
                          )}
                        >
                          <div
                            className={cn(
                              'flex size-[16px] shrink-0 items-center justify-center rounded-full border-2',
                              t.id === topicId
                                ? 'border-(--color-action-primary) bg-(--color-action-primary)'
                                : 'border-(--color-bg-tertiary)'
                            )}
                          />
                          <div className="flex flex-1 flex-col gap-(--space-xs2) min-w-0">
                            <span
                              className={cn(
                                'label-2 label-2-medium truncate',
                                t.id === topicId
                                  ? 'text-(--color-action-primary)'
                                  : 'text-(--color-text-primary)'
                              )}
                            >
                              {t.title}
                            </span>
                          </div>
                          <PlayCircleOutlineIcon className="icon-sm text-(--color-text-tertiary) shrink-0" />
                        </button>
                      ))}
                  </div>
                ))}
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
