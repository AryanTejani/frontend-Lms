'use client';

import { useState } from 'react';
import { usePathname } from 'next/navigation';
import { paths } from '@/config';
import {
  HomeIcon,
  AcademyIcon,
  AssistantIcon,
  LearningIcon,
  VideosIcon,
  NotificationsIcon,
  AccountIcon,
  ChevronRightIcon,
} from '@/assets/icons';
import { Logo } from './Logo';
import { MenuItem } from '@/components/ui';
import { cn } from '@/utils/cn';

const navItems = [
  { icon: HomeIcon, label: 'Dashboard', href: paths.dashboard },
  { icon: AssistantIcon, label: 'AI Tutor', href: paths.assistant },
  { icon: AcademyIcon, label: 'Courses', href: paths.academy },
  { icon: LearningIcon, label: 'My Learning', href: paths.learning },
  { icon: VideosIcon, label: 'Videos', href: paths.videos },
];

export function Sidebar() {
  const pathname = usePathname();
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <aside
      className={cn(
        'relative flex h-screen sticky top-0 border-r border-(--color-bg-tertiary) bg-(--color-bg-primary) flex-col py-(--space-lg) transition-all duration-300',
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
        <MenuItem icon={NotificationsIcon} label="Notifications" showLabel={isExpanded} />
        <MenuItem
          icon={AccountIcon}
          label="Account"
          href={paths.account}
          isSelected={pathname === paths.account || pathname.startsWith(`${paths.account}/`)}
          showLabel={isExpanded}
        />
      </div>
    </aside>
  );
}
