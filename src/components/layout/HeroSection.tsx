'use client';

import { useTranslations } from 'next-intl';
import { Chatbox, AiPrompt } from '@/components/ui';

export function HeroSection() {
  const t = useTranslations('hero');

  return (
    <section className="bg-(--color-bg-primary) text-center py-12 lg:py-[108px] px-4 md:px-10 lg:px-[120px]">
      <h2 className="h2-bold text-(--color-text-primary)">{t('title')}</h2>
      <p className="body-1-regular text-(--color-text-secondary) mt-(--space-sm)">
        {t('subtitle')}
      </p>

      <div className="max-w-[912px] mx-auto mt-(--space-2xl) text-(--color-text-tertiary)">
        <Chatbox
          variant="default"
          placeholder={t('placeholder')}
        />

        <p className="label-2 label-2-regular text-(--color-text-primary) mt-(--space-lg)">
          {t('getStarted')}
        </p>

        <div className="flex gap-(--space-sm) justify-center flex-wrap mt-(--space-sm)">
          <AiPrompt text="Photosynthesis ante enti?" />
          <AiPrompt text="\u0926\u094B \u0914\u0930 \u0926\u094B \u0915\u093F\u0924\u0928\u0947 \u0939\u094B\u0924\u0947 \u0939\u0948\u0902?" />
          <AiPrompt text="Explain water cycle for Class 5" />
        </div>
      </div>
    </section>
  );
}
