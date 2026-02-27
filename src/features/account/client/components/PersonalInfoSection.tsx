'use client';

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { TextField, Button } from '@/components/ui';
import { EditIcon, LockIcon } from '@/assets/icons';
import type { UserProfile } from '../../types';

interface PersonalInfoSectionProps {
  profile: UserProfile;
  onChangePassword: () => void;
}

export function PersonalInfoSection({ profile, onChangePassword }: PersonalInfoSectionProps) {
  const t = useTranslations('account');
  const [isEditing, setIsEditing] = useState(false);
  const [fullName, setFullName] = useState(profile.fullName);
  const [username, setUsername] = useState(profile.username);

  return (
    <div className="flex flex-col gap-(--space-lg)">
      <div className="flex items-center justify-between">
        <h3 className="h6 h6-bold text-(--color-text-primary)">{t('personalInfo')}</h3>
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
          label={t('fullName')}
          value={fullName}
          onChange={setFullName}
          disabled={!isEditing}
          size="sm"
        />
        <TextField
          label={t('username')}
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
          {t('changePassword')}
        </Button>
      </div>
    </div>
  );
}
