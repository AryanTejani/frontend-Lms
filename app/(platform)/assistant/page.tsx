'use client';

import { useState } from 'react';
import { AIIcon } from '@/assets/icons';
import { Chatbox, AiPrompt } from '@/components/ui';
import { MentorChatbox, MentorModal } from '@/features/assistant/client/components';
import { useAssistant } from '@/features/assistant/AssistantContext';
import { GPT_PROFILES, type ProfileData } from '@/features/assistant/gptProfiles';
import { ChatView, SearchView } from '@/features/assistant/views';

const DEFAULT_SUGGESTIONS = [
  'Photosynthesis kya hota hai?',
  'Explain the water cycle in simple words',
  'What are fractions? Give me an example',
];

export default function AssistantPage() {
  const { selectedMentor, selectedGpt, isSearchOpen } = useAssistant();
  const [profileModal, setProfileModal] = useState<{
    type: 'gpt';
    name: string;
    data: ProfileData;
  } | null>(null);

  const closeModal = () => setProfileModal(null);

  if (isSearchOpen) {
    return <SearchView />;
  }

  if (selectedGpt) {
    const profileData = GPT_PROFILES[selectedGpt.name];
    return (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <MentorChatbox
          name={`${selectedGpt.name} GPT`}
          onViewProfile={
            profileData
              ? () => setProfileModal({ type: 'gpt', name: selectedGpt.name, data: profileData })
              : undefined
          }
          suggestions={DEFAULT_SUGGESTIONS}
        />
        {profileModal && profileModal.type === 'gpt' && (
          <div
            className="fixed inset-0 z-50 flex items-center justify-center bg-black/20"
            onClick={closeModal}
          >
            <MentorModal
              logoUrl="/ai-icon.svg"
              title={`${profileModal.name} GPT`}
              description={profileModal.data.description}
              features={profileModal.data.features}
              relatedCourse={profileModal.data.relatedCourse}
              onClose={closeModal}
            />
          </div>
        )}
      </div>
    );
  }

  if (selectedMentor) {
    return <ChatView />;
  }

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex flex-col items-center gap-(--space-2xl)">
        {/* Logo + Title block */}
        <div className="flex flex-col items-center gap-(--space-base)">
          <div className="flex items-center justify-center w-20 h-20 rounded-(--radius-2xl) bg-gradient-to-b from-[#170689] to-[#7094d7] shadow-2xl">
            <AIIcon className="w-10 h-10 text-white" />
          </div>
          <h4 className="h4-bold text-(--color-text-primary)">VidyaSetu AI Tutor</h4>
          <p className="label-1-medium text-(--color-text-secondary)">
            Ask any question in your language — Science, Maths, History, and more
          </p>
        </div>

        {/* Chatbox */}
        <div className="w-full max-w-[800px]">
          <Chatbox
            variant="default"
            placeholder="Ask your question in any language..."
          />
        </div>

        {/* Ideas section */}
        <div className="flex flex-col items-center gap-(--space-base)">
          <span className="label-2-regular text-(--color-text-primary)">Ideas to get started</span>
          <div className="flex flex-wrap justify-center gap-(--space-xs)">
            <AiPrompt text="Photosynthesis kya hota hai?" />
            <AiPrompt text="Explain the water cycle in simple words" />
            <AiPrompt text="What are fractions? Give me an example" />
          </div>
        </div>
      </div>
    </div>
  );
}
