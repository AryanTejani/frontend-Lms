'use client';

import { create } from 'zustand';

interface TtsState {
  gender: 'male' | 'female';
  setGender: (gender: 'male' | 'female') => void;
}

export const useTtsStore = create<TtsState>((set) => ({
  gender: (typeof window !== 'undefined' ? (localStorage.getItem('tts-gender') as 'male' | 'female') : null) ?? 'female',
  setGender: (gender: 'male' | 'female') => {
    localStorage.setItem('tts-gender', gender);
    set({ gender });
  },
}));
