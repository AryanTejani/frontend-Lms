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
}

const AssistantContext = createContext<AssistantContextValue | null>(null);

export function AssistantProvider({ children }: { children: ReactNode }) {
  const [selectedMentor, _setSelectedMentor] = useState<Mentor>(null);
  const [selectedGpt, _setSelectedGpt] = useState<Gpt>(null);
  const [isSearchOpen, _setIsSearchOpen] = useState(false);

  const setSelectedMentor = useCallback((mentor: Mentor) => {
    _setSelectedMentor(mentor);
    if (mentor) {
      _setSelectedGpt(null);
      _setIsSearchOpen(false);
    }
  }, []);

  const setSelectedGpt = useCallback((gpt: Gpt) => {
    _setSelectedGpt(gpt);
    if (gpt) {
      _setSelectedMentor(null);
      _setIsSearchOpen(false);
    }
  }, []);

  const setIsSearchOpen = useCallback((open: boolean) => {
    _setIsSearchOpen(open);
    if (open) {
      _setSelectedMentor(null);
      _setSelectedGpt(null);
    }
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
