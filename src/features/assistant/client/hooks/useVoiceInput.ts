'use client';

import { useState, useCallback, useRef, useEffect } from 'react';

interface UseVoiceInputOptions {
  onResult: (transcript: string) => void;
}

interface UseVoiceInputReturn {
  isListening: boolean;
  transcript: string;
  startListening: (lang?: string) => void;
  stopListening: () => void;
  isSupported: boolean;
}

export function useVoiceInput({ onResult }: UseVoiceInputOptions): UseVoiceInputReturn {
  const [isListening, setIsListening] = useState(false);
  const [transcript, setTranscript] = useState('');
  const recognitionRef = useRef<SpeechRecognition | null>(null);
  const onResultRef = useRef(onResult);
  onResultRef.current = onResult;

  const isSupported = typeof window !== 'undefined' && !!(window.SpeechRecognition || window.webkitSpeechRecognition);

  const stopListening = useCallback(() => {
    recognitionRef.current?.stop();
    setIsListening(false);
  }, []);

  const startListening = useCallback(
    (lang = 'hi-IN') => {
      if (!isSupported) return;

      stopListening();

      const SpeechRecognitionCtor = window.SpeechRecognition ?? window.webkitSpeechRecognition;

      if (!SpeechRecognitionCtor) return;

      const recognition = new SpeechRecognitionCtor();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = lang;

      recognition.onresult = (event: SpeechRecognitionEvent) => {
        let finalTranscript = '';
        let interimTranscript = '';

        for (let i = event.resultIndex; i < event.results.length; i++) {
          const result = event.results[i];

          if (result?.isFinal) {
            finalTranscript += result[0]?.transcript ?? '';
          } else {
            interimTranscript += result?.[0]?.transcript ?? '';
          }
        }

        setTranscript(finalTranscript || interimTranscript);

        if (finalTranscript) {
          onResultRef.current(finalTranscript);
          setIsListening(false);
          setTranscript('');
        }
      };

      recognition.onerror = () => {
        setIsListening(false);
        setTranscript('');
      };

      recognition.onend = () => {
        setIsListening(false);
      };

      recognitionRef.current = recognition;
      setTranscript('');
      setIsListening(true);
      recognition.start();
    },
    [isSupported, stopListening],
  );

  useEffect(() => {
    return () => {
      recognitionRef.current?.abort();
    };
  }, []);

  return { isListening, transcript, startListening, stopListening, isSupported };
}
