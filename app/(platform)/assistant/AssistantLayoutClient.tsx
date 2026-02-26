'use client';

import { useState, useCallback, useEffect } from 'react';
import { AiAssistantSidebar } from '@/components/layout/AiAssistantSidebar';
import { AssistantProvider, useAssistant } from '@/features/assistant/AssistantContext';
import type { StoredConversation } from '@/features/assistant/client/storage';

export function AssistantLayoutClient({
  children,
  defaultSidebarExpanded = false,
}: {
  children: React.ReactNode;
  defaultSidebarExpanded?: boolean;
}) {
  return (
    <AssistantProvider>
      <AssistantLayoutInner defaultSidebarExpanded={defaultSidebarExpanded}>
        {children}
      </AssistantLayoutInner>
    </AssistantProvider>
  );
}

function AssistantLayoutInner({
  children,
  defaultSidebarExpanded,
}: {
  children: React.ReactNode;
  defaultSidebarExpanded: boolean;
}) {
  const [isExpanded, setIsExpanded] = useState(defaultSidebarExpanded);
  const [hasMounted, setHasMounted] = useState(false);

  useEffect(() => {
    setHasMounted(true);
  }, []);

  useEffect(() => {
    if (hasMounted) {
      localStorage.setItem('ai-sidebar-expanded', String(isExpanded));
      document.cookie = `ai-sidebar-expanded=${isExpanded};path=/;max-age=${60 * 60 * 24 * 365};SameSite=Lax`;
    }
  }, [isExpanded, hasMounted]);

  const {
    selectedMentor,
    setSelectedMentor,
    selectedGpt,
    setSelectedGpt,
    setIsSearchOpen,
    loadConversation,
    conversationVersion,
  } = useAssistant();

  const handleNewChat = (): void => {
    setSelectedMentor(null);
    setSelectedGpt(null);
    setIsSearchOpen(false);
  };

  const handleLoadConversation = useCallback(
    (conversation: StoredConversation) => {
      loadConversation(conversation.id, conversation.tutorProfile);
    },
    [loadConversation],
  );

  return (
    <div className="flex h-full">
      <AiAssistantSidebar
        className={hasMounted ? undefined : 'transition-none'}
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        selectedMentor={selectedMentor}
        onSelectMentor={setSelectedMentor}
        selectedGpt={selectedGpt}
        onSelectGpt={setSelectedGpt}
        onNewChat={handleNewChat}
        onSearchClick={() => setIsSearchOpen(true)}
        onLoadConversation={handleLoadConversation}
        conversationVersion={conversationVersion}
      />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}
