export default function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-(--color-bg-primary)">
      <div className="flex flex-col items-center gap-(--space-base)">
        <div className="w-10 h-10 border-3 border-(--color-bg-tertiary) border-t-(--color-action-primary) rounded-full animate-spin" />
        <p className="body-3-regular text-(--color-text-secondary)">Loading...</p>
      </div>
    </div>
  );
}
