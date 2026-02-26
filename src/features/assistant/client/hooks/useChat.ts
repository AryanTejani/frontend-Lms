'use client';

import { useState, useCallback, useRef, useEffect } from 'react';
import { streamChat } from '../api';
import { saveConversation, loadConversation, type StoredMessage } from '../storage';

export interface ChatMessageImage {
  base64: string;
  mimeType: string;
}

export interface QuizQuestion {
  question: string;
  options: string[];
  correctIndex: number;
}

export interface QuizData {
  title: string;
  questions: QuizQuestion[];
}

export interface ChatMessage {
  role: 'user' | 'model';
  text: string;
  image?: ChatMessageImage;
  quiz?: QuizData;
}

interface UseChatOptions {
  conversationId: string | null;
  tutorProfile: string;
  language?: string;
  onSave?: () => void;
}

interface UseChatReturn {
  messages: ChatMessage[];
  isStreaming: boolean;
  sendMessage: (text: string, image?: ChatMessageImage) => Promise<void>;
  appendMessage: (msg: ChatMessage) => void;
  clearMessages: () => void;
}

export function useChat({ conversationId, tutorProfile, language = 'en', onSave }: UseChatOptions): UseChatReturn {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [isStreaming, setIsStreaming] = useState(false);
  const abortRef = useRef<AbortController | null>(null);
  const messagesRef = useRef<ChatMessage[]>(messages);
  messagesRef.current = messages;

  // Load conversation from localStorage when conversationId changes
  useEffect(() => {
    if (!conversationId) {
      setMessages([]);
      return;
    }

    const saved = loadConversation(conversationId);

    if (saved) {
      setMessages(saved.messages);
    } else {
      setMessages([]);
    }
  }, [conversationId]);

  const appendMessage = useCallback(
    (msg: ChatMessage) => {
      setMessages((prev) => {
        const updated = [...prev, msg];

        if (conversationId) {
          const stored: StoredMessage[] = updated.map((m) => ({
            role: m.role,
            text: m.text,
            quiz: m.quiz,
          }));
          saveConversation(conversationId, stored, tutorProfile);
          onSave?.();
        }

        return updated;
      });
    },
    [conversationId, tutorProfile, onSave],
  );

  const sendMessage = useCallback(
    async (text: string, image?: ChatMessageImage) => {
      if (!conversationId) return;

      const userMsg: ChatMessage = { role: 'user', text, image };
      const history: StoredMessage[] = messagesRef.current.map((m) => ({ role: m.role, text: m.text, quiz: m.quiz }));

      setMessages((prev) => [...prev, userMsg]);
      setIsStreaming(true);

      // Add an empty model message that we'll stream into
      setMessages((prev) => [...prev, { role: 'model', text: '' }]);

      try {
        abortRef.current = new AbortController();

        const response = await streamChat({
          tutorProfile,
          message: text,
          history,
          language,
          image,
        });

        const reader = response.body?.getReader();

        if (!reader) {
          throw new Error('No reader available');
        }

        const decoder = new TextDecoder();
        let buffer = '';
        let fullText = '';

        while (true) {
          const { done, value } = await reader.read();

          if (done) break;

          buffer += decoder.decode(value, { stream: true });

          const lines = buffer.split('\n\n');
          // Keep the last potentially incomplete chunk
          buffer = lines.pop() ?? '';

          for (const line of lines) {
            const trimmed = line.trim();

            if (!trimmed.startsWith('data: ')) continue;

            const data = trimmed.slice(6);

            if (data === '[DONE]') continue;

            try {
              const parsed = JSON.parse(data) as { text?: string; error?: string };

              if (parsed.error) {
                fullText += `\n\n_Error: ${parsed.error}_`;
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];

                  if (last?.role === 'model') {
                    updated[updated.length - 1] = { ...last, text: fullText };
                  }

                  return updated;
                });
                continue;
              }

              if (parsed.text) {
                fullText += parsed.text;
                setMessages((prev) => {
                  const updated = [...prev];
                  const last = updated[updated.length - 1];

                  if (last?.role === 'model') {
                    updated[updated.length - 1] = { ...last, text: fullText };
                  }

                  return updated;
                });
              }
            } catch {
              // Skip malformed JSON chunks
            }
          }
        }

        // Save to localStorage (don't persist base64 images)
        const finalMessages: StoredMessage[] = [
          ...history,
          { role: 'user', text: image ? `[Image attached] ${text}` : text },
          { role: 'model', text: fullText },
        ];
        saveConversation(conversationId, finalMessages, tutorProfile);
        onSave?.();
      } catch (error) {
        // Update the model message with an error
        setMessages((prev) => {
          const updated = [...prev];
          const last = updated[updated.length - 1];

          if (last?.role === 'model' && !last.text) {
            updated[updated.length - 1] = {
              ...last,
              text: `_Sorry, something went wrong. Please try again._`,
            };
          }

          return updated;
        });

        console.error('Chat stream error:', error);
      } finally {
        setIsStreaming(false);
        abortRef.current = null;
      }
    },
    [conversationId, tutorProfile, language, onSave],
  );

  const clearMessages = useCallback(() => {
    setMessages([]);
  }, []);

  return { messages, isStreaming, sendMessage, appendMessage, clearMessages };
}
