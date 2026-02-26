import type { Video, VideoSection, VideoCollection } from './types';

const allVideos: Video[] = [
  {
    id: '1',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    duration: '24:30',
    title: 'How to Find Leading Stocks',
    author: 'Mark Minervini',
    date: 'Jan 15, 2025',
  },
  {
    id: '2',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1590283603385-17ffb3a7f29f?w=600&h=400&fit=crop',
    duration: '18:45',
    title: 'Reading Volume Like a Pro',
    author: 'David Ryan',
    date: 'Jan 12, 2025',
  },
  {
    id: '3',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1642790106117-e829e14a795f?w=600&h=400&fit=crop',
    duration: '32:10',
    title: 'Position Sizing Strategies',
    author: 'Mark Ritchie II',
    date: 'Jan 10, 2025',
  },
  {
    id: '4',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1535320903710-d993d3d77d29?w=600&h=400&fit=crop',
    duration: '15:20',
    title: 'Breakout Pattern Recognition',
    author: 'Dan Zanger',
    date: 'Jan 8, 2025',
  },
  {
    id: '5',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1462556791646-c64b506b2a05?w=600&h=400&fit=crop',
    duration: '28:15',
    title: 'Mastering the Follow-Through Day',
    author: 'Mark Minervini',
    date: 'Jan 6, 2025',
  },
  {
    id: '6',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1468254095679-bbcba94a7066?w=600&h=400&fit=crop',
    duration: '21:40',
    title: 'Understanding Market Cycles',
    author: 'David Ryan',
    date: 'Jan 4, 2025',
  },
  {
    id: '7',
    thumbnailUrl: 'https://images.unsplash.com/photo-1559526324-4b87b5e36e44?w=600&h=400&fit=crop',
    duration: '19:55',
    title: 'Cutting Losses Quickly',
    author: 'Mark Ritchie II',
    date: 'Jan 2, 2025',
  },
  {
    id: '8',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1504607798333-52a30db54a5d?w=600&h=400&fit=crop',
    duration: '26:30',
    title: 'Chart Pattern Cheat Sheet',
    author: 'Dan Zanger',
    date: 'Dec 28, 2024',
  },
  {
    id: '9',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1614028674026-a65e31bfd27c?w=600&h=400&fit=crop',
    duration: '35:00',
    title: 'Building a Winning Watchlist',
    author: 'Mark Minervini',
    date: 'Dec 26, 2024',
  },
  {
    id: '10',
    thumbnailUrl: 'https://images.unsplash.com/photo-1553729459-uj0gx0a8mgk?w=600&h=400&fit=crop',
    duration: '22:10',
    title: 'Earnings Season Playbook',
    author: 'David Ryan',
    date: 'Dec 24, 2024',
  },
  {
    id: '11',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1616077168712-fc6c788db4af?w=600&h=400&fit=crop',
    duration: '17:25',
    title: 'The Power of Relative Strength',
    author: 'Mark Minervini',
    date: 'Dec 22, 2024',
  },
  {
    id: '12',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?w=600&h=400&fit=crop',
    duration: '29:50',
    title: 'Swing Trading vs Day Trading',
    author: 'Mark Ritchie II',
    date: 'Dec 20, 2024',
  },
  {
    id: '13',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1444653614773-995cb1ef9efa?w=600&h=400&fit=crop',
    duration: '20:15',
    title: 'Managing Trading Psychology',
    author: 'David Ryan',
    date: 'Dec 18, 2024',
  },
  {
    id: '14',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1591696205602-2f950c417cb9?w=600&h=400&fit=crop',
    duration: '23:40',
    title: 'Overcoming Fear and Greed',
    author: 'Mark Minervini',
    date: 'Dec 16, 2024',
  },
  {
    id: '15',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1565514020179-026b92b84bb6?w=600&h=400&fit=crop',
    duration: '31:05',
    title: 'Developing a Trading Routine',
    author: 'Mark Ritchie II',
    date: 'Dec 14, 2024',
  },
  {
    id: '16',
    thumbnailUrl:
      'https://images.unsplash.com/photo-1611974789855-9c2a0a7236a3?w=600&h=400&fit=crop',
    duration: '27:30',
    title: 'Staying Disciplined in Volatile Markets',
    author: 'Dan Zanger',
    date: 'Dec 12, 2024',
  },
];

export const forYouSections: VideoSection[] = [
  {
    title: 'Continue Watching',
    videos: allVideos.slice(0, 4),
  },
  {
    title: 'Recommended for You',
    videos: allVideos.slice(4, 8),
  },
  {
    title: 'Market Analysis & Insights',
    videos: allVideos.slice(8, 12),
  },
  {
    title: 'Trading Psychology & Mindset',
    videos: allVideos.slice(12, 16),
  },
];

export const exploreVideos: Video[] = allVideos.slice(0, 12);

export const collections: VideoCollection[] = [
  { id: '1', name: 'Create Playlist', type: 'create' },
  { id: '2', name: 'Favorite Setups', type: 'collection' },
  { id: '3', name: 'Stage Analysis', type: 'collection' },
  { id: '4', name: 'Risk Management', type: 'collection' },
  { id: '5', name: 'Saved Videos', type: 'collection' },
];
