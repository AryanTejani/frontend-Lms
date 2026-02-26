'use client';

import { useState, useMemo } from 'react';
import { CloseIcon } from '@/assets/icons';
import { SearchInterface } from '../client/components/SearchInterface';
import { useAssistant } from '@/features/assistant/AssistantContext';

const AI_MENTORS = [
  { name: "William O'Neil", avatar: '/mentors/william-oneil.svg' },
  { name: 'Stan Weinstein', avatar: '/mentors/stan-weinstein.svg' },
  { name: 'Mark Minervini', avatar: '/mentors/mark-minervini.svg' },
  { name: 'Linda Raschke', avatar: '/mentors/linda-raschke.svg' },
];

const SEARCH_CHATS = [
  {
    id: '1',
    title: 'Momentum Ignition Signals',
    subtitle: 'with Stan Weinstein',
    mentorName: 'Stan Weinstein',
    isBookmarked: true,
  },
  {
    id: '2',
    title: 'Understanding Market Cycles',
    subtitle: 'with Mark Minervini',
    mentorName: 'Mark Minervini',
    isBookmarked: false,
  },
  {
    id: '3',
    title: 'Building a Sustainable Portfolio',
    subtitle: 'with Mark Minervini',
    mentorName: 'Mark Minervini',
    isBookmarked: false,
  },
  {
    id: '4',
    title: 'Leveraging Technology in Trading',
    subtitle: 'with Stan Weinstein',
    mentorName: 'Stan Weinstein',
    isBookmarked: true,
  },
  {
    id: '5',
    title: 'The Psychology of Trading',
    subtitle: 'with Mark Minervini',
    mentorName: 'Mark Minervini',
    isBookmarked: true,
  },
  {
    id: '6',
    title: 'Identifying High-Probability Setups',
    subtitle: 'with Stan Weinstein',
    mentorName: 'Stan Weinstein',
    isBookmarked: false,
  },
  {
    id: '7',
    title: 'Risk Management Strategies',
    subtitle: 'with Linda Raschke',
    mentorName: 'Linda Raschke',
    isBookmarked: true,
  },
  {
    id: '8',
    title: 'Technical Analysis: Tools for Traders',
    subtitle: "with William O'Neil",
    mentorName: "William O'Neil",
    isBookmarked: false,
  },
  {
    id: '9',
    title: 'The Role of News in Market Movement',
    subtitle: 'with Linda Raschke',
    mentorName: 'Linda Raschke',
    isBookmarked: true,
  },
  {
    id: '10',
    title: 'Creating a Winning Trading Plan',
    subtitle: 'with Mark Minervini',
    mentorName: 'Mark Minervini',
    isBookmarked: true,
  },
];

export function SearchView() {
  const { setSelectedMentor, setIsSearchOpen } = useAssistant();
  const [search, setSearch] = useState('');
  const [showSavedOnly, setShowSavedOnly] = useState(false);

  const filteredChats = useMemo(() => {
    let chats = SEARCH_CHATS;
    if (showSavedOnly) {
      chats = chats.filter((chat) => chat.isBookmarked);
    }
    if (search.trim()) {
      const query = search.toLowerCase();
      chats = chats.filter((chat) => chat.title.toLowerCase().includes(query));
    }
    return chats;
  }, [search, showSavedOnly]);

  const handleChatClick = (id: string) => {
    const chat = SEARCH_CHATS.find((c) => c.id === id);
    if (!chat) return;
    const mentor = AI_MENTORS.find((m) => m.name === chat.mentorName);
    if (mentor) setSelectedMentor(mentor);
  };

  return (
    <div className="relative flex flex-col h-full px-[200px] py-(--space-lg)">
      <button
        onClick={() => setIsSearchOpen(false)}
        className="absolute top-(--space-lg) right-(--space-lg) p-(--space-xs) text-(--color-text-secondary) hover:text-(--color-text-primary) transition-colors"
      >
        <CloseIcon className="w-5 h-5" />
      </button>

      <div className="max-w-[776px] mx-auto w-full flex flex-col h-full gap-(--space-base)">
        <SearchInterface
          searchValue={search}
          onSearchChange={setSearch}
          chats={filteredChats}
          onChatClick={handleChatClick}
          onSavedChatClick={() => setShowSavedOnly((prev) => !prev)}
          isSavedActive={showSavedOnly}
        />
      </div>
    </div>
  );
}
