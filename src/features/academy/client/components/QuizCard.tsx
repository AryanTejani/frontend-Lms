'use client';

import { useRouter } from 'next/navigation';
import { HelpCircleIcon } from '@/assets/icons';
import { Badge } from '@/components/ui';
import { paths } from '@/config/paths';
import { cn } from '@/utils';
import type { QuizRecord } from '../../types';

interface QuizCardProps {
  quiz: QuizRecord;
  courseSlug: string;
  className?: string;
}

export function QuizCard({ quiz, courseSlug, className }: QuizCardProps) {
  const router = useRouter();

  return (
    <button
      type="button"
      onClick={() => router.push(paths.quizDetail(courseSlug, quiz.id))}
      className={cn(
        'flex items-center gap-(--space-sm) w-full rounded-(--radius-card) border border-(--color-bg-tertiary) p-(--space-base) cursor-pointer bg-transparent transition-colors hover:bg-(--color-bg-secondary)/50',
        className
      )}
    >
      <div className="flex size-[32px] shrink-0 items-center justify-center rounded-full bg-(--color-text-success)/15">
        <HelpCircleIcon className="icon-sm text-(--color-text-success)" />
      </div>

      <div className="flex flex-1 flex-col items-start gap-(--space-xs2)">
        <span className="label-1 label-1-semibold text-(--color-text-primary)">{quiz.title}</span>
        <div className="flex items-center gap-(--space-sm)">
          <Badge label="Quiz" variant="success" />
          {quiz.question_count != null && quiz.question_count > 0 && (
            <span className="label-2 label-2-regular text-(--color-text-tertiary)">
              {quiz.question_count} question{quiz.question_count !== 1 ? 's' : ''}
            </span>
          )}
          <span className="label-2 label-2-regular text-(--color-text-tertiary)">
            {quiz.passing_percentage}% to pass
          </span>
        </div>
      </div>

      <HelpCircleIcon className="icon-md text-(--color-text-tertiary)" />
    </button>
  );
}
