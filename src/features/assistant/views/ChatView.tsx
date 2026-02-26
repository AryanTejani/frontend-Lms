'use client';

import { useRef, useEffect, useState, useCallback } from 'react';
import Image from 'next/image';
import {
  ContentCopyIcon,
  ThumbsUpIcon,
  ThumbsDownIcon,
  VolumeUpIcon,
  PauseIcon,
  MicIcon,
  UploadIcon,
  CheckCircleIcon,
} from '@/assets/icons';
import { Button, Chatbox } from '@/components/ui';
import { MessageBox } from '../client/components/MessageBox';
import { QuizBlock } from '../client/components/QuizBlock';
import { useAssistant } from '@/features/assistant/AssistantContext';
import { useChat, type ChatMessageImage } from '../client/hooks/useChat';
import { useSpeech } from '../client/hooks/useSpeech';
import { useVoiceInput } from '../client/hooks/useVoiceInput';
import { generateQuiz } from '../client/api';
import { useTtsStore } from '@/stores/ttsStore';

interface ResponseActionsProps {
  text: string;
  onSpeak: () => void;
  onStop: () => void;
  isSpeaking: boolean;
  isLoadingTts: boolean;
  onQuiz: () => void;
  isGeneratingQuiz: boolean;
}

function ResponseActions({ text, onSpeak, onStop, isSpeaking, isLoadingTts, onQuiz, isGeneratingQuiz }: ResponseActionsProps) {
  const handleCopy = (): void => {
    void navigator.clipboard.writeText(text);
  };

  return (
    <div className="flex items-center gap-(--space-xs) pt-(--space-sm)">
      <button
        type="button"
        onClick={handleCopy}
        className="flex items-center justify-center size-8 bg-transparent border-none cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        aria-label="Copy"
      >
        <ContentCopyIcon className="icon-sm" />
      </button>
      <button
        type="button"
        onClick={isSpeaking ? onStop : onSpeak}
        disabled={isLoadingTts}
        className={`flex items-center justify-center size-8 bg-transparent border-none cursor-pointer transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${
          isSpeaking
            ? 'text-(--color-accent-green) animate-pulse'
            : isLoadingTts
              ? 'text-(--color-text-tertiary)'
              : 'text-(--color-text-secondary) hover:text-(--color-text-primary)'
        }`}
        aria-label={isLoadingTts ? 'Loading voice...' : isSpeaking ? 'Stop speaking' : 'Read aloud'}
      >
        {isSpeaking ? <PauseIcon className="icon-sm" /> : <VolumeUpIcon className="icon-sm" />}
      </button>
      <button
        type="button"
        onClick={onQuiz}
        disabled={isGeneratingQuiz}
        className="flex items-center justify-center size-8 bg-transparent border-none cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
        aria-label="Generate quiz"
      >
        <CheckCircleIcon className="icon-sm" />
      </button>
      <button
        type="button"
        className="flex items-center justify-center size-8 bg-transparent border-none cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        aria-label="Thumbs up"
      >
        <ThumbsUpIcon className="icon-sm" />
      </button>
      <button
        type="button"
        className="flex items-center justify-center size-8 bg-transparent border-none cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        aria-label="Thumbs down"
      >
        <ThumbsDownIcon className="icon-sm" />
      </button>
    </div>
  );
}

function TypingIndicator() {
  return (
    <div className="flex items-center gap-1 px-(--space-base) py-(--space-sm)">
      <span className="size-2 rounded-full bg-(--color-text-secondary) animate-bounce [animation-delay:0ms]" />
      <span className="size-2 rounded-full bg-(--color-text-secondary) animate-bounce [animation-delay:150ms]" />
      <span className="size-2 rounded-full bg-(--color-text-secondary) animate-bounce [animation-delay:300ms]" />
    </div>
  );
}

const MAX_IMAGE_SIZE = 4 * 1024 * 1024; // 4MB

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;

  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;

  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function processImageFile(file: File, onImage: (img: ChatMessageImage & { name: string; size: number }) => void): void {
  if (file.size > MAX_IMAGE_SIZE) {
    console.warn('Image must be less than 4MB');
    return;
  }

  if (!file.type.startsWith('image/')) return;

  const reader = new FileReader();

  reader.onload = () => {
    const result = reader.result as string;
    const base64 = result.split(',')[1] ?? '';
    onImage({
      base64,
      mimeType: file.type as 'image/jpeg' | 'image/png' | 'image/webp',
      name: file.name,
      size: file.size,
    });
  };

  reader.readAsDataURL(file);
}

export function ChatView() {
  const { selectedMentor, selectedGpt, conversationId, pendingMessage, clearPendingMessage, bumpConversationVersion } = useAssistant();
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const chatAreaRef = useRef<HTMLDivElement>(null);

  const tutor = selectedMentor ?? selectedGpt;
  const tutorName = selectedMentor?.name ?? (selectedGpt ? `${selectedGpt.name}` : '');

  const { messages, isStreaming, sendMessage, appendMessage } = useChat({
    conversationId,
    tutorProfile: tutorName,
    onSave: bumpConversationVersion,
  });

  // TTS
  const { isSpeaking, isLoading: isLoadingTts, speak, stop: stopSpeaking } = useSpeech();
  const ttsGender = useTtsStore((s) => s.gender);
  const setTtsGender = useTtsStore((s) => s.setGender);
  const [speakingIndex, setSpeakingIndex] = useState<number | null>(null);

  const handleSpeak = useCallback(
    (text: string, index: number) => {
      setSpeakingIndex(index);
      speak(text, undefined, ttsGender);
    },
    [speak, ttsGender],
  );

  const handleStopSpeaking = useCallback(() => {
    stopSpeaking();
    setSpeakingIndex(null);
  }, [stopSpeaking]);

  useEffect(() => {
    if (!isSpeaking) {
      setSpeakingIndex(null);
    }
  }, [isSpeaking]);

  // STT — wire transcript to chatbox input
  const [voiceText, setVoiceText] = useState('');

  const handleVoiceResult = useCallback(
    (transcript: string) => {
      setVoiceText('');
      void sendMessage(transcript);
    },
    [sendMessage],
  );

  const { isListening, transcript, startListening, stopListening, isSupported: sttSupported } = useVoiceInput({
    onResult: handleVoiceResult,
  });

  // Update voiceText with interim transcript
  useEffect(() => {
    if (isListening && transcript) {
      setVoiceText(transcript);
    }

    if (!isListening) {
      setVoiceText('');
    }
  }, [transcript, isListening]);

  // Image upload state with metadata
  const [pendingImage, setPendingImage] = useState<(ChatMessageImage & { name?: string; size?: number }) | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isAnalyzingImage, setIsAnalyzingImage] = useState(false);

  const handleImageReady = useCallback((img: ChatMessageImage & { name: string; size: number }) => {
    setPendingImage(img);
  }, []);

  const handleImageSelect = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];

      if (!file) return;

      processImageFile(file, handleImageReady);
      e.target.value = '';
    },
    [handleImageReady],
  );

  // Drag and drop handlers
  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      const file = e.dataTransfer.files[0];

      if (file) {
        processImageFile(file, handleImageReady);
      }
    },
    [handleImageReady],
  );

  // Clipboard paste handler (Ctrl+V)
  useEffect(() => {
    const handlePaste = (e: ClipboardEvent): void => {
      const items = e.clipboardData?.items;

      if (!items) return;

      for (let i = 0; i < items.length; i++) {
        const item = items[i];

        if (item?.type.startsWith('image/')) {
          e.preventDefault();
          const file = item.getAsFile();

          if (file) {
            processImageFile(file, handleImageReady);
          }

          break;
        }
      }
    };

    const el = chatAreaRef.current;

    el?.addEventListener('paste', handlePaste);

    return () => {
      el?.removeEventListener('paste', handlePaste);
    };
  }, [handleImageReady]);

  const handleSubmit = useCallback(
    (text: string) => {
      if (pendingImage) {
        setIsAnalyzingImage(true);
      }

      void sendMessage(text, pendingImage ?? undefined).finally(() => {
        setIsAnalyzingImage(false);
      });

      setPendingImage(null);
    },
    [sendMessage, pendingImage],
  );

  // Quiz generation
  const [isGeneratingQuiz, setIsGeneratingQuiz] = useState(false);

  const handleGenerateQuiz = useCallback(
    async (contextText: string) => {
      if (isGeneratingQuiz || !conversationId) return;

      setIsGeneratingQuiz(true);

      try {
        const lastUserMsg = [...messages].reverse().find((m) => m.role === 'user');
        const topic = lastUserMsg?.text ?? contextText;

        const quiz = await generateQuiz({
          tutorProfile: tutorName,
          topic,
          language: 'en',
        });

        appendMessage({ role: 'model', text: '', quiz });
      } catch (error) {
        console.error('Quiz generation error:', error);
        appendMessage({ role: 'model', text: '_Failed to generate quiz. Please try again._' });
      } finally {
        setIsGeneratingQuiz(false);
      }
    },
    [isGeneratingQuiz, conversationId, messages, tutorName, appendMessage],
  );

  // Send pending message from context (set when user starts a new chat)
  const pendingSent = useRef(false);

  useEffect(() => {
    if (pendingSent.current || !conversationId || !pendingMessage || isStreaming) return;

    pendingSent.current = true;
    clearPendingMessage();
    void sendMessage(pendingMessage);
  }, [conversationId, pendingMessage, isStreaming, sendMessage, clearPendingMessage]);

  // Reset pendingSent flag when conversationId changes (new conversation)
  useEffect(() => {
    pendingSent.current = false;
  }, [conversationId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    const el = scrollRef.current;

    if (el) {
      el.scrollTop = el.scrollHeight;
    }
  }, [messages]);

  if (!tutor) return null;

  const chatboxValue = isListening ? voiceText : undefined;

  const leftActions = (
    <>
      {sttSupported && (
        <button
          type="button"
          onClick={isListening ? stopListening : () => startListening('hi-IN')}
          className={`flex items-center justify-center size-8 border-none cursor-pointer transition-colors rounded-lg ${
            isListening
              ? 'bg-red-500/20 text-red-500'
              : 'bg-transparent text-(--color-text-secondary) hover:text-(--color-text-primary)'
          }`}
          aria-label={isListening ? 'Stop listening' : 'Start voice input'}
        >
          <MicIcon className="icon-sm" />
          {isListening && (
            <span className="absolute top-0.5 right-0.5 size-2 rounded-full bg-red-500 animate-pulse" />
          )}
        </button>
      )}
      <button
        type="button"
        onClick={() => fileInputRef.current?.click()}
        className="flex items-center justify-center size-8 bg-transparent border-none cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors rounded-lg"
        aria-label="Upload image"
      >
        <UploadIcon className="icon-sm" />
      </button>
      <input
        ref={fileInputRef}
        type="file"
        accept="image/jpeg,image/png,image/webp"
        capture="environment"
        onChange={handleImageSelect}
        className="hidden"
      />
    </>
  );

  return (
    <div
      ref={chatAreaRef}
      className="flex flex-col h-screen overflow-hidden relative"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-40 flex items-center justify-center bg-(--color-bg-primary)/80 backdrop-blur-sm border-2 border-dashed border-(--color-accent-green) rounded-xl pointer-events-none">
          <div className="flex flex-col items-center gap-(--space-sm)">
            <UploadIcon className="w-12 h-12 text-(--color-accent-green)" />
            <p className="label-1 label-1-medium text-(--color-accent-green)">Drop image here</p>
          </div>
        </div>
      )}

      {/* Chat Header */}
      <div className="shrink-0 flex items-center justify-between px-(--space-base) py-(--space-sm) border-b border-(--color-bg-tertiary)">
        <div className="flex items-center gap-(--space-xs)">
          {selectedMentor?.avatar && (
            <Image
              src={selectedMentor.avatar}
              alt={selectedMentor.name}
              width={48}
              height={48}
              className="rounded-full"
            />
          )}
          <h6 className="h6 h6-semibold text-(--color-text-primary)">{tutorName}</h6>
        </div>
        <div className="flex items-center gap-(--space-sm)">
          <button
            type="button"
            onClick={() => setTtsGender(ttsGender === 'female' ? 'male' : 'female')}
            className="flex items-center gap-(--space-xs2) px-(--space-sm) py-(--space-xs2) rounded-full bg-(--color-bg-secondary) border border-(--color-bg-tertiary) cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
            aria-label={`Voice: ${ttsGender}. Click to switch.`}
          >
            <VolumeUpIcon className="icon-xs" />
            <span className="label-3 label-3-medium capitalize">{ttsGender}</span>
          </button>
          <Button variant="no-border">Save chat</Button>
        </div>
      </div>

      {/* Messages Area */}
      <div ref={scrollRef} className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-[800px] mx-auto pt-(--space-base) pb-(--space-lg) flex flex-col gap-(--space-lg) px-(--space-base)">
          {messages.map((msg, index) => (
            <div key={index} className="flex flex-col gap-(--space-sm)">
              {msg.role === 'user' ? (
                <div className="flex flex-col gap-(--space-xs)">
                  {msg.image && (
                    <div className="self-end">
                      <img
                        src={`data:${msg.image.mimeType};base64,${msg.image.base64}`}
                        alt="Uploaded"
                        className="max-w-[200px] max-h-[200px] rounded-lg object-cover border border-(--color-bg-tertiary)"
                      />
                    </div>
                  )}
                  <MessageBox variant="user">{msg.text}</MessageBox>
                </div>
              ) : (
                <div>
                  {msg.quiz ? (
                    <QuizBlock quiz={msg.quiz} />
                  ) : (
                    <>
                      <div className="label-2 label-2-medium text-(--color-text-secondary) whitespace-pre-line">
                        {msg.text || (isStreaming ? <TypingIndicator /> : null)}
                      </div>
                      {msg.text && !isStreaming && (
                        <ResponseActions
                          text={msg.text}
                          onSpeak={() => handleSpeak(msg.text, index)}
                          onStop={handleStopSpeaking}
                          isSpeaking={isSpeaking && speakingIndex === index}
                          isLoadingTts={isLoadingTts && speakingIndex === index}
                          onQuiz={() => void handleGenerateQuiz(msg.text)}
                          isGeneratingQuiz={isGeneratingQuiz}
                        />
                      )}
                    </>
                  )}
                </div>
              )}
            </div>
          ))}
          {isStreaming && messages.length > 0 && messages[messages.length - 1]?.role === 'user' && (
            <TypingIndicator />
          )}
          {isAnalyzingImage && (
            <div className="flex items-center gap-(--space-xs) px-(--space-base) py-(--space-sm) text-(--color-text-secondary)">
              <span className="size-2 rounded-full bg-(--color-accent-green) animate-pulse" />
              <span className="label-2 label-2-regular">Analyzing image...</span>
            </div>
          )}
        </div>
      </div>

      {/* Image Preview */}
      {pendingImage && (
        <div className="shrink-0 max-w-[800px] mx-auto w-full px-(--space-base)">
          <div className="flex items-center gap-(--space-sm) py-(--space-xs) px-(--space-sm) rounded-lg bg-(--color-bg-inactive) border border-(--color-bg-tertiary)">
            <img
              src={`data:${pendingImage.mimeType};base64,${pendingImage.base64}`}
              alt="Preview"
              className="h-20 w-20 rounded-lg object-cover border border-(--color-bg-tertiary)"
            />
            <div className="flex flex-col gap-0.5 flex-1 min-w-0">
              {pendingImage.name && (
                <span className="label-2 label-2-medium text-(--color-text-primary) truncate">
                  {pendingImage.name}
                </span>
              )}
              {pendingImage.size && (
                <span className="label-2 label-2-regular text-(--color-text-secondary)">
                  {formatFileSize(pendingImage.size)}
                </span>
              )}
            </div>
            <button
              type="button"
              onClick={() => setPendingImage(null)}
              className="label-2 label-2-medium text-red-500 bg-transparent border-none cursor-pointer hover:text-red-400 shrink-0"
            >
              Remove
            </button>
          </div>
        </div>
      )}

      {/* Chat Input */}
      <div className="shrink-0 max-w-[800px] mx-auto w-full px-(--space-base) pb-(--space-lg) pt-(--space-sm)">
        <Chatbox
          variant="compact"
          placeholder={isListening ? 'Listening... speak now' : 'Ask your question in any language...'}
          onSubmit={handleSubmit}
          value={chatboxValue}
          leftActions={leftActions}
        />
      </div>
    </div>
  );
}
