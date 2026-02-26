import { Avatar } from './Avatar';
import { Button } from '@/components/ui';
import { DeleteCustomIcon } from '@/assets/icons';
import type { UserProfile } from '../../types';

interface ProfilePhotoSectionProps {
  profile: UserProfile;
}

export function ProfilePhotoSection({ profile }: ProfilePhotoSectionProps) {
  const initials = profile.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-(--space-lg)">
      <Avatar src={profile.avatarUrl} initials={initials} size={80} />
      <div className="flex flex-col gap-(--space-xs)">
        <span className="h6 font-regular text-(--color-text-primary)">{profile.fullName}</span>
        <div className="flex gap-(--space-xs)">
          <Button variant="stroke">Upload Photo</Button>
          <Button
            variant="no-border"
            icon={<DeleteCustomIcon className="icon-sm" />}
            className="text-(--color-text-secondary)"
          >
            Remove Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
