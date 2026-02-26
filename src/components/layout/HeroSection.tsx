'use client';

import { Chatbox, AiPrompt } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="bg-(--color-bg-primary) text-center py-12 lg:py-[108px] px-4 md:px-10 lg:px-[120px]">
      <h2 className="h2-bold text-(--color-text-primary)">Learn in YOUR Language, Your Way</h2>
      <p className="body-1-regular text-(--color-text-secondary) mt-(--space-sm)">
        Ask your AI tutor anything — in Hindi, Tamil, Telugu, Marathi, Kannada and more
      </p>

      <div className="max-w-[912px] mx-auto mt-(--space-2xl) text-(--color-text-tertiary)">
        <Chatbox
          variant="default"
          placeholder="Ask about photosynthesis, fractions, history..."
        />

        <p className="label-2 label-2-regular text-(--color-text-primary) mt-(--space-lg)">
          Get started with these
        </p>

        <div className="flex gap-(--space-sm) justify-center flex-wrap mt-(--space-sm)">
          <AiPrompt text="Photosynthesis ante enti?" />
          <AiPrompt text="दो और दो कितने होते हैं?" />
          <AiPrompt text="Explain water cycle for Class 5" />
        </div>
      </div>
    </section>
  );
}
