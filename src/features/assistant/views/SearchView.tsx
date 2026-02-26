'use client';

import { useState, useMemo, useEffect } from 'react';
import { CloseIcon } from '@/assets/icons';
import { SearchInterface } from '../client/components/SearchInterface';
import { useAssistant } from '@/features/assistant/AssistantContext';
import { listConversations, type StoredConversation } from '../client/storage';

export function SearchView() {
  const { setIsSearchOpen, loadConversation, conversationVersion } = useAssistant();
  const [search, setSearch] = useState('');
  const [conversations, setConversations] = useState<StoredConversation[]>([]);

  useEffect(() => {
    setConversations(listConversations());
  }, [conversationVersion]);

  const filteredChats = useMemo(() => {
    const chats = conversations.map((c) => ({
      id: c.id,
      title: c.title,
      subtitle: `with ${c.tutorProfile}`,
    }));

    if (!search.trim()) return chats;

    const query = search.toLowerCase();
    return chats.filter((chat) => chat.title.toLowerCase().includes(query));
  }, [search, conversations]);

  const handleChatClick = (id: string) => {
    const conversation = conversations.find((c) => c.id === id);
    if (!conversation) return;
    loadConversation(conversation.id, conversation.tutorProfile);
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
        />
      </div>
    </div>
  );
}
