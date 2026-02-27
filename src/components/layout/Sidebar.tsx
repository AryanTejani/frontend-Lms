'use client';

import { useState, useEffect } from 'react';
import { usePathname } from 'next/navigation';
import { useTranslations } from 'next-intl';
import { paths } from '@/config';
import {
  HomeIcon,
  AcademyIcon,
  AssistantIcon,
  VideosIcon,
  NotificationsIcon,
  AccountIcon,
  ChevronRightIcon,
} from '@/assets/icons';
import { Logo } from './Logo';
import { LanguageSwitcher } from './LanguageSwitcher';
import { MenuItem } from '@/components/ui';
import { cn } from '@/utils/cn';
import type { Locale } from '@/i18n/config';
import { useAccountProfile } from '@/features/account/client/hooks/useAccountProfile';
import { Avatar } from '@/features/account/client/components/Avatar';

export function Sidebar({ defaultExpanded = false, initialLocale }: { defaultExpanded?: boolean; initialLocale?: Locale }) {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(defaultExpanded);
  const [hasMounted, setHasMounted] = useState(false);
  const t = useTranslations('sidebar');
  const { data: profile } = useAccountProfile();

  const avatarUrl = profile?.avatarUrl;
  const initials = profile?.fullName
    ?.split(' ')
    .map((w) => w[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('sidebar-expanded', String(isExpanded));
      document.cookie = `sidebar-expanded=${isExpanded};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    }
  }, [isExpanded, hasMounted]);

  const navItems = [
    { icon: HomeIcon, label: t('dashboard'), href: paths.dashboard },
    { icon: AssistantIcon, label: t('aiTutor'), href: paths.assistant },
    { icon: AcademyIcon, label: t('courses'), href: paths.academy },
    { icon: VideosIcon, label: t('videos'), href: paths.videos },
  ];

  return (
    <aside
      className={cn(
        'relative flex h-screen sticky top-0 border-r border-(--color-bg-tertiary) bg-(--color-bg-primary) flex-col py-(--space-lg)',
        hasMounted && 'transition-all duration-300',
        isExpanded ? 'w-[255px] items-start' : 'w-[80px] items-center'
      )}
    >
      <button
        onClick={() => setIsExpanded(!isExpanded)}
        className="absolute right-[-12px] top-[50px] z-10 flex items-center justify-center size-6 rounded-full bg-(--color-bg-primary) border border-(--color-stroke-tertiary) cursor-pointer"
        aria-label={isExpanded ? 'Collapse sidebar' : 'Expand sidebar'}
      >
        <ChevronRightIcon
          className={cn(
            'icon-sm text-(--color-text-primary) transition-transform duration-300',
            isExpanded && 'rotate-180'
          )}
        />
      </button>

      <div className={cn('mb-(--space-2xl)', isExpanded ? 'px-(--space-lg)' : 'self-center')}>
        <Logo showText={isExpanded} />
      </div>

      <nav
        className={cn(
          'flex-1 flex flex-col gap-(--space-xs) w-full px-(--space-sm)',
          isExpanded ? 'items-start' : 'items-center'
        )}
      >
        {navItems.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(`${item.href}/`);
          return (
            <MenuItem
              key={item.href}
              icon={item.icon}
              label={item.label}
              href={item.href}
              isSelected={isActive}
              showLabel={isExpanded}
            />
          );
        })}
      </nav>

      <div
        className={cn(
          'flex flex-col gap-(--space-xs) border-t border-(--color-bg-tertiary) pt-(--space-lg) w-full px-(--space-sm)',
          isExpanded ? 'items-start' : 'items-center'
        )}
      >
        <LanguageSwitcher isExpanded={isExpanded} initialLocale={initialLocale} />
        <MenuItem icon={NotificationsIcon} label={t('notifications')} showLabel={isExpanded} />
        <MenuItem
          icon={AccountIcon}
          customIcon={avatarUrl ? <Avatar src={avatarUrl} initials={initials} size={24} /> : undefined}
          label={t('account')}
          href={paths.account}
          isSelected={pathname === paths.account || pathname.startsWith(`${paths.account}/`)}
          showLabel={isExpanded}
        />
      </div>
    </aside>
  );
}
