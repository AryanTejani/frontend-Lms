'use client';

import { createContext, useContext, useState, useCallback, type ReactNode } from 'react';

export type Mentor = { name: string; avatar: string } | null;
export type Gpt = { name: string } | null;

interface AssistantContextValue {
  selectedMentor: Mentor;
  setSelectedMentor: (mentor: Mentor) => void;
  selectedGpt: Gpt;
  setSelectedGpt: (gpt: Gpt) => void;
  isSearchOpen: boolean;
  setIsSearchOpen: (open: boolean) => void;
  conversationId: string | null;
  startNewConversation: (initialMessage?: string) => string;
  pendingMessage: string | null;
  clearPendingMessage: () => void;
  loadConversation: (id: string, tutorProfile: string) => void;
  conversationVersion: number;
  bumpConversationVersion: () => void;
}

function generateId(): string {
  return `${Date.now()}-${Math.random().toString(36).slice(2, 9)}`;
}

const AI_MENTORS: Record<string, { name: string; avatar: string }> = {
  'Science AI': { name: 'Science AI', avatar: '/mentors/william-oneil.svg' },
  'Maths AI': { name: 'Maths AI', avatar: '/mentors/stan-weinstein.svg' },
  'Language AI': { name: 'Language AI', avatar: '/mentors/mark-minervini.svg' },
  'Social AI': { name: 'Social AI', avatar: '/mentors/linda-raschke.svg' },
};

const GPTS: Record<string, { name: string }> = {
  'Science Tutor': { name: 'Science Tutor' },
  'Maths Helper': { name: 'Maths Helper' },
  'Language Guide': { name: 'Language Guide' },
  'History & Civics': { name: 'History & Civics' },
};

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [selectedMentor, _setSelectedMentor] = useState<Mentor>(null);
  const [selectedGpt, _setSelectedGpt] = useState<Gpt>(null);
  const [isSearchOpen, _setIsSearchOpen] = useState(false);
  const [conversationId, setConversationId] = useState<string | null>(null);
  const [pendingMessage, setPendingMessage] = useState<string | null>(null);
  const [conversationVersion, setConversationVersion] = useState(0);

  const setSelectedMentor = useCallback((mentor: Mentor) => {
    _setSelectedMentor(mentor);
    if (mentor) {
      _setSelectedGpt(null);
      _setIsSearchOpen(false);
      setConversationId(null);
      setPendingMessage(null);
    }
  }, []);

  const setSelectedGpt = useCallback((gpt: Gpt) => {
    _setSelectedGpt(gpt);
    if (gpt) {
      _setSelectedMentor(null);
      _setIsSearchOpen(false);
      setConversationId(null);
      setPendingMessage(null);
    }
  }, []);

  const setIsSearchOpen = useCallback((open: boolean) => {
    _setIsSearchOpen(open);
    if (open) {
      _setSelectedMentor(null);
      _setSelectedGpt(null);
      setConversationId(null);
      setPendingMessage(null);
    }
  }, []);

  const startNewConversation = useCallback((initialMessage?: string): string => {
    const id = generateId();
    if (initialMessage) {
      setPendingMessage(initialMessage);
    }
    setConversationId(id);
    return id;
  }, []);

  const clearPendingMessage = useCallback(() => {
    setPendingMessage(null);
  }, []);

  const bumpConversationVersion = useCallback(() => {
    setConversationVersion((v) => v + 1);
  }, []);

  const loadConversation = useCallback((id: string, tutorProfile: string) => {
    // Determine if this tutorProfile is a mentor or GPT
    const mentor = AI_MENTORS[tutorProfile];
    const gpt = GPTS[tutorProfile];

    if (mentor) {
      _setSelectedMentor(mentor);
      _setSelectedGpt(null);
    } else if (gpt) {
      _setSelectedMentor(null);
      _setSelectedGpt(gpt);
    }

    _setIsSearchOpen(false);
    setPendingMessage(null);
    setConversationId(id);
    setConversationVersion((v) => v + 1);
  }, []);

  return (
    <AssistantContext.Provider
      value={{
        selectedMentor,
        setSelectedMentor,
        selectedGpt,
        setSelectedGpt,
        isSearchOpen,
        setIsSearchOpen,
        conversationId,
        startNewConversation,
        pendingMessage,
        clearPendingMessage,
        loadConversation,
        conversationVersion,
        bumpConversationVersion,
      }}
    >
      {children}
    </AssistantContext.Provider>
  );
}

export function useAssistant() {
  const ctx = useContext(AssistantContext);
  if (!ctx) throw new Error('useAssistant must be used within AssistantProvider');
  return ctx;
}
