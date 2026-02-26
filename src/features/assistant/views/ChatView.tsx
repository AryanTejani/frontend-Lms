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
    userMessage: 'Tell me about can slim methodology',
    aiResponse: `CAN SLIM is a growth stock investment strategy developed by William J. O'Neil, founder of Investor's Business Daily (IBD). It is a systematic approach to selecting stocks based on both fundamental and technical criteria. The acronym CAN SLIM stands for:

C – Current Quarterly Earnings: Look for companies with significant earnings growth in the most recent quarter compared to the same quarter a year ago.

A – Annual Earnings Growth: Seek companies with strong annual earnings growth over the past five years.

N – New Products, Management, or Price Highs: Favor companies with new innovations, leadership, or stocks reaching new price highs.

S – Supply and Demand: Consider stocks with lower share counts or strong trading volume increases as a sign of demand.

L – Leader or Laggard: Focus on market leaders in strong industries, not laggards.

I – Institutional Sponsorship: Prefer stocks with increasing ownership by mutual funds and institutional investors.

M – Market Direction: Pay attention to the overall market trend, as most stocks follow the general market direction.`,
  },
  {
    userMessage: 'What are the key features of CAN SLIM methodology?',
    aiResponse: `Key Features:

1. Combines fundamental analysis (earnings, revenue) with technical analysis (chart patterns, volume).
2. Emphasizes buying stocks at the right time, particularly as they break out of sound base patterns.
3. Includes strict sell rules and risk management to protect gains and limit losses (typically selling if a stock drops 7-8% below the purchase price).
4. Uses market timing by evaluating the general market direction before making individual stock trades.

How Investors Use CAN SLIM:

Investors screen for stocks meeting all seven CAN SLIM criteria, use chart analysis to time their entries, and follow disciplined sell rules to manage risk. The strategy is particularly effective in bull markets and focuses on identifying potential market leaders before they make major price advances.`,
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
          placeholder="Ask about strategies, risk management, chart patterns..."
        />
      </div>
    </div>
  );
}
