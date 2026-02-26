import { RefreshCwIcon, SettingsGearIcon } from '@/assets/icons';
import { Button } from '@/components/ui';

export function LearningPathCard() {
  return (
    <div className="flex flex-col p-(--space-base) sm:p-[25px] rounded-(--radius-card) border border-(--color-bg-opaque) bg-[linear-gradient(135deg,rgba(59,76,202,0.05),rgba(91,111,232,0.05))]">
      <div className="flex gap-(--space-base)">
        <div className="flex items-center justify-center size-[48px] shrink-0 rounded-full bg-gradient-to-b from-(--color-action-primary) to-(--color-light-blue-300)">
          <RefreshCwIcon className="icon-lg text-(--color-text-inverse)" />
        </div>
        <div className="flex flex-col gap-(--space-xs) flex-1 min-w-0">
          <span className="body-1 font-semibold text-(--color-text-primary)">
            Customize Your Learning Experience
          </span>
          <span className="label-1 label-1-regular text-(--color-text-secondary)">
            Update your experience level, trading style, and topics of interest to receive more
            personalized course and video recommendations.
          </span>
          <Button
            className="h-[36px] mt-(--space-xs) self-start"
            icon={<SettingsGearIcon className="icon-sm" />}
          >
            Edit Learning Path
          </Button>
        </div>
      </div>
    </div>
  );
}
