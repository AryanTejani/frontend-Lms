'use client';

import { SidebarIcon, NewChatIcon, SearchIcon } from '@/assets/icons';
import { cn } from '@/utils';
import { MenuItem } from '../ui/MenuItem';
import {
  SidebarSection,
  SidebarSubTitle,
  RecentChats,
} from '@/features/assistant/client/components';

const AI_MENTORS = [
  { name: "William O'Neil", avatar: '/mentors/william-oneil.svg' },
  { name: 'Stan Weinstein', avatar: '/mentors/stan-weinstein.svg' },
  { name: 'Mark Minervini', avatar: '/mentors/mark-minervini.svg' },
  { name: 'Linda Raschke', avatar: '/mentors/linda-raschke.svg' },
];

const GPTS = [
  { name: 'Swing Trading Mastery' },
  { name: 'Trading Psychology' },
  { name: 'Stage Analysis' },
  { name: 'High Tight Flag' },
];

const RECENT_CHATS = [
  { title: 'Stage 2 Breakout Patterns', bookmarked: true },
  { title: 'Momentum Ignition Signals', bookmarked: true },
  { title: 'Volume Confirmation', bookmarked: true },
];

interface AiAssistantSidebarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  selectedMentor?: { name: string; avatar: string } | null;
  onSelectMentor?: (mentor: { name: string; avatar: string }) => void;
  selectedGpt?: { name: string } | null;
  onSelectGpt?: (gpt: { name: string }) => void;
  onSearchClick?: () => void;
  className?: string;
}

export function AiAssistantSidebar({
  isExpanded = true,
  onToggle,
  selectedMentor,
  onSelectMentor,
  selectedGpt,
  onSelectGpt,
  onSearchClick,
  className,
}: AiAssistantSidebarProps) {
  return (
    <aside
      className={cn(
        'h-screen sticky top-0 flex flex-col bg-(--color-bg-primary) border-r border-(--color-bg-tertiary) transition-all duration-300',
        isExpanded ? 'w-[256px]' : 'w-auto',
        className
      )}
    >
      {/* Top section - toggle */}
      <div className="pt-(--space-base) px-(--space-sm)">
        <MenuItem icon={SidebarIcon} isSelected={true} showLabel={false} onClick={onToggle} />
      </div>

      {/* Actions */}
      <div className="flex flex-col gap-(--space-xs) px-(--space-sm) py-(--space-base)">
        <MenuItem icon={NewChatIcon} label="New Chat" showLabel={isExpanded} />
        <MenuItem
          icon={SearchIcon}
          label="Search Chats"
          showLabel={isExpanded}
          onClick={onSearchClick}
        />
      </div>

      {/* Collapsible sections (expanded only) */}
      {isExpanded && (
        <div className="flex-1 flex flex-col gap-(--space-xs) px-(--space-sm) overflow-y-auto">
          <SidebarSection title="AI Mentors">
            {AI_MENTORS.map((m) => (
              <SidebarSubTitle
                key={m.name}
                name={m.name}
                avatarSrc={m.avatar}
                isSelected={selectedMentor?.name === m.name}
                onClick={() => onSelectMentor?.(m)}
              />
            ))}
          </SidebarSection>

          <SidebarSection title="GPTs">
            {GPTS.map((g) => (
              <SidebarSubTitle
                key={g.name}
                name={g.name}
                isSelected={selectedGpt?.name === g.name}
                onClick={() => onSelectGpt?.(g)}
              />
            ))}
          </SidebarSection>

          <SidebarSection title="Recent Chats">
            {RECENT_CHATS.map((c) => (
              <RecentChats key={c.title} title={c.title} showBookmark={c.bookmarked} />
            ))}
          </SidebarSection>
        </div>
      )}
    </aside>
  );
}
