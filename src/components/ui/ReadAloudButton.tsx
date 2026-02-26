'use client';

import { VolumeUpIcon, PauseIcon } from '@/assets/icons';
import { useSpeech } from '@/features/assistant/client/hooks/useSpeech';
import { useTtsStore } from '@/stores/ttsStore';

function stripHtmlTags(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim();
}

interface ReadAloudButtonProps {
  text: string;
  lang?: string;
  className?: string;
  showGenderToggle?: boolean;
}

export function ReadAloudButton({ text, lang, className, showGenderToggle = true }: ReadAloudButtonProps) {
  const { isSpeaking, isLoading, speak, stop } = useSpeech();
  const gender = useTtsStore((s) => s.gender);
  const setGender = useTtsStore((s) => s.setGender);

  const plainText = stripHtmlTags(text).slice(0, 5000);

  if (!plainText) return null;

  const handleClick = (): void => {
    if (isSpeaking) {
      stop();
    } else {
      speak(plainText, lang, gender);
    }
  };

  const readAloudBtn = (
    <button
      type="button"
      onClick={handleClick}
      disabled={isLoading}
      className={`inline-flex items-center gap-(--space-xs2) px-(--space-sm) py-(--space-xs2) rounded-full border cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
        isSpeaking
          ? 'bg-(--color-accent-green)/10 border-(--color-accent-green) text-(--color-accent-green)'
          : 'bg-(--color-bg-secondary) border-(--color-bg-tertiary) text-(--color-text-secondary) hover:text-(--color-text-primary)'
      } ${className ?? ''}`}
      aria-label={isLoading ? 'Loading voice...' : isSpeaking ? 'Stop reading' : 'Read aloud'}
    >
      {isSpeaking ? <PauseIcon className="icon-sm" /> : <VolumeUpIcon className="icon-sm" />}
      <span className="label-3 label-3-medium">
        {isLoading ? 'Loading...' : isSpeaking ? 'Stop' : 'Read Aloud'}
      </span>
    </button>
  );

  if (!showGenderToggle) return readAloudBtn;

  return (
    <div className="flex items-center gap-(--space-xs2)">
      {readAloudBtn}
      <button
        type="button"
        onClick={() => setGender(gender === 'female' ? 'male' : 'female')}
        className="flex items-center gap-(--space-xs2) px-(--space-sm) py-(--space-xs2) rounded-full bg-(--color-bg-secondary) border border-(--color-bg-tertiary) cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        aria-label={`Voice: ${gender}. Click to switch.`}
      >
        <VolumeUpIcon className="icon-xs" />
        <span className="label-3 label-3-medium capitalize">{gender}</span>
      </button>
    </div>
  );
}
