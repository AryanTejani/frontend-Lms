'use client';

import { PlaylistIcon, PlusIcon } from '@/assets/icons';
import { VideoLibraryCard } from './VideoLibraryCard';
import { collections } from '../../mockData';

export function MyCollectionsTab() {
  return (
    <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-(--space-base)">
      {collections.map((collection) => (
        <VideoLibraryCard
          key={collection.id}
          label={collection.name}
          icon={
            collection.type === 'create' ? (
              <PlusIcon className="icon-md text-(--color-text-primary)" />
            ) : (
              <PlaylistIcon className="icon-md text-(--color-action-primary)" />
            )
          }
          className="w-full h-[160px]"
        />
      ))}
    </div>
  );
}
