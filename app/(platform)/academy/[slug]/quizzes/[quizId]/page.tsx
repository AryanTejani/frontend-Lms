'use client';

import { use } from 'react';
import Link from 'next/link';
import { ArrowBackIcon, WarningIcon, HelpCircleIcon } from '@/assets/icons';
import { Badge } from '@/components/ui';
import { useCourse } from '@/features/academy/client/hooks/useCourse';
import { useQuiz } from '@/features/academy/client/hooks/useQuiz';
import { paths } from '@/config/paths';

function formatTimeLimit(seconds: number): string {
  const mins = Math.floor(seconds / 60);

  if (mins >= 60) {
    const hrs = Math.floor(mins / 60);
    const remainMins = mins % 60;
    return remainMins > 0 ? `${hrs}h ${remainMins}m` : `${hrs}h`;
  }

  return `${mins} min`;
}

export default function QuizDetailPage({
  params,
}: {
  params: Promise<{ slug: string; quizId: string }>;
}) {
  const { slug, quizId } = use(params);
  const { data: course } = useCourse(slug);
  const { data: quiz, isLoading, isError } = useQuiz(slug, quizId);

  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (isError || !quiz) {
    return (
      <div className="flex flex-col items-center gap-(--space-base) py-12">
        <p className="label-1 label-1-medium text-(--color-text-tertiary)">Quiz not found</p>
        <Link
          href={paths.courseDetail(slug)}
          className="label-1 label-1-medium text-(--color-text-brand) hover:underline"
        >
          Back to Course
        </Link>
      </div>
    );
  }

  const questions = quiz.questions ?? [];
  const totalPoints = questions.reduce((sum, q) => sum + q.points, 0);

  return (
    <div className="flex flex-col gap-(--space-2xl) px-(--space-4xl) py-(--space-2xl) max-w-[900px]">
      {/* Back link */}
      <Link
        href={paths.courseDetail(slug)}
        className="flex items-center gap-(--space-base) py-(--space-xs) no-underline text-(--color-text-primary) hover:text-(--color-text-secondary) transition-colors w-fit"
      >
        <ArrowBackIcon className="icon-sm" />
        <span className="label-2 label-2-medium">Back to {course?.product_name ?? 'Course'}</span>
      </Link>

      {/* Quiz header */}
      <div className="flex flex-col gap-(--space-base)">
        <div className="flex items-center gap-(--space-sm)">
          <h3 className="h3 h3-semibold">{quiz.title}</h3>
          <Badge label="Quiz" variant="success" />
        </div>

        {quiz.description && (
          <p className="label-1 label-1-regular text-(--color-text-secondary)">
            {quiz.description}
          </p>
        )}

        {/* Quiz meta */}
        <div className="flex items-center gap-(--space-lg) flex-wrap">
          {questions.length > 0 && (
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">
              {questions.length} question{questions.length !== 1 ? 's' : ''}
            </span>
          )}
          {totalPoints > 0 && (
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">
              {totalPoints} point{totalPoints !== 1 ? 's' : ''}
            </span>
          )}
          <span className="label-2 label-2-regular text-(--color-text-tertiary)">
            {quiz.passing_percentage}% to pass
          </span>
          {quiz.time_limit_seconds != null && quiz.time_limit_seconds > 0 && (
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">
              {formatTimeLimit(quiz.time_limit_seconds)} time limit
            </span>
          )}
        </div>
      </div>

      {/* Info banner */}
      <div className="flex items-center gap-(--space-sm) rounded-(--radius-card) border border-(--color-stroke-tertiary) bg-(--color-bg-secondary)/50 p-(--space-base)">
        <WarningIcon className="icon-md text-(--color-text-tertiary) shrink-0" />
        <p className="label-1 label-1-regular text-(--color-text-secondary)">
          Answer options are not yet available. Questions are shown for review only.
        </p>
      </div>

      {/* Questions list */}
      {questions.length > 0 && (
        <div className="flex flex-col gap-(--space-sm)">
          <h5 className="h5 h5-semibold">Questions</h5>

          {questions.map((question, idx) => (
            <div
              key={question.id}
              className="flex gap-(--space-sm) rounded-(--radius-card) border border-(--color-bg-tertiary) p-(--space-base)"
            >
              {/* Question number */}
              <div className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-(--color-text-success)/15">
                <span className="label-2 label-2-semibold text-(--color-text-success)">
                  {idx + 1}
                </span>
              </div>

              {/* Question content */}
              <div className="flex flex-1 flex-col gap-(--space-xs)">
                <p className="label-1 label-1-medium text-(--color-text-primary)">
                  {question.question_text}
                </p>

                <div className="flex items-center gap-(--space-sm)">
                  <Badge
                    label={
                      question.question_type === 'multiple' ? 'Multiple Choice' : 'Single Choice'
                    }
                    variant="neutral"
                  />
                  {question.points > 0 && (
                    <span className="label-2 label-2-regular text-(--color-text-tertiary)">
                      {question.points} pt{question.points !== 1 ? 's' : ''}
                    </span>
                  )}
                </div>

                {question.hint && (
                  <div className="flex items-start gap-(--space-xs) mt-(--space-xs)">
                    <HelpCircleIcon className="icon-sm text-(--color-text-tertiary) shrink-0 mt-0.5" />
                    <span className="label-2 label-2-regular text-(--color-text-tertiary) italic">
                      {question.hint}
                    </span>
                  </div>
                )}

                {/* Render options if they exist */}
                {question.options && question.options.length > 0 && (
                  <div className="flex flex-col gap-(--space-xs) mt-(--space-sm)">
                    {question.options.map((option) => (
                      <div
                        key={option.id}
                        className="flex items-center gap-(--space-sm) rounded-(--radius-card) border border-(--color-bg-tertiary) px-(--space-base) py-(--space-xs)"
                      >
                        <span className="label-2 label-2-regular text-(--color-text-secondary)">
                          {option.option_text}
                        </span>
                      </div>
                    ))}
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>
      )}

      {questions.length === 0 && (
        <p className="label-1 label-1-regular text-(--color-text-tertiary) text-center py-(--space-lg)">
          No questions have been added to this quiz yet.
        </p>
      )}
    </div>
  );
}
