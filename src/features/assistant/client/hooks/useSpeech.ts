'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

// Detect language from text using Unicode script ranges
function detectLanguage(text: string): string {
  const sample = text.slice(0, 200);

  // Devanagari (Hindi, Marathi)
  if (/[\u0900-\u097F]/.test(sample)) return 'hi-IN';

  // Tamil
  if (/[\u0B80-\u0BFF]/.test(sample)) return 'ta-IN';

  // Telugu
  if (/[\u0C00-\u0C7F]/.test(sample)) return 'te-IN';

  // Kannada
  if (/[\u0C80-\u0CFF]/.test(sample)) return 'kn-IN';

  // Bengali
  if (/[\u0980-\u09FF]/.test(sample)) return 'bn-IN';

  // Gujarati
  if (/[\u0A80-\u0AFF]/.test(sample)) return 'gu-IN';

  // Malayalam
  if (/[\u0D00-\u0D7F]/.test(sample)) return 'ml-IN';

  // Punjabi (Gurmukhi)
  if (/[\u0A00-\u0A7F]/.test(sample)) return 'pa-IN';

  return 'en-IN';
}

interface UseSpeechReturn {
  isSpeaking: boolean;
  speak: (text: string, lang?: string) => void;
  stop: () => void;
}

export function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const utteranceRef = useRef<SpeechSynthesisUtterance | null>(null);

  const stop = useCallback(() => {
    if (typeof window === 'undefined') return;
    window.speechSynthesis.cancel();
    setIsSpeaking(false);
    utteranceRef.current = null;
  }, []);

  const speak = useCallback(
    (text: string, lang?: string) => {
      if (typeof window === 'undefined' || !window.speechSynthesis) return;

      stop();

      const resolvedLang = lang ?? detectLanguage(text);
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = resolvedLang;
      utterance.rate = 0.9;
      utterance.onend = () => setIsSpeaking(false);
      utterance.onerror = () => setIsSpeaking(false);

      utteranceRef.current = utterance;
      setIsSpeaking(true);
      window.speechSynthesis.speak(utterance);
    },
    [stop],
  );

  useEffect(() => {
    return () => {
      if (typeof window !== 'undefined') {
        window.speechSynthesis.cancel();
      }
    };
  }, []);

  return { isSpeaking, speak, stop };
}
