'use client';

import { VideoCard } from './VideoCard';
import type { Video } from '../../types';

interface ForYouTabProps {
  videos: Video[];
  isLoading: boolean;
}

export function ForYouTab({ videos, isLoading }: ForYouTabProps) {
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
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-(--space-base)">
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
