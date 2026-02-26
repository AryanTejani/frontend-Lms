import { FormatQuoteIcon } from '@/assets/icons';

export function TestimonialCard() {
  return (
    <div className="bg-(--color-bg-secondary) rounded-(--radius-xl) p-(--space-lg) flex flex-col gap-(--space-sm)">
      <FormatQuoteIcon className="size-6 text-(--color-text-tertiary)" />

      <p className="label-1 label-1-regular text-(--color-text-secondary) leading-relaxed">
        This platform is so good! It seems like a steal for the money.
      </p>

      <span className="label-2 label-2-semibold text-(--color-text-primary)">JoelTCampbellJr</span>
    </div>
  );
}
