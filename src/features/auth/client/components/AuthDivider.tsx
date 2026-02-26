interface AuthDividerProps {
  text: string;
}

export function AuthDivider({ text }: AuthDividerProps) {
  return (
    <div className="flex items-center gap-(--space-sm) w-full">
      <div className="flex-1 h-(--space-px) bg-(--color-bg-tertiary)" />
      <span className="body-4-regular text-(--color-text-secondary) whitespace-nowrap">{text}</span>
      <div className="flex-1 h-(--space-px) bg-(--color-bg-tertiary)" />
    </div>
  );
}
