'use client';

import { useRef } from 'react';
import { useQueryClient } from '@tanstack/react-query';
import { Avatar } from './Avatar';
import { Button } from '@/components/ui';
import { DeleteCustomIcon } from '@/assets/icons';
import { uploadAvatar, removeAvatar } from '../api';
import { accountKeys } from '../hooks';
import type { UserProfile } from '../../types';

interface ProfilePhotoSectionProps {
  profile: UserProfile;
}

export function ProfilePhotoSection({ profile }: ProfilePhotoSectionProps) {
  const fileInputRef = useRef<HTMLInputElement>(null);
  const queryClient = useQueryClient();

  const initials = profile.fullName
    .split(' ')
    .map((n) => n[0])
    .join('')
    .toUpperCase();

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>): Promise<void> => {
    const file = e.target.files?.[0];

    if (!file) {
      return;
    }

    await uploadAvatar(file);
    await queryClient.invalidateQueries({ queryKey: accountKeys.profile });

    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemove = async (): Promise<void> => {
    await removeAvatar();
    await queryClient.invalidateQueries({ queryKey: accountKeys.profile });
  };

  return (
    <div className="flex flex-col sm:flex-row sm:items-center gap-(--space-lg)">
      <input
        type="file"
        accept="image/*"
        ref={fileInputRef}
        onChange={handleFileChange}
        className="hidden"
      />
      <Avatar src={profile.avatarUrl} initials={initials} size={80} />
      <div className="flex flex-col gap-(--space-xs)">
        <span className="h6 font-regular text-(--color-text-primary)">{profile.fullName}</span>
        <div className="flex gap-(--space-xs)">
          <Button variant="stroke" onClick={() => fileInputRef.current?.click()}>
            Upload Photo
          </Button>
          <Button
            variant="no-border"
            icon={<DeleteCustomIcon className="icon-sm" />}
            className="text-(--color-text-secondary)"
            onClick={handleRemove}
          >
            Remove Photo
          </Button>
        </div>
      </div>
    </div>
  );
}
