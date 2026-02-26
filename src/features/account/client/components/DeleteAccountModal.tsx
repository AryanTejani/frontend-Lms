'use client';

import { AlertModal } from './AlertModal';

interface DeleteAccountModalProps {
  onConfirm: () => void;
  onCancel: () => void;
}

export function DeleteAccountModal({ onConfirm, onCancel }: DeleteAccountModalProps) {
  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-(--color-bg-overlay) px-(--space-base)"
      onClick={onCancel}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <AlertModal
          variant="destructive"
          title="Delete Account"
          description="Are you sure you want to delete your account? This action cannot be undone and all your data, including course progress and subscription, will be permanently removed."
          confirmLabel="Delete Account"
          cancelLabel="Cancel"
          onConfirm={onConfirm}
          onCancel={onCancel}
          className="bg-(--color-bg-primary)"
        />
      </div>
    </div>
  );
}
