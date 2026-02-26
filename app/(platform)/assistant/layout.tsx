'use client';

import { useState } from 'react';
import { AiAssistantSidebar } from '@/components/layout/AiAssistantSidebar';
import { AssistantProvider, useAssistant } from '@/features/assistant/AssistantContext';

function AssistantLayoutInner({ children }: { children: React.ReactNode }) {
  const [isExpanded, setIsExpanded] = useState(false);
  const { selectedMentor, setSelectedMentor, selectedGpt, setSelectedGpt, setIsSearchOpen } =
    useAssistant();

  return (
    <div className="flex h-full">
      <AiAssistantSidebar
        isExpanded={isExpanded}
        onToggle={() => setIsExpanded(!isExpanded)}
        selectedMentor={selectedMentor}
        onSelectMentor={setSelectedMentor}
        selectedGpt={selectedGpt}
        onSelectGpt={setSelectedGpt}
        onSearchClick={() => setIsSearchOpen(true)}
      />
      <div className="flex-1 overflow-y-auto">{children}</div>
    </div>
  );
}

export default function AssistantLayout({ children }: { children: React.ReactNode }) {
  return (
    <AssistantProvider>
      <AssistantLayoutInner>{children}</AssistantLayoutInner>
    </AssistantProvider>
  );
}
