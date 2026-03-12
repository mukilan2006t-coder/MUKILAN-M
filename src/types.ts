import { LucideIcon } from 'lucide-react';

export type Rarity = 'Legendary' | 'Epic' | 'Normal';

export interface Card {
  id: string;
  name: string;
  rarity: Rarity;
  image: string;
  description: string;
}

export interface MediaItem {
  id: string;
  title: string;
  type: 'movie' | 'song' | 'anime';
  genre: string;
  language: string;
  thumbnail: string;
  description: string;
  duration?: string;
  year: number;
}

export interface UserState {
  completedAnime: string[];
  collectedCards: string[];
  spinsAvailable: number;
}
