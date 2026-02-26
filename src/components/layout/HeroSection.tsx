'use client';

import { Chatbox, AiPrompt } from '@/components/ui';

export function HeroSection() {
  return (
    <section className="bg-(--color-bg-primary) text-center py-12 lg:py-[108px] px-4 md:px-10 lg:px-[120px]">
      <h2 className="h2-bold text-(--color-text-primary)">Explore TraderLion Like Never Before</h2>
      <p className="body-1-regular text-(--color-text-secondary) mt-(--space-sm)">
        Chat with your AI assistant trained on every insight from TraderLion
      </p>

      <div className="max-w-[912px] mx-auto mt-(--space-2xl) text-(--color-text-tertiary)">
        <Chatbox
          variant="default"
          placeholder="Ask about strategies, risk management, chart patterns..."
        />

        <p className="label-2 label-2-regular text-(--color-text-primary) mt-(--space-lg)">
          Get started with these
        </p>

        <div className="flex gap-(--space-sm) justify-center flex-wrap mt-(--space-sm)">
          <AiPrompt text="How do I identify a Stage 2 breakout?" />
          <AiPrompt text="When should I rebalance my 401k?" />
          <AiPrompt text="How do I set up a Roth IRA?" />
        </div>
      </div>
    </section>
  );
}
