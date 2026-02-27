'use client';

import { useState } from 'react';
import { TextField, Button } from '@/components/ui';
import { changePasswordSchema } from '../../schemas';
import { changePassword } from '../api';

interface ChangePasswordModalProps {
  onClose: () => void;
}

export function ChangePasswordModal({ onClose }: ChangePasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [errors, setErrors] = useState<Record<string, string>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleSave = async (): Promise<void> => {
    const result = changePasswordSchema.safeParse({
      currentPassword,
      newPassword,
      confirmPassword,
    });

    if (!result.success) {
      const fieldErrors: Record<string, string> = {};

      for (const issue of result.error.issues) {
        const field = issue.path[0];

        if (typeof field === 'string') {
          fieldErrors[field] = issue.message;
        }
      }

      setErrors(fieldErrors);

      return;
    }

    setErrors({});
    setIsLoading(true);

    try {
      await changePassword({ current_password: currentPassword, new_password: newPassword });
      onClose();
    } catch {
      setErrors({ currentPassword: 'Current password is incorrect' });
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay) px-(--space-base)"
      onClick={onClose}
    >
      <div
        className="flex flex-col gap-(--space-lg) w-full max-w-[480px] px-(--space-lg) py-(--space-lg) rounded-xl border border-(--color-stroke-tertiary) bg-(--color-bg-primary) shadow-[0_0_10px_rgba(0,0,0,0.25)]"
        onClick={(e) => e.stopPropagation()}
      >
        <h3 className="body-1 font-semibold text-(--color-text-primary)">Change Password</h3>

        <div className="flex flex-col gap-(--space-base)">
          <TextField
            label="Current Password"
            type="password"
            value={currentPassword}
            onChange={setCurrentPassword}
            error={errors.currentPassword}
          />
          <TextField
            label="New Password"
            type="password"
            value={newPassword}
            onChange={setNewPassword}
            error={errors.newPassword}
          />
          <TextField
            label="Confirm New Password"
            type="password"
            value={confirmPassword}
            onChange={setConfirmPassword}
            error={errors.confirmPassword}
          />
        </div>

        <div className="flex justify-end gap-(--space-xs2)">
          <Button variant="stroke" onClick={onClose} className="rounded-full" disabled={isLoading}>
            Cancel
          </Button>
          <Button onClick={handleSave} className="rounded-full" disabled={isLoading}>
            {isLoading ? 'Saving…' : 'Save'}
          </Button>
        </div>
      </div>
    </div>
  );
}
