'use client';

import { useState, useEffect } from 'react';
import type { QuizData } from '../hooks/useChat';
import { cn } from '@/utils/cn';
import { CheckCircleIcon } from '@/assets/icons';

interface QuizBlockProps {
  quiz: QuizData;
}

const CONFETTI_EMOJIS = ['🎉', '🌟', '🏆', '✨', '💯'];

function ConfettiOverlay() {
  const [particles, setParticles] = useState<Array<{ id: number; emoji: string; left: number; delay: number }>>([]);

  useEffect(() => {
    const items = Array.from({ length: 12 }, (_, i) => ({
      id: i,
      emoji: CONFETTI_EMOJIS[i % CONFETTI_EMOJIS.length] ?? '🎉',
      left: Math.random() * 100,
      delay: Math.random() * 0.6,
    }));
    setParticles(items);
  }, []);

  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden rounded-xl">
      {particles.map((p) => (
        <span
          key={p.id}
          className="absolute text-2xl animate-bounce"
          style={{
            left: `${p.left}%`,
            top: '-10%',
            animationDelay: `${p.delay}s`,
            animationDuration: '1.5s',
          }}
        >
          {p.emoji}
        </span>
      ))}
    </div>
  );
}

export function QuizBlock({ quiz }: QuizBlockProps) {
  const [answers, setAnswers] = useState<Record<number, number>>({});
  const [submitted, setSubmitted] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  const handleSelect = (questionIndex: number, optionIndex: number): void => {
    if (submitted) return;
    setAnswers((prev) => ({ ...prev, [questionIndex]: optionIndex }));
  };

  const handleSubmit = (): void => {
    setSubmitted(true);

    const isPerfect = quiz.questions.every((q, i) => answers[i] === q.correctIndex);

    if (isPerfect) {
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 3000);
    }
  };

  const handleTryAgain = (): void => {
    setAnswers({});
    setSubmitted(false);
    setShowConfetti(false);
  };

  const score = quiz.questions.reduce((acc, q, i) => {
    return acc + (answers[i] === q.correctIndex ? 1 : 0);
  }, 0);

  const allAnswered = quiz.questions.every((_, i) => answers[i] !== undefined);
  const answeredCount = Object.keys(answers).length;

  return (
    <div className="relative rounded-xl border border-(--color-bg-tertiary) bg-(--color-bg-primary) p-(--space-base) flex flex-col gap-(--space-base)">
      {showConfetti && <ConfettiOverlay />}

      {/* Header with progress */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-(--space-xs)">
          <CheckCircleIcon className="icon-sm text-(--color-accent-green)" />
          <h6 className="h6 h6-semibold text-(--color-text-primary)">{quiz.title}</h6>
        </div>
        {!submitted && (
          <span className="label-2 label-2-regular text-(--color-text-secondary)">
            {answeredCount} / {quiz.questions.length} answered
          </span>
        )}
      </div>

      {/* Progress bar */}
      {!submitted && (
        <div className="h-1 rounded-full bg-(--color-bg-tertiary) overflow-hidden">
          <div
            className="h-full bg-(--color-accent-green) rounded-full transition-all duration-300"
            style={{ width: `${(answeredCount / quiz.questions.length) * 100}%` }}
          />
        </div>
      )}

      {quiz.questions.map((q, qi) => (
        <div key={qi} className="flex flex-col gap-(--space-xs)">
          <p className="label-2 label-2-medium text-(--color-text-primary)">
            <span className="text-(--color-text-secondary)">Q{qi + 1}.</span> {q.question}
          </p>
          <div className="flex flex-col gap-1">
            {q.options.map((option, oi) => {
              const isSelected = answers[qi] === oi;
              const isCorrect = q.correctIndex === oi;
              let optionStyle = 'border-(--color-bg-tertiary) bg-(--color-bg-inactive)';

              if (submitted && isCorrect) {
                optionStyle = 'border-green-500 bg-green-500/10';
              } else if (submitted && isSelected && !isCorrect) {
                optionStyle = 'border-red-500 bg-red-500/10';
              } else if (isSelected) {
                optionStyle = 'border-(--color-stroke-selection) bg-(--color-bg-active)';
              }

              return (
                <button
                  key={oi}
                  type="button"
                  onClick={() => handleSelect(qi, oi)}
                  disabled={submitted}
                  className={cn(
                    'w-full text-left rounded-lg border px-(--space-sm) py-1.5 label-2 label-2-regular cursor-pointer disabled:cursor-default',
                    'transition-all duration-200',
                    isSelected && !submitted && 'scale-[1.01] shadow-sm',
                    optionStyle,
                    'text-(--color-text-secondary)',
                  )}
                >
                  {option}
                </button>
              );
            })}
          </div>
        </div>
      ))}

      {!submitted ? (
        <button
          type="button"
          onClick={handleSubmit}
          disabled={!allAnswered}
          className={cn(
            'self-start rounded-lg px-(--space-base) py-(--space-xs) label-2 label-2-medium transition-all duration-200',
            allAnswered
              ? 'bg-(--color-accent-green) text-white cursor-pointer hover:opacity-90 hover:scale-[1.02]'
              : 'bg-(--color-bg-tertiary) text-(--color-text-placeholder) cursor-not-allowed',
          )}
        >
          Check Answers
        </button>
      ) : (
        <div className="flex items-center justify-between">
          <div className="label-2 label-2-medium text-(--color-text-primary)">
            Score: {score} / {quiz.questions.length}
            {score === quiz.questions.length
              ? ' — Perfect! 🎉'
              : score >= quiz.questions.length / 2
                ? ' — Good job!'
                : ' — Keep practicing!'}
          </div>
          <button
            type="button"
            onClick={handleTryAgain}
            className="label-2 label-2-medium text-(--color-accent-green) bg-transparent border border-(--color-accent-green) rounded-lg px-(--space-sm) py-1 cursor-pointer hover:bg-(--color-accent-green)/10 transition-colors"
          >
            Try Again
          </button>
        </div>
      )}
    </div>
  );
}
