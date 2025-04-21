import React, { createContext, useContext, useState, useEffect } from 'react';

export interface Game {
  id: string;
  title: string;
  description: string;
  price: number;
  salePrice?: number;
  discount?: number;
  image: string;
  screenshots: string[];
  releaseDate: string;
  developer: string;
  publisher: string;
  genres: string[];
  platforms: string[];
  rating: number;
  reviews: number;
}

interface GameContextType {
  games: Game[];
  featuredGames: Game[];
  newReleases: Game[];
  onSale: Game[];
  getGameById: (id: string) => Game | undefined;
  getGamesByGenre: (genre: string) => Game[];
  getGamesByPlatform: (platform: string) => Game[];
  searchGames: (query: string) => Game[];
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<Game[]>([]);
  const [featuredGames, setFeaturedGames] = useState<Game[]>([]);
  const [newReleases, setNewReleases] = useState<Game[]>([]);
  const [onSale, setOnSale] = useState<Game[]>([]);

  useEffect(() => {
    // In a real app, you would fetch this data from an API
    // For the demo, we'll use mock data
    const mockGames: Game[] = [
      {
        id: '1',
        title: 'Cyber Odyssey 2077',
        description: 'An open-world, action-adventure RPG set in a dystopian future where cybernetic enhancements are the norm. Navigate through a corrupt city, complete missions, and uncover a conspiracy that threatens to change the world.',
        price: 59.99,
        salePrice: 39.99,
        discount: 33,
        image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        screenshots: [
          'https://images.pexels.com/photos/3165335/pexels-photo-3165335.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/7915437/pexels-photo-7915437.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        releaseDate: '2023-11-15',
        developer: 'Nexus Studios',
        publisher: 'Alpha Games',
        genres: ['RPG', 'Action', 'Open World'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
        rating: 4.8,
        reviews: 1256,
      },
      {
        id: '2',
        title: 'Ethereal Legends',
        description: 'Embark on an epic fantasy adventure through mystical realms. Wield powerful magic, battle legendary creatures, and fulfill an ancient prophecy to save the world from darkness.',
        price: 49.99,
        image: 'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        screenshots: [
          'https://images.pexels.com/photos/7919/pexels-photo.jpg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/3568520/pexels-photo-3568520.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/4348798/pexels-photo-4348798.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        releaseDate: '2024-01-22',
        developer: 'Fantasy Realms',
        publisher: 'Mystic Interactive',
        genres: ['RPG', 'Fantasy', 'Adventure'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'],
        rating: 4.5,
        reviews: 823,
      },
      {
        id: '3',
        title: 'Velocity Rivals',
        description: 'Experience the thrill of high-speed racing in this adrenaline-pumping game. Customize your vehicles, race through stunning environments, and compete against players worldwide for the championship title.',
        price: 39.99,
        salePrice: 19.99,
        discount: 50,
        image: 'https://images.pexels.com/photos/1034807/pexels-photo-1034807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        screenshots: [
          'https://images.pexels.com/photos/1034807/pexels-photo-1034807.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1687147/pexels-photo-1687147.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/12358460/pexels-photo-12358460.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        releaseDate: '2023-08-30',
        developer: 'Speed Demons',
        publisher: 'Turbo Games',
        genres: ['Racing', 'Sports', 'Multiplayer'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
        rating: 4.2,
        reviews: 567,
      },
      {
        id: '4',
        title: 'Tactical Warfare',
        description: 'Lead your elite squad through intense tactical combat missions. Develop strategies, upgrade your team, and make critical decisions that impact the outcome of each operation in this military strategy game.',
        price: 29.99,
        image: 'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        screenshots: [
          'https://images.pexels.com/photos/163036/mario-luigi-yoschi-figures-163036.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/2990644/pexels-photo-2990644.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/3772623/pexels-photo-3772623.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        releaseDate: '2024-03-05',
        developer: 'Strategic Minds',
        publisher: 'Tactical Games',
        genres: ['Strategy', 'Military', 'Tactical'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
        rating: 4.6,
        reviews: 389,
      },
      {
        id: '5',
        title: 'Cosmic Explorers',
        description: 'Journey across the universe in this space exploration game. Discover new planets, encounter alien species, build colonies, and unravel the mysteries of the cosmos in an ever-expanding procedurally generated galaxy.',
        price: 44.99,
        salePrice: 29.99,
        discount: 33,
        image: 'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        screenshots: [
          'https://images.pexels.com/photos/2156881/pexels-photo-2156881.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/6498294/pexels-photo-6498294.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        releaseDate: '2023-12-12',
        developer: 'Stellar Studios',
        publisher: 'Galactic Games',
        genres: ['Simulation', 'Adventure', 'Space'],
        platforms: ['PC', 'PlayStation 5'],
        rating: 4.4,
        reviews: 712,
      },
      {
        id: '6',
        title: 'Shadow Assassins',
        description: 'Master the art of stealth and assassination in this action-packed game. Take on contracts, eliminate targets, and navigate a world of intrigue and betrayal as you rise through the ranks of an elite assassin guild.',
        price: 54.99,
        image: 'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        screenshots: [
          'https://images.pexels.com/photos/442576/pexels-photo-442576.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/1670977/pexels-photo-1670977.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/7915509/pexels-photo-7915509.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        releaseDate: '2024-02-28',
        developer: 'Stealth Works',
        publisher: 'Midnight Games',
        genres: ['Action', 'Stealth', 'Adventure'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S'],
        rating: 4.7,
        reviews: 946,
      },
      {
        id: '7',
        title: 'Monster Hunter Chronicles',
        description: 'Explore a vast fantasy world filled with dangerous creatures. Hunt monsters, craft powerful gear from their parts, and become a legendary hunter in this action-packed RPG adventure.',
        price: 49.99,
        image: 'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        screenshots: [
          'https://images.pexels.com/photos/371924/pexels-photo-371924.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/7915551/pexels-photo-7915551.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/993588/pexels-photo-993588.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        releaseDate: '2023-09-18',
        developer: 'Creature Studios',
        publisher: 'Fantasy Games',
        genres: ['Action', 'RPG', 'Adventure'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch'],
        rating: 4.5,
        reviews: 1023,
      },
      {
        id: '8',
        title: 'Puzzle Dimensions',
        description: 'Challenge your mind with innovative puzzles that manipulate space, time, and physics. Navigate through increasingly complex environments and unlock new abilities as you progress through this mind-bending puzzle game.',
        price: 24.99,
        salePrice: 14.99,
        discount: 40,
        image: 'https://images.pexels.com/photos/2531608/pexels-photo-2531608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        screenshots: [
          'https://images.pexels.com/photos/2531608/pexels-photo-2531608.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/3082341/pexels-photo-3082341.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
          'https://images.pexels.com/photos/4144179/pexels-photo-4144179.jpeg?auto=compress&cs=tinysrgb&w=1260&h=750&dpr=2',
        ],
        releaseDate: '2023-07-11',
        developer: 'Mind Games',
        publisher: 'Puzzle Works',
        genres: ['Puzzle', 'Adventure', 'Indie'],
        platforms: ['PC', 'PlayStation 5', 'Xbox Series X/S', 'Nintendo Switch', 'Mobile'],
        rating: 4.3,
        reviews: 578,
      },
    ];

    setGames(mockGames);
    
    // Set featured games (could be a curated list in a real application)
    setFeaturedGames([mockGames[0], mockGames[1], mockGames[2], mockGames[5]]);
    
    // Set new releases (sorting by release date in a real application)
    setNewReleases([mockGames[3], mockGames[5], mockGames[1]]);
    
    // Set games on sale (filtering by having a sale price in a real application)
    setOnSale(mockGames.filter(game => game.salePrice !== undefined));
  }, []);

  const getGameById = (id: string) => {
    return games.find(game => game.id === id);
  };

  const getGamesByGenre = (genre: string) => {
    return games.filter(game => game.genres.includes(genre));
  };

  const getGamesByPlatform = (platform: string) => {
    return games.filter(game => game.platforms.includes(platform));
  };

  const searchGames = (query: string) => {
    const lowerCaseQuery = query.toLowerCase();
    return games.filter(
      game =>
        game.title.toLowerCase().includes(lowerCaseQuery) ||
        game.description.toLowerCase().includes(lowerCaseQuery) ||
        game.genres.some(genre => genre.toLowerCase().includes(lowerCaseQuery)) ||
        game.platforms.some(platform => platform.toLowerCase().includes(lowerCaseQuery))
    );
  };

  return (
    <GameContext.Provider
      value={{
        games,
        featuredGames,
        newReleases,
        onSale,
        getGameById,
        getGamesByGenre,
        getGamesByPlatform,
        searchGames,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGames = () => {
  const context = useContext(GameContext);
  if (context === undefined) {
    throw new Error('useGames must be used within a GameProvider');
  }
  return context;
};