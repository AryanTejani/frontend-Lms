'use client';

import { useState, useCallback } from 'react';
import { HelpCircleIcon, TrashStrokeIcon, FileTextIcon, LogOutIcon } from '@/assets/icons';
import { logout } from '@/features/auth/client/api';
import { logoutAction } from '@/features/auth/server/logout';
import { createPortalSession } from '@/features/payment/api';
import {
  LearningPathCard,
  ProfilePhotoSection,
  PersonalInfoSection,
  SubscriptionCard,
  EnrolledCourseItem,
  ThemeToggle,
  AccountActionItem,
  ChangePasswordModal,
  DeleteAccountModal,
  RefundRequestModal,
  BillingHistoryModal,
  UpgradePlanModal,
} from '../client/components';
import { useAccountProfile, useSubscription, usePurchases } from '../client/hooks';

export function AccountSettingsView() {
  const [showChangePassword, setShowChangePassword] = useState(false);
  const [showDeleteAccount, setShowDeleteAccount] = useState(false);
  const [showRefundRequest, setShowRefundRequest] = useState(false);
  const [showBillingHistory, setShowBillingHistory] = useState(false);
  const [showUpgradePlan, setShowUpgradePlan] = useState(false);

  const { data: profile, isLoading: profileLoading } = useAccountProfile();
  const { data: subscription, isLoading: subscriptionLoading } = useSubscription();
  const { data: courses = [], isLoading: coursesLoading } = usePurchases();

  const handleLogout = async (): Promise<void> => {
    try {
      await logout();
    } catch {
      // API call may fail if session already invalid
    }
    await logoutAction();
  };

  const handleManageSubscription = useCallback(async (): Promise<void> => {
    try {
      const { portal_url } = await createPortalSession();
      window.location.href = portal_url;
    } catch {
      // Portal may fail if no Stripe customer exists yet
    }
  }, []);

  const fallbackProfile = { fullName: '…', username: '…' };
  const displayProfile = profile ?? fallbackProfile;

  return (
    <div className="flex-1 overflow-y-auto py-(--space-lg) sm:py-(--space-3xl) px-(--space-base) sm:px-(--space-lg)">
      <div className="max-w-[768px] mx-auto flex flex-col gap-(--space-lg) sm:gap-(--space-2xl)">
        {/* Page Header */}
        <div className="flex flex-col gap-(--space-xs)">
          <h2 className="h5 h5-bold text-(--color-text-primary)">Account</h2>
          <p className="label-1 label-1-medium text-(--color-text-secondary)">
            Manage your account settings and preferences
          </p>
        </div>

        {/* Learning Path */}
        <div className="flex flex-col gap-(--space-lg)">
          <h3 className="h6 h6-bold text-(--color-text-primary)">Learning Path</h3>
          <LearningPathCard />
        </div>

        <hr className="border-(--color-stroke-tertiary) border-t" />

        {/* Profile Photo */}
        <ProfilePhotoSection profile={displayProfile} />

        <hr className="border-(--color-stroke-tertiary) border-t" />

        {/* Personal Information */}
        {profileLoading ? (
          <div className="h-24 rounded-lg bg-(--color-bg-secondary) animate-pulse" />
        ) : (
          <PersonalInfoSection
            profile={displayProfile}
            onChangePassword={() => setShowChangePassword(true)}
          />
        )}

        <hr className="border-(--color-stroke-tertiary) border-t" />

        {/* Subscription */}
        {subscriptionLoading ? (
          <div className="h-40 rounded-lg bg-(--color-bg-secondary) animate-pulse" />
        ) : subscription ? (
          <SubscriptionCard
            subscription={subscription}
            onManageSubscription={() => void handleManageSubscription()}
            onBillingHistory={() => setShowBillingHistory(true)}
            onRequestRefund={() => setShowRefundRequest(true)}
            onUpgradePlan={() => setShowUpgradePlan(true)}
          />
        ) : (
          <div className="flex flex-col gap-(--space-lg)">
            <h3 className="h6 h6-bold text-(--color-text-primary)">Subscription</h3>
            <p className="label-2 label-2-regular text-(--color-text-secondary)">
              No active subscription
            </p>
          </div>
        )}

        <hr className="border-(--color-stroke-tertiary) border-t" />

        {/* Enrolled Courses */}
        <div className="flex flex-col gap-(--space-lg)">
          <h3 className="h6 h6-bold text-(--color-text-primary)">Enrolled Courses</h3>
          {coursesLoading ? (
            <div className="h-24 rounded-lg bg-(--color-bg-secondary) animate-pulse" />
          ) : courses.length === 0 ? (
            <p className="label-2 label-2-regular text-(--color-text-secondary)">
              No enrolled courses
            </p>
          ) : (
            <div className="flex flex-col gap-(--space-sm)">
              {courses.map((course) => (
                <EnrolledCourseItem key={course.id} course={course} />
              ))}
            </div>
          )}
        </div>

        <hr className="border-(--color-stroke-tertiary) border-t" />

        {/* Theme */}
        <div className="flex flex-col gap-(--space-lg)">
          <h3 className="h6 h6-bold text-(--color-text-primary)">Theme</h3>
          <ThemeToggle />
        </div>

        <hr className="border-(--color-stroke-tertiary) border-t" />

        {/* Account Actions */}
        <div className="flex flex-col gap-(--space-xs)">
          <AccountActionItem
            icon={HelpCircleIcon}
            title="Help & Support"
            subtitle="Get help with your account"
          />
          <AccountActionItem
            icon={FileTextIcon}
            title="Privacy Policy"
            subtitle="View our privacy policy"
          />
          <AccountActionItem
            icon={LogOutIcon}
            title="Log Out"
            subtitle="Sign out of your account"
            onClick={handleLogout}
          />
          <AccountActionItem
            icon={TrashStrokeIcon}
            title="Delete Account"
            subtitle="Permanently delete your account"
            destructive
            onClick={() => setShowDeleteAccount(true)}
          />
        </div>
      </div>

      {/* Modals */}
      {showChangePassword && <ChangePasswordModal onClose={() => setShowChangePassword(false)} />}
      {showDeleteAccount && (
        <DeleteAccountModal
          onConfirm={() => setShowDeleteAccount(false)}
          onCancel={() => setShowDeleteAccount(false)}
        />
      )}
      {showRefundRequest && <RefundRequestModal onClose={() => setShowRefundRequest(false)} />}
      {showBillingHistory && <BillingHistoryModal onClose={() => setShowBillingHistory(false)} />}
      {showUpgradePlan && (
        <UpgradePlanModal
          currentSubscription={subscription ?? null}
          onClose={() => setShowUpgradePlan(false)}
        />
      )}
    </div>
  );
}
