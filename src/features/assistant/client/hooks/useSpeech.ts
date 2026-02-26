'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import api from '@/lib/fetch.client';

// Detect language from text using Unicode script ranges
export function detectLanguage(text: string): string {
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
  isLoading: boolean;
  speak: (text: string, lang?: string, gender?: 'male' | 'female') => void;
  stop: () => void;
  pause: () => void;
  resume: () => void;
}

export function useSpeech(): UseSpeechReturn {
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const abortRef = useRef<AbortController | null>(null);

  const stop = useCallback(() => {
    abortRef.current?.abort();
    abortRef.current = null;

    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.src = '';
      audioRef.current = null;
    }

    setIsSpeaking(false);
    setIsLoading(false);
  }, []);

  const pause = useCallback(() => {
    audioRef.current?.pause();
    setIsSpeaking(false);
  }, []);

  const resume = useCallback(() => {
    if (audioRef.current && audioRef.current.src) {
      void audioRef.current.play();
      setIsSpeaking(true);
    }
  }, []);

  const speak = useCallback(
    (text: string, lang?: string, gender?: 'male' | 'female') => {
      stop();

      const resolvedLang = lang ?? detectLanguage(text);
      const resolvedGender = gender ?? 'female';
      const controller = new AbortController();
      abortRef.current = controller;

      setIsLoading(true);

      api
        .post('/tts/speak', { text, lang: resolvedLang, gender: resolvedGender }, { responseType: 'blob', signal: controller.signal })
        .then((response) => {
          if (controller.signal.aborted) return;

          const blob = response.data as Blob;
          const url = URL.createObjectURL(blob);
          const audio = new Audio(url);

          audio.onended = () => {
            URL.revokeObjectURL(url);
            setIsSpeaking(false);
            audioRef.current = null;
          };

          audio.onerror = () => {
            URL.revokeObjectURL(url);
            setIsSpeaking(false);
            audioRef.current = null;
          };

          audioRef.current = audio;
          setIsLoading(false);
          setIsSpeaking(true);
          void audio.play();
        })
        .catch(() => {
          if (!controller.signal.aborted) {
            setIsLoading(false);
            setIsSpeaking(false);
          }
        });
    },
    [stop],
  );

  useEffect(() => {
    return () => {
      abortRef.current?.abort();

      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.src = '';
      }
    };
  }, []);

  return { isSpeaking, isLoading, speak, stop, pause, resume };
}
