import { useState } from 'react';
import { getGoogleAuthUrl } from '../api';
import { GoogleLogoIcon, XLogoIcon } from '@/assets/icons';

export function SocialAuthButtons() {
  const [isLoading, setIsLoading] = useState(false);

  const handleGoogleClick = async () => {
    if (isLoading) {
      return;
    }

    setIsLoading(true);
    try {
      const { url } = await getGoogleAuthUrl();
      window.location.href = url;
    } catch (error) {
      console.error('Failed to get Google auth URL:', error);
      setIsLoading(false);
    }
  };

  const handleXClick = () => {
    // TODO: X OAuth integration
  };

  return (
    <div className="flex justify-center gap-(--space-lg) w-full">
      <button
        type="button"
        onClick={handleGoogleClick}
        className="flex items-center justify-center h-(--button-height-sm) w-full bg-(--color-bg-primary) border border-(--color-bg-tertiary) rounded-full cursor-pointer transition-colors hover:bg-(--color-bg-secondary)"
        aria-label="Sign up with Google"
      >
        <GoogleLogoIcon className="icon-md" />
      </button>
      <button
        type="button"
        onClick={handleXClick}
        className="flex items-center justify-center h-(--button-height-sm) w-full bg-(--color-bg-primary) border border-(--color-bg-tertiary) rounded-full cursor-pointer transition-colors hover:bg-(--color-bg-secondary)"
        aria-label="Sign up with X"
      >
        <XLogoIcon className="icon-md" />
      </button>
    </div>
  );
}
