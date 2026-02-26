import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';
import { AIIcon } from '@/assets/icons';
import { AiPrompt, Chatbox } from '@/components/ui';

interface MentorChatboxProps {
  name: string;
  icon?: ReactNode;
  profileHref?: string;
  onViewProfile?: () => void;
  placeholder?: string;
  suggestions?: string[];
  onSubmit?: (value: string) => void;
  onSuggestionClick?: (text: string) => void;
  className?: string;
}

export function MentorChatbox({
  name,
  icon,
  profileHref,
  onViewProfile,
  placeholder = 'Ask your question in any language...',
  suggestions = [],
  onSubmit,
  onSuggestionClick,
  className,
}: MentorChatboxProps) {
  return (
    <div
      className={cn(
        'flex flex-col items-center gap-(--space-4xl) w-full bg-(--color-bg-primary)',
        className
      )}
    >
      {/* Logo & title */}
      <div className="flex flex-col items-center gap-(--space-2xl)">
        <div className="flex items-center justify-center size-20 rounded-2xl bg-gradient-to-b from-[#170689] to-[#7094d7] shadow-[0px_25px_50px_0px_rgba(0,0,0,0.25)]">
          {icon ?? <AIIcon className="size-10 text-white" />}
        </div>
        <div className="flex flex-col items-center gap-(--space-base)">
          <h2 className="h4 h4-bold text-(--color-text-primary)">{name}</h2>
          {(profileHref || onViewProfile) && (
            <a
              href={profileHref}
              onClick={onViewProfile}
              className="label-1 label-1-medium text-(--color-text-link) no-underline hover:underline cursor-pointer"
            >
              View Profile
            </a>
          )}
        </div>
      </div>

      {/* Chatbox + suggestions */}
      <div className="flex flex-col items-center gap-(--space-base) w-full max-w-[800px]">
        <Chatbox placeholder={placeholder} onSubmit={onSubmit} className="w-full" />

        {suggestions.length > 0 && (
          <div className="flex flex-col items-center gap-(--space-xs) w-full">
            <span className="label-2 label-2-regular text-(--color-text-primary)">
              Ideas to get started
            </span>
            <div className="flex items-center justify-center gap-(--space-xs) flex-wrap">
              {suggestions.map((text) => (
                <AiPrompt key={text} text={text} onClick={() => onSuggestionClick?.(text)} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
