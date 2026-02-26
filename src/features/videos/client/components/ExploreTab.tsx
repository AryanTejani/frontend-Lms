'use client';

import { VideoCard } from './VideoCard';
import type { Video } from '../../types';

interface ExploreTabProps {
  videos: Video[];
  isLoading: boolean;
}

export function ExploreTab({ videos, isLoading }: ExploreTabProps) {
  if (isLoading) {
    return (
      <div className="flex justify-center py-12">
        <div className="h-8 w-8 animate-spin rounded-full border-4 border-gray-200 border-t-blue-600" />
      </div>
    );
  }

  if (videos.length === 0) {
    return (
      <div className="flex justify-center py-12">
        <p className="label-1 label-1-medium text-(--color-text-tertiary)">No videos found</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-x-(--space-base) gap-y-(--space-2xl) sm:gap-y-(--space-4xl)">
      {videos.map((video) => (
        <VideoCard
          key={video.id}
          thumbnailUrl={video.thumbnailUrl}
          duration={video.duration}
          title={video.title}
          author={video.author}
          date={video.date}
          className="w-full"
        />
      ))}
    </div>
  );
}
