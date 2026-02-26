'use client';

import { cn } from '@/utils';
import { AcademyTab } from './AcademyTab';

interface Tab {
  label: string;
  value: string;
}

interface TabsBarProps {
  tabs: Tab[];
  selectedTab: string;
  onTabChange: (value: string) => void;
  subTabs?: Tab[];
  selectedSubTab?: string;
  onSubTabChange?: (value: string) => void;
  className?: string;
}

export function TabsBar({
  tabs,
  selectedTab,
  onTabChange,
  subTabs,
  selectedSubTab,
  onSubTabChange,
  className,
}: TabsBarProps) {
  return (
    <div className={cn('flex items-center justify-between w-full', className)}>
      {/* Primary tabs */}
      <div className="flex items-center gap-(--space-sm)">
        {tabs.map((tab) => (
          <AcademyTab
            key={tab.value}
            label={tab.label}
            variant={tab.value === selectedTab ? 'selected' : 'default'}
            onClick={() => onTabChange(tab.value)}
          />
        ))}
      </div>

      {/* Sub-tab group */}
      {subTabs && subTabs.length > 0 && (
        <div className="flex items-center bg-(--color-bg-secondary) p-(--space-xs2) rounded-full">
          {subTabs.map((tab) => (
            <AcademyTab
              key={tab.value}
              label={tab.label}
              variant={tab.value === selectedSubTab ? 'sub-tab' : 'default'}
              onClick={() => onSubTabChange?.(tab.value)}
            />
          ))}
        </div>
      )}
    </div>
  );
}
