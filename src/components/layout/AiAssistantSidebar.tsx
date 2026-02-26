'use client';

import { useState, useEffect } from 'react';
import { SidebarIcon, NewChatIcon, SearchIcon } from '@/assets/icons';
import { cn } from '@/utils';
import { MenuItem } from '../ui/MenuItem';
import {
  SidebarSection,
  SidebarSubTitle,
  RecentChats,
} from '@/features/assistant/client/components';
import { listConversations, type StoredConversation } from '@/features/assistant/client/storage';

const AI_MENTORS = [
  { name: 'Science AI', avatar: '/mentors/william-oneil.svg' },
  { name: 'Maths AI', avatar: '/mentors/stan-weinstein.svg' },
  { name: 'Language AI', avatar: '/mentors/mark-minervini.svg' },
  { name: 'Social AI', avatar: '/mentors/linda-raschke.svg' },
];

const GPTS = [
  { name: 'Science Tutor' },
  { name: 'Maths Helper' },
  { name: 'Language Guide' },
  { name: 'History & Civics' },
];

interface AiAssistantSidebarProps {
  isExpanded?: boolean;
  onToggle?: () => void;
  selectedMentor?: { name: string; avatar: string } | null;
  onSelectMentor?: (mentor: { name: string; avatar: string }) => void;
  selectedGpt?: { name: string } | null;
  onSelectGpt?: (gpt: { name: string }) => void;
  onNewChat?: () => void;
  onSearchClick?: () => void;
  onLoadConversation?: (conversation: StoredConversation) => void;
  conversationVersion?: number;
  className?: string;
}

export function AiAssistantSidebar({
  isExpanded = true,
  onToggle,
  selectedMentor,
  onSelectMentor,
  selectedGpt,
  onSelectGpt,
  onNewChat,
  onSearchClick,
  onLoadConversation,
  conversationVersion = 0,
  className,
}: AiAssistantSidebarProps) {
  const [recentChats, setRecentChats] = useState<StoredConversation[]>([]);

  useEffect(() => {
    setRecentChats(listConversations().slice(0, 5));
  }, [conversationVersion]);

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
        <MenuItem icon={NewChatIcon} label="New Chat" showLabel={isExpanded} onClick={onNewChat} />
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
            {recentChats.length > 0 ? (
              recentChats.map((c) => (
                <RecentChats
                  key={c.id}
                  title={c.title}
                  onClick={() => onLoadConversation?.(c)}
                />
              ))
            ) : (
              <span className="label-2 label-2-regular text-(--color-text-secondary) px-(--space-xs)">
                No chats yet
              </span>
            )}
          </SidebarSection>
        </div>
      )}
    </aside>
  );
}
