export interface VideoInstructor {
  id: string;
  first_name: string | null;
  last_name: string | null;
  email: string;
}

export interface VideoCategory {
  id: string;
  name: string;
  slug: string;
}

export interface VideoRecord {
  id: string;
  bunny_video_id: string;
  title: string;
  description: string | null;
  thumbnail_url: string | null;
  duration: number;
  bunny_library_type: string;
  instructor_id: string;
  category_id: string | null;
  is_published: boolean;
  published_at: string | null;
  sort_order: number;
  created_at: string;
  updated_at: string;
  deleted_at: string | null;
  instructor?: VideoInstructor;
  category?: VideoCategory | null;
  embed_url?: string;
}

export interface Video {
  id: string;
  thumbnailUrl: string;
  duration: string;
  title: string;
  author: string;
  date: string;
}

export interface VideoSection {
  title: string;
  videos: Video[];
}

export interface VideoCollection {
  id: string;
  name: string;
  type: 'create' | 'collection';
}

export interface PaginatedVideoResponse {
  data: VideoRecord[];
  total: number;
  page: number;
  limit: number;
}

export interface VideosQueryParams {
  page?: number;
  limit?: number;
  category_id?: string;
}
