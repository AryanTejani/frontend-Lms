import type { FallbackProps } from 'react-error-boundary';

export function ErrorFallback({ error, resetErrorBoundary }: FallbackProps) {
  const errorMessage = error instanceof Error ? error.message : 'An unexpected error occurred';

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-primary p-base">
      <div className="w-full max-w-md rounded-lg border border-tertiary bg-primary p-lg text-center">
        <h2 className="h6 h6-semibold mb-base text-primary">Something went wrong</h2>
        <p className="body-2 mb-base text-secondary">{errorMessage}</p>
        <button
          type="button"
          onClick={resetErrorBoundary}
          className="label-2 label-2-semibold rounded-lg bg-action-primary px-base py-xs text-white transition-colors hover:bg-action-hover"
        >
          Try again
        </button>
      </div>
    </div>
  );
}
