import type { ReactNode } from 'react';
import { cn } from '@/utils/cn';

interface OnboardingContainerProps {
  children: ReactNode;
  className?: string;
}

const DOTS = [
  { top: '6%', left: '3%', opacity: 0.35 },
  { top: '2%', left: '18%', opacity: 0.28 },
  { top: '8%', left: '32%', opacity: 0.42 },
  { top: '4%', left: '55%', opacity: 0.23 },
  { top: '10%', left: '72%', opacity: 0.38 },
  { top: '3%', left: '88%', opacity: 0.31 },
  { top: '15%', left: '8%', opacity: 0.45 },
  { top: '22%', left: '25%', opacity: 0.27 },
  { top: '18%', left: '65%', opacity: 0.49 },
  { top: '25%', left: '90%', opacity: 0.33 },
  { top: '35%', left: '5%', opacity: 0.29 },
  { top: '40%', left: '45%', opacity: 0.36 },
  { top: '38%', left: '78%', opacity: 0.24 },
  { top: '52%', left: '12%', opacity: 0.41 },
  { top: '55%', left: '60%', opacity: 0.3 },
  { top: '65%', left: '35%', opacity: 0.44 },
  { top: '70%', left: '82%', opacity: 0.26 },
  { top: '78%', left: '15%', opacity: 0.37 },
  { top: '85%', left: '50%', opacity: 0.32 },
  { top: '90%', left: '75%', opacity: 0.4 },
] as const;

export function OnboardingContainer({ children, className }: OnboardingContainerProps) {
  return (
    <div
      className={cn(
        'relative w-full min-h-screen bg-(--color-bg-primary) overflow-hidden',
        className
      )}
    >
      {/* Top-left gradient orb */}
      <div
        className="absolute -top-[80px] -left-[60px] w-[378px] h-[308px] rounded-full blur-[64px]"
        style={{
          background:
            'linear-gradient(219deg, rgba(var(--color-primary-rgb), 0.1), rgba(var(--color-primary-rgb), 0.2))',
        }}
      />

      {/* Top-right gradient orb */}
      <div
        className="absolute -top-[60px] -right-[80px] w-[412px] h-[412px] rounded-full blur-[64px]"
        style={{
          background:
            'linear-gradient(135deg, rgba(var(--color-primary-rgb), 0.2), rgba(112,148,215,0.2))',
        }}
      />

      {/* Bottom-left gradient orb */}
      <div
        className="absolute -bottom-[80px] -left-[80px] w-[457px] h-[457px] rounded-full blur-[64px]"
        style={{
          background:
            'linear-gradient(45deg, rgba(194,122,255,0.2), rgba(var(--color-primary-rgb), 0.2))',
        }}
      />

      {/* Decorative dots */}
      {DOTS.map((dot, i) => (
        <div
          key={i}
          className="absolute w-1 h-1 rounded-full bg-(--color-action-primary)/30"
          style={{ top: dot.top, left: dot.left, opacity: dot.opacity }}
        />
      ))}

      {/* Content */}
      <div className="relative z-10 min-h-screen flex flex-col">{children}</div>
    </div>
  );
}
