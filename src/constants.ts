import { Card, MediaItem } from './types';

export const CARDS: Card[] = [
  // 3 Legendary
  { id: 'l1', name: 'Golden Dragon', rarity: 'Legendary', image: 'https://picsum.photos/seed/dragon/400/600', description: 'The ultimate symbol of power.' },
  { id: 'l2', name: 'Phoenix Rebirth', rarity: 'Legendary', image: 'https://picsum.photos/seed/phoenix/400/600', description: 'Eternal life in card form.' },
  { id: 'l3', name: 'Celestial Empress', rarity: 'Legendary', image: 'https://picsum.photos/seed/empress/400/600', description: 'Ruler of the card realm.' },
  
  // 2 Epic
  { id: 'e1', name: 'Silver Knight', rarity: 'Epic', image: 'https://picsum.photos/seed/knight/400/600', description: 'A noble protector.' },
  { id: 'e2', name: 'Shadow Assassin', rarity: 'Epic', image: 'https://picsum.photos/seed/assassin/400/600', description: 'Strikes from the dark.' },
  
  // 25 Normal
  ...Array.from({ length: 25 }).map((_, i) => ({
    id: `n${i + 1}`,
    name: `Warrior #${i + 1}`,
    rarity: 'Normal' as const,
    image: `https://picsum.photos/seed/warrior${i}/400/600`,
    description: 'A common but brave fighter.'
  }))
];

export const MEDIA_ITEMS: MediaItem[] = [
  // Anime
  { id: 'a1', title: 'Cyber Samurai', type: 'anime', genre: 'Action', language: 'Japanese', thumbnail: 'https://picsum.photos/seed/cyber/800/450', description: 'A ronin in a neon future.', year: 2024 },
  { id: 'a2', title: 'Spirit Bound', type: 'anime', genre: 'Fantasy', language: 'Japanese', thumbnail: 'https://picsum.photos/seed/spirit/800/450', description: 'Two souls connected by fate.', year: 2023 },
  { id: 'a3', title: 'Mecha Storm', type: 'anime', genre: 'Sci-Fi', language: 'Japanese', thumbnail: 'https://picsum.photos/seed/mecha/800/450', description: 'Giant robots save the world.', year: 2024 },
  { id: 'a4', title: 'Ninja Echo', type: 'anime', genre: 'Action', language: 'Japanese', thumbnail: 'https://picsum.photos/seed/ninja/800/450', description: 'The silent path of a warrior.', year: 2022 },
  
  // Movies
  { id: 'm1', title: 'Midnight City', type: 'movie', genre: 'Thriller', language: 'English', thumbnail: 'https://picsum.photos/seed/city/800/450', description: 'Dark secrets in the big city.', year: 2023 },
  { id: 'm2', title: 'Ocean Deep', type: 'movie', genre: 'Adventure', language: 'French', thumbnail: 'https://picsum.photos/seed/ocean/800/450', description: 'A journey to the unknown.', year: 2024 },
  { id: 'm3', title: 'Desert Rose', type: 'movie', genre: 'Drama', language: 'Arabic', thumbnail: 'https://picsum.photos/seed/desert/800/450', description: 'Love in the dunes.', year: 2022 },
  
  // Songs
  { id: 's1', title: 'Neon Dreams', type: 'song', genre: 'Synthwave', language: 'English', thumbnail: 'https://picsum.photos/seed/neon/800/450', description: 'Retro vibes for late nights.', year: 2024 },
  { id: 's2', title: 'Rainy Day', type: 'song', genre: 'Lo-fi', language: 'Korean', thumbnail: 'https://picsum.photos/seed/rain/800/450', description: 'Chill beats to study to.', year: 2023 },
  { id: 's3', title: 'Electric Heart', type: 'song', genre: 'Pop', language: 'Spanish', thumbnail: 'https://picsum.photos/seed/heart/800/450', description: 'High energy dance track.', year: 2024 },
];
