'use client';

import Image from 'next/image';
import { ContentCopyIcon, ThumbsUpIcon, ThumbsDownIcon } from '@/assets/icons';
import { Button, Chatbox } from '@/components/ui';
import { MessageBox } from '../client/components/MessageBox';
import { useAssistant } from '@/features/assistant/AssistantContext';

interface MessageGroup {
  userMessage: string;
  aiResponse: string;
}

const STATIC_MESSAGES: MessageGroup[] = [
  {
    userMessage: 'What is photosynthesis?',
    aiResponse: `Photosynthesis is the process by which plants make their own food using sunlight, water, and air.

Think of it like this — imagine a mango tree in your village. Every day, the tree's leaves catch sunlight like tiny solar panels. At the same time, the roots pull up water from the soil, and tiny holes in the leaves (called stomata) take in air.

Inside the leaf, the green color (called chlorophyll) uses the sunlight's energy to mix the water and air together. This creates sugar — which is the tree's food — and releases fresh oxygen into the air for us to breathe!

The simple formula is:
Sunlight + Water + Carbon Dioxide → Sugar (food for plant) + Oxygen

So every time you sit under a tree and feel cool, remember — the tree is busy making its own food and giving you fresh air at the same time!

Key points to remember:
1. Plants need sunlight, water, and carbon dioxide for photosynthesis
2. Chlorophyll (the green pigment) captures sunlight
3. Food is made as glucose (sugar)
4. Oxygen is released as a by-product — the air we breathe`,
  },
];

function ResponseActions() {
  return (
    <div className="flex items-center gap-(--space-xs) pt-(--space-sm)">
      <Button variant="no-border">Save note</Button>
      <button
        type="button"
        className="flex items-center justify-center size-8 bg-transparent border-none cursor-pointer text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
        aria-label="Copy"
      >
        <ContentCopyIcon className="icon-sm" />
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

export function ChatView() {
  const { selectedMentor } = useAssistant();

  if (!selectedMentor) return null;

  return (
    <div className="flex flex-col h-screen overflow-hidden">
      {/* Chat Header */}
      <div className="shrink-0 flex items-center justify-between px-(--space-base) py-(--space-sm) border-b border-(--color-bg-tertiary)">
        <div className="flex items-center gap-(--space-xs)">
          <Image
            src={selectedMentor.avatar}
            alt={selectedMentor.name}
            width={48}
            height={48}
            className="rounded-full"
          />
          <h6 className="h6 h6-semibold text-(--color-text-primary)">{selectedMentor.name}</h6>
        </div>
        <Button variant="no-border">Save chat</Button>
      </div>

      {/* Messages Area */}
      <div className="flex-1 overflow-y-auto min-h-0">
        <div className="max-w-[800px] mx-auto pt-(--space-base) pb-(--space-lg) flex flex-col gap-(--space-lg) px-(--space-base)">
          {STATIC_MESSAGES.map((group, index) => (
            <div key={index} className="flex flex-col gap-(--space-lg)">
              {/* User message */}
              <MessageBox variant="user">{group.userMessage}</MessageBox>

              {/* AI response + actions */}
              <div>
                <div className="label-2 label-2-medium text-(--color-text-secondary) whitespace-pre-line">
                  {group.aiResponse}
                </div>
                <ResponseActions />
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Chat Input */}
      <div className="shrink-0 max-w-[800px] mx-auto w-full px-(--space-base) pb-(--space-lg) pt-(--space-sm)">
        <Chatbox
          variant="compact"
          placeholder="Ask your question in any language..."
        />
      </div>
    </div>
  );
}
