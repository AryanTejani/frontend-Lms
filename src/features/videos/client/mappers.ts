import type { VideoRecord, Video } from '../types';

function formatDuration(seconds: number): string {
  const mins = Math.floor(seconds / 60);
  const secs = seconds % 60;
  return `${mins}:${String(secs).padStart(2, '0')}`;
}

function formatDate(dateStr: string): string {
  return new Intl.DateTimeFormat('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric',
  }).format(new Date(dateStr));
}

function getInstructorName(video: VideoRecord): string {
  if (!video.instructor) {
    return 'TraderLion';
  }

  const first = video.instructor.first_name ?? '';
  const last = video.instructor.last_name ?? '';
  const name = `${first} ${last}`.trim();
  return name || video.instructor.email;
}

export function mapVideoRecordToVideo(record: VideoRecord): Video {
  return {
    id: record.id,
    thumbnailUrl: record.thumbnail_url || '',
    duration: formatDuration(record.duration),
    title: record.title,
    author: getInstructorName(record),
    date: formatDate(record.created_at),
  };
}
