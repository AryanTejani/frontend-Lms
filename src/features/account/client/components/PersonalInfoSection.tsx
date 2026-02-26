'use client';

import { useState } from 'react';
import { TextField, Button } from '@/components/ui';
import { EditIcon, LockIcon } from '@/assets/icons';
import type { UserProfile } from '../../types';

interface PersonalInfoSectionProps {
  profile: UserProfile;
  onChangePassword: () => void;
}

export function PersonalInfoSection({ profile, onChangePassword }: PersonalInfoSectionProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile.fullName);
  const [username, setUsername] = useState(profile.username);

  return (
    <div className="flex flex-col gap-(--space-lg)">
      <div className="flex items-center justify-between">
        <h3 className="h6 h6-bold text-(--color-text-primary)">Personal Information</h3>
        <button
          type="button"
          onClick={() => setIsEditing(!isEditing)}
          className="flex items-center justify-center size-8 rounded-[10px] bg-transparent border-none cursor-pointer hover:bg-(--color-bg-secondary) transition-colors"
          aria-label={isEditing ? 'Cancel editing' : 'Edit personal information'}
        >
          <EditIcon className="icon-md text-(--color-text-tertiary)" />
        </button>
      </div>

      <div className="flex flex-col gap-(--space-base)">
        <TextField
          label="Full Name"
          value={fullName}
          onChange={setFullName}
          disabled={!isEditing}
          size="sm"
        />
        <TextField
          label="Username"
          value={username}
          onChange={setUsername}
          disabled={!isEditing}
          size="sm"
        />
        <Button
          variant="stroke"
          className="h-[36px] self-start"
          icon={<LockIcon className="icon-sm" />}
          onClick={onChangePassword}
        >
          Change Password
        </Button>
      </div>
    </div>
  );
}
